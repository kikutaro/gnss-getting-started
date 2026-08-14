/* GNSS Study — shared sidebar navigation (load with <script defer>) */
(function () {
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
    { ja: "gnss-corrections.html", en: "gnss-corrections.html", tja: "誤差と補正", ten: "Errors & Corrections", grp: 3 },
    { ja: "gnss-rx.html",       en: "gnss-rx.html",     tja: "受信の流れ",         ten: "Receive Chain",         grp: 3 },
    { ja: "qzss.html",          en: "qzss.html",        tja: "QZSS みちびき",      ten: "QZSS Michibiki",        grp: 3 },
    { ja: "sdr-intro.html",     en: "sdr-intro.html",   tja: "SDR入門",            ten: "SDR Basics",            grp: 4 },
    { ja: "sdr-spectrum.html",  en: "sdr-spectrum.html",tja: "SDRとスペクトル",    ten: "SDR & Spectrum",        grp: 4 },
    { ja: "sdr-gnss-tx.html",   en: "sdr-gnss-tx.html", tja: "SDRでGNSS送信",      ten: "GNSS TX with SDR",      grp: 4 },
    { ja: "gnss-threats.html",  en: "gnss-threats.html", tja: "妨害と偽装",        ten: "Jamming & Spoofing",    grp: 5 },
    { ja: "opensource.html",    en: "opensource.html",  tja: "オープンソース",     ten: "Open Source",           grp: 6 },
  ];
  var GRPS = {
    ja: ["", "STEP 0 · GNSSとは", "STEP 1 · 基礎", "STEP 2 · GNSSのしくみ", "STEP 3 · SDR実践", "STEP 4 · 脅威と対策", "STEP 5 · オープンソース"],
    en: ["", "STEP 0 · WHAT IS GNSS", "STEP 1 · BASICS", "STEP 2 · HOW GNSS WORKS", "STEP 3 · SDR IN PRACTICE", "STEP 4 · THREATS & DEFENCE", "STEP 5 · OPEN SOURCE"],
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
      var a = el("a", "mi" + (p.grp === 0 ? " home" : ""));
      a.href = encodeURI(href);
      if (p.grp > 0) num++;
      a.appendChild(el("span", "no", p.grp > 0 ? String(num).padStart(2, "0") : ""));
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
      var zenn = el("a", "sp", "Zenn ↗");
      zenn.href = "https://zenn.dev/p/gnss_egg_team";
      zenn.target = "_blank";
      zenn.rel = "noopener";
      footer.appendChild(zenn);
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
