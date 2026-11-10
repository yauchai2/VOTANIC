/* Voyage 360 · Loading Enhancement — working prototype
   A small state machine plus a real loading engine:
   scenes load one after another, counts / pill / card / footer / Play+Save lock all derive from that state. */
(function () {
"use strict";
var $ = function (s, r) { return (r || document).querySelector(s); };
var A = "assets/";
var NS = 16, TICK_MS = 350;

/* ---------- shared menu bar ---------- */
(function buildMenus() {
  var pos = ["inset:0 0 78.49% 80.15%", "inset:0.24% 55.45% 79.14% 8.92%", "inset:32.14% 32% 13.53% 11.79%",
             "inset:72.16% 42.23% 0 30.88%", "inset:2.87% 58.11% 42% 0", "inset:19.51% 11.52% 33.33% 32.01%"];
  var logo = pos.map(function (p, i) {
    return '<div style="position:absolute;' + p + '"><img alt="" src="' + A + 'v' + i + '.svg" style="width:100%;height:100%;display:block;max-width:none"></div>';
  }).join("");
  var html = '<div class="l"><div class="logo36"><div class="in">' + logo + "</div></div>" +
    ["File", "Project", "Edit", "View", "Help"].map(function (t) { return '<div class="item">' + t + "</div>"; }).join("") + "</div>" +
    '<div class="r"><div class="win"><img alt="" src="' + A + 'minimise.svg"></div><div class="win"><img alt="" src="' + A + 'restore.svg"></div><div class="win"><img alt="" src="' + A + 'close.svg"></div></div>';
  document.querySelectorAll("[data-menubar]").forEach(function (m) { m.innerHTML = html; });
})();

/* ---------- data ---------- */
var ASSETS = [1,1,1,8,1,1,1,1,3,3,2,2,2,2,2,1], UNUSED = 4;   /* 4 assets are not used by any scene and load last */
var TOTAL = ASSETS.reduce(function (a, b) { return a + b; }, 0) + UNUSED;   /* 36 assets in 16 scenes */
var thumbs = [A + "s1.png", A + "s2.jpg", A + "bg.jpg", A + "s4.jpg", A + "s5.jpg", A + "s6.png", A + "s7.png", A + "s8.png",
              A + "blurred.jpg", A + "s4.jpg", A + "s5.jpg", A + "s6.png", A + "s7.png", A + "s8.png", A + "s2.jpg", A + "s1.png"];
var thumbFor = function (n) { return thumbs[(n - 1) % thumbs.length]; };
function mkFiles() {
  return [
    { id: "f1", name: "Lobby-tour.mp4", kind: "Video", icon: "file", scenes: [4, 10], reason: "Timed out", busy: "" },
    { id: "f2", name: "Kitchen-island.jpg", kind: "Image", icon: "image", scenes: [5], reason: "File not found", busy: "" }
  ];
}

/* ---------- state ---------- */
var S = {
  screen: "s1",
  mode: "loading",          /* loading | missing | done | ready */
  open: false, review: false, menu: false, panel: null, panelFrom: "",
  scenes: [], files: [], sel: 1, scroll: 0,
  timer: null, auto: null, doneT: null, phOpen: 0, toastFor: null, toastT: null
};
function freshScenes() {
  return ASSETS.map(function (t, i) { var n = i + 1; return n <= 3 ? { t: t, n: t, st: "ready" } : n === 4 ? { t: t, n: 5, st: "loading" } : { t: t, n: 0, st: "queue" }; });
}
var plural = function (n, w) { return n + " " + w + (n === 1 ? "" : "s"); };
var openFiles = function () { return S.files; };
function lostAssets() { var x = 0; S.files.forEach(function (f) { if (!f.sceneFail) x++; }); return x; }
function loaded() { var x = 0; S.scenes.forEach(function (s) { x += s.n; }); return x + (S.un || 0) - lostAssets(); }
function readyScenes() { var k = 0; for (var i = 0; i < NS && S.scenes[i].st === "ready"; i++) k++; return k; }
function currentLoading() { for (var i = 0; i < NS; i++) if (S.scenes[i].st === "loading") return i + 1; return 0; }
function failedScene(n) { return S.files.some(function (f) { return f.sceneFail && f.scenes.indexOf(n) > -1; }); }
function missFor(n) { return S.files.filter(function (f) { return !f.sceneFail && f.scenes.indexOf(n) > -1; }); }
var locked = function () { return S.mode === "loading"; };

/* ---------- screens ---------- */
function show(id) {
  S.screen = id;
  document.querySelectorAll(".screen").forEach(function (e) { e.classList.toggle("on", e.id === id); });
  clearTimeout(S.auto); stopEngine();
  if (id === "s1") S.auto = setTimeout(function () { show("s2"); }, 3200);
  if (id === "s2") {
    var b = $("#s2bar"); b.style.transition = "none"; b.style.width = "12%";
    requestAnimationFrame(function () { requestAnimationFrame(function () { b.style.transition = "width 3.2s linear"; b.style.width = "100%"; }); });
    S.auto = setTimeout(function () { enterEditor(); }, 3400);
  }
  if (id === "s3") {
    var b3 = $("#s3bar"); b3.style.transition = "none"; b3.style.width = "0%";
    requestAnimationFrame(function () { requestAnimationFrame(function () { b3.style.transition = "width 2.4s ease-out"; b3.style.width = Math.round(2 / NS * 100) + "%"; }); });
  }
  if (id === "editor") { renderAll(); if (S.mode === "loading") startEngine(); }
}
function enterEditor() {
  clearTimeout(S.doneT);
  S.mode = "loading"; S.open = false; S.review = false; S.menu = false; S.panel = null; S.userScroll = false; S.sel = 1; S.scroll = 0; S.un = 0; S.playing = false; S.resumed = false; $("#editor").classList.remove("playing");
  S.scenes = freshScenes(); S.files = []; show("editor");
}

/* ---------- loading engine: one asset per tick ---------- */
function startEngine() { stopEngine(); S.timer = setInterval(tick, TICK_MS); }
function stopEngine() { clearInterval(S.timer); S.timer = null; }
function promote() {
  for (var i = 0; i < NS; i++) if (S.scenes[i].st === "queue" && !failedScene(i + 1)) { S.scenes[i].st = "loading"; return i + 1; }
  return 0;
}
function tick() {
  if (S.mode !== "loading") return;
  var n = currentLoading() || promote();
  if (!n) { S.un = (S.un || 0) + 1; if (S.un >= UNUSED) { S.un = UNUSED; finish(); return; } }
  else { var sc = S.scenes[n - 1]; sc.n = Math.min(sc.t, sc.n + 1); if (sc.n >= sc.t) { sc.st = "ready"; promote(); } }
  follow(); renderRow(); updateLoaderLive(); updateFooter(); updateTips(); renderQ(); if (S.panel === "browse") renderPanel(); if (curReady() && document.querySelector("#editor.playlocked")) renderAll();
}
function follow() {
  if (S.userScroll) return;
  var c = currentLoading(); if (!c) return;
  var l = (c - 1) * 154, r = l + 146;
  if (r > S.scroll + 1449) S.scroll = l - 600; else if (l < S.scroll) S.scroll = l;
}
function finish() {
  stopEngine();
  if (S.files.length) { S.mode = "missing"; S.open = false; }
  else enterDone();
  renderAll();
}
function enterDone() {
  S.mode = "done"; S.open = false; S.review = false;
  clearTimeout(S.doneT);
  S.doneT = setTimeout(function () { if (S.mode === "done") { S.mode = "ready"; renderAll(); } }, 3200);
}

/* ---------- rendering ---------- */
function cardReady(n) {
  var miss = missFor(n).length;
  return '<div class="card' + (n === S.sel ? " sel" : "") + (miss ? " miss" : "") + '" data-n="' + n + '"><div class="thumb" style="background-image:url(' + thumbFor(n) + ')">' +
    (miss ? '<div class="mstrip"><img alt="" src="' + A + 'warn-amber.svg">' + miss + " file" + (miss > 1 ? "s" : "") + " missing</div>" : "") + '</div><div class="badge">' + n + "</div></div>";
}
function cardBox(n, cls, inner) { return '<div class="card state ' + cls + (n === S.sel ? " sel" : "") + '" data-n="' + n + '"><div class="box">' + inner + '<div class="badge">' + n + "</div></div></div>"; }
function renderRow() {
  var h = "";
  S.scenes.forEach(function (s, i) {
    var n = i + 1;
    if (failedScene(n)) h += cardBox(n, "failed", '<img class="ico" alt="" src="' + A + 'warn2.svg"><div class="lbl"><span class="t">Couldn’t load</span><span class="h">Retry</span></div>');
    else if (s.st === "ready") h += cardReady(n);
    else if (s.st === "loading") h += cardBox(n, "loadingc", '<img class="ico" alt="" src="' + A + 'load.svg"><div class="track"></div><div class="fill" style="left:0;width:' + Math.round(140 * s.n / s.t) + 'px"></div><div class="lbl">' + s.n + " of " + s.t + " assets</div>");
    else h += cardBox(n, "queue", '<img class="ico" alt="" src="' + A + 'clock.svg"><div class="lbl">In queue</div>');
  });
  var row = $("#row"); row.innerHTML = h;
  var full = NS * 154 - 8, max = Math.max(0, full - 1449);
  S.scroll = Math.max(0, Math.min(S.scroll, max));
  row.style.transform = "translateX(" + (-S.scroll) + "px)";
  var bar = $(".sbar i"); bar.style.width = (Math.min(1, 1449 / full) * 100) + "%"; bar.style.left = (max ? S.scroll / full * 100 : 0) + "%";
}
function footerText() {
  var r = loaded();
  if (S.mode === "ready" || S.mode === "done") return "All " + TOTAL + " assets ready";
  if (S.mode === "missing") {
    var sc = {}; S.files.forEach(function (f) { f.scenes.forEach(function (n) { sc[n] = 1; }); });
    return plural(S.files.length, "file") + " missing in " + plural(Object.keys(sc).length, "scene");
  }
  var k = readyScenes();
  return k ? (k === 1 ? "Scene 1 is" : "Scenes 1–" + k + " are") + " ready to edit" : "Loading the first scene";
}
function updateFooter() { $("#footer").textContent = footerText(); }
function updateTips() {
  var left = TOTAL - loaded();
  $("#tipPlay").innerHTML = !curReady() ? "<p>Scene " + S.sel + " is still loading.</p>" : "<p>Assets that haven’t loaded show as placeholders.</p><p>Loading pauses while you play.</p>";
  $("#tipNew").innerHTML = "<p>New scene unlocks when loading finishes.</p>";
}
function chev(up) { return '<span class="chev" data-act="toggle"><img alt="" src="' + A + (up ? "chevup" : "chevron") + '.svg"></span>'; }
function renderLoader() {
  var m = S.mode, L = $("#loader"), h = "", r = loaded(), pct = Math.round(r / TOTAL * 100), f = S.files.length;
  if (m === "ready") { L.innerHTML = ""; return; }
  if (m === "done") { L.innerHTML = '<a class="pill ok"><img alt="" src="' + A + 'check.svg"><span>All assets ready</span></a>'; return; }
  var k = readyScenes(), cur = currentLoading();
  if (!S.open) {
    if (m === "loading") h = '<a class="pill" data-act="toggle"><img class="spin" alt="" src="' + A + 'load2.svg"><span id="pillTxt">' + pillLabel(r) + '</span><span class="mini"><i id="pillBar" style="width:' + Math.round(48 * r / TOTAL) + 'px"></i></span>' + chev(false) + "</a>";
    if (m === "missing") h = '<a class="pill warn"><img alt="" src="' + A + 'warn-amber.svg"><span>' + plural(f, "file") + ' missing</span><span class="link" data-act="review">Review</span>' + chev(false) + "</a>";
  } else {
    var bar = '<div class="prog"><div class="track"><i id="cBar" style="width:' + pct + '%"></i></div><div class="cnt"><span id="cOf">' + r + " of " + TOTAL + ' assets ' + (m === "loading" ? "ready" : "loaded") + "</span></div></div>";
    if (m === "loading") h = '<div class="lcard"><div class="head" data-act="toggle"><img class="spin" alt="" src="' + A + 'load.svg"><span>Loading assets</span>' + chev(true) + "</div>" + bar + '<div id="cList">' + checklist() + "</div>" +
      '<p class="note" id="cNote">' + noteText() + "</p></div>";
    if (m === "missing") h = '<div class="lcard"><div class="head" data-act="toggle"><img alt="" src="' + A + 'warn-amber.svg"><span>' + plural(f, "file") + " " + (f === 1 ? "is" : "are") + " missing</span>" + chev(true) + "</div>" + bar +
      '<p class="note">Keep working. ' + plural(missScenes(), "scene") + ' show placeholders where ' + (f === 1 ? "this file is" : "these files are") + ' used.</p><div class="btns"><a class="cbtn sec" data-act="retryall">Retry ' + plural(f, "file") + '</a><a class="cbtn pri" data-act="review">Review</a></div></div>';
  }
  L.innerHTML = h;
}
function range(a, b) { return a === b ? "Scene " + a : "Scenes " + a + "–" + b; }
function checklist() {
  var k = readyScenes(), ld = S.mode === "loading", un = ld && !currentLoading() && k >= NS - S.files.filter(function (f) { return f.sceneFail; }).length;
  function row(ic, lab, st, strong) { return '<div class="crow' + (strong ? " strong" : "") + '"><img' + (ic === "load" ? ' class="spin"' : "") + ' alt="" src="' + A + ic + '.svg"><span class="cl">' + lab + '</span><span class="cs">' + st + "</span></div>"; }
  var rows = [un || !ld ? row("check", "Scenes", k + " of " + NS + " ready") : row("load", "Scenes", k + " of " + NS + " ready", true)];
  rows.push(un ? row("load", "Unused assets", (S.un || 0) + " of " + UNUSED + " assets", true) : !ld ? row("check", "Unused assets", "Ready") : row("clock", "Unused assets", "In queue"));
  return '<div class="clist">' + rows.join("") + "</div>";
}
function noteText() { return "New scene unlocks when loading finishes."; }
function updateLoaderLive() {
  var r = loaded(), pct = Math.round(r / TOTAL * 100), e;
  if ((e = $("#pillTxt"))) e.textContent = pillLabel(r);
  if ((e = $("#pillBar"))) e.style.width = Math.round(48 * r / TOTAL) + "px";
  if ((e = $("#cOf"))) e.textContent = r + " of " + TOTAL + " assets ready";
  if ((e = $("#cBar"))) e.style.width = pct + "%";
  if ((e = $("#cNote"))) e.textContent = noteText();
  if ((e = $("#cList"))) e.innerHTML = checklist();
}
function renderReview() {
  var P = $("#review");
  if (!S.review) { P.innerHTML = ""; P.classList.remove("on"); return; }
  var f = S.files.length;
  var rows = S.files.map(function (x) {
    var sc = x.scenes.length > 1 ? "Scenes " + x.scenes.slice(0, -1).join(", ") + " and " + x.scenes[x.scenes.length - 1] : "Scene " + x.scenes[0];
    var act = x.busy ? '<span class="busy"><img class="spin" alt="" src="' + A + 'load2.svg">' + x.busy + "</span>"
      : '<a class="cbtn ter" data-act="retry" data-id="' + x.id + '">Retry</a><a class="cbtn sec" data-act="replace" data-id="' + x.id + '">Replace…</a>';
    return '<div class="rrow"><img class="ic" alt="" src="' + A + x.icon + '.svg"><div class="tx"><b>' + x.name + "</b><span>" + x.kind + " · " + sc + " · " + (x.busy ? "Working…" : x.reason) + '</span></div><div class="ac">' + act + "</div></div>";
  }).join("");
  var busy = S.files.some(function (x) { return x.busy; });
  P.innerHTML = '<div class="dh"><img alt="" src="' + A + 'warn-amber.svg"><span>' + (f === 1 ? "Missing file" : "Missing files") + '</span><a class="x" data-act="rclose"><img alt="" src="' + A + 'close.svg"></a></div>' +
    '<div class="db"><p class="lead">' + (f === 1 ? "This file couldn’t load. Its scenes still open, with placeholders where the file is used." : "These " + f + " files couldn’t load. Their scenes still open, with placeholders where the files are used.") + "</p>" +
    '<div class="rlist">' + rows + '</div></div><div class="df"><a class="cbtn ter" data-act="rclose">Close</a><a class="cbtn pri' + (busy ? " off" : "") + '" data-act="retryall">Retry all</a></div>';
  P.classList.add("on");
}
function renderPlaceholder() {
  var P = $("#ph"), f = missFor(S.sel)[0];
  var B = $("#phbox"); if (!f || S.review || S.panel) { P.classList.remove("on"); P.innerHTML = ""; B.classList.remove("on"); return; }
  B.innerHTML = '<img alt="" src="' + A + 'warn-amber.svg"><b>' + f.name + ' is missing</b><span>Click to retry or replace</span>'; B.classList.toggle("on", S.phOpen !== S.sel);
  if (S.phOpen !== S.sel) { P.classList.remove("on"); P.innerHTML = ""; return; }
  P.innerHTML = '<div class="dh"><span>' + f.name + ' is missing</span><a class="x" data-act="phclose"><img alt="" src="' + A + 'close.svg"></a></div>' +
    '<div class="db"><div class="dbrow"><img class="big" alt="" src="' + A + 'warn-big.svg"><p>This ' + f.kind.toLowerCase() + ' element keeps its place and settings. Replace the file or retry to bring it back.</p></div></div>' +
    '<div class="df">' + (f.busy ? '<span class="busy"><img class="spin" alt="" src="' + A + 'load2.svg">' + f.busy + "</span>" : '<a class="cbtn ter" data-act="retry" data-id="' + f.id + '">Retry</a><a class="cbtn sec" data-act="replace" data-id="' + f.id + '">Replace…</a>') + "</div>";
  P.classList.add("on");
}
function renderMenu() {
  var M = $("#playMenu"), lk = locked();
  if (!S.menu) { M.classList.remove("on"); return; }
  function it(id, t, off, ic) { return '<a class="mi' + (off ? " off" : "") + '" data-act="' + (off ? "" : "play") + '" data-id="' + id + '"><img alt="" src="' + A + ic + '.svg"><span>' + t + "</span>" + "</a>"; }
  M.innerHTML = it("all", "Play in PC", false, "monitor") + it("cur", "Play from current scene", false, "monitor") + it("vr", "Play with VR device", false, "vr");
  M.classList.add("on");
}
function renderAll() {
  var ed = $("#editor"), lk = locked();
  ed.classList.toggle("locked", lk); ed.classList.toggle("ready", !lk);
  var cr = curReady(); ed.classList.toggle("playlocked", !cr); $("#playBtn").setAttribute("aria-disabled", !cr); $("#saveBtn").setAttribute("aria-disabled", false);
  renderRow(); updateFooter(); updateTips(); renderLoader(); renderReview(); renderPlaceholder(); renderMenu(); renderPanel(); renderQ(); hideTips();
}


function missScenes() { var u = {}; S.files.forEach(function (f) { if (!f.sceneFail) f.scenes.forEach(function (n) { u[n] = 1; }); }); return Object.keys(u).length; }
function curReady() { return S.scenes[S.sel - 1].st === "ready"; }
function scLabel(a) { return a.length > 1 ? "Scenes " + a.slice(0, -1).join(", ") + " and " + a[a.length - 1] : "Scene " + a[0]; }
function toast(t) { var T = $("#toast"); T.innerHTML = '<img alt="" src="' + A + 'check.svg"><span>' + t + "</span>"; T.classList.add("on"); clearTimeout(S.toastT); S.toastT = setTimeout(function () { T.classList.remove("on"); }, 3000); }
function renderQ() {
  var Q = $("#qload"), n = S.sel, sc = S.scenes[n - 1];
  if (failedScene(n)) {
    var f = S.files.filter(function (x) { return x.sceneFail && x.scenes.indexOf(n) > -1; })[0];
    Q.innerHTML = '<img class="big" alt="" src="' + A + 'warn.svg"><b>Scene ' + n + ' couldn’t load</b><span>' + f.name + " (360 image) · " + (f.busy || f.reason) + '. Other scenes are not affected.</span>' + (f.busy ? "" : '<div class="ac"><a class="cbtn ter" data-act="retry" data-id="' + f.id + '">Retry</a><a class="cbtn sec" data-act="replace" data-id="' + f.id + '">Replace…</a></div>');
    Q.className = "on fail"; return;
  }
  if (sc.st !== "ready") {
    Q.innerHTML = '<img class="spin" alt="" src="' + A + 'load.svg"><b>Loading Scene ' + n + "</b><span>" + sc.n + " of " + sc.t + " assets" + (sc.st === "loading" ? " · moved to the front of the queue" : "") + "</span>";
    Q.className = "on"; return;
  }
  Q.className = ""; Q.innerHTML = "";
}
/* ---------- file actions ---------- */
function fileById(id) { return S.files.filter(function (f) { return f.id === id; })[0]; }
function resolveFile(f) {
  if (S.toastFor === f) { S.toastFor = null; toast(f.name + " replaced in " + scLabel(f.scenes)); }
  S.files = S.files.filter(function (x) { return x !== f; });
  if (f.sceneFail) f.scenes.forEach(function (n) { S.scenes[n - 1].st = "queue"; S.scenes[n - 1].n = 0; });
  var pending = S.scenes.some(function (s) { return s.st !== "ready"; });
  if (pending) { S.mode = "loading"; S.review = false; promote(); startEngine(); }
  else if (!S.files.length) { S.review = false; enterDone(); }
  renderAll();
}
function work(f, label, ms) {
  if (f.busy) return;
  f.busy = label; renderAll();
  setTimeout(function () { if (S.files.indexOf(f) > -1) resolveFile(f); }, ms);
}
function retryAll() { S.files.slice().forEach(function (f) { work(f, "Retrying…", 900); }); }
function pickFile(f) { S.panel = f.id; S.panelFrom = S.review ? "review" : ""; S.review = false; renderAll(); }
var BROWSE = [["Kitchen-wide.jpg", 1], ["Sofa-corner.jpg", 2], ["Island-detail.jpg", 4], ["Bedroom-east.jpg", 6], ["Study-shelf.jpg", 9], ["Kitchen-island.jpg", 5]];
function browseTile(a) {
  var n = a[1], st = S.scenes[n - 1].st, miss = S.files.filter(function (f) { return f.name === a[0]; })[0], th;
  if (miss) th = '<div class="mth"><img alt="" src="' + A + 'warn-amber.svg"><span>Missing</span><em>' + miss.kind + " · " + miss.reason + "</em></div>";
  else if (st === "ready") th = '<div class="rth" style="background-image:url(' + thumbFor(n) + ')"></div>';
  else if (st === "loading") th = '<div class="lth"><img class="spin" alt="" src="' + A + 'load.svg"><span>Loading</span></div>';
  else th = '<div class="qth"><img alt="" src="' + A + 'clock.svg"><span>In queue</span></div>';
  return '<div class="ptile">' + th + "<b>" + a[0] + "</b></div>";
}
function renderPanel() {
  var P = $("#apanel"), browse = S.panel === "browse", f = browse ? null : fileById(S.panel);
  if (!f && !browse) { S.panel = null; P.classList.remove("on"); P.innerHTML = ""; return; }
  var kind = browse ? "Image" : f.kind;
  var tabs = ["Images", "Icons", "Videos", "Audio"].map(function (t) { return '<span class="tg' + (t === kind + "s" ? " on" : "") + '">' + t + "</span>"; }).join("");
  var tiles = browse ? '<div class="pgrid">' + BROWSE.map(browseTile).join("") + "</div>"
    : '<div class="ptile"><div class="mth"><img alt="" src="' + A + 'warn-amber.svg"><span>Missing</span><em>' + f.kind + " · " + f.reason + "</em></div><b>" + f.name + "</b></div>";
  P.innerHTML = '<div class="ph"><img alt="" src="' + A + 'media.svg"><b>Asset Panel</b><a class="x" data-act="pcancel"><img alt="" src="' + A + 'close.svg"></a></div>' +
    '<div class="ptabs"><span class="tb on"><img alt="" src="' + A + 'monitor.svg">Local</span><span class="tb"><img alt="" src="' + A + 'globe.svg">Online</span>' +
    '<div class="ptools"><span class="imp"><img alt="" src="' + A + 'upload.svg">Import</span><span class="sq cl"><img alt="" src="' + A + 'clean.svg"></span><span class="sq rm"><img alt="" src="' + A + 'trash.svg"></span></div></div><div class="pline"></div>' +
    '<div class="pbody"><div class="tgs">' + tabs + '</div><div class="pfilter"><span class="search"><img alt="" src="' + A + 'search.svg">Search media…</span><span class="dd">All<img alt="" src="' + A + 'chevdown16.svg"></span></div>' +
    tiles + '<div class="psb"><i></i></div></div>' +
    (browse ? "" : '<div class="pbar"><span>Replacing ' + f.name + " · " + scLabel(f.scenes) + '</span><div class="ac"><a class="cbtn ter" data-act="pcancel">Cancel</a><a class="cbtn pri" data-act="pchoose" data-id="' + f.id + '">Choose file…</a></div></div>');
  P.classList.add("on");
}

/* ---------- Play mode: background loading pauses, unloaded assets show as placeholders ---------- */
function enterPlay() {
  if (S.playing || !curReady()) return;
  S.playing = true; S.menu = false; S.open = false; S.review = false; S.panel = null; S.wasLoading = S.mode === "loading";
  if (S.wasLoading) stopEngine();
  var left = TOTAL - loaded(), P = $("#playView");
  P.innerHTML = (S.wasLoading ? '<div class="pnote">' + plural(left, "asset") + (left === 1 ? " hasn’t" : " haven’t") + ' loaded yet and ' + (left === 1 ? "shows as a placeholder" : "show as placeholders") + '</div><div class="pph"><img alt="" src="' + A + 'clock.svg"><b>Lobby-tour.mp4</b><span>Not loaded yet</span></div>' : "") + '<a class="pexit" data-act="exitplay">Exit Play<kbd>Esc</kbd></a>';
  $("#editor").classList.add("playing"); hideTips(); renderMenu();
}
function exitPlay() {
  if (!S.playing) return;
  S.playing = false; $("#editor").classList.remove("playing"); $("#playView").innerHTML = "";
  if (S.wasLoading && S.mode === "loading") { S.resumed = true; clearTimeout(S.resT); S.resT = setTimeout(function () { S.resumed = false; updateLoaderLive(); }, 2600); startEngine(); }
  renderAll();
}
function pillLabel(r) { return (S.resumed ? "Loading resumed " : "Loading assets ") + r + "/" + TOTAL; }

/* ---------- tooltips ---------- */
function hideTips() { $("#tipPlay").classList.remove("show"); $("#tipNew").classList.remove("show"); $("#tipScene").classList.remove("show"); }
function showPlayTip() { if ((locked() || !curReady()) && !S.menu && S.tipFor === "playBtn") $("#tipPlay").classList.add("show"); }
var scale = function () { return Math.min(innerWidth / 1920, innerHeight / 1080); };
Array.prototype.slice.call(document.querySelectorAll("#playBtn, #saveBtn")).forEach(function (e) {
  var en = function () { S.tipFor = e.id; updateTips(); showPlayTip(); }; e.addEventListener("mouseenter", en); e.addEventListener("focus", en);
  e.addEventListener("mouseleave", hideTips); e.addEventListener("blur", hideTips);
  e.addEventListener("click", function (ev) {
    ev.stopPropagation();
    if (e.id === "saveBtn") { toast("Project saved"); return; }
    if (!curReady()) return;
    if (ev.target.closest(".b")) { S.menu = !S.menu; hideTips(); renderMenu(); }
    else enterPlay();
  });
});
var ns = $("#newScene");
ns.addEventListener("click", function (ev) { ev.stopPropagation(); });
ns.addEventListener("mouseenter", function () { if (locked()) $("#tipNew").classList.add("show"); });
ns.addEventListener("mouseleave", hideTips);

/* ---------- delegated clicks ---------- */
function act(ev) {
  var t = ev.target.closest("[data-act]"); if (!t) return;
  var a = t.getAttribute("data-act"); if (!a) return;
  ev.stopPropagation();
  var f = fileById(t.getAttribute("data-id"));
  if (a === "toggle") { S.open = !S.open; renderLoader(); }
  if (a === "review") { S.review = true; S.open = false; renderAll(); }
  if (a === "phclose") { S.phOpen = 0; renderAll(); }
  if (a === "phopen") { S.phOpen = S.sel; renderAll(); }
  if (a === "rclose") { S.review = false; S.open = true; renderAll(); }
  if (a === "retryall") retryAll();
  if (a === "retry" && f) work(f, "Retrying…", 900);
  if (a === "replace" && f) pickFile(f);
  if (a === "pcancel") { S.panel = null; S.review = S.panelFrom === "review"; renderAll(); }
  if (a === "pchoose" && f) { S.panel = null; S.toastFor = f; work(f, "Replacing…", 1300); S.review = S.panelFrom === "review"; renderAll(); }
  if (a === "play") { S.menu = false; enterPlay(); }
}
["#loader", "#review", "#ph", "#playMenu", "#apanel", "#qload", "#phbox", "#toast"].forEach(function (s) { $(s).addEventListener("click", act); });
document.addEventListener("click", function (ev) { if (S.menu && !ev.target.closest("#playMenu")) { S.menu = false; renderMenu(); } });

$("#assetBtn").addEventListener("click", function (ev) {
  ev.stopPropagation(); if (S.review) return;
  if (S.panel === "browse") S.panel = null; else if (!S.panel) { S.panel = "browse"; S.panelFrom = ""; S.phOpen = 0; }
  renderAll();
});
$("#row").addEventListener("click", function (ev) {
  var c = ev.target.closest(".card"); if (!c) return;
  var n = +c.getAttribute("data-n");
  var st = S.scenes[n - 1].st;
  if (st === "queue" && !failedScene(n) && S.mode === "loading") {
    S.scenes.forEach(function (x) { if (x.st === "loading") x.st = "queue"; });
    S.scenes[n - 1].st = "loading"; S.userScroll = true;
  }
  S.sel = n; S.phOpen = 0; renderAll(); return;
});
$("#row").addEventListener("mouseover", function (ev) {
  var c = ev.target.closest(".card.miss"), T = $("#tipScene");
  if (!c) { T.classList.remove("show"); return; }
  var n = +c.getAttribute("data-n"), fs = missFor(n), r = c.getBoundingClientRect(), sr = $("#stage").getBoundingClientRect(), k = scale();
  T.innerHTML = "<p>" + fs.map(function (x) { return x.name; }).join(", ") + " couldn’t load.</p><p>The scene shows a placeholder.</p>";
  T.style.left = Math.round((r.left + r.width / 2 - sr.left) / k + 16 - 320) + "px"; T.style.top = Math.round((r.top - sr.top) / k - 64) + "px";
  T.classList.add("show");
});
$("#row").addEventListener("mouseleave", function () { $("#tipScene").classList.remove("show"); });
$(".strip").addEventListener("wheel", function (ev) {
  ev.preventDefault(); S.userScroll = true; S.scroll += (Math.abs(ev.deltaX) > Math.abs(ev.deltaY) ? ev.deltaX : ev.deltaY); renderRow();
}, { passive: false });

/* ---------- simulated events (keys F / A) ---------- */
function simulate(kind) {
  if (S.screen !== "editor") return;
  stopEngine(); clearTimeout(S.doneT); S.open = false; S.review = false; S.menu = false;
  S.scenes = S.scenes.map(function (s, i) { return { t: ASSETS[i], n: ASSETS[i], st: "ready" }; }); S.un = UNUSED;
  if (kind === "missing") { S.files = mkFiles(); S.mode = "missing"; }
  if (kind === "ready") { S.files = []; enterDone(); }
  renderAll();
}
document.addEventListener("keydown", function (ev) {
  if (ev.metaKey || ev.ctrlKey || ev.altKey) return;
  var k = ev.key.toLowerCase();
  if (S.screen === "s2" && k === "f") { clearTimeout(S.auto); show("s3"); return; }
  if (S.screen === "s3" && k === "f") { show("s3b"); return; }
  if (S.screen === "s3" && k === "a") {
    enterEditor();
    S.files = [{ id: "f0", name: "LSC_1_1.jpg", kind: "Image", icon: "image", scenes: [1], reason: "Timed out", busy: "", sceneFail: true }];
    S.scenes[0] = { t: 1, n: 0, st: "queue" }; S.sel = 2; renderAll(); return;
  }
  if (k === "f") simulate("missing");
  if (k === "a") simulate("ready");
  if (k === "escape" && S.playing) { exitPlay(); return; }
  if (S.playing) return;
  if (k === "escape") { S.menu = false; if (!S.panel && !S.review) S.phOpen = 0; if (S.panel) { S.panel = null; S.review = S.panelFrom === "review"; } else S.review = false; if (S.screen === "editor") renderAll(); }
});

/* ---------- navigation ---------- */
$("#s1click").addEventListener("click", function () { show("s2"); });
$("#s2").addEventListener("click", function () { clearTimeout(S.auto); enterEditor(); });
$("#s3bretry").addEventListener("click", function () { show("s2"); });
$("#s3bclose").addEventListener("click", function () { show("s1"); });
$("#playView").addEventListener("click", function (ev) { if (ev.target.closest("[data-act=exitplay]")) exitPlay(); });
$('[data-go="s1"]').addEventListener("click", function () { show("s1"); });

/* ---------- fit 1920x1080 stage ---------- */
function fit() { $("#stage").style.transform = "scale(" + scale() + ")"; }
addEventListener("resize", fit); fit();
S.scenes = freshScenes();
show("s1");
})();
