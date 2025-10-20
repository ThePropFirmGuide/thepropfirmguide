// FundingPips.js (Final Build v3)
// Keeps your layout identical to v2, adds: right-side stacked arrows, profit split bar restored.

(function(){
  const ROOT_ID = "tpg-root";
  const $ = (s,c=document)=>c.querySelector(s);
  let root=document.getElementById(ROOT_ID)||Object.assign(document.body.appendChild(document.createElement("div")),{id:ROOT_ID});

  const style=document.createElement("style");
  style.textContent=`
  :root{
    --cyan:#33ccff;
    --border:#1f2937;
    --font:'Montserrat',sans-serif;
    --bar-bg:#222;
  }

  .challenges-table{
    width:100%;
    border-collapse:collapse;
    text-align:center;
    font-family:var(--font);
    font-weight:700;
  }
  .challenges-table th{
    background:#1a1a1a;
    color:#fff;
    padding:12px 8px;
    border-bottom:3px solid var(--cyan);
    position:sticky;
    top:0;
  }
  .challenges-table td{
    padding:12px 8px;
    border-bottom:1px solid #222;
    color:#fff;
    font-weight:700;
    vertical-align:middle;
  }

  /* Right-aligned stacked sort arrows */
  .sortable{
    cursor:pointer;
    user-select:none;
    position:relative;
    padding-right:24px;
  }
  .sort-icons{
    position:absolute;
    right:4px;
    top:50%;
    transform:translateY(-50%);
    display:flex;
    flex-direction:column;
    align-items:center;
    gap:2px;
  }
  .sort-icons .up,.sort-icons .down{
    width:0;height:0;
    border-left:4px solid transparent;
    border-right:4px solid transparent;
  }
  .sort-icons .up{border-bottom:6px solid #fff;}
  .sort-icons .down{border-top:6px solid #fff;}
  .sortable:hover .up{border-bottom-color:var(--cyan);}
  .sortable:hover .down{border-top-color:var(--cyan);}
  .sorted-asc .up{border-bottom-color:var(--cyan)!important;}
  .sorted-desc .down{border-top-color:var(--cyan)!important;}

  /* Profit split bar */
  .profit-bar{
    width:100%;
    background:var(--bar-bg);
    border-radius:6px;
    height:12px;
    position:relative;
    overflow:hidden;
  }
  .profit-fill{
    background:var(--cyan);
    height:100%;
    border-radius:6px 0 0 6px;
    transition:width .4s ease;
  }
  .profit-text{
    position:absolute;
    top:50%;
    left:50%;
    transform:translate(-50%,-50%);
    font-size:12px;
    color:#000;
    font-weight:800;
  }

  /* BUY button */
  .buy-btn{
    display:inline-block;
    background:var(--cyan);
    color:#000!important;
    padding:10px 14px;
    border-radius:12px;
    font-weight:900;
    text-transform:uppercase;
    letter-spacing:.05em;
    box-shadow:0 0 18px rgba(51,204,255,.2);
    border:2px solid transparent;
    text-decoration:none;
    transition:.25s ease;
  }
  .buy-btn:hover{
    background:#000;
    color:#fff!important;
    border-color:#fff;
    transform:translateY(-2px);
    box-shadow:0 0 28px rgba(51,204,255,.35);
  }
  `;
  document.head.appendChild(style);

  const DATA={challenges:[
    {size:"100K",program:"1 Step",target:"Varies",daily:"Varies",total:"Varies",fee:"$555",url:"https://fundingpips.com",profitSplitPercent:80,payoutFreq:"Weekly"},
    {size:"25K",program:"2 Step",target:"8%+5%",daily:"Varies",total:"Varies",fee:"$156",url:"https://fundingpips.com",profitSplitPercent:85,payoutFreq:"Weekly"}
  ]};

  root.innerHTML=`
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
  </table>`;

  const body=$("#challengeBody");
  function renderRows(data){
    body.innerHTML=data.map(r=>{
      const pct=Math.min(100,Math.max(0,r.profitSplitPercent||0));
      return `<tr>
        <td>${r.size}</td>
        <td>${r.program}</td>
        <td>${r.target}</td>
        <td>${r.daily}</td>
        <td>${r.total}</td>
        <td>
          <div class="profit-bar">
            <div class="profit-fill" style="width:${pct}%"></div>
            <div class="profit-text">${pct}%</div>
          </div>
        </td>
        <td>${r.payoutFreq}</td>
        <td>${r.fee}</td>
        <td><a href="${r.url}" target="_blank" rel="noopener" class="buy-btn">BUY</a></td>
      </tr>`;
    }).join("");
  }
  renderRows(DATA.challenges);

  const table=root.querySelector("table");
  let sortDir={};
  table.querySelectorAll("th.sortable").forEach(th=>{
    th.addEventListener("click",()=>{
      const idx=+th.dataset.col;
      const dir=sortDir[idx]==="asc"?"desc":"asc";
      sortDir[idx]=dir;
      const rows=[...DATA.challenges];
      rows.sort((a,b)=>{
        const keys=["size","program","target","daily","total","profitSplitPercent","payoutFreq","fee"];
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
