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
var ASSETS = [1,1,1,8,1,1,1,1,3,3,2,2,2,2,2,1], UNUSED = 4;   /* 36 assets in 16 scenes */
var TOTAL = ASSETS.reduce(function (a, b) { return a + b; }, 0) + UNUSED;
var FAILED = [4, 5];            /* scenes that time out in the failure flow (Figma boards 04, 04b, 08) */
var thumbs = [A + "s1.png", A + "s2.jpg", A + "bg.jpg", A + "s4.jpg", A + "s5.jpg", A + "s6.png", A + "s7.png", A + "s8.png",
              A + "blurred.jpg", A + "s4.jpg", A + "s5.jpg", A + "s6.png", A + "s7.png", A + "s8.png", A + "s2.jpg", A + "s1.png"];
var thumbFor = function (n) { return thumbs[(n - 1) % thumbs.length]; };

/* ---------- state ----------
   mode: loading (01/02/03/07) | failed (04/04b) | skipped (08/08b) | ready (06) */
var S = { screen: "s1", mode: "loading", open: false, scenes: [], sel: 1, scroll: 0, timer: null, auto: null, un: 0, tipFor: "" };
function freshScenes() {
  return ASSETS.map(function (t, i) { var n = i + 1; return n <= 3 ? { t: t, n: t, st: "ready" } : n === 4 ? { t: t, n: 5, st: "loading" } : { t: t, n: 0, st: "queue" }; });
}
var plural = function (n, w) { return n + " " + w + (n === 1 ? "" : "s"); };
function loaded() {
  if (S.mode === "ready") return TOTAL;
  if (S.mode === "failed" || S.mode === "skipped") return TOTAL - FAILED.length;
  var x = 0; S.scenes.forEach(function (s) { x += s.n; }); return x + S.un;
}
function currentLoading() { for (var i = 0; i < ASSETS.length; i++) if (S.scenes[i].st === "loading") return i + 1; return 0; }
var locked = function () { return S.mode !== "ready"; };
function isFailed(n) { return (S.mode === "failed" || S.mode === "skipped") && FAILED.indexOf(n) > -1; }

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
  if (id === "editor") { renderAll(); if (S.mode === "loading") startEngine(); }
}
function enterEditor(openFail) {
  S.mode = "loading"; S.open = false; S.sel = 1; S.scroll = 0; S.un = 0; S.userScroll = false;
  S.scenes = freshScenes(); show("editor");
  if (openFail) setMode("skipped");
}

/* ---------- loading engine: one asset per tick ---------- */
function startEngine() { stopEngine(); S.timer = setInterval(tick, 350); }
function stopEngine() { clearInterval(S.timer); S.timer = null; }
function promote() {
  for (var i = 0; i < ASSETS.length; i++) if (S.scenes[i].st === "queue") { S.scenes[i].st = "loading"; return i + 1; }
  return 0;
}
function tick() {
  if (S.mode !== "loading") return;
  var n = currentLoading() || promote();
  if (!n) { S.un++; if (S.un >= UNUSED) { S.un = UNUSED; setMode("ready"); return; } }
  else { var sc = S.scenes[n - 1]; sc.n = Math.min(sc.t, sc.n + 1); if (sc.n >= sc.t) { sc.st = "ready"; promote(); } }
  follow(); renderRow(); updateLoaderLive(); updateFooter(); updateTips();
}
function follow() {
  if (S.userScroll) return;
  var c = currentLoading(); if (!c) return;
  var l = (c - 1) * 154, r = l + 146;
  if (r > S.scroll + 1449) S.scroll = l - 600; else if (l < S.scroll) S.scroll = l;
}
function setMode(m) {
  S.mode = m; S.open = m === "failed" && S.open;
  if (m !== "loading") stopEngine();
  if (m === "ready") { S.scenes = S.scenes.map(function (s, i) { return { t: ASSETS[i], n: ASSETS[i], st: "ready" }; }); S.un = UNUSED; }
  if (m === "failed" || m === "skipped") {
    S.scenes = S.scenes.map(function (s, i) { var f = FAILED.indexOf(i + 1) > -1; return { t: ASSETS[i], n: f ? 0 : ASSETS[i], st: f ? "failed" : "ready" }; });
    S.un = UNUSED;
  }
  renderAll();
}

/* ---------- rendering ---------- */
function cardReady(n) {
  return '<div class="card' + (n === S.sel ? " sel" : "") + '" data-n="' + n + '"><div class="thumb" style="background-image:url(' + thumbFor(n) + ')"></div><div class="badge">' + n + "</div></div>";
}
function cardBox(n, cls, inner) { return '<div class="card state ' + cls + (n === S.sel ? " sel" : "") + '" data-n="' + n + '"><div class="box">' + inner + '<div class="badge">' + n + "</div></div></div>"; }
function renderRow() {
  var h = "";
  S.scenes.forEach(function (s, i) {
    var n = i + 1;
    if (s.st === "failed") h += cardBox(n, "failed", '<img class="ico" alt="" src="' + A + 'warn2.svg"><div class="lbl"><span class="t">Couldn’t load</span></div>');
    else if (s.st === "ready") h += cardReady(n);
    else if (s.st === "loading") h += cardBox(n, "loadingc", '<img class="ico" alt="" src="' + A + 'load.svg"><div class="track"></div><div class="fill" style="left:0;width:' + Math.round(140 * s.n / s.t) + 'px"></div><div class="lbl">Loading… ' + Math.round(100 * s.n / s.t) + "%</div>");
    else h += cardBox(n, "queue", '<img class="ico" alt="" src="' + A + 'clock.svg"><div class="lbl">In queue</div>');
  });
  var row = $("#row"); row.innerHTML = h;
  var full = ASSETS.length * 154 - 8, max = Math.max(0, full - 1449);
  S.scroll = Math.max(0, Math.min(S.scroll, max));
  row.style.transform = "translateX(" + (-S.scroll) + "px)";
  var bar = $(".sbar i"); bar.style.width = (Math.min(1, 1449 / full) * 100) + "%"; bar.style.left = (max ? S.scroll / full * 100 : 0) + "%";
}
function footerText() {
  var r = loaded();
  if (S.mode === "ready") return "All " + TOTAL + " assets ready";
  if (S.mode === "failed") return plural(FAILED.length, "scene") + " didn’t load. " + r + " of " + TOTAL + " assets ready";
  if (S.mode === "skipped") return plural(FAILED.length, "scene") + " still haven’t loaded. Play, Edit and Save stay locked.";
  return "Loading assets… " + r + " of " + TOTAL + " ready";
}
function updateFooter() { $("#footer").textContent = footerText(); }
function updateTips() {
  var left = TOTAL - loaded(), t;
  if (S.mode === "loading") t = "<p>Finish loading to play, edit and save.</p><p>" + left + " of " + TOTAL + " assets are still loading.</p>";
  else t = "<p>Finish loading to play, edit and save.</p><p>" + plural(FAILED.length, "scene") + " haven’t loaded yet. Retry them to continue.</p>";
  $("#tipPlay").innerHTML = t;
  $("#tipNew").innerHTML = "<p>New scene unlocks after loading.</p><p>" + left + " assets are still loading. You can add a scene as soon as they finish.</p>";
}
function chev(up) { return '<span class="chev"><img alt="" src="' + A + (up ? "chevup" : "chevron") + '.svg"></span>'; }
function pct() { return Math.round(loaded() / TOTAL * 100); }
function renderLoader() {
  var m = S.mode, L = $("#loader"), r = loaded(), h = "";
  if (m === "ready") { L.innerHTML = ""; return; }
  var failed = m !== "loading";
  if (!S.open) {
    if (!failed) h = '<a class="pill" data-act="toggle"><img class="spin" alt="" src="' + A + 'load2.svg"><span id="pillTxt">Loading assets ' + r + "/" + TOTAL + '</span><span class="mini"><i id="pillBar" style="width:' + Math.round(48 * r / TOTAL) + 'px"></i></span>' + chev(false) + "</a>";
    else h = '<a class="pill err" data-act="toggle"><img alt="" src="' + A + 'warn2.svg"><span>' + plural(FAILED.length, "scene") + ' failed</span><span class="link" data-act="retry">Retry</span>' + chev(false) + "</a>";
  } else {
    var bar = '<div class="prog"><div class="cnt"><b id="cPct">' + pct() + '%</b><span id="cOf">' + r + " of " + TOTAL + ' assets ready</span></div><div class="track"><i id="cBar" style="width:' + pct() + '%"></i></div></div>';
    if (!failed) h = '<div class="lcard"><div class="head" data-act="toggle"><img class="spin" alt="" src="' + A + 'load.svg"><span>Loading assets</span>' + chev(true) + "</div>" + bar +
      '<p class="note">Now loading Kitchen Walkthrough. Play, Edit and Save unlock when all assets are ready.</p></div>';
    else h = '<div class="lcard"><div class="head" data-act="toggle"><img alt="" src="' + A + 'warn2.svg"><span>' + plural(FAILED.length, "scene") + " didn’t load</span>" + chev(true) + "</div>" + bar +
      '<div class="rule err"><span>' + plural(FAILED.length, "scene") + ' timed out. Play, Edit and Save stay locked until they load.</span></div>' +
      '<div class="btns"><a class="cbtn pri" data-act="retry">Retry ' + plural(FAILED.length, "scene") + '</a><a class="cbtn sec" data-act="skip">Skip for now</a></div></div>';
  }
  L.innerHTML = h;
}
function updateLoaderLive() {
  var r = loaded(), e;
  if ((e = $("#pillTxt"))) e.textContent = "Loading assets " + r + "/" + TOTAL;
  if ((e = $("#pillBar"))) e.style.width = Math.round(48 * r / TOTAL) + "px";
  if ((e = $("#cOf"))) e.textContent = r + " of " + TOTAL + " assets ready";
  if ((e = $("#cPct"))) e.textContent = pct() + "%";
  if ((e = $("#cBar"))) e.style.width = pct() + "%";
}
function toast(t) { var T = $("#toast"); T.innerHTML = '<img alt="" src="' + A + 'check.svg"><span>' + t + "</span>"; T.classList.add("on"); clearTimeout(S.toastT); S.toastT = setTimeout(function () { T.classList.remove("on"); }, 2400); }
function renderAll() {
  var ed = $("#editor"), lk = locked();
  ed.classList.toggle("locked", lk); ed.classList.toggle("ready", !lk); ed.classList.toggle("playlocked", lk);
  $("#playBtn").setAttribute("aria-disabled", lk); $("#saveBtn").setAttribute("aria-disabled", lk);
  renderRow(); updateFooter(); updateTips(); renderLoader(); hideTips();
}

/* ---------- retry: failed scenes load again, then everything is ready (Figma 04b to 06) ---------- */
function retryFailed() {
  if (S.retrying) return; S.retrying = true;
  S.scenes = S.scenes.map(function (s, i) { return FAILED.indexOf(i + 1) > -1 ? { t: ASSETS[i], n: 0, st: "loading" } : s; });
  S.mode = "loading"; S.open = true; S.un = UNUSED; renderAll(); startEngine();
  setTimeout(function () { S.retrying = false; if (S.mode === "loading") { stopEngine(); setMode("ready"); } }, 1800);
}

/* ---------- tooltips ---------- */
function hideTips() { $("#tipPlay").classList.remove("show"); $("#tipNew").classList.remove("show"); }
function showPlayTip() { if (locked() && S.tipFor) $("#tipPlay").classList.add("show"); }
Array.prototype.slice.call(document.querySelectorAll("#playBtn, #saveBtn")).forEach(function (e) {
  var en = function () { S.tipFor = e.id; updateTips(); showPlayTip(); }; e.addEventListener("mouseenter", en); e.addEventListener("focus", en);
  e.addEventListener("mouseleave", hideTips); e.addEventListener("blur", hideTips);
  e.addEventListener("click", function (ev) {
    ev.stopPropagation();
    if (locked()) { S.tipFor = e.id; updateTips(); showPlayTip(); return; }
    if (e.id === "saveBtn") toast("Project saved");
  });
});
var ns = $("#newScene");
ns.addEventListener("click", function (ev) { ev.stopPropagation(); if (locked()) { updateTips(); $("#tipNew").classList.add("show"); } });
ns.addEventListener("mouseenter", function () { if (locked()) $("#tipNew").classList.add("show"); });
ns.addEventListener("mouseleave", hideTips);
document.addEventListener("click", hideTips);

/* ---------- delegated clicks ---------- */
$("#loader").addEventListener("click", function (ev) {
  var t = ev.target.closest("[data-act]"); if (!t) return;
  var a = t.getAttribute("data-act");
  ev.stopPropagation();
  if (a === "toggle") { S.open = !S.open; renderLoader(); }
  if (a === "retry") retryFailed();
  if (a === "skip") { S.open = false; setMode("skipped"); }
});
$("#row").addEventListener("click", function (ev) {
  var c = ev.target.closest(".card"); if (!c) return;
  var n = +c.getAttribute("data-n"), st = S.scenes[n - 1].st;
  if (st === "queue" && S.mode === "loading") {
    S.scenes.forEach(function (x) { if (x.st === "loading") x.st = "queue"; });
    S.scenes[n - 1].st = "loading"; S.userScroll = true;
  }
  S.sel = n; renderAll();
});
$(".strip").addEventListener("wheel", function (ev) {
  ev.preventDefault(); S.userScroll = true; S.scroll += (Math.abs(ev.deltaX) > Math.abs(ev.deltaY) ? ev.deltaX : ev.deltaY); renderRow();
}, { passive: false });

/* ---------- simulated events (keys F / A) ---------- */
document.addEventListener("keydown", function (ev) {
  if (ev.metaKey || ev.ctrlKey || ev.altKey) return;
  var k = ev.key.toLowerCase();
  if (S.screen === "s2" && k === "f") { clearTimeout(S.auto); show("s3"); return; }
  if (S.screen === "editor" && S.mode === "loading") {
    if (k === "f") { S.open = false; setMode("failed"); }
    if (k === "a") { S.open = false; setMode("ready"); }
  }
  if (k === "escape") { S.open = false; if (S.screen === "editor") { renderLoader(); hideTips(); } }
});

/* ---------- navigation ---------- */
$("#s1click").addEventListener("click", function () { show("s2"); });
$("#s2").addEventListener("click", function () { clearTimeout(S.auto); enterEditor(); });
$("#s3retry").addEventListener("click", function () { show("s2"); });
$("#s3open").addEventListener("click", function () { enterEditor(true); });
$("#editor").addEventListener("click", function (ev) { if (S.mode === "ready" && ev.target.closest("#footer")) show("s1"); });
$('[data-go="s1"]').addEventListener("click", function () { show("s1"); });
$("#assetBtn").addEventListener("click", function (ev) { ev.stopPropagation(); });

/* ---------- fit 1920x1080 stage ---------- */
var scale = function () { return Math.min(innerWidth / 1920, innerHeight / 1080); };
function fit() { $("#stage").style.transform = "scale(" + scale() + ")"; }
addEventListener("resize", fit); fit();
S.scenes = freshScenes();
show("s1");
})();
