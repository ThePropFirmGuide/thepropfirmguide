/* ThePropFirmGuide • FundingPips (Full Page, Enhanced Table)
   Version: Clean arrows + BUY button + renames + Montserrat Bold
   Author: you + AI pair 🛠️
*/

(function(){
  const ROOT_ID = "tpg-root";
  const $ = (sel, ctx=document) => ctx.querySelector(sel);

  // ---------- STYLES ----------
  const style = document.createElement("style");
  style.textContent = `
  :root{
    --bg:#0b0b0b;--card:#111;--text:#fff;--muted:#b9c1c9;
    --cyan:#33ccff;--cyan-20:rgba(51,204,255,.2);
    --border:#1f2937;--shadow:0 12px 30px rgba(0,0,0,.35);
    --radius:18px;--font:'Montserrat',sans-serif;
    --success:#31d0aa;--danger:#ff4d6d;--star:#ffd166;
  }
  *{box-sizing:border-box;}
  body{font-family:var(--font);background:transparent;color:var(--text);}
  table{border-collapse:collapse;width:100%;}
  th,td{padding:12px 10px;text-align:center;font-weight:700;color:#f2f8fa;}
  thead th{background:#1a1a1a;border-bottom:3px solid var(--cyan);position:sticky;top:0;z-index:5;}
  tbody tr.dark{background:#141414;} tbody tr.light{background:#1c1c1c;}
  tbody tr:hover{background:rgba(51,204,255,.15);}
  th.sortable{cursor:pointer;user-select:none;position:relative;}
  th .sort-icons{display:inline-flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;margin-left:4px;vertical-align:middle;}
  .sort-icons span{display:block;width:0;height:0;border-left:4px solid transparent;border-right:4px solid transparent;}
  .sort-icons .up{border-bottom:6px solid #888;}
  .sort-icons .down{border-top:6px solid #888;}
  th.sorted-asc .sort-icons .up{border-bottom-color:var(--cyan);}
  th.sorted-desc .sort-icons .down{border-top-color:var(--cyan);}
  .splitbar{display:grid;grid-template-columns:1fr auto;align-items:center;gap:10px;min-width:140px;}
  .splitbar .track{position:relative;width:100%;height:10px;background:#0f172a;border:1px solid var(--border);border-radius:999px;overflow:hidden;}
  .splitbar .fill{height:100%;background:linear-gradient(90deg, rgba(51,204,255,0.85), rgba(49,208,170,0.85));box-shadow:0 0 10px rgba(51,204,255,.35);}
  .splitbar .label{font-weight:900;color:#e9f7ff;min-width:50px;text-align:right;}
  .payout-pill{display:inline-flex;align-items:center;gap:6px;padding:6px 10px;border-radius:999px;border:1px solid var(--cyan);
    background:linear-gradient(180deg,rgba(51,204,255,.16),rgba(51,204,255,.06));color:#cfefff;font-weight:900;white-space:nowrap;}
  .visit-btn{
    background:var(--cyan);color:#000;font-weight:900;border:none;padding:10px 18px;border-radius:12px;
    text-transform:uppercase;letter-spacing:.04em;cursor:pointer;transition:.25s ease;
  }
  .visit-btn:hover{background:#000;color:#fff;border:2px solid #fff;transform:translateY(-2px);}
  `;
  document.head.appendChild(style);

  // ---------- DATA ----------
  const DATA = {
    challenges: [
      { size:"100K", program:"1 Step", target:"Varies by program", daily:"Varies", total:"Varies",
        fee:"$555 ($444 w/ 20% off)", url:"https://propfirmmatch.com/prop-firm-challenges/funding-pips-challenges-1-step-100k",
        profitSplitPercent:80, payoutFreq:"Weekly (Tuesday)" },
      { size:"25K", program:"2 Step", target:"8% + 5%", daily:"Varies", total:"Varies",
        fee:"$156 ($124.80 w/ 20% off)", url:"https://propfirmmatch.com/prop-firm-challenges/funding-pips-challenges-2-steps-25k",
        profitSplitPercent:85, payoutFreq:"Weekly (Tuesday)" }
    ]
  };

  // ---------- TABLE RENDER ----------
  const root = document.getElementById(ROOT_ID) || document.body.appendChild(Object.assign(document.createElement("div"),{id:ROOT_ID}));
  root.innerHTML = `
  <table id="propTable" class="challenges-table">
    <thead>
      <tr>
        <th class="sortable" data-col="0">Size <span class="sort-icons"><span class="up"></span><span class="down"></span></span></th>
        <th class="sortable" data-col="1">Steps <span class="sort-icons"><span class="up"></span><span class="down"></span></span></th>
        <th class="sortable" data-col="2">Profit Target <span class="sort-icons"><span class="up"></span><span class="down"></span></span></th>
        <th class="sortable" data-col="3">Daily Loss <span class="sort-icons"><span class="up"></span><span class="down"></span></span></th>
        <th class="sortable" data-col="4">Max Loss <span class="sort-icons"><span class="up"></span><span class="down"></span></span></th>
        <th class="sortable" data-col="5">Profit Split <span class="sort-icons"><span class="up"></span><span class="down"></span></span></th>
        <th class="sortable" data-col="6">Payout Frequency <span class="sort-icons"><span class="up"></span><span class="down"></span></span></th>
        <th class="sortable" data-col="7">Price <span class="sort-icons"><span class="up"></span><span class="down"></span></span></th>
        <th>Buy</th>
      </tr>
    </thead>
    <tbody id="challengeBody"></tbody>
  </table>`;

  const bodyEl = $("#challengeBody");

  const programDefaultSplit = (prog) => {
    const p = String(prog||"").toLowerCase();
    if (p.includes("2 step pro")) return 90;
    if (p.includes("2 step")) return 85;
    if (p.includes("1 step")) return 80;
    return 80;
  };

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
        <div class="splitbar">
          <div class="track"><div class="fill" style="width:${clamped}%;"></div></div>
          <div class="label">${clamped}%</div>
        </div>
      </td>
      <td><span class="payout-pill">🗓️ ${payout}</span></td>
      <td>${r.fee}</td>
      <td><a href="${r.url}" target="_blank" rel="noopener"><button class="visit-btn">BUY</button></a></td>
    </tr>`;
  };

  function paintRows(rows){
    bodyEl.innerHTML = rows.map(rowHtml).join("");
    let dark = true;
    bodyEl.querySelectorAll("tr").forEach(tr=>{
      tr.classList.remove("dark","light");
      tr.classList.add(dark ? "dark" : "light");
      dark = !dark;
    });
  }
  paintRows(DATA.challenges);

  // ---------- SORTING ----------
  const table = $("#propTable");
  let sortDir = {};
  const parseNum = v => {
    if (v == null) return 0;
    const s = String(v).replace(/[^0-9.]/g,"");
    return parseFloat(s||"0");
  };

  table.querySelectorAll("thead th.sortable").forEach(th=>{
    th.addEventListener("click", ()=>{
      const idx = +th.dataset.col;
      const dir = sortDir[idx] === "asc" ? "desc" : "asc";
      sortDir[idx] = dir;

      const rows = [...DATA.challenges].map(row => {
        const split = Number.isFinite(+row.profitSplitPercent) ? +row.profitSplitPercent : programDefaultSplit(row.program);
        const keyMap = [row.size, row.program, row.target, row.daily, row.total, split, row.payoutFreq||"", row.fee];
        return { row, keyMap };
      });

      rows.sort((A,B)=>{
        const a = A.keyMap[idx], b = B.keyMap[idx];
        const numericCols = new Set([0,5,7]);
        if (numericCols.has(idx)) {
          const na = idx===0 ? parseNum(a) : (idx===7 ? parseNum(a) : (+a||0));
          const nb = idx===0 ? parseNum(b) : (idx===7 ? parseNum(b) : (+b||0));
          return dir==="asc" ? na - nb : nb - na;
        }
        return dir==="asc"
          ? String(a).localeCompare(String(b),undefined,{numeric:true})
          : String(b).localeCompare(String(a),undefined,{numeric:true});
      });

      paintRows(rows.map(x=>x.row));
      table.querySelectorAll("thead th").forEach(h=>h.classList.remove("sorted-asc","sorted-desc"));
      th.classList.add(dir==="asc" ? "sorted-asc" : "sorted-desc");
    });
  });
})();
