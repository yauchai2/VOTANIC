// Run with Playwright installed: node prototypes/xrcc-remote-trigger/tests/smoke.cjs
const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const http = require('node:http');
const path = require('node:path');
const screenshotDir = process.env.SCREENSHOT_DIR;
if (screenshotDir) fs.mkdirSync(screenshotDir, {recursive:true});
(async () => {
  const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
  // Export state only in this test response. Production HTML has no test API.
  const instrumented = html.replace(/\}\)\(\);\s*<\/script>/,
    'Object.assign(window,{st,ph,sensor,play,stop,render,renderPhone,press,cellsOf,srvOff,srvReload,startPublic,disablePublic,colsFor,reviewScreen,FLOW_NAMES});})();</script>');
  const server = http.createServer((req, res) => { res.setHeader('Content-Type', 'text/html'); res.end(instrumented); });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  let browser;
  try {
    const executablePath = process.env.CHROMIUM_PATH || (fs.existsSync('/usr/bin/chromium') ? '/usr/bin/chromium' : undefined);
    browser = await chromium.launch({ executablePath, headless: true, args: ['--no-sandbox'] });
    const page = await browser.newPage({ viewport: { width: 1440, height: 1100 } });
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    const home=`http://127.0.0.1:${server.address().port}/`;
    await page.goto(home+'?screen=A9');
    assert.equal(await page.locator('#playPill').innerText(),'Playing');
    await page.locator('.review-tools summary').click();
    await Promise.all([page.waitForURL(home),page.selectOption('#screenReview','')]);
    await page.getByRole('tab',{name:'1 · XRCC editor'}).waitFor();
    assert.equal(await page.getByRole('tab',{name:'1 · XRCC editor'}).getAttribute('aria-selected'),'true');
    assert.equal(await page.locator('#playPill').innerText(),'Editing');
    assert.equal(await page.getByRole('button',{name:'Play in PC',exact:false}).isEnabled(),true);
    const listKeys=()=>page.locator('.rt [data-control-key]').evaluateAll(rows=>rows.map(row=>row.dataset.controlKey));
    const defaultKeys=await listKeys();
    assert.deepEqual(defaultKeys,['grp|g1','var|p.Spot intensity','grp|g2','var|p.House lights','var|result.Title text','var|p.Guest count']);
    await page.getByRole('button',{name:'Load sample list',exact:true}).click();
    assert.deepEqual(await listKeys(),defaultKeys);
    await page.getByRole('button',{name:'Clear list',exact:true}).click();
    assert.deepEqual(await listKeys(),[]);
    await page.reload();
    assert.deepEqual(await listKeys(),defaultKeys);
    await page.getByRole('button',{name:'Play in PC',exact:false}).click();
    assert.equal(await page.locator('.play-scene .scene-title').innerText(),'Scene view · Play');
    assert.equal(await page.locator('.rt').count(),0);
    await page.locator('.play-scene').getByRole('button',{name:'Connect devices',exact:true}).click();
    assert.equal(await page.locator('.remote-detail').isVisible(),true);
    await page.getByRole('tab',{name:'1 · XRCC editor',exact:true}).click();
    assert.equal(await page.locator('.play-scene').isVisible(),true);
    await page.getByRole('button',{name:'Stop',exact:true}).click();
    assert.equal(await page.locator('.play-scene').count(),0);
    assert.deepEqual(await listKeys(),defaultKeys);
    await page.getByRole('button', { name: 'Add New', exact: true }).click();
    await page.getByRole('menuitem', { name: 'Trigger button' }).click();
    await page.locator('.pk .tn').filter({ hasText: 'Spotlight A' }).click();
    await page.locator('.pk .tn').filter({ hasText: 'Stage speaker' }).click();
    assert.equal(await page.evaluate(() => st.pick.sel.length), 1);
    await page.getByRole('button', { name: 'Add trigger', exact: true }).click();
    assert.equal(await page.evaluate(() => st.groups.at(-1).items[0].inst), 'speaker');
    assert.equal(await page.evaluate(() => st.groups.every(g => g.items.length === 1)), true);
    // P1 has no replacement action. Cancel new selection must not change existing controls.
    assert.equal(await page.getByRole('button', {name:'Change instance', exact:true}).count(), 0);
    const count = await page.evaluate(() => st.groups.length);
    await page.getByRole('button', {name:'Add New', exact:true}).click();
    await page.getByRole('menuitem', {name:'Trigger button'}).click();
    assert.equal(await page.getByRole('radio').count(), 0);
    await page.keyboard.press('Escape');
    assert.equal(await page.locator('.pk').count(), 0);
    assert.equal(await page.evaluate(() => st.groups.length), count);
    await page.evaluate(() => { play(); st.tab = 'phone'; ph.screen = 'deck'; render(); });
    await page.locator('input[type=range]').fill('73');
    assert.equal(await page.evaluate(() => st.vals['var|p.Spot intensity']), 73);
    const number = page.getByRole('spinbutton', { name: 'Guest count', exact: true });
    const before = await page.evaluate(() => st.vals['var|p.Guest count']);
    await number.fill('99'); await number.press('Enter');
    assert.equal(await page.evaluate(() => st.vals['var|p.Guest count']), before);
    assert.equal(await number.evaluate(n => n.validity.valid), false);
    assert.equal(await number.getAttribute('aria-invalid'),'true');
    assert.match(await page.locator('.field-error.show').innerText(),/0 to 20/);
    await number.fill('7.5'); await number.press('Enter');
    assert.equal(await page.evaluate(() => st.vals['var|p.Guest count']), before);
    await number.fill('7'); await number.press('Enter');
    assert.equal(await page.evaluate(() => st.vals['var|p.Guest count']), 7);
    await page.evaluate(()=>{ph.nextResult='rejected'});
    await number.fill('8');await number.press('Enter');
    assert.equal(await page.evaluate(()=>st.vals['var|p.Guest count']),7,'Enter then blur must not resend a rejected number');
    // Rejection/unknown never change confirmed state; Trigger is never replayed.
    await page.evaluate(() => { ph.nextResult = 'rejected'; const c = cellsOf(st.snap.groups, st.snap.vars).find(c => c.kind === 'Toggle'); press(c); });
    assert.match(await page.locator('.fb').innerText(), /rejected/);
    await page.evaluate(() => { ph.nextResult = 'unknown'; press(cellsOf(st.snap.groups, st.snap.vars)[0]); });
    assert.match(await page.locator('.fb').innerText(), /Check XRCC/);
    assert.equal(await page.locator('.fb .notice-icon svg').count(),1);
    await page.locator('.fb').getByRole('button',{name:'Close notification'}).click();
    assert.equal(await page.locator('.fb').evaluate(n=>n.classList.contains('show')),false);
    await page.getByRole('button', { name: 'This device', exact: true }).click();
    assert.equal(await page.getByRole('button', { name: 'Allow sensors', exact: true }).count(), 0);
    assert.match(await page.locator('.sheet').innerText(), /on by default/);
    await page.evaluate(() => { ph.sheet = null; ph.changed = true; renderPhone(); });
    assert.equal(await page.locator('input[type=range]').isDisabled(), true);
    await page.getByRole('button', { name: 'Refresh list', exact: true }).click();
    assert.equal(await page.evaluate(() => ph.changed), false);
    await page.evaluate(() => { ph.conn = 'drop'; press(cellsOf(st.snap.groups, st.snap.vars)[0]); });
    assert.match(await page.locator('.fb').innerText(), /paused/);
    await page.evaluate(() => { ph.conn = 'local'; sensor.owner = 'This device'; stop(); });
    assert.equal(await page.evaluate(() => ph.screen), 'ended');
    assert.equal(await page.evaluate(() => sensor.owner), null);
    await page.evaluate(() => { play(); ph.screen = 'deck'; srvOff(); });
    assert.equal(await page.evaluate(() => ph.screen), 'server-off');
    await page.evaluate(() => { st.srv = 'on'; st.phones = [{ name: 'Test device', me: true, via: 'Public' }]; st.pub = 'on'; disablePublic(); });
    assert.equal(await page.evaluate(() => ph.screen), 'public-off');
    await page.evaluate(() => { ph.screen = 'deck'; ph.conn = 'local'; st.portDraft = '3002'; srvReload(false); });
    await page.waitForFunction(() => st.srv === 'on' && st.port === 3002);
    assert.equal(await page.evaluate(() => ph.conn), 'drop');
    assert.deepEqual(await page.evaluate(() => [colsFor(390), colsFor(820), colsFor(1100)]), [3, 6, 8]);
    // A real narrow viewport, then landscape, must adapt without an orientation warning.
    for (const [width, height, expected] of [[390, 844, 3], [844, 390, 6]]) {
      await page.setViewportSize({ width, height });
      await page.evaluate(() => { ph.conn = 'local'; ph.screen = 'deck'; render(); });
      await page.waitForFunction(expected => Number(getComputedStyle(document.querySelector('.pdeck')).getPropertyValue('--cols')) === expected, expected);
      assert.equal(await page.locator('.pdeck').evaluate(n => n.scrollWidth <= n.clientWidth), true);
    }
    await page.setViewportSize({width:1440,height:1100});
    await page.locator('.review-tools summary').click();
    const allScreens=await page.evaluate(()=>Object.keys(FLOW_NAMES));
    assert.equal(allScreens.length,75);
    for(const screen of allScreens){
      await page.selectOption('#screenReview',screen);
      await page.waitForTimeout(20);
      assert.equal(await page.locator('#view').evaluate(n=>n.children.length>0),true,screen);
    }
    await page.waitForTimeout(1700);
    await page.selectOption('#screenReview','B4');
    assert.deepEqual(await page.locator('.launcher-confirm').evaluate(n=>[n.offsetWidth,n.offsetHeight]),[400,220]);
    await page.locator('.xpick .cf').getByRole('button',{name:'Turn on',exact:true}).click();
    await page.selectOption('#screenReview','B3');
    await page.waitForTimeout(1700);
    assert.equal(await page.evaluate(()=>st.pub),'off','A previous preview must not change the current screen');
    await page.selectOption('#screenReview','A3');
    assert.equal(await page.getByRole('radio').count(),0);
    if(screenshotDir) await page.locator('.pk').screenshot({path:path.join(screenshotDir,'remote-selector-final.png')});
    await page.selectOption('#screenReview','B3');
    assert.equal(await page.locator('.lstage').evaluate(n=>Math.round(n.getBoundingClientRect().width)),1100);
    if(screenshotDir) await page.locator('.lsh').screenshot({path:path.join(screenshotDir,'remote-sharing-final.png')});
    await page.selectOption('#screenReview','B16');
    assert.equal(await page.locator('#toast .notice-message').innerText(),'Link copied');
    await page.locator('#toast').getByRole('button',{name:'Close notification'}).click();
    assert.equal(await page.locator('#toast').isVisible(),false);
    await page.selectOption('#screenReview','C6');
    const triggerKey=page.getByRole('button',{name:'Show controls',exact:true});
    const keyColour=()=>triggerKey.evaluate(n=>getComputedStyle(n).backgroundColor);
    const idleColour=await keyColour();
    const bounds=await triggerKey.boundingBox();
    await page.mouse.move(bounds.x+bounds.width/2,bounds.y+bounds.height/2);
    await page.mouse.down();
    assert.notEqual(await keyColour(),idleColour);
    await page.mouse.up();
    await page.mouse.move(2,2);
    assert.equal(await keyColour(),idleColour);
    assert.equal(await page.locator('.fb.show').count(),0);
    await triggerKey.press('Space');
    assert.equal(await keyColour(),idleColour);
    assert.equal(await page.locator('.fb.show').count(),0);
    await page.evaluate(()=>{ph.nextResult='rejected'});
    await triggerKey.click();
    assert.match(await page.locator('.fb.show').innerText(),/Command rejected/);
    if(screenshotDir) await page.locator('#phone').screenshot({path:path.join(screenshotDir,'remote-library-notice.png')});
    await page.selectOption('#screenReview','C28');
    assert.equal(await page.getByRole('spinbutton',{name:'Guest count'}).inputValue(),'99');
    assert.equal(await page.locator('.field-error.show').isVisible(),true);
    if(screenshotDir) await page.locator('#phone').screenshot({path:path.join(screenshotDir,'remote-inline-error.png')});
    await page.selectOption('#screenReview','C16');
    assert.equal(await page.locator('.sheet .tag.ok').count(),3);
    await page.selectOption('#screenReview','C30');
    assert.equal(await page.locator('.sheet .tag.ok').count(),1);
    assert.match(await page.locator('.sheet').innerText(),/no motion sensors/);
    // Main journey follows Figma: local devices can join before Play, directly into the scoped project.
    await page.selectOption('#screenReview','A4');
    assert.equal(await page.locator('.rt .head .connect-devices').count(),0);
    await page.locator('.rt .lhead').getByRole('button',{name:'Connect devices',exact:true}).click();
    assert.equal(await page.locator('.remote-detail').count(),1);
    assert.equal(await page.getByRole('button',{name:'Copy',exact:true}).isEnabled(),true);
    assert.equal(await page.getByRole('tab',{name:'Public link',exact:true}).isEnabled(),true);
    assert.match(await page.locator('.detail-context').innerText(),/Waiting for Play/);
    await page.getByRole('button',{name:'Open shared link',exact:true}).click();
    await page.waitForFunction(()=>ph.screen==='waiting');
    assert.equal(await page.locator('.proj').count(),0,'Scoped link skips the catalog');
    await page.getByRole('tab',{name:'1 · XRCC editor',exact:true}).click();
    await page.getByRole('button',{name:'Play in PC',exact:false}).click();
    assert.equal(await page.evaluate(()=>ph.screen),'deck');
    const snapshot=await page.evaluate(()=>JSON.stringify(st.snap));
    await page.getByRole('button',{name:'Connect devices',exact:true}).click();
    assert.equal(await page.getByRole('button',{name:'Back to XRCC',exact:true}).count(),0);
    await page.getByRole('tab',{name:'1 · XRCC editor',exact:true}).click();
    assert.equal(await page.evaluate(()=>st.playing),true);
    assert.equal(await page.evaluate(()=>JSON.stringify(st.snap)),snapshot,'Window focus never restarts Play');
    assert.equal(await page.locator('.prw,.prpop').count(),0);
    // Independent Launcher entry has no return action and its generic link uses the project catalog.
    await page.getByRole('tab',{name:'2 · Launcher',exact:true}).click();
    await page.getByRole('button',{name:'Manage devices',exact:true}).click();
    assert.equal(await page.getByRole('button',{name:'Back to XRCC',exact:true}).count(),0);
    await page.getByRole('button',{name:'Open shared link',exact:true}).click();
    await page.waitForFunction(()=>ph.screen==='projects');
    await page.locator('.proj').click();
    assert.equal(await page.evaluate(()=>ph.screen),'deck');
    // Recover a server-start error without restarting the playing session.
    await page.selectOption('#screenReview','B15');
    assert.match(await page.locator('.connection-description').innerText(),/Check the port in Server/);
    await page.getByRole('textbox',{name:'Port',exact:true}).fill('3002');
    assert.equal(await page.evaluate(()=>st.srv),'off');
    await page.getByRole('switch',{name:'Server',exact:true}).click();
    await page.waitForFunction(()=>st.srv==='on'&&st.port===3002);
    assert.equal(await page.evaluate(()=>st.playing),true);
    assert.match(await page.locator('.url').inputValue(),/:3002/);
    await page.selectOption('#screenReview','B25');
    assert.equal(await page.getByRole('tab',{name:'Public link',exact:true}).getAttribute('aria-selected'),'true');
    assert.equal(await page.getByRole('button',{name:'Turn on public link',exact:true}).count(),0);
    assert.match(await page.locator('.connection-description').innerText(),/Start Play/);
    await page.getByRole('tab',{name:'Local network',exact:true}).click();
    assert.equal(await page.getByRole('button',{name:'Copy',exact:true}).isEnabled(),true);
    await page.selectOption('#screenReview','B26');
    await page.getByRole('button',{name:'Turn on public link',exact:true}).click();
    assert.deepEqual(await page.locator('.launcher-confirm').evaluate(n=>[n.offsetWidth,n.offsetHeight]),[400,220]);
    await page.locator('.xpick .cf').getByRole('button',{name:'Turn on',exact:true}).click();
    await page.waitForFunction(()=>st.pub==='on');
    assert.equal(await page.getByRole('textbox',{name:'Port',exact:true}).isVisible(),true);
    assert.equal(await page.getByRole('button',{name:/Port settings/i}).count(),0);
    await page.getByRole('button',{name:'Turn off link',exact:true}).click();
    assert.equal(await page.evaluate(()=>st.pub),'off');
    assert.equal(await page.getByRole('button',{name:'Back to XRCC',exact:true}).count(),0);
    await page.selectOption('#screenReview','C24');
    assert.equal(await page.getByRole('button',{name:'Back to projects',exact:true}).count(),0);
    await page.selectOption('#screenReview','B7');
    const retry=page.locator('.connection-action').getByRole('button',{name:'Try again',exact:true});
    assert.equal(await page.locator('.connection-action button').count(),1);
    assert.deepEqual(await retry.evaluate(n=>[n.offsetWidth,n.offsetHeight,n.classList.contains('sec')]),[168,36,true]);
    await page.getByRole('tab',{name:'Local network',exact:true}).click();
    assert.equal(await page.getByRole('button',{name:'Copy',exact:true}).isVisible(),true);
    await page.getByRole('tab',{name:'Public link',exact:true}).click();
    await retry.click();
    await page.waitForFunction(()=>st.pub==='on');
    await page.selectOption('#screenReview','B5');
    assert.equal(await page.locator('.connection-progress[role=status]').innerText(),'Creating public link…');
    assert.equal(await page.getByRole('button',{name:'Creating…',exact:true}).count(),0);
    await page.selectOption('#screenReview','B2');
    const expected={breadcrumb:[280,112,780,28],heading:[280,164,780,60],server:[280,248,780,82],share:[280,354,780,266],devices:[280,644,780,132],empty:[280,680,780,96]};
    const geometry=await page.locator('.lsh').evaluate(root=>{const r=root.getBoundingClientRect();return Object.fromEntries(Array.from(root.querySelectorAll('[data-figma]')).map(n=>{const b=n.getBoundingClientRect();return[n.dataset.figma,[b.x-r.x,b.y-r.y,b.width,b.height]]}))});
    for(const [name,box]of Object.entries(expected))for(let i=0;i<4;i++)assert.ok(Math.abs(geometry[name][i]-box[i])<=1,`Figma geometry ${name}[${i}]: ${geometry[name][i]} vs ${box[i]}`);
    for(const screen of ['B2','B12','B14','B15','B17']){
      await page.selectOption('#screenReview',screen);
      const aligned=await page.locator('.server-strip').evaluate(card=>{
        const outer=card.getBoundingClientRect();
        return ['.port-field>span','.pin','[aria-label="Reload server"]','.server-toggle'].map(selector=>{
          const rect=card.querySelector(selector).getBoundingClientRect();
          return [Math.round(rect.left-outer.left),rect.top+rect.height/2-outer.top];
        });
      });
      assert.deepEqual(aligned,[[480,41],[515,41],[635,41],[687,41]],screen);
    }
    await page.selectOption('#screenReview','B12');
    assert.equal(await page.locator('.remote-detail').evaluate(el=>[...el.children].map(n=>n.dataset.figma).slice(-3).join(',')),'server,share,devices');
    assert.equal(await page.locator('[data-figma=share]').evaluate(el=>el.offsetHeight),234);
    assert.equal(await page.locator('.qr-caption').count(),0);
    assert.equal(await page.getByRole('switch',{name:'Server',exact:true}).getAttribute('aria-checked'),'false');
    const summaryStatus=page.locator('.remote-summary [role=status]');
    for(const [screen,label,colour,y=220] of [
      ['B9','Server running · No devices connected','rgb(55, 149, 75)'],
      ['B27','Server running · 1 device connected','rgb(55, 149, 75)',200],
      ['B22','Server off','rgb(53, 53, 53)',200],
    ]){
      await page.selectOption('#screenReview',screen);
      assert.equal(await summaryStatus.innerText(),label);
      const geometry=await summaryStatus.evaluate(row=>{
        const card=row.closest('.remote-summary').getBoundingClientRect();
        const shell=row.closest('.lsh').getBoundingClientRect();
        const dot=row.querySelector('.summary-server-dot');
        const rect=dot.getBoundingClientRect();
        const text=row.querySelector('span').getBoundingClientRect();
        return {
          card:[card.x-shell.x,Math.round(card.y-shell.y),card.width,card.height],
          dot:[rect.x-card.x,rect.y-card.y,rect.width,rect.height],
          labelX:text.x-card.x,
          colour:getComputedStyle(dot).backgroundColor,
        };
      });
      assert.deepEqual(geometry,{card:[345,y,650,120],dot:[120,70,8,8],labelX:136,colour},screen);
    }
    await page.selectOption('#screenReview','B9');
    const overview=page.locator('.connections-overview');
    const overviewBoxes=await overview.evaluate(root=>{
      const shell=root.closest('.lsh').getBoundingClientRect();
      return [...root.querySelectorAll('.connections-summary-row,.connections-cleanup,.retention-select')].map(n=>{
        const b=n.getBoundingClientRect();
        return [b.x-shell.x,Math.round(b.y-shell.y),b.width,b.height];
      });
    });
    assert.deepEqual(overviewBoxes,[[345,356,650,66],[345,438,650,66],[345,536,650,98],[345,598,285,36]]);
    assert.equal(await page.getByRole('combobox',{name:'Clear unused connection information'}).inputValue(),'90 days');
    assert.equal(await page.locator('.lpage').evaluate(n=>n.scrollHeight<=n.clientHeight),true);
    await page.getByRole('button',{name:/^AI keys/}).click();
    await page.getByRole('textbox',{name:'Search keys'}).fill('Office');
    assert.equal(await page.locator('.provider-row:visible').count(),1);
    await page.locator('.connections-subpage').getByRole('button',{name:'Connections',exact:true}).click();
    await page.getByRole('button',{name:/^Speech commands/}).click();
    assert.equal(await page.getByText('Lobby kiosk token',{exact:true}).isVisible(),true);
    await page.selectOption('#screenReview','B27');
    await page.getByRole('button',{name:'Manage devices',exact:true}).click();
    assert.equal(await page.locator('.device-row').count(),1);
    assert.equal(await page.getByRole('button',{name:'Disconnect',exact:true}).count(),0);
    await page.getByRole('switch',{name:'Server',exact:true}).click();
    await page.getByRole('button',{name:'Turn off',exact:true}).click();
    await page.getByRole('button',{name:'Connections',exact:true}).last().click();
    assert.equal(await summaryStatus.innerText(),'Server off');
    assert.equal(await summaryStatus.locator('.summary-server-dot.running').count(),0);
    await page.selectOption('#screenReview','A9');
    const rowIndents=await page.locator('.rt .irow .nm').evaluateAll(nodes=>{const r=document.querySelector('.rt').getBoundingClientRect();return nodes.map(n=>n.getBoundingClientRect().x-r.x)});
    for(const x of rowIndents)assert.ok(Math.abs(x-81)<1,'Instance and Variable label alignment');
    await page.evaluate(()=>{st.playing=false;ph.screen='waiting';srvOff()});
    assert.equal(await page.evaluate(()=>ph.screen),'server-off','Waiting device sees server shutdown');
    // Mouse and keyboard both cross control types, and Play preserves the saved sequence.
    await page.selectOption('#screenReview','A9');
    await page.getByRole('button',{name:'Stop',exact:true}).click();
    const rows=page.locator('.rt [data-control-key]');
    const order=()=>rows.evaluateAll(nodes=>nodes.map(row=>row.dataset.controlKey));
    const initial=await order();
    const variable=page.locator('[data-hid="var|p.Spot intensity"]');
    await variable.focus();
    await variable.press('Space');
    await variable.press('ArrowUp');
    assert.equal((await order())[0],'var|p.Spot intensity');
    await variable.press('Escape');
    assert.deepEqual(await order(),initial);
    const trigger=page.locator('[data-hid="grp|g1"]');
    const target=page.locator('[data-control-key="var|p.Spot intensity"]');
    await trigger.dragTo(target,{targetPosition:{x:25,y:80}});
    const mixed=await order();
    assert.ok(mixed.indexOf('grp|g1')>mixed.indexOf('var|p.Spot intensity'),'Pointer drag crosses types');
    const saved=await page.evaluate(()=>JSON.parse(localStorage.getItem('xrcc-rt6')).order);
    assert.deepEqual(saved,mixed);
    await page.getByRole('button',{name:'Play in PC',exact:false}).click();
    assert.deepEqual(await page.evaluate(()=>st.snap.order),mixed);
    await page.getByRole('tab',{name:'3 · Remote',exact:true}).click();
    await page.evaluate(()=>{ph.screen='deck';render()});
    const deckOrder=await page.locator('.pdeck .key').evaluateAll(nodes=>nodes.map(node=>node.getAttribute('aria-label')));
    assert.equal(deckOrder[0],'Spot intensity');
    await page.goto('http://127.0.0.1:'+server.address().port);
    assert.deepEqual(await order(),mixed,'Reopening the project restores mixed ordering');
    await page.locator('.review-tools summary').click();

    await page.selectOption('#screenReview','B26');
    const publicTab=page.getByRole('tab',{name:'Public link',exact:true});
    await publicTab.focus();
    await page.keyboard.press('ArrowLeft');
    assert.equal(await page.getByRole('tab',{name:'Local network'}).getAttribute('aria-selected'),'true');
    await page.keyboard.press('ArrowRight');
    await page.getByRole('button',{name:'Turn on public link',exact:true}).click();
    assert.equal(await page.getByRole('button',{name:'Cancel',exact:true}).evaluate(n=>n===document.activeElement),true);
    await page.keyboard.press('Escape');
    assert.equal(await page.getByRole('button',{name:'Turn on public link',exact:true}).evaluate(n=>n===document.activeElement),true);
    await page.evaluate(()=>{startPublic();srvOff()});
    await page.waitForTimeout(1550);
    assert.equal(await page.evaluate(()=>st.pub),'off');

    await page.selectOption('#screenReview','C5');
    const toggle=page.getByRole('switch',{name:'House lights',exact:true});
    await toggle.focus();
    await toggle.press('Space');
    assert.equal(await toggle.evaluate(n=>n===document.activeElement),true);
    assert.equal(await page.locator('.fb.show').count(),1);
    await page.evaluate(()=>{stop();play()});
    assert.equal(await page.evaluate(()=>ph.screen),'deck','Local recovers after Play restarts');
    // Follow the same affordances shown by the Figma interactions.
    await page.selectOption('#screenReview','A11');
    const search=page.getByRole('textbox',{name:'Find',exact:true});
    await search.fill('Stage');
    assert.equal(await search.evaluate(n=>n===document.activeElement),true);
    await search.clear();
    const sortInstances=page.getByRole('button',{name:'Sort instances',exact:true});
    await sortInstances.click();
    assert.equal(await sortInstances.getAttribute('aria-pressed'),'true');
    const variableFilter=page.getByRole('button',{name:'Show instances with variables',exact:true});
    await variableFilter.click();
    assert.equal(await variableFilter.getAttribute('aria-pressed'),'true');
    await page.getByRole('tab',{name:'Project variables',exact:true}).click();
    await page.getByRole('button',{name:/Welcome text/}).click();
    await page.getByRole('button',{name:'Add control',exact:true}).click();
    const card=page.locator('[data-control-key="var|p.Welcome text"]');
    const row=card.getByRole('button',{name:'Settings for Welcome text'});
    assert.equal(await row.getAttribute('aria-expanded'),'true');
    const relative=await card.evaluate(n=>{
      const root=n.getBoundingClientRect();
      const left=selector=>Math.round(n.querySelector(selector).getBoundingClientRect().left-root.left);
      return [left('.dh'),left('.cs'),left('.vr img'),left('.vr .nm'),left('.chv')];
    });
    assert.deepEqual(relative,[8,36,36,64,550]);
    await card.locator('.chv').click();
    assert.equal(await row.getAttribute('aria-expanded'),'false');
    await card.locator('.chv').click();
    assert.equal(await row.getAttribute('aria-expanded'),'true');
    const frame=page.locator('.rt');
    const beforePalette=await frame.boundingBox();
    const colour=card.getByRole('button',{name:'Control colour'});
    await colour.click();
    const afterPalette=await frame.boundingBox();
    assert.deepEqual(afterPalette,beforePalette,'Opening a palette does not displace the dialog');
    await page.locator('.pal').getByRole('button',{name:'Use #FF0000',exact:true}).click();
    assert.equal(await colour.evaluate(n=>n.style.backgroundColor),'rgb(255, 0, 0)');
    await page.keyboard.press('Escape');
    assert.equal(await page.locator('.cpop').count(),0);
    assert.equal(await colour.evaluate(n=>n===document.activeElement),true);
    if(screenshotDir)await frame.screenshot({path:path.join(screenshotDir,'aligned-remote-list.png')});

    await page.selectOption('#screenReview','B8');
    await page.getByRole('button',{name:'Scan QR to join',exact:true}).click();
    await page.waitForFunction(()=>ph.screen==='waiting');
    await page.selectOption('#screenReview','B2');
    await page.getByRole('button',{name:'Scan QR to join',exact:true}).click();
    await page.waitForFunction(()=>ph.screen==='deck');
    await page.selectOption('#screenReview','B25');
    assert.equal(await page.getByRole('button',{name:'Scan QR to join',exact:true}).count(),0);
    const base='http://127.0.0.1:'+server.address().port;
    for(const [screen,selector,box] of [
      ['A3','.pk',{x:640,y:200,width:640,height:680}],
      ['A9','.rt',{x:640,y:200,width:640,height:680}],
      ['A11','.pk2',{x:480,y:200,width:960,height:680}],
    ]){
      await page.setViewportSize({width:1920,height:1080});
      await page.goto(base+'/?screen='+screen+'&present=1');
      assert.deepEqual(await page.locator(selector).boundingBox(),box,screen+' matches the Figma frame bounds');
    }
    await page.setViewportSize({width:390,height:844});
    await page.goto(base+'/?screen=C5&present=1');
    await page.evaluate(()=>document.fonts.ready);
    const deckBounds=await page.locator('.pdeck .key').evaluateAll(nodes=>nodes.map(node=>{
      const {x,y,width,height}=node.getBoundingClientRect();
      return [x,y,width,height];
    }));
    assert.deepEqual(deckBounds,[[20,112,111,111],[139,112,230,111],[20,231,111,111],
      [139,231,111,111],[20,350,230,111],[258,350,111,111]],'C5 matches all six Figma card bounds');
    assert.deepEqual(errors, []);
    console.log('PASS: single binding, cancel/Esc without replacement or Radio, slider, numeric validation, rejection/unknown, sensor default-on, stale guard, network guard, Play/server/public lifecycle, changed port, responsive 3/6/8 columns, all 75 Figma states, 1100px Launcher, Library notification dismissal, inline errors and no rejected-number retry; no page errors.');
  } finally {
    if (browser) await browser.close();
    await new Promise(resolve => server.close(resolve));
  }
})().catch(e => { console.error(e); process.exitCode = 1; });
