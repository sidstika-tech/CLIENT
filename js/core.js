/* ══════════════════════════════════════════════════════
   DOUBLE EIGHT AI — CORE JS
   All shared logic: API, auth, sidebar, i18n, utils
══════════════════════════════════════════════════════ */
const API = 'https://api.doubleeight.online/api';

/* ── AUTH ── */
const Auth = {
  token: () => localStorage.getItem('d8_token'),
  user:  () => { try { return JSON.parse(localStorage.getItem('d8_user')||'{}'); } catch { return {}; } },
  setUser: (u) => localStorage.setItem('d8_user', JSON.stringify(u)),
  logout: () => {
    localStorage.removeItem('d8_token');
    localStorage.removeItem('d8_user');
    window.location.href = '/index.html';
  },
  check: () => {
    if(!localStorage.getItem('d8_token')) window.location.href = '/index.html';
  }
};

/* ── API CLIENT ── */
const api = {
  headers: () => ({ 'Content-Type':'application/json', 'Authorization': `Bearer ${Auth.token()}` }),
  async get(path) {
    try {
      const r = await fetch(`${API}${path}`, { headers: this.headers() });
      if(r.status === 401) { Auth.logout(); return null; }
      return r.json();
    } catch(e) { console.error('GET', path, e); return null; }
  },
  async post(path, body) {
    try {
      const r = await fetch(`${API}${path}`, { method:'POST', headers: this.headers(), body: JSON.stringify(body) });
      if(r.status === 401) { Auth.logout(); return null; }
      return r.json();
    } catch(e) { console.error('POST', path, e); return null; }
  },
  async put(path, body) {
    try {
      const r = await fetch(`${API}${path}`, { method:'PUT', headers: this.headers(), body: JSON.stringify(body) });
      if(r.status === 401) { Auth.logout(); return null; }
      return r.json();
    } catch(e) { console.error('PUT', path, e); return null; }
  },
  async del(path) {
    try {
      const r = await fetch(`${API}${path}`, { method:'DELETE', headers: this.headers() });
      if(r.status === 401) { Auth.logout(); return null; }
      return r.json();
    } catch(e) { console.error('DEL', path, e); return null; }
  }
};

/* ── ARABIC / ENGLISH TRANSLATIONS ── */
const T = {
  en: {
    dashboard:'Dashboard', chat:'AI Advisor', tools:'All Tools',
    generator:'Business Generator', market:'Market Research',
    marketing:'Marketing Builder', prompt:'Prompt Writer',
    vault:'Project Vault', billing:'Billing & Plans', settings:'Settings',
    academy:'Business Academy', community:'Community',
    main:'MAIN', ai_tools:'AI TOOLS', account:'ACCOUNT', learn:'LEARN',
    free_plan:'free plan', new_report:'+ New Report',
    welcome_sub:'Your AI business platform is ready. What are we building today?',
    ask_ai:'◎ Ask AI Advisor',
    tagline:'From Zero to Success in One Click',
    sign_out:'Sign Out',
    generate:'⚡ Generate', generating:'Generating...',
    copy:'Copy Text', close:'✕ Close', new_gen:'← New',
    cancel:'Cancel', save:'Save', confirm:'Confirm',
  },
  ar: {
    dashboard:'لوحة التحكم', chat:'المستشار الذكي', tools:'جميع الأدوات',
    generator:'مولّد الأعمال', market:'أبحاث السوق',
    marketing:'بناء التسويق', prompt:'كاتب الأوامر',
    vault:'مخزن المشاريع', billing:'الاشتراكات', settings:'الإعدادات',
    academy:'أكاديمية الأعمال', community:'المجتمع',
    main:'رئيسي', ai_tools:'أدوات الذكاء', account:'الحساب', learn:'تعلّم',
    free_plan:'الخطة المجانية', new_report:'+ تقرير جديد',
    welcome_sub:'منصة الذكاء الاصطناعي جاهزة. ماذا نبني اليوم؟',
    ask_ai:'◎ اسأل المستشار',
    tagline:'من الصفر إلى النجاح بنقرة واحدة',
    sign_out:'تسجيل الخروج',
    generate:'⚡ توليد', generating:'جارٍ التوليد...',
    copy:'نسخ النص', close:'✕ إغلاق', new_gen:'← جديد',
    cancel:'إلغاء', save:'حفظ', confirm:'تأكيد',
  }
};

function getLang() { return localStorage.getItem('d8_lang') || 'en'; }
function t(key) { return T[getLang()]?.[key] || T.en[key] || key; }

function applyLang(lang) {
  localStorage.setItem('d8_lang', lang);
  const isAr = lang === 'ar';
  document.documentElement.setAttribute('dir', isAr ? 'rtl' : 'ltr');
  document.documentElement.setAttribute('lang', lang);
  // update all data-i18n elements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    el.textContent = t(key);
  });
  // sync settings buttons if present
  const enBtn = document.getElementById('lang-en');
  const arBtn = document.getElementById('lang-ar');
  if(enBtn) enBtn.classList.toggle('active', !isAr);
  if(arBtn) arBtn.classList.toggle('active', isAr);
}

/* ── TOAST ── */
const Toast = {
  _el: null,
  init() {
    if(this._el) return;
    this._el = document.createElement('div');
    this._el.className = 'toast-container';
    document.body.appendChild(this._el);
  },
  show(msg, type='info', duration=3500) {
    this.init();
    const t = document.createElement('div');
    t.className = `toast ${type}`;
    const icons = { success:'✓', error:'✕', info:'◎' };
    const colors = { success:'#22c55e', error:'#ef4444', info:'#f59e0b' };
    t.innerHTML = `<span style="color:${colors[type]}">${icons[type]}</span><span>${msg}</span>`;
    this._el.appendChild(t);
    setTimeout(() => {
      t.style.cssText += 'opacity:0;transform:translateX(20px);transition:.3s;';
      setTimeout(() => t.remove(), 300);
    }, duration);
  }
};

/* ── MARKDOWN RENDERER ── */
function renderMarkdown(md) {
  if(!md) return '';
  let html = md
    .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
    .replace(/^### (.+)$/gm,'<h3>$1</h3>')
    .replace(/^## (.+)$/gm,'<h2>$1</h2>')
    .replace(/^# (.+)$/gm,'<h1>$1</h1>')
    .replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>')
    .replace(/\*(.+?)\*/g,'<em>$1</em>')
    .replace(/`([^`]+)`/g,'<code style="background:rgba(255,255,255,0.08);padding:1px 6px;border-radius:4px;font-family:monospace;font-size:.83em">$1</code>')
    .replace(/^\|(.+)\|$/gm,(m,r)=>'<tr>'+r.split('|').map(c=>`<td>${c.trim()}</td>`).join('')+'</tr>')
    .replace(/(<tr>.*<\/tr>\n?)+/g,m=>`<table>${m}</table>`)
    .replace(/^[-*] (.+)$/gm,'<li>$1</li>')
    .replace(/(<li>.*<\/li>\n?)+/g,m=>`<ul>${m}</ul>`)
    .replace(/^\d+\. (.+)$/gm,'<li>$1</li>')
    .replace(/\n\n/g,'</p><p>')
    .replace(/^(?!<[htulpo])(.+)$/gm,'<p>$1</p>');
  return html;
}

/* ── SIDEBAR BUILDER ── */
function buildLayout(pageId) {
  const user = Auth.user();
  const lang = getLang();
  const isAr = lang === 'ar';

  const nav = [
    { group: t('main'), items:[
      { id:'dashboard', icon:'⊞', label:t('dashboard'), href:'dashboard.html' },
      { id:'chat',      icon:'◎', label:t('chat'),      href:'chat.html' },
    ]},
    { group: t('ai_tools'), items:[
      { id:'tools',     icon:'◫', label:t('tools'),     href:'tools.html' },
      { id:'generator', icon:'⚡', label:t('generator'), href:'generator.html' },
      { id:'market',    icon:'◉', label:t('market'),    href:'market.html' },
      { id:'marketing', icon:'◈', label:t('marketing'), href:'marketing.html' },
      { id:'prompt',    icon:'✦', label:t('prompt'),    href:'prompt.html' },
    ]},
    { group: t('learn'), items:[
      { id:'academy',   icon:'🎓', label:t('academy'),   href:'academy.html' },
      { id:'community', icon:'◉', label:t('community'), href:'community.html' },
    ]},
    { group: t('account'), items:[
      { id:'vault',    icon:'▣', label:t('vault'),    href:'vault.html' },
      { id:'billing',  icon:'◐', label:t('billing'),  href:'billing.html' },
      { id:'settings', icon:'◑', label:t('settings'), href:'settings.html' },
    ]}
  ];

  const sidebar = document.querySelector('.sidebar');
  if(!sidebar) return;

  sidebar.innerHTML = `
    <button class="sidebar-close" id="sidebar-close-btn" title="Close">✕</button>
    <div class="sidebar-logo">
      <div class="logo-text">DOUBLE EIGHT</div>
      <div class="logo-sub" data-i18n="tagline">${t('tagline')}</div>
    </div>
    <nav class="sidebar-nav">
      ${nav.map(g=>`
        <div class="nav-group">
          <div class="nav-group-label">${g.group}</div>
          ${g.items.map(item=>`
            <div class="nav-item ${item.id===pageId?'active':''}" onclick="window.location.href='${item.href}'">
              <span class="nav-icon">${item.icon}</span>
              <span>${item.label}</span>
            </div>
          `).join('')}
        </div>
      `).join('')}
    </nav>
    <div class="sidebar-footer">
      <div class="sidebar-user">
        <div class="user-avatar">${(user.name||'U')[0].toUpperCase()}</div>
        <div style="min-width:0">
          <div class="user-name">${user.name||'User'}</div>
          <div class="user-plan">${user.membership?.plan||'free'} plan</div>
        </div>
        <button class="btn-logout" onclick="Auth.logout()" title="${t('sign_out')}">↩</button>
      </div>
    </div>
  `;

  // overlay for mobile
  let overlay = document.getElementById('nav-overlay');
  if(!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'nav-overlay';
    overlay.id = 'nav-overlay';
    overlay.onclick = closeSidebar;
    document.body.insertBefore(overlay, document.body.firstChild);
  }

  // wire hamburger button(s)
  document.querySelectorAll('.hamburger').forEach(btn => {
    btn.onclick = () => {
      sidebar.classList.toggle('open');
      overlay.classList.toggle('show', sidebar.classList.contains('open'));
    };
  });

  // wire close button inside sidebar
  document.getElementById('sidebar-close-btn').onclick = closeSidebar;

  // show/hide sidebar-close based on viewport
  function checkClose() {
    const btn = document.getElementById('sidebar-close-btn');
    if(btn) btn.style.display = window.innerWidth <= 900 ? 'flex' : 'none';
    if(window.innerWidth > 900) { sidebar.classList.remove('open'); overlay.classList.remove('show'); }
  }
  checkClose();
  window.addEventListener('resize', checkClose);

  // apply current language
  applyLang(lang);
}

function closeSidebar() {
  const sidebar = document.querySelector('.sidebar');
  const overlay = document.getElementById('nav-overlay');
  if(sidebar) sidebar.classList.remove('open');
  if(overlay) overlay.classList.remove('show');
}

/* ── MODAL HELPERS ── */
function openModal(id)  { document.getElementById(id)?.classList.add('open'); }
function closeModal(id) { document.getElementById(id)?.classList.remove('open'); }

/* ── COPY TO CLIPBOARD ── */
function copyText(text) {
  if(!text) return;
  navigator.clipboard.writeText(text)
    .then(()  => Toast.show('Copied to clipboard!', 'success'))
    .catch(()  => Toast.show('Copy failed', 'error'));
}

/* ── EXPORT REPORT ── */
async function exportReport(reportId, format) {
  if(!reportId) { Toast.show('No report to export', 'error'); return; }
  try {
    const r = await fetch(`${API}/tools/export/${reportId}?format=${format}`, {
      headers: { 'Authorization': `Bearer ${Auth.token()}` }
    });
    if(!r.ok) throw new Error('Export failed');
    const blob = await r.blob();
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `d8-report.${format}`;
    a.click();
    Toast.show(`Exported as ${format.toUpperCase()}`, 'success');
  } catch(e) {
    Toast.show('Export failed — try copy instead', 'error');
  }
}

/* ── DATE FORMATTER ── */
function timeAgo(d) {
  if(!d) return '';
  const diff = Date.now() - new Date(d).getTime();
  const m = Math.floor(diff / 60000);
  if(m < 1)  return getLang()==='ar' ? 'الآن' : 'just now';
  if(m < 60) return getLang()==='ar' ? `منذ ${m}د` : `${m}m ago`;
  const h = Math.floor(m / 60);
  if(h < 24) return getLang()==='ar' ? `منذ ${h}س` : `${h}h ago`;
  const days = Math.floor(h / 24);
  return getLang()==='ar' ? `منذ ${days}ي` : `${days}d ago`;
}

/* ── GENERATE BUTTON HELPER ── */
/* Call this to set a button into loading state.
   Returns a function to call when done. */
function setGenerating(btnId, loaderId, textId) {
  const btn  = document.getElementById(btnId);
  const spin = document.getElementById(loaderId);
  const txt  = document.getElementById(textId);
  if(btn)  btn.disabled = true;
  if(spin) spin.style.display = 'inline-block';
  if(txt)  txt.textContent = t('generating');
  return function reset() {
    if(btn)  btn.disabled = false;
    if(spin) spin.style.display = 'none';
    if(txt)  txt.textContent = t('generate');
  };
}

/* ── SAVED CARDS (shared) ── */
function getSavedCards() {
  try { return JSON.parse(localStorage.getItem('d8_cards')||'[]'); } catch { return []; }
}
