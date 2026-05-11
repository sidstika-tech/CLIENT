(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=`/api`;function t(){return localStorage.getItem(`d8_token`)}function n(e={}){let n=t();return{"Content-Type":`application/json`,...n?{Authorization:`Bearer ${n}`}:{},...e}}async function r(t,r,i){let a=await fetch(`${e}${r}`,{method:t,headers:n(),...i?{body:JSON.stringify(i)}:{}}),o=await a.json();if(!a.ok)throw Error(o.error||`Request failed`);return o}var i={get:e=>r(`GET`,e),post:(e,t)=>r(`POST`,e,t),put:(e,t)=>r(`PUT`,e,t),delete:e=>r(`DELETE`,e),streamMessage:async(n,r,i,a)=>{let o=t();try{let t=(await fetch(`${e}/chat/message`,{method:`POST`,headers:{"Content-Type":`application/json`,...o?{Authorization:`Bearer ${o}`}:{}},body:JSON.stringify(n)})).body.getReader(),s=new TextDecoder,c=``,l=null;for(;;){let{done:e,value:n}=await t.read();if(e)break;c+=s.decode(n,{stream:!0});let i=c.split(`
`);c=i.pop();for(let e of i)if(e.startsWith(`data: `))try{let t=JSON.parse(e.slice(6));t.chunk&&r(t.chunk),t.done&&(l=t.sessionId),t.error&&a(t.error)}catch{}}i(l)}catch(e){a(e.message)}}},a=null,o=[];function s(){return a}function c(){return!!a}function l(e){return o.push(e),()=>{o=o.filter(t=>t!==e)}}function u(){o.forEach(e=>e(a))}async function ee(){if(localStorage.getItem(`d8_token`))try{a=(await i.get(`/auth/me`)).user,u()}catch{localStorage.removeItem(`d8_token`)}}async function d(e,t){let n=await i.post(`/auth/login`,{email:e,password:t});return localStorage.setItem(`d8_token`,n.token),a=n.user,u(),n}function f(){localStorage.removeItem(`d8_token`),a=null,u(),window.location.hash=`#/`}function te(e){e.innerHTML=`
    <div class="landing-wrap" style="overflow-y:auto;height:calc(100vh - var(--header-h));">

      <!-- ══ HERO ══ -->
      <section class="hero">
        <div class="hero-ambient"></div>

        <div class="hero-eyebrow">
          AI-Powered Business Intelligence
        </div>

        <h1 class="hero-title">
          Build Your Business<br>with <em>Double Eight AI</em>
        </h1>

        <p class="hero-desc">
          From brand identity to market research, legal documents to marketing strategies — every tool your business needs, powered by advanced AI.
        </p>

        <div class="hero-cta-group">
          <a href="#/register" class="btn btn-primary btn-lg">Start Free Today</a>
          <a href="#/login" class="btn btn-ghost btn-lg">Sign In →</a>
        </div>

        <div class="hero-proof">
          <div class="hero-proof-item">
            <div class="hero-proof-dot"></div>
            No credit card required
          </div>
          <div class="hero-proof-item">
            <div class="hero-proof-dot"></div>
            17+ AI Business Tools
          </div>
          <div class="hero-proof-item">
            <div class="hero-proof-dot"></div>
            PDF, DOCX & PPTX Export
          </div>
          <div class="hero-proof-item">
            <div class="hero-proof-dot"></div>
            Powered by Llama 3.3
          </div>
        </div>
      </section>

      <!-- ══ TOOLS SECTION ══ -->
      <section class="landing-section landing-section-border">
        <div style="display:flex;align-items:flex-end;justify-content:space-between;flex-wrap:wrap;gap:24px;">
          <div>
            <div class="section-label">Our Tools</div>
            <h2 class="section-heading">Everything Your Business Needs</h2>
            <p class="section-sub">Five intelligent tool suites working together — from idea to launch and beyond.</p>
          </div>
          <a href="#/register" class="btn btn-gold-outline">Explore All Tools →</a>
        </div>

        <div class="tools-grid">
          <div class="tool-card" onclick="location.hash='#/register'">
            <div class="tool-card-num">01</div>
            <span class="tool-card-icon">💬</span>
            <div class="tool-card-name">AI Business Chat</div>
            <p class="tool-card-desc">Your 24/7 AI business advisor. Get strategic advice, answers, and insights for any business challenge — instantly, with full conversation history.</p>
            <span class="tool-card-arrow">↗</span>
          </div>

          <div class="tool-card" onclick="location.hash='#/register'">
            <div class="tool-card-num">02</div>
            <span class="tool-card-icon">🎨</span>
            <div class="tool-card-name">Brand & Identity</div>
            <p class="tool-card-desc">Generate complete brand kits with logo concepts, color palettes, typography, brand voice, business names, domain suggestions, and memorable slogans.</p>
            <span class="tool-card-arrow">↗</span>
          </div>

          <div class="tool-card" onclick="location.hash='#/register'">
            <div class="tool-card-num">03</div>
            <span class="tool-card-icon">📋</span>
            <div class="tool-card-name">Strategy & Planning</div>
            <p class="tool-card-desc">Comprehensive business plans, SWOT analyses, financial projections, go-to-market strategies, and executive roadmaps — exportable as PDF or DOCX.</p>
            <span class="tool-card-arrow">↗</span>
          </div>

          <div class="tool-card" onclick="location.hash='#/register'">
            <div class="tool-card-num">04</div>
            <span class="tool-card-icon">📊</span>
            <div class="tool-card-name">Market Research</div>
            <p class="tool-card-desc">Deep-dive market analysis, niche identification, competitive intelligence, audience profiling, and product winner discovery for any industry.</p>
            <span class="tool-card-arrow">↗</span>
          </div>

          <div class="tool-card" onclick="location.hash='#/register'">
            <div class="tool-card-num">05</div>
            <span class="tool-card-icon">📣</span>
            <div class="tool-card-name">Marketing & Sales</div>
            <p class="tool-card-desc">Full marketing strategies, 30-day content calendars, SEO plans, ad copy, cold email sequences, and sales scripts — ready to execute immediately.</p>
            <span class="tool-card-arrow">↗</span>
          </div>

          <div class="tool-card" onclick="location.hash='#/register'" style="background:linear-gradient(145deg,rgba(200,164,90,0.05),var(--bg-card));">
            <div class="tool-card-num" style="color:var(--gold);">✦ NEW</div>
            <span class="tool-card-icon">🪄</span>
            <div class="tool-card-name">Prompt Writer</div>
            <p class="tool-card-desc">AI-engineered prompts calibrated per platform — Grok, ChatGPT, Claude, Midjourney, Runway & more. Image, video, cinema, script, and research prompts with PDF export.</p>
            <span class="tool-card-arrow">↗</span>
          </div>
        </div>
      </section>

      <!-- ══ ROADMAP ══ -->
      <section class="landing-section landing-section-border">
        <div style="text-align:center;margin-bottom:0;">
          <div class="section-label" style="justify-content:center;display:flex;">The Path to Success</div>
          <h2 class="section-heading" style="text-align:center;">Zero to Launch in 5 Stages</h2>
          <p class="section-sub" style="margin:0 auto;text-align:center;">A structured journey from concept to revenue — each stage building on the last.</p>
        </div>

        <div class="roadmap">
          <div class="roadmap-step">
            <div class="roadmap-num">1</div>
            <div class="roadmap-label">Brand & Identity</div>
            <div class="roadmap-sub">Name, logo, voice, colors</div>
          </div>
          <div class="roadmap-step">
            <div class="roadmap-num">2</div>
            <div class="roadmap-label">Plan & Strategy</div>
            <div class="roadmap-sub">Business plan, roadmap</div>
          </div>
          <div class="roadmap-step">
            <div class="roadmap-num">3</div>
            <div class="roadmap-label">Legal & Finance</div>
            <div class="roadmap-sub">Contracts, pitch deck</div>
          </div>
          <div class="roadmap-step">
            <div class="roadmap-num">4</div>
            <div class="roadmap-label">Marketing & Ads</div>
            <div class="roadmap-sub">SEO, content, campaigns</div>
          </div>
          <div class="roadmap-step">
            <div class="roadmap-num">5</div>
            <div class="roadmap-label">Sales & Close</div>
            <div class="roadmap-sub">Emails, scripts, scripts</div>
          </div>
        </div>
      </section>

      <!-- ══ PRICING ══ -->
      <section class="landing-section landing-section-border">
        <div style="text-align:center;">
          <div class="section-label" style="justify-content:center;display:flex;">Pricing</div>
          <h2 class="section-heading" style="text-align:center;">Start Free, Scale Fast</h2>
          <p class="section-sub" style="margin:0 auto;text-align:center;">No credit card required. Upgrade when you're ready.</p>
        </div>

        <div class="pricing-grid">
          <div class="pricing-card">
            <div class="plan-name">Free</div>
            <div class="plan-price"><sup>$</sup>0<sub>/mo</sub></div>
            <p class="plan-tagline">Start exploring. No risk.</p>
            <ul class="plan-features">
              <li>20 AI chat messages / day</li>
              <li>3 report generations</li>
              <li>Basic tools access</li>
              <li>HTML export</li>
            </ul>
            <a href="#/register" class="btn btn-secondary" style="width:100%;">Get Started Free</a>
          </div>

          <div class="pricing-card featured">
            <div class="plan-name">Pro</div>
            <div class="plan-price"><sup>$</sup>29<sub>/mo</sub></div>
            <p class="plan-tagline">Everything you need to grow.</p>
            <ul class="plan-features">
              <li>Unlimited AI chat messages</li>
              <li>Unlimited report generations</li>
              <li>All 17+ AI business tools</li>
              <li>PDF, DOCX, PPTX export</li>
              <li>Priority AI response speed</li>
              <li>Full tool history</li>
            </ul>
            <a href="#/register" class="btn btn-primary" style="width:100%;">Start Pro Plan</a>
          </div>

          <div class="pricing-card">
            <div class="plan-name">Enterprise</div>
            <div class="plan-price" style="font-size:2.2rem;">Custom</div>
            <p class="plan-tagline">For teams and organizations.</p>
            <ul class="plan-features">
              <li>Everything in Pro</li>
              <li>Team seats & management</li>
              <li>Custom AI fine-tuning</li>
              <li>Dedicated support</li>
              <li>SLA guarantee</li>
            </ul>
            <a href="#/membership" class="btn btn-ghost btn-gold-outline" style="width:100%;">Contact Sales</a>
          </div>
        </div>
      </section>

      <!-- ══ FOOTER ══ -->
      <footer class="landing-footer">
        <span>© 2025 Double Eight AI</span>
        <span style="color:var(--gold);letter-spacing:3px;">✦</span>
        <span>doubleeight.online</span>
      </footer>

    </div>
  `}var p=null;function ne(){return p||(p=document.createElement(`div`),p.className=`toast-container`,document.body.appendChild(p)),p}function re(e,t=`info`,n=3500){let r=ne(),i=document.createElement(`div`);i.className=`toast ${t}`,i.innerHTML=`<span class="toast-icon">${{success:`✓`,error:`✕`,info:`ℹ`,warning:`⚠`}[t]||`ℹ`}</span><span>${e}</span>`,r.appendChild(i),setTimeout(()=>{i.style.opacity=`0`,i.style.transform=`translateX(20px)`,i.style.transition=`all 0.3s ease`,setTimeout(()=>i.remove(),300)},n)}var m=e=>re(e,`success`),h=e=>re(e,`error`);function ie(e){e.innerHTML=`
    <div class="auth-page">
      <div class="auth-card">
        <div class="auth-logo">
          <div class="logo-badge">88</div>
          <div class="logo-text">
            <span class="logo-name">Double Eight</span>
            <span class="logo-sub">AI Business Builder</span>
          </div>
        </div>

        <h1 class="auth-title">Welcome Back</h1>
        <p class="auth-sub">Sign in to your account to continue</p>

        <div class="form-group">
          <label class="form-label">Email Address</label>
          <input class="form-input" type="email" id="email" placeholder="your@email.com" autocomplete="email" />
        </div>

        <div class="form-group">
          <label class="form-label">Password</label>
          <input class="form-input" type="password" id="password" placeholder="Your password" autocomplete="current-password" />
        </div>

        <button class="btn btn-primary" id="login-btn" style="width:100%;margin-top:8px;">
          Sign In →
        </button>

        <div class="auth-divider">or</div>

        <p style="text-align:center;font-size:13.5px;color:var(--text-muted);">
          Don't have an account?
          <a href="#/register" style="color:var(--gold);text-decoration:none;font-weight:500;"> Create one free</a>
        </p>

        <p style="text-align:center;margin-top:24px;">
          <a href="#/" style="font-size:12px;color:var(--text-muted);text-decoration:none;">← Back to home</a>
        </p>
      </div>
    </div>
  `,document.getElementById(`login-btn`)?.addEventListener(`click`,async()=>{let e=document.getElementById(`email`)?.value?.trim(),t=document.getElementById(`password`)?.value;if(!e||!t){h(`Please fill in all fields`);return}let n=document.getElementById(`login-btn`);n.disabled=!0,n.textContent=`Signing in…`;try{let n=await i.post(`/auth/login`,{email:e,password:t});d(n.token,n.user)}catch(e){h(e.message||`Login failed`),n.disabled=!1,n.textContent=`Sign In →`}}),document.getElementById(`password`)?.addEventListener(`keydown`,e=>{e.key===`Enter`&&document.getElementById(`login-btn`)?.click()})}function ae(e){e.innerHTML=`
    <div class="auth-page">
      <div class="auth-card">
        <div class="auth-logo">
          <div class="logo-badge">88</div>
          <div class="logo-text">
            <span class="logo-name">Double Eight</span>
            <span class="logo-sub">AI Business Builder</span>
          </div>
        </div>

        <h1 class="auth-title">Create Account</h1>
        <p class="auth-sub">Start free — no credit card required</p>

        <div class="form-group">
          <label class="form-label">Full Name</label>
          <input class="form-input" type="text" id="name" placeholder="Your full name" autocomplete="name" />
        </div>

        <div class="form-group">
          <label class="form-label">Email Address</label>
          <input class="form-input" type="email" id="email" placeholder="your@email.com" autocomplete="email" />
        </div>

        <div class="form-group">
          <label class="form-label">Password</label>
          <input class="form-input" type="password" id="password" placeholder="Min. 6 characters" autocomplete="new-password" />
        </div>

        <button class="btn btn-primary" id="register-btn" style="width:100%;margin-top:8px;">
          Create Free Account →
        </button>

        <div class="auth-divider">or</div>

        <p style="text-align:center;font-size:13.5px;color:var(--text-muted);">
          Already have an account?
          <a href="#/login" style="color:var(--gold);text-decoration:none;font-weight:500;"> Sign in</a>
        </p>

        <p style="text-align:center;margin-top:20px;font-size:11.5px;color:var(--text-muted);line-height:1.6;">
          By creating an account you agree to our terms of service and privacy policy.
        </p>

        <p style="text-align:center;margin-top:12px;">
          <a href="#/" style="font-size:12px;color:var(--text-muted);text-decoration:none;">← Back to home</a>
        </p>
      </div>
    </div>
  `,document.getElementById(`register-btn`)?.addEventListener(`click`,async()=>{let e=document.getElementById(`name`)?.value?.trim(),t=document.getElementById(`email`)?.value?.trim(),n=document.getElementById(`password`)?.value;if(!e||!t||!n){h(`Please fill in all fields`);return}if(n.length<6){h(`Password must be at least 6 characters`);return}let r=document.getElementById(`register-btn`);r.disabled=!0,r.textContent=`Creating account…`;try{let r=await i.post(`/auth/register`,{name:e,email:t,password:n});d(r.token,r.user)}catch(e){h(e.message||`Registration failed`),r.disabled=!1,r.textContent=`Create Free Account →`}})}function g(e=``){let t=s()?.membership?.plan||`free`,n=(t,n,r,i)=>`
    <a href="${t}" class="sidebar-link ${e===t?`active`:``}">
      <span class="icon">${n}</span>
      ${r}
      ${i?`<span class="badge">${i}</span>`:``}
    </a>`;return`
    <aside class="sidebar">
      <div class="sidebar-section-label">Main</div>
      ${n(`#/dashboard`,`⬛`,`Dashboard`)}
      ${n(`#/chat`,`💬`,`AI Chat`)}

      <div class="sidebar-divider"></div>

      <div class="sidebar-section-label">Brand & Identity</div>
      ${n(`#/brand-tools`,`🎨`,`Brand Kit & Names`)}

      <div class="sidebar-section-label">Planning</div>
      ${n(`#/strategy-tools`,`📋`,`Business Plans`)}

      <div class="sidebar-section-label">Legal & Admin</div>
      ${n(`#/legal-tools`,`⚖️`,`Contracts & Pitch`)}

      <div class="sidebar-section-label">Marketing</div>
      ${n(`#/marketing-tools`,`📣`,`Ads, SEO & Content`)}

      <div class="sidebar-section-label">Sales</div>
      ${n(`#/sales-tools`,`💼`,`Emails & Scripts`)}

      <div class="sidebar-divider"></div>

      <div class="sidebar-section-label">AI Generators</div>
      ${n(`#/generator`,`📄`,`Business Generator`)}
      ${n(`#/market-research`,`📊`,`Market Research`)}
      ${n(`#/marketing`,`📣`,`Marketing Builder`)}
      ${n(`#/prompt-writer`,`✦`,`Prompt Writer`,`NEW`)}

      <div class="sidebar-spacer"></div>

      <div class="sidebar-divider"></div>
      <div class="sidebar-section-label">Account</div>
      ${n(`#/profile`,`👤`,`Profile`)}
      ${n(`#/membership`,`⚡`,`Membership`,t.toUpperCase())}
    </aside>
  `}var _=null,v=!1,y=[`Help me validate my business idea`,`What is the best business model for SaaS?`,`How do I find my first 100 customers?`,`Write a pitch for investors`,`Help me set pricing for my product`,`Create a 90-day go-to-market strategy`];async function oe(e){e.innerHTML=`
    <div class="app-shell">
      ${g(`#/chat`)}
      <main class="main-content" style="padding:0;overflow:hidden;">
        <div class="chat-layout">

          <!-- ── History sidebar ── -->
          <div class="chat-history-panel">
            <div class="chat-history-header">
              <button class="btn btn-primary btn-sm" style="width:100%;" id="new-chat-btn">+ New Chat</button>
            </div>
            <div class="chat-history-list" id="chat-list">
              <div class="loader">
                <div class="loader-dot"></div>
                <div class="loader-dot"></div>
                <div class="loader-dot"></div>
              </div>
            </div>
          </div>

          <!-- ── Main chat area ── -->
          <div class="chat-main">

            <!-- Top bar -->
            <div class="chat-topbar">
              <span class="chat-topbar-title" id="chat-topbar-title">AI Business Advisor</span>
              <span class="chat-topbar-badge">LLAMA 3.3 · DOUBLE EIGHT AI</span>
            </div>

            <!-- Messages — where AI answers appear -->
            <div class="chat-messages" id="chat-messages">
              <div class="chat-welcome" id="chat-welcome">
                <div class="chat-welcome-badge">88</div>
                <h2 class="chat-welcome-title">Double Eight AI Assistant</h2>
                <p class="chat-welcome-sub">Your expert AI business advisor. Ask anything about strategy, planning, marketing, finance, or growth.</p>
                <div class="suggestion-chips" id="suggestions">
                  ${y.map(e=>`<button class="suggestion-chip" data-msg="${e}">${e}</button>`).join(``)}
                </div>
              </div>
            </div>

            <!-- Input zone — where you write your message -->
            <div class="chat-input-zone">
              <div class="chat-input-label">Your Message</div>
              <div class="chat-input-box">
                <textarea
                  class="chat-input"
                  id="chat-input"
                  placeholder="Ask your AI business advisor anything…"
                  rows="1"
                  aria-label="Chat message input"
                ></textarea>
                <button class="chat-send-btn" id="send-btn" title="Send message (Enter)">
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                    <path d="M1 7.5H14M14 7.5L8 1.5M14 7.5L8 13.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </button>
              </div>
              <div class="chat-input-footer">
                <span>Enter to send</span>
                <span>·</span>
                <span>Shift+Enter for new line</span>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  `,await b(),ue()}async function b(){let e=document.getElementById(`chat-list`);try{se((await i.get(`/chat/sessions`)).sessions||[])}catch{e.innerHTML=`<div style="padding:14px;font-size:12px;color:var(--text-muted);">Could not load sessions</div>`}}function se(e){let t=document.getElementById(`chat-list`);if(!e.length){t.innerHTML=`<div style="padding:14px;font-size:12px;color:var(--text-muted);">No chats yet.<br>Start a new one above.</div>`;return}t.innerHTML=e.map(e=>`
    <div class="chat-hist-item ${e._id===_?`active`:``}" data-id="${e._id}">
      <span class="chat-hist-title">${e.title||`New Chat`}</span>
      <button class="chat-hist-del" data-del="${e._id}" title="Delete">✕</button>
    </div>
  `).join(``),t.querySelectorAll(`.chat-hist-item`).forEach(e=>{e.addEventListener(`click`,t=>{t.target.dataset.del||ce(e.dataset.id)})}),t.querySelectorAll(`[data-del]`).forEach(e=>{e.addEventListener(`click`,async t=>{t.stopPropagation(),await i.delete(`/chat/sessions/${e.dataset.del}`),e.dataset.del===_&&(_=null,x()),await b()})})}async function ce(e){_=e;try{let t=await i.get(`/chat/sessions/${e}`),n=t.session.messages||[],r=t.session.title||`Conversation`;le(),document.getElementById(`chat-topbar-title`).textContent=r,n.forEach(e=>C(e.role,e.content)),await b(),w()}catch{h(`Failed to load session`)}}function x(){let e=document.getElementById(`chat-messages`);document.getElementById(`chat-topbar-title`).textContent=`AI Business Advisor`,e.innerHTML=`
    <div class="chat-welcome" id="chat-welcome">
      <div class="chat-welcome-badge">88</div>
      <h2 class="chat-welcome-title">New Conversation</h2>
      <p class="chat-welcome-sub">Start a new conversation with your AI business advisor.</p>
      <div class="suggestion-chips">
        ${y.map(e=>`<button class="suggestion-chip" data-msg="${e}">${e}</button>`).join(``)}
      </div>
    </div>
  `,de()}function le(){let e=document.getElementById(`chat-messages`);e.innerHTML=``}function ue(){document.getElementById(`new-chat-btn`)?.addEventListener(`click`,()=>{_=null,x(),b()});let e=document.getElementById(`chat-input`),t=document.getElementById(`send-btn`);e?.addEventListener(`keydown`,e=>{e.key===`Enter`&&!e.shiftKey&&(e.preventDefault(),S())}),e?.addEventListener(`input`,()=>{e.style.height=`auto`,e.style.height=Math.min(e.scrollHeight,150)+`px`}),t?.addEventListener(`click`,S),de()}function de(){document.querySelectorAll(`.suggestion-chip`).forEach(e=>{e.addEventListener(`click`,()=>{let t=document.getElementById(`chat-input`);t&&(t.value=e.dataset.msg,S())})})}async function S(){if(v)return;let e=document.getElementById(`chat-input`),t=e?.value.trim();if(!t)return;let n=document.getElementById(`chat-welcome`);n&&n.remove(),C(`user`,t),e.value=``,e.style.height=`auto`;let r=document.getElementById(`send-btn`);r.disabled=!0,v=!0;let a=`typing-`+Date.now(),o=document.getElementById(`chat-messages`),s=document.createElement(`div`);s.className=`typing-wrap`,s.id=a,s.innerHTML=`
    <div class="msg-avatar ai">88</div>
    <div class="typing-bubble">
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
    </div>
  `,o.appendChild(s),w();let c=null,l=``;await i.streamMessage({message:t,sessionId:_},e=>{if(s.remove(),!c){let e=document.createElement(`div`);e.className=`message ai`,e.innerHTML=`<div class="msg-avatar ai">88</div><div class="msg-bubble" id="ai-stream-bubble"></div>`,o.appendChild(e),c=document.getElementById(`ai-stream-bubble`)}l+=e,c.innerHTML=pe(l),w()},e=>{e&&(_=e,setTimeout(()=>b(),200)),v=!1,r.disabled=!1},e=>{s.remove(),C(`ai`,`Sorry, I encountered an error: ${e}`),v=!1,r.disabled=!1})}function C(e,t){let n=document.getElementById(`chat-messages`),r=document.createElement(`div`);r.className=`message ${e===`user`?`user`:`ai`}`;let i=e===`user`?document.querySelector(`.user-avatar-btn`)?.textContent?.trim()||`U`:`88`;r.innerHTML=`
    <div class="msg-avatar ${e===`user`?`user`:`ai`}">${i}</div>
    <div class="msg-bubble">${e===`user`?fe(t):pe(t)}</div>
  `,n.appendChild(r),w()}function w(){let e=document.getElementById(`chat-messages`);e&&(e.scrollTop=e.scrollHeight)}function fe(e){return e.replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/\n/g,`<br>`)}function pe(e){return e.replace(/```([\s\S]*?)```/g,`<pre><code>$1</code></pre>`).replace(/`([^`]+)`/g,`<code>$1</code>`).replace(/^### (.+)$/gm,`<h3>$1</h3>`).replace(/^## (.+)$/gm,`<h2>$1</h2>`).replace(/^# (.+)$/gm,`<h1>$1</h1>`).replace(/\*\*(.+?)\*\*/g,`<strong>$1</strong>`).replace(/\*(.+?)\*/g,`<em>$1</em>`).replace(/^- (.+)$/gm,`<li>$1</li>`).replace(/(<li>.*<\/li>\n?)+/g,`<ul>$&</ul>`).replace(/^\d+\. (.+)$/gm,`<li>$1</li>`).replace(/\n\n/g,`</p><p>`).replace(/\n/g,`<br>`).replace(/^(.)/,`<p>$1`)+`</p>`}async function me(e){e.innerHTML=`
    <div class="app-shell">
      ${g(`#/generator`)}
      <main class="main-content" style="padding:0;overflow:hidden;">
        <div class="tool-shell">
          <!-- Form Panel -->
          <div class="tool-form-panel">
            <div style="margin-bottom:24px;">
              <h2 style="font-size:1.3rem;font-weight:700;margin-bottom:6px;">📄 Business Generator</h2>
              <p style="font-size:13px;color:var(--text-secondary);">Generate complete business documents powered by AI.</p>
            </div>

            <div class="tabs" id="gen-tabs">
              <button class="tab-btn active" data-tab="business_plan">Business Plan</button>
            </div>

            <form id="gen-form">
              <div class="form-group">
                <label class="form-label">Business Name *</label>
                <input class="form-input" id="businessName" placeholder="e.g. FitMeal Pro" required/>
              </div>
              <div class="form-group">
                <label class="form-label">Industry *</label>
                <input class="form-input" id="industry" placeholder="e.g. Health & Fitness, SaaS, E-commerce" required/>
              </div>
              <div class="form-group">
                <label class="form-label">Business Model</label>
                <select class="form-select" id="businessModel">
                  <option value="SaaS">SaaS / Subscription</option>
                  <option value="E-commerce">E-commerce</option>
                  <option value="Marketplace">Marketplace</option>
                  <option value="Service">Service Business</option>
                  <option value="Freemium">Freemium</option>
                  <option value="Agency">Agency</option>
                  <option value="Physical">Physical Product</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Target Market *</label>
                <input class="form-input" id="targetMarket" placeholder="e.g. Busy professionals aged 25-45" required/>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label class="form-label">Initial Investment</label>
                  <input class="form-input" id="investment" placeholder="e.g. $10,000"/>
                </div>
                <div class="form-group">
                  <label class="form-label">Location</label>
                  <input class="form-input" id="location" placeholder="e.g. USA, Online"/>
                </div>
              </div>
              <div class="form-group">
                <label class="form-label">Business Goals *</label>
                <textarea class="form-textarea" id="goals" placeholder="e.g. Reach $100k MRR in 12 months, expand to 3 markets..." required style="min-height:80px;"></textarea>
              </div>

              <button type="submit" class="btn btn-primary" style="width:100%;" id="gen-btn">
                ✦ Generate Business Plan
              </button>
            </form>

            <!-- Past Reports -->
            <div style="margin-top:32px;">
              <div class="section-title">Past Reports</div>
              <div id="past-reports">
                <div class="loader"><div class="loader-dot"></div><div class="loader-dot"></div><div class="loader-dot"></div></div>
              </div>
            </div>
          </div>

          <!-- Result Panel -->
          <div class="tool-result-panel" id="gen-result">
            <div class="tool-result-empty">
              <div style="font-size:64px;opacity:0.2;">📄</div>
              <div style="font-size:18px;font-weight:600;color:var(--text-secondary);">Ready to Generate</div>
              <p style="color:var(--text-muted);font-size:13px;max-width:300px;">Fill in the form and click Generate to create your business document.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  `,T();let t=document.getElementById(`gen-form`),n=document.getElementById(`gen-btn`);t.addEventListener(`submit`,async e=>{e.preventDefault(),n.disabled=!0,n.innerHTML=`<span class="spinner"></span> Generating... (this may take 30-60s)`;let t={businessName:document.getElementById(`businessName`).value,industry:document.getElementById(`industry`).value,businessModel:document.getElementById(`businessModel`).value,targetMarket:document.getElementById(`targetMarket`).value,investment:document.getElementById(`investment`).value,location:document.getElementById(`location`).value,goals:document.getElementById(`goals`).value};try{let e=await i.post(`/generator/generate`,{type:`business_plan`,inputs:t});m(`Business plan generated!`),E(e.report),T()}catch(e){h(e.message)}finally{n.disabled=!1,n.innerHTML=`✦ Generate Business Plan`}})}async function T(){let e=document.getElementById(`past-reports`);if(e)try{let t=(await i.get(`/generator/reports`)).reports||[];if(!t.length){e.innerHTML=`<div class="tool-form-sub">No reports yet.</div>`;return}e.innerHTML=t.map(e=>`
      <div class="chat-item" data-id="${e._id}" style="margin-bottom:4px;">
        <span class="chat-item-title" style="font-size:12px;">${e.title}</span>
      </div>
    `).join(``),e.querySelectorAll(`.chat-item`).forEach(e=>{e.addEventListener(`click`,()=>he(e.dataset.id))})}catch{e.innerHTML=``}}async function he(e){try{E((await i.get(`/generator/reports/${e}`)).report)}catch{h(`Failed to load report`)}}function E(e){let t=document.getElementById(`gen-result`);t.innerHTML=`
    <div class="result-actions">
      <h3 style="flex:1;font-size:1rem;font-weight:700;">${e.title}</h3>
      <button class="btn btn-secondary btn-sm" onclick="copyContent()">📋 Copy</button>
      <button class="btn btn-secondary btn-sm" onclick="downloadHTML('${e._id}')">⬇ HTML</button>
      <button class="btn btn-primary btn-sm" onclick="printReport()">🖨 Print / PDF</button>
    </div>
    <div class="result-content" id="report-body">
      ${ge(e.content)}
    </div>
  `,window.copyContent=()=>{navigator.clipboard.writeText(e.content),m(`Copied to clipboard!`)},window.downloadHTML=async t=>{let n=await i.get(`/generator/reports/${t}`),r=new Blob([n.report.htmlContent||e.content],{type:`text/html`}),a=document.createElement(`a`);a.href=URL.createObjectURL(r),a.download=`${e.title.replace(/\s+/g,`-`)}.html`,a.click()},window.printReport=()=>{let t=window.open(``,`_blank`);t.document.write(e.htmlContent||`<pre>${e.content}</pre>`),t.document.close(),t.print()}}function ge(e){return e.replace(/^### (.+)$/gm,`<h3>$1</h3>`).replace(/^## (.+)$/gm,`<h2>$1</h2>`).replace(/^# (.+)$/gm,`<h1>$1</h1>`).replace(/\*\*(.+?)\*\*/g,`<strong>$1</strong>`).replace(/\*(.+?)\*/g,`<em>$1</em>`).replace(/^- (.+)$/gm,`<li>$1</li>`).replace(/(<li>.*?<\/li>)/gs,`<ul>$1</ul>`).replace(/\n\n/g,`</p><p>`).replace(/\n/g,`<br>`)}async function _e(e){e.innerHTML=`
    <div class="app-shell">
      ${g(`#/market-research`)}
      <main class="main-content" style="padding:0;overflow:hidden;">
        <div class="tool-shell">
          <div class="tool-form-panel">
            <div style="margin-bottom:24px;">
              <h2 style="font-size:1.3rem;font-weight:700;margin-bottom:6px;">📊 Market Research</h2>
              <p style="font-size:13px;color:var(--text-secondary);">Deep market analysis, niche discovery, and product winner research.</p>
            </div>

            <form id="research-form">
              <div class="form-group">
                <label class="form-label">Industry / Niche *</label>
                <input class="form-input" id="niche" placeholder="e.g. AI productivity tools, Pet supplements" required/>
              </div>
              <div class="form-group">
                <label class="form-label">Target Region</label>
                <select class="form-select" id="region">
                  <option value="Global">Global</option>
                  <option value="USA">United States</option>
                  <option value="Europe">Europe</option>
                  <option value="Middle East">Middle East</option>
                  <option value="Asia">Asia</option>
                  <option value="Latin America">Latin America</option>
                  <option value="Africa">Africa</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Target Demographics</label>
                <input class="form-input" id="demographics" placeholder="e.g. Millennials, B2B SMEs, Gen Z women"/>
              </div>
              <div class="form-group">
                <label class="form-label">Research Focus</label>
                <select class="form-select" id="focus">
                  <option value="Full analysis">Full Market Analysis</option>
                  <option value="Niche opportunities">Niche Opportunities</option>
                  <option value="Competitive landscape">Competitive Landscape</option>
                  <option value="Product winners">Product Winner Discovery</option>
                  <option value="Customer segments">Customer Segmentation</option>
                  <option value="Market entry">Market Entry Strategy</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Your Budget Range</label>
                <select class="form-select" id="budget">
                  <option value="Under $1,000">Under $1,000</option>
                  <option value="$1,000 - $10,000">$1,000 - $10,000</option>
                  <option value="$10,000 - $50,000">$10,000 - $50,000</option>
                  <option value="$50,000+">$50,000+</option>
                  <option value="Not specified">Not specified</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Additional Context</label>
                <textarea class="form-textarea" id="context" placeholder="Any specific questions, products, or angles you want researched..." style="min-height:80px;"></textarea>
              </div>

              <button type="submit" class="btn btn-primary" style="width:100%;" id="research-btn">
                📊 Run Market Research
              </button>
            </form>

            <div style="margin-top:32px;">
              <div class="section-title">Past Research</div>
              <div id="past-research">
                <div class="loader"><div class="loader-dot"></div><div class="loader-dot"></div><div class="loader-dot"></div></div>
              </div>
            </div>
          </div>

          <div class="tool-result-panel" id="research-result">
            <div class="tool-result-empty">
              <div style="font-size:64px;opacity:0.2;">📊</div>
              <div style="font-size:18px;font-weight:600;color:var(--text-secondary);">Market Intelligence Ready</div>
              <p style="color:var(--text-muted);font-size:13px;max-width:300px;">Define your market parameters and run a deep research analysis.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  `,D(),document.getElementById(`research-form`).addEventListener(`submit`,async e=>{e.preventDefault();let t=document.getElementById(`research-btn`);t.disabled=!0,t.innerHTML=`<span class="spinner"></span> Researching market... (30-60s)`;let n={niche:document.getElementById(`niche`).value,region:document.getElementById(`region`).value,demographics:document.getElementById(`demographics`).value,focus:document.getElementById(`focus`).value,budget:document.getElementById(`budget`).value,context:document.getElementById(`context`).value};try{let e=await i.post(`/market-research/analyze`,{inputs:n});m(`Market research complete!`),O(e.report,`research-result`),D()}catch(e){h(e.message)}finally{t.disabled=!1,t.innerHTML=`📊 Run Market Research`}})}async function D(){let e=document.getElementById(`past-research`);if(e)try{let t=(await i.get(`/market-research/reports`)).reports||[];if(!t.length){e.innerHTML=`<div class="tool-form-sub">No research yet.</div>`;return}e.innerHTML=t.map(e=>`
      <div class="chat-item" data-id="${e._id}" style="margin-bottom:4px;">
        <span class="chat-item-title" style="font-size:12px;">${e.title}</span>
      </div>
    `).join(``),e.querySelectorAll(`.chat-item`).forEach(e=>{e.addEventListener(`click`,async()=>{O((await i.get(`/generator/reports/${e.dataset.id}`)).report,`research-result`)})})}catch{e.innerHTML=``}}function O(e,t){let n=document.getElementById(t);n.innerHTML=`
    <div class="result-actions">
      <h3 style="flex:1;font-size:1rem;font-weight:700;">${e.title}</h3>
      <button class="btn btn-secondary btn-sm" onclick="navigator.clipboard.writeText(window._lastContent||'');showSuccess&&showSuccess('Copied!')">📋 Copy</button>
      <button class="btn btn-primary btn-sm" onclick="window.print()">🖨 Print / PDF</button>
    </div>
    <div class="result-content">${ve(e.content)}</div>
  `,window._lastContent=e.content}function ve(e){return e.replace(/^### (.+)$/gm,`<h3>$1</h3>`).replace(/^## (.+)$/gm,`<h2>$1</h2>`).replace(/^# (.+)$/gm,`<h1>$1</h1>`).replace(/\*\*(.+?)\*\*/g,`<strong>$1</strong>`).replace(/\*(.+?)\*/g,`<em>$1</em>`).replace(/^- (.+)$/gm,`<li>$1</li>`).replace(/\n\n/g,`</p><p>`).replace(/\n/g,`<br>`)}async function ye(e){e.innerHTML=`
    <div class="app-shell">
      ${g(`#/marketing`)}
      <main class="main-content" style="padding:0;overflow:hidden;">
        <div class="tool-shell">
          <div class="tool-form-panel">
            <div style="margin-bottom:24px;">
              <h2 style="font-size:1.3rem;font-weight:700;margin-bottom:6px;">📣 Marketing Builder</h2>
              <p style="font-size:13px;color:var(--text-secondary);">Complete marketing strategies, content plans, SEO, and ad setups.</p>
            </div>

            <form id="marketing-form">
              <div class="form-group">
                <label class="form-label">Business Name *</label>
                <input class="form-input" id="businessName" placeholder="e.g. FitMeal Pro" required/>
              </div>
              <div class="form-group">
                <label class="form-label">Industry *</label>
                <input class="form-input" id="industry" placeholder="e.g. Health & Fitness, B2B SaaS" required/>
              </div>
              <div class="form-group">
                <label class="form-label">Target Audience *</label>
                <textarea class="form-textarea" id="targetAudience" placeholder="Describe your ideal customer: age, interests, pain points, platforms they use..." required style="min-height:80px;"></textarea>
              </div>
              <div class="form-group">
                <label class="form-label">Marketing Goals *</label>
                <textarea class="form-textarea" id="goals" placeholder="e.g. Get 500 leads/month, grow Instagram to 10k followers, rank #1 for [keyword]..." required style="min-height:70px;"></textarea>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label class="form-label">Monthly Budget</label>
                  <select class="form-select" id="budget">
                    <option>Under $500</option>
                    <option>$500 - $2,000</option>
                    <option>$2,000 - $10,000</option>
                    <option>$10,000+</option>
                    <option>Flexible</option>
                  </select>
                </div>
                <div class="form-group">
                  <label class="form-label">Timeline</label>
                  <select class="form-select" id="timeline">
                    <option value="1 month">1 Month Plan</option>
                    <option value="3 months" selected>3 Months Plan</option>
                    <option value="6 months">6 Months Plan</option>
                    <option value="12 months">12 Months Plan</option>
                  </select>
                </div>
              </div>
              <div class="form-group">
                <label class="form-label">Current Marketing Presence</label>
                <input class="form-input" id="currentPresence" placeholder="e.g. Website, Instagram 500 followers, Email list 200"/>
              </div>

              <button type="submit" class="btn btn-primary" style="width:100%;" id="marketing-btn">
                📣 Build Marketing Strategy
              </button>
            </form>

            <div style="margin-top:32px;">
              <div class="section-title">Past Strategies</div>
              <div id="past-marketing">
                <div class="loader"><div class="loader-dot"></div><div class="loader-dot"></div><div class="loader-dot"></div></div>
              </div>
            </div>
          </div>

          <div class="tool-result-panel" id="marketing-result">
            <div class="tool-result-empty">
              <div style="font-size:64px;opacity:0.2;">📣</div>
              <div style="font-size:18px;font-weight:600;color:var(--text-secondary);">Strategy Builder Ready</div>
              <p style="color:var(--text-muted);font-size:13px;max-width:300px;">Fill in your business details and get a complete marketing playbook.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  `,k(),document.getElementById(`marketing-form`).addEventListener(`submit`,async e=>{e.preventDefault();let t=document.getElementById(`marketing-btn`);t.disabled=!0,t.innerHTML=`<span class="spinner"></span> Building strategy... (30-60s)`;let n={businessName:document.getElementById(`businessName`).value,industry:document.getElementById(`industry`).value,targetAudience:document.getElementById(`targetAudience`).value,goals:document.getElementById(`goals`).value,budget:document.getElementById(`budget`).value,timeline:document.getElementById(`timeline`).value,currentPresence:document.getElementById(`currentPresence`).value};try{let e=await i.post(`/marketing/build`,{inputs:n});m(`Marketing strategy created!`),A(e.report),k()}catch(e){h(e.message)}finally{t.disabled=!1,t.innerHTML=`📣 Build Marketing Strategy`}})}async function k(){let e=document.getElementById(`past-marketing`);if(e)try{let t=(await i.get(`/marketing/reports`)).reports||[];if(!t.length){e.innerHTML=`<div class="tool-form-sub">No strategies yet.</div>`;return}e.innerHTML=t.map(e=>`
      <div class="chat-item" data-id="${e._id}" style="margin-bottom:4px;">
        <span class="chat-item-title" style="font-size:12px;">${e.title}</span>
      </div>
    `).join(``),e.querySelectorAll(`.chat-item`).forEach(e=>{e.addEventListener(`click`,async()=>{A((await i.get(`/generator/reports/${e.dataset.id}`)).report)})})}catch{e.innerHTML=``}}function A(e){let t=document.getElementById(`marketing-result`);t.innerHTML=`
    <div class="result-actions">
      <h3 style="flex:1;font-size:1rem;font-weight:700;">${e.title}</h3>
      <button class="btn btn-secondary btn-sm" onclick="navigator.clipboard.writeText(window._mktContent||'')">📋 Copy</button>
      <button class="btn btn-primary btn-sm" onclick="window.print()">🖨 Print / PDF</button>
    </div>
    <div class="result-content">${be(e.content)}</div>
  `,window._mktContent=e.content}function be(e){return e.replace(/^### (.+)$/gm,`<h3>$1</h3>`).replace(/^## (.+)$/gm,`<h2>$1</h2>`).replace(/^# (.+)$/gm,`<h1>$1</h1>`).replace(/\*\*(.+?)\*\*/g,`<strong>$1</strong>`).replace(/\*(.+?)\*/g,`<em>$1</em>`).replace(/^- (.+)$/gm,`<li>$1</li>`).replace(/\n\n/g,`</p><p>`).replace(/\n/g,`<br>`)}async function xe(e){let t=s(),n=t?.name?.charAt(0).toUpperCase()||`U`;e.innerHTML=`
    <div class="app-shell">
      ${g(`#/profile`)}
      <main class="main-content">
        <div class="page">
          <h1 class="page-title">My <span>Profile</span></h1>
          <p class="page-subtitle">Manage your account settings and preferences.</p>

          <!-- Profile Header -->
          <div class="profile-header mb-24">
            <div class="profile-avatar">${n}</div>
            <div>
              <div class="profile-info-name">${t?.name}</div>
              <div class="profile-info-email">${t?.email}</div>
              <div style="margin-top:8px;">
                <span class="badge badge-gold">⚡ ${(t?.membership?.plan||`free`).toUpperCase()} PLAN</span>
                <span class="badge badge-success" style="margin-left:6px;">● Active</span>
              </div>
            </div>
          </div>

          <div class="grid-2">
            <!-- Update Profile -->
            <div class="card">
              <h3 style="font-size:1rem;font-weight:700;margin-bottom:20px;">Update Profile</h3>
              <form id="profile-form">
                <div class="form-group">
                  <label class="form-label">Full Name</label>
                  <input class="form-input" id="name" value="${t?.name||``}" placeholder="Your full name"/>
                </div>
                <div class="form-group">
                  <label class="form-label">Email Address</label>
                  <input class="form-input" value="${t?.email||``}" disabled style="opacity:0.5;cursor:not-allowed;"/>
                  <span style="font-size:11px;color:var(--text-muted);">Email cannot be changed.</span>
                </div>
                <button type="submit" class="btn btn-primary" id="profile-btn">Save Changes</button>
              </form>
            </div>

            <!-- Change Password -->
            <div class="card">
              <h3 style="font-size:1rem;font-weight:700;margin-bottom:20px;">Change Password</h3>
              <form id="pw-form">
                <div class="form-group">
                  <label class="form-label">Current Password</label>
                  <input class="form-input" type="password" id="currentPw" placeholder="Current password"/>
                </div>
                <div class="form-group">
                  <label class="form-label">New Password</label>
                  <input class="form-input" type="password" id="newPw" placeholder="Min 6 characters"/>
                </div>
                <button type="submit" class="btn btn-secondary" id="pw-btn">Update Password</button>
              </form>
            </div>
          </div>

          <!-- Usage Stats -->
          <div class="card mt-24">
            <h3 style="font-size:1rem;font-weight:700;margin-bottom:20px;">Usage Statistics</h3>
            <div class="grid-4">
              <div class="stat-card">
                <div class="stat-icon">💬</div>
                <div class="stat-value">${t?.usage?.chatMessages||0}</div>
                <div class="stat-label">Chat Messages</div>
              </div>
              <div class="stat-card">
                <div class="stat-icon">📄</div>
                <div class="stat-value">${t?.usage?.reportsGenerated||0}</div>
                <div class="stat-label">Reports Generated</div>
              </div>
              <div class="stat-card">
                <div class="stat-icon">📊</div>
                <div class="stat-value">${t?.usage?.marketResearch||0}</div>
                <div class="stat-label">Market Researches</div>
              </div>
              <div class="stat-card">
                <div class="stat-icon">📣</div>
                <div class="stat-value">${t?.usage?.marketingPlans||0}</div>
                <div class="stat-label">Marketing Plans</div>
              </div>
            </div>
          </div>

          <!-- Membership -->
          <div class="card mt-24" style="display:flex;align-items:center;justify-content:space-between;gap:24px;">
            <div>
              <div style="font-weight:700;margin-bottom:4px;">Membership: ${(t?.membership?.plan||`free`).toUpperCase()}</div>
              <div style="font-size:13px;color:var(--text-secondary);">Manage your subscription or upgrade for more power.</div>
            </div>
            <a href="#/membership" class="btn btn-primary">Manage Plan</a>
          </div>

          <!-- Danger Zone -->
          <div class="card mt-24" style="border-color:rgba(248,113,113,0.15);">
            <h3 style="font-size:1rem;font-weight:700;margin-bottom:12px;color:var(--error);">Danger Zone</h3>
            <div style="display:flex;align-items:center;justify-content:space-between;gap:24px;">
              <div>
                <div style="font-weight:600;font-size:14px;margin-bottom:4px;">Sign Out</div>
                <div style="font-size:13px;color:var(--text-muted);">Sign out from your current session.</div>
              </div>
              <button class="btn btn-danger" id="logout-btn">Sign Out</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  `,document.getElementById(`profile-form`).addEventListener(`submit`,async e=>{e.preventDefault();let t=document.getElementById(`profile-btn`);t.disabled=!0,t.innerHTML=`<span class="spinner"></span>`;try{await i.put(`/user/profile`,{name:document.getElementById(`name`).value}),m(`Profile updated!`)}catch(e){h(e.message)}finally{t.disabled=!1,t.textContent=`Save Changes`}}),document.getElementById(`pw-form`).addEventListener(`submit`,async e=>{e.preventDefault();let t=document.getElementById(`pw-btn`);t.disabled=!0,t.innerHTML=`<span class="spinner"></span>`;try{await i.put(`/user/password`,{currentPassword:document.getElementById(`currentPw`).value,newPassword:document.getElementById(`newPw`).value}),m(`Password updated!`),document.getElementById(`pw-form`).reset()}catch(e){h(e.message)}finally{t.disabled=!1,t.textContent=`Update Password`}}),document.getElementById(`logout-btn`).addEventListener(`click`,()=>{confirm(`Are you sure you want to sign out?`)&&f()})}var j=[{id:`free`,name:`Free`,price:0,desc:`Try Double Eight AI with no commitment.`,features:[`20 AI chat messages/month`,`3 business reports`,`2 market researches`,`2 marketing plans`,`HTML export`,`Community support`],cta:`Get Started Free`},{id:`starter`,name:`Starter`,price:29,desc:`For entrepreneurs starting their journey.`,featured:!1,features:[`200 AI chat messages/month`,`20 business reports`,`15 market researches`,`15 marketing plans`,`PDF & HTML export`,`Email support`],cta:`Start Starter`},{id:`pro`,name:`Pro`,price:79,desc:`For serious business builders and teams.`,featured:!0,features:[`1,000 AI chat messages/month`,`100 business reports`,`75 market researches`,`75 marketing plans`,`Priority PDF & HTML export`,`Priority support`,`Advanced analytics`],cta:`Go Pro`},{id:`enterprise`,name:`Enterprise`,price:199,desc:`Unlimited power for growing companies.`,features:[`Unlimited AI chat`,`Unlimited reports`,`Unlimited market research`,`Unlimited marketing plans`,`Custom PDF branding`,`Dedicated support`,`API access`,`Team accounts`],cta:`Go Enterprise`}];async function Se(e){let t=c(),n=s()?.membership?.plan||`free`;e.innerHTML=t?`
    <div class="app-shell">
      ${g(`#/membership`)}
      <main class="main-content">
        <div class="page" id="membership-page"></div>
      </main>
    </div>
  `:`
    <div style="overflow-y:auto;min-height:calc(100vh - 64px);">
      <div id="membership-page" style="max-width:1100px;margin:0 auto;padding:60px 40px;"></div>
    </div>
  `;let r=document.getElementById(`membership-page`);r.innerHTML=`
    <div style="text-align:center;margin-bottom:48px;">
      <div class="section-title" style="justify-content:center;display:flex;">Pricing Plans</div>
      <h1 class="page-title">Choose Your <span>Growth Plan</span></h1>
      <p class="page-subtitle" style="max-width:500px;margin:0 auto 24px;">All plans include full access to Double Eight AI tools. Upgrade anytime.</p>
      ${t?`<span class="badge badge-gold">Current Plan: ${n.toUpperCase()}</span>`:``}
    </div>

    <div class="pricing-grid">
      ${j.map(e=>`
        <div class="pricing-card ${e.featured?`featured`:``}">
          <div class="plan-name">${e.name}</div>
          <div class="plan-price">${e.price===0?`Free`:`$${e.price}`}<span>${e.price>0?`/mo`:``}</span></div>
          <p class="plan-desc">${e.desc}</p>
          <ul class="plan-features">
            ${e.features.map(e=>`<li>${e}</li>`).join(``)}
          </ul>
          ${t?n===e.id?`<button class="btn btn-secondary" style="width:100%;" disabled>✓ Current Plan</button>`:`<button class="btn ${e.featured?`btn-primary`:`btn-ghost`}" style="width:100%;" data-plan="${e.id}">${e.cta}</button>`:`<button class="btn ${e.featured?`btn-primary`:`btn-ghost`}" style="width:100%;" onclick="location.hash='#/register'">${e.cta}</button>`}
        </div>
      `).join(``)}
    </div>

    <div style="text-align:center;margin-top:48px;padding:32px;background:var(--bg-card);border:1px solid var(--border-mid);border-radius:var(--radius-lg);">
      <h3 style="font-size:1.2rem;margin-bottom:8px;">All Plans Include</h3>
      <div style="display:flex;flex-wrap:wrap;gap:20px;justify-content:center;margin-top:16px;color:var(--text-secondary);font-size:13px;">
        <span>✦ AI Business Chat</span>
        <span>✦ Business Plan Generator</span>
        <span>✦ Market Research Tools</span>
        <span>✦ Marketing Strategy Builder</span>
        <span>✦ HTML Export</span>
        <span>✦ Secure Cloud Storage</span>
      </div>
    </div>
  `,t&&r.querySelectorAll(`[data-plan]`).forEach(e=>{e.addEventListener(`click`,async()=>{let t=e.dataset.plan;e.disabled=!0,e.innerHTML=`<span class="spinner"></span>`;try{await i.post(`/membership/upgrade`,{plan:t}),m(`Upgraded to ${t} plan! 🎉`),setTimeout(()=>location.reload(),1500)}catch(n){h(n.message),e.disabled=!1,e.textContent=j.find(e=>e.id===t)?.cta||`Upgrade`}})})}async function M(e){let t=s();e.innerHTML=`
    <div class="app-shell">
      ${g(`#/dashboard`)}
      <main class="main-content">
        <div class="page" id="dash-content">
          <div class="loader">
            <div class="loader-dot"></div>
            <div class="loader-dot"></div>
            <div class="loader-dot"></div>
          </div>
        </div>
      </main>
    </div>
  `;let n={usage:t?.usage||{}};try{n=await i.get(`/membership/current`)}catch{}let r=n.usage||{},a=t?.membership?.plan||`free`,o={free:`Free`,starter:`Starter`,pro:`Pro`,enterprise:`Enterprise`},c=new Date().getHours(),l=c<12?`Good morning`:c<18?`Good afternoon`:`Good evening`;document.getElementById(`dash-content`).innerHTML=`
    <!-- Welcome -->
    <div class="dash-welcome mb-32">
      <div class="flex-between" style="flex-wrap:wrap;gap:16px;">
        <div>
          <div class="section-label">Dashboard</div>
          <h1 class="page-title">${l}, <span>${t?.name?.split(` `)[0]||`Builder`}</span></h1>
          <p class="page-subtitle">Your AI business command center — everything in one place.</p>
        </div>
        <span class="badge badge-gold" style="height:fit-content;padding:6px 14px;font-size:11px;">⚡ ${o[a]} Plan</span>
      </div>
    </div>

    <!-- Stats -->
    <div class="section-label mb-16">Usage Overview</div>
    <div class="grid-4 mb-32">
      <div class="stat-card">
        <div class="stat-icon">💬</div>
        <div class="stat-value">${r.chatMessages||0}</div>
        <div class="stat-label">AI Messages</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">📄</div>
        <div class="stat-value">${r.reportsGenerated||0}</div>
        <div class="stat-label">Reports Generated</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">📊</div>
        <div class="stat-value">${r.marketResearch||0}</div>
        <div class="stat-label">Market Researches</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">📣</div>
        <div class="stat-value">${r.marketingPlans||0}</div>
        <div class="stat-label">Marketing Plans</div>
      </div>
    </div>

    <!-- Zero-to-Success Roadmap -->
    <div class="section-label mb-16">Zero-to-Launch Roadmap</div>
    <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:12px;margin-bottom:36px;" class="roadmap-dash">
      ${[{href:`#/brand-tools`,icon:`🎨`,stage:`Stage 1`,label:`Brand & Identity`,desc:`Logo, name, slogan`},{href:`#/strategy-tools`,icon:`📋`,stage:`Stage 2`,label:`Plan & Strategy`,desc:`Business plan, roadmap`},{href:`#/legal-tools`,icon:`⚖️`,stage:`Stage 3`,label:`Legal & Finance`,desc:`Contracts, pitch deck`},{href:`#/marketing-tools`,icon:`📣`,stage:`Stage 4`,label:`Marketing & Ads`,desc:`SEO, ads, content`},{href:`#/sales-tools`,icon:`💼`,stage:`Stage 5`,label:`Sales & Close`,desc:`Emails, scripts`}].map((e,t)=>`
        <div class="card card-hover" onclick="location.hash='${e.href}'" style="text-align:center;padding:20px 14px;cursor:pointer;">
          <div style="font-size:26px;margin-bottom:10px;">${e.icon}</div>
          <div style="font-family:var(--font-mono);font-size:9px;letter-spacing:2px;color:var(--gold);margin-bottom:5px;">${e.stage}</div>
          <div style="font-size:12.5px;font-weight:600;color:var(--text-primary);margin-bottom:4px;">${e.label}</div>
          <div style="font-size:11px;color:var(--text-muted);">${e.desc}</div>
        </div>
      `).join(``)}
    </div>

    <!-- Quick Access -->
    <div class="section-label mb-16">Quick Access</div>
    <div class="grid-2 mb-32">
      ${[{href:`#/chat`,icon:`💬`,name:`AI Business Chat`,desc:`Ask your AI advisor anything, anytime.`},{href:`#/generator`,icon:`📄`,name:`Business Plan Builder`,desc:`Generate full formal business plans in minutes.`},{href:`#/market-research`,icon:`📊`,name:`Market Research`,desc:`Deep niche & competitive market analysis.`},{href:`#/marketing`,icon:`📣`,name:`Marketing Builder`,desc:`Full marketing strategies ready to execute.`},{href:`#/prompt-writer`,icon:`🪄`,name:`Prompt Writer`,desc:`AI prompts for Grok, Claude, Midjourney & more.`},{href:`#/brand-tools`,icon:`🎨`,name:`Brand Kit`,desc:`Logo concepts, colors, typography, voice.`}].map(e=>`
        <a class="quick-tool-card" href="${e.href}">
          <span class="qtc-icon">${e.icon}</span>
          <div>
            <div class="qtc-name">${e.name}</div>
            <div class="qtc-desc">${e.desc}</div>
          </div>
          <span class="qtc-arrow">›</span>
        </a>
      `).join(``)}
    </div>

    <!-- Upgrade banner (free only) -->
    ${a===`free`?`
    <div class="card card-gold" style="display:flex;align-items:center;justify-content:space-between;gap:24px;flex-wrap:wrap;">
      <div>
        <div class="text-gold fw-600" style="font-size:15px;margin-bottom:6px;">⚡ Unlock All 17+ Tools — Unlimited</div>
        <p class="text-secondary text-sm" style="max-width:500px;line-height:1.65;">Upgrade to Pro for unlimited AI generations, PDF exports, DOCX, PPTX downloads, and priority support. Start scaling today.</p>
      </div>
      <a href="#/membership" class="btn btn-primary" style="flex-shrink:0;">View Plans →</a>
    </div>`:``}
  `;let u=document.querySelector(`.roadmap-dash`);u&&window.innerWidth<900&&(u.style.gridTemplateColumns=`repeat(2,1fr)`)}var N=[{id:`grok`,name:`Grok (xAI)`,icon:`𝕏`,color:`#1da1f2`,desc:`Real-time, witty, unfiltered`},{id:`chatgpt`,name:`ChatGPT`,icon:`🟢`,color:`#10a37f`,desc:`Structured, versatile, GPT-4`},{id:`claude`,name:`Claude`,icon:`🟠`,color:`#c9a84c`,desc:`Nuanced, long-form, ethical`},{id:`gemini`,name:`Gemini`,icon:`♊`,color:`#4285f4`,desc:`Research, multimodal, Google`},{id:`midjourney`,name:`Midjourney`,icon:`🎨`,color:`#7c6dfa`,desc:`Image generation, visual art`},{id:`dalle`,name:`DALL·E`,icon:`🖼`,color:`#ff6b6b`,desc:`OpenAI image generation`},{id:`runway`,name:`Runway / Sora`,icon:`🎬`,color:`#ff9f43`,desc:`Video AI, cinematic motion`},{id:`llama`,name:`Llama (Meta)`,icon:`🦙`,color:`#45aaf2`,desc:`Open-source, instruction AI`},{id:`perplexity`,name:`Perplexity AI`,icon:`🔍`,color:`#00cec9`,desc:`Research, web search AI`},{id:`general`,name:`Universal / Any`,icon:`🤖`,color:`#a29bfe`,desc:`Works across all platforms`}],P=[{id:`image`,name:`Image Generation`,icon:`🖼`,desc:`Visual art, photos, illustrations`},{id:`video`,name:`Video Generation`,icon:`🎬`,desc:`AI video, scenes, motion`},{id:`script`,name:`Video Script`,icon:`📝`,desc:`Full scripts with hook & CTA`},{id:`cinema`,name:`Cinema Scenario`,icon:`🎭`,desc:`Screenplays, treatments, scenes`},{id:`information`,name:`Information`,icon:`📚`,desc:`Research, facts, deep dives`},{id:`plan`,name:`Strategy / Plan`,icon:`📋`,desc:`Plans, roadmaps, frameworks`},{id:`marketing`,name:`Marketing / Copy`,icon:`📣`,desc:`Ads, captions, landing pages`},{id:`chat`,name:`Chat / Persona`,icon:`💬`,desc:`System prompts, AI personas`}],Ce=[`Professional`,`Creative`,`Technical`,`Casual`,`Bold & Punchy`,`Academic`,`Storytelling`,`Inspirational`],we=[`Concise (short)`,`Standard`,`Comprehensive`,`Ultra-detailed`],F=`chatgpt`,I=`chat`;async function Te(e){e.innerHTML=`
    <div class="app-shell">
      ${g(`#/prompt-writer`)}
      <main class="main-content" style="padding:0;overflow:hidden;">
        <div class="pw-layout">

          <!-- LEFT PANEL: Form -->
          <div class="pw-left" id="pw-left">
            <div class="pw-left-header">
              <div style="font-size:22px;margin-bottom:4px;">✦ Prompt Writer</div>
              <p style="font-size:12px;color:var(--text-muted);line-height:1.5;">AI-engineered prompts calibrated per platform. Get cinema-grade output every time.</p>
            </div>

            <!-- STEP 1: Platform -->
            <div class="pw-step">
              <div class="pw-step-label"><span class="pw-step-num">1</span> Choose AI Platform</div>
              <div class="platform-grid" id="platform-grid">
                ${N.map(e=>`
                  <button class="platform-chip ${e.id===F?`active`:``}" data-id="${e.id}" style="--chip-color:${e.color}">
                    <span class="platform-chip-icon">${e.icon}</span>
                    <div>
                      <div class="platform-chip-name">${e.name}</div>
                      <div class="platform-chip-desc">${e.desc}</div>
                    </div>
                  </button>
                `).join(``)}
              </div>
            </div>

            <!-- STEP 2: Prompt Type -->
            <div class="pw-step">
              <div class="pw-step-label"><span class="pw-step-num">2</span> Prompt Type</div>
              <div class="type-grid" id="type-grid">
                ${P.map(e=>`
                  <button class="type-chip ${e.id===I?`active`:``}" data-id="${e.id}">
                    <span class="type-chip-icon">${e.icon}</span>
                    <div class="type-chip-name">${e.name}</div>
                    <div class="type-chip-desc">${e.desc}</div>
                  </button>
                `).join(``)}
              </div>
            </div>

            <!-- STEP 3: Details -->
            <div class="pw-step">
              <div class="pw-step-label"><span class="pw-step-num">3</span> Your Topic & Context</div>
              <div class="form-group">
                <label class="form-label">Topic / Subject *</label>
                <input class="form-input" id="topic" placeholder="e.g. A cyberpunk city at sunset, or How to grow a SaaS business" />
              </div>
              <div class="form-group">
                <label class="form-label">Additional Context <span style="color:var(--text-muted);font-weight:400;">(optional)</span></label>
                <textarea class="form-textarea" id="context" placeholder="Any details, style preferences, specific requirements, audience, goal..." style="min-height:72px;"></textarea>
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label class="form-label">Tone</label>
                  <select class="form-select" id="tone">
                    ${Ce.map(e=>`<option>${e}</option>`).join(``)}
                  </select>
                </div>
                <div class="form-group">
                  <label class="form-label">Output Length</label>
                  <select class="form-select" id="length">
                    ${we.map(e=>`<option>${e}</option>`).join(``)}
                  </select>
                </div>
              </div>
            </div>

            <button class="btn btn-primary" style="width:100%;font-size:15px;padding:14px;" id="generate-btn">
              ✦ Generate Prompt
            </button>

            <!-- History -->
            <div style="margin-top:32px;">
              <div class="section-title">Recent Prompts</div>
              <div id="pw-history" style="margin-top:8px;">
                <div class="loader"><div class="loader-dot"></div><div class="loader-dot"></div><div class="loader-dot"></div></div>
              </div>
            </div>
          </div>

          <!-- RIGHT PANEL: Result -->
          <div class="pw-right" id="pw-right">
            <div class="pw-empty" id="pw-empty">
              <div style="font-size:72px;opacity:0.15;">✦</div>
              <div style="font-size:20px;font-weight:700;color:var(--text-secondary);margin-bottom:8px;">Prompt Engineer Ready</div>
              <p style="color:var(--text-muted);font-size:13px;max-width:380px;text-align:center;line-height:1.7;">
                Select your platform, choose a prompt type, describe your topic — and get a masterclass prompt in seconds.
              </p>
              <div class="pw-preview-chips">
                ${N.slice(0,5).map(e=>`<span class="pw-preview-chip">${e.icon} ${e.name}</span>`).join(``)}
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  `,Ae(),Ee(),R()}function Ee(){document.getElementById(`platform-grid`).addEventListener(`click`,e=>{let t=e.target.closest(`[data-id]`);!t||!t.closest(`#platform-grid`)||(F=t.dataset.id,document.querySelectorAll(`#platform-grid .platform-chip`).forEach(e=>e.classList.remove(`active`)),t.classList.add(`active`))}),document.getElementById(`type-grid`).addEventListener(`click`,e=>{let t=e.target.closest(`[data-id]`);!t||!t.closest(`#type-grid`)||(I=t.dataset.id,document.querySelectorAll(`#type-grid .type-chip`).forEach(e=>e.classList.remove(`active`)),t.classList.add(`active`))}),document.getElementById(`generate-btn`).addEventListener(`click`,De)}async function De(){let e=document.getElementById(`topic`).value.trim();if(!e){h(`Please enter a topic!`),document.getElementById(`topic`).focus();return}let t=document.getElementById(`generate-btn`);t.disabled=!0,t.innerHTML=`<span class="spinner"></span> Engineering your prompt...`;let n=document.getElementById(`pw-right`);n.innerHTML=`
    <div class="pw-generating">
      <div class="pw-gen-animation">
        <div class="gen-ring"></div>
        <div class="gen-ring-2"></div>
        <span style="position:absolute;font-size:28px;">${N.find(e=>e.id===F)?.icon||`🤖`}</span>
      </div>
      <div style="font-size:18px;font-weight:700;margin-bottom:8px;">Engineering Your Prompt</div>
      <p style="color:var(--text-muted);font-size:13px;max-width:360px;text-align:center;line-height:1.7;">
        Calibrating for <strong style="color:var(--gold);">${N.find(e=>e.id===F)?.name}</strong> · 
        Optimizing for <strong style="color:var(--accent-light);">${P.find(e=>e.id===I)?.name}</strong>
      </p>
      <div class="pw-progress">
        <div class="pw-progress-bar" id="pw-progress"></div>
      </div>
      <div class="pw-steps-list" id="pw-steps"></div>
    </div>
  `;let r=[`Analyzing platform DNA...`,`Loading prompt engineering templates...`,`Calibrating for `+(N.find(e=>e.id===F)?.name||`AI`)+`...`,`Applying `+(P.find(e=>e.id===I)?.name||`type`)+` framework...`,`Finalizing and polishing...`],a=0,o=document.getElementById(`pw-steps`),s=document.getElementById(`pw-progress`),c=setInterval(()=>{if(a<r.length&&o){let e=document.createElement(`div`);e.className=`pw-step-item`,e.innerHTML=`<span class="pw-step-dot">◆</span>${r[a]}`,o.appendChild(e),s&&(s.style.width=(a+1)/r.length*100+`%`),a++}},600);try{let t=await i.post(`/prompt-writer/generate`,{topic:e,promptType:I,platform:F,context:document.getElementById(`context`).value,tone:document.getElementById(`tone`).value,length:document.getElementById(`length`).value});clearInterval(c),t.report,m(`Prompt engineered! ✦`),L(t.report),R()}catch(e){clearInterval(c),h(e.message),n.innerHTML=`
      <div class="pw-empty">
        <div style="font-size:48px;">⚠</div>
        <div style="color:var(--error);font-size:15px;font-weight:700;">Generation failed</div>
        <p style="color:var(--text-muted);font-size:13px;">${e.message}</p>
      </div>
    `}finally{t.disabled=!1,t.innerHTML=`✦ Generate Prompt`}}function L(e){let t=document.getElementById(`pw-right`),n=N.find(t=>t.id===(e.inputs?.platform||F)),r=P.find(t=>t.id===(e.inputs?.promptType||I)),i=ke(e.content);t.innerHTML=`
    <div class="pw-result">
      <!-- Result Header -->
      <div class="pw-result-header">
        <div class="pw-result-meta">
          <span class="pw-result-platform">${n?.icon} ${n?.name}</span>
          <span class="pw-result-type">${r?.icon} ${r?.name}</span>
        </div>
        <div class="pw-result-title">${e.title.replace(/\s*\(.*?\)\s*/g,``).trim()}</div>
        <div class="pw-result-actions">
          <button class="btn btn-secondary btn-sm" id="copy-btn">📋 Copy Prompt</button>
          <button class="btn btn-secondary btn-sm" id="copy-raw-btn">📄 Copy Raw</button>
          <button class="btn btn-primary btn-sm" id="export-pdf-btn">⬇ Export PDF</button>
          <button class="btn btn-ghost btn-sm" id="print-btn">🖨 Print</button>
        </div>
      </div>

      <!-- Prompt Content -->
      <div class="pw-result-body" id="pw-result-body">
        ${i}
      </div>

      <!-- Regenerate -->
      <div style="margin-top:24px;padding-top:20px;border-top:1px solid var(--border-subtle);display:flex;gap:12px;align-items:center;">
        <button class="btn btn-ghost btn-sm" onclick="document.getElementById('generate-btn').click()">↻ Regenerate</button>
        <span style="font-size:12px;color:var(--text-muted);">Not quite right? Adjust your inputs and regenerate for a different take.</span>
      </div>
    </div>
  `,document.getElementById(`copy-btn`).addEventListener(`click`,()=>{let t=e.content.split(`💡`)[0].trim();navigator.clipboard.writeText(t),m(`Prompt copied to clipboard!`)}),document.getElementById(`copy-raw-btn`).addEventListener(`click`,()=>{navigator.clipboard.writeText(e.content),m(`Full content copied!`)}),document.getElementById(`export-pdf-btn`).addEventListener(`click`,()=>{Oe(e)}),document.getElementById(`print-btn`).addEventListener(`click`,()=>{let t=window.open(``,`_blank`);t.document.write(e.htmlContent),t.document.close(),setTimeout(()=>t.print(),800)})}function Oe(e){let t=new Blob([e.htmlContent],{type:`text/html;charset=utf-8`}),n=URL.createObjectURL(t),r=document.createElement(`a`);r.href=n,r.download=`${e.title.replace(/[^a-z0-9]/gi,`-`).slice(0,60)}.html`,r.click(),URL.revokeObjectURL(n),m(`HTML file downloaded — open in browser and Print → Save as PDF for perfect quality!`)}async function R(){let e=document.getElementById(`pw-history`);if(e)try{let t=(await i.get(`/prompt-writer/history`)).reports||[];if(!t.length){e.innerHTML=`<div style="font-size:12px;color:var(--text-muted);">No prompts yet. Generate your first one!</div>`;return}e.innerHTML=t.slice(0,10).map(e=>`
      <div class="pw-history-item" data-id="${e._id}">
        <div class="pw-history-platform">${N.find(t=>t.id===e.inputs?.platform)?.icon||`🤖`}</div>
        <div style="flex:1;overflow:hidden;">
          <div class="pw-history-title">${e.title.split(`—`)[1]?.trim()||e.title}</div>
          <div class="pw-history-meta">${N.find(t=>t.id===e.inputs?.platform)?.name||``} · ${P.find(t=>t.id===e.inputs?.promptType)?.name||``}</div>
        </div>
      </div>
    `).join(``),e.querySelectorAll(`.pw-history-item`).forEach(e=>{e.addEventListener(`click`,async()=>{try{L((await i.get(`/generator/reports/${e.dataset.id}`)).report)}catch{h(`Failed to load`)}})})}catch{e.innerHTML=``}}function ke(e){return`<div class="pw-content">`+e.replace(/```([\s\S]*?)```/g,`<pre><code>$1</code></pre>`).replace(/`([^`]+)`/g,`<code>$1</code>`).replace(/^### (.+)$/gm,`<h3>$1</h3>`).replace(/^## (.+)$/gm,`<h2>$1</h2>`).replace(/^# (.+)$/gm,`<h1>$1</h1>`).replace(/\*\*(.+?)\*\*/g,`<strong>$1</strong>`).replace(/\*(.+?)\*/g,`<em>$1</em>`).replace(/^- (.+)$/gm,`<li>$1</li>`).replace(/(<li>[\s\S]*?<\/li>)/g,`<ul>$1</ul>`).replace(/\n\n/g,`</p><p>`).replace(/\n/g,`<br>`)+`</div>`}function Ae(){if(document.getElementById(`pw-styles`))return;let e=document.createElement(`style`);e.id=`pw-styles`,e.textContent=`
    /* ── Prompt Writer Layout ── */
    .pw-layout {
      display: grid;
      grid-template-columns: 420px 1fr;
      height: calc(100vh - var(--header-h));
    }

    .pw-left {
      background: var(--bg-deep);
      border-right: 1px solid var(--border-subtle);
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 0;
    }

    .pw-left-header {
      padding: 28px 24px 20px;
      border-bottom: 1px solid var(--border-subtle);
    }

    .pw-right {
      overflow-y: auto;
      background: var(--bg-void);
    }

    /* ── Steps ── */
    .pw-step {
      padding: 20px 24px;
      border-bottom: 1px solid var(--border-subtle);
    }

    .pw-step-label {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: var(--text-muted);
      margin-bottom: 14px;
      font-family: var(--font-mono);
    }

    .pw-step-num {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: var(--gold-glow);
      border: 1px solid rgba(201,168,76,0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 10px;
      font-weight: 800;
      color: var(--gold);
    }

    /* ── Platform Grid ── */
    .platform-grid {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .platform-chip {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 10px 14px;
      border-radius: var(--radius-sm);
      background: none;
      border: 1px solid var(--border-mid);
      cursor: pointer;
      transition: all 0.2s;
      text-align: left;
      width: 100%;
    }

    .platform-chip:hover {
      background: var(--bg-elevated);
      border-color: var(--border-bright);
    }

    .platform-chip.active {
      background: rgba(var(--chip-color, 201,168,76), 0.08);
      border-color: var(--chip-color, var(--gold));
      box-shadow: 0 0 0 1px var(--chip-color, var(--gold)) inset;
    }

    .platform-chip-icon {
      font-size: 20px;
      width: 28px;
      text-align: center;
      flex-shrink: 0;
    }

    .platform-chip-name {
      font-size: 13px;
      font-weight: 600;
      color: var(--text-primary);
    }

    .platform-chip-desc {
      font-size: 11px;
      color: var(--text-muted);
      margin-top: 1px;
    }

    /* ── Type Grid ── */
    .type-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 6px;
    }

    .type-chip {
      padding: 12px;
      border-radius: var(--radius-sm);
      background: none;
      border: 1px solid var(--border-mid);
      cursor: pointer;
      transition: all 0.2s;
      text-align: center;
    }

    .type-chip:hover {
      background: var(--bg-elevated);
      border-color: var(--border-bright);
    }

    .type-chip.active {
      background: var(--gold-glow);
      border-color: rgba(201,168,76,0.4);
    }

    .type-chip-icon {
      font-size: 22px;
      display: block;
      margin-bottom: 6px;
    }

    .type-chip-name {
      font-size: 12px;
      font-weight: 700;
      color: var(--text-primary);
      margin-bottom: 2px;
    }

    .type-chip-desc {
      font-size: 10px;
      color: var(--text-muted);
      line-height: 1.3;
    }

    .type-chip.active .type-chip-name { color: var(--gold); }

    /* ── Generate button area ── */
    #generate-btn { margin: 0 24px 24px; width: calc(100% - 48px) !important; }

    /* ── Empty state ── */
    .pw-empty {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
      gap: 16px;
      padding: 60px 40px;
      text-align: center;
    }

    .pw-preview-chips {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      justify-content: center;
      margin-top: 8px;
    }

    .pw-preview-chip {
      padding: 5px 14px;
      border-radius: 99px;
      background: var(--bg-card);
      border: 1px solid var(--border-mid);
      font-size: 12px;
      color: var(--text-muted);
    }

    /* ── Generating animation ── */
    .pw-generating {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
      gap: 20px;
      padding: 60px;
    }

    .pw-gen-animation {
      width: 80px;
      height: 80px;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 8px;
    }

    .gen-ring {
      position: absolute;
      inset: 0;
      border-radius: 50%;
      border: 2px solid transparent;
      border-top-color: var(--gold);
      animation: spin 1s linear infinite;
    }

    .gen-ring-2 {
      position: absolute;
      inset: 8px;
      border-radius: 50%;
      border: 2px solid transparent;
      border-top-color: var(--accent);
      animation: spin 1.4s linear infinite reverse;
    }

    .pw-progress {
      width: 280px;
      height: 3px;
      background: var(--bg-elevated);
      border-radius: 99px;
      overflow: hidden;
    }

    .pw-progress-bar {
      height: 100%;
      background: linear-gradient(90deg, var(--gold), var(--accent));
      border-radius: 99px;
      width: 0%;
      transition: width 0.6s ease;
    }

    .pw-steps-list {
      display: flex;
      flex-direction: column;
      gap: 6px;
      min-height: 100px;
    }

    .pw-step-item {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 12px;
      color: var(--text-secondary);
      font-family: var(--font-mono);
      animation: slideInLeft 0.3s ease;
    }

    @keyframes slideInLeft {
      from { opacity: 0; transform: translateX(-10px); }
      to { opacity: 1; transform: translateX(0); }
    }

    .pw-step-dot {
      color: var(--gold);
      font-size: 8px;
    }

    /* ── Result ── */
    .pw-result {
      padding: 32px 40px;
      animation: pageIn 0.3s ease;
    }

    .pw-result-header {
      margin-bottom: 28px;
      padding-bottom: 20px;
      border-bottom: 1px solid var(--border-subtle);
    }

    .pw-result-meta {
      display: flex;
      gap: 10px;
      margin-bottom: 12px;
    }

    .pw-result-platform,
    .pw-result-type {
      font-size: 11px;
      font-family: var(--font-mono);
      letter-spacing: 1px;
      padding: 3px 12px;
      border-radius: 99px;
    }

    .pw-result-platform {
      background: var(--gold-glow);
      color: var(--gold);
      border: 1px solid rgba(201,168,76,0.2);
    }

    .pw-result-type {
      background: var(--accent-dim);
      color: var(--accent-light);
      border: 1px solid rgba(124,109,250,0.2);
    }

    .pw-result-title {
      font-size: 1.1rem;
      font-weight: 700;
      margin-bottom: 16px;
      color: var(--text-primary);
    }

    .pw-result-actions {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
    }

    .pw-result-body {
      background: var(--bg-card);
      border: 1px solid var(--border-mid);
      border-radius: var(--radius-lg);
      padding: 36px;
      line-height: 1.85;
    }

    .pw-content { font-size: 14px; color: var(--text-secondary); }
    .pw-content h1 { font-size: 1.5rem; color: var(--text-primary); margin: 16px 0 12px; font-weight: 700; }
    .pw-content h2 { font-size: 1.1rem; color: var(--gold); margin: 24px 0 10px; font-weight: 600; padding-bottom: 8px; border-bottom: 1px solid var(--border-subtle); }
    .pw-content h3 { font-size: 1rem; color: var(--accent-light); margin: 18px 0 8px; font-weight: 600; }
    .pw-content p { margin: 10px 0; }
    .pw-content strong { color: var(--text-primary); }
    .pw-content em { color: var(--accent-light); }
    .pw-content ul { margin: 10px 0 10px 20px; }
    .pw-content li { margin: 6px 0; color: var(--text-secondary); }
    .pw-content code { font-family: var(--font-mono); font-size: 12px; background: rgba(255,255,255,0.06); padding: 2px 8px; border-radius: 4px; color: var(--gold); }
    .pw-content pre { background: var(--bg-surface); border: 1px solid var(--border-mid); border-radius: var(--radius-sm); padding: 20px; overflow-x: auto; margin: 16px 0; }
    .pw-content pre code { background: none; color: #a0f0d8; font-size: 13px; }

    /* ── History ── */
    .pw-history-item {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 8px 10px;
      border-radius: var(--radius-sm);
      cursor: pointer;
      transition: all 0.2s;
      border: 1px solid transparent;
    }

    .pw-history-item:hover {
      background: var(--bg-elevated);
      border-color: var(--border-mid);
    }

    .pw-history-platform {
      font-size: 18px;
      width: 24px;
      text-align: center;
      flex-shrink: 0;
    }

    .pw-history-title {
      font-size: 12px;
      color: var(--text-secondary);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .pw-history-meta {
      font-size: 10px;
      color: var(--text-muted);
      font-family: var(--font-mono);
      margin-top: 2px;
    }

    @media (max-width: 900px) {
      .pw-layout { grid-template-columns: 1fr; height: auto; }
      .pw-right { min-height: 60vh; }
    }
  `,document.head.appendChild(e)}function je(e,t,n){let r=localStorage.getItem(`d8_token`),i=`/api/tools/export/${e}?format=${t}`,a=document.createElement(`a`);fetch(i,{headers:{Authorization:`Bearer ${r}`}}).then(e=>e.blob()).then(e=>{a.href=URL.createObjectURL(e),a.download=`${n}.${t}`,a.click(),URL.revokeObjectURL(a.href),m(`${t.toUpperCase()} downloaded!`)}).catch(()=>h(`Download failed`))}function Me(e,t){let n=e.title.replace(/[^a-z0-9]/gi,`-`).slice(0,50),r=document.createElement(`div`);r.className=`export-bar`,r.innerHTML=`
    <span style="font-size:13px;font-weight:600;color:var(--text-secondary);flex:1;">${e.title}</span>
    <button class="btn btn-secondary btn-sm" data-fmt="html">⬇ HTML</button>
    <button class="btn btn-secondary btn-sm" data-fmt="docx">📝 DOCX</button>
    <button class="btn btn-secondary btn-sm" data-fmt="pptx">📊 PPTX</button>
    <button class="btn btn-primary btn-sm" data-fmt="pdf">📄 PDF</button>
    <button class="btn btn-ghost btn-sm" id="copy-btn-exp">📋 Copy</button>
  `,r.querySelectorAll(`[data-fmt]`).forEach(t=>{t.addEventListener(`click`,()=>je(e._id,t.dataset.fmt,n))}),r.querySelector(`#copy-btn-exp`).addEventListener(`click`,()=>{navigator.clipboard.writeText(e.content),m(`Copied!`)}),t.appendChild(r)}function Ne(e){return e.replace(/```([\s\S]*?)```/g,`<pre><code>$1</code></pre>`).replace(/`([^`]+)`/g,`<code>$1</code>`).replace(/^### (.+)$/gm,`<h3>$1</h3>`).replace(/^## (.+)$/gm,`<h2>$1</h2>`).replace(/^# (.+)$/gm,`<h1>$1</h1>`).replace(/\*\*(.+?)\*\*/g,`<strong>$1</strong>`).replace(/\*(.+?)\*/g,`<em>$1</em>`).replace(/^- (.+)$/gm,`<li>$1</li>`).replace(/(<li>[\s\S]*?<\/li>)/g,e=>`<ul>${e}</ul>`).replace(/\n\n/g,`</p><p>`).replace(/\n/g,`<br>`)}async function z({toolType:e,inputs:t,resultPanel:n,historyPanel:r,loadHistoryFn:a}){n.innerHTML=`
    <div class="tool-generating">
      <div class="
      <div style="font-size:16px;font-weight:700;margin-bottom:8px;">Generating...</div>
      <p style="color:var(--text-muted);font-size:13px;">AI is working on your request. This may take 30–60 seconds.</p>
      <div class="tool-progress"><div class="tool-progress-bar" id="tpbar"></div></div>
    </div>
  `;let o=0,s=setInterval(()=>{o=Math.min(o+2,88);let e=document.getElementById(`tpbar`);e&&(e.style.width=o+`%`)},600);try{let o=await i.post(`/tools/generate`,{toolType:e,inputs:t});clearInterval(s);let c=o.report;return m(`Generated successfully!`),B(c,n),a&&a(r),c}catch(e){return clearInterval(s),n.innerHTML=`<div class="tool-error"><div style="font-size:40px;">⚠</div><p style="color:var(--error);font-weight:700;">${e.message}</p><p style="font-size:12px;color:var(--text-muted);">Check your API key and try again.</p></div>`,h(e.message),null}}function B(e,t){t.innerHTML=``,Me(e,t);let n=document.createElement(`div`);n.className=`result-content`,n.innerHTML=`<p>${Ne(e.content)}</p>`,t.appendChild(n)}async function V(e,t){if(e){e.innerHTML=`<div class="loader"><div class="loader-dot"></div><div class="loader-dot"></div><div class="loader-dot"></div></div>`;try{let n=(await i.get(`/tools/reports${t?`?type=`+t:``}`)).reports||[];if(!n.length){e.innerHTML=`<div style="font-size:12px;color:var(--text-muted);">No history yet.</div>`;return}e.innerHTML=n.slice(0,8).map(e=>`
      <div class="hist-item" data-id="${e._id}">
        <div class="hist-title">${e.title}</div>
        <div class="hist-date">${new Date(e.createdAt).toLocaleDateString()}</div>
      </div>
    `).join(``)}catch{e.innerHTML=``}}}var Pe=[{id:`brand_kit`,label:`🎨 Brand Kit`,desc:`Logo concept, colors, typography, voice`},{id:`business_name`,label:`💡 Business Names`,desc:`Name ideas + domain suggestions`},{id:`slogan`,label:`✍ Slogan Creator`,desc:`Memorable taglines for your brand`}],H=`brand_kit`;function Fe(e){e.innerHTML=`
    <div class="app-shell">
      ${g(`#/brand-tools`)}
      <main class="main-content" style="padding:0;overflow:hidden;">
        <div class="tool-shell">
          <div class="tool-form-panel">
            <div class="tool-form-header">
              <h2 class="tool-form-title">🎨 Brand & Identity</h2>
              <p class="tool-form-sub">Build your brand from scratch with AI.</p>
            </div>
            <div class="tool-tabs" id="brand-tabs">
              ${Pe.map(e=>`<button class="tool-tab ${e.id===H?`active`:``}" data-tab="${e.id}">${e.label}</button>`).join(``)}
            </div>
            <div id="brand-form-area" style="padding:20px 24px;"></div>
            <div class="tool-form-footer">
              <button class="btn btn-primary" style="width:100%;" id="brand-gen-btn">✦ Generate</button>
            </div>
            <div class="tool-history-panel">
              <div class="section-title">History</div>
              <div id="brand-history" style="margin-top:8px;"></div>
            </div>
          </div>
          <div class="tool-result-panel" id="brand-result">
            <div class="tool-result-empty"><div style="font-size:56px;opacity:.15;">🎨</div><div style="font-size:17px;font-weight:600;color:var(--text-secondary);">Brand tools ready</div><p style="color:var(--text-muted);font-size:13px;max-width:300px;text-align:center;">Select a tool, fill in the form, and generate your brand assets.</p></div>
          </div>
        </div>
      </main>
    </div>
  `,U(),V(document.getElementById(`brand-history`),H),document.getElementById(`brand-tabs`).addEventListener(`click`,e=>{let t=e.target.closest(`[data-tab]`);t&&(H=t.dataset.tab,document.querySelectorAll(`#brand-tabs .tool-tab`).forEach(e=>e.classList.toggle(`active`,e.dataset.tab===H)),U(),V(document.getElementById(`brand-history`),H))}),document.getElementById(`brand-gen-btn`).addEventListener(`click`,Le),document.getElementById(`brand-history`).addEventListener(`click`,async e=>{let t=e.target.closest(`.hist-item`);t&&B((await i.get(`/tools/reports/${t.dataset.id}`)).report,document.getElementById(`brand-result`))})}function U(){let e=document.getElementById(`brand-form-area`);e.innerHTML={brand_kit:`
      <div class="form-group"><label class="form-label">Business Name *</label><input class="form-input" id="f-businessName" placeholder="e.g. NovaBuild"/></div>
      <div class="form-group"><label class="form-label">Industry *</label><input class="form-input" id="f-industry" placeholder="e.g. SaaS, Fashion, Health"/></div>
      <div class="form-group"><label class="form-label">Brand Values</label><input class="form-input" id="f-values" placeholder="e.g. Innovation, Trust, Quality"/></div>
      <div class="form-group"><label class="form-label">Target Audience</label><input class="form-input" id="f-targetAudience" placeholder="e.g. Young professionals 25-40"/></div>
      <div class="form-group"><label class="form-label">Style Preference</label><select class="form-select" id="f-style"><option>Modern & Minimal</option><option>Bold & Energetic</option><option>Elegant & Luxury</option><option>Playful & Friendly</option><option>Corporate & Professional</option></select></div>`,business_name:`
      <div class="form-group"><label class="form-label">Industry *</label><input class="form-input" id="f-industry" placeholder="e.g. AI Tools, Food Delivery"/></div>
      <div class="form-group"><label class="form-label">Business Description *</label><textarea class="form-textarea" id="f-description" placeholder="What does your business do?" style="min-height:80px;"></textarea></div>
      <div class="form-group"><label class="form-label">Name Style</label><select class="form-select" id="f-style"><option>Modern & Catchy</option><option>Professional & Trustworthy</option><option>Creative & Unique</option><option>Short & Punchy (1-2 syllables)</option><option>Descriptive</option></select></div>
      <div class="form-group"><label class="form-label">Target Market</label><input class="form-input" id="f-targetMarket" placeholder="e.g. Global, USA, Europe"/></div>`,slogan:`
      <div class="form-group"><label class="form-label">Business Name *</label><input class="form-input" id="f-businessName" placeholder="e.g. NovaBuild"/></div>
      <div class="form-group"><label class="form-label">Industry *</label><input class="form-input" id="f-industry" placeholder="e.g. Real Estate, Tech"/></div>
      <div class="form-group"><label class="form-label">Core Value</label><input class="form-input" id="f-coreValue" placeholder="e.g. Speed, Trust, Innovation"/></div>
      <div class="form-group"><label class="form-label">Target Audience</label><input class="form-input" id="f-targetAudience" placeholder="e.g. Small business owners"/></div>
      <div class="form-group"><label class="form-label">Tone</label><select class="form-select" id="f-tone"><option>Professional</option><option>Bold & Inspiring</option><option>Friendly & Warm</option><option>Witty & Smart</option><option>Luxury & Premium</option></select></div>`}[H]||``}function Ie(){let e=e=>document.getElementById(e)?.value?.trim()||``;return{businessName:e(`f-businessName`),industry:e(`f-industry`),values:e(`f-values`),targetAudience:e(`f-targetAudience`),style:e(`f-style`),description:e(`f-description`),targetMarket:e(`f-targetMarket`),coreValue:e(`f-coreValue`),tone:e(`f-tone`)}}async function Le(){let e=document.getElementById(`brand-gen-btn`);e.disabled=!0,e.innerHTML=`<span class="spinner"></span> Generating...`,await z({toolType:H,inputs:Ie(),resultPanel:document.getElementById(`brand-result`),historyPanel:document.getElementById(`brand-history`),loadHistoryFn:e=>V(e,H)}),e.disabled=!1,e.innerHTML=`✦ Generate`}var Re=[{id:`business_plan`,label:`📄 Business Plan`},{id:`competitor_matrix`,label:`🔍 Competitor Analysis`},{id:`pricing_calculator`,label:`💰 Pricing Strategy`},{id:`launch_roadmap`,label:`🚀 Launch Roadmap`}],W=`business_plan`,G={business_plan:`
    <div class="form-group"><label class="form-label">Business Name *</label><input class="form-input" id="f-businessName" placeholder="e.g. TechFlow AI"/></div>
    <div class="form-group"><label class="form-label">Industry *</label><input class="form-input" id="f-industry" placeholder="e.g. SaaS, E-commerce"/></div>
    <div class="form-group"><label class="form-label">Business Model</label><select class="form-select" id="f-businessModel"><option>SaaS</option><option>E-commerce</option><option>Marketplace</option><option>Service</option><option>Agency</option><option>Freemium</option><option>Physical Product</option></select></div>
    <div class="form-group"><label class="form-label">Target Market *</label><input class="form-input" id="f-targetMarket" placeholder="e.g. SMBs in the USA"/></div>
    <div class="form-row"><div class="form-group"><label class="form-label">Investment</label><input class="form-input" id="f-investment" placeholder="e.g. $50,000"/></div><div class="form-group"><label class="form-label">Location</label><input class="form-input" id="f-location" placeholder="e.g. USA, Online"/></div></div>
    <div class="form-group"><label class="form-label">Business Goals *</label><textarea class="form-textarea" id="f-goals" placeholder="e.g. Reach $1M ARR in 18 months" style="min-height:70px;"></textarea></div>`,competitor_matrix:`
    <div class="form-group"><label class="form-label">Your Business Name</label><input class="form-input" id="f-businessName" placeholder="e.g. My Startup"/></div>
    <div class="form-group"><label class="form-label">Industry *</label><input class="form-input" id="f-industry" placeholder="e.g. Project Management SaaS"/></div>
    <div class="form-group"><label class="form-label">Your Unique Angle</label><textarea class="form-textarea" id="f-uniqueAngle" placeholder="What makes you different?" style="min-height:70px;"></textarea></div>
    <div class="form-group"><label class="form-label">Region</label><select class="form-select" id="f-region"><option>Global</option><option>USA</option><option>Europe</option><option>Middle East</option><option>Asia</option></select></div>`,pricing_calculator:`
    <div class="form-group"><label class="form-label">Business Name *</label><input class="form-input" id="f-businessName" placeholder="e.g. DesignPro"/></div>
    <div class="form-group"><label class="form-label">Product/Service *</label><input class="form-input" id="f-product" placeholder="e.g. Logo design packages"/></div>
    <div class="form-group"><label class="form-label">Industry</label><input class="form-input" id="f-industry" placeholder="e.g. Design & Creative"/></div>
    <div class="form-row"><div class="form-group"><label class="form-label">Monthly Costs</label><input class="form-input" id="f-monthlyCosts" placeholder="e.g. $2,000"/></div><div class="form-group"><label class="form-label">Target Margin</label><input class="form-input" id="f-targetMargin" placeholder="e.g. 40%"/></div></div>
    <div class="form-group"><label class="form-label">Competitor Price Range</label><input class="form-input" id="f-competitorPricing" placeholder="e.g. $500–$5,000/project"/></div>`,launch_roadmap:`
    <div class="form-group"><label class="form-label">Business Name *</label><input class="form-input" id="f-businessName" placeholder="e.g. LaunchPad"/></div>
    <div class="form-group"><label class="form-label">Industry</label><input class="form-input" id="f-industry" placeholder="e.g. Mobile Apps"/></div>
    <div class="form-row"><div class="form-group"><label class="form-label">Budget</label><select class="form-select" id="f-budget"><option>Under $500</option><option>$500–$2,000</option><option>$2,000–$10,000</option><option>$10,000+</option></select></div><div class="form-group"><label class="form-label">Team Size</label><select class="form-select" id="f-teamSize"><option>Solo founder</option><option>2–3 people</option><option>4–10 people</option><option>10+ people</option></select></div></div>
    <div class="form-group"><label class="form-label">Current Status</label><select class="form-select" id="f-currentStatus"><option>Idea stage</option><option>MVP built</option><option>Beta testing</option><option>Pre-launch</option></select></div>
    <div class="form-group"><label class="form-label">Launch Goal</label><textarea class="form-textarea" id="f-goal" placeholder="e.g. Get 100 paying customers" style="min-height:60px;"></textarea></div>`};function ze(e){e.innerHTML=`
    <div class="app-shell">
      ${g(`#/strategy-tools`)}
      <main class="main-content" style="padding:0;overflow:hidden;">
        <div class="tool-shell">
          <div class="tool-form-panel">
            <div class="tool-form-header">
              <h2 class="tool-form-title">📋 Planning & Strategy</h2>
              <p class="tool-form-sub">Business plans, competitor analysis, pricing, and launch roadmaps.</p>
            </div>
            <div class="tool-tabs" id="strat-tabs">
              ${Re.map(e=>`<button class="tool-tab ${e.id===W?`active`:``}" data-tab="${e.id}">${e.label}</button>`).join(``)}
            </div>
            <div id="strat-form" style="padding:20px 24px;"></div>
            <div class="tool-form-footer"><button class="btn btn-primary" style="width:100%;" id="strat-gen-btn">✦ Generate</button></div>
            <div class="tool-history-panel"><div class="section-title">History</div><div id="strat-history" style="margin-top:8px;"></div></div>
          </div>
          <div class="tool-result-panel" id="strat-result">
            <div class="tool-result-empty"><div style="font-size:56px;opacity:.15;">📋</div><div style="font-size:17px;font-weight:600;color:var(--text-secondary);">Strategy tools ready</div><p style="color:var(--text-muted);font-size:13px;max-width:280px;text-align:center;">Generate business plans, competitor matrices, pricing strategies, and launch roadmaps.</p></div>
          </div>
        </div>
      </main>
    </div>
  `,document.getElementById(`strat-form`).innerHTML=G[W]||``,V(document.getElementById(`strat-history`),W),document.getElementById(`strat-tabs`).addEventListener(`click`,e=>{let t=e.target.closest(`[data-tab]`);t&&(W=t.dataset.tab,document.querySelectorAll(`#strat-tabs .tool-tab`).forEach(e=>e.classList.toggle(`active`,e.dataset.tab===W)),document.getElementById(`strat-form`).innerHTML=G[W]||``,V(document.getElementById(`strat-history`),W))}),document.getElementById(`strat-gen-btn`).addEventListener(`click`,async()=>{let e=document.getElementById(`strat-gen-btn`);e.disabled=!0,e.innerHTML=`<span class="spinner"></span> Generating...`;let t=e=>document.getElementById(e)?.value?.trim()||``,n={businessName:t(`f-businessName`),industry:t(`f-industry`),businessModel:t(`f-businessModel`),targetMarket:t(`f-targetMarket`),investment:t(`f-investment`),location:t(`f-location`),goals:t(`f-goals`),uniqueAngle:t(`f-uniqueAngle`),region:t(`f-region`),product:t(`f-product`),monthlyCosts:t(`f-monthlyCosts`),targetMargin:t(`f-targetMargin`),competitorPricing:t(`f-competitorPricing`),budget:t(`f-budget`),teamSize:t(`f-teamSize`),currentStatus:t(`f-currentStatus`),goal:t(`f-goal`)};await z({toolType:W,inputs:n,resultPanel:document.getElementById(`strat-result`),historyPanel:document.getElementById(`strat-history`),loadHistoryFn:e=>V(e,W)}),e.disabled=!1,e.innerHTML=`✦ Generate`}),document.getElementById(`strat-history`).addEventListener(`click`,async e=>{let t=e.target.closest(`.hist-item`);t&&B((await i.get(`/tools/reports/${t.dataset.id}`)).report,document.getElementById(`strat-result`))})}var Be=[{id:`contract`,label:`📜 Contract Generator`},{id:`budget_estimator`,label:`💼 Budget Estimator`},{id:`pitch_deck`,label:`🎯 Pitch Deck Builder`}],K=`contract`,Ve={contract:`
    <div class="form-group"><label class="form-label">Contract Type *</label><select class="form-select" id="f-contractType"><option>Service Agreement</option><option>NDA (Non-Disclosure Agreement)</option><option>Freelance Contract</option><option>Partnership Agreement</option><option>Terms of Service</option><option>Employment Contract</option><option>Consulting Agreement</option></select></div>
    <div class="form-group"><label class="form-label">Your Business / Name *</label><input class="form-input" id="f-partyA" placeholder="e.g. Double Eight LLC"/></div>
    <div class="form-group"><label class="form-label">Client / Other Party</label><input class="form-input" id="f-partyB" placeholder="e.g. Client Company Inc."/></div>
    <div class="form-group"><label class="form-label">Service / Product *</label><textarea class="form-textarea" id="f-service" placeholder="Describe the scope of work" style="min-height:70px;"></textarea></div>
    <div class="form-row"><div class="form-group"><label class="form-label">Payment Terms</label><input class="form-input" id="f-payment" placeholder="e.g. $5,000 net 30"/></div><div class="form-group"><label class="form-label">Duration</label><input class="form-input" id="f-duration" placeholder="e.g. 3 months"/></div></div>
    <div class="form-group"><label class="form-label">Jurisdiction</label><input class="form-input" id="f-jurisdiction" placeholder="e.g. State of California, USA"/></div>`,budget_estimator:`
    <div class="form-group"><label class="form-label">Business Type *</label><input class="form-input" id="f-businessType" placeholder="e.g. SaaS Platform, Restaurant, Agency"/></div>
    <div class="form-group"><label class="form-label">Industry</label><input class="form-input" id="f-industry" placeholder="e.g. Technology, Food & Beverage"/></div>
    <div class="form-row"><div class="form-group"><label class="form-label">Location</label><input class="form-input" id="f-location" placeholder="e.g. New York, Online"/></div><div class="form-group"><label class="form-label">Team Size</label><select class="form-select" id="f-teamSize"><option>Solo</option><option>2–3 people</option><option>4–10 people</option><option>10+</option></select></div></div>
    <div class="form-group"><label class="form-label">Revenue Model</label><select class="form-select" id="f-revenueModel"><option>Service-based</option><option>SaaS Subscription</option><option>E-commerce</option><option>Marketplace</option><option>Consulting</option></select></div>
    <div class="form-group"><label class="form-label">Target Monthly Revenue (Month 6)</label><input class="form-input" id="f-targetRevenue" placeholder="e.g. $20,000"/></div>`,pitch_deck:`
    <div class="form-group"><label class="form-label">Business Name *</label><input class="form-input" id="f-businessName" placeholder="e.g. AeroTech Ventures"/></div>
    <div class="form-group"><label class="form-label">Industry *</label><input class="form-input" id="f-industry" placeholder="e.g. Clean Energy, FinTech"/></div>
    <div class="form-group"><label class="form-label">Problem You Solve *</label><textarea class="form-textarea" id="f-problem" placeholder="What painful problem do you address?" style="min-height:70px;"></textarea></div>
    <div class="form-group"><label class="form-label">Your Solution *</label><textarea class="form-textarea" id="f-solution" placeholder="How do you solve it uniquely?" style="min-height:70px;"></textarea></div>
    <div class="form-row"><div class="form-group"><label class="form-label">Traction</label><input class="form-input" id="f-traction" placeholder="e.g. 500 beta users, $30k MRR"/></div><div class="form-group"><label class="form-label">Funding Ask</label><input class="form-input" id="f-fundingAsk" placeholder="e.g. $2M Seed Round"/></div></div>
    <div class="form-group"><label class="form-label">Use of Funds</label><input class="form-input" id="f-useOfFunds" placeholder="e.g. 60% product, 30% marketing, 10% ops"/></div>`};function He(e){e.innerHTML=`
    <div class="app-shell">
      ${g(`#/legal-tools`)}
      <main class="main-content" style="padding:0;overflow:hidden;">
        <div class="tool-shell">
          <div class="tool-form-panel">
            <div class="tool-form-header">
              <h2 class="tool-form-title">⚖️ Legal & Admin</h2>
              <p class="tool-form-sub">Contracts, budgets, and investor pitch decks.</p>
            </div>
            <div class="tool-tabs" id="legal-tabs">
              ${Be.map(e=>`<button class="tool-tab ${e.id===K?`active`:``}" data-tab="${e.id}">${e.label}</button>`).join(``)}
            </div>
            <div id="legal-form" style="padding:20px 24px;"></div>
            <div style="padding:0 24px 8px;"><div style="background:rgba(251,191,36,.06);border:1px solid rgba(251,191,36,.15);border-radius:8px;padding:10px 14px;font-size:11px;color:#fbbf24;margin-bottom:16px;">⚠ AI-generated documents are templates. Always consult a licensed attorney before use.</div></div>
            <div class="tool-form-footer"><button class="btn btn-primary" style="width:100%;" id="legal-gen-btn">✦ Generate</button></div>
            <div class="tool-history-panel"><div class="section-title">History</div><div id="legal-history" style="margin-top:8px;"></div></div>
          </div>
          <div class="tool-result-panel" id="legal-result">
            <div class="tool-result-empty"><div style="font-size:56px;opacity:.15;">⚖️</div><div style="font-size:17px;font-weight:600;color:var(--text-secondary);">Legal tools ready</div><p style="color:var(--text-muted);font-size:13px;max-width:280px;text-align:center;">Generate contracts, budget plans, and investor pitch decks.</p></div>
          </div>
        </div>
      </main>
    </div>
  `,document.getElementById(`legal-form`).innerHTML=Ve[K]||``,V(document.getElementById(`legal-history`),K),document.getElementById(`legal-tabs`).addEventListener(`click`,e=>{let t=e.target.closest(`[data-tab]`);t&&(K=t.dataset.tab,document.querySelectorAll(`#legal-tabs .tool-tab`).forEach(e=>e.classList.toggle(`active`,e.dataset.tab===K)),document.getElementById(`legal-form`).innerHTML=Ve[K]||``,V(document.getElementById(`legal-history`),K))}),document.getElementById(`legal-gen-btn`).addEventListener(`click`,async()=>{let e=document.getElementById(`legal-gen-btn`);e.disabled=!0,e.innerHTML=`<span class="spinner"></span> Generating...`;let t=e=>document.getElementById(e)?.value?.trim()||``,n={contractType:t(`f-contractType`),partyA:t(`f-partyA`),partyB:t(`f-partyB`),service:t(`f-service`),payment:t(`f-payment`),duration:t(`f-duration`),jurisdiction:t(`f-jurisdiction`),businessType:t(`f-businessType`),industry:t(`f-industry`),location:t(`f-location`),teamSize:t(`f-teamSize`),revenueModel:t(`f-revenueModel`),targetRevenue:t(`f-targetRevenue`),businessName:t(`f-businessName`),problem:t(`f-problem`),solution:t(`f-solution`),traction:t(`f-traction`),fundingAsk:t(`f-fundingAsk`),useOfFunds:t(`f-useOfFunds`)};await z({toolType:K,inputs:n,resultPanel:document.getElementById(`legal-result`),historyPanel:document.getElementById(`legal-history`),loadHistoryFn:e=>V(e,K)}),e.disabled=!1,e.innerHTML=`✦ Generate`}),document.getElementById(`legal-history`).addEventListener(`click`,async e=>{let t=e.target.closest(`.hist-item`);t&&B((await i.get(`/tools/reports/${t.dataset.id}`)).report,document.getElementById(`legal-result`))})}var Ue=[{id:`ad_copy`,label:`📣 Ad Generator`},{id:`seo_keywords`,label:`🔎 SEO Keywords`},{id:`content_calendar`,label:`📅 Content Calendar`},{id:`market_study`,label:`📊 Market Study`}],q=`ad_copy`,J={ad_copy:`
    <div class="form-group"><label class="form-label">Business Name *</label><input class="form-input" id="f-businessName" placeholder="e.g. SwiftPay"/></div>
    <div class="form-group"><label class="form-label">Product / Service *</label><input class="form-input" id="f-product" placeholder="e.g. Online payment processing for SMBs"/></div>
    <div class="form-group"><label class="form-label">Target Audience *</label><input class="form-input" id="f-targetAudience" placeholder="e.g. Small business owners 30-55"/></div>
    <div class="form-group"><label class="form-label">Key Benefit</label><input class="form-input" id="f-keyBenefit" placeholder="e.g. Get paid 2x faster with zero fees"/></div>
    <div class="form-row"><div class="form-group"><label class="form-label">Monthly Ad Budget</label><select class="form-select" id="f-budget"><option>Under $500</option><option>$500–$2,000</option><option>$2,000–$10,000</option><option>$10,000+</option></select></div><div class="form-group"><label class="form-label">Campaign Goal</label><select class="form-select" id="f-goal"><option>Lead generation</option><option>Sales / Conversions</option><option>Brand awareness</option><option>App installs</option><option>Website traffic</option></select></div></div>`,seo_keywords:`
    <div class="form-group"><label class="form-label">Business Name *</label><input class="form-input" id="f-businessName" placeholder="e.g. GreenHome Store"/></div>
    <div class="form-group"><label class="form-label">Industry *</label><input class="form-input" id="f-industry" placeholder="e.g. Eco-friendly home goods"/></div>
    <div class="form-group"><label class="form-label">Website</label><input class="form-input" id="f-website" placeholder="e.g. greenhome.com (or New website)"/></div>
    <div class="form-row"><div class="form-group"><label class="form-label">Target Location</label><select class="form-select" id="f-location"><option>Global</option><option>USA</option><option>UK</option><option>Europe</option><option>Middle East</option><option>Australia</option></select></div><div class="form-group"><label class="form-label">Current Ranking</label><select class="form-select" id="f-currentRanking"><option>Not ranking</option><option>Page 3+</option><option>Page 2</option><option>Page 1 (improving)</option></select></div></div>
    <div class="form-group"><label class="form-label">Main Competitors (optional)</label><input class="form-input" id="f-competitors" placeholder="e.g. ecostore.com, naturalhome.com"/></div>`,content_calendar:`
    <div class="form-group"><label class="form-label">Business Name *</label><input class="form-input" id="f-businessName" placeholder="e.g. FitLife Coaching"/></div>
    <div class="form-group"><label class="form-label">Industry *</label><input class="form-input" id="f-industry" placeholder="e.g. Health & Wellness"/></div>
    <div class="form-group"><label class="form-label">Platforms</label><select class="form-select" id="f-platforms"><option>Instagram + LinkedIn + X</option><option>Instagram + TikTok</option><option>LinkedIn only</option><option>Instagram only</option><option>X (Twitter) only</option><option>All platforms</option></select></div>
    <div class="form-group"><label class="form-label">Brand Voice</label><select class="form-select" id="f-brandVoice"><option>Professional but friendly</option><option>Bold and motivational</option><option>Educational and informative</option><option>Casual and fun</option><option>Luxury and exclusive</option></select></div>
    <div class="form-group"><label class="form-label">Content Goals</label><select class="form-select" id="f-goals"><option>Brand awareness and engagement</option><option>Lead generation</option><option>Product sales</option><option>Community building</option><option>Thought leadership</option></select></div>`,market_study:`
    <div class="form-group"><label class="form-label">Industry / Niche *</label><input class="form-input" id="f-niche" placeholder="e.g. AI writing tools for creators"/></div>
    <div class="form-group"><label class="form-label">Product / Service</label><input class="form-input" id="f-product" placeholder="e.g. AI script generator subscription"/></div>
    <div class="form-group"><label class="form-label">Target Region</label><select class="form-select" id="f-region"><option>Global</option><option>USA</option><option>Europe</option><option>Middle East</option><option>Asia</option><option>Latin America</option></select></div>
    <div class="form-group"><label class="form-label">Budget Range</label><select class="form-select" id="f-budget"><option>Under $1,000</option><option>$1,000–$10,000</option><option>$10,000–$50,000</option><option>$50,000+</option></select></div>`};function We(e){e.innerHTML=`
    <div class="app-shell">
      ${g(`#/marketing-tools`)}
      <main class="main-content" style="padding:0;overflow:hidden;">
        <div class="tool-shell">
          <div class="tool-form-panel">
            <div class="tool-form-header">
              <h2 class="tool-form-title">📣 Marketing & Ads</h2>
              <p class="tool-form-sub">Ad copy, SEO, content calendars, and market studies.</p>
            </div>
            <div class="tool-tabs" id="mkt-tabs">
              ${Ue.map(e=>`<button class="tool-tab ${e.id===q?`active`:``}" data-tab="${e.id}">${e.label}</button>`).join(``)}
            </div>
            <div id="mkt-form" style="padding:20px 24px;"></div>
            <div class="tool-form-footer"><button class="btn btn-primary" style="width:100%;" id="mkt-gen-btn">✦ Generate</button></div>
            <div class="tool-history-panel"><div class="section-title">History</div><div id="mkt-history" style="margin-top:8px;"></div></div>
          </div>
          <div class="tool-result-panel" id="mkt-result">
            <div class="tool-result-empty"><div style="font-size:56px;opacity:.15;">📣</div><div style="font-size:17px;font-weight:600;color:var(--text-secondary);">Marketing tools ready</div><p style="color:var(--text-muted);font-size:13px;max-width:280px;text-align:center;">Generate ads, SEO plans, content calendars, and market studies.</p></div>
          </div>
        </div>
      </main>
    </div>
  `,document.getElementById(`mkt-form`).innerHTML=J[q]||``,V(document.getElementById(`mkt-history`),q),document.getElementById(`mkt-tabs`).addEventListener(`click`,e=>{let t=e.target.closest(`[data-tab]`);t&&(q=t.dataset.tab,document.querySelectorAll(`#mkt-tabs .tool-tab`).forEach(e=>e.classList.toggle(`active`,e.dataset.tab===q)),document.getElementById(`mkt-form`).innerHTML=J[q]||``,V(document.getElementById(`mkt-history`),q))}),document.getElementById(`mkt-gen-btn`).addEventListener(`click`,async()=>{let e=document.getElementById(`mkt-gen-btn`);e.disabled=!0,e.innerHTML=`<span class="spinner"></span> Generating...`;let t=e=>document.getElementById(e)?.value?.trim()||``,n={businessName:t(`f-businessName`),product:t(`f-product`),targetAudience:t(`f-targetAudience`),keyBenefit:t(`f-keyBenefit`),budget:t(`f-budget`),goal:t(`f-goal`),industry:t(`f-industry`),website:t(`f-website`),location:t(`f-location`),currentRanking:t(`f-currentRanking`),competitors:t(`f-competitors`),platforms:t(`f-platforms`),brandVoice:t(`f-brandVoice`),goals:t(`f-goals`),niche:t(`f-niche`),region:t(`f-region`)};await z({toolType:q,inputs:n,resultPanel:document.getElementById(`mkt-result`),historyPanel:document.getElementById(`mkt-history`),loadHistoryFn:e=>V(e,q)}),e.disabled=!1,e.innerHTML=`✦ Generate`}),document.getElementById(`mkt-history`).addEventListener(`click`,async e=>{let t=e.target.closest(`.hist-item`);t&&B((await i.get(`/tools/reports/${t.dataset.id}`)).report,document.getElementById(`mkt-result`))})}var Ge=[{id:`cold_email`,label:`📧 Cold Email Engine`},{id:`website_copy`,label:`🌐 Website Copywriter`},{id:`sales_script`,label:`📞 Sales Script`}],Y=`cold_email`,Ke={cold_email:`
    <div class="form-group"><label class="form-label">Your Business *</label><input class="form-input" id="f-senderBusiness" placeholder="e.g. DesignPro Agency"/></div>
    <div class="form-group"><label class="form-label">Target Prospect *</label><input class="form-input" id="f-targetProspect" placeholder="e.g. E-commerce store owners with 50+ employees"/></div>
    <div class="form-group"><label class="form-label">Industry</label><input class="form-input" id="f-industry" placeholder="e.g. E-commerce, SaaS, Real Estate"/></div>
    <div class="form-group"><label class="form-label">Your Value Proposition *</label><textarea class="form-textarea" id="f-valueProp" placeholder="What specific result do you deliver?" style="min-height:70px;"></textarea></div>
    <div class="form-row"><div class="form-group"><label class="form-label">Goal</label><select class="form-select" id="f-goal"><option>Book a discovery call</option><option>Get a reply</option><option>Demo request</option><option>Partnership</option></select></div><div class="form-group"><label class="form-label">Tone</label><select class="form-select" id="f-tone"><option>Professional but warm</option><option>Direct and punchy</option><option>Friendly and casual</option><option>Executive-level formal</option></select></div></div>`,website_copy:`
    <div class="form-group"><label class="form-label">Business Name *</label><input class="form-input" id="f-businessName" placeholder="e.g. CloudVault"/></div>
    <div class="form-group"><label class="form-label">Industry *</label><input class="form-input" id="f-industry" placeholder="e.g. Cloud Storage SaaS"/></div>
    <div class="form-group"><label class="form-label">Primary Offer *</label><input class="form-input" id="f-offer" placeholder="e.g. Secure file storage for remote teams"/></div>
    <div class="form-group"><label class="form-label">Target Customer *</label><input class="form-input" id="f-targetCustomer" placeholder="e.g. Remote teams of 10–100 people"/></div>
    <div class="form-group"><label class="form-label">Unique Selling Point</label><input class="form-input" id="f-usp" placeholder="e.g. End-to-end encryption, 99.9% uptime"/></div>
    <div class="form-group"><label class="form-label">Brand Tone</label><select class="form-select" id="f-tone"><option>Professional & trustworthy</option><option>Bold & innovative</option><option>Friendly & approachable</option><option>Luxury & premium</option><option>Technical & precise</option></select></div>`,sales_script:`
    <div class="form-group"><label class="form-label">Business Name *</label><input class="form-input" id="f-businessName" placeholder="e.g. SkyMarketing"/></div>
    <div class="form-group"><label class="form-label">Product / Service *</label><input class="form-input" id="f-product" placeholder="e.g. Done-for-you Facebook ads management"/></div>
    <div class="form-group"><label class="form-label">Target Client *</label><input class="form-input" id="f-targetClient" placeholder="e.g. Local business owners spending $1k+/mo on ads"/></div>
    <div class="form-row"><div class="form-group"><label class="form-label">Price Point</label><input class="form-input" id="f-price" placeholder="e.g. $2,500/month"/></div><div class="form-group"><label class="form-label">Sales Channel</label><select class="form-select" id="f-channel"><option>Phone call</option><option>Video call (Zoom)</option><option>In-person meeting</option><option>Demo presentation</option></select></div></div>
    <div class="form-group"><label class="form-label">Common Objections</label><input class="form-input" id="f-objections" placeholder="e.g. Price too high, already working with someone, bad timing"/></div>`};function qe(e){e.innerHTML=`
    <div class="app-shell">
      ${g(`#/sales-tools`)}
      <main class="main-content" style="padding:0;overflow:hidden;">
        <div class="tool-shell">
          <div class="tool-form-panel">
            <div class="tool-form-header">
              <h2 class="tool-form-title">💼 Sales & Communication</h2>
              <p class="tool-form-sub">Cold emails, website copy, and sales scripts to close deals.</p>
            </div>
            <div class="tool-tabs" id="sales-tabs">
              ${Ge.map(e=>`<button class="tool-tab ${e.id===Y?`active`:``}" data-tab="${e.id}">${e.label}</button>`).join(``)}
            </div>
            <div id="sales-form" style="padding:20px 24px;"></div>
            <div class="tool-form-footer"><button class="btn btn-primary" style="width:100%;" id="sales-gen-btn">✦ Generate</button></div>
            <div class="tool-history-panel"><div class="section-title">History</div><div id="sales-history" style="margin-top:8px;"></div></div>
          </div>
          <div class="tool-result-panel" id="sales-result">
            <div class="tool-result-empty"><div style="font-size:56px;opacity:.15;">💼</div><div style="font-size:17px;font-weight:600;color:var(--text-secondary);">Sales tools ready</div><p style="color:var(--text-muted);font-size:13px;max-width:280px;text-align:center;">Generate cold email sequences, website copy, and sales scripts.</p></div>
          </div>
        </div>
      </main>
    </div>
  `,document.getElementById(`sales-form`).innerHTML=Ke[Y]||``,V(document.getElementById(`sales-history`),Y),document.getElementById(`sales-tabs`).addEventListener(`click`,e=>{let t=e.target.closest(`[data-tab]`);t&&(Y=t.dataset.tab,document.querySelectorAll(`#sales-tabs .tool-tab`).forEach(e=>e.classList.toggle(`active`,e.dataset.tab===Y)),document.getElementById(`sales-form`).innerHTML=Ke[Y]||``,V(document.getElementById(`sales-history`),Y))}),document.getElementById(`sales-gen-btn`).addEventListener(`click`,async()=>{let e=document.getElementById(`sales-gen-btn`);e.disabled=!0,e.innerHTML=`<span class="spinner"></span> Generating...`;let t=e=>document.getElementById(e)?.value?.trim()||``,n={senderBusiness:t(`f-senderBusiness`),targetProspect:t(`f-targetProspect`),industry:t(`f-industry`),valueProp:t(`f-valueProp`),goal:t(`f-goal`),tone:t(`f-tone`),businessName:t(`f-businessName`),offer:t(`f-offer`),targetCustomer:t(`f-targetCustomer`),usp:t(`f-usp`),product:t(`f-product`),targetClient:t(`f-targetClient`),price:t(`f-price`),channel:t(`f-channel`),objections:t(`f-objections`)};await z({toolType:Y,inputs:n,resultPanel:document.getElementById(`sales-result`),historyPanel:document.getElementById(`sales-history`),loadHistoryFn:e=>V(e,Y)}),e.disabled=!1,e.innerHTML=`✦ Generate`}),document.getElementById(`sales-history`).addEventListener(`click`,async e=>{let t=e.target.closest(`.hist-item`);t&&B((await i.get(`/tools/reports/${t.dataset.id}`)).report,document.getElementById(`sales-result`))})}function Je(e,t=`#/`){let n=s(),r=c(),i=r?[{href:`#/dashboard`,label:`Dashboard`},{href:`#/chat`,label:`AI Chat`},{href:`#/brand-tools`,label:`Brand`},{href:`#/strategy-tools`,label:`Strategy`},{href:`#/legal-tools`,label:`Legal`},{href:`#/marketing-tools`,label:`Marketing`},{href:`#/sales-tools`,label:`Sales`},{href:`#/prompt-writer`,label:`✦ Prompts`}]:[{href:`#/`,label:`Home`},{href:`#/membership`,label:`Pricing`}];e.innerHTML=`
    <header class="header">
      <a class="header-logo" href="#/">
        <div class="logo-badge">88</div>
        <div class="logo-text">
          <span class="logo-name">Double Eight</span>
          <span class="logo-sub">AI Business Builder</span>
        </div>
      </a>

      <nav class="header-nav" id="main-nav">
        ${i.map(e=>`<a href="${e.href}" class="${t===e.href?`active`:``}">${e.label}</a>`).join(``)}
      </nav>

      <div class="header-right">
        ${r?`
          <a href="#/membership" class="btn btn-gold-outline btn-sm">⚡ Upgrade</a>
          <button class="user-avatar-btn" id="user-menu-btn" title="${n?.name}">${n?.name?.charAt(0).toUpperCase()||`U`}</button>
        `:`
          <a href="#/login" class="btn btn-ghost btn-sm">Sign In</a>
          <a href="#/register" class="btn btn-primary btn-sm">Get Started</a>
        `}
        <button class="hamburger-btn" id="hamburger-btn" aria-label="Open menu">
          <span></span><span></span><span></span>
        </button>
      </div>
    </header>
  `,document.getElementById(`hamburger-btn`)?.addEventListener(`click`,()=>Ye(i,n,r,t)),r&&document.getElementById(`user-menu-btn`)?.addEventListener(`click`,()=>Ze(n))}function Ye(e,t,n,r){if(document.getElementById(`mobile-drawer-overlay`)){X();return}let i=document.createElement(`div`);i.id=`mobile-drawer-overlay`,i.className=`sidebar-overlay`,i.style.display=`block`;let a=document.createElement(`div`);a.className=`sidebar-drawer`,a.innerHTML=`
    <div style="display:flex;align-items:center;justify-content:space-between;padding:0 8px 20px;margin-bottom:8px;border-bottom:1px solid var(--border-subtle);">
      <div style="display:flex;align-items:center;gap:12px;">
        <div class="logo-badge" style="width:32px;height:32px;font-size:13px;">88</div>
        <span style="font-family:var(--font-display);font-size:16px;font-weight:600;">Double Eight</span>
      </div>
      <button id="close-drawer" style="background:none;border:none;color:var(--text-muted);font-size:20px;cursor:pointer;padding:4px;">✕</button>
    </div>
    ${e.map(e=>`
      <a href="${e.href}" class="sidebar-link ${r===e.href?`active`:``}" onclick="document.getElementById('mobile-drawer-overlay')?.remove()">
        <span class="icon">${Xe(e.href)}</span> ${e.label}
      </a>
    `).join(``)}
    <div style="flex:1;"></div>
    ${n?`
      <div style="padding-top:16px;border-top:1px solid var(--border-subtle);margin-top:16px;">
        <button class="sidebar-link" id="mobile-logout" style="width:100%;color:var(--error);">→ Sign Out</button>
      </div>
    `:`
      <div style="padding-top:16px;border-top:1px solid var(--border-subtle);margin-top:16px;display:flex;flex-direction:column;gap:8px;">
        <a href="#/login" class="btn btn-ghost" onclick="document.getElementById('mobile-drawer-overlay')?.remove()">Sign In</a>
        <a href="#/register" class="btn btn-primary" onclick="document.getElementById('mobile-drawer-overlay')?.remove()">Get Started</a>
      </div>
    `}
  `,i.appendChild(a),document.body.appendChild(i),requestAnimationFrame(()=>a.classList.add(`open`)),i.addEventListener(`click`,e=>{e.target===i&&X()}),document.getElementById(`close-drawer`)?.addEventListener(`click`,X),document.getElementById(`mobile-logout`)?.addEventListener(`click`,()=>{X(),f()})}function X(){let e=document.getElementById(`mobile-drawer-overlay`);e&&(e.querySelector(`.sidebar-drawer`)?.classList.remove(`open`),setTimeout(()=>e.remove(),280))}function Xe(e){return{"#/":`⬛`,"#/dashboard":`⬛`,"#/chat":`💬`,"#/brand-tools":`🎨`,"#/strategy-tools":`📋`,"#/legal-tools":`⚖️`,"#/marketing-tools":`📣`,"#/sales-tools":`💼`,"#/prompt-writer":`✦`,"#/membership":`⚡`,"#/profile":`👤`}[e]||`·`}function Ze(e){let t=document.getElementById(`user-dropdown`);if(t){t.remove();return}let n=document.createElement(`div`);n.id=`user-dropdown`,n.style.cssText=`
    position:fixed;top:66px;right:20px;z-index:500;
    background:var(--bg-elevated);border:1px solid var(--border-mid);
    border-radius:var(--r-md);padding:8px;min-width:210px;
    box-shadow:var(--shadow-lg);animation:modalIn .2s ease;
  `,n.innerHTML=`
    <div style="padding:10px 12px 12px;border-bottom:1px solid var(--border-subtle);margin-bottom:6px;">
      <div style="font-weight:600;font-size:14px;color:var(--text-primary);">${e?.name}</div>
      <div style="font-size:11px;color:var(--text-muted);font-family:var(--font-mono);margin-top:2px;">${e?.email}</div>
    </div>
    <a href="#/profile" class="sidebar-link" onclick="document.getElementById('user-dropdown')?.remove()">
      <span class="icon">👤</span> Profile
    </a>
    <a href="#/membership" class="sidebar-link" onclick="document.getElementById('user-dropdown')?.remove()">
      <span class="icon">⚡</span> Membership
    </a>
    <div style="height:1px;background:var(--border-subtle);margin:6px 0;"></div>
    <button class="sidebar-link" id="logout-btn" style="width:100%;color:var(--error);">
      → Sign Out
    </button>
  `,document.body.appendChild(n),n.querySelector(`#logout-btn`).addEventListener(`click`,()=>{n.remove(),f()}),setTimeout(()=>document.addEventListener(`click`,function e(t){!n.contains(t.target)&&!document.getElementById(`user-menu-btn`)?.contains(t.target)&&(n.remove(),document.removeEventListener(`click`,e))}),100)}var Z=document.getElementById(`page-root`);function Q(e){if(!c()){window.location.hash=`#/login`;return}e(Z)}var Qe={"#/":()=>c()?M(Z):te(Z),"#/login":()=>ie(Z),"#/register":()=>ae(Z),"#/dashboard":()=>Q(M),"#/chat":()=>Q(oe),"#/generator":()=>Q(me),"#/market-research":()=>Q(_e),"#/marketing":()=>Q(ye),"#/profile":()=>Q(xe),"#/membership":()=>Q(Se),"#/prompt-writer":()=>Q(Te),"#/brand-tools":()=>Q(Fe),"#/strategy-tools":()=>Q(ze),"#/legal-tools":()=>Q(He),"#/marketing-tools":()=>Q(We),"#/sales-tools":()=>Q(qe)};function $(){let e=window.location.hash||`#/`,t=document.getElementById(`app-header`);t||(t=document.createElement(`div`),t.id=`app-header`,document.getElementById(`app`).prepend(t)),Je(t,e),(Qe[e]||Qe[`#/`])()}window.addEventListener(`hashchange`,$),l(()=>$());async function $e(){await ee(),$()}$e();
