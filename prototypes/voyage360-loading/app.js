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
var ASSETS = [1,1,1,8,1,1,1,1,3,3,3,3,3,3,2,1];
var TOTAL = ASSETS.reduce(function (a, b) { return a + b; }, 0);   /* 36 assets in 16 scenes */
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
  timer: null, auto: null, doneT: null
};
function freshScenes() {
  return ASSETS.map(function (t, i) { var n = i + 1; return n <= 3 ? { t: t, n: t, st: "ready" } : n === 4 ? { t: t, n: 5, st: "loading" } : { t: t, n: 0, st: "queue" }; });
}
var plural = function (n, w) { return n + " " + w + (n === 1 ? "" : "s"); };
var openFiles = function () { return S.files; };
function lostAssets() { var x = 0; S.files.forEach(function (f) { if (!f.sceneFail) x++; }); return x; }
function loaded() { var x = 0; S.scenes.forEach(function (s) { x += s.n; }); return x - lostAssets(); }
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
  S.mode = "loading"; S.open = false; S.review = false; S.menu = false; S.panel = null; S.userScroll = false; S.sel = 1; S.scroll = 0;
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
  if (!n) { finish(); return; }
  var sc = S.scenes[n - 1];
  sc.n = Math.min(sc.t, sc.n + 1);
  if (sc.n >= sc.t) { sc.st = "ready"; if (!promote()) { finish(); return; } }
  follow(); renderRow(); updateLoaderLive(); updateFooter(); updateTips();
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
function cardBox(n, cls, inner) { return '<div class="card state ' + cls + '" data-n="' + n + '"><div class="box">' + inner + '<div class="badge">' + n + "</div></div></div>"; }
function renderRow() {
  var h = "";
  S.scenes.forEach(function (s, i) {
    var n = i + 1;
    if (failedScene(n)) h += cardBox(n, "failed", '<img class="ico" alt="" src="' + A + 'warn2.svg"><div class="lbl"><span class="t">Couldn’t load</span><span class="h">Retry</span></div>');
    else if (s.st === "ready") h += cardReady(n);
    else if (s.st === "loading") h += cardBox(n, "loadingc", '<div class="blur"></div><div class="dim"></div><img class="ico" alt="" src="' + A + 'load.svg"><div class="track"></div><div class="fill" style="left:0;width:' + Math.round(140 * s.n / s.t) + 'px"></div><div class="lbl">' + s.n + " of " + s.t + " assets</div>");
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
    return "Loading finished · " + plural(S.files.length, "file") + " missing in " + plural(Object.keys(sc).length, "scene");
  }
  var k = readyScenes();
  return "Loading assets · " + r + " of " + TOTAL + " ready" + (k ? " · " + (k === 1 ? "Scene 1 can" : "Scenes 1–" + k + " can") + " be edited" : "");
}
function updateFooter() { $("#footer").textContent = footerText(); }
function updateTips() {
  var left = TOTAL - loaded();
  $("#tipPlay").innerHTML = "<p>Play all and Save unlock when loading finishes. " + plural(left, "asset") + " left.</p><p>To preview now, use Play › Play from current scene.</p>";
  $("#tipNew").innerHTML = "<p>New scene unlocks when loading finishes.</p><p>" + plural(left, "asset") + " left.</p>";
}
function chev(up) { return '<span class="chev" data-act="toggle"><img alt="" src="' + A + (up ? "chevup" : "chevron") + '.svg"></span>'; }
function renderLoader() {
  var m = S.mode, L = $("#loader"), h = "", r = loaded(), pct = Math.round(r / TOTAL * 100), f = S.files.length;
  if (m === "ready" || S.review) { L.innerHTML = ""; return; }
  if (m === "done") { L.innerHTML = '<a class="pill ok"><img alt="" src="' + A + 'check.svg"><span>All assets ready</span></a>'; return; }
  var k = readyScenes(), cur = currentLoading();
  if (!S.open) {
    if (m === "loading") h = '<a class="pill" data-act="toggle"><img class="spin" alt="" src="' + A + 'load2.svg"><span id="pillTxt">Loading assets ' + r + "/" + TOTAL + '</span><span class="mini"><i id="pillBar" style="width:' + Math.round(48 * r / TOTAL) + 'px"></i></span>' + chev(false) + "</a>";
    if (m === "missing") h = '<a class="pill warn"><img alt="" src="' + A + 'warn-amber.svg"><span>' + plural(f, "file") + ' missing</span><span class="link" data-act="review">Review</span>' + chev(false) + "</a>";
  } else {
    var bar = '<div class="prog"><div class="track"><i id="cBar" style="width:' + pct + '%"></i></div><div class="cnt"><span id="cOf">' + r + " of " + TOTAL + ' assets ready</span><span id="cScene">' + (m === "loading" ? "Scene " + (cur || k + 1) + " of " + NS : "Loading finished") + "</span></div></div>";
    if (m === "loading") h = '<div class="lcard"><div class="head" data-act="toggle"><img class="spin" alt="" src="' + A + 'load.svg"><span>Loading assets</span>' + chev(true) + "</div>" + bar + '<div id="cList">' + checklist() + "</div>" +
      '<p class="note" id="cNote">' + noteText() + "</p></div>";
    if (m === "missing") h = '<div class="lcard"><div class="head" data-act="toggle"><img alt="" src="' + A + 'warn-amber.svg"><span>' + plural(f, "file") + " " + (f === 1 ? "is" : "are") + " missing</span>" + chev(true) + "</div>" + bar +
      '<div class="rule warn"><span>Their scenes still open, with placeholders. Play, Edit and Save are available.</span></div><div class="btns"><a class="cbtn sec" data-act="retryall">Retry ' + plural(f, "file") + '</a><a class="cbtn pri" data-act="review">Review</a></div></div>';
  }
  L.innerHTML = h;
}
function range(a, b) { return a === b ? "Scene " + a : "Scenes " + a + "–" + b; }
function checklist() {
  var rows = [], k = readyScenes();
  function row(ic, lab, st, strong) { return '<div class="crow' + (strong ? " strong" : "") + '"><img' + (ic === "load" ? ' class="spin"' : "") + ' alt="" src="' + A + ic + '.svg"><span class="cl">' + lab + '</span><span class="cs">' + st + "</span></div>"; }
  if (k) rows.push(row("check", range(1, k), "Ready"));
  var shown = 0, n;
  for (n = k + 1; n <= NS && shown < 3; n++, shown++) {
    var sc = S.scenes[n - 1];
    if (sc.st === "loading") rows.push(row("load", "Scene " + n + (n === 4 ? " · Kitchen Walkthrough" : ""), sc.n + " of " + sc.t + " assets", true));
    else rows.push(row("clock", "Scene " + n, "In queue"));
  }
  if (n <= NS) rows.push(row("clock", range(n, NS), "In queue"));
  return '<div class="clist">' + rows.join("") + "</div>";
}
function noteText() { return "Play all and Save unlock when loading finishes."; }
function updateLoaderLive() {
  var r = loaded(), pct = Math.round(r / TOTAL * 100), e;
  if ((e = $("#pillTxt"))) e.textContent = "Loading assets " + r + "/" + TOTAL;
  if ((e = $("#pillBar"))) e.style.width = Math.round(48 * r / TOTAL) + "px";
  if ((e = $("#cOf"))) e.textContent = r + " of " + TOTAL + " assets ready";
  if ((e = $("#cBar"))) e.style.width = pct + "%";
  if ((e = $("#cScene"))) e.textContent = "Scene " + (currentLoading() || readyScenes() + 1) + " of " + NS;
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
  P.innerHTML = '<div class="rhead"><img alt="" src="' + A + 'warn-amber.svg"><span>' + (f === 1 ? "Missing file" : "Missing files") + '</span><a class="x" data-act="rclose"><img alt="" src="' + A + 'close.svg"></a></div>' +
    '<p class="lead">' + (f === 1 ? "This file couldn’t load. Its scenes still open, with placeholders where the file is used." : "These " + f + " files couldn’t load. Their scenes still open, with placeholders where the files are used.") + "</p>" +
    '<div class="rlist">' + rows + '</div><div class="rfoot"><a class="cbtn ter" data-act="rclose">Close</a><a class="cbtn pri' + (busy ? " off" : "") + '" data-act="retryall">Retry all</a></div>';
  P.classList.add("on");
}
function renderPlaceholder() {
  var P = $("#ph"), f = missFor(S.sel)[0];
  if (!f || S.mode === "loading" && false) { P.classList.remove("on"); P.innerHTML = ""; return; }
  P.innerHTML = '<img alt="" src="' + A + f.icon + '.svg"><b>' + f.name + ' is missing</b><span>' + f.reason + ". The scene still plays, with this placeholder.</span>" +
    '<div class="ac">' + (f.busy ? '<span class="busy"><img class="spin" alt="" src="' + A + 'load2.svg">' + f.busy + "</span>" : '<a class="cbtn ter" data-act="retry" data-id="' + f.id + '">Retry</a><a class="cbtn sec" data-act="replace" data-id="' + f.id + '">Replace…</a>') + "</div>";
  P.classList.add("on");
}
function renderMenu() {
  var M = $("#playMenu"), lk = locked();
  if (!S.menu) { M.classList.remove("on"); return; }
  function it(id, t, off, hov) { return '<a class="mi' + (off ? " off" : "") + '" data-act="' + (off ? "" : "play") + '" data-id="' + id + '"><span>' + t + "</span>" + (off ? "<em>after loading</em>" : "") + "</a>"; }
  M.innerHTML = it("all", "Play all", lk) + it("cur", "Play from current scene", false) + it("vr", "Play with VR headset", lk);
  M.classList.add("on");
}
function renderAll() {
  var ed = $("#editor"), lk = locked();
  ed.classList.toggle("locked", lk); ed.classList.toggle("playlocked", lk); ed.classList.toggle("ready", !lk);
  $("#playBtn").setAttribute("aria-disabled", lk); $("#saveBtn").setAttribute("aria-disabled", lk);
  renderRow(); updateFooter(); updateTips(); renderLoader(); renderReview(); renderPlaceholder(); renderMenu(); renderPanel(); hideTips();
}

/* ---------- file actions ---------- */
function fileById(id) { return S.files.filter(function (f) { return f.id === id; })[0]; }
function resolveFile(f) {
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
function renderPanel() {
  var P = $("#apanel"), f = fileById(S.panel);
  if (!f) { S.panel = null; P.classList.remove("on"); P.innerHTML = ""; return; }
  var sc = f.scenes.length > 1 ? "Scenes " + f.scenes.slice(0, -1).join(", ") + " and " + f.scenes[f.scenes.length - 1] : "Scene " + f.scenes[0];
  var tabs = ["Images", "Icons", "Videos", "Audio"].map(function (t) { return '<span class="tg' + (t === f.kind + "s" ? " on" : "") + '">' + t + "</span>"; }).join("");
  P.innerHTML = '<div class="ph"><img alt="" src="' + A + 'media.svg"><b>Asset Panel</b><a class="x" data-act="pcancel"><img alt="" src="' + A + 'close.svg"></a></div>' +
    '<div class="ptabs"><span class="tb on">Local</span><span class="tb">Online</span></div><div class="pline"></div>' +
    '<div class="pbody"><div class="tgs">' + tabs + '</div><div class="pfilter"><span class="search">Search media…</span><span class="dd">All</span></div>' +
    '<div class="ptile"><div class="mth"><img alt="" src="' + A + 'warn-amber.svg"><span>Missing</span><em>' + f.kind + " · " + f.reason + "</em></div><b>" + f.name + "</b></div></div>" +
    '<div class="pbar"><span>Replacing ' + f.name + " · " + sc + '</span><div class="ac"><a class="cbtn ter" data-act="pcancel">Cancel</a><a class="cbtn pri" data-act="pchoose" data-id="' + f.id + '">Choose file…</a></div></div>';
  P.classList.add("on");
}

/* ---------- tooltips ---------- */
function hideTips() { $("#tipPlay").classList.remove("show"); $("#tipNew").classList.remove("show"); $("#tipScene").classList.remove("show"); }
function showPlayTip() { if (locked() && !S.menu) $("#tipPlay").classList.add("show"); }
var scale = function () { return Math.min(innerWidth / 1920, innerHeight / 1080); };
Array.prototype.slice.call(document.querySelectorAll("#playBtn,#saveBtn")).forEach(function (e) {
  e.addEventListener("mouseenter", showPlayTip); e.addEventListener("focus", showPlayTip);
  e.addEventListener("mouseleave", hideTips); e.addEventListener("blur", hideTips);
  e.addEventListener("click", function (ev) {
    ev.stopPropagation();
    if (e.id === "playBtn") {
      if (locked() || ev.target.closest(".b")) { S.menu = !S.menu; hideTips(); renderMenu(); }
      else show("s1");
    }
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
  if (a === "rclose") { S.review = false; S.open = true; renderAll(); }
  if (a === "retryall") retryAll();
  if (a === "retry" && f) work(f, "Retrying…", 900);
  if (a === "replace" && f) pickFile(f);
  if (a === "pcancel") { S.panel = null; S.review = S.panelFrom === "review"; renderAll(); }
  if (a === "pchoose" && f) { S.panel = null; work(f, "Replacing…", 1300); S.review = S.panelFrom === "review"; renderAll(); }
  if (a === "play") { S.menu = false; show("s1"); }
}
["#loader", "#review", "#ph", "#playMenu", "#apanel"].forEach(function (s) { $(s).addEventListener("click", act); });
document.addEventListener("click", function (ev) { if (S.menu && !ev.target.closest("#playMenu")) { S.menu = false; renderMenu(); } });

$("#row").addEventListener("click", function (ev) {
  var c = ev.target.closest(".card"); if (!c) return;
  var n = +c.getAttribute("data-n");
  if (c.classList.contains("failed")) {
    var f = S.files.filter(function (x) { return x.sceneFail && x.scenes.indexOf(n) > -1; })[0];
    if (f) work(f, "Retrying…", 900);
    return;
  }
  if (S.scenes[n - 1].st !== "ready") return;
  S.sel = n; renderRow(); renderPlaceholder();
});
$("#row").addEventListener("mouseover", function (ev) {
  var c = ev.target.closest(".card.miss"), T = $("#tipScene");
  if (!c) { T.classList.remove("show"); return; }
  var n = +c.getAttribute("data-n"), fs = missFor(n), r = c.getBoundingClientRect(), sr = $("#stage").getBoundingClientRect(), k = scale();
  T.innerHTML = "<p>Scene " + n + " · " + plural(fs.length, "file") + " missing</p><p>" + fs.map(function (x) { return x.name; }).join(", ") + " couldn’t load. The scene opens with a placeholder.</p>";
  T.style.left = Math.round((r.left - sr.left) / k) + "px"; T.style.top = Math.round((r.top - sr.top) / k - 92) + "px";
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
  S.scenes = S.scenes.map(function (s, i) { return { t: ASSETS[i], n: ASSETS[i], st: "ready" }; });
  if (kind === "missing") { S.files = mkFiles(); S.mode = "missing"; }
  if (kind === "ready") { S.files = []; S.mode = "ready"; }
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
  if (k === "escape") { S.menu = false; if (S.panel) { S.panel = null; S.review = S.panelFrom === "review"; } else S.review = false; if (S.screen === "editor") renderAll(); }
});

/* ---------- navigation ---------- */
$("#s1click").addEventListener("click", function () { show("s2"); });
$("#s2").addEventListener("click", function () { clearTimeout(S.auto); enterEditor(); });
$("#s3bretry").addEventListener("click", function () { show("s2"); });
$("#s3bclose").addEventListener("click", function () { show("s1"); });
$("#canvas").addEventListener("click", function () { if (S.mode === "ready") show("s1"); });
$('[data-go="s1"]').addEventListener("click", function () { show("s1"); });

/* ---------- fit 1920x1080 stage ---------- */
function fit() { $("#stage").style.transform = "scale(" + scale() + ")"; }
addEventListener("resize", fit); fit();
S.scenes = freshScenes();
show("s1");
})();
