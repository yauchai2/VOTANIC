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
    'Object.assign(window,{st,ph,sensor,play,stop,render,renderPhone,press,cellsOf,srvOff,srvReload,disablePublic,colsFor,reviewScreen,FLOW_NAMES});})();</script>');
  const server = http.createServer((req, res) => { res.setHeader('Content-Type', 'text/html'); res.end(instrumented); });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  let browser;
  try {
    const executablePath = process.env.CHROMIUM_PATH || (fs.existsSync('/usr/bin/chromium') ? '/usr/bin/chromium' : undefined);
    browser = await chromium.launch({ executablePath, headless: true, args: ['--no-sandbox'] });
    const page = await browser.newPage({ viewport: { width: 1440, height: 1100 } });
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    await page.goto(`http://127.0.0.1:${server.address().port}`);
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
    await page.getByRole('button', { name: 'Allow sensors', exact: true }).click();
    assert.equal(await page.evaluate(() => sensor.permission), 'granted');
    await page.getByRole('button', { name: 'Simulate permission denied', exact: true }).click();
    assert.equal(await page.evaluate(() => sensor.owner), null);
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
    const allScreens=await page.evaluate(()=>Object.keys(FLOW_NAMES));
    assert.equal(allScreens.length,69);
    for(const screen of allScreens){
      await page.selectOption('#screenReview',screen);
      await page.waitForTimeout(20);
      assert.equal(await page.locator('#view').evaluate(n=>n.children.length>0),true,screen);
    }
    await page.waitForTimeout(1700);
    await page.selectOption('#screenReview','B4');
    await page.locator('.xpick .cf').getByRole('button',{name:'Turn on',exact:true}).click();
    await page.selectOption('#screenReview','B3');
    await page.waitForTimeout(1700);
    assert.equal(await page.evaluate(()=>st.pub),'off','A previous preview must not change the current screen');
    await page.selectOption('#screenReview','A3');
    assert.equal(await page.getByRole('radio').count(),0);
    if(screenshotDir) await page.locator('.pk').screenshot({path:path.join(screenshotDir,'remote-selector-final.png')});
    await page.selectOption('#screenReview','B3');
    assert.equal(await page.locator('.prw').evaluate(n=>Math.round(n.getBoundingClientRect().width)),960);
    if(screenshotDir) await page.locator('.prw').screenshot({path:path.join(screenshotDir,'remote-sharing-final.png')});
    await page.selectOption('#screenReview','B16');
    assert.equal(await page.locator('#toast .notice-message').innerText(),'Link copied');
    await page.locator('#toast').getByRole('button',{name:'Close notification'}).click();
    assert.equal(await page.locator('#toast').isVisible(),false);
    await page.selectOption('#screenReview','C6');
    if(screenshotDir) await page.locator('#phone').screenshot({path:path.join(screenshotDir,'remote-library-notice.png')});
    await page.selectOption('#screenReview','C28');
    assert.equal(await page.getByRole('spinbutton',{name:'Guest count'}).inputValue(),'99');
    assert.equal(await page.locator('.field-error.show').isVisible(),true);
    if(screenshotDir) await page.locator('#phone').screenshot({path:path.join(screenshotDir,'remote-inline-error.png')});
    await page.selectOption('#screenReview','C22');
    await page.getByRole('button',{name:'Confirm takeover',exact:true}).click();
    assert.notEqual(await page.evaluate(()=>sensor.owner),"Alan's iPad");
    assert.equal(await page.evaluate(()=>ph.confirmTakeover),false);
    assert.deepEqual(errors, []);
    console.log('PASS: single binding, cancel/Esc without replacement or Radio, slider, numeric validation, rejection/unknown, sensor permission, stale guard, network guard, Play/server/public lifecycle, changed port, responsive 3/6/8 columns, all 69 Figma states, 960px sharing window and takeover confirmation, Library notification dismissal, inline errors and no rejected-number retry; no page errors.');
  } finally {
    if (browser) await browser.close();
    await new Promise(resolve => server.close(resolve));
  }
})().catch(e => { console.error(e); process.exitCode = 1; });
