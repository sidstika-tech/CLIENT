/* ── DOUBLE EIGHT AI — CORE JS ─────────────────────────────────────────── */
/* API base — auto-detects environment:
   • localhost / 127.0.0.1 / file://  →  http://localhost:5000/api  (local dev server)
   • anything else                    →  https://api.doubleeight.online/api  (production)
   To override: set window.__API_BASE__ before loading core.js, OR
   localStorage.setItem('d8_api', 'http://your-custom-host:port/api'). */
const API = (() => {
  if (typeof window !== 'undefined') {
    // 1. Manual override via localStorage (highest priority — survives reloads)
    const override = (function(){ try { return localStorage.getItem('d8_api'); } catch { return null; } })();
    if (override) return override;
    // 2. Window global injected before this script
    if (window.__API_BASE__) return window.__API_BASE__;
    // 3. Auto-detect: localhost / 127.0.0.1 / loopback → local backend
    const h = window.location.hostname;
    if (h === 'localhost' || h === '127.0.0.1' || h === '0.0.0.0' || h === '' /* file:// */) {
      return 'http://localhost:5000/api';
    }
  }
  // 4. Default: production
  return 'https://api.doubleeight.online/api';
})();
// Useful for debugging — opens devtools and reveals which API the page is talking to
if (typeof window !== 'undefined') window.__API__ = API;

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
    'nav.dashboard':'Dashboard', 'nav.dna':'Business DNA', 'nav.package':'Launch Package', 'nav.chat':'AI Advisor', 'nav.tools':'All Tools',
    'nav.generator':'Business Generator', 'nav.market':'Market Research',
    'nav.marketing':'Marketing Builder', 'nav.prompt':'Prompt Writer',
    'nav.competitor':'Competitor Tracker',
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
    'nav.dashboard':'لوحة التحكم', 'nav.dna':'هويتي التجارية', 'nav.package':'حزمة الإطلاق', 'nav.chat':'المستشار الذكي', 'nav.tools':'كل الأدوات',
    'nav.generator':'مولّد الأعمال', 'nav.market':'أبحاث السوق',
    'nav.marketing':'بناء التسويق', 'nav.prompt':'كاتب البرومبت',
    'nav.competitor':'متعقّب المنافسين',
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
      { id:'dna', icon:'🧬', labelKey:'nav.dna', href:'dna.html' },
      { id:'package', icon:'🚀', labelKey:'nav.package', href:'launch-package.html' },
      { id:'chat', icon:'◎', labelKey:'nav.chat', href:'chat.html' },
    ]},
    { group: t('nav.tools_group'), items:[
      { id:'tools', icon:'◫', labelKey:'nav.tools', href:'tools.html' },
      { id:'competitor', icon:'⚔', labelKey:'nav.competitor', href:'competitor.html' },
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

  // Inject sidebar close button inside sidebar
  if(!sidebar.querySelector('.sidebar-close-btn')) {
    const closeBtn = document.createElement('button');
    closeBtn.className = 'sidebar-close-btn';
    closeBtn.innerHTML = '✕';
    closeBtn.title = 'Close menu';
    closeBtn.onclick = () => {
      sidebar.classList.remove('open');
      const ov = document.getElementById('main-overlay');
      if(ov) ov.classList.remove('show');
    };
    sidebar.appendChild(closeBtn);
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

/* ══════════════════════════════════════════════════════════════════
   NOTIFICATIONS BELL — auto-injected into every page's topbar
   Polls /api/notifications/unread-count every 60s.
   Click → opens a drawer listing all notifications.
══════════════════════════════════════════════════════════════════ */
const Notifications = {
  pollInterval: null,
  cache: [],

  // Inject CSS once
  injectStyles() {
    if (document.getElementById('notif-styles')) return;
    const s = document.createElement('style');
    s.id = 'notif-styles';
    s.textContent = `
      .notif-bell{position:relative;background:none;border:1px solid var(--border);width:36px;height:36px;border-radius:9px;cursor:pointer;color:var(--text2);font-size:1.05rem;display:flex;align-items:center;justify-content:center;transition:.15s;}
      .notif-bell:hover{border-color:var(--border-gold);color:var(--gold);}
      .notif-bell .nb-badge{position:absolute;top:-5px;right:-5px;min-width:18px;height:18px;padding:0 4px;border-radius:9px;background:#ef4444;color:#fff;font-size:.62rem;font-weight:700;display:none;align-items:center;justify-content:center;border:2px solid var(--bg2,#0d0d1c);}
      .notif-bell .nb-badge.show{display:flex;}
      .notif-drawer-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.5);z-index:990;opacity:0;pointer-events:none;transition:.2s;}
      .notif-drawer-overlay.open{opacity:1;pointer-events:auto;}
      .notif-drawer{position:fixed;top:0;right:0;height:100vh;width:380px;max-width:92vw;background:var(--bg2,#0d0d1c);border-left:1px solid var(--border);z-index:991;display:flex;flex-direction:column;transform:translateX(110%);transition:transform .25s;}
      [dir="rtl"] .notif-drawer{right:auto;left:0;border-left:none;border-right:1px solid var(--border);transform:translateX(-110%);}
      .notif-drawer.open{transform:translateX(0);}
      .notif-drawer-header{padding:1.1rem 1.25rem;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;gap:.5rem;}
      .notif-drawer-header h3{font-family:'Bebas Neue',cursive;font-size:1.1rem;letter-spacing:1px;color:var(--gold);}
      .notif-drawer-close{background:none;border:none;color:var(--text3);font-size:1.2rem;cursor:pointer;width:32px;height:32px;border-radius:7px;display:flex;align-items:center;justify-content:center;}
      .notif-drawer-close:hover{background:var(--surface);color:var(--text);}
      .notif-actions{display:flex;gap:.4rem;padding:.6rem 1.25rem;border-bottom:1px solid var(--border);font-size:.74rem;}
      .notif-actions button{background:none;border:none;color:var(--text3);cursor:pointer;font-family:'Outfit',sans-serif;font-size:.74rem;padding:.25rem .5rem;border-radius:5px;transition:.15s;}
      .notif-actions button:hover{color:var(--gold);background:var(--surface);}
      .notif-list{flex:1;overflow-y:auto;padding:.5rem;}
      .notif-empty{padding:3rem 1.5rem;text-align:center;color:var(--text3);font-size:.85rem;line-height:1.7;}
      .notif-empty .ne-icon{font-size:2.5rem;margin-bottom:.85rem;opacity:.4;}
      .notif-item{display:flex;gap:.8rem;padding:.8rem .95rem;border-radius:9px;cursor:pointer;transition:.15s;border:1px solid transparent;margin-bottom:.35rem;position:relative;}
      .notif-item:hover{background:var(--surface);border-color:var(--border);}
      .notif-item.unread{background:rgba(245,158,11,0.04);border-color:rgba(245,158,11,0.15);}
      .notif-item.unread::before{content:'';position:absolute;top:.95rem;right:.7rem;width:7px;height:7px;border-radius:50%;background:var(--gold);}
      [dir="rtl"] .notif-item.unread::before{right:auto;left:.7rem;}
      .notif-icon{width:36px;height:36px;border-radius:9px;background:var(--gold-dim);display:flex;align-items:center;justify-content:center;font-size:1.05rem;flex-shrink:0;}
      .notif-content{flex:1;min-width:0;padding-right:.5rem;}
      .notif-title{font-size:.85rem;font-weight:600;color:var(--text);line-height:1.4;margin-bottom:.25rem;}
      .notif-body{font-size:.76rem;color:var(--text3);line-height:1.55;white-space:pre-line;max-height:80px;overflow:hidden;}
      .notif-meta{display:flex;align-items:center;justify-content:space-between;margin-top:.4rem;gap:.5rem;}
      .notif-time{font-size:.7rem;color:var(--text3);}
      .notif-action{font-size:.72rem;color:var(--gold);font-weight:600;text-decoration:none;}
      .notif-action:hover{text-decoration:underline;}
    `;
    document.head.appendChild(s);
  },

  // Inject bell into the topbar-right of every page
  injectBell() {
    const right = document.querySelector('.topbar-right');
    if (!right || document.getElementById('notif-bell')) return;
    this.injectStyles();
    const btn = document.createElement('button');
    btn.id = 'notif-bell';
    btn.className = 'notif-bell';
    btn.title = 'Notifications';
    btn.innerHTML = '🔔<span class="nb-badge" id="notif-badge">0</span>';
    btn.onclick = () => this.open();
    right.insertBefore(btn, right.firstChild);

    // Build the drawer
    if (!document.getElementById('notif-drawer-overlay')) {
      const overlay = document.createElement('div');
      overlay.id = 'notif-drawer-overlay';
      overlay.className = 'notif-drawer-overlay';
      overlay.onclick = () => this.close();
      const drawer = document.createElement('aside');
      drawer.id = 'notif-drawer';
      drawer.className = 'notif-drawer';
      drawer.innerHTML = `
        <div class="notif-drawer-header">
          <h3>🔔 NOTIFICATIONS</h3>
          <button class="notif-drawer-close" onclick="Notifications.close()">✕</button>
        </div>
        <div class="notif-actions">
          <button onclick="Notifications.markAllRead()">✓ Mark all as read</button>
          <button onclick="Notifications.clearAll()" style="margin-left:auto;color:#f87171">Clear all</button>
        </div>
        <div class="notif-list" id="notif-list">
          <div class="notif-empty">Loading…</div>
        </div>
      `;
      document.body.appendChild(overlay);
      document.body.appendChild(drawer);
    }
  },

  async fetchCount() {
    try {
      const r = await api.get('/notifications/unread-count');
      const badge = document.getElementById('notif-badge');
      if (!badge) return;
      const n = r?.count || 0;
      badge.textContent = n > 99 ? '99+' : n;
      badge.classList.toggle('show', n > 0);
    } catch {}
  },

  async fetchList() {
    try {
      const r = await api.get('/notifications?limit=50');
      this.cache = r?.notifications || [];
      this.renderList();
    } catch {
      this.renderList();
    }
  },

  renderList() {
    const list = document.getElementById('notif-list');
    if (!list) return;
    if (!this.cache.length) {
      list.innerHTML = `
        <div class="notif-empty">
          <div class="ne-icon">🔕</div>
          <div>No notifications yet.</div>
          <div style="font-size:.75rem;margin-top:.4rem;opacity:.7">Track a competitor or complete an Academy session — your updates appear here.</div>
        </div>`;
      return;
    }
    list.innerHTML = this.cache.map(n => `
      <div class="notif-item ${n.read ? '' : 'unread'}" onclick="Notifications.handleClick('${n._id}', ${n.actionUrl ? `'${n.actionUrl}'` : 'null'})">
        <div class="notif-icon">${n.icon || '◎'}</div>
        <div class="notif-content">
          <div class="notif-title">${n.title}</div>
          <div class="notif-body">${(n.body || '').replace(/</g,'&lt;')}</div>
          <div class="notif-meta">
            <span class="notif-time">${timeAgo(n.createdAt)}</span>
            ${n.actionLabel ? `<span class="notif-action">${n.actionLabel}</span>` : ''}
          </div>
        </div>
      </div>
    `).join('');
  },

  async handleClick(id, actionUrl) {
    await api.put(`/notifications/${id}/read`, {});
    this.fetchCount();
    if (actionUrl && actionUrl !== 'null') {
      // Internal route handling — strip leading /
      window.location.href = actionUrl.startsWith('/') ? actionUrl.slice(1) : actionUrl;
    } else {
      // Just mark as read in UI
      const item = this.cache.find(c => c._id === id);
      if (item) item.read = true;
      this.renderList();
    }
  },

  async markAllRead() {
    await api.put('/notifications/read-all', {});
    this.cache.forEach(n => n.read = true);
    this.renderList();
    this.fetchCount();
    Toast.show('All marked as read', 'success');
  },

  async clearAll() {
    if (!confirm('Clear all notifications? This cannot be undone.')) return;
    await api.del('/notifications/clear-all');
    this.cache = [];
    this.renderList();
    this.fetchCount();
    Toast.show('Cleared', 'success');
  },

  open() {
    document.getElementById('notif-drawer-overlay')?.classList.add('open');
    document.getElementById('notif-drawer')?.classList.add('open');
    this.fetchList();
  },

  close() {
    document.getElementById('notif-drawer-overlay')?.classList.remove('open');
    document.getElementById('notif-drawer')?.classList.remove('open');
  },

  start() {
    if (!Auth.token()) return;
    this.injectBell();
    this.fetchCount();
    if (this.pollInterval) clearInterval(this.pollInterval);
    this.pollInterval = setInterval(() => this.fetchCount(), 60000);
  },
};

// Auto-start after sidebar/topbar is built — sits at the end of buildLayout
const _originalBuildLayout = buildLayout;
buildLayout = function(pageId) {
  _originalBuildLayout(pageId);
  // Topbar exists now — inject the bell
  setTimeout(() => Notifications.start(), 0);
};
