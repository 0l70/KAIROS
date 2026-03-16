<template>
<<<<<<< HEAD
  <div class="login-root">
    <div class="login-card">
      <div class="login-logo">
        <svg width="32" height="32" viewBox="0 0 28 28" fill="none">
          <path d="M6 3h16v5l-6 6 6 6v5H6v-5l6-6-6-6V3z" fill="currentColor" opacity="0.15"/>
          <path d="M6 3h16v5l-6 6 6 6v5H6v-5l6-6-6-6V3z" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linejoin="round"/>
          <circle cx="14" cy="14" r="2" fill="currentColor"/>
          <path d="M8 5h12l-4 4H12L8 5z" fill="currentColor" opacity="0.5"/>
        </svg>
        <span class="logo-text">KAIROS</span>
      </div>

      <h2 class="login-title">WELCOME BACK.</h2>
      <p class="login-sub">계정에 로그인하여 학습을 이어가세요</p>

      <div class="form-group">
        <label class="form-label">EMAIL</label>
        <input
          v-model="email"
          type="email"
          class="form-input"
          placeholder="example@email.com"
        />
      </div>

      <div class="form-group">
        <label class="form-label">PASSWORD</label>
        <div class="input-wrap">
          <input
            v-model="password"
            :type="showPw ? 'text' : 'password'"
            class="form-input"
            placeholder="비밀번호를 입력하세요"
          />
          <button class="pw-toggle" @click="showPw = !showPw">
            <i :class="showPw ? 'fas fa-eye-slash' : 'fas fa-eye'" />
=======
  <div class="auth-root custom-scroll" :class="themeStore.isDark ? 'theme-dark' : 'theme-light'">
    
    <div class="crt-scanlines"></div>
    <div class="retro-grid-bg"></div>
    <div class="particle-container">
      <div v-for="n in 10" :key="`p-${n}`" class="pixel-star float-anim-random" 
           :style="{ top: Math.random()*100+'%', left: Math.random()*100+'%', animationDelay: Math.random()*5+'s' }"></div>
    </div>

    <div class="auth-container">
      <div class="auth-card retro-panel float-anim">
        
        <div class="auth-logo glitch-hover" @click="$router.push('/')">
          <div class="pixel-hourglass-logo"></div>
          <span class="logo-text" data-text="KAIROS">KAIROS</span>
        </div>

        <div class="auth-header">
          <h2 class="auth-title type-writer">WELCOME_BACK</h2>
          <p class="auth-sub">시스템에 접속하여 학습 데이터를 동기화하세요.</p>
        </div>

        <div class="auth-form">
          <div class="form-group">
            <label class="form-label">E-MAIL</label>
            <input v-model="email" type="email" class="terminal-input" placeholder="user@domain.com" />
          </div>

          <div class="form-group">
            <label class="form-label">PASSWORD</label>
            <div class="input-wrap">
              <input v-model="password" :type="showPw ? 'text' : 'password'" class="terminal-input" placeholder="Enter your password" />
              <button class="pw-toggle" @click="showPw = !showPw">
                <i :class="showPw ? 'fas fa-eye-slash' : 'fas fa-eye'" />
              </button>
            </div>
          </div>

          <button class="mech-key btn-large key-accent-1 glitch-hover mt-4" @click="handleLogin">
            <span class="key-legend" data-text="LOGIN // ENTER">LOGIN // ENTER</span>
          </button>

          <div class="divider"><span>OR BYPASS WITH</span></div>

          <button class="mech-key btn-large key-accent-2 glitch-hover" @click="handleLogin">
            <span class="key-legend" data-text="GOOGLE AUTH"><div class="google-icon">G</div> GOOGLE AUTH</span>
>>>>>>> d9d81185ededc2b2de1631f9ff7968776e03e2e7
          </button>
        </div>

        <div class="auth-footer">
          신규 유저이신가요? 
          <span class="text-accent-1 link-hover" @click="$router.push('/signup')">[회원가입]</span>
        </div>

      </div>
<<<<<<< HEAD

      <button class="btn-primary" @click="handleLogin">LOGIN</button>

      <div class="divider"><span>OR</span></div>

      <button class="btn-google" @click="handleLogin">
        <div class="google-icon">G</div>
        CONTINUE WITH GOOGLE
      </button>

      <p class="signup-link">
        계정이 없으신가요?
        <span @click="$router.push('/signup')">CREATE ACCOUNT</span>
      </p>
=======
>>>>>>> d9d81185ededc2b2de1631f9ff7968776e03e2e7
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useThemeStore } from '@/stores/useThemeStore'

const router = useRouter()
const themeStore = useThemeStore()
const email = ref('')
const password = ref('')
const showPw = ref(false)

function handleLogin() {
  router.push('/calendar')
}

onMounted(() => {
  // 로그인 페이지 접속 시 기본적으로 다크모드가 감성이 좋아 다크모드로 세팅 권장 (선택사항)
  // if (!themeStore.isDark) themeStore.isDark = true;
})
</script>

<style scoped>
<<<<<<< HEAD
.login-root {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-base);
  font-family: 'Space Grotesk', 'Escoredream', system-ui, sans-serif;
  padding: 24px;
}

.login-card {
  width: 100%;
  max-width: 420px;
  background: transparent;
  border: 1px solid var(--border);
  padding: 48px 40px;
  display: flex;
  flex-direction: column;
  gap: 0;
  animation: fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
}
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}

.login-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 32px;
  color: var(--text-primary);
}
.logo-text {
  font-weight: 800;
  font-size: 20px;
  letter-spacing: 0.16em;
  color: var(--text-primary);
}

.login-title {
  font-size: 24px;
  font-weight: 900;
  color: var(--text-primary);
  margin-bottom: 8px;
  letter-spacing: 0.05em;
}
.login-sub {
  font-size: 13px;
  color: var(--text-muted);
  margin-bottom: 32px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 20px;
}
.form-label {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.05em;
  color: var(--text-primary);
}
.input-wrap {
  position: relative;
}
.form-input {
  width: 100%;
  padding: 14px 16px;
  border: 1px solid var(--border);
  background: transparent;
  color: var(--text-primary);
  font-size: 14px;
  font-family: inherit;
  transition: border-color 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  box-sizing: border-box;
}
.form-input:focus {
  outline: none;
  border-color: var(--text-primary);
}
.pw-toggle {
  position: absolute;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text-muted);
  font-size: 14px;
}
.pw-toggle:hover { color: var(--text-primary); }

.btn-primary {
  width: 100%;
  padding: 16px;
  border: 1px solid var(--text-primary);
  background: var(--text-primary);
  color: var(--bg-base);
  font-size: 14px;
  font-weight: 800;
  letter-spacing: 0.1em;
  cursor: pointer;
  font-family: inherit;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  margin-top: 8px;
}
.btn-primary:hover { 
  background: transparent; 
  color: var(--text-primary); 
}

.divider {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 24px 0;
  color: var(--text-muted);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.1em;
}
.divider::before,
.divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: var(--border);
}

.btn-google {
  width: 100%;
  padding: 14px;
  border: 1px solid var(--border);
  background: transparent;
  color: var(--text-primary);
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.05em;
  cursor: pointer;
  font-family: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.btn-google:hover { 
  background: var(--bg-hover); 
  border-color: var(--text-primary);
}
.google-icon {
  width: 20px;
  height: 20px;
  border: 1px solid var(--border);
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 800;
  transition: border-color 0.3s;
}
.btn-google:hover .google-icon {
  border-color: var(--text-primary);
=======
/* ── 폰트 및 테마 변수 (랜딩 페이지와 동일) ── */
@font-face { font-family: 'Mulmaru'; src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/2601-4@1.1/Mulmaru.woff2') format('woff2'); font-weight: normal; font-display: swap; }
@font-face { font-family: 'NeoDunggeunmo'; src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.3/NeoDunggeunmoPro-Regular.woff2') format('woff2'); font-weight: normal; font-display: swap; }

.theme-light { --k-bg: #EAEAEA; --k-housing: #D4D4D4; --k-key-bg: #F5F5F5; --k-key-border: #A3A3A3; --k-key-shadow: #737373; --k-text: #2B2B2B; --k-text-muted: #6B6B6B; --k-border-main: #404040; --k-acc-1-bg: #D95C5C; --k-acc-1-shadow: #A33A3A; --k-acc-2-bg: #4B7FB8; --k-acc-2-shadow: #2F5682; --k-acc-3-bg: #D4883A; --k-acc-3-shadow: #9E5E1E; }
.theme-dark { --k-bg: #181A1F; --k-housing: #21252B; --k-key-bg: #282C34; --k-key-border: #111111; --k-key-shadow: #090A0C; --k-text: #ABB2BF; --k-text-muted: #5C6370; --k-border-main: #3E4451; --k-acc-1-bg: #D19A66; --k-acc-1-shadow: #9E7045; --k-acc-2-bg: #56B6C2; --k-acc-2-shadow: #35808A; --k-acc-3-bg: #98C379; --k-acc-3-shadow: #63854A; }

.auth-root { min-height: 100vh; background: var(--k-bg); color: var(--k-text); font-family: 'Mulmaru', sans-serif; display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden; padding: 20px; transition: background 0.4s, color 0.4s; }

/* 배경 요소 */
.crt-scanlines { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.15) 50%); background-size: 100% 4px; z-index: 1; pointer-events: none; opacity: 0.6; }
.retro-grid-bg { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-image: linear-gradient(var(--k-border-main) 1px, transparent 1px), linear-gradient(90deg, var(--k-border-main) 1px, transparent 1px); background-size: 50px 50px; opacity: 0.05; z-index: 0; transform: perspective(500px) rotateX(20deg) translateY(-50px); animation: gridMove 10s linear infinite; }
@keyframes gridMove { 0% { background-position: 0 0; } 100% { background-position: 0 50px; } }
.particle-container { position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 1; overflow: hidden; }
.pixel-star { position: absolute; width: 4px; height: 4px; background: var(--k-text-muted); opacity: 0.2; }
.float-anim-random { animation: floatRandom 8s ease-in-out infinite alternate; }
@keyframes floatRandom { 0% { transform: translate(0, 0); } 100% { transform: translate(20px, -20px); opacity: 0.8; } }

/* 카드 UI */
.auth-container { position: relative; z-index: 10; width: 100%; max-width: 440px; }
.retro-panel { background: var(--k-housing); border: 2px solid var(--k-border-main); box-shadow: 8px 8px 0 var(--k-border-main); border-radius: 12px; }
.auth-card { padding: 40px 32px; display: flex; flex-direction: column; gap: 20px; }
.float-anim { animation: float 6s ease-in-out infinite; }
@keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); box-shadow: 8px 16px 0 var(--k-border-main); } }

/* 로고 & 헤더 */
.auth-logo { display: flex; align-items: center; justify-content: center; gap: 12px; margin-bottom: 10px; cursor: pointer; }
.logo-text { font-family: 'NeoDunggeunmo', sans-serif; font-size: 28px; font-weight: 900; letter-spacing: 0.1em; color: var(--k-text); }
.pixel-hourglass-logo { width: 4px; height: 4px; background: transparent; box-shadow: 0 0 0 var(--k-acc-1-bg), 4px 0 0 var(--k-acc-1-bg), 8px 0 0 var(--k-acc-1-bg), 12px 0 0 var(--k-acc-1-bg), 16px 0 0 var(--k-acc-1-bg), 0 4px 0 var(--k-acc-1-bg), 4px 4px 0 var(--k-acc-2-bg), 8px 4px 0 var(--k-acc-2-bg), 12px 4px 0 var(--k-acc-2-bg), 16px 4px 0 var(--k-acc-1-bg), 4px 8px 0 var(--k-acc-1-bg), 8px 8px 0 var(--k-acc-2-bg), 12px 8px 0 var(--k-acc-1-bg), 8px 12px 0 var(--k-acc-1-bg), 4px 16px 0 var(--k-acc-1-bg), 8px 16px 0 var(--k-bg), 12px 16px 0 var(--k-acc-1-bg), 0 20px 0 var(--k-acc-1-bg), 4px 20px 0 var(--k-bg), 8px 20px 0 var(--k-acc-2-bg), 12px 20px 0 var(--k-bg), 16px 20px 0 var(--k-acc-1-bg), 0 24px 0 var(--k-acc-1-bg), 4px 24px 0 var(--k-acc-1-bg), 8px 24px 0 var(--k-acc-1-bg), 12px 24px 0 var(--k-acc-1-bg), 16px 24px 0 var(--k-acc-1-bg); animation: flipHourglass 4s infinite cubic-bezier(0.68, -0.55, 0.27, 1.55); margin-right: 16px;}
@keyframes flipHourglass { 0%, 40% { transform: rotate(0deg); } 50%, 90% { transform: rotate(180deg); } 100% { transform: rotate(360deg); } }

.auth-header { text-align: center; margin-bottom: 12px; }
.auth-title { font-family: 'NeoDunggeunmo', sans-serif; font-size: 24px; color: var(--k-acc-2-bg); margin-bottom: 8px; }
.auth-sub { font-size: 13px; color: var(--k-text-muted); line-height: 1.5; }

/* 💡 NEW: 터미널 스타일 입력창 */
.auth-form { display: flex; flex-direction: column; gap: 16px; }
.form-group { display: flex; flex-direction: column; gap: 8px; }
.form-label { font-family: 'NeoDunggeunmo', sans-serif; font-size: 14px; color: var(--k-text); }
.input-wrap { position: relative; }
.terminal-input {
  width: 100%; padding: 14px 16px;
  background: var(--k-key-shadow); /* 음각 배경 */
  color: var(--k-acc-2-bg); /* 터미널 글씨색 */
  border: 2px solid var(--k-key-border); border-radius: 6px;
  font-family: 'NeoDunggeunmo', monospace; font-size: 16px;
  box-shadow: inset 0 4px 8px rgba(0,0,0,0.3); /* 깊숙히 파인 느낌 */
  transition: all 0.2s; box-sizing: border-box;
>>>>>>> d9d81185ededc2b2de1631f9ff7968776e03e2e7
}
.terminal-input::placeholder { color: var(--k-text-muted); font-family: 'Mulmaru', sans-serif; font-size: 13px; }
.terminal-input:focus { outline: none; border-color: var(--k-acc-1-bg); background: var(--k-key-bg); color: var(--k-text); box-shadow: inset 0 2px 4px rgba(0,0,0,0.2), 0 0 10px rgba(209, 154, 102, 0.2); }

<<<<<<< HEAD
.signup-link {
  text-align: center;
  font-size: 12px;
  color: var(--text-muted);
  margin-top: 24px;
  letter-spacing: 0.05em;
}
.signup-link span {
  color: var(--text-primary);
  font-weight: 700;
  cursor: pointer;
  margin-left: 6px;
}
.signup-link span:hover { text-decoration: underline; }
=======
.pw-toggle { position: absolute; right: 14px; top: 50%; transform: translateY(-50%); background: none; border: none; color: var(--k-text-muted); cursor: pointer; transition: color 0.2s; }
.pw-toggle:hover { color: var(--k-acc-1-bg); }

/* 기계식 버튼 */
.mech-key { position: relative; box-sizing: border-box; background: var(--k-key-bg); color: var(--k-text); border: 2px solid var(--k-key-border); border-radius: 8px; box-shadow: inset 0px 4px 0px rgba(255, 255, 255, 0.05), 0px 6px 0px var(--k-key-shadow), 0px 8px 8px rgba(0, 0, 0, 0.1); cursor: pointer; transition: all 0.1s; display: inline-flex; justify-content: center; align-items: center; width: 100%; }
.mech-key:active { transform: translateY(6px); box-shadow: inset 0px 2px 0px rgba(255, 255, 255, 0.05), 0px 0px 0px var(--k-key-shadow), 0px 2px 2px rgba(0, 0, 0, 0.1); }
.btn-large { height: 56px; }
.key-legend { font-size: 16px; font-weight: 800; font-family: 'NeoDunggeunmo', sans-serif; display: flex; align-items: center; gap: 8px; }
.key-accent-1 { background: var(--k-acc-1-bg); color: #fff; border-color: var(--k-acc-1-shadow); box-shadow: inset 0px 4px 0px rgba(255,255,255,0.2), 0px 6px 0px var(--k-acc-1-shadow), 0px 8px 8px rgba(0,0,0,0.1); }
.key-accent-1:active { box-shadow: inset 0px 2px 0px rgba(255,255,255,0.2), 0px 0px 0px var(--k-acc-1-shadow), 0px 2px 2px rgba(0,0,0,0.2); }
.key-accent-2 { background: var(--k-acc-2-bg); color: #fff; border-color: var(--k-acc-2-shadow); box-shadow: inset 0px 4px 0px rgba(255,255,255,0.2), 0px 6px 0px var(--k-acc-2-shadow), 0px 8px 8px rgba(0,0,0,0.1); }
.key-accent-2:active { box-shadow: inset 0px 2px 0px rgba(255,255,255,0.2), 0px 0px 0px var(--k-acc-2-shadow), 0px 2px 2px rgba(0,0,0,0.2); }
.mt-4 { margin-top: 16px; }

/* 글리치 & 애니메이션 */
.glitch-hover { position: relative; }
.glitch-hover:hover .logo-text::before, .glitch-hover:hover .key-legend::before { content: attr(data-text); position: absolute; left: -2px; text-shadow: 1px 0 var(--k-acc-1-bg); top: 0; color: var(--k-text); background: transparent; overflow: hidden; clip: rect(0, 900px, 0, 0); animation: glitchAnim 2s infinite linear alternate-reverse; }
.glitch-hover:hover .logo-text::after, .glitch-hover:hover .key-legend::after { content: attr(data-text); position: absolute; left: 2px; text-shadow: -1px 0 var(--k-acc-2-bg); top: 0; color: var(--k-text); background: transparent; overflow: hidden; clip: rect(0, 900px, 0, 0); animation: glitchAnim2 3s infinite linear alternate-reverse; }
@keyframes glitchAnim { 0% { clip: rect(2px, 9999px, 14px, 0); } 50% { clip: rect(10px, 9999px, 30px, 0); } 100% { clip: rect(4px, 9999px, 8px, 0); } }
@keyframes glitchAnim2 { 0% { clip: rect(15px, 9999px, 25px, 0); } 50% { clip: rect(2px, 9999px, 12px, 0); } 100% { clip: rect(28px, 9999px, 38px, 0); } }
.type-writer { display: inline-block; overflow: hidden; white-space: nowrap; border-right: 4px solid var(--k-acc-1-bg); animation: typing 1.5s steps(15, end), blink-cursor .75s step-end infinite; }
@keyframes typing { from { width: 0; } to { width: 100%; } }
@keyframes blink-cursor { from, to { border-color: transparent; } 50% { border-color: var(--k-acc-1-bg); } }

/* 구분선 & 푸터 */
.divider { display: flex; align-items: center; gap: 12px; margin: 10px 0; color: var(--k-text-muted); font-family: 'NeoDunggeunmo', sans-serif; font-size: 12px; }
.divider::before, .divider::after { content: ''; flex: 1; height: 2px; background: var(--k-border-main); border-bottom: 1px solid rgba(255,255,255,0.1); }
.google-icon { width: 20px; height: 20px; border: 2px solid currentColor; display: inline-flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 900; border-radius: 4px; }
.auth-footer { text-align: center; margin-top: 16px; font-size: 13px; color: var(--k-text-muted); }
.text-accent-1 { color: var(--k-acc-1-bg); font-weight: 800; cursor: pointer; }
.link-hover:hover { text-decoration: underline; text-underline-offset: 4px; }
>>>>>>> d9d81185ededc2b2de1631f9ff7968776e03e2e7
</style>