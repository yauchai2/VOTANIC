/* Voyage 360 · Loading Enhancement — working prototype
   A small state machine plus a real loading engine:
   scenes load one after another, counts / pill / card / footer / Play+Save lock all derive from that state. */
(function () {
"use strict";
var $ = function (s, r) { return (r || document).querySelector(s); };
var A = "assets/";
var TOTAL = 36, TICK_MS = 100, STEP = 0.1;   /* ~1 s per scene */

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
var thumbs = [A + "s1.png", A + "s2.jpg", A + "bg.jpg", A + "s4.jpg", A + "s5.jpg", A + "s6.png", A + "s7.png", A + "s8.png",
              A + "blurred.jpg", A + "s4.jpg", A + "s5.jpg", A + "s6.png", A + "s7.png", A + "s8.png", A + "s2.jpg", A + "s1.png"];
var thumbFor = function (n) { return thumbs[(n - 1) % thumbs.length]; };
var NAMES = { 9: "Kitchen Walkthrough" };
var nameOf = function (n) { return NAMES[n] || "Scene " + n; };

/* ---------- state ---------- */
var S = {
  screen: "s1",
  mode: "loading",          /* loading | failed | offline | ready */
  open: false,              /* loader card expanded */
  scenes: [],               /* {st:'ready'|'loading'|'queue'|'failed', p:0..1} */
  scroll: 0,
  timer: null, auto: null, cdTimer: null, countdown: 10
};
function freshScenes() {
  var a = [];
  for (var i = 1; i <= TOTAL; i++) a.push(i <= 8 ? { st: "ready", p: 1 } : i === 9 ? { st: "loading", p: 0.6 } : { st: "queue", p: 0 });
  return a;
}
var count = function (st) { return S.scenes.filter(function (s) { return s.st === st; }).length; };
var failedList = function () { var r = []; S.scenes.forEach(function (s, i) { if (s.st === "failed") r.push(i + 1); }); return r; };
var currentLoading = function () { for (var i = 0; i < S.scenes.length; i++) if (S.scenes[i].st === "loading") return i + 1; return 0; };
var plural = function (n, w) { return n + " " + w + (n === 1 ? "" : "s"); };

/* ---------- screens ---------- */
function show(id) {
  S.screen = id;
  document.querySelectorAll(".screen").forEach(function (e) { e.classList.toggle("on", e.id === id); });
  clearTimeout(S.auto); stopEngine(); stopCountdown();
  if (id === "s1") S.auto = setTimeout(function () { show("s2"); }, 3200);
  if (id === "s2") {
    var b = $("#s2bar"); b.style.transition = "none"; b.style.width = "12%";
    requestAnimationFrame(function () { requestAnimationFrame(function () { b.style.transition = "width 3.2s linear"; b.style.width = "100%"; }); });
    S.auto = setTimeout(function () { enterEditor(); }, 3400);
  }
  if (id === "editor") { renderAll(); if (S.mode === "loading") startEngine(); }
}
function enterEditor() { S.mode = "loading"; S.open = false; S.scenes = freshScenes(); S.scroll = 0; show("editor"); }

/* ---------- loading engine ---------- */
function startEngine() { stopEngine(); S.timer = setInterval(tick, TICK_MS); }
function stopEngine() { clearInterval(S.timer); S.timer = null; }
function tick() {
  if (S.mode !== "loading") return;
  var n = currentLoading();
  if (!n) { n = promote(); }
  if (!n) { finish(); return; }
  var sc = S.scenes[n - 1];
  sc.p = Math.min(1, sc.p + STEP);
  if (sc.p >= 1) { sc.st = "ready"; if (!promote()) { finish(); return; } }
  renderRow(); updateLoaderLive(); updateFooter();
}
function promote() {
  for (var i = 0; i < S.scenes.length; i++) if (S.scenes[i].st === "queue") { S.scenes[i].st = "loading"; S.scenes[i].p = 0; return i + 1; }
  return 0;
}
function finish() {
  stopEngine();
  S.mode = failedList().length ? "failed" : "ready";
  S.open = false; renderAll();
}

/* ---------- rendering ---------- */
function cardReady(n) {
  var sel = n === 1;
  return '<div class="card' + (sel ? " sel" : "") + '" data-n="' + n + '"><div class="thumb" style="background-image:url(' + thumbFor(n) + ')"></div><div class="badge">' + n + "</div>" +
    (sel ? '<div class="dots"><img alt="" src="' + A + 'dots.svg"></div>' : "") + "</div>";
}
function cardBox(n, cls, inner) { return '<div class="card state ' + cls + '" data-n="' + n + '"><div class="box">' + inner + '<div class="badge">' + n + "</div></div></div>"; }
function renderRow() {
  var h = "";
  S.scenes.forEach(function (s, i) {
    var n = i + 1;
    if (s.st === "ready") h += cardReady(n);
    else if (s.st === "failed") h += cardBox(n, "failed", '<img class="ico" alt="" src="' + A + 'warn2.svg"><div class="lbl"><span class="t">Couldn’t load</span><span class="h">Retry</span></div>');
    else if (s.st === "loading") {
      var pct = Math.round(s.p * 100), w = Math.round(140 * s.p);
      h += cardBox(n, "loadingc", '<div class="blur"></div><div class="dim"></div><img class="ico" alt="" src="' + A + 'load.svg"><div class="track"></div><div class="fill" style="left:0;width:' + w + 'px"></div><div class="lbl">Loading… ' + pct + "%</div>");
    } else h += cardBox(n, "queue", '<img class="ico" alt="" src="' + A + 'clock.svg"><div class="lbl">In queue</div>');
  });
  var row = $("#row"); row.innerHTML = h;
  var max = Math.max(0, TOTAL * 154 - 8 - 1449);
  S.scroll = Math.max(0, Math.min(S.scroll, max));
  row.style.transform = "translateX(" + (-S.scroll) + "px)";
  var bar = $(".sbar i"); bar.style.width = (1449 / (TOTAL * 154 - 8) * 100) + "%"; bar.style.left = (max ? S.scroll / (TOTAL * 154 - 8) * 100 : 0) + "%";
}
function footerText() {
  var r = count("ready");
  if (S.mode === "ready") return "All " + TOTAL + " assets ready";
  if (S.mode === "offline") return "Offline. Project loaded locally; some assets not synced.";
  if (S.mode === "skipped") return plural(failedList().length, "scene") + " skipped. Play, Edit and Save unlock when they load or are removed.";
  if (S.mode === "empty") return "No scenes yet";
  if (S.mode === "failed") return plural(failedList().length, "scene") + " didn’t load. " + r + " of " + TOTAL + " assets ready";
  return "Loading assets… " + r + " of " + TOTAL + " ready";
}
function updateFooter() { $("#footer").textContent = footerText(); }
function updateTips() {
  var left = TOTAL - count("ready");
  if (S.mode === "empty") $("#tipPlay").innerHTML = "<p>Add a scene to play, edit and save.</p>";
  else $("#tipPlay").innerHTML = "<p>Finish loading to play, edit and save.</p><p>" + (S.mode === "skipped" || S.mode === "failed" ? plural(failedList().length, "scene") + " can’t load. Retry them or remove them from the strip." : plural(left, "asset") + (left === 1 ? " is" : " are") + " still loading. Open any ready scene to keep browsing.") + "</p>";
  $("#tipNew").innerHTML = "<p>New scene unlocks after loading.</p><p>" + plural(left, "asset") + (left === 1 ? " is" : " are") + " still loading. You can add a scene as soon as they finish.</p>";
}
function chev(up) { return '<span class="chev" data-act="toggle"><img alt="" src="' + A + (up ? "chevup" : "chevron") + '.svg"></span>'; }
function renderLoader() {
  var m = S.mode, L = $("#loader"), h = "", r = count("ready"), pct = Math.round(r / TOTAL * 100), f = failedList().length;
  if (m === "ready" || m === "empty") { L.innerHTML = ""; return; }
  if (!S.open) {
    if (m === "loading") h = '<a class="pill" data-act="toggle"><img class="spin" alt="" src="' + A + 'load2.svg"><span id="pillTxt">Loading ' + r + "/" + TOTAL + '</span><span class="mini"><i id="pillBar" style="width:' + Math.round(48 * r / TOTAL) + 'px"></i></span>' + chev(false) + "</a>";
    if (m === "failed" || m === "skipped") h = '<a class="pill err" data-act="toggle"><img alt="" src="' + A + 'warn.svg"><span>' + plural(f, "scene") + ' failed</span><span class="link">Retry</span>' + chev(false) + "</a>";
    if (m === "offline") h = '<a class="pill" data-act="toggle"><img alt="" src="' + A + 'warn.svg"><span>Offline · some assets not synced</span>' + chev(false) + "</a>";
  } else {
    var count_ = '<div class="cnt"><b id="cPct">' + pct + '%</b><span id="cOf">' + r + " of " + TOTAL + ' assets ready</span></div><div class="track"><i id="cBar" style="width:' + pct + '%"></i></div>';
    if (m === "loading") h = '<div class="lcard"><div class="head" data-act="toggle"><img class="spin" alt="" src="' + A + 'load.svg"><span>Loading assets</span>' + chev(true) + "</div>" + count_ +
      '<p class="note" id="cNote">Now loading ' + nameOf(currentLoading() || r + 1) + ". Play, Edit and Save unlock when all assets are ready.</p></div>";
    if (m === "skipped") h = '<div class="lcard"><div class="head" data-act="toggle"><img alt="" src="' + A + 'warn.svg"><span>' + plural(f, "scene") + " didn’t load</span>" + chev(true) + "</div>" + count_ +
      '<div class="rule err"><span>' + plural(f, "scene") + ' skipped. Play, Edit and Save stay locked until they load or you remove them.</span></div><div class="btns"><a class="cbtn pri" data-act="retry">Retry ' + plural(f, "scene") + '</a></div></div>';
    if (m === "failed") h = '<div class="lcard"><div class="head" data-act="toggle"><img alt="" src="' + A + 'warn.svg"><span>' + plural(f, "scene") + " didn’t load</span>" + chev(true) + "</div>" + count_ +
      '<div class="rule err"><span>' + plural(f, "scene") + ' timed out. Play, Edit and Save stay locked until they load or you remove them.</span></div><div class="btns"><a class="cbtn pri" data-act="retry">Retry ' + plural(f, "scene") + '</a><a class="cbtn sec" data-act="skip">Skip for now</a></div></div>';
    if (m === "offline") h = '<div class="lcard"><div class="head" data-act="toggle"><img alt="" src="' + A + 'warn.svg"><span>Connection lost</span>' + chev(true) + "</div>" + count_ +
      '<div class="rule info"><span>Loading is paused and resumes when you are back online.</span></div><div class="btns off"><a class="cbtn pri" data-act="retryNow">Retry now</a><small id="cd">Checking again in ' + S.countdown + " s</small></div></div>";
  }
  L.innerHTML = h;
}
function updateLoaderLive() {
  var r = count("ready"), pct = Math.round(r / TOTAL * 100), e;
  if ((e = $("#pillTxt"))) e.textContent = "Loading " + r + "/" + TOTAL;
  if ((e = $("#pillBar"))) e.style.width = Math.round(48 * r / TOTAL) + "px";
  if ((e = $("#cPct"))) e.textContent = pct + "%";
  if ((e = $("#cOf"))) e.textContent = r + " of " + TOTAL + " assets ready";
  if ((e = $("#cBar"))) e.style.width = pct + "%";
  if ((e = $("#cNote"))) e.textContent = "Now loading " + nameOf(currentLoading() || r + 1) + ". Play, Edit and Save unlock when all assets are ready.";
  updateTips();
}
function renderAll() {
  var ed = $("#editor"), m = S.mode;
  var lock = m === "loading" || m === "failed" || m === "skipped" || m === "empty";
  ed.classList.toggle("locked", lock); ed.classList.toggle("playlocked", lock); ed.classList.toggle("ready", !lock);
  ed.classList.toggle("empty", m === "empty");
  $("#playBtn").setAttribute("aria-disabled", lock); $("#saveBtn").setAttribute("aria-disabled", lock);
  renderRow(); updateFooter(); updateTips(); renderLoader(); hideTips();
}

/* ---------- tooltips ---------- */
function hideTips() { $("#tipPlay").classList.remove("show"); $("#tipNew").classList.remove("show"); }
function showPlayTip() { if ($("#editor").classList.contains("playlocked")) $("#tipPlay").classList.add("show"); }
Array.prototype.slice.call(document.querySelectorAll("#playBtn,#saveBtn,.hdr .ibtn")).forEach(function (e) {
  var tip = showPlayTip;
  e.addEventListener("mouseenter", tip); e.addEventListener("focus", tip);
  e.addEventListener("mouseleave", hideTips); e.addEventListener("blur", hideTips);
  e.addEventListener("click", function (ev) {
    ev.stopPropagation();
    if (!$("#editor").classList.contains("locked")) { if (e.id === "playBtn") show("s1"); return; }
    tip(); setTimeout(hideTips, 1800);
  });
});
var ns = $("#newScene");
ns.addEventListener("click", function (ev) {
  ev.stopPropagation();
  if (S.mode === "empty") { addFirstScene(); return; }
  if (S.mode === "loading") { $("#tipNew").classList.add("show"); setTimeout(function () { $("#tipNew").classList.remove("show"); }, 3000); }
});
ns.addEventListener("mouseleave", function () { $("#tipNew").classList.remove("show"); });
document.addEventListener("click", hideTips, true);

/* ---------- loader actions ---------- */
function retryFailed() {
  S.scenes.forEach(function (s) { if (s.st === "failed") { s.st = "queue"; s.p = 0; } });
  S.mode = "loading"; S.open = false; promote(); renderAll(); startEngine();
}
function resume() { stopCountdown(); S.mode = "loading"; S.open = false; renderAll(); startEngine(); }
$("#loader").addEventListener("click", function (ev) {
  var t = ev.target.closest("[data-act]"); if (!t) return;
  ev.stopPropagation();
  var a = t.getAttribute("data-act");
  if (a === "toggle") { S.open = !S.open; renderLoader(); }
  if (a === "retry") retryFailed();
  if (a === "skip") { S.mode = "skipped"; S.open = false; renderAll(); }
});
$("#row").addEventListener("click", function (ev) {
  var c = ev.target.closest(".card.failed"); if (!c) return;
  var s = S.scenes[+c.getAttribute("data-n") - 1]; s.st = "queue"; s.p = 0;
  S.mode = "loading"; S.open = false; promote(); renderAll(); startEngine();
});
/* strip scroll (wheel / drag) */
$(".strip").addEventListener("wheel", function (ev) {
  ev.preventDefault(); S.scroll += (Math.abs(ev.deltaX) > Math.abs(ev.deltaY) ? ev.deltaX : ev.deltaY); renderRow();
}, { passive: false });

/* ---------- offline countdown ---------- */
function startCountdown() {
  stopCountdown(); S.countdown = 10;
  S.cdTimer = setInterval(function () {
    S.countdown--; var el = $("#cd"); if (el) el.textContent = "Checking again in " + Math.max(S.countdown, 0) + " s";
    if (S.countdown <= 0) resume();
  }, 1000);
}
function stopCountdown() { clearInterval(S.cdTimer); S.cdTimer = null; }

/* ---------- simulated events (keys F / N / A) ---------- */
function enterEmpty() { S.mode = "empty"; S.open = false; S.scenes = []; S.scroll = 0; show("editor"); }
function addFirstScene() { S.scenes = freshScenes(); S.scenes.forEach(function (s) { s.st = "ready"; s.p = 1; }); S.mode = "ready"; S.open = false; renderAll(); }
function simulate(kind) {
  if (S.screen !== "editor") return;
  stopEngine(); stopCountdown(); S.open = false;
  if (kind === "failed") {
    S.scenes = freshScenes();
    S.scenes.forEach(function (s, i) { if (i >= 8) { s.st = "ready"; s.p = 1; } });
    S.scenes[3].st = "failed"; S.scenes[4].st = "failed";
    S.mode = "failed";
  }
  if (kind === "offline") { if (S.mode !== "ready" && S.mode !== "offline") { return; } S.mode = "offline"; }
  if (kind === "skipped") {
    S.scenes = freshScenes();
    S.scenes.forEach(function (s, i) { if (i >= 8) { s.st = "ready"; s.p = 1; } });
    S.scenes[3].st = "failed"; S.scenes[4].st = "failed";
    S.mode = "skipped";
  }
  if (kind === "empty") { S.scenes = []; S.mode = "empty"; }
  if (kind === "ready") { if (!S.scenes.length) S.scenes = freshScenes(); S.scenes.forEach(function (s) { s.st = "ready"; s.p = 1; }); S.mode = "ready"; }
  renderAll();
}
document.addEventListener("keydown", function (ev) {
  if (ev.metaKey || ev.ctrlKey || ev.altKey) return;
  var k = ev.key.toLowerCase();
  if (S.screen === "s2" && k === "f") { clearTimeout(S.auto); show("s3"); return; }
  if (k === "f") simulate("failed");
  if (k === "n") simulate("offline");
  if (k === "o" && S.mode === "offline") simulate("ready");
  if (k === "a") simulate("ready");
  if (k === "s") simulate("skipped");
  if (k === "e") simulate("empty");
});

/* ---------- navigation ---------- */
$("#s1click").addEventListener("click", function () { show("s2"); });
$("#s2").addEventListener("click", function () { clearTimeout(S.auto); enterEditor(); });
$("#s3retry").addEventListener("click", function () { show("s2"); });
$("#s3skip").addEventListener("click", function () { enterEmpty(); });
$("#addScene").addEventListener("click", function (ev) { ev.stopPropagation(); addFirstScene(); });
$("#canvas").addEventListener("click", function () { if (S.mode === "ready") show("s1"); });
$('[data-go="s1"]').addEventListener("click", function () { show("s1"); });

/* ---------- fit 1920x1080 stage ---------- */
function fit() { $("#stage").style.transform = "scale(" + Math.min(innerWidth / 1920, innerHeight / 1080) + ")"; }
addEventListener("resize", fit); fit();
S.scenes = freshScenes();
show("s1");
})();
