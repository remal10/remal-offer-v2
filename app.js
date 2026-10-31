const U='https://rrypsirjsckdtydqxzhc.supabase.co',
K='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJyeXBzaXJqc2NrZHR5ZHF4emhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI5NjY4ODcsImV4cCI6MjEwODU0Mjg4N30.yoh3JeBj6urZ0cbD3khelfbbdpsvCn7dCj7m45UWn1Y',
S=supabase.createClient(U,K),
$=s=>document.querySelector(s),
LG=['en','fr','ar','hi','zh'],
LN={fr:'FR',en:'EN',ar:'عربي',hi:'हिंदी',zh:'中文'},
CT=['restaurant','bar','pool','spa','services'],
BD={new:'bNew',signature:'bSig',popular:'bPop',limited:'bLim',exclusive:'bExc'},
SLOGAN='Where Al Dhannah Lives',
HERO0='https://remar-hotel-discovery.lovable.app/__l5e/assets-v1/8d8348e6-e9da-410a-9f6f-02023f878e51/hero.jpg';

const L={
en:{hello:'Welcome',sub:'Exclusive experiences and offers for your stay.',cta:'Discover',eb:'Curated for your stay',offers:'Our experiences',hl:'This week’s highlights',back:'All sections',restaurant:'Restaurant',bar:'Bar',pool:'Pool',spa:'Spa',services:'Services',empty:'No offers at the moment.',contact:'For any request, please contact reception.',close:'Close',bNew:'New',bSig:'Signature',bPop:'Guest favourite',bLim:'Limited time',bExc:'Exclusive',last:'Last day',ends:'Ends in {n} days',wa:'Reserve on WhatsApp',call:'Call reception',ask:'Ask our reception team to reserve.',pre:'Hello, I would like to know more about: ',instT:'Install our app',instD:'Add Remal to your home screen for quick access.',instB:'Install',instI:'Tap Share, then “Add to Home Screen”.'},
fr:{hello:'Bienvenue',sub:'Les expériences et offres exclusives de votre séjour.',cta:'Découvrir',eb:'Sélectionné pour votre séjour',offers:'Nos expériences',hl:'À ne pas manquer',back:'Toutes les sections',restaurant:'Restaurant',bar:'Bar',pool:'Piscine',spa:'Spa',services:'Services',empty:'Aucune offre pour le moment.',contact:'Pour toute demande, contactez la réception.',close:'Fermer',bNew:'Nouveau',bSig:'Signature',bPop:'Coup de cœur',bLim:'Durée limitée',bExc:'Exclusif',last:'Dernier jour',ends:'Se termine dans {n} jours',wa:'Réserver sur WhatsApp',call:'Appeler la réception',ask:'Demandez à la réception de réserver.',pre:'Bonjour, je souhaite en savoir plus sur : ',instT:'Installez notre application',instD:'Ajoutez Remal à votre écran d’accueil.',instB:'Installer',instI:'Touchez Partager, puis « Sur l’écran d’accueil ».'},
ar:{hello:'مرحبًا',sub:'تجارب وعروض حصرية لإقامتك.',cta:'اكتشف',eb:'مختارة لإقامتك',offers:'تجاربنا',hl:'لا تفوّت',back:'كل الأقسام',restaurant:'مطعم',bar:'بار',pool:'مسبح',spa:'سبا',services:'خدمات',empty:'لا توجد عروض حاليًا.',contact:'لأي طلب، يرجى التواصل مع الاستقبال.',close:'إغلاق',bNew:'جديد',bSig:'توقيعنا',bPop:'المفضّل لدى الضيوف',bLim:'لفترة محدودة',bExc:'حصري',last:'اليوم الأخير',ends:'ينتهي خلال {n} أيام',wa:'احجز عبر واتساب',call:'اتصل بالاستقبال',ask:'اطلب من الاستقبال الحجز.',pre:'مرحبًا، أودّ معرفة المزيد عن: ',instT:'ثبّت تطبيقنا',instD:'أضف رمال إلى شاشتك الرئيسية للوصول السريع.',instB:'تثبيت',instI:'اضغط مشاركة ثم «إضافة إلى الشاشة الرئيسية».'},
hi:{hello:'स्वागत है',sub:'आपके प्रवास के लिए खास अनुभव और ऑफ़र।',cta:'देखें',eb:'आपके प्रवास के लिए चुनिंदा',offers:'हमारे अनुभव',hl:'ज़रूर देखें',back:'सभी अनुभाग',restaurant:'रेस्टोरेंट',bar:'बार',pool:'पूल',spa:'स्पा',services:'सेवाएँ',empty:'फ़िलहाल कोई ऑफ़र नहीं है।',contact:'किसी भी अनुरोध के लिए कृपया रिसेप्शन से संपर्क करें।',close:'बंद करें',bNew:'नया',bSig:'सिग्नेचर',bPop:'मेहमानों की पसंद',bLim:'सीमित समय',bExc:'विशेष',last:'आख़िरी दिन',ends:'{n} दिन में समाप्त',wa:'WhatsApp पर बुक करें',call:'रिसेप्शन को कॉल करें',ask:'बुकिंग के लिए रिसेप्शन से कहें।',pre:'नमस्ते, मैं इसके बारे में और जानना चाहता हूँ: ',instT:'हमारा ऐप इंस्टॉल करें',instD:'तेज़ पहुँच के लिए Remal को होम स्क्रीन पर जोड़ें।',instB:'इंस्टॉल',instI:'शेयर दबाएँ, फिर “होम स्क्रीन में जोड़ें”।'},
zh:{hello:'欢迎',sub:'为您的住宿精心准备的专属体验与优惠。',cta:'探索',eb:'为您的住宿精选',offers:'我们的体验',hl:'本周精选',back:'全部分区',restaurant:'餐厅',bar:'酒吧',pool:'泳池',spa:'水疗',services:'服务',empty:'暂无优惠。',contact:'如有任何需求，请联系前台。',close:'关闭',bNew:'新品',bSig:'招牌',bPop:'宾客最爱',bLim:'限时',bExc:'专属',last:'最后一天',ends:'还剩 {n} 天',wa:'通过 WhatsApp 预订',call:'致电前台',ask:'请联系前台为您预订。',pre:'您好，我想了解更多：',instT:'安装我们的应用',instD:'将 Remal 添加到主屏幕，快速访问。',instB:'安装',instI:'点按“分享”，然后选择“添加到主屏幕”。'}
};

let lang=localStorage.getItem('lang')||'en',cat='all',offers=[],secs={},cfg={},hrows=[],editId=null,editOld=null,staffList=[],dp=null,cur=0,kv=0,tm,first=true;
if(!L[lang])lang='en';

/* ---------- helpers ---------- */
const esc=s=>String(s==null?'':s).split('&').join('&amp;').split('<').join('&lt;').split('>').join('&gt;').split(String.fromCharCode(39)).join('&#39;');
const tr=o=>{const t=o.translations||{};return (t[lang]&&t[lang].title)?t[lang]:(t.en||t.fr||Object.values(t)[0]||{})};
const tr2=o=>{const t=o.translations||{};return (t.en&&t.en.title)||(t.fr&&t.fr.title)||(Object.values(t)[0]||{}).title||'(untitled)'};
const mu=p=>S.storage.from('offers').getPublicUrl(p).data.publicUrl;
const md=o=>{if(!o||!o.media_path)return '';const u=mu(o.media_path);return o.media_type==='video'?`<video src='${esc(u)}' autoplay muted loop playsinline></video>`:`<img class='kb' src='${esc(u)}' alt=''>`};
const slow=()=>document.querySelectorAll('video').forEach(v=>{v.playbackRate=.75});
const dir=()=>{document.documentElement.lang=lang;document.documentElement.dir=lang==='ar'?'rtl':'ltr'};
const split=(el,v)=>{el.innerHTML=v.split(' ').map((w,i)=>`<span class='w' style='--i:${i}'><i class='gold'>${esc(w)}</i></span>`).join(' ')};

/* images are resized before upload so the site stays fast */
const prep=f=>f.type.startsWith('image/')&&f.type!=='image/gif'?new Promise(r=>{
  const i=new Image();
  i.onload=()=>{const k=Math.min(1,2200/Math.max(i.width,i.height)),c=document.createElement('canvas');c.width=i.width*k;c.height=i.height*k;c.getContext('2d').drawImage(i,0,0,c.width,c.height);c.toBlob(b=>r(b||f),'image/jpeg',.85);URL.revokeObjectURL(i.src)};
  i.onerror=()=>r(f);
  i.src=URL.createObjectURL(f)
}):Promise.resolve(f);
async function up(p,f){const b=await prep(f),r=await S.storage.from('offers').upload(p,b,{contentType:b.type||f.type});if(r.error)throw r.error}

/* ---------- promotional helpers ---------- */
const today=()=>{const d=new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')};
const left=o=>o.valid_until?Math.round((new Date(o.valid_until+'T00:00:00')-new Date(today()+'T00:00:00'))/864e5):null;
const alive=o=>{const n=left(o);return n===null||n>=0};
const urg=(o,t)=>{const n=left(o);return n===null||n>7?'':`<span class='ug'><b></b>${esc(n<=0?t.last:t.ends.replace('{n}',n))}</span>`};
const pr=o=>o.price?`<div class='pr'><span class='price'>${esc(o.price)}</span>${o.old_price?`<s>${esc(o.old_price)}</s>`:''}</div>`:'';
const offerLabel=()=>({"en":"View offer","fr":"Voir l’offre","ar":"عرض التفاصيل","hi":"ऑफ़र देखें","zh":"查看优惠"})[lang];
const cardHTML=(o,t,i)=>{
  const x=tr(o),b=BD[o.badge];
  return `<div class='rv${o.featured?' sp':''}' style='transition-delay:${i%3*120}ms'><div class='card${o.media_path?'':' no-media'}' data-id='${esc(o.id)}' role='button' tabindex='0' aria-haspopup='dialog' aria-label='${esc(offerLabel()+": "+(x.title||""))}'><div class='m'>${md(o)}</div>${b?`<span class='bd'>${esc(t[b])}</span>`:''}<div class='ct'><small>${esc(t[o.category])}</small><h3>${esc(x.title)}</h3>${x.tagline?`<p class='tg'>${esc(x.tagline)}</p>`:''}<div class='ul'></div>${pr(o)}${urg(o,t)}<span class='mo'>${esc(offerLabel())} <i aria-hidden='true'>↗</i></span></div></div></div>`
};
const sectionContact=(category,key)=>cfg[category+'_'+key]||cfg[key]||'';
const cta=(x,t,category)=>{
  const w=sectionContact(category,'whatsapp').replace(/[^0-9]/g,''),p=sectionContact(category,'phone').replace(/[^0-9+]/g,'');
  const direct=!!cfg[category+'_phone'];
  const callLabel=direct?({en:'Call the team',fr:'Appeler le responsable',ar:'اتصل بالفريق',hi:'टीम को कॉल करें',zh:'致电服务团队'})[lang]:t.call;
  if(!w&&!p)return `<div class='ask'>${esc(t.ask)}</div>`;
  return `<div class='cta'>${w?`<a class='btn solid' target='_blank' rel='noopener' href='https://wa.me/${w}?text=${encodeURIComponent(t.pre+(x.title||''))}'>${esc(t.wa)}</a>`:''}${p?`<a class='btn' href='tel:${p}'>${esc(callLabel)}</a>`:''}</div>`
};

/* ---------- hero rotation ---------- */
const io='IntersectionObserver' in window?new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.1}):null;
const standalone=matchMedia('(display-mode: standalone)').matches||navigator.standalone,
ios=/iphone|ipad|ipod/i.test(navigator.userAgent),
lay=[$('#b0'),$('#b1')],
pg=k=>document.querySelectorAll('#pg [data-slide]').forEach((s,j)=>{s.classList.toggle('a',j===k);s.setAttribute('aria-pressed',String(j===k))});
let heroRequest=0;
function heroShow(u,k){
  const request=++heroRequest,i=new Image();
  i.onload=()=>{if(request!==heroRequest)return;const n=1-cur,e=lay[n];e.className='bg';void e.offsetWidth;e.style.backgroundImage='url('+JSON.stringify(u)+')';e.className='bg on k'+(kv++%4);lay[cur].classList.remove('on');cur=n;pg(k)};
  i.src=u
}
function heroStart(h){
  const l=h.length?h.map(x=>mu(x.media_path)):[HERO0],reduced=matchMedia('(prefers-reduced-motion: reduce)');
  let k=parseInt(localStorage.getItem('hi')),paused=reduced.matches;
  k=isNaN(k)?0:(k+1)%l.length;
  const labels={en:['Show photo','Pause slideshow','Play slideshow'],fr:['Afficher la photo','Mettre le diaporama en pause','Lire le diaporama'],ar:['عرض الصورة','إيقاف عرض الصور مؤقتًا','تشغيل عرض الصور'],hi:['फ़ोटो दिखाएँ','स्लाइडशो रोकें','स्लाइडशो चलाएँ'],zh:['显示照片','暂停幻灯片','播放幻灯片']};
  function controls(){
    const t=labels[lang]||labels.en;
    $('#pg').innerHTML=l.length>1?l.map((_,j)=>`<button type="button" data-slide="${j}" aria-label="${t[0]} ${j+1}" aria-pressed="${j===k}"><span></span></button>`).join('')+`<button type="button" class="hero-pause" aria-label="${paused?t[2]:t[1]}">${paused?'▶':'Ⅱ'}</button>`:'';
    pg(k)
  }
  function schedule(){clearInterval(tm);if(l.length>1&&!paused&&!document.hidden)tm=setInterval(()=>{k=(k+1)%l.length;heroShow(l[k],k)},15000)}
  controls();localStorage.setItem('hi',k);heroShow(l[k],k);schedule();
  $('#pg').onclick=e=>{
    const b=e.target.closest('button');if(!b)return;
    if(b.hasAttribute('data-slide')){k=Number(b.dataset.slide);heroShow(l[k],k)}
    else if(b.classList.contains('hero-pause')){paused=!paused;controls()}
    schedule()
  };
  document.addEventListener('visibilitychange',schedule);
  reduced.addEventListener('change',e=>{paused=e.matches;controls();schedule()});
  document.addEventListener('click',e=>{if(e.target.closest('[data-l]'))controls()})
}

const defaultInstagram='https://www.instagram.com/remal.hotel/';
const instagramURL=value=>{
  try{const u=new URL(value);return u.protocol==='https:'&&['instagram.com','www.instagram.com'].includes(u.hostname)&&!u.username&&!u.password?u.href:''}catch{return ''}
};
function paintInstagram(){
  const link=$('#hotel-instagram'),url=instagramURL(cfg.instagram===undefined?defaultInstagram:cfg.instagram);
  link.hidden=!url;if(url)link.href=url;
  $('#instagram-label').textContent=({en:'Follow our moments',fr:'Suivez nos moments',ar:'تابع لحظاتنا',hi:'हमारे पलों से जुड़ें',zh:'关注我们的精彩时刻'})[lang];
}
/* ---------- guest site ---------- */
function paint(){
  const t=L[lang],all=cat==='all';
  paintInstagram();
  document.querySelectorAll('[data-i]').forEach(e=>{if(e.hasAttribute('data-split'))split(e,SLOGAN);else e.textContent=t[e.dataset.i]});
  $('#ibd').textContent=dp?t.instD:t.instI;
  $('#lg').innerHTML=LG.map(l=>`<button class='${l===lang?'on':''}' data-l='${l}'>${LN[l]}</button>`).join('');
  const live=offers.filter(alive),feat=live.filter(o=>o.featured).slice(0,6);
  $('#hl').innerHTML=all&&feat.length?`<div class='hd sm'><div class='orn'>✦</div><h2 class='gold'>${esc(t.hl)}</h2></div><div class='hs'>${feat.map((o,i)=>cardHTML(o,t,i)).join('')}</div>`:'';
  $('#pl').innerHTML=all?'':`<button class='btn' data-c='all'>${lang==='ar'?'→':'←'} ${esc(t.back)}</button>`;
  $('#ti').innerHTML=all
    ?`<div class='tiles'>${CT.map((c,i)=>`<div class='tile' data-c='${c}' style='animation-delay:${i*100}ms'><div class='m'>${md(secs[c])}</div><div class='ct'><small>0${i+1}</small><h3>${esc(t[c])}</h3><div class='ul'></div></div></div>`).join('')}</div>`
    :`<div class='bn'><div class='m'>${md(secs[cat])}</div><div class='ct'><small>${esc(t.eb)}</small><h3 class='gold'>${esc(t[cat])}</h3><div class='ul'></div></div></div>`;
  const v=all?[]:live.filter(o=>o.category===cat);
  $('#gr').innerHTML=all?'':v.length?v.map((o,i)=>cardHTML(o,t,i)).join(''):`<p class='empty'>${esc(t.empty)}</p>`;
  document.querySelectorAll('.rv:not(.in)').forEach(n=>io?io.observe(n):n.classList.add('in'));
  slow()
}
async function load(){
  const [a,b,h,c]=await Promise.all([
    S.from('offers').select('*').eq('published',true).order('featured',{ascending:false}).order('sort_order').order('created_at',{ascending:false}),
    S.from('sections').select('*'),
    S.from('hero_images').select('*').eq('active',true).order('sort_order').order('created_at'),
    S.from('site_settings').select('*')
  ]);
  offers=a.data||[];
  secs={};(b.data||[]).forEach(r=>{secs[r.category]=r});
  cfg={};(c.data||[]).forEach(r=>{cfg[r.key]=r.value});
  if(first){first=false;heroStart(h.data||[])}
  paint()
}
const closeM=()=>{$('#md').classList.remove('on');document.body.style.overflow=''};
document.addEventListener('keydown',e=>{
  const card=e.target.closest('.card');
  if(card&&(e.key==='Enter'||e.key===' ')){e.preventDefault();card.click()}
});
document.addEventListener('click',e=>{
  const l=e.target.closest('[data-l]'),c=e.target.closest('[data-c]'),k=e.target.closest('.card');
  if(l){lang=l.dataset.l;localStorage.setItem('lang',lang);document.body.classList.add('sk');dir();paint()}
  else if(c){location.hash=c.dataset.c==='all'?'offres':'s-'+c.dataset.c}
  else if(k){
    const o=offers.find(x=>x.id===k.dataset.id),x=tr(o),t=L[lang],b=BD[o.badge];
    $('#bx').innerHTML=`<button class='x' id='xc2'>✕</button><div class='m'>${md(o)}</div><div class='t'>${b?`<span class='bd'>${esc(t[b])}</span>`:''}<span class='eb'>${esc(t[o.category])}</span><h3 class='gold'>${esc(x.title)}</h3>${x.tagline?`<div class='tg2'>${esc(x.tagline)}</div>`:''}<div class='ul'></div>${pr(o)}${urg(o,t)}<p>${esc(x.description)}</p>${cta(x,t,o.category)}<div><button class='btn' id='xc'>${esc(t.close)}</button></div></div>`;
    $('#md').classList.add('on');document.body.style.overflow='hidden';slow()
  }
  else if(['md','xc','xc2'].includes(e.target.id))closeM()
});

/* ---------- install banner ---------- */
const ibShow=()=>{if(standalone||sessionStorage.getItem('ib')||location.hash==='#staff')return;$('#ibi').style.display=dp?'':'none';paint();$('#ib').classList.add('on')};
addEventListener('beforeinstallprompt',e=>{e.preventDefault();dp=e;setTimeout(ibShow,9000)});
addEventListener('appinstalled',()=>$('#ib').classList.remove('on'));
if(ios&&!standalone)setTimeout(ibShow,10000);
$('#ibx').onclick=()=>{sessionStorage.setItem('ib','1');$('#ib').classList.remove('on')};
$('#ibi').onclick=async()=>{if(!dp)return;dp.prompt();await dp.userChoice;dp=null;$('#ib').classList.remove('on')};
if('serviceWorker' in navigator)navigator.serviceWorker.register('/sw.js').catch(()=>{});

/* ---------- opening sequence and scroll effects ---------- */
if(sessionStorage.getItem('intro')||location.hash==='#staff'){document.body.classList.add('sk');$('#in').remove()}
else{
  sessionStorage.setItem('intro','1');
  setTimeout(()=>{const i=$('#in');if(i)i.remove()},6000);
  setTimeout(()=>document.body.classList.add('sk'),10500);
  $('#sk').onclick=()=>{const i=$('#in');document.body.classList.add('sk');i.style.transition='opacity .6s';i.style.opacity=0;setTimeout(()=>i.remove(),650)}
}
let tk=false;
addEventListener('scroll',()=>{
  if(tk)return;tk=true;
  requestAnimationFrame(()=>{
    const y=scrollY,h=innerHeight;
    $('#hd').classList.toggle('sc',y>40);
    if(y<h*1.2){$('#pz').style.transform=`translate3d(0,${y*.3}px,0)`;$('#hc').style.opacity=Math.max(0,1-y/(h*.55));$('#hc').style.transform=`translate3d(0,${y*.12}px,0)`}
    tk=false
  })
},{passive:true});

/* ---------- staff dashboard ---------- */
$('#tl').innerHTML=LG.map(l=>`<div class='lb'>${LN[l]}</div><input dir='auto' id='ti_${l}' placeholder='Title (${LN[l]})'><input dir='auto' id='tg_${l}' placeholder='Short teaser line, optional (${LN[l]})'><textarea dir='auto' id='td_${l}' rows='3' placeholder='Description (${LN[l]})'></textarea>`).join('');
const show=p=>{$('#lgn').style.display=p?'none':'grid';$('#pn').style.display=p?'block':'none'};
async function gate(){
  const {data:{session}}=await S.auth.getSession();
  if(!session){show(false);return}
  const {data}=await S.from('staff_emails').select('email').maybeSingle();
  if(data){show(true);staffLoad();secLoad();heroLoad();cfgLoad()}
  else{show(false);$('#ms').textContent='This account does not have access to the staff dashboard.'}
}
async function route(){
  const h=location.hash,s=h==='#staff';
  document.body.classList.toggle('st',s);
  if(s)gate();
  else{const c=h.startsWith('#s-')&&CT.includes(h.slice(3))?h.slice(3):'all';if(c!==cat){cat=c;paint();$('#offres').scrollIntoView()}}
}
$('#tb').onclick=e=>{
  const t=e.target.dataset.t;if(!t)return;
  document.querySelectorAll('#tb button').forEach(b=>b.classList.toggle('on',b.dataset.t===t));
  ['hero','sec','off','set'].forEach(x=>$('#p-'+x).classList.toggle('on',x===t))
};

/* home images */
async function heroLoad(){
  const {data}=await S.from('hero_images').select('*').order('sort_order').order('created_at');
  hrows=data||[];
  $('#hc2').textContent=hrows.length+' / 10 images';
  $('#hg').innerHTML=hrows.map(h=>`<div class='hi${h.active?'':' off'}'><img src='${esc(mu(h.media_path))}' alt=''><div class='row'><button class='sm' data-ht='${h.id}'>${h.active?'Hide':'Show'}</button><button class='sm' data-hd='${h.id}'>Delete</button></div></div>`).join('')||`<p class='note'>No images yet: the default photo is used.</p>`
}
$('#hf').onchange=async e=>{
  const fs=[...e.target.files],m=$('#hmsg'),room=10-hrows.length;
  e.target.value='';
  if(!room){m.textContent='Maximum 10 images: delete one first.';return}
  const take=fs.slice(0,room);
  try{
    for(let i=0;i<take.length;i++){
      m.textContent='Uploading '+(i+1)+'/'+take.length+'…';
      const p='hero/'+Date.now()+'-'+i+'-'+take[i].name.replace(/[^a-z0-9.]+/gi,'_');
      await up(p,take[i]);
      const r=await S.from('hero_images').insert({media_path:p,sort_order:hrows.length+i});
      if(r.error)throw r.error
    }
    m.textContent=fs.length>room?'Added '+take.length+'; the limit of 10 was reached.':'Images added ✓'
  }catch(x){m.textContent=x.message}
  heroLoad()
};
$('#hg').onclick=async e=>{
  const t=e.target.dataset.ht,d=e.target.dataset.hd;
  if(t){const h=hrows.find(x=>x.id===t);await S.from('hero_images').update({active:!h.active}).eq('id',t);heroLoad()}
  if(d&&confirm('Delete this image?')){const h=hrows.find(x=>x.id===d);await S.from('hero_images').delete().eq('id',d);await S.storage.from('offers').remove([h.media_path]);heroLoad()}
};

/* section images */
async function secLoad(){
  const {data}=await S.from('sections').select('*');
  secs={};(data||[]).forEach(r=>{secs[r.category]=r});
  $('#sc').innerHTML=CT.map(c=>{const s=secs[c];return `<div class='li'><span class='row'><span class='th'><span class='m'>${md(s)}</span></span><b style='text-transform:capitalize'>${c}</b></span><span class='row'><input type='file' accept='image/*,video/*' data-sf='${c}' style='max-width:210px'>${s&&s.media_path?`<button class='sm' data-sr='${c}'>Remove</button>`:''}</span></div>`}).join('')
}
$('#sc').onchange=async e=>{
  const c=e.target.dataset.sf,f=e.target.files[0],m=$('#smsg');
  if(!c||!f)return;
  try{
    m.textContent='Uploading…';
    const p='sections/'+c+'-'+Date.now()+'-'+f.name.replace(/[^a-z0-9.]+/gi,'_');
    await up(p,f);
    const old=secs[c]&&secs[c].media_path;
    const r=await S.from('sections').upsert({category:c,media_path:p,media_type:f.type.startsWith('video')?'video':'image',updated_at:new Date().toISOString()});
    if(r.error)throw r.error;
    if(old)await S.storage.from('offers').remove([old]);
    m.textContent='Section image updated ✓';secLoad()
  }catch(x){m.textContent=x.message}
};
$('#sc').onclick=async e=>{
  const c=e.target.dataset.sr;
  if(c&&confirm('Remove this image?')){const old=secs[c].media_path;await S.from('sections').update({media_path:null,media_type:null}).eq('category',c);if(old)await S.storage.from('offers').remove([old]);secLoad()}
};

/* offers */
async function staffLoad(){
  const {data}=await S.from('offers').select('*').order('featured',{ascending:false}).order('sort_order').order('created_at',{ascending:false});
  staffList=data||[];
  $('#ls').innerHTML=staffList.map(o=>`<div class='li'><span>${o.published?'':'🚫 '}${o.featured?'★ ':''}<b>${esc(tr2(o))}</b> · ${esc(o.category)} ${esc(o.price||'')}${o.badge?' · '+esc(o.badge):''}${o.valid_until?' · until '+esc(o.valid_until):''}</span><span><button class='sm' data-e='${o.id}'>Edit</button> <button class='sm' data-d='${o.id}'>Delete</button></span></div>`).join('')||`<p class='note'>No offers yet.</p>`
}
$('#ls').onclick=async e=>{
  const b=e.target.closest('button');if(!b)return;
  if(b.dataset.e){
    const o=staffList.find(x=>x.id===b.dataset.e);
    editId=o.id;editOld=o;
    $('#ct').value=o.category;$('#pr').value=o.price||'';$('#so').value=o.sort_order;$('#pb').checked=o.published;
    $('#ft').checked=!!o.featured;$('#bg').value=o.badge||'';$('#op').value=o.old_price||'';$('#vu').value=o.valid_until||'';
    LG.forEach(l=>{const x=(o.translations||{})[l]||{};$('#ti_'+l).value=x.title||'';$('#tg_'+l).value=x.tagline||'';$('#td_'+l).value=x.description||''});
    $('#fmsg').textContent='Editing (leave the file empty to keep the current media).';
    $('#fm').scrollIntoView()
  }
  if(b.dataset.d&&confirm('Delete this offer?')){
    const o=staffList.find(x=>x.id===b.dataset.d);
    await S.from('offers').delete().eq('id',o.id);
    if(o.media_path)await S.storage.from('offers').remove([o.media_path]);
    staffLoad()
  }
};
$('#cn').onclick=()=>{editId=editOld=null;$('#fm').reset();$('#fmsg').textContent=''};
$('#fm').onsubmit=async e=>{
  e.preventDefault();
  const m=$('#fmsg');m.textContent='Saving…';
  try{
    const tt={};
    LG.forEach(l=>{const t=$('#ti_'+l).value.trim(),g=$('#tg_'+l).value.trim(),d=$('#td_'+l).value.trim();if(t||g||d)tt[l]={title:t,tagline:g,description:d}});
    if(!Object.keys(tt).length){m.textContent='Add at least one title.';return}
    const r={category:$('#ct').value,price:$('#pr').value.trim()||null,sort_order:+$('#so').value||0,published:$('#pb').checked,featured:$('#ft').checked,badge:$('#bg').value||null,old_price:$('#op').value.trim()||null,valid_until:$('#vu').value||null,translations:tt};
    const f=$('#fl').files[0];
    if(f){
      const p=Date.now()+'-'+f.name.replace(/[^a-z0-9.]+/gi,'_');
      await up(p,f);
      r.media_path=p;r.media_type=f.type.startsWith('video')?'video':'image';
      if(editOld&&editOld.media_path)await S.storage.from('offers').remove([editOld.media_path])
    }
    const q=editId?S.from('offers').update(r).eq('id',editId):S.from('offers').insert(r);
    const {error}=await q;if(error)throw error;
    editId=editOld=null;$('#fm').reset();m.textContent='Saved ✓';staffLoad()
  }catch(x){m.textContent=x.message}
};

/* reservation contacts */
async function cfgLoad(){
  const {data}=await S.from('site_settings').select('*'),m={};
  (data||[]).forEach(r=>{m[r.key]=r.value});
  cfg=m;
  $('#instagram-url').value=m.instagram===undefined?defaultInstagram:m.instagram;
  $('#wa').value=m.whatsapp||'';$('#ph').value=m.phone||'';
  CT.forEach(c=>['whatsapp','phone'].forEach(k=>{$('#contact_'+c+'_'+k).value=m[c+'_'+k]||''}))
}
$('#ss').onclick=async()=>{
  const button=$('#ss'),message=$('#sm'),n=new Date().toISOString();
  const rows=[{key:'whatsapp',value:$('#wa').value.trim(),updated_at:n},{key:'phone',value:$('#ph').value.trim(),updated_at:n}];
  CT.forEach(c=>['whatsapp','phone'].forEach(k=>rows.push({key:c+'_'+k,value:$('#contact_'+c+'_'+k).value.trim(),updated_at:n})));
  for(const r of rows){
    const v=r.value.replace(/[\s().-]/g,'');
    if(v&&!/^\+?[1-9]\d{6,14}$/.test(v)){message.textContent='Use an international number with country code (e.g. +971501234567): '+r.key;return}
    r.value=v;
  }
  const instagram=$('#instagram-url').value.trim();
  if(instagram&&!instagramURL(instagram)){message.textContent='Enter a valid https://www.instagram.com/ link.';return}
  rows.push({key:'instagram',value:instagram?instagramURL(instagram):'',updated_at:n});
  button.disabled=true;message.textContent='Saving…';
  try{
    const {error}=await S.from('site_settings').upsert(rows,{onConflict:'key'});if(error)throw error;
    rows.forEach(r=>{cfg[r.key]=r.value});
    paintInstagram();
    message.textContent='Settings saved ✓';
  }catch(e){message.textContent=e.message||'Could not save. Please try again.'}
  finally{button.disabled=false}
};

/* sign in */
$('#bin').onclick=async()=>{const {error}=await S.auth.signInWithPassword({email:$('#em').value.trim(),password:$('#pw').value});$('#ms').textContent=error?error.message:'';if(!error)gate()};
$('#bup').onclick=async()=>{const {data,error}=await S.auth.signUp({email:$('#em').value.trim(),password:$('#pw').value});$('#ms').textContent=error?error.message:(data.session?'':'Account created: check your email to confirm, then sign in.');if(data&&data.session)gate()};
$('#bout').onclick=async()=>{await S.auth.signOut();show(false)};

dir();load();route();addEventListener('hashchange',route);
