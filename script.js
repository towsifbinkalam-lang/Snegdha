/* =====================================================
   ✏️ এখানে নিজের তথ্য বদলে নাও
   চিঠির লেখা নিচে letter অংশে আছে। প্রতিটি { text: `...` } = একটি অনুচ্ছেদ।
   পৃষ্ঠা ভাগ নিজে থেকেই হয়ে যায় (ফোন/কম্পিউটার অনুযায়ী), হাতে ভাগ করতে হবে না।
   ===================================================== */
const CONFIG = {
  receiverName: "স্নিগ্ধা",
  heroMessage: "তোমার এই বিশেষ দিনে অফুরন্ত ভালোবাসা ও শুভেচ্ছা!",
  fileName: "birthday-letter-snigdha",

  /* 🖼️ হিরোর ছবিগুলো এখানে নয়, photos.js ফাইলে বদলাও */

  /* 📬 হোয়াটসঅ্যাপ নম্বর ও ইমেইল এখানে নয়, contact.js ফাইলে বসাও */
  defaultThanks: `যা ইচ্ছে হয় লিখো 💖`,

  letter: [
    { type: "greeting", text: "১৫-অক্টোবর-২০২৬," },
    { type: "greeting", text: "প্রিয় স্নিগ্ধা," },
    {
      text: `আমার পক্ষ থেকে জন্মদিনের অনেক অনেক শুভেচ্ছা নিও।
শুভ্র তুমি— যার কোনো তুলনা নেই, নেই কোনো অভিযোগ, নেই কোনো অপূর্ণতার হিসাব।`
    },
    {
      text: `যদি কোনোদিন তুমি জানতে চাও—
“বাকিদের তুলনায় আমার স্পেশালিটি কী?”
তবে আমার উত্তর হবে— তোমার তুলনায় তুমি, তোমার বিশেষত্বে তুমি, তোমার সৌন্দর্যতায় তুমি।`
    },
    {
      text: `তোমাকে কারও সঙ্গে তুলনা করার মতো কোনো মাপকাঠিই আমার জানা নেই। কারণ তুমি কারও মতো নও, আর কারও মতো হওয়ার প্রয়োজনও তোমার নেই। তোমার হাসিটা তোমারই, তোমার মায়াটা তোমারই। তোমার অভিমান, তোমার সরলতা— এমনকি তোমার নীরবতাটুকুও তোমাকে আলাদা করে চেনায়।`
    },
    {
      text: `তোমার কোনো প্রতিদ্বন্দ্বী নেই, কারণ তুমি কারও সঙ্গে প্রতিযোগিতায় নামোনি। তুমি শুধু নিজের মতো করে থেকেছো। আর সেই নিজের মতো থাকাটাই তোমাকে এতটা বিশেষ করে তুলেছে। তাই তোমার সৌন্দর্যের সংজ্ঞা দিতে গেলে শব্দ কম পড়ে যায়, আর তোমাকে বোঝাতে গেলে উপমাগুলোও কেমন যেন ফিকে হয়ে যায়।`
    },
    {
      text: `এই বিশেষ দিনে আমার একটিই চাওয়া—
গ্রীষ্মকালের তীব্র গরম হয়ে নয়, বরং হিমেল বাতাস হয়ে এসো।
বর্ষার দিনে শুধু ছাতা হয়ে নয়, বরং বৃষ্টির ভেতর নির্ভরতার রেনকোট হয়ে থেকো।
কনকনে শীতের কুয়াশার মতো দূরে নয়, বরং উষ্ণতার সেই চাদর হয়ে থেকো, যার কাছে এলে সমস্ত শীত ভুলে থাকা যায়।`
    },
    {
      text: `তোমার জীবনের প্রতিটি দিন হোক সুন্দর, শান্ত আর মায়াময়। তোমার হাসিটা যেন সবসময় এমনই থাকে, আর তোমার নিজের মতো করে থাকার সৌন্দর্যটা যেন কখনো বদলে না যায়।`
    },
    {
      text: `শুভ জন্মদিন, স্নিগ্ধা আমার।
তুমি তোমার মতোই থেকো— কারণ তোমার মতো তুমি ছাড়া আর কেউ নেই।`
    }
  ]
};

/* ===== এলিমেন্ট ===== */
const $ = (id) => document.getElementById(id);

const envelope    = $("envelope");
const pagesBox    = $("letterPages");
const downloadBox = $("downloadBox");
const hint        = $("hint");

const toBn = (n) => String(n).replace(/\d/g, (d) => "০১২৩৪৫৬৭৮৯"[d]);

/* =====================================================
   📄 চিঠির লেআউট: পুরো চিঠি একটাই পাতায়
   ছবির ওপরের অংশ (ফুল, নোট) ও নিচের অংশ (ছবি, কলম, বই) যেমন আছে তেমনই থাকে।
   মাঝের সাদা কাগজের অংশটা লেখা অনুযায়ী লম্বা হয়ে যায়।
   (ROW_ মানগুলো ছবির উচ্চতার ভগ্নাংশ)
   ===================================================== */
const IMG_RATIO = 1491 / 1055;   // ছবির উচ্চতা ÷ প্রস্থ
const ROW_TOP   = 0.29;          // ০ – ০.২৯ : ওপরের সাজসজ্জা (অপরিবর্তিত)
const ROW_BAND  = 0.52;          // ০.২৯ – ০.৫২ : ফাঁকা কাগজ, এটাই লম্বা হয়
const ROW_TEXT_END = 0.73;       // নিচের অংশে লেখা এর নিচে নামবে না (ছবি, কলম, বই এড়াতে)
const SAFE = { left: 0.13, right: 0.12 };
const MAX_SHEET = 820;           // কম্পিউটারে চিঠির সর্বোচ্চ প্রস্থ (px)

const LINE_RATIO  = 1.7;         // লাইনের উচ্চতা = ফন্ট সাইজ × ১.৭
const GAP_RATIO   = 0.85;        // অনুচ্ছেদের মাঝের ফাঁক
const GREET_SCALE = 1.12;        // সম্বোধন একটু বড়
// MyHand = fonts/handwriting.ttf (নিজের পছন্দের হাতের লেখার ফন্ট দিলে সেটাই আগে ব্যবহার হবে)
const FONT_FAMILY = "'MyHand', 'Galada', 'Hind Siliguri', cursive";
const fontFor = (type, px) =>
  `${type === "greeting" ? Math.round(px * GREET_SCALE) : px}px ${FONT_FAMILY}`;

// বাংলা টেক্সট শব্দ ধরে লাইনে ভাঙা (\n সহ)
function wrapText(ctx, text, maxWidth) {
  const lines = [];
  text.split("\n").forEach((rawLine) => {
    const words = rawLine.split(" ");
    let line = "";
    words.forEach((word) => {
      const test = line ? line + " " + word : word;
      if (ctx.measureText(test).width > maxWidth && line) {
        lines.push(line);
        line = word;
      } else {
        line = test;
      }
    });
    lines.push(line);
  });
  return lines;
}

// W = চিঠির প্রস্থ, px = ফন্ট সাইজ → সব মাপ হিসাব করে দেয়
function layoutSheet(ctx, W, px) {
  const lineH = px * LINE_RATIO;
  const gap   = px * GAP_RATIO;
  const maxW  = W * (1 - SAFE.left - SAFE.right);

  const items = CONFIG.letter.map((b) => {
    ctx.font = fontFor(b.type, px);
    return { type: b.type, lines: wrapText(ctx, b.text, maxW) };
  });
  const lineCount = items.reduce((n, it) => n + it.lines.length, 0);
  const textH = lineCount * lineH + (items.length - 1) * gap;

  const topPx  = ROW_TOP * IMG_RATIO * W;                       // ওপরের অংশ
  const bandPx = (ROW_BAND - ROW_TOP) * IMG_RATIO * W;          // মাঝের অংশের নিজস্ব মাপ
  const botPx  = (1 - ROW_BAND) * IMG_RATIO * W;                // নিচের অংশ
  const tailPx = (ROW_TEXT_END - ROW_BAND) * IMG_RATIO * W - 0.02 * W;   // নিচের অংশে লেখার ফাঁকা জায়গা

  // মাঝের অংশ কতটা লম্বা হবে
  const midPx = Math.max(textH - tailPx, bandPx * 0.5);

  // মাঝের অংশ বিজোড় সংখ্যক টুকরোয় (১,৩,৫…) বসে, একটা সোজা একটা উল্টো করে,
  // তাই জোড়ার জায়গায় ছবি মসৃণভাবে মিলে যায়। যে সংখ্যায় টান সবচেয়ে কম সেটা বাছা হয়।
  let k = 1, bestErr = Infinity;
  for (let n = 1; n <= 61; n += 2) {
    const err = Math.abs(Math.log(midPx / (n * bandPx)));
    if (err < bestErr) { bestErr = err; k = n; }
  }
  const pieceH = midPx / k;
  return { items, lineH, gap, topPx, midPx, botPx, k, pieceH, W, H: topPx + midPx + botPx };
}

/* ===== পেজে চিঠি আঁকা ===== */
let renderedWidth = 0;
const measureCtx = document.createElement("canvas").getContext("2d");

function renderLetter() {
  pagesBox.innerHTML = "";
  const sheet = document.createElement("article");
  sheet.className = "letter-sheet";
  pagesBox.appendChild(sheet);

  const W = sheet.clientWidth;
  if (!W) { pagesBox.innerHTML = ""; return; }      // লুকানো অবস্থায় আঁকা যাবে না
  renderedWidth = W;

  // মোবাইলেও পড়ার মতো: ন্যূনতম ১৫px, সর্বোচ্চ ২২px
  const px = Math.max(15, Math.min(22, W * 0.0285));
  const L = layoutSheet(measureCtx, W, px);
  const cq = (v) => ((v / W) * 100).toFixed(4) + "cqw";    // প্রিন্টেও আনুপাতিকভাবে বাড়বে/কমবে
  const layer = (cls) => {
    const d = document.createElement("div");
    d.className = cls;
    sheet.appendChild(d);
    return d;
  };
  sheet.style.setProperty("--ratio", (W / L.H).toFixed(5));   // প্রিন্টে এক পাতায় আনতে

  // ওপরের অংশ (+১px: জোড়ার দাগ ঢাকতে)
  layer("sheet-top").style.height = `calc(${cq(L.topPx)} + 1px)`;

  // মাঝের টুকরোগুলো
  const bandFrac = ROW_BAND - ROW_TOP;
  for (let i = 0; i < L.k; i++) {
    const d = layer("sheet-piece" + (i % 2 ? " flip" : ""));
    d.style.height = `calc(${cq(L.pieceH)} + 1px)`;
    d.style.backgroundSize = `100% ${cq(L.pieceH / bandFrac)}`;
    d.style.backgroundPosition = `0 ${cq(-ROW_TOP * L.pieceH / bandFrac)}`;
  }

  // নিচের অংশ
  layer("sheet-bottom").style.height = cq(L.botPx);

  // লেখা
  const wrap = layer("letter-text");
  wrap.style.top = cq(L.topPx);
  wrap.style.fontSize = cq(px);
  wrap.style.lineHeight = cq(px * LINE_RATIO);
  L.items.forEach((it, idx) => {
    const box = document.createElement("div");
    box.className = "letter-item" + (it.type === "greeting" ? " greeting" : "");
    if (idx < L.items.length - 1) box.style.marginBottom = cq(px * GAP_RATIO);
    it.lines.forEach((ln) => {
      const d = document.createElement("div");
      d.className = "letter-line";
      d.textContent = ln || " ";
      box.appendChild(d);
    });
    wrap.appendChild(box);
  });
}

// ফন্ট লোড হওয়ার পর আঁকতে হবে, নইলে মাপ ভুল হয়
function fontsReady() {
  if (!document.fonts || !document.fonts.load) return Promise.resolve();
  const loads = ["MyHand", "Galada"].map((f) =>
    document.fonts.load(`20px '${f}'`, "আ").catch(() => {})
  );
  return Promise.race([Promise.all(loads), new Promise((r) => setTimeout(r, 2500))]);
}

/* ===== খাম খোলা ===== */
function openEnvelope() {
  if (envelope.classList.contains("open")) return;
  envelope.classList.add("open");
  hint.textContent = "💖 চিঠিটি তোমার জন্য, ডাউনলোড করে সংরক্ষণ করতে পারো";

  setTimeout(async () => {
    pagesBox.hidden = false;
    downloadBox.hidden = false;
    $("thanksBox").hidden = false;
    await fontsReady();
    renderLetter();
    pagesBox.scrollIntoView({ behavior: "smooth", block: "start" });
    launchConfetti();
  }, 600);
}
envelope.addEventListener("click", openEnvelope);
envelope.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openEnvelope(); }
});

// স্ক্রিনের প্রস্থ বদলালে (ঘোরালে/রিসাইজ) আবার সাজানো
let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    if (!pagesBox.hidden) {
      const w = Math.min(pagesBox.clientWidth, MAX_SHEET);
      if (Math.abs(w - renderedWidth) > 4) renderLetter();
    }
  }, 200);
});

/* ===== ফাইল ডাউনলোড হেল্পার ===== */
function triggerDownload(url, filename) {
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

/* ===== টেক্সট হিসেবে ডাউনলোড ===== */
$("downloadTxt").addEventListener("click", () => {
  const text = CONFIG.letter.map((b) => b.text).join("\n\n");
  const blob = new Blob(["﻿" + text], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  triggerDownload(url, CONFIG.fileName + ".txt");
  setTimeout(() => URL.revokeObjectURL(url), 1000);
});

/* ===== ছবি (PNG) হিসেবে ডাউনলোড: পুরো চিঠি একটা ছবিতে ===== */
function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

async function downloadAsImage() {
  const btn = $("downloadImg");
  const oldLabel = btn.textContent;
  btn.textContent = "⏳ তৈরি হচ্ছে...";
  btn.disabled = true;

  try {
    const W = 1055, px = 33;
    await fontsReady();
    const bg = await loadImage(window.BG_DATA || "bg.jpg");
    const bw = bg.naturalWidth, bh = bg.naturalHeight;

    const L = layoutSheet(measureCtx, W, px);
    const scale = 1.5;
    const canvas = document.createElement("canvas");
    canvas.width = W * scale;
    canvas.height = Math.ceil(L.H * scale);
    const ctx = canvas.getContext("2d");
    ctx.scale(scale, scale);
    ctx.textBaseline = "alphabetic";

    // ওপরের অংশ
    ctx.drawImage(bg, 0, 0, bw, bh * ROW_TOP, 0, 0, W, L.topPx + 0.5);

    // মাঝের টুকরো (একটা সোজা, একটা উল্টো)
    const sy = bh * ROW_TOP, sh = bh * (ROW_BAND - ROW_TOP);
    for (let i = 0; i < L.k; i++) {
      const y = L.topPx + i * L.pieceH;
      ctx.save();
      if (i % 2) {
        ctx.translate(0, y + L.pieceH + 0.5);
        ctx.scale(1, -1);
        ctx.drawImage(bg, 0, sy, bw, sh, 0, 0, W, L.pieceH + 1);
      } else {
        ctx.drawImage(bg, 0, sy, bw, sh, 0, y - 0.5, W, L.pieceH + 1);
      }
      ctx.restore();
    }

    // নিচের অংশ
    ctx.drawImage(bg, 0, bh * ROW_BAND, bw, bh * (1 - ROW_BAND), 0, L.topPx + L.midPx - 0.5, W, L.botPx + 0.5);

    // হাতের লেখা
    ctx.save();
    ctx.translate(W * SAFE.left, L.topPx);
    ctx.rotate(-0.0087);                         // ~ -০.৫°, হাতে লেখার ভাব
    ctx.fillStyle = "#20222b";
    let y = 0;
    L.items.forEach((it, idx) => {
      ctx.font = fontFor(it.type, px);
      it.lines.forEach((ln) => {
        ctx.fillText(ln, 0, y + L.lineH * 0.72);
        y += L.lineH;
      });
      if (idx < L.items.length - 1) y += L.gap;
    });
    ctx.restore();

    await new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (!blob) return reject(new Error("blob"));
        const url = URL.createObjectURL(blob);
        triggerDownload(url, CONFIG.fileName + ".png");
        setTimeout(() => URL.revokeObjectURL(url), 1000);
        resolve();
      }, "image/png");
    });
  } catch (err) {
    alert("ছবি তৈরি করা যায়নি। দয়া করে 'প্রিন্ট / PDF' বাটন ব্যবহার করুন।");
    console.error(err);
  } finally {
    btn.textContent = oldLabel;
    btn.disabled = false;
  }
}
$("downloadImg").addEventListener("click", downloadAsImage);

/* ===== প্রিন্ট / PDF ===== */
$("printBtn").addEventListener("click", () => window.print());

/* =====================================================
   💌 ধন্যবাদ পাঠানো (হোয়াটসঅ্যাপ / ইমেইল)
   ===================================================== */
const thanksMsg = $("thanksMsg");
thanksMsg.value = CONFIG.defaultThanks;

const getContact = () => window.CONTACT || {};
const getMsg = () => thanksMsg.value.trim() || CONFIG.defaultThanks;

// বাংলা অঙ্ক → ইংরেজি, শুধু সংখ্যা রাখা, 017... → 88017...
function cleanWhatsapp(raw) {
  let n = String(raw || "")
    .replace(/[০-৯]/g, (d) => "০১২৩৪৫৬৭৮৯".indexOf(d))
    .replace(/\D/g, "");
  if (n.startsWith("00")) n = n.slice(2);
  if (n.length === 11 && n.startsWith("0")) n = "88" + n;
  return n;
}
const cleanEmail = (raw) => String(raw || "").trim();
const emailSubject = () => `🎂 জন্মদিনের চিঠির উত্তর - ${CONFIG.receiverName}`;

$("waBtn").addEventListener("click", () => {
  const num = cleanWhatsapp(getContact().whatsapp);
  if (!num) {
    alert("হোয়াটসঅ্যাপ নম্বর এখনো বসানো হয়নি।\ncontact.js ফাইলে whatsapp এর ভেতরে নম্বর লিখুন।");
    return;
  }
  window.open(`https://wa.me/${num}?text=${encodeURIComponent(getMsg())}`, "_blank", "noopener");
});

const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

function openMailto(email) {
  window.location.href =
    `mailto:${email}?subject=${encodeURIComponent(emailSubject())}&body=${encodeURIComponent(getMsg())}`;
}

$("mailBtn").addEventListener("click", () => {
  const email = cleanEmail(getContact().email);
  if (!email) {
    alert("ইমেইল ঠিকানা এখনো বসানো হয়নি।\ncontact.js ফাইলে email এর ভেতরে ঠিকানা লিখুন।");
    return;
  }
  if (isMobile) {
    openMailto(email);          // ফোনে সরাসরি মেইল অ্যাপ
  } else {
    // কম্পিউটারে মেইল অ্যাপ প্রায়ই সেট করা থাকে না, তাই Gmail-এর লেখার পাতা খোলে
    const url = "https://mail.google.com/mail/?view=cm&fs=1" +
      `&to=${encodeURIComponent(email)}` +
      `&su=${encodeURIComponent(emailSubject())}` +
      `&body=${encodeURIComponent(getMsg())}`;
    window.open(url, "_blank", "noopener");
  }
});

$("mailtoBtn").addEventListener("click", () => {
  const email = cleanEmail(getContact().email);
  if (!email) {
    alert("ইমেইল ঠিকানা এখনো বসানো হয়নি।\ncontact.js ফাইলে email এর ভেতরে ঠিকানা লিখুন।");
    return;
  }
  openMailto(email);
});

/* =====================================================
   🎊 কনফেটি অ্যানিমেশন
   ===================================================== */
const canvas = $("confetti");
const cctx = canvas.getContext("2d");
let pieces = [];
let animating = false;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function launchConfetti() {
  const colors = ["#c97b5f", "#e0b25a", "#8fa36a", "#d9a5a0", "#f2d49b", "#6f8f9b"];
  for (let i = 0; i < 160; i++) {
    pieces.push({
      x: Math.random() * canvas.width,
      y: -20 - Math.random() * canvas.height * 0.5,
      w: 6 + Math.random() * 8,
      h: 8 + Math.random() * 10,
      color: colors[Math.floor(Math.random() * colors.length)],
      speed: 2 + Math.random() * 4,
      drift: (Math.random() - 0.5) * 2,
      rot: Math.random() * Math.PI,
      rotSpeed: (Math.random() - 0.5) * 0.2
    });
  }
  if (!animating) { animating = true; requestAnimationFrame(drawConfetti); }
}

function drawConfetti() {
  cctx.clearRect(0, 0, canvas.width, canvas.height);
  pieces.forEach((p) => {
    p.y += p.speed;
    p.x += p.drift;
    p.rot += p.rotSpeed;
    cctx.save();
    cctx.translate(p.x, p.y);
    cctx.rotate(p.rot);
    cctx.fillStyle = p.color;
    cctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
    cctx.restore();
  });
  pieces = pieces.filter((p) => p.y < canvas.height + 30);

  if (pieces.length) {
    requestAnimationFrame(drawConfetti);
  } else {
    animating = false;
    cctx.clearRect(0, 0, canvas.width, canvas.height);
  }
}

$("celebrateBtn").addEventListener("click", launchConfetti);

/* =====================================================
   🖼️ দুই বাঁশের মাঝে ঝুলন্ত দড়ি, তাতে দোল খাওয়া ছবি
   (ছবির তালিকা photos.js ফাইলে)
   ===================================================== */
let renderedGarlandW = 0;

function renderGarland() {
  const box = $("garland");
  box.innerHTML = "";
  const photos = window.PHOTOS || [];
  if (!photos.length) { box.hidden = true; return; }
  box.hidden = false;

  const W = box.clientWidth;
  if (!W) return;
  renderedGarlandW = W;

  // স্ক্রিন অনুযায়ী মাপ: ফোনে ছোট ছবি, প্রতি সারিতে কম
  const narrow    = W < 520;
  const poleW     = narrow ? 10 : 12;           // বাঁশের মোটা
  const poleSpace = narrow ? 24 : 40;           // বাঁশ থেকে প্রথম ছবি পর্যন্ত জায়গা
  const usable    = W - 2 * poleSpace;
  const minItem   = narrow ? 112 : 150;
  const gapMin    = 14;
  const perRow    = Math.max(1, Math.min(photos.length, Math.floor((usable + gapMin) / (minItem + gapMin))));
  const itemW     = Math.min(210, Math.floor((usable - (perRow + 1) * gapMin) / perRow));

  const sag = Math.max(18, Math.min(36, W * 0.045));   // দড়ি মাঝখানে কতটা ঝুলবে
  const y0  = 24;                                      // বাঁশের গায়ে দড়ি বাঁধার উচ্চতা
  const x1  = 2 + poleW / 2;                           // বাঁ বাঁশের মাঝ
  const x2  = W - 2 - poleW / 2;                       // ডান বাঁশের মাঝ

  const angles = [2.6, -2.2, 3.0, -2.6, 2.2, -3.0];

  for (let start = 0; start < photos.length; start += perRow) {
    const chunk = photos.slice(start, start + perRow);
    const n = chunk.length;

    const row = document.createElement("div");
    row.className = "rope-row";
    row.style.setProperty("--pole-space", poleSpace + "px");
    row.style.setProperty("--pole-w", poleW + "px");

    // দড়ির বাঁকা পথ (মাঝখানে নিচে ঝোলা), বাঁশ ও গিঁট
    const d = `M${x1},${y0} Q${W / 2},${y0 + 2 * sag} ${x2},${y0}`;
    row.insertAdjacentHTML("afterbegin",
      `<svg class="rope-svg" width="${W}" height="${Math.ceil(y0 + sag + 8)}" viewBox="0 0 ${W} ${Math.ceil(y0 + sag + 8)}" aria-hidden="true">
         <path class="rope-path" d="${d}"/>
         <path class="rope-twist" d="${d}"/>
       </svg>
       <span class="bamboo left"></span>
       <span class="bamboo right"></span>
       <span class="knot" style="left:${x1}px;top:${y0}px"></span>
       <span class="knot" style="left:${x2}px;top:${y0}px"></span>`);

    // ছবিগুলো দড়ির বাঁকা অনুযায়ী ওঠানামা করে বসে
    const gap = (usable - n * itemW) / (n + 1);
    chunk.forEach((ph, j) => {
      const i = start + j;
      const cx = poleSpace + gap * (j + 1) + itemW * (j + 0.5);     // এই ছবির মাঝের x
      const t = (cx - x1) / (x2 - x1);
      const ropeY = y0 + 4 * sag * t * (1 - t);                     // ওই জায়গায় দড়ি কতটা নিচে

      const item = document.createElement("div");
      item.className = "garland-item";
      item.style.width = itemW + "px";
      item.style.marginTop = (ropeY - 10).toFixed(1) + "px";        // ক্লিপ ঠিক দড়ির ওপর

      const polaroid = document.createElement("div");
      polaroid.className = "polaroid";
      polaroid.style.setProperty("--a", angles[i % angles.length] + "deg");
      polaroid.style.setProperty("--dur", (4.2 + (i % 3) * 0.9).toFixed(1) + "s");   // এক এক ছবির তাল আলাদা
      polaroid.style.setProperty("--delay", "-" + (i * 0.9).toFixed(1) + "s");

      const pin = document.createElement("span");
      pin.className = "pin";

      const frame = document.createElement("figure");
      frame.className = "frame";

      const img = document.createElement("img");
      img.src = ph.src;
      img.alt = ph.caption || "স্মৃতির ছবি";
      img.loading = "lazy";
      img.addEventListener("error", () => {            // ছবি না পেলে সুন্দর ফাঁকা ফ্রেম
        const hole = document.createElement("div");
        hole.className = "ph";
        hole.textContent = "💗";
        img.replaceWith(hole);
      });
      frame.appendChild(img);

      if (ph.caption) {
        const cap = document.createElement("figcaption");
        cap.textContent = ph.caption;
        frame.appendChild(cap);
      }

      polaroid.append(pin, frame);
      item.appendChild(polaroid);
      row.appendChild(item);
    });

    box.appendChild(row);
  }
}

// স্ক্রিনের প্রস্থ বদলালে আবার সাজানো
let garlandTimer;
window.addEventListener("resize", () => {
  clearTimeout(garlandTimer);
  garlandTimer = setTimeout(() => {
    if (Math.abs($("garland").clientWidth - renderedGarlandW) > 4) renderGarland();
  }, 200);
});

/* ===== শুরু ===== */
renderGarland();
$("receiverName").textContent = CONFIG.receiverName;
$("heroMessage").textContent  = CONFIG.heroMessage;
document.title = `শুভ জন্মদিন ${CONFIG.receiverName} 🎂`;
window.addEventListener("load", () => setTimeout(launchConfetti, 500));
