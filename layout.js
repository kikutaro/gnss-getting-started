/* GNSS Study — shared sidebar navigation (load with <script defer>) */
(function () {
  // ---- Google Analytics (gtag.js) — injected once here for every page ----
  (function () {
    var GA_ID = "G-N0FSHWFCDN";
    var s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_ID;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag("js", new Date());
    gtag("config", GA_ID);
  })();

  var PAGES = [
    { ja: "index.html",         en: "index.html",       tja: "ホーム",             ten: "Home",                  grp: 0 },
    { ja: "gnss-intro.html",    en: "gnss-intro.html",  tja: "GNSSとは？",         ten: "What is GNSS?",         grp: 1 },
    { ja: "wave-lab.html",   en: "wave-lab.html",    tja: "波の基礎",           ten: "Wave Basics",           grp: 2 },
    { ja: "time-lab.html",      en: "time-lab.html",    tja: "時間と時計",         ten: "Time & Clocks",         grp: 2 },
    { ja: "db-lab.html",        en: "db-lab.html",      tja: "dBと信号強度",       ten: "dB & Signal Power",     grp: 2 },
    { ja: "mod-lab.html",       en: "mod-lab.html",     tja: "変調の基礎",         ten: "Modulation",            grp: 2 },
    { ja: "coord-lab.html",     en: "coord-lab.html",   tja: "座標と高さ",         ten: "Coordinates & Height",  grp: 2 },
    { ja: "gnss-sim.html",      en: "gnss-sim.html",    tja: "GNSS衛星信号",       ten: "GNSS Signals",          grp: 3 },
    { ja: "gnss-bands.html",    en: "gnss-bands.html",  tja: "周波数帯マップ",     ten: "Frequency Bands",       grp: 3 },
    { ja: "gnss-signal.html",   en: "gnss-signal.html", tja: "信号の構造",         ten: "Signal Structure",      grp: 3 },
    { ja: "gnss-spectrum.html", en: "gnss-spectrum.html", tja: "スペクトル",       ten: "Spectrum",              grp: 3 },
    { ja: "gnss-navmsg.html",   en: "gnss-navmsg.html", tja: "航法メッセージ",     ten: "Nav Messages",          grp: 3 },
    { ja: "gnss-obs.html",      en: "gnss-obs.html",    tja: "擬似距離・ドップラー", ten: "Pseudorange & Doppler", grp: 3 },
    { ja: "gnss-timesync.html", en: "gnss-timesync.html", tja: "時刻同期",          ten: "Time Sync",             grp: 3 },
    { ja: "gnss-corrections.html", en: "gnss-corrections.html", tja: "誤差と補正", ten: "Errors & Corrections", grp: 3 },
    { ja: "gnss-rx.html",       en: "gnss-rx.html",     tja: "受信の流れ",         ten: "Receive Chain",         grp: 3 },
    { ja: "qzss.html",          en: "qzss.html",        tja: "QZSS みちびき",      ten: "QZSS Michibiki",        grp: 3 },
    { ja: "sdr-intro.html",     en: "sdr-intro.html",   tja: "SDR入門",            ten: "SDR Basics",            grp: 4 },
    { ja: "sdr-spectrum.html",  en: "sdr-spectrum.html",tja: "SDRとスペクトル",    ten: "SDR & Spectrum",        grp: 4 },
    { ja: "sdr-gnss-tx.html",   en: "sdr-gnss-tx.html", tja: "SDRでGNSS送信",      ten: "GNSS TX with SDR",      grp: 4 },
    { ja: "gnss-threats.html",  en: "gnss-threats.html", tja: "妨害と偽装",        ten: "Jamming & Spoofing",    grp: 5 },
    { ja: "pnt-alternatives.html", en: "pnt-alternatives.html", tja: "代替の概要",   ten: "Alternatives Overview", grp: 6 },
    { ja: "leo-pnt.html",       en: "leo-pnt.html",     tja: "LEO-PNT",            ten: "LEO-PNT",               grp: 6 },
    { ja: "ins-imu.html",       en: "ins-imu.html",     tja: "慣性航法(INS)",      ten: "Inertial (INS)",        grp: 6 },
    { ja: "terrestrial-rf.html", en: "terrestrial-rf.html", tja: "地上系電波(eLoran)", ten: "Terrestrial (eLoran)", grp: 6 },
    { ja: "vps-mapmatch.html",  en: "vps-mapmatch.html", tja: "環境標定(VPS)",      ten: "Vision/Map (VPS)",      grp: 6 },
    { ja: "soop.html",          en: "soop.html",        tja: "信号機会測位",       ten: "Signals of Opportunity", grp: 6 },
    { ja: "opensource.html",    en: "opensource.html",  tja: "測位系OSS",          ten: "Positioning OSS",       grp: 7 },
    { ja: "glossary.html",      en: "glossary.html",    tja: "用語集",             ten: "Glossary",              grp: 8, nonum: true },
  ];
  var GRPS = {
    ja: ["", "STEP 0 · GNSSとは", "STEP 1 · 基礎", "STEP 2 · GNSSのしくみ", "STEP 3 · SDR実践", "STEP 4 · 脅威と対策", "STEP 5 · GNSSの代替", "STEP 6 · ツール", "付録"],
    en: ["", "STEP 0 · WHAT IS GNSS", "STEP 1 · BASICS", "STEP 2 · HOW GNSS WORKS", "STEP 3 · SDR IN PRACTICE", "STEP 4 · THREATS & DEFENCE", "STEP 5 · GNSS ALTERNATIVES", "STEP 6 · TOOLS", "APPENDIX"],
  };
  var BRAND = "GNSS Study";

  var isEn = /\/en\//.test(location.pathname);
  var file = decodeURIComponent((location.pathname.split("/").pop() || "index.html")) || "index.html";

  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text) e.textContent = text;
    return e;
  }

  function build() {
    var aside = el("aside", "sidenav");
    var brand = el("div", "brand");
    var bl = el("a", null, BRAND);
    bl.href = "index.html";
    brand.appendChild(bl);
    aside.appendChild(brand);

    var num = 0;
    var lastGrp = -1;
    var current = null;
    PAGES.forEach(function (p) {
      var href = isEn ? p.en : p.ja;
      var label = isEn ? p.ten : p.tja;
      if (p.grp !== lastGrp && p.grp > 0) {
        aside.appendChild(el("div", "grp", GRPS[isEn ? "en" : "ja"][p.grp]));
      }
      lastGrp = p.grp;
      var showNum = p.grp > 0 && !p.nonum;
      var a = el("a", "mi" + (p.grp === 0 ? " home" : ""));
      a.href = encodeURI(href);
      if (showNum) num++;
      a.appendChild(el("span", "no", showNum ? String(num).padStart(2, "0") : ""));
      a.appendChild(document.createTextNode(label));
      if (href === file) { a.classList.add("active"); current = p; }
      aside.appendChild(a);
    });

    var lang = el("a", "lang", isEn ? "日本語" : "English");
    var cur = current || PAGES[0];
    lang.href = isEn ? encodeURI("../" + cur.ja) : encodeURI("en/" + cur.en);
    // remember the manual choice so first-visit auto-routing won't override it
    lang.addEventListener("click", function () {
      try { localStorage.setItem("gnss_lang", isEn ? "ja" : "en"); } catch (e) {}
    });
    aside.appendChild(lang);

    var topbar = el("div", "topbar");
    var btn = el("button", null, "☰");
    btn.setAttribute("aria-label", isEn ? "Open menu" : "メニューを開く");
    btn.setAttribute("aria-expanded", "false");
    topbar.appendChild(btn);
    topbar.appendChild(el("span", null, BRAND));

    var scrim = el("div", "scrim");

    document.body.insertBefore(scrim, document.body.firstChild);
    document.body.insertBefore(topbar, document.body.firstChild);
    document.body.insertBefore(aside, document.body.firstChild);

    // ---- footer (appended into <main>) ----
    var main = document.querySelector("main");
    if (main && !main.querySelector(".site-footer")) {
      var footer = el("footer", "site-footer");
      var year = new Date().getFullYear();
      var cp = el("span");
      cp.appendChild(document.createTextNode("© " + year + " "));
      var cpLink = el("a", null, "GNSSたまごくらぶ");
      cpLink.href = "https://zenn.dev/p/gnss_egg_team";
      cpLink.target = "_blank";
      cpLink.rel = "noopener";
      cp.appendChild(cpLink);
      footer.appendChild(cp);
      footer.appendChild(el("span", "dim", isEn ? "· an interactive GNSS learning site" : "· GNSS学習サイト"));

      // right-side cluster: GitHub (with icon) + feedback note + Zenn
      var right = el("span", "sp foot-right");
      var GH_ICON = '<svg viewBox="0 0 16 16" aria-hidden="true" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.13 0 0 .67-.21 2.2.82a7.6 7.6 0 012-.27c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.11.16 1.93.08 2.13.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>';
      var gh = el("a", "gh");
      gh.href = "https://github.com/kikutaro/gnss-getting-started";
      gh.target = "_blank";
      gh.rel = "noopener";
      gh.innerHTML = GH_ICON + "<span>GitHub</span>";
      gh.setAttribute("aria-label", "GitHub repository");
      right.appendChild(gh);
      right.appendChild(el("span", "dim", isEn ? "Issues & PRs welcome" : "ご指摘は Issue / PR で"));
      var zenn = el("a", null, "Zenn ↗");
      zenn.href = "https://zenn.dev/p/gnss_egg_team";
      zenn.target = "_blank";
      zenn.rel = "noopener";
      right.appendChild(zenn);
      footer.appendChild(right);
      main.appendChild(footer);
    }

    function setOpen(v) {
      document.body.classList.toggle("nav-open", v);
      btn.setAttribute("aria-expanded", String(v));
    }
    btn.addEventListener("click", function () { setOpen(!document.body.classList.contains("nav-open")); });
    scrim.addEventListener("click", function () { setOpen(false); });
    aside.addEventListener("click", function (e) {
      if (e.target.closest("a")) setOpen(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setOpen(false);
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", build);
  else build();
})();
