/* ── DOUBLE EIGHT AI — CORE JS ─────────────────────────────────────────── */
const API = 'https://api.doubleeight.online/api';

/* ── AUTH ── */
const Auth = {
  token: () => localStorage.getItem('d8_token'),
  user: () => { try { return JSON.parse(localStorage.getItem('d8_user')||'{}'); } catch{ return {}; } },
  setUser: (u) => localStorage.setItem('d8_user', JSON.stringify(u)),
  logout: () => { localStorage.removeItem('d8_token'); localStorage.removeItem('d8_user'); window.location.href='/index.html'; },
  check: () => { if(!localStorage.getItem('d8_token')) window.location.href='/index.html'; }
};

/* ── API CLIENT ── */
const api = {
  headers: () => ({ 'Content-Type':'application/json', 'Authorization': `Bearer ${Auth.token()}` }),
  async get(path) {
    const r = await fetch(`${API}${path}`, { headers: this.headers() });
    if(r.status===401) { Auth.logout(); return; }
    return r.json();
  },
  async post(path, body) {
    const r = await fetch(`${API}${path}`, { method:'POST', headers: this.headers(), body: JSON.stringify(body) });
    if(r.status===401) { Auth.logout(); return; }
    return r.json();
  },
  async put(path, body) {
    const r = await fetch(`${API}${path}`, { method:'PUT', headers: this.headers(), body: JSON.stringify(body) });
    if(r.status===401) { Auth.logout(); return; }
    return r.json();
  },
  async del(path) {
    const r = await fetch(`${API}${path}`, { method:'DELETE', headers: this.headers() });
    if(r.status===401) { Auth.logout(); return; }
    return r.json();
  },
  async streamPost(path, body, onChunk) {
    const r = await fetch(`${API}${path}`, { method:'POST', headers: this.headers(), body: JSON.stringify(body) });
    if(!r.body) throw new Error('No stream');
    const reader = r.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';
    while(true) {
      const { done, value } = await reader.read();
      if(done) break;
      buffer += decoder.decode(value, { stream:true });
      const lines = buffer.split('\n');
      buffer = lines.pop();
      for(const line of lines) {
        if(line.startsWith('data: ')) {
          try {
            const data = JSON.parse(line.slice(6));
            onChunk(data);
          } catch{}
        }
      }
    }
  }
};

/* ── TRANSLATIONS ── */
const T = {
  en: {
    // Nav
    'nav.main':'MAIN', 'nav.tools_group':'AI TOOLS', 'nav.account':'ACCOUNT',
    'nav.dashboard':'Dashboard', 'nav.chat':'AI Advisor', 'nav.tools':'All Tools',
    'nav.generator':'Business Generator', 'nav.market':'Market Research',
    'nav.marketing':'Marketing Builder', 'nav.prompt':'Prompt Writer',
    'nav.vault':'Project Vault', 'nav.billing':'Billing & Plans', 'nav.settings':'Settings', 'nav.learn':'LEARN & GROW', 'nav.academy':'Business Academy', 'nav.community':'Community',
    // Common
    'btn.generate':'⚡ Generate', 'btn.generating':'Generating...', 'btn.copy':'Copy',
    'btn.new':'← New', 'btn.cancel':'Cancel', 'btn.save':'Save', 'btn.close':'✕ Close',
    'btn.export_pdf':'↓ PDF', 'btn.export_docx':'↓ DOCX',
    'label.result':'Generated Result', 'label.prev':'PREVIOUS', 'label.loading':'Loading...',
    'msg.fill_required':'Please fill all required fields',
    'msg.copied':'Copied to clipboard!', 'msg.copy_fail':'Copy failed',
    // Dashboard
    'dash.welcome':'Welcome back', 'dash.reports':'Reports Generated', 'dash.chats':'AI Chats',
    'dash.research':'Market Research', 'dash.plan':'Current Plan', 'dash.upgrade':'Upgrade →',
    'dash.recent':'Recent Reports', 'dash.view_all':'View All →', 'dash.usage':'Usage Overview',
    'dash.ai_tip':'◎ AI ADVISOR TIP', 'dash.new_report':'+ New Report',
    'dash.quick_chat':'AI Advisor', 'dash.quick_plan':'Business Plan', 'dash.quick_market':'Market Research',
    'dash.quick_marketing':'Marketing Plan', 'dash.quick_pitch':'Pitch Deck', 'dash.quick_all':'All 17 Tools',
    'dash.quick_chat_sub':'Ask anything', 'dash.quick_plan_sub':'Investor-ready',
    'dash.quick_market_sub':'Deep insights', 'dash.quick_marketing_sub':'Full strategy',
    'dash.quick_pitch_sub':'Raise capital', 'dash.quick_all_sub':'See full toolkit',
    'dash.no_reports':'No reports yet.<br>Generate your first one!',
    'dash.platform_ready':'Your AI business intelligence platform is ready. What are we building today?',
    'dash.ask_ai':'◎ Ask AI Advisor',
    // Billing
    'bill.title':'BILLING & PLANS', 'bill.pro_offer':'PRO PLAN — FIRST MONTH FREE',
    'bill.pro_desc':'Start your Pro subscription today and pay nothing for 30 days. Cancel anytime. No risk.',
    'bill.claim':'Claim Free Month →', 'bill.current_plan':'Current Plan',
    'bill.member_since':'Member since', 'bill.current':'✓ Current Plan', 'bill.downgrade':'Downgrade',
    'bill.free_month':'🎁 First Month Free', 'bill.pay_now':'Pay $19/mo now',
    'bill.limit_title':'⚠ You\'ve reached your free plan limit',
    'bill.limit_desc':'Upgrade to Pro to continue generating reports, using AI tools, and growing your business — first month free.',
    'bill.pay_title':'UPGRADE PLAN', 'bill.pay_free_title':'🎁 ACTIVATE FREE MONTH',
    'bill.pay_card_name':'Cardholder Name', 'bill.pay_card_num':'Card Number',
    'bill.pay_expiry':'Expiry', 'bill.pay_cvv':'CVV',
    'bill.pay_save_card':'Save card for future payments',
    'bill.pay_free_note':'🎁 First month FREE — You will not be charged today. Your card will be saved and billed after 30 days.',
    'bill.pay_secure':'Secure payment. Cancel anytime from settings.',
    'bill.pay_confirm':'Confirm & Activate', 'bill.pay_activate':'🎁 Activate Free Month',
    'bill.saved_cards':'Saved Cards', 'bill.new_card':'New Card',
    'bill.coming_soon':'Coming Soon', 'bill.coming_soon_msg':'This plan will be available soon.',
    // Settings
    'set.title':'SETTINGS', 'set.profile':'◑ PROFILE', 'set.full_name':'Full Name',
    'set.save_profile':'Save Profile', 'set.language':'◑ LANGUAGE', 'set.lang_note':'Changes the interface language across the platform.',
    'set.payment':'◑ PAYMENT METHODS', 'set.add_card':'+ Add Payment Method',
    'set.no_cards':'No payment methods saved yet.',
    'set.password':'◑ CHANGE PASSWORD', 'set.email':'Email Address',
    'set.old_pw':'Current Password', 'set.new_pw':'New Password', 'set.confirm_pw':'Confirm Password',
    'set.update_pw':'Update Password', 'set.sign_out':'Sign Out', 'set.sign_out_desc':'Sign out of your Double Eight AI account',
    'set.add_card_title':'ADD PAYMENT METHOD', 'set.card_name':'Cardholder Name', 'set.card_num':'Card Number',
    'set.save_card':'Save Card', 'set.set_default':'Set Default', 'set.default':'Default',
    'set.card_note':'Card details are encrypted. We only save the last 4 digits for display.',
    // Generator
    'gen.title':'BUSINESS GENERATOR', 'gen.card_title':'⚡ GENERATE BUSINESS PLAN',
    'gen.name':'Business Name *', 'gen.industry':'Industry *', 'gen.model':'Business Model *',
    'gen.market':'Target Market *', 'gen.investment':'Initial Investment', 'gen.location':'Location',
    'gen.goals':'Goals *', 'gen.btn':'⚡ Generate Full Business Plan',
    'gen.result_title':'Business Plan', 'gen.prev':'PREVIOUS PLANS', 'gen.no_prev':'No plans generated yet',
    // Marketing
    'mkt.title':'MARKETING BUILDER', 'mkt.card_title':'◈ BUILD STRATEGY',
    'mkt.name':'Business Name *', 'mkt.industry':'Industry *', 'mkt.audience':'Target Audience *',
    'mkt.goals':'Marketing Goals *', 'mkt.budget':'Monthly Budget', 'mkt.presence':'Current Presence',
    'mkt.timeline':'Timeline', 'mkt.btn':'◈ Build Marketing Strategy',
    'mkt.result_title':'Marketing Strategy', 'mkt.prev':'PREVIOUS STRATEGIES', 'mkt.no_prev':'No strategies yet',
    // Market Research
    'mr.title':'MARKET RESEARCH', 'mr.card_title':'◉ NEW RESEARCH',
    'mr.niche':'Industry / Niche *', 'mr.region':'Target Region', 'mr.demo':'Target Demographics',
    'mr.focus':'Research Focus', 'mr.budget':'Budget Range',
    'mr.btn':'◉ Generate Research Report',
    'mr.result_title':'Market Research Report', 'mr.prev':'PREVIOUS RESEARCH', 'mr.no_prev':'No research reports yet',
    // Chat
    'chat.title':'AI ADVISOR', 'chat.history':'HISTORY', 'chat.new_chat':'+ New Chat',
    'chat.tab_chat':'💬 Chat', 'chat.tab_history':'🕐 History',
    'chat.placeholder':'Ask anything about business, strategy, or marketing...',
    'chat.thinking':'AI is thinking...', 'chat.no_sessions':'No previous chats',
    // Tools
    'tools.title':'AI TOOLS HUB', 'tools.count':'17 AI-powered tools',
    'tools.all':'All Tools', 'tools.brand':'Brand & Identity', 'tools.plan':'Planning & Strategy',
    'tools.legal':'Legal & Finance', 'tools.mkt':'Marketing', 'tools.sales':'Sales & Copy',
    'tools.result':'Generated Result', 'tools.generate':'⚡ Generate',
    // Vault
    'vault.title':'PROJECT VAULT', 'vault.all':'All Reports', 'vault.tools':'AI Tools',
    'vault.generator':'Business Plans', 'vault.market':'Market Research', 'vault.marketing':'Marketing',
    'vault.no_reports':'No reports yet in this category', 'vault.loading':'Loading your reports...',
    // Prompt
    'prompt.title':'PROMPT WRITER',
  },
  ar: {
    // Nav
    'nav.main':'الرئيسية', 'nav.tools_group':'أدوات الذكاء الاصطناعي', 'nav.account':'الحساب',
    'nav.dashboard':'لوحة التحكم', 'nav.chat':'المستشار الذكي', 'nav.tools':'كل الأدوات',
    'nav.generator':'مولّد الأعمال', 'nav.market':'أبحاث السوق',
    'nav.marketing':'بناء التسويق', 'nav.prompt':'كاتب البرومبت',
    'nav.vault':'خزنة المشاريع', 'nav.billing':'الفواتير والخطط', 'nav.settings':'الإعدادات', 'nav.learn':'تعلّم وانمُ', 'nav.academy':'أكاديمية الأعمال', 'nav.community':'المجتمع',
    // Common
    'btn.generate':'⚡ توليد', 'btn.generating':'جارٍ التوليد...', 'btn.copy':'نسخ',
    'btn.new':'← جديد', 'btn.cancel':'إلغاء', 'btn.save':'حفظ', 'btn.close':'✕ إغلاق',
    'btn.export_pdf':'↓ PDF', 'btn.export_docx':'↓ DOCX',
    'label.result':'النتيجة المولّدة', 'label.prev':'السابقة', 'label.loading':'جارٍ التحميل...',
    'msg.fill_required':'يرجى ملء جميع الحقول المطلوبة',
    'msg.copied':'تم النسخ إلى الحافظة!', 'msg.copy_fail':'فشل النسخ',
    // Dashboard
    'dash.welcome':'مرحباً بعودتك', 'dash.reports':'التقارير المولّدة', 'dash.chats':'محادثات الذكاء الاصطناعي',
    'dash.research':'أبحاث السوق', 'dash.plan':'الخطة الحالية', 'dash.upgrade':'ترقية →',
    'dash.recent':'التقارير الأخيرة', 'dash.view_all':'عرض الكل →', 'dash.usage':'نظرة عامة على الاستخدام',
    'dash.ai_tip':'◎ نصيحة المستشار الذكي', 'dash.new_report':'+ تقرير جديد',
    'dash.quick_chat':'المستشار الذكي', 'dash.quick_plan':'خطة عمل', 'dash.quick_market':'أبحاث السوق',
    'dash.quick_marketing':'خطة تسويقية', 'dash.quick_pitch':'عرض المستثمرين', 'dash.quick_all':'كل 17 أداة',
    'dash.quick_chat_sub':'اسأل أي شيء', 'dash.quick_plan_sub':'جاهز للمستثمرين',
    'dash.quick_market_sub':'رؤى عميقة', 'dash.quick_marketing_sub':'استراتيجية كاملة',
    'dash.quick_pitch_sub':'جمع التمويل', 'dash.quick_all_sub':'استعرض الأدوات',
    'dash.no_reports':'لا توجد تقارير بعد.<br>أنشئ أولها الآن!',
    'dash.platform_ready':'منصتك للذكاء الاصطناعي جاهزة. ماذا نبني اليوم؟',
    'dash.ask_ai':'◎ اسأل المستشار الذكي',
    // Billing
    'bill.title':'الفواتير والخطط', 'bill.pro_offer':'خطة Pro — الشهر الأول مجاناً',
    'bill.pro_desc':'ابدأ اشتراك Pro اليوم ولا تدفع شيئاً لمدة 30 يوماً. ألغِ في أي وقت. بدون مخاطرة.',
    'bill.claim':'احصل على الشهر المجاني →', 'bill.current_plan':'الخطة الحالية',
    'bill.member_since':'عضو منذ', 'bill.current':'✓ الخطة الحالية', 'bill.downgrade':'تخفيض',
    'bill.free_month':'🎁 الشهر الأول مجاناً', 'bill.pay_now':'ادفع 19$/شهرياً الآن',
    'bill.limit_title':'⚠ وصلت إلى حد الخطة المجانية',
    'bill.limit_desc':'قم بترقيتك إلى Pro لمواصلة إنشاء التقارير واستخدام الأدوات — الشهر الأول مجاناً.',
    'bill.pay_title':'ترقية الخطة', 'bill.pay_free_title':'🎁 تفعيل الشهر المجاني',
    'bill.pay_card_name':'اسم صاحب البطاقة', 'bill.pay_card_num':'رقم البطاقة',
    'bill.pay_expiry':'تاريخ الانتهاء', 'bill.pay_cvv':'رمز CVV',
    'bill.pay_save_card':'حفظ البطاقة للمدفوعات المستقبلية',
    'bill.pay_free_note':'🎁 الشهر الأول مجاناً — لن يتم محاسبتك اليوم. ستُحفظ بطاقتك وتُفوتر بعد 30 يوماً.',
    'bill.pay_secure':'دفع آمن. ألغِ في أي وقت من الإعدادات.',
    'bill.pay_confirm':'تأكيد والتفعيل', 'bill.pay_activate':'🎁 تفعيل الشهر المجاني',
    'bill.saved_cards':'البطاقات المحفوظة', 'bill.new_card':'بطاقة جديدة',
    'bill.coming_soon':'قريباً', 'bill.coming_soon_msg':'ستتوفر هذه الخطة قريباً.',
    // Settings
    'set.title':'الإعدادات', 'set.profile':'◑ الملف الشخصي', 'set.full_name':'الاسم الكامل',
    'set.save_profile':'حفظ الملف', 'set.language':'◑ اللغة', 'set.lang_note':'يغير لغة الواجهة في جميع أنحاء المنصة.',
    'set.payment':'◑ طرق الدفع', 'set.add_card':'+ إضافة طريقة دفع',
    'set.no_cards':'لا توجد طرق دفع محفوظة بعد.',
    'set.password':'◑ تغيير كلمة المرور', 'set.email':'البريد الإلكتروني',
    'set.old_pw':'كلمة المرور الحالية', 'set.new_pw':'كلمة مرور جديدة', 'set.confirm_pw':'تأكيد كلمة المرور',
    'set.update_pw':'تحديث كلمة المرور', 'set.sign_out':'تسجيل الخروج', 'set.sign_out_desc':'تسجيل الخروج من حسابك في Double Eight AI',
    'set.add_card_title':'إضافة طريقة دفع', 'set.card_name':'اسم صاحب البطاقة', 'set.card_num':'رقم البطاقة',
    'set.save_card':'حفظ البطاقة', 'set.set_default':'تعيين كافتراضي', 'set.default':'افتراضي',
    'set.card_note':'تفاصيل البطاقة مشفّرة. نحفظ آخر 4 أرقام فقط للعرض.',
    // Generator
    'gen.title':'مولّد الأعمال', 'gen.card_title':'⚡ إنشاء خطة عمل',
    'gen.name':'اسم الشركة *', 'gen.industry':'القطاع *', 'gen.model':'نموذج العمل *',
    'gen.market':'السوق المستهدف *', 'gen.investment':'الاستثمار الأولي', 'gen.location':'الموقع',
    'gen.goals':'الأهداف *', 'gen.btn':'⚡ إنشاء خطة عمل كاملة',
    'gen.result_title':'خطة العمل', 'gen.prev':'الخطط السابقة', 'gen.no_prev':'لا توجد خطط بعد',
    // Marketing
    'mkt.title':'بناء التسويق', 'mkt.card_title':'◈ بناء الاستراتيجية',
    'mkt.name':'اسم الشركة *', 'mkt.industry':'القطاع *', 'mkt.audience':'الجمهور المستهدف *',
    'mkt.goals':'أهداف التسويق *', 'mkt.budget':'الميزانية الشهرية', 'mkt.presence':'الحضور الحالي',
    'mkt.timeline':'الجدول الزمني', 'mkt.btn':'◈ بناء استراتيجية تسويقية',
    'mkt.result_title':'استراتيجية التسويق', 'mkt.prev':'الاستراتيجيات السابقة', 'mkt.no_prev':'لا توجد استراتيجيات بعد',
    // Market Research
    'mr.title':'أبحاث السوق', 'mr.card_title':'◉ بحث جديد',
    'mr.niche':'القطاع / المجال *', 'mr.region':'المنطقة المستهدفة', 'mr.demo':'الفئة الديموغرافية',
    'mr.focus':'محور البحث', 'mr.budget':'نطاق الميزانية',
    'mr.btn':'◉ إنشاء تقرير بحثي',
    'mr.result_title':'تقرير أبحاث السوق', 'mr.prev':'الأبحاث السابقة', 'mr.no_prev':'لا توجد تقارير بحثية بعد',
    // Chat
    'chat.title':'المستشار الذكي', 'chat.history':'السجل', 'chat.new_chat':'+ محادثة جديدة',
    'chat.tab_chat':'💬 المحادثة', 'chat.tab_history':'🕐 السجل',
    'chat.placeholder':'اسأل أي شيء عن الأعمال أو الاستراتيجية أو التسويق...',
    'chat.thinking':'المستشار الذكي يفكر...', 'chat.no_sessions':'لا توجد محادثات سابقة',
    // Tools
    'tools.title':'مركز الأدوات الذكية', 'tools.count':'17 أداة ذكاء اصطناعي',
    'tools.all':'كل الأدوات', 'tools.brand':'الهوية والعلامة', 'tools.plan':'التخطيط والاستراتيجية',
    'tools.legal':'القانون والمالية', 'tools.mkt':'التسويق', 'tools.sales':'المبيعات والمحتوى',
    'tools.result':'النتيجة المولّدة', 'tools.generate':'⚡ توليد',
    // Vault
    'vault.title':'خزنة المشاريع', 'vault.all':'كل التقارير', 'vault.tools':'أدوات AI',
    'vault.generator':'خطط الأعمال', 'vault.market':'أبحاث السوق', 'vault.marketing':'التسويق',
    'vault.no_reports':'لا توجد تقارير في هذه الفئة', 'vault.loading':'جارٍ تحميل تقاريرك...',
    // Prompt
    'prompt.title':'كاتب البرومبت',
  }
};

/* ── i18n helper ── */
function t(key) {
  const lang = localStorage.getItem('d8_lang') || 'en';
  return (T[lang] && T[lang][key]) || T['en'][key] || key;
}

/* ── Apply RTL/LTR to document ── */
function applyDir(lang) {
  const isAr = lang === 'ar';
  document.documentElement.setAttribute('dir', isAr ? 'rtl' : 'ltr');
  document.documentElement.setAttribute('lang', lang);
  // Re-translate all elements with data-i18n attribute
  document.querySelectorAll('[data-i18n]').forEach(el => {
    el.textContent = t(el.dataset.i18n);
  });
}

/* ── TOAST ── */
const Toast = {
  container: null,
  init() {
    if(!this.container) {
      this.container = document.createElement('div');
      this.container.className = 'toast-container';
      document.body.appendChild(this.container);
    }
  },
  show(msg, type='info', duration=3500) {
    this.init();
    const tEl = document.createElement('div');
    tEl.className = `toast ${type}`;
    const icons = { success:'✓', error:'✕', info:'◎' };
    tEl.innerHTML = `<span style="color:${type==='success'?'#22c55e':type==='error'?'#ef4444':'#f59e0b'}">${icons[type]||'◎'}</span> ${msg}`;
    this.container.appendChild(tEl);
    setTimeout(() => { tEl.style.opacity='0'; tEl.style.transform='translateX(20px)'; tEl.style.transition='.3s'; setTimeout(()=>tEl.remove(),300); }, duration);
  }
};

/* ── MARKDOWN RENDERER ── */
function renderMarkdown(md) {
  if(!md) return '';
  return md
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code style="background:rgba(255,255,255,0.08);padding:1px 5px;border-radius:4px;font-family:monospace;font-size:.85em">$1</code>')
    .replace(/^\|(.+)\|$/gm, (m,r) => '<tr>'+r.split('|').map(c=>`<td>${c.trim()}</td>`).join('')+'</tr>')
    .replace(/(<tr>.*<\/tr>\n?)+/g, m => `<table>${m}</table>`)
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>\n?)+/g, m => `<ul>${m}</ul>`)
    .replace(/^\d+\. (.+)$/gm, '<li>$1</li>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/^(?!<[htulp])(.+)$/gm, '<p>$1</p>');
}

/* ── SIDEBAR / LAYOUT BUILDER ── */
function buildLayout(pageId) {
  const user = Auth.user();
  const lang = localStorage.getItem('d8_lang') || 'en';
  applyDir(lang);

  const nav = [
    { group: t('nav.main'), items:[
      { id:'dashboard', icon:'⊞', labelKey:'nav.dashboard', href:'dashboard.html' },
      { id:'chat', icon:'◎', labelKey:'nav.chat', href:'chat.html' },
    ]},
    { group: t('nav.tools_group'), items:[
      { id:'tools', icon:'◫', labelKey:'nav.tools', href:'tools.html' },
      { id:'generator', icon:'⚡', labelKey:'nav.generator', href:'generator.html' },
      { id:'market', icon:'◉', labelKey:'nav.market', href:'market.html' },
      { id:'marketing', icon:'◈', labelKey:'nav.marketing', href:'marketing.html' },
      { id:'prompt', icon:'✦', labelKey:'nav.prompt', href:'prompt.html' },
    ]},
    { group: t('nav.account'), items:[
      { id:'vault', icon:'▣', labelKey:'nav.vault', href:'vault.html' },
      { id:'billing', icon:'◐', labelKey:'nav.billing', href:'billing.html' },
      { id:'settings', icon:'◑', labelKey:'nav.settings', href:'settings.html' },
    ]},
    { group: t('nav.learn'), items:[
      { id:'academy', icon:'🎓', labelKey:'nav.academy', href:'academy.html' },
      { id:'community', icon:'🌍', labelKey:'nav.community', href:'community.html' },
    ]}
  ];

  const sidebar = document.querySelector('.sidebar');
  if(!sidebar) return;
  sidebar.innerHTML = `
    <div class="sidebar-logo">
      <div class="logo-text">DOUBLE EIGHT</div>
      <div class="logo-sub">AI Platform</div>
    </div>
    <nav class="sidebar-nav">
      ${nav.map(g=>`
        <div class="nav-group">
          <div class="nav-group-label">${g.group}</div>
          ${g.items.map(item=>`
            <div class="nav-item ${item.id===pageId?'active':''}" onclick="window.location.href='${item.href}'">
              <span class="nav-icon">${item.icon}</span>
              <span>${t(item.labelKey)}</span>
            </div>
          `).join('')}
        </div>
      `).join('')}
    </nav>
    <div class="sidebar-footer">
      <div class="sidebar-user">
        <div class="user-avatar">${(user.name||'U')[0].toUpperCase()}</div>
        <div>
          <div class="user-name">${user.name||'User'}</div>
          <div class="user-plan">${user.membership?.plan||'free'} plan</div>
        </div>
        <button class="btn-logout" onclick="Auth.logout()">↩</button>
      </div>
    </div>
  `;

  // Inject overlay + sidebar close button
  if(!document.getElementById('main-overlay')) {
    const overlay = document.createElement('div');
    overlay.id = 'main-overlay';
    overlay.className = 'sidebar-overlay';
    overlay.onclick = () => { sidebar.classList.remove('open'); overlay.classList.remove('show'); };
    document.body.insertBefore(overlay, document.body.firstChild);
  }

  // Hamburger setup — find all .hamburger buttons and wire them
  document.querySelectorAll('.hamburger').forEach(btn => {
    btn.onclick = () => {
      sidebar.classList.toggle('open');
      const ov = document.getElementById('main-overlay');
      if(ov) ov.classList.toggle('show');
    };
  });
}

/* ── GENERATE BUTTON LOADING STATE ── */
function setGenerating(btnEl, loaderId, isLoading) {
  if (!btnEl) return;
  const textEl = btnEl.querySelector('.gen-btn-text') || btnEl;
  const loaderEl = loaderId ? document.getElementById(loaderId) : btnEl.querySelector('.loader');
  if(isLoading) {
    btnEl.disabled = true;
    if(loaderEl) loaderEl.style.display = 'inline-block';
    const txt = btnEl.querySelector('.gen-btn-text');
    if(txt) txt.textContent = t('btn.generating');
    else if(btnEl !== loaderEl) {
      // Store original text
      btnEl._origText = btnEl._origText || btnEl.textContent;
      if(loaderEl) btnEl.textContent = '';
      // Re-add loader
      if(loaderEl) btnEl.appendChild(loaderEl);
      // Append generating text
      const span = document.createElement('span');
      span.className = 'gen-btn-text-tmp';
      span.textContent = ' ' + t('btn.generating');
      btnEl.appendChild(span);
    }
  } else {
    btnEl.disabled = false;
    if(loaderEl) loaderEl.style.display = 'none';
    const tmp = btnEl.querySelector('.gen-btn-text-tmp');
    if(tmp) tmp.remove();
  }
}

/* ── MODAL HELPERS ── */
function openModal(id) { document.getElementById(id)?.classList.add('open'); }
function closeModal(id) { document.getElementById(id)?.classList.remove('open'); }

/* ── COPY TO CLIPBOARD ── */
function copyText(text) {
  navigator.clipboard.writeText(text)
    .then(() => Toast.show(t('msg.copied'), 'success'))
    .catch(() => Toast.show(t('msg.copy_fail'), 'error'));
}

/* ── EXPORT HELPERS ── */
async function exportReport(reportId, format) {
  const url = `${API}/tools/export/${reportId}?format=${format}`;
  const r = await fetch(url, { headers: { 'Authorization': `Bearer ${Auth.token()}` } });
  if(!r.ok) { Toast.show('Export failed','error'); return; }
  const blob = await r.blob();
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `report.${format}`;
  a.click();
  Toast.show(`Exported as ${format.toUpperCase()}`, 'success');
}

/* ── DATE FORMATTER ── */
function timeAgo(d) {
  const diff = Date.now() - new Date(d).getTime();
  const m = Math.floor(diff/60000);
  if(m<1) return 'just now';
  if(m<60) return `${m}m ago`;
  const h = Math.floor(m/60);
  if(h<24) return `${h}h ago`;
  return Math.floor(h/24)+'d ago';
}

/* ── Apply language direction on page load ── */
(function() {
  const lang = localStorage.getItem('d8_lang') || 'en';
  applyDir(lang);
})();
