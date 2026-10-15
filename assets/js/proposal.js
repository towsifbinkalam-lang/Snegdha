/* =====================================================
   💌 "ঘুরতে যাবে?" প্রস্তাবের অংশ

   ধাপ: ১) প্রশ্ন (না বাটন ধরতে গেলে পালায়) → ২) "হ্যাঁ" হলে উদযাপন
        → ৩) দিন, সময়, প্ল্যান বাছাই → ৪) ছোট্ট চিঠি + আপনাকে জানানো

   কীভাবে জোড়া লাগাবে (যেকোনো পাতায়):
     <link rel="stylesheet" href="proposal.css">
     <div id="proposalRoot"></div>
     <script src="contact.js"></script>     ← উত্তর যেখানে আসবে (নম্বর/ইমেইল)
     <script src="proposal.js"></script>

   লেখা বদলাতে নিচের CFG অংশ সম্পাদনা করো।
   ===================================================== */
(function () {
  "use strict";

  const root = document.getElementById("proposalRoot");
  if (!root) return;

  /* ---------- ✏️ এখানে লেখা বদলাও ---------- */
  const CFG = {
    badge: "💌 তোমার জন্য একটা প্রশ্ন",

    ask: {
      eyebrow: "একখানা ছোট্ট অনুরোধ",
      titleHtml: "ঘুরতে যাবা <br><em>আমার</em> সাথে?",
      sub: "উত্তর যদি না হয় তবে না-তে ক্লিক করতে পারো কিনা দেখো😉",
      yes: "হ্যাঁ",
      no: ["না", "সত্যি?", "দাঁড়াও—", "শেষবার ভাবো!", "…"],          // পালানোর সাথে সাথে "না" এর লেখা বদলায়
      quips: [                                                       // প্রতিবার পালানোর পর নিচের লেখা
        "ধরতে পারলে ধরো 😜",
        "ইশ, আরেকটু হলেই পেতে!",
        "ভালোবাসার চেয়েও দ্রুত",
        "‘হ্যাঁ’ ফুটতে শুরু করেছে বুঝি?",
        "এত লজ্জা কীসের? 🙈",
        "আর কত পালাবে বলো তো?"
      ],
      counter: (n) => `${toBn(n)} বার পালিয়েছি`
    },

    yes: {
      eyebrow: "তারিখ পাকা",
      titleHtml: "গুড ফর ইউ",
      sub: "সপ্তাহের সেরা সিদ্ধান্ত তোমার।",
      next: "চলো এবার প্ল্যান করি 📅"
    },

    plan: {
      eyebrow: "এবার পাকাপাকি করি",
      titleHtml: "দিন, সময় আর <em>প্ল্যান</em><br>ঠিক করো",
      day: "কোন দিন?",
      time: "কয়টায়?",
      what: "প্ল্যান কী?",
      notReady: "দিন, সময় ও প্ল্যান বেছে নাও ✍️",
      ready: "চিঠিতে সিল করো ♥",
      options: [                                                     // নতুন প্ল্যান যোগ করতে একটা লাইন কপি করো
        { icon: "☕", label: "কফি",          phrase: "কফি খেতে" },
        { icon: "🍽️", label: "ডিনার",        phrase: "ডিনার করতে" },
        { icon: "☕", label: "চা",       phrase: "চা খেতে" },
        { icon: "🌳", label: "পার্কে হাঁটা",  phrase: "পার্কে হাঁটতে" },
        { icon: "🍦", label: "আইসক্রিম",     phrase: "আইসক্রিম খেতে" },
        { icon: "👫", label: "প্যারেড কর্ণারে বসা",    phrase: "প্যারেড কর্ণারে বসবো" }
      ]
    },

    letter: {
      eyebrow: "ছোট্ট একটি চিঠি",
      greet: "প্রিয় বাঁদর,",
      paras: [                                                       // লেখা হলো সাধারণ লেখা অথবা (দিন, সময়, প্ল্যান) নিয়ে বানানো লেখা
        "তাহলে… ব্যাপারটা পাকা হলো।  😊",
        (d) => `আমরা দেখা করছি ${d.date}, ${d.time}-এ, ${d.phrase}।`,
        "আমি কথা দিচ্ছি, ভালো সময়, বাজে রসিকতা আর তোমার ননস্টপ বকবকানি মন দিয়ে শুনবো এবং আমার অবাধ্য এলোমেলো চুলগুলো কানে গুজে দিও।",
        "দেখা হচ্ছে।"
      ],
      close: "ইতি,",
      sign: "— স্নিগ্ধা ♥",
      share: "খবরটা জানিয়ে দাও 💌",
      wa: "💬 হোয়াটসঅ্যাপে জানাও",
      mail: "✉️ ইমেইলে জানাও",
      again: "আবার শুরু করো",
      // যাকে জানানো হবে, তার কাছে যে বার্তা যাবে
      message: (d) =>
        `প্রিয় বাঁদর, আমি রাজি! 💖\n\nতাহলে ঠিক হলো—\n📅 ${d.date}\n⏰ ${d.time}\n✨ ${d.label}\n\nআমি কথা দিচ্ছি, ভালো সময়, বাজে রসিকতা আর 
      তোমার ননস্টপ বকবকানি মন দিয়ে শুনবো এবং আমার অবাধ্য এলোমেলো চুলগুলো কানে গুজে দিও। দেখা হচ্ছে! 😊`,
      mailSubject: "💖 আমি রাজি!"
    }
  };
  /* ---------- এর নিচের অংশ বদলানোর দরকার নেই ---------- */

  function toBn(n) { return String(n).replace(/\d/g, (d) => "০১২৩৪৫৬৭৮৯"[d]); }

  const $ = (sel) => root.querySelector(sel);
  const S = { dodges: 0, date: "", time: "", plan: null };

  /* ---------- ফুলের পাখা (SVG) ---------- */
  function flowerSvg() {
    const petals = [0, 72, 144, 216, 288].map((a) =>
      `<path d="M60 60 C46 40 50 16 60 5 C70 16 74 40 60 60Z" transform="rotate(${a} 60 60)"
             fill="rgba(226,122,106,.34)" stroke="rgba(214,69,58,.55)" stroke-width="1.2"/>`
    ).join("");
    return `<svg class="pq-flower" id="pqFlower" viewBox="0 0 120 152" aria-hidden="true">
      <g class="pq-sway">
        <path d="M60 66 C57 100 63 126 60 150" fill="none" stroke="#6f8f5a" stroke-width="3" stroke-linecap="round"/>
        <path d="M60 122 C78 110 94 114 98 125 C86 133 69 131 60 122Z" fill="#a9c79c" opacity=".95"/>
        <g class="pq-spin">${petals}<circle cx="60" cy="60" r="5.5" fill="#fff" stroke="#d6453a" stroke-width="1.4"/></g>
      </g>
    </svg>`;
  }

  /* ---------- হৃদয়ের বৃষ্টি ---------- */
  function hearts(count) {
    const icons = ["❤️", "💛", "💙", "💚", "💜", "🩷", "🧡"];
    const layer = document.createElement("div");
    layer.className = "pq-hearts";
    for (let i = 0; i < (count || 28); i++) {
      const h = document.createElement("span");
      h.className = "pq-heart";
      h.textContent = icons[Math.floor(Math.random() * icons.length)];
      h.style.left = (6 + Math.random() * 88) + "%";
      h.style.fontSize = (18 + Math.random() * 20) + "px";
      h.style.setProperty("--d", (2.4 + Math.random() * 1.8).toFixed(2) + "s");
      h.style.setProperty("--x", ((Math.random() - 0.5) * 120).toFixed(0) + "px");
      h.style.setProperty("--r", ((Math.random() - 0.5) * 50).toFixed(0) + "deg");
      h.style.animationDelay = (Math.random() * 0.5).toFixed(2) + "s";
      layer.appendChild(h);
    }
    document.body.appendChild(layer);
    setTimeout(() => layer.remove(), 5200);
  }

  /* ---------- পর্দা আঁকা ---------- */
  function show(inner) {
    root.innerHTML =
      `<div class="pq"><span class="pq-pill">${CFG.badge}</span><div class="pq-card" id="pqCard">${inner}</div></div>`;
  }

  /* ধাপ ১: প্রশ্ন */
  function stageAsk() {
    S.dodges = 0;
    show(`
      <span class="pq-counter" id="pqCounter" hidden></span>
      <p class="pq-eyebrow">${CFG.ask.eyebrow}</p>
      <h3 class="pq-title">${CFG.ask.titleHtml}</h3>
      <p class="pq-sub" id="pqSub">${CFG.ask.sub}</p>
      ${flowerSvg()}
      <div class="pq-actions" id="pqActions">
        <button type="button" class="pq-yes" id="pqYes">${CFG.ask.yes}</button>
        <button type="button" class="pq-no" id="pqNo">${CFG.ask.no[0]}</button>
      </div>`);

    const yes = $("#pqYes"), no = $("#pqNo"), actions = $("#pqActions");
    const sub = $("#pqSub"), counter = $("#pqCounter"), flower = $("#pqFlower");
    let lastDodge = 0;

    function dodge(e) {
      const now = Date.now();
      if (now - lastDodge < 180) return;           // একসাথে দুইবার ধরা না পড়তে
      lastDodge = now;
      S.dodges++;
      const n = S.dodges;

      no.textContent = CFG.ask.no[Math.min(n, CFG.ask.no.length - 1)];
      sub.textContent = CFG.ask.quips[(n - 1) % CFG.ask.quips.length];
      counter.hidden = false;
      counter.textContent = CFG.ask.counter(n);
      flower.classList.add("pq-fast");
      setTimeout(() => flower.classList.remove("pq-fast"), 650);

      // নতুন জায়গা: আঙুল/মাউস থেকে যতটা সম্ভব দূরে
      const a = actions.getBoundingClientRect();
      const w = no.offsetWidth, h = no.offsetHeight;
      const px = e && e.clientX != null ? e.clientX : a.left + a.width / 2;
      const py = e && e.clientY != null ? e.clientY : a.top + a.height / 2;
      let best = null, bestDist = -1;
      for (let i = 0; i < 14; i++) {
        const tx = -Math.random() * (a.width - w + 8) + 4;      // ডান কোণ থেকে বাঁয়ে
        const ty = -70 + Math.random() * 120;                   // ওপর-নিচে
        const cx = a.left + (a.width - w) + tx + w / 2;
        const cy = a.top + 10 + ty + h / 2;
        const dist = Math.hypot(cx - px, cy - py);
        if (dist > bestDist) { bestDist = dist; best = { tx, ty }; }
      }
      const scale = n >= 5 ? Math.max(0.5, 1 - (n - 4) * 0.1) : 1;
      no.style.transform = `translate(${best.tx.toFixed(0)}px, ${best.ty.toFixed(0)}px) scale(${scale})`;
      if (n >= 7) no.style.opacity = "0.6";
      yes.style.transform = `scale(${(1 + Math.min(n, 6) * 0.012).toFixed(3)})`;     // "হ্যাঁ" একটু একটু করে বড় হয়
    }

    no.addEventListener("pointerenter", (e) => { if (e.pointerType === "mouse") dodge(e); });
    no.addEventListener("pointerdown", (e) => { e.preventDefault(); dodge(e); });
    no.addEventListener("click", (e) => { e.preventDefault(); dodge(e); });
    no.addEventListener("focus", () => { dodge(); no.blur(); });
    yes.addEventListener("click", stageYes);
  }

  /* ধাপ ২: হ্যাঁ! */
  function stageYes() {
    show(`
      <p class="pq-eyebrow">${CFG.yes.eyebrow}</p>
      <h3 class="pq-title">${CFG.yes.titleHtml}</h3>
      ${flowerSvg()}
      <p class="pq-sub">${CFG.yes.sub}</p>
      <button type="button" class="pq-cta" id="pqNext">${CFG.yes.next}</button>`);
    hearts(30);
    $("#pqNext").addEventListener("click", stagePlan);
  }

  /* ধাপ ৩: দিন, সময়, প্ল্যান */
  function todayStr() {
    const d = new Date();
    const p = (x) => String(x).padStart(2, "0");
    return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
  }

  function stagePlan() {
    const chips = CFG.plan.options.map((o, i) =>
      `<button type="button" class="pq-chip" data-i="${i}">${o.icon} ${o.label}</button>`).join("");
    show(`
      <p class="pq-eyebrow">${CFG.plan.eyebrow}</p>
      <h3 class="pq-title">${CFG.plan.titleHtml}</h3>
      <div class="pq-fields">
        <div class="pq-field"><label for="pqDate">${CFG.plan.day}</label><input type="date" id="pqDate" min="${todayStr()}"></div>
        <div class="pq-field"><label for="pqTime">${CFG.plan.time}</label><input type="time" id="pqTime"></div>
      </div>
      <p class="pq-plan-title">${CFG.plan.what}</p>
      <div class="pq-chips" id="pqChips">${chips}</div>
      <button type="button" class="pq-cta" id="pqSeal" disabled>${CFG.plan.notReady}</button>`);

    const dateEl = $("#pqDate"), timeEl = $("#pqTime"), seal = $("#pqSeal");
    dateEl.value = S.date; timeEl.value = S.time;

    function refresh() {
      const ok = S.date && S.time && S.plan !== null;
      seal.disabled = !ok;
      seal.textContent = ok ? CFG.plan.ready : CFG.plan.notReady;
    }
    dateEl.addEventListener("input", () => { S.date = dateEl.value; refresh(); });
    timeEl.addEventListener("input", () => { S.time = timeEl.value; refresh(); });
    root.querySelectorAll(".pq-chip").forEach((c) => {
      if (S.plan === +c.dataset.i) c.classList.add("on");
      c.addEventListener("click", () => {
        S.plan = +c.dataset.i;
        root.querySelectorAll(".pq-chip").forEach((x) => x.classList.toggle("on", x === c));
        refresh();
      });
    });
    seal.addEventListener("click", () => { if (!seal.disabled) stageLetter(); });
    refresh();
  }

  /* ধাপ ৪: চিঠি */
  function fmtDate(v) {
    const [y, m, d] = v.split("-").map(Number);
    return new Date(y, m - 1, d).toLocaleDateString("bn-BD", { weekday: "long", day: "numeric", month: "long" });
  }
  function fmtTime(v) {                       // "20:30" → "রাত ৮:৩০"
    const [h, mi] = v.split(":").map(Number);
    let period = "রাত";
    if (h >= 4 && h < 6) period = "ভোর";
    else if (h >= 6 && h < 12) period = "সকাল";
    else if (h >= 12 && h < 15) period = "দুপুর";
    else if (h >= 15 && h < 17) period = "বিকাল";
    else if (h >= 17 && h < 19) period = "সন্ধ্যা";
    const h12 = h % 12 === 0 ? 12 : h % 12;
    return `${period} ${toBn(h12)}:${toBn(String(mi).padStart(2, "0"))}`;
  }
  function details() {
    const p = CFG.plan.options[S.plan];
    return { date: fmtDate(S.date), time: fmtTime(S.time), label: `${p.icon} ${p.label}`, phrase: p.phrase };
  }

  /* বার্তা পাঠানো: contact.js এর নম্বর/ইমেইলে */
  function cleanWhatsapp(raw) {
    let n = String(raw || "").replace(/[০-৯]/g, (d) => "০১২৩৪৫৬৭৮৯".indexOf(d)).replace(/\D/g, "");
    if (n.startsWith("00")) n = n.slice(2);
    if (n.length === 11 && n.startsWith("0")) n = "88" + n;
    return n;
  }
  const contact = () => window.CONTACT || {};
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  function sendWhatsApp(text) {
    const num = cleanWhatsapp(contact().whatsapp);
    if (!num) { alert("হোয়াটসঅ্যাপ নম্বর এখনো বসানো হয়নি।\ncontact.js ফাইলে whatsapp এর ভেতরে নম্বর লিখুন।"); return; }
    window.open(`https://wa.me/${num}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
  }
  function sendEmail(text) {
    const email = String(contact().email || "").trim();
    if (!email) { alert("ইমেইল ঠিকানা এখনো বসানো হয়নি।\ncontact.js ফাইলে email এর ভেতরে ঠিকানা লিখুন।"); return; }
    const su = encodeURIComponent(CFG.letter.mailSubject);
    const body = encodeURIComponent(text);
    if (isMobile) {
      window.location.href = `mailto:${email}?subject=${su}&body=${body}`;
    } else {
      window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}&su=${su}&body=${body}`, "_blank", "noopener");
    }
  }

  function stageLetter() {
    const d = details();
    show(`
      <p class="pq-eyebrow">${CFG.letter.eyebrow}</p>
      <div class="pq-meta" id="pqMeta"></div>
      <div class="pq-letter" id="pqLetter"><span class="pq-seal" aria-hidden="true">💌</span></div>
      <div class="pq-share">
        <button type="button" class="pq-cta pq-wa" id="pqWa">${CFG.letter.wa}</button>
        <button type="button" class="pq-cta pq-mail" id="pqMail">${CFG.letter.mail}</button>
      </div>
      <button type="button" class="pq-restart" id="pqAgain">${CFG.letter.again}</button>`);

    // সবকিছু textContent দিয়ে বসানো (নিরাপদ)
    const meta = $("#pqMeta");
    [d.date, d.time, d.label].forEach((t) => {
      const s = document.createElement("span");
      s.textContent = t;
      meta.appendChild(s);
    });

    const letter = $("#pqLetter");
    const add = (cls, text) => {
      const p = document.createElement("p");
      if (cls) p.className = cls;
      p.textContent = text;
      letter.appendChild(p);
    };
    add("", CFG.letter.greet);
    CFG.letter.paras.forEach((p) => add("", typeof p === "function" ? p(d) : p));
    add("", CFG.letter.close);
    add("pq-sign", CFG.letter.sign);

    const msg = CFG.letter.message(d);
    $("#pqWa").addEventListener("click", () => sendWhatsApp(msg));
    $("#pqMail").addEventListener("click", () => sendEmail(msg));
    $("#pqAgain").addEventListener("click", () => { S.date = ""; S.time = ""; S.plan = null; stageAsk(); });
    hearts(22);
  }

  stageAsk();
})();
