/* FundingPips • Challenges Table (Final v3)
   - Right-aligned stacked sort arrows (white → cyan)
   - Column renames
   - BUY button (matches "Start Evaluation" style)
   - Montserrat bold, thicker table text
*/

(function () {
  const ROOT_ID = "tpg-root";
  const $ = (s, c = document) => c.querySelector(s);

  // Ensure a mount point exists (works in Wix HTML Embed iframe)
  let root = document.getElementById(ROOT_ID);
  if (!root) {
    root = document.createElement("div");
    root.id = ROOT_ID;
    document.body.appendChild(root);
  }

  // --- Minimal DATA for the table demo (rest of page can stay separate if needed) ---
  const DATA = {
    challenges: [
      {
        size: "100K",
        program: "1 Step",
        target: "Varies by program",
        daily: "Varies",
        total: "Varies",
        fee: "$555 ($444 w/ 20% off)",
        url: "https://propfirmmatch.com/prop-firm-challenges/funding-pips-challenges-1-step-100k",
        profitSplitPercent: 80,
        payoutFreq: "Weekly (Tuesday)"
      },
      {
        size: "25K",
        program: "2 Step",
        target: "8% + 5%",
        daily: "Varies",
        total: "Varies",
        fee: "$156 ($124.80 w/ 20% off)",
        url: "https://propfirmmatch.com/prop-firm-challenges/funding-pips-challenges-2-steps-25k",
        profitSplitPercent: 85,
        payoutFreq: "Weekly (Tuesday)"
      }
    ]
  };

  // --- Styles (table-only; safe to coexist with your main page styles) ---
  const style = document.createElement("style");
  style.textContent = `
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800;900&display=swap');

  :root{
    --text:#fff; --cyan:#33ccff; --cyan-20:rgba(51,204,255,.2);
    --border:#1f2937; --card:#111; --font:'Montserrat',sans-serif;
  }

  /* Container (keeps things neat inside the embed) */
  #${ROOT_ID} { font-family: var(--font); color: var(--text); }

  .table-wrap{
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 10px;
    overflow-x: auto;
  }

  table.challenges-table{
    width: 100%;
    border-collapse: collapse;
    font-size: 14px;
    text-align: center;
    border-radius: 12px;
    overflow: hidden;
    font-family: var(--font);
  }

  thead th{
    position: sticky; top: 0; z-index: 2;
    background: #1a1a1a;
    border-bottom: 3px solid var(--cyan);
    color: #fff;
    text-transform: uppercase;
    letter-spacing: .05em;
    padding: 14px 14px;
    /* ensure multi-line headers remain tidy */
    line-height: 1.25;
    font-weight: 900;
  }

  tbody td{
    padding: 12px 14px;
    border-bottom: 1px solid #222;
    vertical-align: middle;
    color: #fff;
    font-weight: 800; /* thicker text in columns */
  }

  tbody tr.dark{ background:#141414 }
  tbody tr.light{ background:#1c1c1c }
  tbody tr:hover{ background: rgba(51,204,255,.15) }

  /* Sortable header: keep arrows ALWAYS on the right, vertically centered */
  th.sortable{
    position: relative;
    padding-right: 32px; /* room for arrows at far right */
    cursor: pointer;
    user-select: none;
    white-space: normal;
  }
  .th-inner{
    display: inline-block;
    text-align: center;
  }
  .sort-icons{
    position: absolute;
    right: 8px;                 /* lock to right edge */
    top: 50%; transform: translateY(-50%); /* vertical center no matter the header height */
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;                   /* tight stack */
    pointer-events: none;       /* clicks go to the th */
  }
  .sort-arrow{
    width: 0; height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
  }
  .sort-arrow.up { border-bottom: 7px solid #ffffff; }
  .sort-arrow.down { border-top: 7px solid #ffffff; }

  /* Hover = cyan preview */
  th.sortable:hover .sort-arrow.up { border-bottom-color: var(--cyan); }
  th.sortable:hover .sort-arrow.down { border-top-color: var(--cyan); }

  /* Active state = cyan lock-in */
  th.sorted-asc  .sort-arrow.up { border-bottom-color: var(--cyan) !important; }
  th.sorted-desc .sort-arrow.down{ border-top-color: var(--cyan) !important; }

  /* BUY button — identical feel to "Start Evaluation" */
  .buy-btn{
    display: inline-block;
    background: var(--cyan);
    color: #000 !important;
    padding: 12px 18px;
    border-radius: 12px;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: .05em;
    box-shadow: 0 0 18px var(--cyan-20);
    border: 2px solid transparent;
    text-decoration: none;
    transition: .25s ease;
  }
  .buy-btn:hover{
    background: #000;
    color: #fff !important;
    border-color: #fff;
    transform: translateY(-2px);
    box-shadow: 0 0 28px rgba(51,204,255,.35);
  }

  /* Small screens: keep things compact */
  @media (max-width:820px){
    thead th, tbody td { font-size: 12px; padding: 10px 10px; }
    th.sortable{ padding-right: 28px; }
  }
  `;
  document.head.appendChild(style);

  // --- Build table skeleton (with renamed headers + stacked arrows) ---
  root.innerHTML = `
    <div class="table-wrap">
      <table id="propTable" class="challenges-table" aria-label="FundingPips Challenges (v3)">
        <thead>
          <tr>
            <th class="sortable" data-col="0" aria-sort="none">
              <span class="th-inner">Size</span>
              <span class="sort-icons"><i class="sort-arrow up"></i><i class="sort-arrow down"></i></span>
            </th>
            <th class="sortable" data-col="1" aria-sort="none">
              <span class="th-inner">Steps</span>
              <span class="sort-icons"><i class="sort-arrow up"></i><i class="sort-arrow down"></i></span>
            </th>
            <th class="sortable" data-col="2" aria-sort="none">
              <span class="th-inner">Profit&nbsp;Target</span>
              <span class="sort-icons"><i class="sort-arrow up"></i><i class="sort-arrow down"></i></span>
            </th>
            <th class="sortable" data-col="3" aria-sort="none">
              <span class="th-inner">Daily&nbsp;Loss</span>
              <span class="sort-icons"><i class="sort-arrow up"></i><i class="sort-arrow down"></i></span>
            </th>
            <th class="sortable" data-col="4" aria-sort="none">
              <span class="th-inner">Max&nbsp;Loss</span>
              <span class="sort-icons"><i class="sort-arrow up"></i><i class="sort-arrow down"></i></span>
            </th>
            <th class="sortable" data-col="5" aria-sort="none">
              <span class="th-inner">Profit&nbsp;Split</span>
              <span class="sort-icons"><i class="sort-arrow up"></i><i class="sort-arrow down"></i></span>
            </th>
            <th class="sortable" data-col="6" aria-sort="none">
              <span class="th-inner">Payout&nbsp;Frequency</span>
              <span class="sort-icons"><i class="sort-arrow up"></i><i class="sort-arrow down"></i></span>
            </th>
            <th class="sortable" data-col="7" aria-sort="none">
              <span class="th-inner">Price</span>
              <span class="sort-icons"><i class="sort-arrow up"></i><i class="sort-arrow down"></i></span>
            </th>
            <th>Buy</th>
          </tr>
        </thead>
        <tbody id="challengeBody"></tbody>
      </table>
    </div>
  `;

  const body = $("#challengeBody");

  // Render rows (no Website col; BUY button right after Price)
  function renderRows(rows) {
    body.innerHTML = rows
      .map(
        (r) => `
      <tr>
        <td>${r.size}</td>
        <td>${r.program}</td>
        <td>${r.target}</td>
        <td>${r.daily}</td>
        <td>${r.total}</td>
        <td>${Number.isFinite(+r.profitSplitPercent) ? +r.profitSplitPercent : ""}%</td>
        <td>${r.payoutFreq || ""}</td>
        <td>${r.fee}</td>
        <td><a class="buy-btn" href="${r.url}" target="_blank" rel="noopener">BUY</a></td>
      </tr>`
      )
      .join("");

    // zebra striping
    let dark = true;
    body.querySelectorAll("tr").forEach((tr) => {
      tr.classList.remove("dark", "light");
      tr.classList.add(dark ? "dark" : "light");
      dark = !dark;
    });
  }
  renderRows(DATA.challenges);

  // Sorting
  const table = $("#propTable");
  let sortDir = {}; // per-column

  const parseNum = (v) => {
    if (v == null) return 0;
    // handle "$555 ($444...)" or "100K"
    const s = String(v).toUpperCase();
    const k = s.includes("K") ? parseFloat(s) * 1000 : parseFloat(s.replace(/[^0-9.]/g, ""));
    return isNaN(k) ? 0 : k;
  };

  const headerCells = table.querySelectorAll("thead th.sortable");
  headerCells.forEach((th) => {
    th.addEventListener("click", () => {
      const idx = +th.dataset.col;
      const dir = sortDir[idx] === "asc" ? "desc" : "asc";
      sortDir[idx] = dir;

      // map -> sort -> render
      const rows = [...DATA.challenges];
      const keys = ["size", "program", "target", "daily", "total", "profitSplitPercent", "payoutFreq", "fee"];

      rows.sort((a, b) => {
        const A = a[keys[idx]];
        const B = b[keys[idx]];
        const numericCols = new Set([0, 5, 7]); // Size, Profit Split, Price
        if (numericCols.has(idx)) {
          const na = idx === 0 ? parseNum(A) : idx === 7 ? parseNum(A) : +A || 0;
          const nb = idx === 0 ? parseNum(B) : idx === 7 ? parseNum(B) : +B || 0;
          return dir === "asc" ? na - nb : nb - na;
        }
        const sa = String(A ?? "");
        const sb = String(B ?? "");
        return dir === "asc"
          ? sa.localeCompare(sb, undefined, { numeric: true })
          : sb.localeCompare(sa, undefined, { numeric: true });
      });

      renderRows(rows);

      // visual state
      headerCells.forEach((h) => {
        h.classList.remove("sorted-asc", "sorted-desc");
        h.setAttribute("aria-sort", "none");
      });
      th.classList.add(dir === "asc" ? "sorted-asc" : "sorted-desc");
      th.setAttribute("aria-sort", dir === "asc" ? "ascending" : "descending");
    });
  });

  // Minimal version marker (helps you confirm updates without DevTools)
  root.setAttribute("data-tpg-build", "v3-arrows-right-cyan");
})();
