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
const today=()=>{const p=new Intl.DateTimeFormat('en-GB',{timeZone:'Asia/Dubai',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date()),get=t=>p.find(x=>x.type===t).value;return get('year')+'-'+get('month')+'-'+get('day')};
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
  return `${w?bookingFields():''}<div class='cta'>${w?`<a class='btn solid' target='_blank' rel='noopener' data-booking-base='https://wa.me/${w}?text=${encodeURIComponent(t.pre+(x.title||''))}' href='https://wa.me/${w}?text=${encodeURIComponent(t.pre+(x.title||''))}'>${esc(t.wa)}</a>`:''}${p?`<a class='btn' href='tel:${p}'>${esc(callLabel)}</a>`:''}</div>`
};

/* ---------- hero rotation ---------- */
const io='IntersectionObserver' in window?new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.1}):null;
const standalone=matchMedia('(display-mode: standalone)').matches||navigator.standalone,
ios=/iphone|ipad|ipod/i.test(navigator.userAgent),
lay=[$('#b0'),$('#b1')],
pg=k=>document.querySelectorAll('#pg [data-slide]').forEach((s,j)=>{s.classList.toggle('a',j===k);s.setAttribute('aria-pressed',String(j===k))});
let heroRequest=0,heroListeners=null;
function heroShow(u,k){
  const request=++heroRequest,i=new Image();
  i.onload=()=>{if(request!==heroRequest)return;const n=1-cur,e=lay[n];e.className='bg';void e.offsetWidth;e.style.backgroundImage='url('+JSON.stringify(u)+')';const row=hrows.find(r=>mu(r.media_path)===u);e.style.setProperty('--mobile-crop',row?(cfg['hero_crop_'+row.id]||'center'):'center');e.className='bg on k'+(kv++%4);lay[cur].classList.remove('on');cur=n;pg(k)};
  i.src=u
}
function heroStart(h){
  if(heroListeners)heroListeners.abort();heroListeners=new AbortController();const heroSignal=heroListeners.signal;
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
  document.addEventListener('visibilitychange',schedule,{signal:heroSignal});
  reduced.addEventListener('change',e=>{paused=e.matches;controls();schedule()},{signal:heroSignal});
  document.addEventListener('click',e=>{if(e.target.closest('[data-l]'))controls()},{signal:heroSignal})
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
  paintInstagram();paintAnnouncements();paintDiscovery();
  document.querySelectorAll('[data-i]').forEach(e=>{if(e.hasAttribute('data-split'))split(e,SLOGAN);else e.textContent=t[e.dataset.i]});
  $('#ibd').textContent=dp?t.instD:t.instI;
  $('#lg').innerHTML=LG.map(l=>`<button class='${l===lang?'on':''}' data-l='${l}'>${LN[l]}</button>`).join('');
  const live=offers.filter(alive),feat=live.filter(o=>o.featured).slice(0,6);
  $('#hl').innerHTML=all&&feat.length?`<div class='hd sm'><div class='orn'>✦</div><h2 class='gold'>${esc(t.hl)}</h2></div><div class='hs'>${feat.map((o,i)=>cardHTML(o,t,i)).join('')}</div>`:'';
  $('#pl').innerHTML=all?'':`<button class='btn' data-c='all'>${lang==='ar'?'→':'←'} ${esc(t.back)}</button>`;
  $('#ti').innerHTML=all
    ?`<div class='tiles'>${CT.map((c,i)=>`<div class='tile' data-c='${c}' style='animation-delay:${i*100}ms'><div class='m'>${md(secs[c])}</div><div class='ct'><small>0${i+1}</small><h3>${esc(t[c])}</h3><div class='ul'></div></div></div>`).join('')}</div>`
    :`<div class='bn'><div class='m'>${md(secs[cat])}</div><div class='ct'><small>${esc(t.eb)}</small><h3 class='gold'>${esc(t[cat])}</h3><div class='ul'></div></div></div>`;
  const searching=!!offerQuery.trim(),v=filteredOffers(all?(searching?live:[]):live.filter(o=>o.category===cat));
  $('#ti').hidden=searching;
  $('#gr').innerHTML=all&&!searching?'':v.length?v.map((o,i)=>cardHTML(o,t,i)).join(''):`<p class='empty'>${esc(searching?EXPERIENCE_UI[lang].noresults:t.empty)}</p>`;
  document.querySelectorAll('.rv:not(.in)').forEach(n=>io?io.observe(n):n.classList.add('in'));
  slow()
}
let loadingGuest=false;
async function load(){
  if(loadingGuest)return;loadingGuest=true;
  try{
    const queries=[
      S.from('offers').select('*').eq('published',true).order('featured',{ascending:false}).order('sort_order').order('created_at',{ascending:false}),
      S.from('sections').select('*'),
      S.from('hero_images').select('*').eq('active',true).order('sort_order').order('created_at'),
      S.from('site_settings').select('*')
    ];
    const results=await Promise.allSettled(queries),read=i=>results[i].status==='fulfilled'&&!results[i].value.error?results[i].value.data:null;
    const a=read(0),b=read(1),h=read(2),c=read(3);
    if(a!==null)offers=a||[];
    if(b!==null){secs={};(b||[]).forEach(r=>secs[r.category]=r)}
    if(c!==null){cfg={};(c||[]).forEach(r=>cfg[r.key]=r.value)}
    if(h!==null)hrows=h||[];
    if(first){first=false;heroStart(h||[])}
    paint();
    const failed=results.some(r=>r.status==='rejected'||r.value.error);
    $('#guest-load-status').hidden=!failed;
    $('#guest-load-message').textContent=({en:'Some content could not be refreshed. Please try again.',fr:'Certains contenus n’ont pas pu être actualisés. Réessayez.',ar:'تعذر تحديث بعض المحتوى. يرجى المحاولة مرة أخرى.',hi:'कुछ सामग्री अपडेट नहीं हो सकी। कृपया दोबारा कोशिश करें।',zh:'部分内容未能刷新，请重试。'})[lang];
  }finally{loadingGuest=false}
}
$('#guest-retry').onclick=()=>load();
setInterval(()=>{if(!document.hidden&&!document.body.classList.contains('st')&&!$('#md').classList.contains('on'))load()},60000);
addEventListener('online',()=>{if(!document.body.classList.contains('st'))load()});
document.addEventListener('visibilitychange',()=>{if(!document.hidden&&!document.body.classList.contains('st'))load()});

const closeM=()=>{$('#md').classList.remove('on');document.body.style.overflow='';if(previewMedia){URL.revokeObjectURL(previewMedia);previewMedia=null}if(previewFocus){previewFocus.focus();previewFocus=null}};
document.addEventListener('keydown',e=>{
  if(e.key==='Escape'&&$('#md').classList.contains('on')){closeM();return}
  const card=e.target.closest('.card');
  if(card&&(e.key==='Enter'||e.key===' ')){e.preventDefault();card.click()}
});
document.addEventListener('click',e=>{
  const l=e.target.closest('[data-l]'),c=e.target.closest('[data-c]'),k=e.target.closest('.card');
  if(l){lang=l.dataset.l;localStorage.setItem('lang',lang);document.body.classList.add('sk');dir();paint()}
  else if(c){location.hash=c.dataset.c==='all'?'offres':'s-'+c.dataset.c}
  else if(k){
    $('#bx').dir=lang==='ar'?'rtl':'ltr';$('#bx').lang=lang;
    const o=offers.find(x=>x.id===k.dataset.id);if(!o)return;const x=tr(o),t=L[lang],b=BD[o.badge];
    $('#bx').innerHTML=`<button class='x' id='xc2'>✕</button><div class='m'>${md(o)}</div><div class='t'>${b?`<span class='bd'>${esc(t[b])}</span>`:''}<span class='eb'>${esc(t[o.category])}</span><h3 class='gold'>${esc(x.title)}</h3>${x.tagline?`<div class='tg2'>${esc(x.tagline)}</div>`:''}<div class='ul'></div>${pr(o)}${urg(o,t)}<p>${esc(x.description||'')}</p>${offerFacts(x)}${cta(x,t,o.category)}<div><button class='btn' id='xc'>${esc(t.close)}</button></div></div>`;
    previewFocus=k;$('#md').classList.add('on');document.body.style.overflow='hidden';$('#xc2').focus();slow()
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
$('#tl').innerHTML=LG.map(l=>`<div class='lb'>${LN[l]}</div><input dir='auto' id='ti_${l}' placeholder='Title (${LN[l]})'><input dir='auto' id='tg_${l}' placeholder='Short teaser line, optional (${LN[l]})'><textarea dir='auto' id='td_${l}' rows='3' placeholder='Description (${LN[l]})'></textarea>${['location','hours','basis','conditions'].map(k=>`<label class='note'>${k}<input dir='auto' id='detail_${k}_${l}' maxlength='300'></label>`).join('')}`).join('');
const show=p=>{$('#lgn').style.display=p?'none':'grid';$('#pn').style.display=p?'block':'none'};
async function gate(){
  const {data:{session}}=await S.auth.getSession();
  if(!session){show(false);return}
  const {data}=await S.from('staff_emails').select('email').maybeSingle();
  if(data){show(true);staffLoad();secLoad();heroLoad();cfgLoad();annLoad()}
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
  ['hero','sec','off','ann','set'].forEach(x=>$('#p-'+x).classList.toggle('on',x===t))
};

/* home images */
async function heroLoad(){
  const {data}=await S.from('hero_images').select('*').order('sort_order').order('created_at');
  hrows=data||[];
  $('#hc2').textContent=hrows.length+' / 10 images';
  $('#hg').innerHTML=hrows.map(h=>`<div class='hi${h.active?'':' off'}' draggable='true' data-hero-drag='${h.id}'><img src='${esc(mu(h.media_path))}' alt=''><div class='row'><button class='sm' data-ht='${h.id}'>${h.active?'Hide':'Show'}</button><button class='sm' data-hd='${h.id}'>Delete</button><button class='sm' data-hero-up='${h.id}' aria-label='Move photo earlier'>↑</button><button class='sm' data-hero-down='${h.id}' aria-label='Move photo later'>↓</button><label class='note'>Mobile crop<select data-hero-crop='${h.id}'><option value='center' ${cfg['hero_crop_'+h.id]==='center'?'selected':''}>Center</option><option value='top' ${cfg['hero_crop_'+h.id]==='top'?'selected':''}>Top</option><option value='bottom' ${cfg['hero_crop_'+h.id]==='bottom'?'selected':''}>Bottom</option></select></label></div></div>`).join('')||`<p class='note'>No images yet: the default photo is used.</p>`
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

const offerStatus=o=>!o.published?'Draft':alive(o)?'Published':'Expired';
const readableDate=value=>{if(!value)return 'No expiry date';return new Intl.DateTimeFormat('en-GB',{day:'numeric',month:'long',year:'numeric'}).format(new Date(value+'T12:00:00'))};
const readOfferForm=()=>{
  const translations={};
  LG.forEach(l=>{const title=$('#ti_'+l).value.trim(),tagline=$('#tg_'+l).value.trim(),description=$('#td_'+l).value.trim();if(title||tagline||description)translations[l]={title,tagline,description,...Object.fromEntries(['location','hours','basis','conditions'].map(k=>[k,$('#detail_'+k+'_'+l).value.trim()]))}});
  return {category:$('#ct').value,price:$('#pr').value.trim()||null,sort_order:+$('#so').value||0,published:$('#pb').checked,featured:$('#ft').checked,badge:$('#bg').value||null,old_price:$('#op').value.trim()||null,valid_until:$('#vu').value||null,translations}
};
function dateFeedback(){
  const date=$('#vu').value,expired=date&&date<today();
  $('#date-warning').textContent=expired?'This date has passed ('+readableDate(date)+'). Guests will not see this offer. Choose a future date or clear the field.':date?'Visible through '+readableDate(date)+'.':'No expiry date.';
  $('#date-warning').style.color=expired?'#ffb4a8':'';
}
$('#vu').addEventListener('input',dateFeedback);
$('#pb').addEventListener('change',dateFeedback);
let previewMedia=null,previewFocus=null;
function previewOffer(o,file){
  if(previewMedia){URL.revokeObjectURL(previewMedia);previewMedia=null}
  const x=tr(o),t=L[lang],b=BD[o.badge];
  let media=md(o);
  if(file){previewMedia=URL.createObjectURL(file);media=file.type.startsWith('video/')?`<video src='${esc(previewMedia)}' controls muted playsinline></video>`:`<img src='${esc(previewMedia)}' alt=''>`}
  $('#bx').innerHTML=`<button class='x' id='xc2' aria-label='Close preview'>✕</button><div class='m'>${media}</div><div class='t'><p class='note'>Guest preview · ${offerStatus(o)} · ${readableDate(o.valid_until)}</p>${b?`<span class='bd'>${esc(t[b])}</span>`:''}<span class='eb'>${esc(t[o.category])}</span><h3 class='gold'>${esc(x.title)}</h3>${x.tagline?`<div class='tg2'>${esc(x.tagline)}</div>`:''}<div class='ul'></div>${pr(o)}${urg(o,t)}<p>${esc(x.description||'')}</p>${cta(x,t,o.category)}<button class='btn' id='xc'>${esc(t.close)}</button></div>`;
  previewFocus=document.activeElement;$('#md').classList.add('on');document.body.style.overflow='hidden';$('#xc2').focus()
}
$('#preview-offer').onclick=()=>{
  const o=readOfferForm();if(!Object.values(o.translations).some(x=>x.title)){$('#fmsg').textContent='Add at least one title before previewing.';return}
  const savedLang=lang;lang=$('#offer-preview-language').value;try{previewOffer({...editOld,...o},$('#fl').files[0]);$('#bx').dir=lang==='ar'?'rtl':'ltr';$('#bx').lang=lang}finally{lang=savedLang}
};

async function staffLoad(){
  const {data,error}=await S.from('offers').select('*').order('featured',{ascending:false}).order('sort_order').order('created_at',{ascending:false});
  if(error){$('#fmsg').textContent=error.message;return}
  staffList=data||[];paintOverview();
  $('#ls').innerHTML=staffList.map(o=>`<div class='li'><span><span class='sm' style='display:inline-block;color:${offerStatus(o)==='Published'?'#b9dfad':offerStatus(o)==='Expired'?'#ffb4a8':'#f3dc8f'}'>${offerStatus(o)}</span> ${o.featured?'★ ':''}<b>${esc(tr2(o))}</b><br><span class='note'>Translations: ${LG.filter(l=>o.translations?.[l]?.title&&o.translations?.[l]?.description).map(l=>LN[l]).join(' · ')||'Incomplete'}</span><br><span class='note'>${esc(o.category)} · ${esc(o.price||'')} · ${readableDate(o.valid_until)}</span></span><span class='row'><button class='sm' data-preview='${o.id}'>Preview</button><button class='sm' data-e='${o.id}'>Edit</button><button class='sm' data-d='${o.id}'>Delete</button></span></div>`).join('')||`<p class='note'>No offers yet.</p>`
}
$('#ls').onclick=async e=>{
  const b=e.target.closest('button');if(!b)return;
  if(b.dataset.preview){previewOffer(staffList.find(o=>o.id===b.dataset.preview));return}
  if(b.dataset.e){
    const o=staffList.find(x=>x.id===b.dataset.e);
    editId=o.id;editOld=o;
    $('#ct').value=o.category;$('#pr').value=o.price||'';$('#so').value=o.sort_order;$('#pb').checked=o.published;
    $('#ft').checked=!!o.featured;$('#bg').value=o.badge||'';$('#op').value=o.old_price||'';$('#vu').value=o.valid_until||'';
    LG.forEach(l=>{const x=(o.translations||{})[l]||{};$('#ti_'+l).value=x.title||'';$('#tg_'+l).value=x.tagline||'';$('#td_'+l).value=x.description||'';['location','hours','basis','conditions'].forEach(k=>$('#detail_'+k+'_'+l).value=x[k]||'')});
    $('#fmsg').textContent='Editing (leave the file empty to keep the current media).';
    dateFeedback();$('#fm').scrollIntoView()
  }
  if(b.dataset.d&&confirm('Delete this offer?')){
    const o=staffList.find(x=>x.id===b.dataset.d);
    const {error}=await S.from('offers').delete().eq('id',o.id);if(error){$('#fmsg').textContent=error.message;return}
    if(o.media_path)await S.storage.from('offers').remove([o.media_path]);
    staffLoad();load()
  }
};
$('#cn').onclick=()=>{editId=editOld=null;$('#fm').reset();dateFeedback();$('#fmsg').textContent=''};
let savingOffer=false;
$('#fm').onsubmit=async e=>{
  e.preventDefault();if(savingOffer)return;savingOffer=true;
  const button=$('#fm').querySelector('button:not([type])'),m=$('#fmsg');if(button)button.disabled=true;m.textContent='Saving…';
  let uploaded=null,saved=false;const previousMedia=editOld&&editOld.media_path;
  try{
    const r=readOfferForm();
    if(!Object.values(r.translations).some(x=>x.title)){m.textContent='Add at least one title.';return}
    if(r.published&&r.valid_until&&r.valid_until<today()){dateFeedback();m.textContent='Cannot publish an expired offer. Correct the end date, clear it, or uncheck Published to save as a draft.';$('#vu').focus();return}
    const f=$('#fl').files[0];
    if(f){
      const p=Date.now()+'-'+f.name.replace(/[^a-z0-9.]+/gi,'_');
      await up(p,f);uploaded=p;
      r.media_path=p;r.media_type=f.type.startsWith('video')?'video':'image';
    }
    const q=editId?S.from('offers').update(r).eq('id',editId):S.from('offers').insert(r);
    const {error}=await q;if(error)throw error;saved=true;
    if(uploaded&&previousMedia)S.storage.from('offers').remove([previousMedia]).catch(()=>{});
    editId=editOld=null;$('#fm').reset();dateFeedback();m.textContent='Saved ✓';staffLoad();load()
  }catch(x){m.textContent=x.message;if(uploaded&&!saved)S.storage.from('offers').remove([uploaded]).catch(()=>{})}
  finally{savingOffer=false;if(button)button.disabled=false}
};

/* reservation contacts */
async function cfgLoad(){
  const {data,error}=await S.from('site_settings').select('*'),m={};
  if(error){$('#sm').textContent=error.message;return}
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

/* ---------- multilingual hotel announcements ---------- */
const ANN_TEXT={
en:{label:'From Remal',news:'Hotel news',event:'Upcoming event',notice:'Please note',more:'Discover more',previous:'Previous announcement',next:'Next announcement',pause:'Pause announcements',play:'Play announcements'},
fr:{label:'Les nouvelles de Remal',news:'Actualité',event:'Événement',notice:'Information importante',more:'En savoir plus',previous:'Annonce précédente',next:'Annonce suivante',pause:'Mettre en pause',play:'Faire défiler'},
ar:{label:'من رمال',news:'أخبار الفندق',event:'فعالية قادمة',notice:'تنبيه مهم',more:'اكتشف المزيد',previous:'الإعلان السابق',next:'الإعلان التالي',pause:'إيقاف مؤقت',play:'تشغيل الإعلانات'},
hi:{label:'रिमाल की ओर से',news:'होटल समाचार',event:'आगामी कार्यक्रम',notice:'महत्वपूर्ण सूचना',more:'और जानें',previous:'पिछली घोषणा',next:'अगली घोषणा',pause:'घोषणाएँ रोकें',play:'घोषणाएँ चलाएँ'},
zh:{label:'来自 Remal',news:'酒店资讯',event:'即将举行的活动',notice:'重要通知',more:'了解更多',previous:'上一条公告',next:'下一条公告',pause:'暂停公告',play:'播放公告'}
};
let annEdit=null,annRows=[],annIndex=0,annTimer=null,annPaused=matchMedia('(prefers-reduced-motion: reduce)').matches;
const annSafeURL=v=>{try{const u=new URL(v);return u.protocol==='https:'&&!u.username&&!u.password?u.href:''}catch{return ''}};
const annValues=m=>Object.entries(m).filter(([k])=>k.startsWith('announcement_')).flatMap(([key,value])=>{try{const o=JSON.parse(value);return o&&o.translations?[{...o,key}]:[]}catch{return []}});
const annActive=(a,date=today())=>a.published&&(!a.start||a.start<=date)&&(!a.end||a.end>=date);
const annCopy=a=>{const t=a.translations||{};return t[lang]?.title?t[lang]:t.en||Object.values(t)[0]||{}};
function annCard(a){
  const t=ANN_TEXT[lang],x=annCopy(a),url=annSafeURL(a.link);
  return `<article class="announcement"><span class="ann-symbol" aria-hidden="true">${a.kind==='event'?'✧':a.kind==='notice'?'!':'✦'}</span><div class="ann-copy"><span class="ann-eyebrow">${esc(t.label)} · ${esc(t[a.kind]||t.news)}</span><h3>${esc(x.title||'')}</h3><p>${esc(x.body||'')}</p>${url?`<a class="ann-link" href="${esc(url)}" target="_blank" rel="noopener noreferrer">${esc(x.linkLabel||t.more)} ↗</a>`:''}</div></article>`
}
function paintAnnouncements(){
  clearInterval(annTimer);
  const host=$('#announcements');if(!host)return;
  const a=annValues(cfg).filter(x=>annActive(x)&&(!x.target||x.target==='all'||x.target===cat));
  host.hidden=!a.length;if(!a.length){host.innerHTML='';return}
  annIndex=((annIndex%a.length)+a.length)%a.length;
  const t=ANN_TEXT[lang];
  host.innerHTML=annCard(a[annIndex])+(a.length>1?`<div class="ann-controls"><button type="button" data-ann-step="-1" aria-label="${esc(t.previous)}">‹</button><span>${annIndex+1} / ${a.length}</span><button type="button" data-ann-step="1" aria-label="${esc(t.next)}">›</button><button type="button" data-ann-pause aria-label="${esc(annPaused?t.play:t.pause)}">${annPaused?'▶':'Ⅱ'}</button></div>`:'');
  if(a.length>1&&!annPaused&&!document.hidden)annTimer=setInterval(()=>{if(!host.matches(':hover')&&!host.contains(document.activeElement)){annIndex++;paintAnnouncements()}},10000)
}
document.addEventListener('click',e=>{
  const step=e.target.closest('[data-ann-step]'),pause=e.target.closest('[data-ann-pause]');
  if(step){annIndex+=Number(step.dataset.annStep);paintAnnouncements()}
  if(pause){annPaused=!annPaused;paintAnnouncements()}
});
document.addEventListener('visibilitychange',paintAnnouncements);
$('#ann-translations').innerHTML=LG.map(l=>`<fieldset class="f"><legend class="lb">${LN[l]}</legend><label class="note">Title<input id="ann-title-${l}" dir="auto" maxlength="120"></label><label class="note">Message<textarea id="ann-body-${l}" dir="auto" maxlength="700" rows="3"></textarea></label><label class="note">Link label (optional)<input id="ann-label-${l}" dir="auto" maxlength="60"></label></fieldset>`).join('');
function readAnnouncement(){
  const translations={};LG.forEach(l=>{translations[l]={title:$('#ann-title-'+l).value.trim(),body:$('#ann-body-'+l).value.trim(),linkLabel:$('#ann-label-'+l).value.trim()}});
  return {target:$('#ann-target').value,kind:$('#ann-kind').value,start:$('#ann-start').value,end:$('#ann-end').value,link:$('#ann-link').value.trim(),published:$('#ann-published').checked,translations}
}
function resetAnnouncement(){annEdit=null;$('#ann-form').reset();$('#ann-editor-preview').innerHTML='';$('#ann-msg').textContent=''}
async function annLoad(){
  const {data,error}=await S.from('site_settings').select('*').like('key','announcement_%');
  if(error){$('#ann-msg').textContent=error.message;return}
  const m={};(data||[]).forEach(r=>m[r.key]=r.value);annRows=annValues(m);
  Object.keys(cfg).filter(k=>k.startsWith('announcement_')).forEach(k=>delete cfg[k]);Object.assign(cfg,m);
  $('#ann-list').innerHTML=annRows.map(a=>{
    const status=!a.published?'Draft':a.end&&a.end<today()?'Expired':a.start&&a.start>today()?'Scheduled':'Published';
    return `<div class="li"><span><b>${esc(annCopy(a).title||'(untitled)')}</b><br><span class="note">${status} · ${a.start?readableDate(a.start):'Immediately'} — ${a.end?readableDate(a.end):'No expiry'}</span></span><span class="row"><button class="sm" data-ann-edit="${esc(a.key)}">Edit</button><button class="sm" data-ann-delete="${esc(a.key)}">Delete</button></span></div>`
  }).join('')||'<p class="note">No announcements yet.</p>';
  paintAnnouncements();paintOverview()
}
$('#ann-cancel').onclick=resetAnnouncement;
$('#ann-preview').onclick=()=>{$('#ann-editor-preview').innerHTML=annCard(readAnnouncement())};
$('#ann-list').onclick=async e=>{
  const edit=e.target.closest('[data-ann-edit]'),del=e.target.closest('[data-ann-delete]');
  if(edit){
    const a=annRows.find(a=>a.key===edit.dataset.annEdit);if(!a)return;annEdit=a.key;
    $('#ann-target').value=a.target||'all';$('#ann-kind').value=a.kind;$('#ann-start').value=a.start||'';$('#ann-end').value=a.end||'';$('#ann-link').value=a.link||'';$('#ann-published').checked=!!a.published;
    LG.forEach(l=>{const t=a.translations[l]||{};$('#ann-title-'+l).value=t.title||'';$('#ann-body-'+l).value=t.body||'';$('#ann-label-'+l).value=t.linkLabel||''});
    $('#ann-msg').textContent='Editing announcement';$('#ann-editor-preview').innerHTML='';$('#ann-form').scrollIntoView()
  }
  if(del&&confirm('Delete this announcement?')){
    const {error}=await S.from('site_settings').delete().eq('key',del.dataset.annDelete);
    if(error){$('#ann-msg').textContent=error.message;return}
    if(annEdit===del.dataset.annDelete)resetAnnouncement();annLoad()
  }
};
$('#ann-form').onsubmit=async e=>{
  e.preventDefault();const a=readAnnouncement(),m=$('#ann-msg'),button=e.submitter;
  if(!LG.some(l=>a.translations[l].title)){m.textContent='Add at least one title.';return}
  if(a.published&&LG.some(l=>!a.translations[l].title||!a.translations[l].body)){m.textContent='Complete the title and message in all 5 languages before publishing.';return}
  if(a.start&&a.end&&a.end<a.start){m.textContent='The end date must be on or after the start date.';return}
  if(a.published&&a.end&&a.end<today()){m.textContent='The end date has passed. Correct it or save as a draft.';return}
  if(a.link&&!annSafeURL(a.link)){m.textContent='Enter a valid HTTPS link.';return}
  if(button)button.disabled=true;m.textContent='Saving…';
  try{
    const key=annEdit||'announcement_'+crypto.randomUUID();
    const {error}=await S.from('site_settings').upsert({key,value:JSON.stringify(a),updated_at:new Date().toISOString()},{onConflict:'key'});
    if(error)throw error;resetAnnouncement();m.textContent='Announcement saved ✓';await annLoad()
  }catch(x){m.textContent=x.message||'Could not save.'}finally{if(button)button.disabled=false}
};

/* Guest discovery and booking details */
const EXPERIENCE_UI={"en":{"search":"Search experiences","all":"All sections","sort":"Sort offers","recommended":"Recommended","low":"Price: low to high","high":"Price: high to low","date":"Preferred date","people":"Number of guests","dateLine":"Date","peopleLine":"Guests","location":"Location","hours":"Hours","basis":"Price basis","conditions":"Conditions","noresults":"No matching offers","filters":"Find your experience"},"fr":{"search":"Rechercher une expérience","all":"Toutes les sections","sort":"Trier les offres","recommended":"Recommandées","low":"Prix croissant","high":"Prix décroissant","date":"Date souhaitée","people":"Nombre de personnes","dateLine":"Date","peopleLine":"Personnes","location":"Lieu","hours":"Horaires","basis":"Base du prix","conditions":"Conditions","noresults":"Aucune offre correspondante","filters":"Trouvez votre expérience"},"ar":{"search":"ابحث عن تجربة","all":"كل الأقسام","sort":"ترتيب العروض","recommended":"موصى به","low":"السعر من الأقل","high":"السعر من الأعلى","date":"التاريخ المفضل","people":"عدد الضيوف","dateLine":"التاريخ","peopleLine":"الضيوف","location":"الموقع","hours":"الأوقات","basis":"أساس السعر","conditions":"الشروط","noresults":"لا توجد عروض مطابقة","filters":"ابحث عن تجربتك"},"hi":{"search":"अनुभव खोजें","all":"सभी अनुभाग","sort":"ऑफ़र क्रम","recommended":"अनुशंसित","low":"कीमत: कम से अधिक","high":"कीमत: अधिक से कम","date":"पसंदीदा तारीख","people":"मेहमानों की संख्या","dateLine":"तारीख","peopleLine":"मेहमान","location":"स्थान","hours":"समय","basis":"मूल्य का आधार","conditions":"शर्तें","noresults":"कोई मिलान नहीं","filters":"अपना अनुभव खोजें"},"zh":{"search":"搜索体验","all":"所有分类","sort":"优惠排序","recommended":"推荐","low":"价格从低到高","high":"价格从高到低","date":"期望日期","people":"宾客人数","dateLine":"日期","peopleLine":"宾客","location":"地点","hours":"时间","basis":"价格单位","conditions":"条款","noresults":"没有匹配的优惠","filters":"寻找您的体验"}};
let offerQuery='',offerSort='recommended';
const priceNumber=o=>{const m=String(o.price||'').match(/\d+(?:[.,]\d+)?/);return m?Number(m[0].replace(',','.')):null};
function filteredOffers(list){
  const q=offerQuery.trim().toLocaleLowerCase();
  const out=list.filter(o=>{const x=tr(o);return !q||[x.title,x.tagline,x.description,x.location,L[lang][o.category]].join(' ').toLocaleLowerCase().includes(q)});
  if(offerSort!=='recommended')out.sort((a,b)=>{const x=priceNumber(a),y=priceNumber(b);if(x===null)return y===null?0:1;if(y===null)return -1;return offerSort==='low'?x-y:y-x});
  return out
}
function paintDiscovery(){
  const t=EXPERIENCE_UI[lang],search=$('#offer-search'),category=$('#offer-category'),sort=$('#offer-sort');
  search.placeholder=t.search;search.setAttribute('aria-label',t.search);
  category.innerHTML='<option value="all">'+esc(t.all)+'</option>'+CT.map(c=>'<option value="'+c+'">'+esc(L[lang][c])+'</option>').join('');category.value=cat;category.setAttribute('aria-label',t.all);
  sort.innerHTML=['recommended','low','high'].map(k=>'<option value="'+k+'">'+esc(t[k])+'</option>').join('');sort.value=offerSort;sort.setAttribute('aria-label',t.sort);
  $('#discovery-title').textContent=t.filters
}
function offerFacts(x){
  const t=EXPERIENCE_UI[lang];return '<dl class="offer-facts">'+['location','hours','basis','conditions'].filter(k=>x[k]).map(k=>'<div><dt>'+esc(t[k])+'</dt><dd>'+esc(x[k])+'</dd></div>').join('')+'</dl>'
}
function bookingFields(){const t=EXPERIENCE_UI[lang];return '<div class="booking-fields"><label>'+esc(t.date)+'<input id="booking-date" type="date" min="'+today()+'"></label><label>'+esc(t.people)+'<input id="booking-guests" type="number" min="1" max="100" step="1" value="2"></label></div>'}
document.addEventListener('input',e=>{
  if(e.target.id==='offer-search'){offerQuery=e.target.value;paint()}
  if(e.target.id==='booking-date'||e.target.id==='booking-guests'){
    const link=$('#bx a[data-booking-base]');if(!link)return;
    const d=$('#booking-date'),n=$('#booking-guests'),t=EXPERIENCE_UI[lang];
    if(!d.checkValidity()||!n.checkValidity()){link.setAttribute('aria-disabled','true');return}
    link.removeAttribute('aria-disabled');link.href=link.dataset.bookingBase+encodeURIComponent((d.value?'\n'+t.dateLine+': '+d.value:'')+'\n'+t.peopleLine+': '+n.value)
  }
});
document.addEventListener('change',e=>{
  if(e.target.id==='offer-category'){cat=e.target.value;location.hash=cat==='all'?'offres':'s-'+cat;paint()}
  if(e.target.id==='offer-sort'){offerSort=e.target.value;paint()}
});
document.addEventListener('click',e=>{const a=e.target.closest('a[aria-disabled="true"]');if(a){e.preventDefault();$('#booking-date')?.reportValidity();$('#booking-guests')?.reportValidity()}});
function paintOverview(){
  const counts={Published:0,Draft:0,Expired:0};staffList.forEach(o=>counts[offerStatus(o)]++);
  $('#dashboard-summary').innerHTML=Object.entries(counts).map(([k,v])=>'<div class="summary-metric"><b>'+v+'</b><span>'+k+' offers</span></div>').join('')+'<div class="summary-metric"><b>'+annRows.filter(a=>a.published&&(!a.end||a.end>=today())).length+'</b><span>Active / scheduled announcements</span></div>'
}

/* Photo ordering: drag and drop, with touch/keyboard button alternatives. */
let heroDragged=null,heroReordering=false;
async function moveHero(id,targetIndex){
  if(heroReordering)return;
  const from=hrows.findIndex(h=>h.id===id);if(from<0||targetIndex<0||targetIndex>=hrows.length||from===targetIndex)return;
  heroReordering=true;const order=[...hrows],[item]=order.splice(from,1);order.splice(targetIndex,0,item);
  try{
    const results=await Promise.all(order.map((h,i)=>S.from('hero_images').update({sort_order:i}).eq('id',h.id)));
    const failed=results.find(r=>r.error);if(failed)throw failed.error;
    $('#hmsg').textContent='Photo order saved ✓';await heroLoad();first=true;await load()
  }catch(e){$('#hmsg').textContent=e.message||'Could not reorder photos.';await heroLoad()}finally{heroReordering=false}
}
$('#hg').addEventListener('dragstart',e=>{const item=e.target.closest('[data-hero-drag]');if(item){heroDragged=item.dataset.heroDrag;e.dataTransfer.setData('text/plain',heroDragged)}});
$('#hg').addEventListener('dragover',e=>{if(heroDragged&&e.target.closest('[data-hero-drag]'))e.preventDefault()});
$('#hg').addEventListener('drop',e=>{e.preventDefault();const target=e.target.closest('[data-hero-drag]');if(target&&heroDragged)moveHero(heroDragged,hrows.findIndex(h=>h.id===target.dataset.heroDrag));heroDragged=null});
$('#hg').addEventListener('dragend',()=>heroDragged=null);
$('#hg').addEventListener('click',e=>{const up=e.target.closest('[data-hero-up]'),down=e.target.closest('[data-hero-down]');if(up)moveHero(up.dataset.heroUp,hrows.findIndex(h=>h.id===up.dataset.heroUp)-1);if(down)moveHero(down.dataset.heroDown,hrows.findIndex(h=>h.id===down.dataset.heroDown)+1)});
$('#hg').addEventListener('change',async e=>{
  const id=e.target.dataset.heroCrop;if(!id)return;
  const value=e.target.value;if(!['top','center','bottom'].includes(value))return;e.target.disabled=true;
  try{const key='hero_crop_'+id,{error}=await S.from('site_settings').upsert({key,value,updated_at:new Date().toISOString()},{onConflict:'key'});if(error)throw error;cfg[key]=value;$('#hmsg').textContent='Mobile crop saved ✓';first=true;await load()}catch(x){$('#hmsg').textContent=x.message}finally{e.target.disabled=false}
});
$('#offer-preview-language').innerHTML=LG.map(l=>'<option value="'+l+'">'+LN[l]+'</option>').join('');

dir();load();route();addEventListener('hashchange',route);
