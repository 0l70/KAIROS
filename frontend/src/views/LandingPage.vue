<template>
  <div class="landing-root custom-scroll" :class="themeStore.isDark ? 'theme-dark' : 'theme-light'" ref="scrollContainer" @scroll.passive="handleScroll">

    <div v-if="isBooting" class="boot-sequence">
      <div class="boot-text">
        <p>KAIROS OS v2.0.26 initializing...</p>
        <p class="delay-boot-1">Loading AI modules... <span class="text-accent-3">OK</span></p>
        <p class="delay-boot-2">Mounting memory sectors... <span class="text-accent-3">OK</span></p>
        <p class="delay-boot-3">Establishing GitHub Sync... <span class="text-accent-3">OK</span></p>
        <p class="delay-boot-4">SYSTEM READY. <span class="blink-cursor">_</span></p>
      </div>
    </div>

    <div v-if="gameActive" class="game-overlay">
      <div class="game-header">
        <div class="game-score">SCORE: {{ gameScore }}</div>
        <div class="game-controls text-accent-2">← → : MOVE | SPACE : SHOOT</div>
        <button class="mech-key btn-text-only key-accent-1" @click="stopGame">
          <span class="key-legend">EXIT GAME</span>
        </button>
      </div>
      <div class="game-area">
        <div v-for="b in bullets" :key="b.id" class="pixel-bullet" :style="{ left: b.x + '%', top: b.y + '%' }"></div>
        <div v-for="a in aliens" :key="a.id" class="pixel-alien-game" :style="{ left: a.x + '%', top: a.y + '%', opacity: a.alive ? 1 : 0 }"></div>
        <div class="pixel-ship-game" :style="{ left: playerX + '%' }"></div>
      </div>
    </div>

    <div class="crt-scanlines"></div>
    <div class="retro-dot-bg"></div>
    <div class="particle-container">
      <div v-for="n in 15" :key="`p-${n}`" class="pixel-star float-anim-random" 
           :style="{ top: Math.random()*100+'%', left: Math.random()*100+'%', animationDelay: Math.random()*5+'s' }"></div>
    </div>

    <header class="landing-header">
      <div class="landing-logo glitch-target" @click="scrollToTop">
        <div class="pixel-hourglass-logo"></div>
        <span class="landing-logo-text glitch-text" data-text="KAIROS">KAIROS</span>
      </div>
      
      <div class="system-monitor retro-panel" @click="triggerEasterEgg" title="CLICK 3 TIMES FOR ARCADE MODE">
        <div class="monitor-line">
          <span>CPU</span>
          <div class="bar-track"><div class="bar-fill" :style="{ width: cpuUsage + '%' }"></div></div>
        </div>
        <div class="monitor-line">
          <span>RAM</span>
          <div class="bar-track"><div class="bar-fill ram-color" :style="{ width: ramUsage + '%' }"></div></div>
        </div>
      </div>

      <div class="landing-header-actions">
        <button class="mech-key btn-icon-only" @click="themeStore.toggle()">
          <span class="key-legend"><i :class="themeStore.isDark ? 'fas fa-sun' : 'fas fa-moon'" /></span>
        </button>
        <button class="mech-key btn-text-only glitch-target" @click="$router.push('/login')">
          <span class="key-legend glitch-text" data-text="LOGIN">LOGIN</span>
        </button>
        <button class="mech-key btn-text-only key-accent-1 glitch-target" @click="$router.push('/signup')">
          <span class="key-legend glitch-text" data-text="START NOW">START NOW</span>
        </button>
      </div>
    </header>

    <main class="landing-main">
      <section class="hero-section">
        <div class="bg-pixel-alien float-anim-slow" style="top: 15%; left: 10%;"></div>
        <div class="bg-pixel-alien float-anim-slow delay-2" style="top: 25%; right: 12%;"></div>
        <div class="bg-pixel-ship float-anim" style="top: 60%; left: 8%;"></div>

        <div class="anim-target reveal-fade">
          <div class="hero-badge retro-badge glow-effect">
            <i class="fas fa-terminal" /> THE ULTIMATE AI DEV PLATFORM
          </div>
        </div>

        <h1 class="hero-title">
          <div class="reveal-wrap"><span class="anim-target reveal-slide-up">SEIZE YOUR</span></div>
          <div class="reveal-wrap"><span class="anim-target reveal-slide-up delay-1 text-accent-1 type-writer">DEVELOPMENT TIME_</span></div>
        </h1>
        
        <div class="reveal-wrap" style="margin-bottom: 56px;">
          <p class="hero-desc anim-target reveal-slide-up delay-2">
            AI 기반 맞춤형 학습 경로, GitHub 활동 연동, 그리고 강력한 일정 관리.<br>
            성장에만 집중할 수 있도록 설계된 개발자를 위한 통합 작업 공간입니다.
          </p>
        </div>

        <div class="hero-cta anim-target reveal-fade delay-3">
          <button class="mech-key btn-large key-accent-2 glitch-target" @click="$router.push('/signup')">
            <span class="key-legend glitch-text" data-text="CONTINUE WITH GOOGLE"><div class="google-icon">G</div> CONTINUE WITH GOOGLE</span>
          </button>
          <button class="mech-key btn-large glitch-target" @click.prevent="scrollToSection('features')">
            <span class="key-legend glitch-text" data-text="EXPLORE PLATFORM">EXPLORE PLATFORM <i class="fas fa-arrow-down float-anim" style="margin-left: 8px;" /></span>
          </button>
        </div>
      </section>

      <div class="marquee-wrapper retro-border-y angled-marquee">
        <div class="marquee-track">
          <div class="marquee-content">AI CURATION • GITHUB SYNC • NODE CALENDAR • CAREER TRACKING • AI CURATION • GITHUB SYNC • NODE CALENDAR • CAREER TRACKING •&nbsp;</div>
          <div class="marquee-content">AI CURATION • GITHUB SYNC • NODE CALENDAR • CAREER TRACKING • AI CURATION • GITHUB SYNC • NODE CALENDAR • CAREER TRACKING •&nbsp;</div>
        </div>
      </div>

      <nav class="feature-strip-nav retro-panel" ref="navBar" style="border-radius: 0; border-left: none; border-right: none;">
        <a href="#" class="mech-key nav-anchor glitch-target" :class="{ 'key-accent-2': activeSection === 'features' }" @click.prevent="scrollToSection('features')">
          <span class="key-legend glitch-text" data-text="FEATURES"><i class="fas fa-star" /> FEATURES</span>
        </a>
        <a href="#" class="mech-key nav-anchor glitch-target" :class="{ 'key-accent-2': activeSection === 'workflow' }" @click.prevent="scrollToSection('workflow')">
          <span class="key-legend glitch-text" data-text="WORKFLOW"><i class="fas fa-project-diagram" /> WORKFLOW</span>
        </a>
        <a href="#" class="mech-key nav-anchor glitch-target" :class="{ 'key-accent-2': activeSection === 'integration' }" @click.prevent="scrollToSection('integration')">
          <span class="key-legend glitch-text" data-text="INTEGRATION"><i class="fas fa-code-branch" /> INTEGRATION</span>
        </a>
        <a href="#" class="mech-key nav-anchor key-accent-3 glitch-target" :class="{ 'key-accent-1': activeSection === 'cta' }" @click.prevent="scrollToSection('cta')">
          <span class="key-legend glitch-text" data-text="JOIN NOW"><i class="fas fa-rocket pulse-anim" /> JOIN NOW</span>
        </a>
      </nav>

      <section id="features" class="content-section">
        <div class="section-header">
          <div class="reveal-wrap glitch-target"><h2 class="section-title text-accent-1 anim-target reveal-slide-up glitch-text" data-text="CORE CAPABILITIES">CORE CAPABILITIES</h2></div>
          <p class="section-sub anim-target reveal-fade delay-1">카이로스만이 제공하는 압도적인 개발자 성장 도구</p>
        </div>

        <div class="bento-grid">
          <div class="retro-panel bento-card bento-large anim-target reveal-fade float-anim">
            <div class="bento-icon text-accent-1"><i class="fas fa-code-branch" /></div>
            <div class="bento-content glitch-target">
              <h3 class="glitch-text" data-text="GITHUB & VELOG SYNC">GITHUB & VELOG SYNC</h3>
              <p>커밋 기록과 블로그 포스팅이 자동으로 학습 캘린더에 연동됩니다. 분산된 개발 기록을 하나의 타임라인으로 통합하여 관리하세요.</p>
            </div>
            <div class="bento-deco-box spin-anim"></div>
          </div>

          <div class="retro-panel bento-card anim-target reveal-fade delay-1 float-anim" style="animation-delay: 0.2s;">
            <div class="bento-icon text-accent-2"><i class="fas fa-robot" /></div>
            <div class="bento-content glitch-target">
              <h3 class="glitch-text" data-text="AI CURATION">AI CURATION</h3>
              <p>당신의 현재 레벨과 목표 트랙을 분석하여 최적의 학습 자료와 다음 단계를 추천합니다.</p>
            </div>
          </div>

          <div class="retro-panel bento-card anim-target reveal-fade delay-2 float-anim" style="animation-delay: 0.4s;">
            <div class="bento-icon text-accent-3"><i class="fas fa-project-diagram" /></div>
            <div class="bento-content glitch-target">
              <h3 class="glitch-text" data-text="NODE GRAPH CALENDAR">NODE GRAPH CALENDAR</h3>
              <p>학습 간의 인과관계를 그래프 형태로 연결하여 시각적인 커리큘럼 맵을 생성합니다.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="workflow" class="content-section bg-inverted">
        <div class="section-header">
          <div class="reveal-wrap glitch-target"><h2 class="section-title text-accent-2 anim-target reveal-slide-up glitch-text" data-text="HOW IT WORKS">HOW IT WORKS</h2></div>
          <p class="section-sub anim-target reveal-fade delay-1">단 3단계로 끝나는 완벽한 성장 루프</p>
        </div>

        <div class="workflow-steps">
          <div class="step-box retro-panel anim-target reveal-fade step-hover">
            <div class="step-scanline"></div>
            <div class="step-num text-accent-2">01</div>
            <h3>SET YOUR TRACK</h3>
            <p>목표하는 기술 스택을 설정하고 커리큘럼을 등록합니다.</p>
          </div>
          <div class="step-box retro-panel anim-target reveal-fade delay-1 step-hover">
            <div class="step-scanline"></div>
            <div class="step-num text-accent-2">02</div>
            <h3>AUTO TRACKING</h3>
            <p>GitHub 푸시나 블로그 작성 시 AI가 일정을 자동 완료 처리합니다.</p>
          </div>
          <div class="step-box retro-panel anim-target reveal-fade delay-2 step-hover">
            <div class="step-scanline"></div>
            <div class="step-num text-accent-2">03</div>
            <h3>GET INSIGHTS</h3>
            <p>매주 제공되는 분석 리포트와 조언을 통해 빈틈을 메웁니다.</p>
          </div>
        </div>
      </section>

      <section id="integration" class="content-section">
        <div class="anim-target draw-line retro-bg-line"></div>
        <div class="stat-grid">
          <div class="stat-item anim-target reveal-fade stat-hover">
            <div class="stat-value text-accent-1 counter-pop">100%</div>
            <div class="stat-label">데이터 동기화율</div>
          </div>
          <div class="stat-item anim-target reveal-fade delay-1 stat-hover">
            <div class="stat-value text-accent-2 counter-pop">ZERO</div>
            <div class="stat-label">수동 입력 시간</div>
          </div>
          <div class="stat-item anim-target reveal-fade delay-2 stat-hover">
            <div class="stat-value text-accent-3 counter-pop">24/7</div>
            <div class="stat-label">AI 멘토링 대기</div>
          </div>
        </div>
        <div class="anim-target draw-line retro-bg-line"></div>
      </section>

      <section id="cta" class="bottom-cta">
        <div class="reveal-wrap glitch-target"><h2 class="cta-title anim-target reveal-slide-up glitch-text" data-text="READY TO COMMIT?">READY TO COMMIT?</h2></div>
        <p class="cta-desc anim-target reveal-fade delay-1">더 이상 도구를 관리하는 데 시간을 낭비하지 마세요.<br>본질인 '개발'과 '학습'에 집중할 시간입니다.</p>
        
        <div class="anim-target reveal-fade delay-2 cta-hover-wrap" style="margin-top: 20px;">
          <button class="mech-key btn-large key-accent-1 glitch-target cta-shake-btn" @click="$router.push('/signup')">
            <span class="key-legend glitch-text" data-text="START YOUR JOURNEY">START YOUR JOURNEY <i class="fas fa-arrow-right pulse-anim" style="margin-left: 8px;" /></span>
          </button>
        </div>
      </section>
    </main>

    <footer class="landing-footer retro-panel" style="border-radius: 0; border-left: none; border-right: none; border-bottom: none;">
      <div class="footer-inner">
        <div>
          <div class="footer-logo glitch-target" @click="scrollToTop">
            <div class="pixel-hourglass-logo" style="transform: scale(0.6); margin-right: -4px;"></div>
            <span class="glitch-text" data-text="KAIROS">KAIROS</span>
          </div>
          <p class="footer-tagline">개발자 성장을 위한 AI 멘토링 플랫폼</p>
        </div>
        <div v-for="col in footerCols" :key="col.title">
          <h4>{{ col.title }}</h4>
          <ul>
            <li v-for="it in col.items" :key="it" class="glitch-target" style="display: block; width: max-content;">
              <span class="glitch-text" :data-text="it" style="cursor: pointer;">{{ it }}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="footer-copy">© 2026 KAIROS. ALL SYSTEMS GO.</div>
    </footer>

  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useThemeStore } from '@/stores/useThemeStore'
const themeStore = useThemeStore()

const footerCols = [
  { title: 'PRODUCT', items: ['Features', 'Integrations', 'Pricing', 'Changelog'] },
  { title: 'SUPPORT', items: ['Documentation', 'API Reference', 'Contact Us'] },
  { title: 'LEGAL',   items: ['Terms of Service', 'Privacy Policy'] }
]

const cpuUsage = ref(30)
const ramUsage = ref(50)
let monitorInterval = null
const isBooting = ref(true)
const scrollContainer = ref(null)
const activeSection = ref('')
let observer = null

const handleScroll = () => {
  if (!scrollContainer.value) return
  const sections = ['features', 'workflow', 'integration', 'cta']
  const containerTop = scrollContainer.value.getBoundingClientRect().top
  const offset = 250 
  let current = ''
  for (const id of sections) {
    const el = document.getElementById(id)
    if (el) {
      const rect = el.getBoundingClientRect()
      if (rect.top - containerTop <= offset && rect.bottom - containerTop > offset) current = id
    }
  }
  activeSection.value = current
}

const scrollToSection = (id) => {
  const el = document.getElementById(id)
  if (el && scrollContainer.value) {
    scrollContainer.value.scrollTo({ top: el.offsetTop - 120, behavior: 'smooth' })
  }
}
const scrollToTop = () => { if (scrollContainer.value) scrollContainer.value.scrollTo({ top: 0, behavior: 'smooth' }) }

const clickCount = ref(0); const gameActive = ref(false); const gameScore = ref(0); const playerX = ref(50); const bullets = ref([]); const aliens = ref([]); let gameLoopId = null; let bulletIdCounter = 0; let gameKeys = { ArrowLeft: false, ArrowRight: false, Space: false }
const initAliens = () => { aliens.value = []; for (let r=0; r<3; r++) { for (let c=0; c<8; c++) { aliens.value.push({ id:`a-${r}-${c}`, x:15+c*10, y:10+r*10, startX:15+c*10, alive:true }) } } }
const triggerEasterEgg = () => { if (gameActive.value) return; clickCount.value++; if (clickCount.value >= 3) { startGame(); clickCount.value = 0 } }
const startGame = () => { gameActive.value = true; gameScore.value = 0; playerX.value = 50; bullets.value = []; initAliens(); window.addEventListener('keydown', handleKeyDown); window.addEventListener('keyup', handleKeyUp); gameLoopId = setInterval(gameLoop, 30) }
const stopGame = () => { gameActive.value = false; clearInterval(gameLoopId); window.removeEventListener('keydown', handleKeyDown); window.removeEventListener('keyup', handleKeyUp) }
const handleKeyDown = (e) => { if (e.code === 'ArrowLeft') gameKeys.ArrowLeft = true; if (e.code === 'ArrowRight') gameKeys.ArrowRight = true; if (e.code === 'Space' && !gameKeys.Space) { gameKeys.Space = true; bullets.value.push({ id:bulletIdCounter++, x:playerX.value, y:85 }) } if(['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)) e.preventDefault() }
const handleKeyUp = (e) => { if (e.code === 'ArrowLeft') gameKeys.ArrowLeft = false; if (e.code === 'ArrowRight') gameKeys.ArrowRight = false; if (e.code === 'Space') gameKeys.Space = false }
const gameLoop = () => { if (gameKeys.ArrowLeft) playerX.value = Math.max(5, playerX.value - 1.5); if (gameKeys.ArrowRight) playerX.value = Math.min(95, playerX.value + 1.5); bullets.value.forEach(b => b.y -= 3); bullets.value = bullets.value.filter(b => b.y > 0); const time = Date.now() / 1000; aliens.value.forEach(a => { a.x = a.startX + Math.sin(time * 2) * 5; a.y += 0.05 }); bullets.value.forEach(b => { aliens.value.filter(a => a.alive).forEach(a => { if (Math.abs(b.x - a.x) < 3 && Math.abs(b.y - a.y) < 4) { a.alive = false; b.y = -10; gameScore.value += 100 } }) }); if (!aliens.value.some(a => a.alive)) initAliens() }

onMounted(() => {
  if (themeStore.isDark) themeStore.isDark = false;
  setTimeout(() => { isBooting.value = false }, 2500)
  monitorInterval = setInterval(() => { cpuUsage.value = Math.max(10, Math.min(90, cpuUsage.value + (Math.random() * 20 - 10))); ramUsage.value = Math.max(30, Math.min(80, ramUsage.value + (Math.random() * 10 - 5))) }, 1000)
  observer = new IntersectionObserver((entries) => { entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('is-visible') }) }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" })
  document.querySelectorAll('.anim-target').forEach((el) => observer.observe(el))
})
onUnmounted(() => { if (observer) observer.disconnect(); clearInterval(monitorInterval); if (gameLoopId) clearInterval(gameLoopId) })
</script>

<style scoped>
@font-face { font-family: 'Mulmaru'; src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/2601-4@1.1/Mulmaru.woff2') format('woff2'); font-weight: normal; font-display: swap; }
@font-face { font-family: 'NeoDunggeunmo'; src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.3/NeoDunggeunmoPro-Regular.woff2') format('woff2'); font-weight: normal; font-display: swap; }

/* ── 🎨 테마 변수 (명도 대비 극대화) ── */
.theme-light {
  --k-bg: #F4F0EB; --k-housing: #E6DFD3; --k-key-bg: #FFFFFF; --k-key-border: #1A1A1A; --k-key-shadow: #1A1A1A; --k-border-main: #1A1A1A;
  --bg-base: #F4F0EB; --bg-surface: #E6DFD3; --bg-elevated: #FFFFFF; --border: #1A1A1A; --border-mid: #1A1A1A;
  --text-primary: #1A1A1A; --text-secondary: #333333; --text-muted: #555555; --text-faint: #777777;
  --accent: #E53935; --today-bg: rgba(229, 57, 53, 0.1); --sun-color: #E53935; --sat-color: #1E88E5;
  --k-acc-1-bg: #E53935; --k-acc-1-shadow: #B71C1C; --k-acc-2-bg: #1E88E5; --k-acc-2-shadow: #1565C0; --k-acc-3-bg: #43A047; --k-acc-3-shadow: #2E7D32; 
}
.theme-dark {
  --k-bg: #1A1A1A; --k-housing: #2C2C2C; --k-key-bg: #3D3D3D; --k-key-border: #000000; --k-key-shadow: #000000; --k-border-main: #000000;
  --bg-base: #1A1A1A; --bg-surface: #2C2C2C; --bg-elevated: #3D3D3D; --border: #000000; --border-mid: #000000;
  --text-primary: #F0F0F0; --text-secondary: #CCCCCC; --text-muted: #999999; --text-faint: #666666;
  --accent: #FF5252; --today-bg: rgba(255, 82, 82, 0.15); --sun-color: #FF5252; --sat-color: #448AFF;
  --k-acc-1-bg: #FF5252; --k-acc-1-shadow: #D50000; --k-acc-2-bg: #448AFF; --k-acc-2-shadow: #2962FF; --k-acc-3-bg: #69F0AE; --k-acc-3-shadow: #00E676; 
}

/* 💡 FIX: 깜빡임 방지 (Transition 제거) */
.landing-root { height: 100vh; overflow-y: auto; overflow-x: hidden; background: var(--bg-base); color: var(--text-primary); font-family: 'Mulmaru', 'NeoDunggeunmo', sans-serif; display: flex; flex-direction: column; position: relative; scroll-behavior: smooth; }
.custom-scroll::-webkit-scrollbar { display: none; }
.custom-scroll { -ms-overflow-style: none; scrollbar-width: none; }

/* ── 💡 FIX: 원래 색상 절대 안 사라지는 투명 글리치 호버 ── */
.glitch-text { position: relative; display: inline-block; transition: transform 0.1s ease; }
.glitch-text::before, .glitch-text::after {
  content: attr(data-text); position: absolute; top: 0; left: 0; width: 100%; height: 100%;
  background: transparent !important; /* 버튼 색상 유지 핵심! */
  opacity: 0; pointer-events: none;
}
.glitch-target:hover .glitch-text, .glitch-text:hover { transform: translate(-2px, -2px); }
.glitch-target:hover .glitch-text::before, .glitch-target:hover .glitch-text::after,
.glitch-text:hover::before, .glitch-text:hover::after { opacity: 1; }

.glitch-target:hover .glitch-text::before, .glitch-text:hover::before {
  left: 2px; text-shadow: -2px 0 #FF003C; clip-path: inset(10% 0 80% 0);
  animation: glitch-anim-1 0.4s infinite linear alternate-reverse;
}
.glitch-target:hover .glitch-text::after, .glitch-text:hover::after {
  left: -2px; text-shadow: 2px 0 #00F0FF; clip-path: inset(80% 0 10% 0);
  animation: glitch-anim-2 0.5s infinite linear alternate-reverse;
}
@keyframes glitch-anim-1 { 0% { clip-path: inset(20% 0 80% 0); } 20% { clip-path: inset(60% 0 10% 0); } 40% { clip-path: inset(40% 0 50% 0); } 60% { clip-path: inset(80% 0 5% 0); } 80% { clip-path: inset(10% 0 70% 0); } 100% { clip-path: inset(30% 0 30% 0); } }
@keyframes glitch-anim-2 { 0% { clip-path: inset(10% 0 60% 0); } 20% { clip-path: inset(30% 0 20% 0); } 40% { clip-path: inset(70% 0 10% 0); } 60% { clip-path: inset(20% 0 50% 0); } 80% { clip-path: inset(90% 0 5% 0); } 100% { clip-path: inset(5% 0 80% 0); } }

/* ── Workflow 호버 (레이더 스캔) ── */
.step-hover { position: relative; overflow: hidden; transition: all 0.3s ease; }
.step-scanline { position: absolute; top: -100%; left: 0; width: 100%; height: 6px; background: var(--accent); opacity: 0; box-shadow: 0 0 15px var(--accent); pointer-events: none; z-index: 10;}
.step-hover:hover { transform: translateY(-8px); border-color: var(--accent); box-shadow: 8px 8px 0 var(--accent); background: var(--bg-hover); }
.step-hover:hover .step-scanline { top: 120%; opacity: 0.8; transition: top 1.5s linear; }

/* ── Integration 호버 (터미널 해킹 플리커) ── */
.stat-hover { transition: all 0.2s; cursor: default; }
.stat-hover:hover { transform: scale(1.05); background: var(--text-primary); border-radius: 8px; box-shadow: 0 10px 0 var(--accent); }
.stat-hover:hover .stat-label { color: var(--bg-base); }
.stat-hover:hover .stat-value { color: var(--accent); text-shadow: none; animation: terminal-flicker 0.4s forwards; }
@keyframes terminal-flicker { 0% { opacity: 0; } 20% { opacity: 1; } 40% { opacity: 0; } 60% { opacity: 1; } 80% { opacity: 0; } 100% { opacity: 1; } }

/* ── CTA 버튼 호버 (지진 쉐이크 & 네온 폭발 & 배경색상 유지) ── */
.cta-hover-wrap { position: relative; display: inline-block; }
.cta-shake-btn { transition: 0s; }
.cta-hover-wrap:hover .cta-shake-btn {
  animation: earthquake 0.3s infinite;
  box-shadow: 0 0 30px var(--accent), inset 0 0 10px rgba(255,255,255,0.5) !important;
}
@keyframes earthquake { 0% { transform: translate(2px, 2px) rotate(0deg); } 25% { transform: translate(-2px, -3px) rotate(-1deg); } 50% { transform: translate(-4px, 0px) rotate(1deg); } 75% { transform: translate(4px, 3px) rotate(0deg); } 100% { transform: translate(2px, -2px) rotate(-1deg); } }

/* ── UI 공통 ── */
.retro-panel { background: var(--bg-surface); border: 2px solid var(--border); box-shadow: 4px 4px 0 var(--border); border-radius: 4px; }
.retro-badge { border: 2px solid var(--border); box-shadow: 2px 2px 0 var(--border); border-radius: 4px; padding: 4px 8px; font-family: 'NeoDunggeunmo', sans-serif; font-size: 12px; background: var(--bg-elevated); color: var(--text-primary); font-weight: 800;}
.mech-key { position: relative; box-sizing: border-box; background: var(--bg-elevated); color: var(--text-primary); border: 2px solid var(--border); border-radius: 4px; box-shadow: 4px 4px 0 var(--border); cursor: pointer; text-decoration: none; transition: all 0.1s; display: inline-flex; align-items: center; justify-content: center; gap: 8px; font-family: 'NeoDunggeunmo', sans-serif; font-size: 14px; font-weight: 800;}
.mech-key:active { transform: translate(4px, 4px) !important; box-shadow: 0 0 0 transparent !important; }
.key-accent-1 { background: var(--k-acc-1-bg); color: #fff; border-color: var(--border); }
.key-accent-2 { background: var(--k-acc-2-bg); color: #fff; border-color: var(--border); }
.key-accent-3 { background: var(--k-acc-3-bg); color: #fff; border-color: var(--border); }

/* ── 시스템 부팅 & 게임 오버레이 ── */
.boot-sequence { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: #000; color: #39E079; z-index: 99999; display: flex; flex-direction: column; padding: 40px; font-family: 'NeoDunggeunmo', monospace; font-size: 18px; line-height: 2; animation: fadeOutBoot 0.5s 2s forwards; pointer-events: none; }
.boot-text p { opacity: 0; animation: bootPrint 0.1s forwards; }
.delay-boot-1 { animation-delay: 0.4s !important; } .delay-boot-2 { animation-delay: 0.8s !important; } .delay-boot-3 { animation-delay: 1.2s !important; } .delay-boot-4 { animation-delay: 1.6s !important; }
@keyframes bootPrint { to { opacity: 1; } } @keyframes fadeOutBoot { to { opacity: 0; visibility: hidden; } }

.game-overlay { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(10,10,12,0.95); z-index: 9999; display: flex; flex-direction: column; font-family: 'NeoDunggeunmo', monospace; }
.game-header { padding: 20px 40px; display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid var(--border); }
.game-score { font-size: 32px; color: #fff; } .game-controls { font-size: 20px; animation: pulseIcon 2s infinite; }
.game-area { flex: 1; position: relative; overflow: hidden; }
.pixel-ship-game { position: absolute; bottom: 10%; width: 12px; height: 12px; transform: translateX(-50%); box-shadow: 24px 0 0 var(--k-acc-2-bg), 12px 12px 0 var(--k-acc-2-bg), 24px 12px 0 #fff, 36px 12px 0 var(--k-acc-2-bg), 0 24px 0 var(--k-acc-1-bg), 12px 24px 0 var(--k-acc-2-bg), 24px 24px 0 var(--k-acc-2-bg), 36px 24px 0 var(--k-acc-2-bg), 48px 24px 0 var(--k-acc-1-bg); }
.pixel-alien-game { position: absolute; width: 8px; height: 8px; transform: translateX(-50%); transition: opacity 0.1s; box-shadow: 16px 0 0 var(--k-acc-1-bg), 32px 0 0 var(--k-acc-1-bg), 8px 8px 0 var(--k-acc-1-bg), 24px 8px 0 var(--k-acc-1-bg), 40px 8px 0 var(--k-acc-1-bg), 0 16px 0 var(--k-acc-1-bg), 16px 16px 0 #fff, 32px 16px 0 #fff, 48px 16px 0 var(--k-acc-1-bg); }
.pixel-bullet { position: absolute; width: 4px; height: 12px; background: #fff; transform: translateX(-50%); box-shadow: 0 0 10px var(--k-acc-1-bg); }

/* ── 애니메이션 & 비주얼 요소 ── */
.crt-scanlines { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.15) 50%); background-size: 100% 4px; z-index: 9998; pointer-events: none; opacity: 0.15; }
.theme-dark .crt-scanlines { opacity: 0.3; }
.retro-dot-bg { position: fixed; inset: 0; background-image: radial-gradient(var(--border-mid) 1px, transparent 1px); background-size: 20px 20px; opacity: 0.1; z-index: 0; pointer-events: none; }

.particle-container { position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 1; overflow: hidden; }
.pixel-star { position: absolute; width: 4px; height: 4px; background: var(--text-muted); opacity: 0.2; }
.float-anim-random { animation: floatRandom 8s ease-in-out infinite alternate; }
@keyframes floatRandom { 0% { transform: translate(0, 0); } 100% { transform: translate(20px, -20px); opacity: 0.8; } }

.pixel-hourglass-logo { width: 4px; height: 4px; background: transparent; margin-right: 18px; box-shadow: 0 0 0 var(--accent), 4px 0 0 var(--accent), 8px 0 0 var(--accent), 12px 0 0 var(--accent), 16px 0 0 var(--accent), 0 4px 0 var(--accent), 4px 4px 0 var(--text-primary), 8px 4px 0 var(--text-primary), 12px 4px 0 var(--text-primary), 16px 4px 0 var(--accent), 4px 8px 0 var(--accent), 8px 8px 0 var(--text-primary), 12px 8px 0 var(--accent), 8px 12px 0 var(--accent), 4px 16px 0 var(--accent), 8px 16px 0 var(--bg-base), 12px 16px 0 var(--accent), 0 20px 0 var(--accent), 4px 20px 0 var(--bg-base), 8px 20px 0 var(--text-primary), 12px 20px 0 var(--bg-base), 16px 20px 0 var(--accent), 0 24px 0 var(--accent), 4px 24px 0 var(--accent), 8px 24px 0 var(--accent), 12px 24px 0 var(--accent), 16px 24px 0 var(--accent); animation: flipHourglass 4s infinite cubic-bezier(0.68, -0.55, 0.27, 1.55); }
@keyframes flipHourglass { 0%, 40% { transform: rotate(0deg); } 50%, 90% { transform: rotate(180deg); } 100% { transform: rotate(360deg); } }

.reveal-wrap { overflow: hidden; display: inline-block; vertical-align: bottom; width: 100%; padding-bottom: 5px; margin-bottom: -5px; }
.anim-target { will-change: transform, opacity; }
.reveal-fade { opacity: 0; transform: translateY(20px); transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1); }
.reveal-fade.is-visible { opacity: 1; transform: translateY(0); }
.reveal-slide-up { display: block; opacity: 0; transform: translateY(100%); transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1); }
.reveal-slide-up.is-visible { opacity: 1; transform: translateY(0); }

.draw-line { width: 0%; height: 2px; background: var(--border); transition: width 1.2s cubic-bezier(0.16, 1, 0.3, 1); }
.draw-line.is-visible { width: 100%; }
.delay-1 { transition-delay: 0.15s; } .delay-2 { transition-delay: 0.3s; } .delay-3 { transition-delay: 0.45s; }
.stat-value.counter-pop { opacity: 0; }
.stat-item.is-visible .counter-pop { animation: popIn 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
@keyframes popIn { 0% { opacity: 0; transform: scale(0.3); } 80% { transform: scale(1.1); } 100% { opacity: 1; transform: scale(1); } }

.type-writer { display: inline-block; overflow: hidden; white-space: nowrap; border-right: 4px solid var(--accent); animation: typing 2s steps(20, end), blink-cursor .75s step-end infinite; }
@keyframes typing { from { width: 0; } to { width: 100%; } } @keyframes blink-cursor { from, to { border-color: transparent; } 50% { border-color: var(--accent); } }
.float-anim { animation: float 6s ease-in-out infinite; } .float-anim-slow { animation: float 10s ease-in-out infinite alternate; }
@keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
.spin-anim { animation: spinSlow 15s linear infinite; } @keyframes spinSlow { 100% { transform: rotate(375deg); } }
.pulse-anim { animation: pulseIcon 1.5s infinite; } @keyframes pulseIcon { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.1); } }
.glow-effect { box-shadow: 0 0 20px rgba(0,0,0,0.1), 4px 4px 0 var(--border) !important; }

.bg-pixel-alien { position: absolute; width: 6px; height: 6px; z-index: 5; box-shadow: 12px 0 0 var(--accent), 24px 0 0 var(--accent), 6px 6px 0 var(--accent), 18px 6px 0 var(--accent), 30px 6px 0 var(--accent), 0 12px 0 var(--accent), 12px 12px 0 var(--bg-base), 24px 12px 0 var(--bg-base), 36px 12px 0 var(--accent), 0 18px 0 var(--accent), 6px 18px 0 var(--accent), 12px 18px 0 var(--accent), 18px 18px 0 var(--accent), 24px 18px 0 var(--accent), 30px 18px 0 var(--accent), 36px 18px 0 var(--accent); }
.bg-pixel-ship { position: absolute; width: 6px; height: 6px; z-index: 5; box-shadow: 18px 0 0 var(--k-acc-2-bg), 12px 6px 0 var(--k-acc-2-bg), 18px 6px 0 var(--text-primary), 24px 6px 0 var(--k-acc-2-bg), 6px 12px 0 var(--k-acc-2-bg), 18px 12px 0 var(--text-primary), 30px 12px 0 var(--k-acc-2-bg), 0 18px 0 var(--accent), 6px 18px 0 var(--k-acc-2-bg), 12px 18px 0 var(--k-acc-2-bg), 18px 18px 0 var(--k-acc-2-bg), 24px 18px 0 var(--k-acc-2-bg), 30px 18px 0 var(--k-acc-2-bg), 36px 18px 0 var(--accent); }

.landing-header { display: flex; justify-content: space-between; align-items: center; padding: 0 40px; height: 80px; border-bottom: 2px solid var(--border); background: var(--bg-surface); position: sticky; top: 0; z-index: 100; flex-shrink: 0; }
.landing-logo { display: flex; align-items: center; color: var(--text-primary); cursor: pointer;}
.landing-logo-text { font-weight: 900; font-size: 24px; letter-spacing: 0.1em; font-family: 'NeoDunggeunmo', sans-serif; }

.system-monitor { display: flex; flex-direction: column; justify-content: center; gap: 6px; height: 44px; width: 180px; padding: 0 16px; margin: 0 auto; font-family: 'NeoDunggeunmo', monospace; font-size: 11px; color: var(--text-primary); cursor: pointer; transition: all 0.2s; }
.system-monitor:hover { filter: brightness(1.1); box-shadow: 6px 6px 0 var(--accent); border-color: var(--accent); transform: translate(-2px, -2px); }
.system-monitor:active { transform: translateY(2px); box-shadow: 2px 2px 0 var(--accent); }
.monitor-line { display: flex; align-items: center; justify-content: space-between; width: 100%; font-weight: 800;}
.bar-track { width: 100px; height: 8px; background: var(--k-key-shadow); border: 2px solid var(--border); border-radius: 2px; overflow: hidden; display: flex; box-shadow: inset 0 2px 4px rgba(0,0,0,0.3);}
.bar-fill { height: 100%; background: var(--k-acc-3-bg); transition: width 0.3s ease-out; border-right: 2px solid var(--border);} 
.bar-fill.ram-color { background: var(--k-acc-2-bg); }

.landing-header-actions { display: flex; gap: 12px; align-items: center; height: 100%; }

.btn-icon-only { width: 44px; height: 44px; padding: 0; } .btn-text-only { height: 44px; padding: 0 20px; } .btn-large { height: auto; min-height: 56px; padding: 0 32px; }
.key-legend { font-size: 16px; font-weight: 800; font-family: 'NeoDunggeunmo', sans-serif; white-space: nowrap; display: flex; align-items: center; gap: 8px; }

.hero-section { display: flex; flex-direction: column; align-items: center; text-align: center; padding: 120px 24px 100px; position: relative; z-index: 10; }
.hero-badge { display: inline-flex; align-items: center; gap: 8px; font-size: 14px; margin-bottom: 40px; }
.hero-title { font-size: clamp(48px, 8vw, 80px); font-weight: 900; line-height: 1.1; margin-bottom: 24px; letter-spacing: -0.02em; font-family: 'NeoDunggeunmo', sans-serif;}
.hero-desc { color: var(--text-muted); font-size: 18px; line-height: 1.6; font-weight: 600; max-width: 600px; word-break: keep-all; }
.hero-cta { display: flex; gap: 20px; flex-wrap: wrap; justify-content: center; }
.google-icon { width: 20px; height: 20px; border: 2px solid currentColor; display: inline-flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 900; border-radius: 4px; font-family: 'NeoDunggeunmo', sans-serif;}

.angled-marquee { transform: rotate(-2deg) scale(1.05); box-shadow: 0 10px 30px rgba(0,0,0,0.1); margin: 40px 0; }
.marquee-wrapper { overflow: hidden; white-space: nowrap; width: 100%; background: var(--k-acc-2-bg); position: relative; z-index: 10; display: flex; border-top: 2px solid var(--border); border-bottom: 2px solid var(--border);}
.marquee-track { display: flex; width: max-content; animation: marqueeScroll 15s linear infinite; }
.marquee-content { font-size: 18px; font-weight: 900; letter-spacing: 0.2em; color: #fff; padding: 20px 0; font-family: 'NeoDunggeunmo', sans-serif; text-shadow: 2px 2px 0 var(--border);}
@keyframes marqueeScroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }

.feature-strip-nav { position: sticky; top: 80px; z-index: 90; display: flex; flex-wrap: wrap; justify-content: center; gap: 16px; padding: 16px 24px; width: 100%; }
.nav-anchor { padding: 10px 20px; }

.content-section { padding: 120px 40px; display: flex; flex-direction: column; align-items: center; max-width: 1200px; margin: 0 auto; width: 100%; position: relative; z-index: 10; }
.bottom-cta { padding: 160px 40px; text-align: center; background: var(--bg-base); border-top: 2px solid var(--border); display: flex; flex-direction: column; align-items: center; position: relative; z-index: 10; }
.bg-inverted { max-width: 100%; background: var(--bg-surface); border-top: 2px solid var(--border); border-bottom: 2px solid var(--border); }
.section-header { text-align: center; margin-bottom: 64px; }
.section-title { font-size: 40px; font-weight: 900; letter-spacing: 0.05em; margin-bottom: 16px; font-family: 'NeoDunggeunmo', sans-serif;}
.section-sub { font-size: 16px; font-weight: 700; color: var(--text-muted); }

.bento-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; width: 100%; }
.bento-card { padding: 40px; display: flex; flex-direction: column; gap: 24px; }
.bento-large { grid-column: span 2; flex-direction: row; align-items: center; gap: 48px; position: relative; overflow: hidden; }
.bento-icon { font-size: 40px; text-shadow: 4px 4px 0 var(--border);}
.bento-content h3 { font-size: 24px; font-weight: 900; margin-bottom: 16px; letter-spacing: 0.05em; font-family: 'NeoDunggeunmo', sans-serif;}
.bento-content p { font-size: 15px; line-height: 1.6; color: var(--text-muted); font-weight: 600; }
.bento-deco-box { position: absolute; right: -40px; bottom: -40px; width: 160px; height: 160px; border-width: 4px; opacity: 0.15; border-style: solid; border-color: var(--border); }

.workflow-steps { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 32px; width: 100%; max-width: 1200px; padding: 0 40px; }
.step-box { padding: 40px; display: flex; flex-direction: column; gap: 20px; }
.step-num { font-size: 48px; font-weight: 900; border-bottom: 4px solid var(--border); padding-bottom: 12px; width: max-content; font-family: 'NeoDunggeunmo', sans-serif;}
.step-box h3 { font-size: 22px; font-weight: 900; letter-spacing: 0.05em; font-family: 'NeoDunggeunmo', sans-serif;}
.step-box p { font-size: 15px; line-height: 1.6; color: var(--text-muted); font-weight: 600; }

.stat-grid { display: grid; grid-template-columns: repeat(3, 1fr); width: 100%; text-align: center; }
.stat-item { border-right: 2px solid var(--border); padding: 60px 40px; }
.stat-item:last-child { border-right: none; }
.stat-value { font-size: 72px; font-weight: 900; letter-spacing: -0.05em; margin-bottom: 12px; font-family: 'NeoDunggeunmo', sans-serif; text-shadow: 4px 4px 0 var(--border);}
.stat-label { font-size: 16px; font-weight: 800; color: var(--text-muted); letter-spacing: 0.1em; font-family: 'NeoDunggeunmo', sans-serif;}

.cta-title { font-size: 56px; font-weight: 900; letter-spacing: 0.05em; margin-bottom: 24px; font-family: 'NeoDunggeunmo', sans-serif;}
.cta-desc { font-size: 18px; font-weight: 600; color: var(--text-muted); margin-bottom: 48px; line-height: 1.6; }

.landing-footer { padding: 64px 40px 32px; flex-shrink: 0; position: relative; z-index: 10; }
.footer-inner { max-width: 1200px; margin: 0 auto 64px; display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 40px; }
.footer-logo { display: flex; align-items: center; gap: 10px; margin-bottom: 16px; font-weight: 900; letter-spacing: 0.15em; font-size: 18px; font-family: 'NeoDunggeunmo', sans-serif; color: var(--text-primary); cursor: pointer;}
.footer-tagline { font-size: 13px; font-weight: 600; color: var(--text-muted); }
.footer-inner h4 { font-weight: 900; margin-bottom: 20px; font-size: 14px; letter-spacing: 0.1em; color: var(--accent); font-family: 'NeoDunggeunmo', sans-serif;}
.footer-inner ul { list-style: none; display: flex; flex-direction: column; gap: 12px; }
.footer-inner li { font-size: 13px; font-weight: 600; color: var(--text-muted); cursor: pointer;}
.footer-copy { max-width: 1200px; margin: 0 auto; padding-top: 24px; border-top: 2px dashed var(--border); text-align: center; font-size: 12px; font-weight: 700; letter-spacing: 0.05em; color: var(--text-muted); font-family: 'NeoDunggeunmo', sans-serif; }

@media (max-width: 900px) {
  .bento-grid { grid-template-columns: 1fr; }
  .bento-large { grid-column: span 1; flex-direction: column; align-items: flex-start; }
  .stat-grid { grid-template-columns: 1fr; border-top: 2px solid var(--border); border-bottom: 2px solid var(--border); }
  .stat-item { border-right: none; border-bottom: 2px solid var(--border); }
  .stat-item:last-child { border-bottom: none; }
  .footer-inner { grid-template-columns: 1fr; }
  .landing-header-actions { gap: 8px; }
  .btn-text-only { padding: 0 12px; font-size: 14px; }
  .angled-marquee { transform: rotate(0) scale(1); margin: 0; }
}
</style>