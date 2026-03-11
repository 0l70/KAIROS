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
    <div class="retro-grid-bg"><div class="radar-scan"></div></div>
    <div class="particle-container">
      <div v-for="n in 15" :key="`p-${n}`" class="pixel-star float-anim-random" 
           :style="{ top: Math.random()*100+'%', left: Math.random()*100+'%', animationDelay: Math.random()*5+'s' }"></div>
    </div>

    <header class="landing-header">
      <div class="landing-logo glitch-hover">
        <div class="pixel-hourglass-logo"></div>
        <span class="landing-logo-text" data-text="KAIROS">KAIROS</span>
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
        <button class="mech-key btn-icon-only vercel-glow" @click="themeStore.toggle()">
          <span class="key-legend">{{ themeStore.isDark ? '☀' : '🌙' }}</span>
        </button>
        <button class="mech-key btn-text-only vercel-glow" @click="$router.push('/login')">
          <span class="key-legend">LOGIN</span>
        </button>
        <button class="mech-key btn-text-only key-accent-1 glitch-hover vercel-glow-accent" @click="$router.push('/signup')">
          <span class="key-legend" data-text="START NOW">START NOW</span>
        </button>
      </div>
    </header>

    <main class="landing-main">
      <section class="hero-section">
        <div class="bg-pixel-alien float-anim-slow" style="top: 15%; left: 10%;"></div>
        <div class="bg-pixel-alien float-anim-slow delay-2" style="top: 25%; right: 12%;"></div>
        <div class="bg-pixel-ship float-anim" style="top: 60%; left: 8%;"></div>

        <div class="anim-target reveal-fade">
          <div class="hero-badge retro-panel glow-effect">
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
          <button class="mech-key btn-large key-accent-2 glitch-hover vercel-glow-accent" @click="$router.push('/signup')">
            <span class="key-legend" data-text="CONTINUE WITH GOOGLE"><div class="google-icon">G</div> CONTINUE WITH GOOGLE</span>
          </button>
          <button class="mech-key btn-large vercel-glow" @click.prevent="scrollToSection('features')">
            <span class="key-legend">EXPLORE PLATFORM <i class="fas fa-arrow-down float-anim" style="margin-left: 8px;" /></span>
          </button>
        </div>
      </section>

      <div class="marquee-wrapper retro-border-y angled-marquee">
        <div class="marquee-track">
          <div class="marquee-content">AI CURATION • GITHUB SYNC • NODE CALENDAR • CAREER TRACKING • AI CURATION • GITHUB SYNC • NODE CALENDAR • CAREER TRACKING •&nbsp;</div>
          <div class="marquee-content">AI CURATION • GITHUB SYNC • NODE CALENDAR • CAREER TRACKING • AI CURATION • GITHUB SYNC • NODE CALENDAR • CAREER TRACKING •&nbsp;</div>
        </div>
      </div>

      <nav class="feature-strip-nav retro-panel-nav" ref="navBar">
        <a href="#" class="mech-key nav-anchor vercel-glow" :class="{ 'is-pressed': activeSection === 'features' }" @click.prevent="scrollToSection('features')">
          <span class="key-legend"><i class="fas fa-star" /> FEATURES</span>
        </a>
        <a href="#" class="mech-key nav-anchor vercel-glow" :class="{ 'is-pressed': activeSection === 'workflow' }" @click.prevent="scrollToSection('workflow')">
          <span class="key-legend"><i class="fas fa-project-diagram" /> WORKFLOW</span>
        </a>
        <a href="#" class="mech-key nav-anchor vercel-glow" :class="{ 'is-pressed': activeSection === 'integration' }" @click.prevent="scrollToSection('integration')">
          <span class="key-legend"><i class="fas fa-code-branch" /> INTEGRATION</span>
        </a>
        <a href="#" class="mech-key nav-anchor key-accent-3 vercel-glow-accent" :class="{ 'is-pressed': activeSection === 'cta' }" @click.prevent="scrollToSection('cta')">
          <span class="key-legend"><i class="fas fa-rocket pulse-anim" /> JOIN NOW</span>
        </a>
      </nav>

      <section id="features" class="content-section">
        <div class="section-header">
          <div class="reveal-wrap"><h2 class="section-title text-accent-1 anim-target reveal-slide-up">CORE CAPABILITIES</h2></div>
          <p class="section-sub anim-target reveal-fade delay-1">카이로스만이 제공하는 압도적인 개발자 성장 도구</p>
        </div>

        <div class="bento-grid">
          <div class="retro-panel bento-card bento-large anim-target reveal-fade float-anim vercel-card-hover">
            <div class="bento-icon text-accent-1"><i class="fas fa-code-branch" /></div>
            <div class="bento-content">
              <h3>GITHUB & VELOG SYNC</h3>
              <p>커밋 기록과 블로그 포스팅이 자동으로 학습 캘린더에 연동됩니다. 분산된 개발 기록을 하나의 타임라인으로 통합하여 관리하세요.</p>
            </div>
            <div class="bento-deco-box retro-border spin-anim"></div>
          </div>

          <div class="retro-panel bento-card anim-target reveal-fade delay-1 float-anim vercel-card-hover" style="animation-delay: 0.2s;">
            <div class="bento-icon text-accent-2"><i class="fas fa-robot" /></div>
            <div class="bento-content">
              <h3>AI CURATION</h3>
              <p>당신의 현재 레벨과 목표 트랙을 분석하여 최적의 학습 자료와 다음 단계를 추천합니다.</p>
            </div>
          </div>

          <div class="retro-panel bento-card anim-target reveal-fade delay-2 float-anim vercel-card-hover" style="animation-delay: 0.4s;">
            <div class="bento-icon text-accent-3"><i class="fas fa-project-diagram" /></div>
            <div class="bento-content">
              <h3>NODE GRAPH CALENDAR</h3>
              <p>학습 간의 인과관계를 그래프 형태로 연결하여 시각적인 커리큘럼 맵을 생성합니다.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="workflow" class="content-section bg-inverted">
        <div class="section-header">
          <div class="reveal-wrap"><h2 class="section-title text-accent-2 anim-target reveal-slide-up">HOW IT WORKS</h2></div>
          <p class="section-sub anim-target reveal-fade delay-1">단 3단계로 끝나는 완벽한 성장 루프</p>
        </div>

        <div class="workflow-steps">
          <div class="step-box anim-target reveal-fade vercel-card-hover">
            <div class="step-num text-accent-2">01</div>
            <h3>SET YOUR TRACK</h3>
            <p>목표하는 기술 스택을 설정하고 커리큘럼을 등록합니다.</p>
          </div>
          <div class="step-box anim-target reveal-fade delay-1 vercel-card-hover">
            <div class="step-num text-accent-2">02</div>
            <h3>AUTO TRACKING</h3>
            <p>GitHub 푸시나 블로그 작성 시 AI가 일정을 자동 완료 처리합니다.</p>
          </div>
          <div class="step-box anim-target reveal-fade delay-2 vercel-card-hover">
            <div class="step-num text-accent-2">03</div>
            <h3>GET INSIGHTS</h3>
            <p>매주 제공되는 분석 리포트와 조언을 통해 빈틈을 메웁니다.</p>
          </div>
        </div>
      </section>

      <section id="integration" class="content-section">
        <div class="anim-target draw-line retro-bg-line"></div>
        <div class="stat-grid">
          <div class="stat-item anim-target reveal-fade">
            <div class="stat-value text-accent-1 counter-pop">100%</div>
            <div class="stat-label">데이터 동기화율</div>
          </div>
          <div class="stat-item anim-target reveal-fade delay-1">
            <div class="stat-value text-accent-2 counter-pop">ZERO</div>
            <div class="stat-label">수동 입력 시간</div>
          </div>
          <div class="stat-item anim-target reveal-fade delay-2">
            <div class="stat-value text-accent-3 counter-pop">24/7</div>
            <div class="stat-label">AI 멘토링 대기</div>
          </div>
        </div>
        <div class="anim-target draw-line retro-bg-line"></div>
      </section>

      <section id="cta" class="bottom-cta">
        <div class="reveal-wrap"><h2 class="cta-title anim-target reveal-slide-up">READY TO COMMIT?</h2></div>
        <p class="cta-desc anim-target reveal-fade delay-1">더 이상 도구를 관리하는 데 시간을 낭비하지 마세요.<br>본질인 '개발'과 '학습'에 집중할 시간입니다.</p>
        <div class="anim-target reveal-fade delay-2" style="margin-top: 20px;">
          <button class="mech-key btn-large key-accent-1 glitch-hover vercel-glow-accent" @click="$router.push('/signup')">
            <span class="key-legend" data-text="START YOUR JOURNEY">START YOUR JOURNEY <i class="fas fa-arrow-right pulse-anim" style="margin-left: 8px;" /></span>
          </button>
        </div>
      </section>
    </main>

    <footer class="landing-footer">
      <div class="footer-inner">
        <div>
          <div class="footer-logo">
            <div class="pixel-hourglass-logo" style="transform: scale(0.6); margin-right: -4px;"></div>
            <span>KAIROS</span>
          </div>
          <p class="footer-tagline">개발자 성장을 위한 AI 멘토링 플랫폼</p>
        </div>
        <div v-for="col in footerCols" :key="col.title">
          <h4>{{ col.title }}</h4>
          <ul>
            <li v-for="it in col.items" :key="it">{{ it }}</li>
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
      if (rect.top - containerTop <= offset && rect.bottom - containerTop > offset) {
        current = id
      }
    }
  }
  activeSection.value = current
}

const scrollToSection = (id) => {
  const el = document.getElementById(id)
  if (el && scrollContainer.value) {
    const offset = 120 
    scrollContainer.value.scrollTo({
      top: el.offsetTop - offset,
      behavior: 'smooth'
    })
  }
}

// ── 이스터에그 (갤러그) ──
const clickCount = ref(0)
const gameActive = ref(false)
const gameScore = ref(0)
const playerX = ref(50)
const bullets = ref([])
const aliens = ref([])
let gameLoopId = null
let bulletIdCounter = 0
let gameKeys = { ArrowLeft: false, ArrowRight: false, Space: false }

const initAliens = () => {
  aliens.value = []
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 8; c++) {
      aliens.value.push({ id: `a-${r}-${c}`, x: 15 + c * 10, y: 10 + r * 10, startX: 15 + c * 10, alive: true })
    }
  }
}

const triggerEasterEgg = () => {
  if (gameActive.value) return
  clickCount.value++
  if (clickCount.value >= 3) {
    startGame()
    clickCount.value = 0
  }
}

const startGame = () => {
  gameActive.value = true; gameScore.value = 0; playerX.value = 50; bullets.value = []; initAliens()
  window.addEventListener('keydown', handleKeyDown)
  window.addEventListener('keyup', handleKeyUp)
  gameLoopId = setInterval(gameLoop, 30)
}

const stopGame = () => {
  gameActive.value = false; clearInterval(gameLoopId)
  window.removeEventListener('keydown', handleKeyDown)
  window.removeEventListener('keyup', handleKeyUp)
}

const handleKeyDown = (e) => {
  if (e.code === 'ArrowLeft') gameKeys.ArrowLeft = true
  if (e.code === 'ArrowRight') gameKeys.ArrowRight = true
  if (e.code === 'Space' && !gameKeys.Space) { 
    gameKeys.Space = true
    bullets.value.push({ id: bulletIdCounter++, x: playerX.value, y: 85 })
  }
  if(['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)) e.preventDefault() 
}
const handleKeyUp = (e) => {
  if (e.code === 'ArrowLeft') gameKeys.ArrowLeft = false
  if (e.code === 'ArrowRight') gameKeys.ArrowRight = false
  if (e.code === 'Space') gameKeys.Space = false
}

const gameLoop = () => {
  if (gameKeys.ArrowLeft) playerX.value = Math.max(5, playerX.value - 1.5)
  if (gameKeys.ArrowRight) playerX.value = Math.min(95, playerX.value + 1.5)
  bullets.value.forEach(b => b.y -= 3)
  bullets.value = bullets.value.filter(b => b.y > 0)
  const time = Date.now() / 1000
  aliens.value.forEach(a => { a.x = a.startX + Math.sin(time * 2) * 5; a.y += 0.05 })
  bullets.value.forEach(b => {
    aliens.value.filter(a => a.alive).forEach(a => {
      if (Math.abs(b.x - a.x) < 3 && Math.abs(b.y - a.y) < 4) {
        a.alive = false; b.y = -10; gameScore.value += 100
      }
    })
  })
  if (!aliens.value.some(a => a.alive)) initAliens()
}

onMounted(() => {
  if (themeStore.isDark) themeStore.isDark = false;
  setTimeout(() => { isBooting.value = false }, 2500)
  monitorInterval = setInterval(() => {
    cpuUsage.value = Math.max(10, Math.min(90, cpuUsage.value + (Math.random() * 20 - 10)))
    ramUsage.value = Math.max(30, Math.min(80, ramUsage.value + (Math.random() * 10 - 5)))
  }, 1000)

  // Observer 적용
  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('is-visible')
    })
  }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" })

  document.querySelectorAll('.anim-target').forEach((el) => observer.observe(el))
})

onUnmounted(() => {
  if (observer) observer.disconnect()
  clearInterval(monitorInterval)
  if (gameLoopId) clearInterval(gameLoopId)
})
</script>

<style scoped>
/* ── 폰트 ── */
@font-face { font-family: 'Mulmaru'; src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/2601-4@1.1/Mulmaru.woff2') format('woff2'); font-weight: normal; font-display: swap; }
@font-face { font-family: 'NeoDunggeunmo'; src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.3/NeoDunggeunmoPro-Regular.woff2') format('woff2'); font-weight: normal; font-display: swap; }

/* ── 테마 변수 (One Dark / Dolch) ── */
.theme-light {
  --k-bg: #EAEAEA; --k-housing: #D4D4D4; --k-key-bg: #F5F5F5; --k-key-border: #A3A3A3; --k-key-shadow: #737373; --k-text: #2B2B2B; --k-text-muted: #6B6B6B; --k-border-main: #404040;
  --k-acc-1-bg: #D95C5C; --k-acc-1-shadow: #A33A3A; --k-acc-2-bg: #4B7FB8; --k-acc-2-shadow: #2F5682; --k-acc-3-bg: #D4883A; --k-acc-3-shadow: #9E5E1E;
}
.theme-dark {
  --k-bg: #181A1F; --k-housing: #21252B; --k-key-bg: #282C34; --k-key-border: #111111; --k-key-shadow: #090A0C; --k-text: #ABB2BF; --k-text-muted: #5C6370; --k-border-main: #3E4451;
  --k-acc-1-bg: #D19A66; --k-acc-1-shadow: #9E7045; --k-acc-2-bg: #56B6C2; --k-acc-2-shadow: #35808A; --k-acc-3-bg: #98C379; --k-acc-3-shadow: #63854A;
}

.landing-root {
  height: 100vh; overflow-y: auto; overflow-x: hidden; background: var(--k-bg); color: var(--k-text);
  font-family: 'Mulmaru', 'NeoDunggeunmo', sans-serif; display: flex; flex-direction: column; transition: background 0.4s, color 0.4s; position: relative;
  scroll-behavior: smooth;
}
.custom-scroll::-webkit-scrollbar { display: none; }
.custom-scroll { -ms-overflow-style: none; scrollbar-width: none; }

/* ── 시스템 부팅 & 게임 오버레이 ── */
.boot-sequence { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: #000; color: #39E079; z-index: 99999; display: flex; flex-direction: column; padding: 40px; font-family: 'NeoDunggeunmo', monospace; font-size: 18px; line-height: 2; animation: fadeOutBoot 0.5s 2s forwards; pointer-events: none; }
.boot-text p { opacity: 0; animation: bootPrint 0.1s forwards; }
.delay-boot-1 { animation-delay: 0.4s !important; } .delay-boot-2 { animation-delay: 0.8s !important; } .delay-boot-3 { animation-delay: 1.2s !important; } .delay-boot-4 { animation-delay: 1.6s !important; }
@keyframes bootPrint { to { opacity: 1; } } @keyframes fadeOutBoot { to { opacity: 0; visibility: hidden; } }

.game-overlay { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(10,10,12,0.95); z-index: 9999; display: flex; flex-direction: column; font-family: 'NeoDunggeunmo', monospace; }
.game-header { padding: 20px 40px; display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid var(--k-border-main); }
.game-score { font-size: 32px; color: #fff; } .game-controls { font-size: 20px; animation: pulseIcon 2s infinite; }
.game-area { flex: 1; position: relative; overflow: hidden; }
.pixel-ship-game { position: absolute; bottom: 10%; width: 12px; height: 12px; transform: translateX(-50%); box-shadow: 24px 0 0 var(--k-acc-2-bg), 12px 12px 0 var(--k-acc-2-bg), 24px 12px 0 #fff, 36px 12px 0 var(--k-acc-2-bg), 0 24px 0 var(--k-acc-1-bg), 12px 24px 0 var(--k-acc-2-bg), 24px 24px 0 var(--k-acc-2-bg), 36px 24px 0 var(--k-acc-2-bg), 48px 24px 0 var(--k-acc-1-bg); }
.pixel-alien-game { position: absolute; width: 8px; height: 8px; transform: translateX(-50%); transition: opacity 0.1s; box-shadow: 16px 0 0 var(--k-acc-1-bg), 32px 0 0 var(--k-acc-1-bg), 8px 8px 0 var(--k-acc-1-bg), 24px 8px 0 var(--k-acc-1-bg), 40px 8px 0 var(--k-acc-1-bg), 0 16px 0 var(--k-acc-1-bg), 16px 16px 0 #fff, 32px 16px 0 #fff, 48px 16px 0 var(--k-acc-1-bg); }
.pixel-bullet { position: absolute; width: 4px; height: 12px; background: #fff; transform: translateX(-50%); box-shadow: 0 0 10px var(--k-acc-1-bg); }

/* ── 애니메이션 & 비주얼 요소 ── */
.crt-scanlines { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.15) 50%); background-size: 100% 4px; z-index: 9998; pointer-events: none; opacity: 0.6; }
.retro-grid-bg { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-image: linear-gradient(var(--k-border-main) 1px, transparent 1px), linear-gradient(90deg, var(--k-border-main) 1px, transparent 1px); background-size: 50px 50px; opacity: 0.05; z-index: 0; pointer-events: none; transform: perspective(500px) rotateX(20deg) translateY(-50px); animation: gridMove 10s linear infinite; overflow: hidden; }
@keyframes gridMove { 0% { background-position: 0 0; } 100% { background-position: 0 50px; } }
.radar-scan { position: absolute; top: -100px; left: 0; width: 100%; height: 150px; background: linear-gradient(to bottom, transparent, var(--k-acc-2-bg)); opacity: 0.3; animation: radarSweep 6s linear infinite; }
@keyframes radarSweep { 0% { top: -150px; } 100% { top: 120%; } }
.particle-container { position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 1; overflow: hidden; }
.pixel-star { position: absolute; width: 4px; height: 4px; background: var(--k-text-muted); opacity: 0.2; }
.float-anim-random { animation: floatRandom 8s ease-in-out infinite alternate; }
@keyframes floatRandom { 0% { transform: translate(0, 0); } 100% { transform: translate(20px, -20px); opacity: 0.8; } }

/* ── 💡 NEW: NES.css 스타일 픽셀 모래시계 로고 ── */
.pixel-hourglass-logo {
  width: 4px; height: 4px; background: transparent; margin-right: 18px;
  box-shadow: 
    0 0 0 var(--k-acc-1-bg), 4px 0 0 var(--k-acc-1-bg), 8px 0 0 var(--k-acc-1-bg), 12px 0 0 var(--k-acc-1-bg), 16px 0 0 var(--k-acc-1-bg),
    0 4px 0 var(--k-acc-1-bg), 4px 4px 0 var(--k-acc-2-bg), 8px 4px 0 var(--k-acc-2-bg), 12px 4px 0 var(--k-acc-2-bg), 16px 4px 0 var(--k-acc-1-bg),
    4px 8px 0 var(--k-acc-1-bg), 8px 8px 0 var(--k-acc-2-bg), 12px 8px 0 var(--k-acc-1-bg),
    8px 12px 0 var(--k-acc-1-bg),
    4px 16px 0 var(--k-acc-1-bg), 8px 16px 0 var(--k-bg), 12px 16px 0 var(--k-acc-1-bg),
    0 20px 0 var(--k-acc-1-bg), 4px 20px 0 var(--k-bg), 8px 20px 0 var(--k-acc-2-bg), 12px 20px 0 var(--k-bg), 16px 20px 0 var(--k-acc-1-bg),
    0 24px 0 var(--k-acc-1-bg), 4px 24px 0 var(--k-acc-1-bg), 8px 24px 0 var(--k-acc-1-bg), 12px 24px 0 var(--k-acc-1-bg), 16px 24px 0 var(--k-acc-1-bg);
  animation: flipHourglass 4s infinite cubic-bezier(0.68, -0.55, 0.27, 1.55);
}
@keyframes flipHourglass { 0%, 40% { transform: rotate(0deg); } 50%, 90% { transform: rotate(180deg); } 100% { transform: rotate(360deg); } }

/* ── 글리치 효과 ── */
.glitch-hover { position: relative; }
.glitch-hover:hover .landing-logo-text::before, .glitch-hover:hover .key-legend::before { content: attr(data-text); position: absolute; left: -2px; text-shadow: 1px 0 var(--k-acc-1-bg); top: 0; color: var(--k-text); background: var(--k-bg); overflow: hidden; clip: rect(0, 900px, 0, 0); animation: glitchAnim 2s infinite linear alternate-reverse; }
.glitch-hover:hover .landing-logo-text::after, .glitch-hover:hover .key-legend::after { content: attr(data-text); position: absolute; left: 2px; text-shadow: -1px 0 var(--k-acc-2-bg); top: 0; color: var(--k-text); background: var(--k-bg); overflow: hidden; clip: rect(0, 900px, 0, 0); animation: glitchAnim2 3s infinite linear alternate-reverse; }
@keyframes glitchAnim { 0% { clip: rect(2px, 9999px, 14px, 0); } 50% { clip: rect(10px, 9999px, 30px, 0); } 100% { clip: rect(4px, 9999px, 8px, 0); } }
@keyframes glitchAnim2 { 0% { clip: rect(15px, 9999px, 25px, 0); } 50% { clip: rect(2px, 9999px, 12px, 0); } 100% { clip: rect(28px, 9999px, 38px, 0); } }

/* ── Vercel 스타일 글로우 & 카드 호버 ── */
.vercel-glow { transition: box-shadow 0.3s ease, border-color 0.3s ease; }
.vercel-glow:hover { box-shadow: 0 0 15px rgba(255, 255, 255, 0.2), inset 0px 4px 0px rgba(255, 255, 255, 0.1), 0px 6px 0px var(--k-key-shadow), 0px 8px 8px rgba(0, 0, 0, 0.1); border-color: var(--k-text); }
.vercel-glow-accent:hover { box-shadow: 0 0 20px var(--k-acc-1-bg), inset 0px 4px 0px rgba(255,255,255,0.2), 0px 6px 0px var(--k-acc-1-shadow), 0px 8px 8px rgba(0,0,0,0.1); }

.vercel-card-hover { transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
.vercel-card-hover:hover { transform: translateY(-8px) scale(1.02); box-shadow: 0 20px 40px rgba(0,0,0,0.1), 0 0 0 2px var(--k-acc-1-bg); }

/* ── 💡 NEW: Locomotive 스타일 스크롤 리빌 (Slide Up & Fade) ── */
.reveal-wrap { overflow: hidden; display: inline-block; vertical-align: bottom; width: 100%; padding-bottom: 5px; margin-bottom: -5px; }
.anim-target { will-change: transform, opacity; }
/* 페이드만 */
.reveal-fade { opacity: 0; transform: translateY(20px); transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1); }
.reveal-fade.is-visible { opacity: 1; transform: translateY(0); }
/* 슬라이드 업 (텍스트 전용) */
.reveal-slide-up { display: block; opacity: 0; transform: translateY(100%); transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1); }
.reveal-slide-up.is-visible { opacity: 1; transform: translateY(0); }

.draw-line { width: 0%; height: 2px; background: var(--k-border-main); transition: width 1.2s cubic-bezier(0.16, 1, 0.3, 1); }
.draw-line.is-visible { width: 100%; }
.delay-1 { transition-delay: 0.15s; } .delay-2 { transition-delay: 0.3s; } .delay-3 { transition-delay: 0.45s; }
.stat-value.counter-pop { opacity: 0; }
.stat-item.is-visible .counter-pop { animation: popIn 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
@keyframes popIn { 0% { opacity: 0; transform: scale(0.3); } 80% { transform: scale(1.1); } 100% { opacity: 1; transform: scale(1); } }

/* 타이핑, 둥둥 떠다님 등 */
.type-writer { display: inline-block; overflow: hidden; white-space: nowrap; border-right: 4px solid var(--k-acc-1-bg); animation: typing 2s steps(20, end), blink-cursor .75s step-end infinite; }
@keyframes typing { from { width: 0; } to { width: 100%; } } @keyframes blink-cursor { from, to { border-color: transparent; } 50% { border-color: var(--k-acc-1-bg); } }
.float-anim { animation: float 6s ease-in-out infinite; } .float-anim-slow { animation: float 10s ease-in-out infinite alternate; }
@keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
.spin-anim { animation: spinSlow 15s linear infinite; } @keyframes spinSlow { 100% { transform: rotate(375deg); } }
.pulse-anim { animation: pulseIcon 1.5s infinite; } @keyframes pulseIcon { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.1); } }
.glow-effect { box-shadow: 0 0 20px rgba(0,0,0,0.1), 4px 4px 0 var(--k-border-main) !important; }

.text-accent-1 { color: var(--k-acc-1-bg); } .text-accent-2 { color: var(--k-acc-2-bg); } .text-accent-3 { color: var(--k-acc-3-bg); }

/* 배경 갤러그 CSS */
.bg-pixel-alien { position: absolute; width: 6px; height: 6px; z-index: 5; box-shadow: 12px 0 0 var(--k-acc-1-bg), 24px 0 0 var(--k-acc-1-bg), 6px 6px 0 var(--k-acc-1-bg), 18px 6px 0 var(--k-acc-1-bg), 30px 6px 0 var(--k-acc-1-bg), 0 12px 0 var(--k-acc-1-bg), 12px 12px 0 var(--k-bg), 24px 12px 0 var(--k-bg), 36px 12px 0 var(--k-acc-1-bg), 0 18px 0 var(--k-acc-1-bg), 6px 18px 0 var(--k-acc-1-bg), 12px 18px 0 var(--k-acc-1-bg), 18px 18px 0 var(--k-acc-1-bg), 24px 18px 0 var(--k-acc-1-bg), 30px 18px 0 var(--k-acc-1-bg), 36px 18px 0 var(--k-acc-1-bg); }
.bg-pixel-ship { position: absolute; width: 6px; height: 6px; z-index: 5; box-shadow: 18px 0 0 var(--k-acc-2-bg), 12px 6px 0 var(--k-acc-2-bg), 18px 6px 0 var(--k-text), 24px 6px 0 var(--k-acc-2-bg), 6px 12px 0 var(--k-acc-2-bg), 18px 12px 0 var(--k-text), 30px 12px 0 var(--k-acc-2-bg), 0 18px 0 var(--k-acc-1-bg), 6px 18px 0 var(--k-acc-2-bg), 12px 18px 0 var(--k-acc-2-bg), 18px 18px 0 var(--k-acc-2-bg), 24px 18px 0 var(--k-acc-2-bg), 30px 18px 0 var(--k-acc-2-bg), 36px 18px 0 var(--k-acc-1-bg); }

/* ── 헤더 & 모니터 & 버튼 ── */
.landing-header { display: flex; justify-content: space-between; align-items: center; padding: 0 40px; height: 80px; border-bottom: 2px solid var(--k-border-main); background: var(--k-bg); position: sticky; top: 0; z-index: 100; flex-shrink: 0; }
.landing-logo { display: flex; align-items: center; color: var(--k-text); cursor: pointer; }
.landing-logo-text { font-weight: 900; font-size: 24px; letter-spacing: 0.1em; font-family: 'NeoDunggeunmo', sans-serif; }

.system-monitor { display: flex; flex-direction: column; justify-content: center; gap: 6px; height: 44px; width: 180px; padding: 0 16px; margin: 0 auto; font-family: 'NeoDunggeunmo', monospace; font-size: 11px; color: var(--k-text); cursor: pointer; transition: all 0.2s; }
.system-monitor:hover { filter: brightness(1.2); box-shadow: 4px 4px 0 var(--k-acc-1-bg); border-color: var(--k-acc-1-bg); transform: translateY(-2px); }
.system-monitor:active { transform: translateY(2px); box-shadow: 2px 2px 0 var(--k-acc-1-bg); }
.monitor-line { display: flex; align-items: center; justify-content: space-between; width: 100%; }
.bar-track { width: 100px; height: 8px; background: var(--k-key-shadow); border: 1px solid var(--k-key-border); border-radius: 2px; overflow: hidden; display: flex; }
.bar-fill { height: 100%; background: var(--k-acc-3-bg); transition: width 0.3s ease-out; } .bar-fill.ram-color { background: var(--k-acc-2-bg); }

.landing-header-actions { display: flex; gap: 12px; align-items: center; height: 100%; }
.mech-key { position: relative; box-sizing: border-box; background: var(--k-key-bg); color: var(--k-text); border: 2px solid var(--k-key-border); border-radius: 8px; box-shadow: inset 0px 4px 0px rgba(255, 255, 255, 0.05), 0px 6px 0px var(--k-key-shadow), 0px 8px 8px rgba(0, 0, 0, 0.1); cursor: pointer; text-decoration: none; transition: all 0.1s; display: inline-flex; justify-content: center; align-items: center; }
.mech-key:active, .mech-key.is-pressed { transform: translateY(6px); box-shadow: inset 0px 2px 0px rgba(255, 255, 255, 0.05), 0px 0px 0px var(--k-key-shadow), 0px 2px 2px rgba(0, 0, 0, 0.1); }
.btn-icon-only { width: 44px; height: 44px; padding: 0; } .btn-text-only { height: 44px; padding: 0 20px; } .btn-large { height: auto; min-height: 56px; padding: 0 32px; }
.key-legend { font-size: 16px; font-weight: 800; font-family: 'Mulmaru', sans-serif; white-space: nowrap; display: flex; align-items: center; gap: 8px; }
.key-accent-1 { background: var(--k-acc-1-bg); color: #fff; border-color: var(--k-acc-1-shadow); box-shadow: inset 0px 4px 0px rgba(255,255,255,0.2), 0px 6px 0px var(--k-acc-1-shadow), 0px 8px 8px rgba(0,0,0,0.1); }
.key-accent-1:active, .key-accent-1.is-pressed { box-shadow: inset 0px 2px 0px rgba(255,255,255,0.2), 0px 0px 0px var(--k-acc-1-shadow), 0px 2px 2px rgba(0,0,0,0.2); }
.key-accent-2 { background: var(--k-acc-2-bg); color: #fff; border-color: var(--k-acc-2-shadow); box-shadow: inset 0px 4px 0px rgba(255,255,255,0.2), 0px 6px 0px var(--k-acc-2-shadow), 0px 8px 8px rgba(0,0,0,0.1); }
.key-accent-2:active, .key-accent-2.is-pressed { box-shadow: inset 0px 2px 0px rgba(255,255,255,0.2), 0px 0px 0px var(--k-acc-2-shadow), 0px 2px 2px rgba(0,0,0,0.2); }
.key-accent-3 { background: var(--k-acc-3-bg); color: #fff; border-color: var(--k-acc-3-shadow); box-shadow: inset 0px 4px 0px rgba(255,255,255,0.2), 0px 6px 0px var(--k-acc-3-shadow), 0px 8px 8px rgba(0,0,0,0.1); }
.key-accent-3:active, .key-accent-3.is-pressed { box-shadow: inset 0px 2px 0px rgba(255,255,255,0.2), 0px 0px 0px var(--k-acc-3-shadow), 0px 2px 2px rgba(0,0,0,0.2); }

/* ── 공통 섹션 ── */
.retro-panel { background: var(--k-housing); border: 2px solid var(--k-border-main); box-shadow: 4px 4px 0 var(--k-border-main); border-radius: 8px; position: relative; z-index: 10; }
.retro-border-y { border-top: 2px solid var(--k-border-main); border-bottom: 2px solid var(--k-border-main); }
.retro-bg-line { background: var(--k-border-main); }

.hero-section { display: flex; flex-direction: column; align-items: center; text-align: center; padding: 120px 24px 100px; position: relative; z-index: 10; }
.hero-badge { display: inline-flex; align-items: center; gap: 8px; padding: 8px 20px; font-size: 14px; font-weight: 900; letter-spacing: 0.1em; margin-bottom: 40px; font-family: 'NeoDunggeunmo', sans-serif;}
.hero-title { font-size: clamp(48px, 8vw, 80px); font-weight: 900; line-height: 1.1; margin-bottom: 24px; letter-spacing: -0.02em; font-family: 'NeoDunggeunmo', sans-serif;}
.hero-desc { color: var(--k-text-muted); font-size: 18px; line-height: 1.6; font-weight: 600; max-width: 600px; word-break: keep-all; }
.hero-cta { display: flex; gap: 20px; flex-wrap: wrap; justify-content: center; }
.google-icon { width: 20px; height: 20px; border: 2px solid currentColor; display: inline-flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 900; border-radius: 4px; font-family: 'NeoDunggeunmo', sans-serif;}

/* 💡 NEW: Studio Freight 스타일 사선 기울기 마키 */
.angled-marquee { transform: rotate(-2deg) scale(1.05); box-shadow: 0 10px 30px rgba(0,0,0,0.1); margin: 40px 0; }
.marquee-wrapper { overflow: hidden; white-space: nowrap; width: 100%; background: var(--k-acc-2-bg); position: relative; z-index: 10; display: flex; }
.marquee-track { display: flex; width: max-content; animation: marqueeScroll 15s linear infinite; }
.marquee-content { font-size: 18px; font-weight: 900; letter-spacing: 0.2em; color: #fff; padding: 20px 0; font-family: 'NeoDunggeunmo', sans-serif; }
@keyframes marqueeScroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }

.feature-strip-nav { position: sticky; top: 80px; z-index: 90; display: flex; flex-wrap: wrap; justify-content: center; gap: 16px; background: var(--k-housing); border-bottom: 2px solid var(--k-border-main); padding: 16px 24px; width: 100%; }
.nav-anchor { padding: 10px 20px; }

.content-section { padding: 120px 40px; display: flex; flex-direction: column; align-items: center; max-width: 1200px; margin: 0 auto; width: 100%; position: relative; z-index: 10; }
.bottom-cta { padding: 160px 40px; text-align: center; background: var(--k-bg); border-top: 2px solid var(--k-border-main); display: flex; flex-direction: column; align-items: center; position: relative; z-index: 10; }
.bg-inverted { max-width: 100%; background: var(--k-housing); border-top: 2px solid var(--k-border-main); border-bottom: 2px solid var(--k-border-main); }
.section-header { text-align: center; margin-bottom: 64px; }
.section-title { font-size: 40px; font-weight: 900; letter-spacing: 0.05em; margin-bottom: 16px; font-family: 'NeoDunggeunmo', sans-serif;}
.section-sub { font-size: 16px; font-weight: 700; color: var(--k-text-muted); }

.bento-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; width: 100%; }
.bento-card { padding: 40px; display: flex; flex-direction: column; gap: 24px; }
.bento-large { grid-column: span 2; flex-direction: row; align-items: center; gap: 48px; position: relative; overflow: hidden; }
.bento-icon { font-size: 40px; }
.bento-content h3 { font-size: 24px; font-weight: 900; margin-bottom: 16px; letter-spacing: 0.05em; }
.bento-content p { font-size: 15px; line-height: 1.6; color: var(--k-text-muted); font-weight: 600; }
.bento-deco-box { position: absolute; right: -40px; bottom: -40px; width: 160px; height: 160px; border-width: 4px; opacity: 0.15; border-style: solid; border-color: var(--k-border-main); }

.workflow-steps { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 32px; width: 100%; max-width: 1200px; padding: 0 40px; }
.step-box { border: 2px solid var(--k-border-main); border-radius: 8px; padding: 40px; background: var(--k-bg); display: flex; flex-direction: column; gap: 20px; box-shadow: 4px 4px 0 var(--k-border-main); }
.step-num { font-size: 48px; font-weight: 900; border-bottom: 4px solid var(--k-border-main); padding-bottom: 12px; width: max-content; font-family: 'NeoDunggeunmo', sans-serif;}
.step-box h3 { font-size: 22px; font-weight: 900; letter-spacing: 0.05em; }
.step-box p { font-size: 15px; line-height: 1.6; color: var(--k-text-muted); font-weight: 600; }

.stat-grid { display: grid; grid-template-columns: repeat(3, 1fr); width: 100%; text-align: center; }
.stat-item { border-right: 2px solid var(--k-border-main); padding: 60px 40px; }
.stat-item:last-child { border-right: none; }
.stat-value { font-size: 72px; font-weight: 900; letter-spacing: -0.05em; margin-bottom: 12px; font-family: 'NeoDunggeunmo', sans-serif; }
.stat-label { font-size: 16px; font-weight: 800; color: var(--k-text-muted); letter-spacing: 0.1em; }

.cta-title { font-size: 56px; font-weight: 900; letter-spacing: 0.05em; margin-bottom: 24px; font-family: 'NeoDunggeunmo', sans-serif;}
.cta-desc { font-size: 18px; font-weight: 600; color: var(--k-text-muted); margin-bottom: 48px; line-height: 1.6; }

.landing-footer { background: var(--k-housing); border-top: 2px solid var(--k-border-main); padding: 64px 40px 32px; flex-shrink: 0; position: relative; z-index: 10; }
.footer-inner { max-width: 1200px; margin: 0 auto 64px; display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 40px; }
.footer-logo { display: flex; align-items: center; gap: 10px; margin-bottom: 16px; font-weight: 900; letter-spacing: 0.15em; font-size: 18px; font-family: 'NeoDunggeunmo', sans-serif;}
.footer-tagline { font-size: 13px; font-weight: 600; color: var(--k-text-muted); }
.footer-inner h4 { font-weight: 900; margin-bottom: 20px; font-size: 14px; letter-spacing: 0.1em; color: var(--k-acc-1-bg); font-family: 'NeoDunggeunmo', sans-serif;}
.footer-inner ul { list-style: none; display: flex; flex-direction: column; gap: 12px; }
.footer-inner li { font-size: 13px; font-weight: 600; color: var(--k-text-muted); cursor: pointer; transition: 0.1s; }
.footer-inner li:hover { color: var(--k-text); text-decoration: underline; }
.footer-copy { max-width: 1200px; margin: 0 auto; padding-top: 24px; border-top: 2px dashed var(--k-border-main); text-align: center; font-size: 12px; font-weight: 700; letter-spacing: 0.05em; color: var(--k-text-muted); font-family: 'NeoDunggeunmo', sans-serif; }

/* 반응형 */
@media (max-width: 900px) {
  .bento-grid { grid-template-columns: 1fr; }
  .bento-large { grid-column: span 1; flex-direction: column; align-items: flex-start; }
  .stat-grid { grid-template-columns: 1fr; border-top: 2px solid var(--k-border-main); border-bottom: 2px solid var(--k-border-main); }
  .stat-item { border-right: none; border-bottom: 2px solid var(--k-border-main); }
  .stat-item:last-child { border-bottom: none; }
  .footer-inner { grid-template-columns: 1fr; }
  .landing-header-actions { gap: 8px; }
  .btn-text-only { padding: 0 12px; font-size: 14px; }
  .angled-marquee { transform: rotate(0) scale(1); margin: 0; }
}
</style>