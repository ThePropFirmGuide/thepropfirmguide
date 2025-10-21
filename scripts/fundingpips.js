<div id="tpg-root"></div>
<script>
/* ThePropFirmGuide • FundingPips (Full Page, Updated)
   - Full layout (hero, stats, tabs, highlights, review)
   - Challenges table:
     * headers renamed
     * arrows inline next to text (centered), white→cyan when sorted
     * "BUY" button embedded inside Price cell (no separate Website/Buy column)
   - Profit split bar kept
*/

(function(){
  const ROOT_ID = "tpg-root";
  const $ = (sel, ctx=document) => ctx.querySelector(sel);

  // Ensure root container exists
  let root = document.getElementById(ROOT_ID);
  if(!root){
    root = document.createElement("div");
    root.id = ROOT_ID;
    document.body.appendChild(root);
  }

  // =========================
  // DATA
  // =========================
  const DATA = {
    firm: {
      name: "FundingPips",
      slug: "funding-pips",
      tagline: "Tuesday payouts • up to 90% split • MT5 / cTrader / MatchTrader",
      logo: "", // paste official logo URL if you have one
      ctaUrl: "https://fundingpips.com/",
      offersUrl: "https://propfirmmatch.com/prop-firms/funding-pips/offers",
      founded: "Nov 2022",
      hq: "Dubai, UAE",
      rating: 4.5,
      trustScore: 87,
      profitSplit: "80% base • up to 90% (Hot Seat)",
      minDays: "None",
      timeLimit: "None",
      payoutCycle: "Every Tuesday • on-demand via Hot Seat",
      platforms: ["MT5","cTrader","MatchTrader","TradLocker"],
      instruments: ["FX","Metals","Indices","Energy","Crypto"],
      leverageNote: "Varies by asset & program",
      paymentMethods: ["Apple Pay","Card","Crypto","Google Pay","Neteller","PayPal","Skrill"],
      payoutMethods: ["Bank Transfer","Crypto","Riseworks","Visa Direct"],
      badges: [
        { text:"Tuesday Payouts", icon:"⚡" },
        { text:"High Split",      icon:"💰" },
        { text:"No Time Limit",   icon:"⏱️" },
        { text:"EAs Allowed",     icon:"🤖" }
      ],
      kpis: [
        { label:"Payouts", value:"Tuesdays", icon:"💸" },
        { label:"Split", value:"80–90%", icon:"💰" },
        { label:"Min Days", value:"None", icon:"📆" },
        { label:"Time Limit", value:"None", icon:"⏱️" }
      ]
    },

    // Leverage (sample)
    leverageMatrix: [
      { asset:"FX",      instant:"1:50", step1:"1:30", step2:"1:100", step3:"n/a" },
      { asset:"Metals",  instant:"1:20", step1:"1:10", step2:"1:30",  step3:"n/a" },
      { asset:"Indices", instant:"1:20", step1:"1:5",  step2:"1:20",  step3:"n/a" },
      { asset:"Energy",  instant:"1:10", step1:"1:10", step2:"1:10",  step3:"n/a" },
      { asset:"Crypto",  instant:"1:2",  step1:"1:1",  step2:"1:2",   step3:"n/a" }
    ],

    // Commissions (sample)
    commissions: [
      { asset:"FX",      details:"FP Zero: $7/lot • 1-Step / 2-Step / 2-Step Pro: $5/lot" },
      { asset:"Metals",  details:"FP Zero: $7/lot • 1-Step / 2-Step / 2-Step Pro: $5/lot" },
      { asset:"Indices", details:"No commission" },
      { asset:"Energy",  details:"No commission" },
      { asset:"Crypto",  details:"0.04% commission" }
    ],

    // Challenges rows (sample rows; extend as needed)
    challenges: [
      {
        size:"100K",
        program:"1 Step", // will show under "Steps"
        target:"Varies by program",
        daily:"Varies",
        total:"Varies",
        fee:"$555 ($444 w/ 20% off)",
        url:"https://propfirmmatch.com/prop-firm-challenges/funding-pips-challenges-1-step-100k",
        profitSplitPercent: 80,
        payoutFreq: "Weekly (Tuesday)"
      },
      {
        size:"25K",
        program:"2 Step",
        target:"8% + 5%",
        daily:"Varies",
        total:"Varies",
        fee:"$156 ($124.80 w/ 20% off)",
        url:"https://propfirmmatch.com/prop-firm-challenges/funding-pips-challenges-2-steps-25k",
        profitSplitPercent: 85,
        payoutFreq: "Weekly (Tuesday)"
      }
    ],

    tabs: {
      overview: [
        "🏢 <strong>HQ:</strong> Dubai, UAE",
        "🛠️ <strong>Platforms:</strong> MT5, cTrader, MatchTrader, TradLocker",
        "⏳ <strong>Time limit:</strong> None • <strong>Minimum trading days:</strong> None",
        "💰 <strong>Profit Split:</strong> 80% base, up to 90% via Hot Seat",
        "⚡ <strong>Payouts:</strong> Every Tuesday (Hot Seat enables on-demand)"
      ],
      rules: [
        "🔒 <strong>Risk limits:</strong> Daily / Max loss thresholds (vary by program)",
        "📰 <strong>News:</strong> Restrictions may apply for high-impact events",
        "🤖 <strong>Automation:</strong> EAs and algos allowed per guidelines"
      ],
      payouts: [
        "🗓️ <strong>Schedule:</strong> Tuesdays; Hot Seat provides on-demand withdrawals",
        "💸 <strong>Methods:</strong> Bank Transfer, Crypto, Riseworks, Visa Direct",
        "📈 <strong>Split:</strong> 80% funded base • up to 90% with Hot Seat"
      ],
      offers: [
        "🏷️ <strong>Current Offer:</strong> 20% off all accounts (first order)",
        "🔑 <strong>Code:</strong> MATCH (as listed on PropFirmMatch)"
      ],
      platforms: [
        "🖥️ MT5 • cTrader • MatchTrader • TradLocker",
        "📊 Assets: FX, Metals, Indices, Energy, Crypto"
      ]
    },

    review: {
      verdict: "Tuesday payouts, strong platform coverage, and no time pressure — best for methodical traders who value schedule certainty.",
      overall: 4.5,
      metrics: [
        { key:"Profit Split",      icon:"💰", score:4.5 },
        { key:"Payout Speed",      icon:"⚡", score:4.7 },
        { key:"Rule Transparency", icon:"🔒", score:4.2 },
        { key:"Scaling Program",   icon:"📈", score:4.3 },
        { key:"Trader Support",    icon:"🧠", score:4.3 },
        { key:"Platform Choice",   icon:"🖥️", score:4.8 }
      ],
      pros: [
        "Payouts every Tuesday; Hot Seat adds on-demand withdrawals",
        "80% base split; up to ~90% with Hot Seat",
        "MT5 / cTrader / MatchTrader / TradLocker supported",
        "No time limit and no minimum trading days",
        "EAs permitted under guidelines"
      ],
      cons: [
        "Risk parameters and news restrictions can be strict",
        "Fees increase with larger account sizes",
        "Payment method availability varies by region"
      ],
      summary: "FundingPips is a solid fit for systematic traders who prefer steady payout cadence and platform flexibility. Respect risk rules and it’s a smooth path to consistent withdrawals."
    }
  };

  // =========================
  // STYLES
  // =========================
  const style = document.createElement("style");
  style.textContent = `
  :root{
    --bg:#0b0b0b;--card:#111;--text:#fff;--muted:#b9c1c9;
    --cyan:#33ccff;--cyan-20:rgba(51,204,255,.2);
    --border:#1f2937;--shadow:0 12px 30px rgba(0,0,0,.35);
    --radius:18px;--font:'Montserrat',sans-serif;
    --success:#31d0aa;--danger:#ff4d6d;--star:#ffd166;
  }

  *{box-sizing:border-box}
  body{background:transparent;color:var(--text);font-family:var(--font);line-height:1.8;margin:0}

  .wrap{max-width:980px;margin:0 auto;padding:18px}

  .glass{
    background:var(--card); border:1px solid var(--border); border-radius:var(--radius);
    box-shadow:var(--shadow); position:relative;
    transition:transform .45s ease, box-shadow .45s ease, border-color .3s ease;
  }
  .glass:hover{ transform:translateY(-3px); box-shadow:0 16px 34px rgba(51,204,255,.25); border-color:#1e3a4f; }

  .topbar{
    position:sticky; top:0; z-index:20; backdrop-filter:saturate(1.2) blur(6px);
    background:linear-gradient(180deg, rgba(0,0,0,.85), rgba(0,0,0,.65));
    border-bottom:1px solid #0f172a;
  }
  .nav{ display:flex; align-items:center; gap:10px; padding:10px 18px }
  .brand{ display:flex; align-items:center; gap:10px; min-height:44px }
  .brand-logo{ width:38px; height:38px; border-radius:12px; background:#0f0f0f; border:1px solid var(--border); display:grid; place-items:center; overflow:hidden }
  .brand-name{ font-weight:900; letter-spacing:.02em; color:var(--cyan); font-size:18px; text-transform:uppercase }
  .pills{ margin-left:auto; display:flex; gap:8px; flex-wrap:wrap }
  .pill{
    display:inline-flex; align-items:center; gap:8px; padding:8px 12px; border-radius:999px;
    background:linear-gradient(90deg, rgba(51,204,255,.20), rgba(49,208,170,.20));
    border:1px solid var(--cyan); color:#cfefff; font-weight:900; font-size:.8rem;
  }

  .hero{ display:grid; grid-template-columns:110px 1fr; gap:16px; align-items:center; padding:14px 10px 6px }
  .logo-lg{ width:110px; height:110px; border-radius:18px; background:#0f0f0f; border:1px solid var(--border); display:grid; place-items:center; overflow:hidden }
  .hero h1{ margin:0; font-size:clamp(26px,4vw,42px); text-transform:uppercase; letter-spacing:.02em; color:var(--cyan) }
  .hero p{ margin:6px 0 0; color:#e9f7ff; font-weight:700 }

  .cta{ margin-top:10px; display:flex; gap:10px; flex-wrap:wrap }
  .btn{
    display:inline-block; background:var(--cyan); color:#000!important; padding:12px 18px; border-radius:12px;
    font-weight:900; text-transform:uppercase; letter-spacing:.05em; box-shadow:0 0 18px var(--cyan-20);
    border:2px solid transparent; text-decoration:none; transition:.25s ease;
  }
  .btn:hover{ background:#000; color:#fff!important; border-color:#fff; transform:translateY(-2px); box-shadow:0 0 28px rgba(51,204,255,.35) }
  .btn-ghost{ background:transparent; color:#cfefff!important; border-color:var(--cyan) }

  .badges{ display:flex; flex-wrap:wrap; gap:8px; margin:12px 0 0 }
  .badge{
    background:linear-gradient(180deg, rgba(51,204,255,.16), rgba(51,204,255,.06));
    border:1px solid var(--cyan); color:#cfefff; padding:6px 10px; border-radius:999px; font-weight:900; font-size:.8rem; display:inline-flex; align-items:center; gap:6px;
  }

  .section-title{ text-align:center; text-transform:uppercase; font-weight:900; font-size:clamp(22px,3vw,30px); margin:18px 0 10px }

  .stats{ margin:18px 0 8px; display:grid; grid-template-columns:repeat(5, minmax(160px,1fr)); gap:12px }
  .stat{ padding:12px 14px }
  .stat .k{ font-size:.76rem; color:var(--muted); letter-spacing:.08em; text-transform:uppercase; display:flex; align-items:center; gap:8px }
  .stat .v{ font-weight:900; color:#fff; font-size:1.02rem }

  .tabs{ margin-top:10px }
  .tab-head{ display:flex; gap:8px; padding:10px; border-bottom:1px solid var(--border); flex-wrap:wrap; justify-content:center }
  .tab-btn{
    background:#0f0f10; color:#fff; border:1px solid transparent; padding:10px 14px; border-radius:10px;
    font-weight:900; cursor:pointer; transition:.2s ease; display:inline-flex; align-items:center; gap:8px
  }
  .tab-btn:hover{ background:#000; border-color:#fff; transform:translateY(-1px) }
  .tab-btn.active{ background:var(--cyan); color:#000 }
  .tab-pane{ display:none; padding:14px 18px 18px }
  .tab-pane.active{ display:block }
  .tab-pane ul{ max-width:950px; margin:8px auto; text-align:left; padding-left:18px }
  .tab-pane li{ margin:6px 0 }
  .tab-pane strong{ color:var(--cyan) }

  .mini-table{ width:100%; border-collapse:collapse; margin-top:10px; font-weight:700 }
  .mini-table th,.mini-table td{ padding:10px 12px; border-bottom:1px solid var(--border); text-align:left }

  /* ===== Challenges Table ===== */
  .table-wrap{ font-weight:800; width:100%; margin-top:8px }
  .controls{ display:flex; flex-wrap:wrap; gap:12px; margin-bottom:12px; align-items:center }
  .search{ position:relative; flex:1 1 260px }
  .input,.select{
    width:100%; padding:8px 12px; font-size:14px; border:1px solid var(--cyan); border-radius:8px; background:#111; color:#fff; font-weight:700;
  }

  .challenges-table{ width:100%; border-collapse:collapse; text-align:center; font-size:13px; border-radius:12px; overflow:hidden }
  .challenges-table thead th{
    background:#1a1a1a; border-bottom:3px solid var(--cyan); text-transform:uppercase; letter-spacing:.05em; padding:12px 14px;
    position:sticky; top:0; z-index:2; font-weight:900;
  }
  .challenges-table td{ padding:12px 10px; border-bottom:1px solid #222; vertical-align:middle; font-weight:800 }
  .challenges-table tbody tr.dark{ background:#141414; color:#fff }
  .challenges-table tbody tr.light{ background:#1c1c1c; color:#fff }
  .challenges-table tbody tr:hover{ background:rgba(51,204,255,.15) }

  /* Sort controls: INLINE next to header text, vertically centered */
  .sortable{ cursor:pointer; user-select:none; }
  .sortable .hdr{
    display:inline-flex; align-items:center; justify-content:center; gap:6px;
  }
  .sortable .sort-icons{
    display:inline-flex; flex-direction:column; align-items:center; line-height:1; transform:translateY(1px);
  }
  .sort-icons .up,.sort-icons .down{
    display:block; width:0; height:0; border-left:4px solid transparent; border-right:4px solid transparent;
  }
/* Sort controls: INLINE next to header text, perfectly centered */
.sortable .hdr {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

.sort-icons {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;   /* keeps arrows centered vertically */
  line-height: 1;
  transform: translateY(1px);
}

.sort-icons .up,
.sort-icons .down {
  display: block;
  width: 0;
  height: 0;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
}

.sort-icons .up {
  border-bottom: 6px solid #fff;   /* white by default */
  margin-bottom: 3px;              /* adds slight gap between arrows */
}

.sort-icons .down {
  border-top: 6px solid #fff;      /* white by default */
}

th.sorted-asc .sort-icons .up { border-bottom-color: var(--cyan); }   /* cyan when sorted */
th.sorted-desc .sort-icons .down { border-top-color: var(--cyan); }   /* cyan when sorted */


  /* Profit split bar */
  .splitbar{
    display:grid; grid-template-columns:1fr auto; align-items:center; gap:10px; min-width:160px;
  }
  .splitbar .track{
    position:relative; width:100%; height:10px; background:#0f172a; border:1px solid var(--border);
    border-radius:999px; overflow:hidden; box-shadow:inset 0 1px 0 rgba(255,255,255,.06);
  }
  .splitbar .fill{
    height:100%; width:0%; background:linear-gradient(90deg, rgba(51,204,255,0.85), rgba(49,208,170,0.85));
    box-shadow:0 0 10px rgba(51,204,255,.35); transition:width .35s ease;
  }
  .splitbar .label{ font-weight:900; color:#e9f7ff; min-width:54px; text-align:right }

  /* Payout pill */
  .payout-pill{
    display:inline-flex; align-items:center; gap:6px; padding:6px 10px; border-radius:999px; border:1px solid var(--cyan);
    background:linear-gradient(180deg, rgba(51,204,255,.16), rgba(51,204,255,.06)); color:#cfefff; font-weight:900; white-space:nowrap
  }

  /* BUY button using same language as .btn */
  .buy-btn{
    display:inline-block; background:var(--cyan); color:#000!important; padding:8px 12px; border-radius:10px;
    font-weight:900; text-transform:uppercase; letter-spacing:.05em; box-shadow:0 0 18px var(--cyan-20);
    border:2px solid transparent; text-decoration:none; transition:.25s ease; margin-left:8px;
  }
  .buy-btn:hover{ background:#000; color:#fff!important; border-color:#fff; transform:translateY(-2px); box-shadow:0 0 28px rgba(51,204,255,.35) }

  /* Cards / Review */
  .cards{ display:grid; gap:16px; grid-template-columns:repeat(auto-fit, minmax(260px,1fr)); margin-top:12px }
  .card{ padding:22px 18px; text-align:center }
  .review{ margin-top:18px }
  .review-head{ text-align:center; padding:16px }
  .review-head h2{ margin:0 0 8px; font-size:clamp(22px,3vw,30px); text-transform:uppercase }
  .stars{ position:relative; display:inline-block; font-size:18px; line-height:1 }
  .stars::before{ content:"★★★★★"; color:#444; letter-spacing:2px; opacity:.35 }
  .stars::after{
    content:"★★★★★"; position:absolute; left:0; top:0; width: calc(var(--rating) / 5 * 100%);
    overflow:hidden; color:var(--star); letter-spacing:2px;
  }
  .scores{ display:grid; grid-template-columns:repeat(3, minmax(220px,1fr)); gap:12px; margin:12px 0 }
  .score-card{ padding:16px 16px; display:flex; gap:12px; align-items:center }
  .score-card .lbl{ font-weight:900; color:#cfefff }
  .score-card .val{ font-size:.95rem; color:#9bdaf2 }
  .columns{ display:grid; grid-template-columns:repeat(3,1fr); gap:12px; margin-top:12px }
  .list{ padding:16px 16px }
  .list h3{ margin:0 0 8px; color:var(--cyan); font-size:1.05rem; text-transform:uppercase }
  .pros li{ color:#d4fff2 } .cons li{ color:#ffe1e8 }

  .reveal{ opacity:0; transform:translateY(24px); transition:opacity .8s ease, transform .8s ease }
  .reveal.on{ opacity:1; transform:none }

  /* Responsive */
  @media (max-width:1024px){ .stats{ grid-template-columns:repeat(3,1fr) } }
  @media (max-width:820px){
    .hero{ grid-template-columns:1fr; text-align:center }
    .logo-lg{ margin:0 auto }
    .stats{ grid-template-columns:repeat(2,1fr) }
    .scores{ grid-template-columns:repeat(2,1fr) }
    .columns{ grid-template-columns:1fr }
  }
  @media (max-width:520px){
    .stats{ grid-template-columns:1fr }
    .scores{ grid-template-columns:1fr }
  }
  `;
  document.head.appendChild(style);

  // =========================
  // HTML
  // =========================
  root.innerHTML = `
  <header class="topbar">
    <nav class="nav wrap">
      <div class="brand">
        <div class="brand-logo">
          <img id="brandImg" alt="FundingPips logo" style="width:100%;height:100%;object-fit:cover"/>
        </div>
        <div class="brand-name">FundingPips</div>
      </div>
      <div class="pills" id="pillRow"></div>
    </nav>
  </header>

  <main class="wrap">
    <section class="hero reveal on">
      <div class="logo-lg glass">
        <img id="heroLogo" alt="FundingPips logo" style="width:100%;height:100%;object-fit:cover"/>
      </div>
      <div class="glass" style="padding:14px 16px;">
        <h1 id="firmName">FundingPips</h1>
        <p id="tagline"></p>
        <div class="cta">
          <a class="btn" id="ctaBtn" target="_blank" rel="noopener">Start Evaluation</a>
          <a class="btn btn-ghost" id="offerBtn" target="_blank" rel="noopener">View Offers</a>
        </div>
        <div class="badges" id="badgeRow"></div>
      </div>
    </section>

    <h2 class="section-title reveal">Quick Facts</h2>
    <div class="stats reveal" id="statsGrid"></div>

    <section class="tabs glass reveal">
      <div class="tab-head">
        <button class="tab-btn active" data-tab="overview">📋 Overview</button>
        <button class="tab-btn" data-tab="challenges">🎯 Challenges</button>
        <button class="tab-btn" data-tab="offers">🏷️ Offers</button>
        <button class="tab-btn" data-tab="rules">🔒 Rules</button>
        <button class="tab-btn" data-tab="payouts">💸 Payouts</button>
        <button class="tab-btn" data-tab="platforms">🖥️ Platforms & Markets</button>
      </div>

      <div class="tab-pane active" id="tab-overview">
        <ul id="overviewList"></ul>

        <h3 class="section-title" style="margin-top:18px;">Leverage</h3>
        <table class="mini-table glass" id="levTable"></table>

        <h3 class="section-title" style="margin-top:18px;">Commissions</h3>
        <table class="mini-table glass" id="comTable"></table>

        <h3 class="section-title" style="margin-top:18px;">Payment & Payout Methods</h3>
        <table class="mini-table glass">
          <tbody>
            <tr><td><strong>Payments</strong></td><td id="paymentsCell"></td></tr>
            <tr><td><strong>Payouts</strong></td><td id="payoutsCell"></td></tr>
          </tbody>
        </table>
      </div>

      <div class="tab-pane" id="tab-challenges">
        <div class="controls">
          <div class="search"><input id="searchBox" type="text" class="input" placeholder="Search… (e.g., 2 Step, 100K, 8% + 5%)"></div>
          <select id="sizeFilter" class="select"><option value="">All Sizes</option></select>
          <select id="programFilter" class="select"><option value="">All Programs</option></select>
        </div>

        <div class="table-wrap">
          <table id="propTable" class="challenges-table glass">
            <thead>
              <tr>
                <th class="sortable" data-col="0"><span class="hdr">Size<span class="sort-icons"><span class="up"></span><span class="down"></span></span></span></th>
                <th class="sortable" data-col="1"><span class="hdr">Steps<span class="sort-icons"><span class="up"></span><span class="down"></span></span></span></th>
                <th class="sortable" data-col="2"><span class="hdr">Profit Target<span class="sort-icons"><span class="up"></span><span class="down"></span></span></span></th>
                <th class="sortable" data-col="3"><span class="hdr">Daily Loss<span class="sort-icons"><span class="up"></span><span class="down"></span></span></span></th>
                <th class="sortable" data-col="4"><span class="hdr">Max Loss<span class="sort-icons"><span class="up"></span><span class="down"></span></span></span></th>
                <th class="sortable" data-col="5"><span class="hdr">Profit Split<span class="sort-icons"><span class="up"></span><span class="down"></span></span></span></th>
                <th class="sortable" data-col="6"><span class="hdr">Payout<span class="sort-icons"><span class="up"></span><span class="down"></span></span></span></th>
                <th class="sortable" data-col="7"><span class="hdr">Price<span class="sort-icons"><span class="up"></span><span class="down"></span></span></span></th>
              </tr>
            </thead>
            <tbody id="challengeBody"></tbody>
          </table>
        </div>
      </div>

      <div class="tab-pane" id="tab-offers"><ul id="offersList"></ul></div>
      <div class="tab-pane" id="tab-rules"><ul id="rulesList"></ul></div>
      <div class="tab-pane" id="tab-payouts"><ul id="payoutsList"></ul></div>
      <div class="tab-pane" id="tab-platforms"><ul id="platformsList"></ul></div>
    </section>

    <h2 class="section-title reveal">Highlights</h2>
    <div class="cards reveal" id="highlightCards"></div>

    <section class="review reveal" id="reviews">
      <div class="review-head glass">
        <h2>Expert Review & Ratings</h2>
        <p id="verdict"></p>
        <div style="margin-top:10px;">
          <span id="overallStars" class="stars" style="--rating:0" aria-label="Overall rating"></span>
          <span id="overallScore" style="margin-left:8px;font-weight:900;color:#cfefff;"></span>
        </div>
      </div>
      <div class="scores" id="scoreCards"></div>
      <div class="columns">
        <div class="list glass pros"><h3>✅ Pros</h3><ul id="prosList"></ul></div>
        <div class="list glass cons"><h3>❌ Cons</h3><ul id="consList"></ul></div>
        <div class="summary glass"><h3 style="margin:0 0 8px;color:var(--cyan);text-transform:uppercase;font-size:1.05rem;">Summary</h3><p id="summary" style="margin:0;font-weight:700;"></p></div>
      </div>
    </section>
  </main>
  `;

  // =========================
  // RENDER CONTENT
  // =========================
  // Topbar / hero
  $("#brandImg").src = DATA.firm.logo || "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
  $("#heroLogo").src  = DATA.firm.logo || "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
  $("#firmName").textContent = DATA.firm.name;
  $("#tagline").textContent  = DATA.firm.tagline;
  $("#ctaBtn").href   = DATA.firm.ctaUrl;
  $("#offerBtn").href = DATA.firm.offersUrl;

  const pillRow = $("#pillRow");
  (DATA.firm.kpis||[]).forEach(k=>{
    const s = document.createElement("span");
    s.className = "pill";
    s.innerHTML = `<span>${k.icon||"🏷️"}</span> ${k.label}: <strong>${k.value}</strong>`;
    pillRow.appendChild(s);
  });

  // Badges
  const badgeRow = $("#badgeRow");
  (DATA.firm.badges||[]).forEach(b=>{
    const el = document.createElement("span");
    el.className = "badge";
    el.innerHTML = `<span aria-hidden="true">${b.icon||"⭐"}</span> ${b.text}`;
    badgeRow.appendChild(el);
  });

  // Stats
  const stats = [
    {k:'<span aria-hidden="true">📅</span> Founded',        v:DATA.firm.founded},
    {k:'<span aria-hidden="true">🏙️</span> HQ',             v:DATA.firm.hq},
    {k:'<span aria-hidden="true">💰</span> Profit Split',   v:DATA.firm.profitSplit},
    {k:'<span aria-hidden="true">🗓️</span> Payout Cycle',   v:DATA.firm.payoutCycle},
    {k:'<span aria-hidden="true">⏳</span> Time Limit',      v:DATA.firm.timeLimit},
    {k:'<span aria-hidden="true">📆</span> Min Days',        v:DATA.firm.minDays},
    {k:'<span aria-hidden="true">🖥️</span> Platforms',      v:(DATA.firm.platforms||[]).join(" • ")},
    {k:'<span aria-hidden="true">📊</span> Instruments',     v:(DATA.firm.instruments||[]).join(" • ")},
    {k:'<span aria-hidden="true">⚖️</span> Leverage',        v:DATA.firm.leverageNote},
    {k:'<span aria-hidden="true">💳</span> Payments',        v:(DATA.firm.paymentMethods||[]).join(" • ")}
  ];
  const statsGrid = $("#statsGrid");
  stats.forEach(s=>{
    const card = document.createElement("div");
    card.className = "stat glass";
    card.innerHTML = `<div class="k">${s.k}</div><div class="v">${s.v||""}</div>`;
    statsGrid.appendChild(card);
  });

  // Tabs
  const tabBtns = root.querySelectorAll(".tab-btn");
  const panes = {
    overview:   $("#tab-overview"),
    challenges: $("#tab-challenges"),
    offers:     $("#tab-offers"),
    rules:      $("#tab-rules"),
    payouts:    $("#tab-payouts"),
    platforms:  $("#tab-platforms")
  };
  tabBtns.forEach(btn=>{
    btn.addEventListener("click", ()=>{
      tabBtns.forEach(b=>b.classList.remove("active"));
      btn.classList.add("active");
      Object.values(panes).forEach(p=>p.classList.remove("active"));
      panes[btn.dataset.tab].classList.add("active");
    });
  });

  // Fill tab lists
  const ulFill = (el,arr)=>{ (arr||[]).forEach(li=>el.insertAdjacentHTML("beforeend", `<li>${li}</li>`)); };
  ulFill($("#overviewList"), DATA.tabs.overview);
  ulFill($("#offersList"),   DATA.tabs.offers);
  ulFill($("#rulesList"),    DATA.tabs.rules);
  ulFill($("#payoutsList"),  DATA.tabs.payouts);
  ulFill($("#platformsList"),DATA.tabs.platforms);

  // Mini tables
  $("#levTable").innerHTML = `<thead><tr><th>Asset</th><th>Instant</th><th>1-Step</th><th>2-Steps</th><th>3-Steps</th></tr></thead><tbody>${
    (DATA.leverageMatrix||[]).map(r=>`<tr><td>${r.asset}</td><td>${r.instant}</td><td>${r.step1}</td><td>${r.step2}</td><td>${r.step3}</td></tr>`).join("")
  }</tbody>`;
  $("#comTable").innerHTML = `<thead><tr><th>Asset</th><th>Commission</th></tr></thead><tbody>${
    (DATA.commissions||[]).map(r=>`<tr><td>${r.asset}</td><td>${r.details}</td></tr>`).join("")
  }</tbody>`;
  $("#paymentsCell").textContent = (DATA.firm.paymentMethods||[]).join(" • ");
  $("#payoutsCell").textContent  = (DATA.firm.payoutMethods||[]).join(" • ");

  // Highlights
  const cards = [
    { h:"💰 High Profit Split",  p: DATA.firm.profitSplit },
    { h:"⏳ No Time Pressure",  p: `${DATA.firm.timeLimit} to pass evaluations.` },
    { h:"🖥️ Platforms",        p: (DATA.firm.platforms||[]).join(" • ") },
    { h:"⚡ Payouts",          p: DATA.firm.payoutCycle }
  ];
  const cardWrap = $("#highlightCards");
  cards.forEach(c=>{
    const el = document.createElement("div");
    el.className = "card glass";
    el.innerHTML = `<h3>${c.h}</h3><p>${c.p}</p>`;
    cardWrap.appendChild(el);
  });

  // Review
  const R = DATA.review;
  $("#verdict").textContent = R.verdict || "";
  const overall = (+R.overall||0).toFixed(1);
  const stars = $("#overallStars");
  if(stars) stars.style.setProperty("--rating", +overall);
  const overallScore = $("#overallScore");
  if(overallScore) overallScore.textContent = `${overall} / 5`;

  const scoreWrap = $("#scoreCards");
  (R.metrics||[]).forEach(m=>{
    const rating = Math.max(0, Math.min(5, +m.score||0));
    const el = document.createElement("div");
    el.className = "score-card glass";
    el.setAttribute("aria-label", `${m.key} rating ${rating}/5`);
    el.innerHTML = `
      <div class="ic">${m.icon||"⭐"}</div>
      <div class="meta">
        <div class="lbl">${m.key}</div>
        <div class="stars" style="--rating:${rating}" title="${rating}/5"></div>
        <div class="val">${rating.toFixed(1)} / 5</div>
      </div>`;
    scoreWrap.appendChild(el);
  });

  const listFill = (el,arr)=>{ (arr||[]).forEach(x=> el.insertAdjacentHTML("beforeend", `<li>${x}</li>`)); };
  listFill($("#prosList"), R.pros);
  listFill($("#consList"), R.cons);
  $("#summary").textContent = R.summary || "";

  // =========================
  // CHALLENGES TABLE (Render + Interactions)
  // =========================
  const bodyEl = $("#challengeBody");

  // default split inference (fallback)
  const programDefaultSplit = (prog) => {
    const p = String(prog||"").toLowerCase();
    if (p.includes("2 step pro")) return 90;
    if (p.includes("2 step")) return 85;
    if (p.includes("1 step")) return 80;
    return 80;
  };

  // Row template (split bar + payout pill + PRICE + BUY button in same cell)
  const rowHtml = r => {
    const split = Number.isFinite(+r.profitSplitPercent) ? +r.profitSplitPercent : programDefaultSplit(r.program);
    const clamped = Math.max(0, Math.min(100, split));
    const payout = r.payoutFreq || "Weekly (Tuesday)";
    return `
      <tr>
        <td>${r.size}</td>
        <td>${r.program}</td>
        <td>${r.target}</td>
        <td>${r.daily}</td>
        <td>${r.total}</td>
        <td>
          <div class="splitbar" title="${clamped}% profit split">
            <div class="track"><div class="fill" style="width:${clamped}%;"></div></div>
            <div class="label">${clamped}%</div>
          </div>
        </td>
        <td><span class="payout-pill">🗓️ ${payout}</span></td>
        <td><span class="price">${r.fee}</span><a href="${r.url}" target="_blank" rel="noopener" class="buy-btn">BUY</a></td>
      </tr>`;
  };

  function paintRows(rows){
    bodyEl.innerHTML = rows.map(rowHtml).join("");
    // zebra striping
    let dark = true;
    bodyEl.querySelectorAll("tr").forEach(tr=>{
      tr.classList.remove("dark","light");
      tr.classList.add(dark ? "dark" : "light");
      dark = !dark;
    });
  }
  paintRows(DATA.challenges);

  // Filters
  const sizeSel = $("#sizeFilter");
  const progSel = $("#programFilter");
  Array.from(new Set(DATA.challenges.map(r=>r.size)))
    .sort((a,b)=>parseInt(a)-parseInt(b)||a.localeCompare(b))
    .forEach(s=> sizeSel.insertAdjacentHTML("beforeend", `<option>${s}</option>`));
  Array.from(new Set(DATA.challenges.map(r=>r.program)))
    .forEach(p=> progSel.insertAdjacentHTML("beforeend", `<option>${p}</option>`));

  const qBox = $("#searchBox");
  function applyFilters(){
    const q = (qBox?.value||"").toLowerCase();
    const s = (sizeSel?.value||"").toUpperCase();
    const p = (progSel?.value||"").toUpperCase();
    const filtered = DATA.challenges.filter(r=>{
      const text = `${r.size} ${r.program} ${r.target} ${r.daily} ${r.total} ${r.fee} ${r.payoutFreq||""} ${r.profitSplitPercent||programDefaultSplit(r.program)}%`.toLowerCase();
      const sizeMatch = !s || String(r.size).toUpperCase().startsWith(s);
      const progMatch = !p || String(r.program).toUpperCase() === p;
      return text.includes(q) && sizeMatch && progMatch;
    });
    paintRows(filtered);
  }
  if(qBox) qBox.addEventListener("input", applyFilters);
  if(sizeSel) sizeSel.addEventListener("change", applyFilters);
  if(progSel) progSel.addEventListener("change", applyFilters);

  // Sorting
  const table = $("#propTable");
  let sortDir = {};
  const parseNum = v => {
    if (v == null) return 0;
    const s = String(v).replace(/[^0-9.]/g, "");
    return parseFloat(s || "0");
  };

  table.querySelectorAll("thead th.sortable").forEach(th=>{
    th.addEventListener("click", ()=>{
      const idx = +th.dataset.col;
      const dir = sortDir[idx] === "asc" ? "desc" : "asc";
      sortDir[idx] = dir;

      const rows = [...DATA.challenges].map(row => {
        const split = Number.isFinite(+row.profitSplitPercent) ? +row.profitSplitPercent : programDefaultSplit(row.program);
        const keyMap = [
          row.size,             // 0
          row.program,          // 1
          row.target,           // 2
          row.daily,            // 3
          row.total,            // 4
          split,                // 5 numeric
          row.payoutFreq||"",   // 6
          row.fee               // 7 (price)
        ];
        return { row, keyMap };
      });

      rows.sort((A,B)=>{
        const a = A.keyMap[idx], b = B.keyMap[idx];
        const numericCols = new Set([0,5,7]); // Size, Profit Split, Price
        if (numericCols.has(idx)) {
          const na = idx===0 ? parseNum(a) : (idx===7 ? parseNum(a) : (+a||0));
          const nb = idx===0 ? parseNum(b) : (idx===7 ? parseNum(b) : (+b||0));
          return dir==="asc" ? na - nb : nb - na;
        }
        return dir==="asc"
          ? String(a).localeCompare(String(b), undefined, { numeric:true })
          : String(b).localeCompare(String(a), undefined, { numeric:true });
      });

      paintRows(rows.map(x=>x.row));
      table.querySelectorAll("thead th").forEach(h=>h.classList.remove("sorted-asc","sorted-desc"));
      th.classList.add(dir === "asc" ? "sorted-asc" : "sorted-desc");
    });
  });

  // Reveal on scroll (for hero/cards/review)
  (function(){
    const els=[...root.querySelectorAll(".reveal")];
    if(!("IntersectionObserver" in window)){ els.forEach(e=>e.classList.add("on")); return; }
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(en=>{
        if(en.isIntersecting){ en.target.classList.add("on"); io.unobserve(en.target); }
      });
    },{ threshold:.12, rootMargin:"0px 0px -10% 0px" });
    els.forEach(el=>io.observe(el));
  })();
})();
</script>
