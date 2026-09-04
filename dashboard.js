/* ---------- MAP (canvas, JS-drawn) ---------- */
(function drawMap(){
  const c = document.getElementById('mapCanvas');
  const ctx = c.getContext('2d');
  const W = c.width, H = c.height;

  // background streets pattern
  ctx.fillStyle = '#EDF1F7';
  ctx.fillRect(0,0,W,H);

  // random light-blue city blocks
  const blocks = [
    [30,20,120,70],[170,15,90,50],[40,110,110,60],
    [270,40,80,90],[380,20,70,60],[470,90,90,70],
    [60,190,90,50],[320,150,100,60],[500,180,90,40],
    [200,140,60,60]
  ];
  ctx.fillStyle = '#DCE6F5';
  blocks.forEach(([x,y,w,h])=>{
    roundRect(ctx,x,y,w,h,10);
    ctx.fill();
  });

  // faint grid "streets"
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 6;
  for(let x=40;x<W;x+=90){
    ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x-20,H); ctx.stroke();
  }
  for(let y=30;y<H;y+=70){
    ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(W,y-10); ctx.stroke();
  }

  // the highlighted route (blue path with a turn), like screenshot
  const route = [
    [340, 25],
    [330, 100],
    [270, 110],
    [265, 205]
  ];
  ctx.strokeStyle = '#3563E9';
  ctx.lineWidth = 5;
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(route[0][0], route[0][1]);
  for(let i=1;i<route.length;i++) ctx.lineTo(route[i][0], route[i][1]);
  ctx.stroke();

  // pin marker at the start of the route
  const [px,py] = route[0];
  ctx.beginPath();
  ctx.arc(px,py,9,0,Math.PI*2);
  ctx.fillStyle = '#3563E9';
  ctx.fill();
  ctx.beginPath();
  ctx.arc(px,py,4,0,Math.PI*2);
  ctx.fillStyle = '#fff';
  ctx.fill();

  // destination dot
  const [dx,dy] = route[route.length-1];
  ctx.beginPath();
  ctx.arc(dx,dy,5,0,Math.PI*2);
  ctx.fillStyle = '#1a3a8f';
  ctx.fill();

  function roundRect(ctx,x,y,w,h,r){
    ctx.beginPath();
    ctx.moveTo(x+r,y);
    ctx.arcTo(x+w,y,x+w,y+h,r);
    ctx.arcTo(x+w,y+h,x,y+h,r);
    ctx.arcTo(x,y+h,x,y,r);
    ctx.arcTo(x,y,x+w,y,r);
    ctx.closePath();
  }
})();

/* ---------- DONUT CHART (canvas, JS-drawn) ---------- */
(function drawDonut(){
  const data = [
    {name:'Sport Car', value:17439, color:'#0D2159'},
    {name:'SUV', value:9478, color:'#3563E9'},
    {name:'Coupe', value:18197, color:'#4C7EF3'},
    {name:'Hatchback', value:12510, color:'#8FB0F5'},
    {name:'MPV', value:14406, color:'#C9DAFB'}
  ];
  const total = data.reduce((s,d)=>s+d.value,0);

  const c = document.getElementById('donutCanvas');
  const ctx = c.getContext('2d');
  const cx = c.width/2, cy = c.height/2, r = 68, rInner = 44;

  let start = -Math.PI/2;
  data.forEach(d=>{
    const angle = (d.value/total)*Math.PI*2;
    ctx.beginPath();
    ctx.arc(cx,cy,r,start,start+angle);
    ctx.arc(cx,cy,rInner,start+angle,start,true);
    ctx.closePath();
    ctx.fillStyle = d.color;
    ctx.fill();
    start += angle;
  });

  ctx.fillStyle = '#1A202C';
  ctx.textAlign = 'center';
  ctx.font = '700 20px Segoe UI';
  ctx.fillText(total.toLocaleString(), cx, cy-2);
  ctx.font = '400 11px Segoe UI';
  ctx.fillStyle = '#90A3BF';
  ctx.fillText('Rental Car', cx, cy+16);

  const legend = document.getElementById('legend');
  legend.innerHTML = data.map(d=>`
    <div class="row">
      <span class="sw" style="background:${d.color}"></span>
      <span class="name">${d.name}</span>
      <span class="val">${d.value.toLocaleString()}</span>
    </div>`).join('');
})();

/* ---------- RECENT TRANSACTIONS ---------- */
(function renderTx(){
  const txs = [
    {name:'Nissan GT – R', type:'Sport Car', date:'20 July', amt:'$80.00'},
    {name:'Koegnigsegg', type:'Sport Car', date:'19 July', amt:'$99.00'},
    {name:'Rolls – Royce', type:'Sport Car', date:'18 July', amt:'$96.00'},
    {name:'CR – V', type:'SUV', date:'17 July', amt:'$80.00'}
  ];
  document.getElementById('txList').innerHTML = txs.map(t=>`
    <div class="tx">
      <div class="tx-thumb"></div>
      <div class="tx-info">
        <h5>${t.name}</h5>
        <span>${t.type}</span>
      </div>
      <div class="tx-right">
        <span class="date">${t.date}</span>
        <span class="amt">${t.amt}</span>
      </div>
    </div>`).join('');
})();