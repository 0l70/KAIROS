<template>
  <div class="landing-root custom-scroll" ref="scrollContainer" @mousemove="updateCursor">
    <!-- Custom Cursor (Desktop Only) -->
    <div class="custom-cursor" :class="{ 'is-hovering': isHovering }" :style="{ transform: `translate3d(${cursor.x}px, ${cursor.y}px, 0)` }"></div>

    <header class="landing-header" :class="{'is-sticky': isStickyMode}">
      <div class="landing-logo">
        <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
          <path d="M6 3h16v5l-6 6 6 6v5H6v-5l6-6-6-6V3z" stroke="currentColor" stroke-width="2" fill="none" stroke-linejoin="round"/>
          <rect x="12" y="12" width="4" height="4" fill="currentColor"/>
        </svg>
        <span>KAIROS</span>
      </div>
      
      <nav class="feature-strip-nav" :class="{'nav-visible': isStickyMode}">
        <a href="#" class="nav-anchor" :class="{ active: activeSection === 'features' }" @click.prevent="scrollToSection('features')">FEATURES</a>
        <a href="#" class="nav-anchor" :class="{ active: activeSection === 'workflow' }" @click.prevent="scrollToSection('workflow')">WORKFLOW</a>
        <a href="#" class="nav-anchor" :class="{ active: activeSection === 'integration' }" @click.prevent="scrollToSection('integration')">INTEGRATION</a>
        <a href="#" class="nav-anchor" :class="{ active: activeSection === 'cta' }" @click.prevent="scrollToSection('cta')">JOIN NOW</a>
      </nav>

      <div class="landing-header-actions">
        <button class="btn-magnetic" 
          @mousemove="handleMagneticMove" 
          @mouseleave="handleMagneticLeave($event, 'LOGIN')" 
          @mouseenter="handleMagneticEnter($event, 'LOGIN')" 
          @click="$router.push('/login')"
          data-text="LOGIN">
          LOGIN
        </button>
        <button class="btn-magnetic btn-primary" 
          @mousemove="handleMagneticMove" 
          @mouseleave="handleMagneticLeave($event, 'SIGN UP')" 
          @mouseenter="handleMagneticEnter($event, 'SIGN UP')" 
          @click="$router.push('/signup')"
          data-text="SIGN UP">
          SIGN UP
        </button>
      </div>
    </header>

    <main class="landing-main">
      <!-- HERO SECTION -->
      <section class="hero-section">
        <div class="hero-video-wrapper">
          <video 
            ref="heroVideo"
            class="hero-video"
            src="/grok-video-3c4d3961-6f79-41fb-90f1-890309aacb86.mp4" 
            muted 
            loop 
            playsinline 
            autoplay
            @timeupdate="checkVideoTime"
          ></video>
        </div>
        
        <div class="hero-typography">
          <div class="reveal-wrap"><h1 class="reveal-elem">SEIZE YOUR</h1></div>
          <div class="reveal-wrap"><h1 class="reveal-elem delay-1">DEVELOPMENT</h1></div>
          <div class="reveal-wrap"><h1 class="reveal-elem delay-2">TIME</h1></div>
        </div>

        <div class="scroll-indicator" :class="{ 'is-visible': isScrollIndicatorVisible }">
          <span class="scroll-text">SCROLL DOWN</span>
          <div class="scroll-line"></div>
        </div>
      </section>

      <!-- MARQUEE (Aesthetic Element) -->
      <div class="marquee-wrapper border-y">
        <div class="marquee-content">
          <span>AI CURATION — GITHUB SYNC — NODE CALENDAR — CAREER TRACKING —</span>
          <span>AI CURATION — GITHUB SYNC — NODE CALENDAR — CAREER TRACKING —</span>
          <span>AI CURATION — GITHUB SYNC — NODE CALENDAR — CAREER TRACKING —</span>
          <span>AI CURATION — GITHUB SYNC — NODE CALENDAR — CAREER TRACKING —</span>
        </div>
      </div>

      <!-- ORIGINAL NAV POSITION -->
      <div class="nav-placeholder" ref="navPlaceholder">
        <nav class="feature-strip-nav-original" :class="{'is-hidden': isStickyMode}">
          <a href="#" class="nav-anchor" :class="{ active: activeSection === 'features' }" @click.prevent="scrollToSection('features')">FEATURES</a>
          <a href="#" class="nav-anchor" :class="{ active: activeSection === 'workflow' }" @click.prevent="scrollToSection('workflow')">WORKFLOW</a>
          <a href="#" class="nav-anchor" :class="{ active: activeSection === 'integration' }" @click.prevent="scrollToSection('integration')">INTEGRATION</a>
          <a href="#" class="nav-anchor" :class="{ active: activeSection === 'cta' }" @click.prevent="scrollToSection('cta')">JOIN NOW</a>
        </nav>
      </div>

      <!-- FEATURES SECTION -->
      <section class="content-section" id="features">
        <div class="section-top">
          <div class="reveal-wrap"><h2 class="section-title reveal-elem">CORE CAPABILITIES</h2></div>
          <div class="reveal-wrap"><p class="section-sub reveal-elem delay-1">카이로스만이 제공하는 기하학적 성장 도구</p></div>
        </div>

        <div class="features-grid">
          <div class="feature-card parallax reveal-elem">
            <div class="fc-number">01</div>
            <h3>GITHUB & VELOG SYNC</h3>
            <p>커밋 기록과 블로그 포스팅이 자동으로 학습 캘린더에 연동됩니다. 분산된 개발 기록을 하나의 흐름으로 통합하세요.</p>
          </div>
          <div class="feature-card parallax parallax-delay-1 reveal-elem">
            <div class="fc-number">02</div>
            <h3>AI CURATION</h3>
            <p>현재 레벨과 목표 트랙을 분석하여 최적의 학습 자료와 다음 단계를 AI가 미니멀하고 직관적으로 추천합니다.</p>
          </div>
          <div class="feature-card parallax parallax-delay-2 reveal-elem">
            <div class="fc-number">03</div>
            <h3>NODE CALENDAR</h3>
            <p>단순한 달력을 넘어섰습니다. 학습 간의 인과관계를 그래프 형태로 연결하여 완벽한 커리큘럼 맵을 구축합니다.</p>
          </div>
        </div>
      </section>

      <!-- WORKFLOW SECTION -->
      <section class="content-section" id="workflow">
        <div class="section-top">
          <div class="reveal-wrap"><h2 class="section-title reveal-elem">PERFECT LOOP</h2></div>
        </div>
        
        <div class="workflow-list">
          <div class="workflow-item reveal-elem">
            <div class="wf-index">STEP 1</div>
            <div class="wf-content">
              <h3>SET YOUR TRACK</h3>
              <p>목표하는 기술 스택을 선언하고 커리큘럼을 등록합니다.</p>
            </div>
          </div>
          <div class="workflow-item reveal-elem delay-1">
            <div class="wf-index">STEP 2</div>
            <div class="wf-content">
              <h3>AUTO TRACKING</h3>
              <p>GitHub 푸시와 기술 블로그 글을 AI가 스캔하여 일정을 자동 완료 처리합니다.</p>
            </div>
          </div>
          <div class="workflow-item reveal-elem delay-2">
            <div class="wf-index">STEP 3</div>
            <div class="wf-content">
              <h3>GET INSIGHTS</h3>
              <p>깊이 있는 분석 리포트와 멘토링을 통해 성장의 빈틈을 완전히 메웁니다.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- INTEGRATION STATS -->
      <section class="section-stats border-y" id="integration">
        <div class="stat-bl parallax reveal-elem">
          <div class="stat-val">100<span class="text-small">%</span></div>
          <div class="stat-lbl">DATA SYNC</div>
        </div>
        <div class="stat-bl parallax parallax-delay-1 reveal-elem">
          <div class="stat-val">ZERO</div>
          <div class="stat-lbl">MANUAL INPUT</div>
        </div>
        <div class="stat-bl parallax parallax-delay-2 reveal-elem">
          <div class="stat-val">24<span class="text-small">/7</span></div>
          <div class="stat-lbl">AI MENTORING</div>
        </div>
      </section>

      <!-- CTA SECTION -->
      <section class="section-cta" id="cta">
        <div class="reveal-wrap"><h2 class="cta-title reveal-elem">READY TO COMMIT?</h2></div>
        <div class="reveal-wrap"><p class="cta-desc reveal-elem delay-1">본질인 '개발'과 '학습'에 집중할 시간입니다.</p></div>
        <div class="cta-action reveal-wrap">
          <button class="btn-giant btn-magnetic reveal-elem delay-2" 
            @mousemove="handleMagneticMove" 
            @mouseleave="handleMagneticLeave($event, 'START YOUR JOURNEY →')" 
            @mouseenter="handleMagneticEnter($event, 'START YOUR JOURNEY →')" 
            @click="$router.push('/signup')"
            data-text="START YOUR JOURNEY →">
            START YOUR JOURNEY →
          </button>
        </div>
      </section>
    </main>

    <footer class="landing-footer">
      <div class="footer-top">
        <div class="footer-brand">KAIROS</div>
        <div class="footer-links">
          <span class="hover-link" @click="scrollToSection('features')">FEATURES</span>
          <span class="hover-link" @click="scrollToSection('workflow')">WORKFLOW</span>
          <span class="hover-link" @click="scrollToSection('integration')">INTEGRATION</span>
          <span class="hover-link" @click="scrollToSection('cta')">JOIN NOW</span>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© 2026 KAIROS. ALL RIGHTS RESERVED.</span>
        <span>DESIGNED FOR DEVELOPERS</span>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'

/* ============================
   1. CUSTOM CURSOR & MAGNETIC
============================ */
const cursor = reactive({ x: -100, y: -100 })
const isHovering = ref(false)

const updateCursor = (e) => {
  cursor.x = e.clientX
  cursor.y = e.clientY
}

const handleMagneticMove = (e) => {
  const el = e.currentTarget
  const rect = el.getBoundingClientRect()
  const x = (e.clientX - rect.left - rect.width / 2) * 0.3
  const y = (e.clientY - rect.top - rect.height / 2) * 0.3
  el.style.transform = `translate(${x}px, ${y}px)`
}

// 스크램블(글자 뒤섞임) 로직
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*'
const scrambleText = (el, originalText) => {
  let iteration = 0;
  clearInterval(el.dataset.scrambleInterval);
  
  el.dataset.scrambleInterval = setInterval(() => {
    el.innerText = originalText
      .split("")
      .map((letter, index) => {
        if(index < iteration) return originalText[index];
        return chars[Math.floor(Math.random() * chars.length)]
      })
      .join("");
    
    if(iteration >= originalText.length){ 
      clearInterval(el.dataset.scrambleInterval);
      el.innerText = originalText;
    }
    
    iteration += 1 / 3;
  }, 30);
}

const handleMagneticEnter = (e, originalText) => {
  isHovering.value = true;
  scrambleText(e.currentTarget, originalText);
}

const handleMagneticLeave = (e, originalText) => {
  const el = e.currentTarget
  el.style.transform = `translate(0px, 0px)`
  isHovering.value = false
  
  clearInterval(el.dataset.scrambleInterval);
  el.innerText = originalText;
}

/* ============================
   2. SCROLL REVEAL & SPY
============================ */
let observer = null
const scrollContainer = ref(null)
const activeSection = ref('')
const isStickyMode = ref(false)
const navPlaceholder = ref(null)

const handleScroll = () => {
  if (!scrollContainer.value) return
  const containerTop = scrollContainer.value.getBoundingClientRect().top
  
  if (navPlaceholder.value) {
    const rect = navPlaceholder.value.getBoundingClientRect()
    // 원래 네브바가 헤더(80px) 위로 올라가면 스티키 모드 ON
    if (rect.top - containerTop <= 80) {
      isStickyMode.value = true
    } else {
      isStickyMode.value = false
    }
  }

  const sections = ['features', 'workflow', 'integration', 'cta']
  const triggerPoint = 100 // Header(80px) + 여유
  let current = ''

  for (const id of sections) {
    const el = document.getElementById(id)
    if (el) {
      const rect = el.getBoundingClientRect()
      if (rect.top - containerTop <= triggerPoint) {
        current = id
      }
    }
  }
  activeSection.value = current
}

onMounted(() => {
  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed')
      }
    })
  }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" })

  document.querySelectorAll('.reveal-elem').forEach(el => observer.observe(el))
  
  if(scrollContainer.value) {
    scrollContainer.value.addEventListener('scroll', handleScroll, { passive: true })
  }
})

onUnmounted(() => {
  if (observer) observer.disconnect()
  if(scrollContainer.value) {
    scrollContainer.value.removeEventListener('scroll', handleScroll)
  }
})

/* ============================
   3. VIDEO TIME UPDATE
============================ */
const heroVideo = ref(null)
const isScrollIndicatorVisible = ref(false)

const checkVideoTime = () => {
  if (heroVideo.value && heroVideo.value.currentTime >= 4.5 && !isScrollIndicatorVisible.value) {
    isScrollIndicatorVisible.value = true
  }
}

/* ============================
   4. SCROLL TO SECTION
============================ */
const scrollToSection = (id) => {
  const el = document.getElementById(id)
  if (el && scrollContainer.value) {
    const offset = 80 // Header(80px) 여백
    scrollContainer.value.scrollTo({
      top: el.offsetTop - offset,
      behavior: 'smooth'
    })
  }
}
</script>

<style scoped>
/* ──────── BASE MONOCHROME ──────── */
.landing-root {
  background: #000;
  color: #fff;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
  font-family: 'Space Grotesk', 'Helvetica Neue', Arial, sans-serif;
  position: relative;
  -webkit-font-smoothing: antialiased;
}

/* Custom Scrollbar for Landing */
.custom-scroll::-webkit-scrollbar { width: 0; display: none; }

/* ──────── CUSTOM CURSOR ──────── */
.custom-cursor { display: none; }
@media (hover: hover) and (pointer: fine) {
  .landing-root * { cursor: none !important; }
  .custom-cursor {
    display: block; position: fixed; top: 0; left: 0;
    width: 16px; height: 16px; border-radius: 50%; background: #fff;
    mix-blend-mode: difference; z-index: 99999; pointer-events: none;
    transform: translate3d(0,0,0); transition: width 0.3s cubic-bezier(0.16, 1, 0.3, 1), height 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    margin-top: -8px; margin-left: -8px;
    will-change: transform;
  }
  .custom-cursor.is-hovering {
    width: 64px; height: 64px; margin-top: -32px; margin-left: -32px;
  }
}

/* ──────── HEADER ──────── */
.landing-header {
  position: fixed; top: 0; left: 0; width: 100%; height: 80px;
  padding: 0 40px; display: flex; justify-content: space-between; align-items: center;
  z-index: 120;
  background: transparent;
  backdrop-filter: blur(0px);
  border-bottom: 1px solid transparent;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.landing-header.is-sticky {
  background: rgba(0,0,0,0.85);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(255,255,255,0.15);
}
.landing-logo { display: flex; align-items: center; gap: 10px; font-family: 'Escoredream', sans-serif; font-size: 20px; font-weight: 900; letter-spacing: 0.15em; color: #fff; }
.landing-header-actions { display: flex; gap: 16px; }

.btn-magnetic {
  padding: 12px 24px; background: transparent; color: #fff;
  border: 1px solid rgba(255,255,255,0.2); border-radius: 40px;
  font-size: 13px; font-weight: 700; letter-spacing: 0.05em;
  transition: background 0.3s, color 0.3s, border-color 0.3s, transform 0.1s ease-out;
  display: inline-flex; align-items: center; justify-content: center;
  font-family: inherit;
  white-space: nowrap;
}
.btn-magnetic:hover { border-color: #fff; background: rgba(255,255,255,0.05); }

.btn-primary { background: #fff; color: #000; border-color: #fff; }
.btn-primary:hover { background: #e0e0e0; color: #000; border-color: #e0e0e0; }

/* ──────── HERO SECTION ──────── */
.hero-section {
  position: relative; height: 100vh; display: flex; align-items: center; justify-content: center;
  overflow: hidden; background: #000;
}
.hero-video-wrapper {
  position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
  width: 420px; height: 740px; overflow: hidden; z-index: 1;
  border-radius: 4px; border: 1px solid rgba(255,255,255,0.1);
}
.hero-video { width: 100%; height: 100%; object-fit: cover; opacity: 0.9; }

@media(max-width: 768px) {
  .hero-video-wrapper { width: 100vw; height: 100vh; border-radius: 0; border: none; }
}

.hero-typography {
  position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
  width: 100%; text-align: center; z-index: 2; pointer-events: none; mix-blend-mode: difference;
  display: flex; flex-direction: column; gap: 8px;
}
.hero-typography h1 {
  font-size: 8vw; line-height: 0.9; margin: 0; font-weight: 900; color: #fff;
  letter-spacing: -0.02em; text-transform: uppercase;
}
@media(max-width: 768px) {
  .hero-typography h1 { font-size: 14vw; }
}

.scroll-indicator {
  position: absolute; bottom: 40px; left: 50%; transform: translateX(-50%);
  z-index: 10; display: flex; flex-direction: column; align-items: center; gap: 16px;
  opacity: 0; transition: opacity 2s cubic-bezier(0.16, 1, 0.3, 1);
}
.scroll-indicator.is-visible { opacity: 1; }
.scroll-text { font-size: 10px; font-weight: 700; letter-spacing: 0.2em; color: rgba(255,255,255,0.6); }
.scroll-line { width: 1px; height: 48px; background: rgba(255,255,255,0.3); position: relative; overflow: hidden; }
.scroll-line::after {
  content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: #fff;
  animation: scrollDown 2s infinite cubic-bezier(0.16, 1, 0.3, 1); transform-origin: top;
}
@keyframes scrollDown {
  0% { transform: scaleY(0); transform-origin: top; }
  50% { transform: scaleY(1); transform-origin: top; }
  51% { transform: scaleY(1); transform-origin: bottom; }
  100% { transform: scaleY(0); transform-origin: bottom; }
}

/* ──────── ANIMATIONS & REVEALS ──────── */
.reveal-wrap { overflow: hidden; display: block; }
.reveal-elem {
  opacity: 0; transform: translateY(110%);
  transition: transform 1.2s cubic-bezier(0.16, 1, 0.3, 1), opacity 1.2s ease;
  will-change: transform, opacity;
}
.reveal-elem.is-revealed { opacity: 1; transform: translateY(0); }
.delay-1 { transition-delay: 0.15s; }
.delay-2 { transition-delay: 0.3s; }

/* ──────── MARQUEE ──────── */
.border-y { border-top: 1px solid rgba(255,255,255,0.15); border-bottom: 1px solid rgba(255,255,255,0.15); }
.marquee-wrapper { overflow: hidden; white-space: nowrap; padding: 24px 0; background: #000; display: flex; }
.marquee-content {
  display: inline-block; font-size: 14px; font-weight: 700; letter-spacing: 0.15em; color: #fff;
  animation: marquee 25s linear infinite;
}
.marquee-content span { padding-right: 48px; opacity: 0.8; }
@keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }

/* ──────── STICKY NAV (Mounted inside Header & Original) ──────── */
.feature-strip-nav {
  display: flex; align-items: center; justify-content: center; gap: 32px;
  opacity: 0; pointer-events: none; transform: translateY(10px);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.feature-strip-nav.nav-visible {
  opacity: 1; pointer-events: auto; transform: translateY(0);
}

.nav-placeholder {
  width: 100%; display: flex; align-items: center; justify-content: center;
  padding: 32px 0; border-bottom: 1px solid rgba(255,255,255,0.15);
}
.feature-strip-nav-original {
  display: flex; align-items: center; justify-content: center; gap: 32px;
  transition: opacity 0.3s ease;
}
.feature-strip-nav-original.is-hidden {
  opacity: 0; pointer-events: none;
}

.nav-anchor {
  font-size: 13px; font-weight: 900; letter-spacing: 0.15em;
  color: rgba(255,255,255,0.5); text-decoration: none;
  padding: 8px 16px; transition: all 0.2s; border-radius: 40px; border: 1px solid transparent;
}
.nav-anchor:hover { color: #fff; }
.nav-anchor.active {
  color: #000; background: #fff; border-color: #fff;
}
@media(max-width: 1024px) {
  .feature-strip-nav { display: none; } /* 화면이 작아지면 여백 부족으로 임시 숨김 */
}

/* ──────── SECTION BASICS ──────── */
.content-section { padding: 180px 40px; max-width: 1400px; margin: 0 auto; }
.section-top { margin-bottom: 80px; }
.section-title { font-size: 56px; font-weight: 900; letter-spacing: -0.02em; line-height: 1; margin: 0 0 16px 0; }
.section-sub { font-size: 18px; color: rgba(255,255,255,0.5); font-weight: 500; }

@media(max-width: 768px) {
  .content-section { padding: 120px 24px; }
  .section-title { font-size: 40px; }
}

/* ──────── FEATURES GRID ──────── */
.features-grid {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px;
  background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.15);
}
.feature-card { background: #000; padding: 64px 40px; display: flex; flex-direction: column; gap: 24px; }
.fc-number { font-size: 20px; font-family: monospace; color: rgba(255,255,255,0.3); }
.feature-card h3 { font-size: 24px; font-weight: 800; letter-spacing: 0.02em; line-height: 1.3; }
.feature-card p { font-size: 15px; color: rgba(255,255,255,0.6); line-height: 1.6; }

/* Fake Parallax with delays */
.parallax-delay-1 { transition-delay: 0.1s; }
.parallax-delay-2 { transition-delay: 0.2s; }

@media(max-width: 900px) {
  .features-grid { grid-template-columns: 1fr; }
  .parallax-delay-1, .parallax-delay-2 { transition-delay: 0s; }
}

/* ──────── WORKFLOW LIST ──────── */
.workflow-list { display: flex; flex-direction: column; border-top: 1px solid rgba(255,255,255,0.15); }
.workflow-item {
  display: flex; gap: 40px; padding: 64px 0;
  border-bottom: 1px solid rgba(255,255,255,0.15); align-items: flex-start;
}
.wf-index { font-size: 14px; font-weight: 900; letter-spacing: 0.1em; width: 120px; flex-shrink: 0; color: rgba(255,255,255,0.4); }
.wf-content h3 { font-size: 32px; font-weight: 900; margin-bottom: 16px; letter-spacing: -0.01em; }
.wf-content p { font-size: 18px; color: rgba(255,255,255,0.6); line-height: 1.5; max-width: 600px; }

@media(max-width: 768px) {
  .workflow-item { flex-direction: column; gap: 16px; padding: 48px 0; }
  .wf-content h3 { font-size: 24px; }
  .wf-content p { font-size: 16px; }
}

/* ──────── INTEGRATION STATS ──────── */
.section-stats { display: grid; grid-template-columns: repeat(3, 1fr); padding: 160px 40px; background: #000; }
.stat-bl { display: flex; flex-direction: column; align-items: center; text-align: center; }
.stat-val { font-size: 8vw; line-height: 1; font-weight: 900; letter-spacing: -0.04em; }
.text-small { font-size: 4vw; font-weight: 500; opacity: 0.5; }
.stat-lbl { font-size: 13px; font-weight: 700; letter-spacing: 0.15em; color: rgba(255,255,255,0.5); margin-top: 24px; }

@media(max-width: 768px) {
  .section-stats { grid-template-columns: 1fr; gap: 80px; padding: 100px 24px; }
  .stat-val { font-size: 20vw; }
  .text-small { font-size: 10vw; }
}

/* ──────── CTA SECTION ──────── */
.section-cta { padding: 200px 40px; text-align: center; display: flex; flex-direction: column; align-items: center; }
.cta-title { font-size: clamp(40px, 6vw, 80px); font-weight: 900; letter-spacing: -0.02em; margin-bottom: 24px; }
.cta-desc { font-size: 20px; color: rgba(255,255,255,0.6); margin-bottom: 64px; }
.btn-giant { padding: 24px 48px; font-size: 16px; background: transparent; color: #fff; border: 1px solid #fff; border-radius: 60px; font-weight: 800; }
.btn-giant:hover { background: #fff; color: #000; }

/* ──────── FOOTER ──────── */
.landing-footer { border-top: 1px solid rgba(255,255,255,0.15); padding: 64px 40px 40px; background: #000; }
.footer-top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 120px; }
.footer-brand { font-size: 24px; font-weight: 900; letter-spacing: 0.15em; }
.footer-links { display: flex; gap: 40px; }
.hover-link { font-size: 13px; font-weight: 700; letter-spacing: 0.1em; color: rgba(255,255,255,0.5); transition: color 0.3s; }
@media(hover: hover) { .hover-link:hover { color: #fff; } }

.footer-bottom { display: flex; justify-content: space-between; border-top: 1px solid rgba(255,255,255,0.15); padding-top: 32px; font-size: 12px; color: rgba(255,255,255,0.4); font-weight: 600; letter-spacing: 0.05em; }

@media(max-width: 768px) {
  .footer-top { flex-direction: column; gap: 40px; margin-bottom: 64px; }
  .footer-links { flex-direction: column; gap: 24px; }
  .footer-bottom { flex-direction: column; gap: 16px; }
}
</style>