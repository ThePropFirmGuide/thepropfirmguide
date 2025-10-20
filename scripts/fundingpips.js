/* ThePropFirmGuide • FundingPips (Full Page, Final)
   Includes: centered stacked arrows, Montserrat bold, BUY button, profit split bar
   Author: you + AI pair 🛠️
*/

(function(){
const ROOT_ID = "tpg-root";
const $ = (sel, ctx=document) => ctx.querySelector(sel);

let root = document.getElementById(ROOT_ID);
if(!root){
  root = document.createElement("div");
  root.id = ROOT_ID;
  document.body.appendChild(root);
}

// ---------- DATA ----------
const DATA = {
  firm: {
    name: "FundingPips",
    slug: "funding-pips",
    tagline: "Tuesday payouts • up to 90% split • MT5 / cTrader / MatchTrader",
    logo: "",
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
      { text:"High Split", icon:"💰" },
      { text:"No Time Limit", icon:"⏱️" },
      { text:"EAs Allowed", icon:"🤖" }
    ],
    kpis: [
      { label:"Payouts", value:"Tuesdays", icon:"💸" },
      { label:"Split", value:"80–90%", icon:"💰" },
      { label:"Min Days", value:"None", icon:"📆" },
      { label:"Time Limit", value:"None", icon:"⏱️" }
    ]
  },
  challenges: [
    {
      size:"100K",
      program:"1 Step",
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
  leverageMatrix: [
    { asset:"FX", instant:"1:50", step1:"1:30", step2:"1:100", step3:"n/a" },
    { asset:"Metals", instant:"1:20", step1:"1:10", step2:"1:30", step3:"n/a" },
    { asset:"Indices", instant:"1:20", step1:"1:5", step2:"1:20", step3:"n/a" },
    { asset:"Energy", instant:"1:10", step1:"1:10", step2:"1:10", step3:"n/a" },
    { asset:"Crypto", instant:"1:2", step1:"1:1", step2:"1:2", step3:"n/a" }
  ],
  commissions: [
    { asset:"FX", details:"FP Zero: $7/lot • 1-Step / 2-Step / 2-Step Pro: $5/lot" },
    { asset:"Metals", details:"FP Zero: $7/lot • 1-Step / 2-Step / 2-Step Pro: $5/lot" },
    { asset:"Indices", details:"No commission" },
    { asset:"Energy", details:"No commission" },
    { asset:"Crypto", details:"0.04% commission" }
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
      { key:"Profit Split", icon:"💰", score:4.5 },
      { key:"Payout Speed", icon:"⚡", score:4.7 },
      { key:"Rule Transparency", icon:"🔒", score:4.2 },
      { key:"Scaling Program", icon:"📈", score:4.3 },
      { key:"Trader Support", icon:"🧠", score:4.3 },
      { key:"Platform Choice", icon:"🖥️", score:4.8 }
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

// ---------- STYLES ----------
const style=document.createElement("style");
style.textContent=`
:root{--cyan:#33ccff;--border:#1f2937;--font:'Montserrat',sans-serif;--bg:#0b0b0b;}
body{background:transparent;color:#fff;font-family:var(--font);}
.challenges-table{width:100%;border-collapse:collapse;text-align:center;font-weight:700;font-family:var(--font);}
.challenges-table th{background:#1a1a1a;padding:12px 8px;border-bottom:3px solid var(--cyan);position:sticky;top:0;text-transform:uppercase;}
.challenges-table td{padding:12px 8px;border-bottom:1px solid #222;color:#fff;}
.sortable{cursor:pointer;position:relative;padding-right:22px;}
.sort-icons{position:absolute;right:4px;top:50%;transform:translateY(-50%);display:flex;flex-direction:column;align-items:center;gap:2px;}
.sort-icons .up,.sort-icons .down{width:0;height:0;border-left:4px solid transparent;border-right:4px solid transparent;}
.sort-icons .up{border-bottom:6px solid #fff;}
.sort-icons .down{border-top:6px solid #fff;}
.sorted-asc .sort-icons .up{border-bottom-color:var(--cyan);}
.sorted-desc .sort-icons .down{border-top-color:var(--cyan);}
.buy-btn{display:inline-block;background:var(--cyan);color:#000!important;padding:10px 14px;border-radius:12px;font-weight:900;text-transform:uppercase;letter-spacing:.05em;box-shadow:0 0 18px rgba(51,204,255,.2);border:2px solid transparent;text-decoration:none;transition:.25s ease;}
.buy-btn:hover{background:#000;color:#fff!important;border-color:#fff;transform:translateY(-2px);box-shadow:0 0 28px rgba(51,204,255,.35);}
.splitbar{display:grid;grid-template-columns:1fr auto;align-items:center;gap:10px;min-width:160px;}
.splitbar .track{position:relative;width:100%;height:10px;background:#0f172a;border:1px solid var(--border);border-radius:999px;overflow:hidden;}
.splitbar .fill{height:100%;background:linear-gradient(90deg, rgba(51,204,255,0.85), rgba(49,208,170,0.85));box-shadow:0 0 10px rgba(51,204,255,.35);}
.splitbar .label{font-weight:900;color:#e9f7ff;min-width:54px;text-align:right;}
.payout-pill{display:inline-flex;align-items:center;gap:6px;padding:6px 10px;border-radius:999px;border:1px solid var(--cyan);background:linear-gradient(180deg,rgba(51,204,255,.16),rgba(51,204,255,.06));color:#cfefff;font-weight:900;white-space:nowrap;}
`;
document.head.appendChild(style);

// ---------- PAGE STRUCTURE ----------
root.innerHTML=`
<main class="wrap">
  <section class="hero">
    <h1 style="color:var(--cyan);font-weight:900;">FundingPips</h1>
    <p>${DATA.firm.tagline}</p>
    <a href="${DATA.firm.ctaUrl}" target="_blank" class="buy-btn">Start Evaluation</a>
  </section>

  <h2 class="section-title" style="text-align:center;">Challenges</h2>
  <div class="table-wrap">
    <table class="challenges-table">
      <thead><tr>
        <th class="sortable" data-col="0">Size<div class="sort-icons"><span class="up"></span><span class="down"></span></div></th>
        <th class="sortable" data-col="1">Steps<div class="sort-icons"><span class="up"></span><span class="down"></span></div></th>
        <th class="sortable" data-col="2">Profit Target<div class="sort-icons"><span class="up"></span><span class="down"></span></div></th>
        <th class="sortable" data-col="3">Daily Loss<div class="sort-icons"><span class="up"></span><span class="down"></span></div></th>
        <th class="sortable" data-col="4">Max Loss<div class="sort-icons"><span class="up"></span><span class="down"></span></div></th>
        <th class="sortable" data-col="5">Profit Split<div class="sort-icons"><span class="up"></span><span class="down"></span></div></th>
        <th class="sortable" data-col="6">Payout Frequency<div class="sort-icons"><span class="up"></span><span class="down"></span></div></th>
        <th class="sortable" data-col="7">Price<div class="sort-icons"><span class="up"></span><span class="down"></span></div></th>
        <th>Buy</th>
      </tr></thead>
      <tbody id="challengeBody"></tbody>
    </table>
  </div>
</main>
`;

const body=$("#challengeBody");
function renderRows(data){
  body.innerHTML=data.map(r=>{
    const clamped=Math.max(0,Math.min(100,r.profitSplitPercent||80));
    return `
    <tr>
      <td>${r.size}</td>
      <td>${r.program}</td>
      <td>${r.target}</td>
      <td>${r.daily}</td>
      <td>${r.total}</td>
      <td><div class="splitbar"><div class="track"><div class="fill" style="width:${clamped}%;"></div></div><div class="label">${clamped}%</div></div></td>
      <td><span class="payout-pill">🗓️ ${r.payoutFreq}</span></td>
      <td>${r.fee}</td>
      <td><a href="${r.url}" target="_blank" rel="noopener" class="buy-btn">BUY</a></td>
    </tr>`;
  }).join("");
}
renderRows(DATA.challenges);

// ---------- SORTING ----------
const table=root.querySelector("table");
let sortDir={};
table.querySelectorAll("th.sortable").forEach(th=>{
  th.addEventListener("click",()=>{
    const idx=+th.dataset.col;
    const dir=sortDir[idx]==="asc"?"desc":"asc";
    sortDir[idx]=dir;
    const keys=["size","program","target","daily","total","profitSplitPercent","payoutFreq","fee"];
    const rows=[...DATA.challenges];
    rows.sort((a,b)=>{
      const ka=a[keys[idx]]||"", kb=b[keys[idx]]||"";
      const na=parseFloat(ka)||0, nb=parseFloat(kb)||0;
      const numericCols=new Set([0,5,7]);
      if(numericCols.has(idx)) return dir==="asc"?na-nb:nb-na;
      return dir==="asc"?ka.localeCompare(kb):kb.localeCompare(ka);
    });
    renderRows(rows);
    table.querySelectorAll("th").forEach(h=>h.classList.remove("sorted-asc","sorted-desc"));
    th.classList.add(dir==="asc"?"sorted-asc":"sorted-desc");
  });
});
})();
