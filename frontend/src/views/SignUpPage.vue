<template>
  <div class="auth-root custom-scroll" :class="themeStore.isDark ? 'theme-dark' : 'theme-light'">
    
    <div class="crt-scanlines"></div>
    <div class="retro-grid-bg"></div>

    <div class="auth-container">
      <div class="auth-card retro-panel float-anim" style="max-width: 480px;">
        
        <div class="auth-logo glitch-hover" @click="$router.push('/')">
          <div class="pixel-hourglass-logo"></div>
          <span class="logo-text" data-text="KAIROS">KAIROS</span>
        </div>

        <div class="auth-header">
          <h2 class="auth-title type-writer" style="color: var(--k-acc-1-bg);">NEW_PLAYER</h2>
          <p class="auth-sub">카이로스와 함께 성장의 타임라인을 구축하세요.</p>
        </div>

        <div class="auth-form">
          <div class="form-group">
            <label class="form-label">USERNAME</label>
            <input v-model="name" type="text" class="terminal-input" placeholder="개발자명 입력" />
          </div>

          <div class="form-group">
            <label class="form-label">E-MAIL</label>
            <input v-model="email" type="email" class="terminal-input" placeholder="user@domain.com" />
          </div>

          <div class="form-group">
            <label class="form-label">PASSWORD</label>
            <div class="input-wrap">
              <input v-model="password" :type="showPw ? 'text' : 'password'" class="terminal-input" placeholder="비밀번호 설정" />
              <button class="pw-toggle" @click="showPw = !showPw">
                <i :class="showPw ? 'fas fa-eye-slash' : 'fas fa-eye'" />
              </button>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">CONFIRM PASSWORD</label>
            <input v-model="passwordConfirm" :type="showPw ? 'text' : 'password'" class="terminal-input" placeholder="비밀번호 확인" />
          </div>

          <button class="mech-key btn-large key-accent-1 glitch-hover mt-4" @click="handleSignup">
            <span class="key-legend" data-text="CREATE ACCOUNT">CREATE ACCOUNT</span>
          </button>
        </div>

        <div class="auth-footer">
          이미 계정이 있으신가요? 
          <span class="text-accent-2 link-hover" @click="$router.push('/login')">[로그인]</span>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useThemeStore } from '@/stores/useThemeStore'

const router = useRouter()
const themeStore = useThemeStore()

const name = ref('')
const email = ref('')
const password = ref('')
const passwordConfirm = ref('')
const showPw = ref(false)

function handleSignup() {
  // 회원가입 로직 후 이동
  router.push('/setup') 
}
</script>

<style scoped>
/* ── LoginPage.vue와 완전히 동일한 스타일 코드를 사용합니다 ── */
@font-face { font-family: 'Mulmaru'; src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/2601-4@1.1/Mulmaru.woff2') format('woff2'); font-weight: normal; font-display: swap; }
@font-face { font-family: 'NeoDunggeunmo'; src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.3/NeoDunggeunmoPro-Regular.woff2') format('woff2'); font-weight: normal; font-display: swap; }

.theme-light { --k-bg: #EAEAEA; --k-housing: #D4D4D4; --k-key-bg: #F5F5F5; --k-key-border: #A3A3A3; --k-key-shadow: #737373; --k-text: #2B2B2B; --k-text-muted: #6B6B6B; --k-border-main: #404040; --k-acc-1-bg: #D95C5C; --k-acc-1-shadow: #A33A3A; --k-acc-2-bg: #4B7FB8; --k-acc-2-shadow: #2F5682; --k-acc-3-bg: #D4883A; --k-acc-3-shadow: #9E5E1E; }
.theme-dark { --k-bg: #181A1F; --k-housing: #21252B; --k-key-bg: #282C34; --k-key-border: #111111; --k-key-shadow: #090A0C; --k-text: #ABB2BF; --k-text-muted: #5C6370; --k-border-main: #3E4451; --k-acc-1-bg: #D19A66; --k-acc-1-shadow: #9E7045; --k-acc-2-bg: #56B6C2; --k-acc-2-shadow: #35808A; --k-acc-3-bg: #98C379; --k-acc-3-shadow: #63854A; }

.auth-root { min-height: 100vh; background: var(--k-bg); color: var(--k-text); font-family: 'Mulmaru', sans-serif; display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden; padding: 20px; transition: background 0.4s, color 0.4s; }
.crt-scanlines { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.15) 50%); background-size: 100% 4px; z-index: 1; pointer-events: none; opacity: 0.6; }
.retro-grid-bg { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-image: linear-gradient(var(--k-border-main) 1px, transparent 1px), linear-gradient(90deg, var(--k-border-main) 1px, transparent 1px); background-size: 50px 50px; opacity: 0.05; z-index: 0; transform: perspective(500px) rotateX(20deg) translateY(-50px); animation: gridMove 10s linear infinite; }
@keyframes gridMove { 0% { background-position: 0 0; } 100% { background-position: 0 50px; } }

.auth-container { position: relative; z-index: 10; width: 100%; max-width: 440px; margin: 0 auto;}
.retro-panel { background: var(--k-housing); border: 2px solid var(--k-border-main); box-shadow: 8px 8px 0 var(--k-border-main); border-radius: 12px; }
.auth-card { padding: 40px 32px; display: flex; flex-direction: column; gap: 20px; }
.float-anim { animation: float 6s ease-in-out infinite; }
@keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); box-shadow: 8px 16px 0 var(--k-border-main); } }

.auth-logo { display: flex; align-items: center; justify-content: center; gap: 12px; margin-bottom: 10px; cursor: pointer; }
.logo-text { font-family: 'NeoDunggeunmo', sans-serif; font-size: 28px; font-weight: 900; letter-spacing: 0.1em; color: var(--k-text); }
.pixel-hourglass-logo { width: 4px; height: 4px; background: transparent; box-shadow: 0 0 0 var(--k-acc-1-bg), 4px 0 0 var(--k-acc-1-bg), 8px 0 0 var(--k-acc-1-bg), 12px 0 0 var(--k-acc-1-bg), 16px 0 0 var(--k-acc-1-bg), 0 4px 0 var(--k-acc-1-bg), 4px 4px 0 var(--k-acc-2-bg), 8px 4px 0 var(--k-acc-2-bg), 12px 4px 0 var(--k-acc-2-bg), 16px 4px 0 var(--k-acc-1-bg), 4px 8px 0 var(--k-acc-1-bg), 8px 8px 0 var(--k-acc-2-bg), 12px 8px 0 var(--k-acc-1-bg), 8px 12px 0 var(--k-acc-1-bg), 4px 16px 0 var(--k-acc-1-bg), 8px 16px 0 var(--k-bg), 12px 16px 0 var(--k-acc-1-bg), 0 20px 0 var(--k-acc-1-bg), 4px 20px 0 var(--k-bg), 8px 20px 0 var(--k-acc-2-bg), 12px 20px 0 var(--k-bg), 16px 20px 0 var(--k-acc-1-bg), 0 24px 0 var(--k-acc-1-bg), 4px 24px 0 var(--k-acc-1-bg), 8px 24px 0 var(--k-acc-1-bg), 12px 24px 0 var(--k-acc-1-bg), 16px 24px 0 var(--k-acc-1-bg); animation: flipHourglass 4s infinite cubic-bezier(0.68, -0.55, 0.27, 1.55); margin-right: 16px;}
@keyframes flipHourglass { 0%, 40% { transform: rotate(0deg); } 50%, 90% { transform: rotate(180deg); } 100% { transform: rotate(360deg); } }

.auth-header { text-align: center; margin-bottom: 12px; }
.auth-title { font-family: 'NeoDunggeunmo', sans-serif; font-size: 24px; margin-bottom: 8px; }
.auth-sub { font-size: 13px; color: var(--k-text-muted); line-height: 1.5; }

.auth-form { display: flex; flex-direction: column; gap: 16px; }
.form-group { display: flex; flex-direction: column; gap: 8px; }
.form-label { font-family: 'NeoDunggeunmo', sans-serif; font-size: 14px; color: var(--k-text); }
.input-wrap { position: relative; }
.terminal-input { width: 100%; padding: 14px 16px; background: var(--k-key-shadow); color: var(--k-acc-2-bg); border: 2px solid var(--k-key-border); border-radius: 6px; font-family: 'NeoDunggeunmo', monospace; font-size: 16px; box-shadow: inset 0 4px 8px rgba(0,0,0,0.3); transition: all 0.2s; box-sizing: border-box; }
.terminal-input::placeholder { color: var(--k-text-muted); font-family: 'Mulmaru', sans-serif; font-size: 13px; }
.terminal-input:focus { outline: none; border-color: var(--k-acc-1-bg); background: var(--k-key-bg); color: var(--k-text); box-shadow: inset 0 2px 4px rgba(0,0,0,0.2), 0 0 10px rgba(209, 154, 102, 0.2); }
.pw-toggle { position: absolute; right: 14px; top: 50%; transform: translateY(-50%); background: none; border: none; color: var(--k-text-muted); cursor: pointer; transition: color 0.2s; }
.pw-toggle:hover { color: var(--k-acc-1-bg); }

.mech-key { position: relative; box-sizing: border-box; background: var(--k-key-bg); color: var(--k-text); border: 2px solid var(--k-key-border); border-radius: 8px; box-shadow: inset 0px 4px 0px rgba(255, 255, 255, 0.05), 0px 6px 0px var(--k-key-shadow), 0px 8px 8px rgba(0, 0, 0, 0.1); cursor: pointer; transition: all 0.1s; display: inline-flex; justify-content: center; align-items: center; width: 100%; }
.mech-key:active { transform: translateY(6px); box-shadow: inset 0px 2px 0px rgba(255, 255, 255, 0.05), 0px 0px 0px var(--k-key-shadow), 0px 2px 2px rgba(0, 0, 0, 0.1); }
.btn-large { height: 56px; }
.key-legend { font-size: 16px; font-weight: 800; font-family: 'NeoDunggeunmo', sans-serif; display: flex; align-items: center; gap: 8px; }
.key-accent-1 { background: var(--k-acc-1-bg); color: #fff; border-color: var(--k-acc-1-shadow); box-shadow: inset 0px 4px 0px rgba(255,255,255,0.2), 0px 6px 0px var(--k-acc-1-shadow), 0px 8px 8px rgba(0,0,0,0.1); }
.key-accent-1:active { box-shadow: inset 0px 2px 0px rgba(255,255,255,0.2), 0px 0px 0px var(--k-acc-1-shadow), 0px 2px 2px rgba(0,0,0,0.2); }
.mt-4 { margin-top: 16px; }

.glitch-hover { position: relative; }
.glitch-hover:hover .logo-text::before, .glitch-hover:hover .key-legend::before { content: attr(data-text); position: absolute; left: -2px; text-shadow: 1px 0 var(--k-acc-1-bg); top: 0; color: var(--k-text); background: transparent; overflow: hidden; clip: rect(0, 900px, 0, 0); animation: glitchAnim 2s infinite linear alternate-reverse; }
.glitch-hover:hover .logo-text::after, .glitch-hover:hover .key-legend::after { content: attr(data-text); position: absolute; left: 2px; text-shadow: -1px 0 var(--k-acc-2-bg); top: 0; color: var(--k-text); background: transparent; overflow: hidden; clip: rect(0, 900px, 0, 0); animation: glitchAnim2 3s infinite linear alternate-reverse; }
@keyframes glitchAnim { 0% { clip: rect(2px, 9999px, 14px, 0); } 50% { clip: rect(10px, 9999px, 30px, 0); } 100% { clip: rect(4px, 9999px, 8px, 0); } }
@keyframes glitchAnim2 { 0% { clip: rect(15px, 9999px, 25px, 0); } 50% { clip: rect(2px, 9999px, 12px, 0); } 100% { clip: rect(28px, 9999px, 38px, 0); } }
.type-writer { display: inline-block; overflow: hidden; white-space: nowrap; border-right: 4px solid var(--k-acc-1-bg); animation: typing 1.5s steps(15, end), blink-cursor .75s step-end infinite; }
@keyframes typing { from { width: 0; } to { width: 100%; } }
@keyframes blink-cursor { from, to { border-color: transparent; } 50% { border-color: var(--k-acc-1-bg); } }

.auth-footer { text-align: center; margin-top: 16px; font-size: 13px; color: var(--k-text-muted); }
.text-accent-2 { color: var(--k-acc-2-bg); font-weight: 800; cursor: pointer; }
.link-hover:hover { text-decoration: underline; text-underline-offset: 4px; }
</style>