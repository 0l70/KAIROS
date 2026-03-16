<template>
<<<<<<< HEAD
  <div class="app-layout">
    <AppSidebar />

    <main class="main-content custom-scroll">
      <header class="page-header">
        <div class="header-title"><i class="fas fa-user-circle" /> MY PAGE</div>
      </header>

      <div class="content-inner max-w-xl mx-auto">
        <!-- Profile Summary -->
        <div class="brutal-panel p-lg mb-md shadow-normal flex-align gap-lg">
          <div class="avatar-circle">JK</div>
          <div class="flex-col min-w-0">
            <h2 class="profile-name">김정현</h2>
            <p class="profile-email">jung@email.com</p>
            <div class="flex-align gap-md mt-sm">
              <span class="profile-meta">가입일 2026.01.15</span>
              <span class="profile-meta dot">·</span>
              <span class="profile-meta">주니어 개발자</span>
            </div>
          </div>
=======
  <div class="mypage-layout" :class="themeStore.isDark ? 'theme-dark' : 'theme-light'">
    <div class="crt-scanlines"></div>
    <div class="retro-dot-bg"></div>

    <AppSidebar />

    <main class="mypage-main custom-scroll">
      <div class="mypage-header">
        <button class="mech-key btn-back" @click="router.back()">
          <span class="key-legend"><i class="fas fa-arrow-left" /></span>
        </button>
        <div class="mypage-header-title">
          <h1 class="page-title retro-text-hover">MY_PAGE</h1>
          <p class="page-sub">시스템 프로필 및 AI 멘토 설정 관리</p>
>>>>>>> d9d81185ededc2b2de1631f9ff7968776e03e2e7
        </div>

<<<<<<< HEAD
        <!-- Settings Menu Cards -->
        <div class="flex-col gap-sm mb-lg">
          <!-- Profile Settings -->
          <button class="menu-card group shadow-normal" @click="$router.push('/mypage/profile')">
            <div class="menu-icon-box">
              <i class="fas fa-user" />
            </div>
            <div class="menu-text-wrap">
              <h3 class="menu-title">프로필 설정</h3>
              <p class="menu-desc">연동 정보 범위, 일정 반영 범위, 현재 직업과 기술 스택을 수정합니다</p>
            </div>
            <i class="fas fa-arrow-right menu-arrow" />
          </button>

          <!-- Account Management -->
          <button class="menu-card group shadow-normal" @click="$router.push('/mypage/accounts')">
            <div class="menu-icon-box">
              <i class="fas fa-link" />
            </div>
            <div class="menu-text-wrap">
              <h3 class="menu-title">외부 계정 관리</h3>
              <p class="menu-desc">GitHub, Velog 연동 상태와 마지막 동기화 시각을 확인합니다</p>
            </div>
            <i class="fas fa-arrow-right menu-arrow" />
          </button>
        </div>

        <!-- Additional Info -->
        <div class="info-note brutal-panel shadow-none">
          <div class="flex-start gap-md">
            <i class="fas fa-shield-alt text-muted mt-xs text-sm shrink-0" />
            <p class="text-sm text-muted font-bold lh-lg m-0">
              연동된 계정 데이터는 학습 분석과 추천에만 활용되며, 외부에 공유되지 않습니다.
            </p>
          </div>
        </div>
=======
      <div class="mypage-content">

        <section class="card retro-panel">
          <div class="card-header">
            <div class="card-icon" style="background: var(--k-acc-2-bg); color: #fff;">
              <i class="fas fa-user" />
            </div>
            <div>
              <h2 class="card-title">USER PROFILE</h2>
              <p class="card-sub">현재 접속 중인 닉네임 변경</p>
            </div>
          </div>
          <div class="card-body">
            <div class="field-group">
              <label class="field-label">NICKNAME</label>
              <div class="input-row">
                <input
                  v-model="nickname"
                  type="text"
                  class="terminal-input"
                  placeholder="닉네임을 입력하세요"
                  maxlength="20"
                />
                <button class="mech-key btn-save" @click="saveNickname" :class="{ 'key-accent-3': nicknameSaved }">
                  <span class="key-legend">
                    <i :class="nicknameSaved ? 'fas fa-check' : 'fas fa-save'" />
                    {{ nicknameSaved ? 'SAVED' : 'SAVE' }}
                  </span>
                </button>
              </div>
              <p class="field-hint">최대 20자 · 현재 {{ nickname.length }}자</p>
            </div>
          </div>
        </section>

        <section class="card retro-panel">
          <div class="card-header">
            <div class="card-icon" style="background: #24292e; color:#fff">
              <i class="fab fa-github" />
            </div>
            <div>
              <h2 class="card-title">GITHUB SYNC</h2>
              <p class="card-sub">커밋 기록 자동 수집 설정</p>
            </div>
          </div>
          <div class="card-body">
            <div class="github-status-row">
              <div class="github-info">
                <span class="status-badge retro-badge" :class="github.connected ? 'badge--connected' : 'badge--disconnected'">
                  <span class="status-dot" />
                  {{ github.connected ? 'CONNECTED' : 'DISCONNECTED' }}
                </span>
                <span v-if="github.connected" class="github-username">
                  <i class="fab fa-github" /> {{ github.username }}
                </span>
              </div>
              <button
                class="mech-key btn-github"
                :class="github.connected ? '' : 'key-accent-1'"
                @click="toggleGithub"
              >
                <span class="key-legend">
                  <i :class="github.connected ? 'fas fa-unlink' : 'fas fa-link'" />
                  {{ github.connected ? 'DISCONNECT' : 'LINK GITHUB' }}
                </span>
              </button>
            </div>
            <div v-if="github.connected" class="github-stats terminal-bg">
              <div class="github-stat">
                <span class="stat-num">{{ github.repos }}</span>
                <span class="stat-label">REPOSITORIES</span>
              </div>
              <div class="github-stat">
                <span class="stat-num">{{ github.commits }}</span>
                <span class="stat-label">MTH COMMITS</span>
              </div>
              <div class="github-stat">
                <span class="stat-num text-accent-1">{{ github.streak }}</span>
                <span class="stat-label">DAY STREAK</span>
              </div>
            </div>
          </div>
        </section>

        <section class="card retro-panel">
          <div class="card-header">
            <div class="card-icon" style="background: var(--k-acc-3-bg); color:#fff">
              <i class="fas fa-code" />
            </div>
            <div>
              <h2 class="card-title">TECH STACK</h2>
              <p class="card-sub">보유한 기술 스택 등록</p>
            </div>
          </div>
          <div class="card-body">
            <div class="stack-input-row">
              <div class="stack-input-wrap">
                <i class="fas fa-terminal stack-search-icon" />
                <input
                  v-model="stackInput"
                  type="text"
                  class="terminal-input stack-input"
                  placeholder="ex) Vue, Spring, Python..."
                  @keydown.enter.prevent="addStack"
                />
              </div>
              <button class="mech-key key-accent-2" @click="addStack">
                <span class="key-legend"><i class="fas fa-plus" /> ADD</span>
              </button>
            </div>

            <div class="stack-suggestions">
              <span class="suggest-label">QUICK ADD:</span>
              <button
                v-for="s in filteredSuggestions"
                :key="s"
                class="suggest-chip mech-key-small"
                @click="addStackDirect(s)"
              >+ {{ s }}</button>
            </div>

            <div v-if="techStack.length" class="stack-pills">
              <div
                v-for="tech in techStack"
                :key="tech.name"
                class="stack-pill retro-badge"
                :style="{ background: tech.color + '22', borderColor: tech.color, color: tech.color }"
              >
                <span class="pill-icon">{{ tech.icon }}</span>
                <span>{{ tech.name }}</span>
                <button class="pill-remove" @click="removeStack(tech.name)">
                  <i class="fas fa-times" />
                </button>
              </div>
            </div>
            <p v-else class="stack-empty">> NOT FOUND. 데이터를 입력하십시오.</p>
          </div>
        </section>

        <section class="card retro-panel card--persona">
          <div class="card-header">
            <div class="card-icon" style="background: var(--k-acc-1-bg); color:#fff">
              <i class="fas fa-robot pulse-anim" />
            </div>
            <div>
              <h2 class="card-title">AI PERSONA</h2>
              <p class="card-sub">AI 어시스턴트의 응답 스타일 및 목표 설정</p>
            </div>
            <span class="md-badge retro-badge"><i class="fab fa-markdown" /> MD_SUPPORT</span>
          </div>
          <div class="card-body">
            <div class="persona-editor-wrap retro-panel" style="box-shadow: none;">
              <div class="persona-toolbar terminal-bg">
                <button class="toolbar-btn" @click="insertMd('**', '**')"><b>B</b></button>
                <button class="toolbar-btn" @click="insertMd('*', '*')"><i>I</i></button>
                <button class="toolbar-btn" @click="insertMd('\n## ', '')">H</button>
                <button class="toolbar-btn" @click="insertMd('\n- ', '')"><i class="fas fa-list-ul" /></button>
                <button class="toolbar-btn" @click="insertMd('`', '`')"><i class="fas fa-code" /></button>
                <div class="toolbar-sep" />
                <span class="char-count">{{ persona.length }} BYTE</span>
              </div>
              <textarea
                ref="personaRef"
                v-model="persona"
                class="persona-textarea terminal-input"
                style="border:none; box-shadow:inset 0 4px 8px rgba(0,0,0,0.5); border-radius:0;"
                rows="8"
                placeholder="> AI 에이전트의 성격, 개발 목표, 선호하는 어조를 입력하세요..."
              />
            </div>
            <div class="persona-actions">
              <button class="mech-key btn-preview" @click="showPreview = !showPreview">
                <span class="key-legend">
                  <i :class="showPreview ? 'fas fa-edit' : 'fas fa-eye'" />
                  {{ showPreview ? 'EDIT' : 'PREVIEW' }}
                </span>
              </button>
              <button class="mech-key key-accent-1" @click="savePersona">
                <span class="key-legend">
                  <i :class="personaSaved ? 'fas fa-check' : 'fas fa-upload'" />
                  {{ personaSaved ? 'SAVED' : 'APPLY TO AI' }}
                </span>
              </button>
            </div>
            
            <div v-if="showPreview && persona" class="persona-preview terminal-bg" v-html="renderMarkdown(persona)" />
          </div>
        </section>

>>>>>>> d9d81185ededc2b2de1631f9ff7968776e03e2e7
      </div>
    </main>
  </div>
</template>

<script setup>
<<<<<<< HEAD
=======
import { ref, computed, onMounted, nextTick } from 'vue'
>>>>>>> d9d81185ededc2b2de1631f9ff7968776e03e2e7
import { useRouter } from 'vue-router'
import AppSidebar from '@/components/AppSidebar.vue'
import { useThemeStore } from '@/stores/useThemeStore'

const router = useRouter()
<<<<<<< HEAD
</script>

<style scoped>
.app-layout { display: flex; width: 100%; height: 100vh; overflow: hidden; background: var(--bg-base); font-family: 'Space Grotesk', 'Escoredream', system-ui, sans-serif; }
.main-content { flex: 1; display: flex; flex-direction: column; overflow-y: auto; position: relative; }
.custom-scroll { -ms-overflow-style: none; scrollbar-width: none; }
.custom-scroll::-webkit-scrollbar { display: none; }

.page-header { display: flex; align-items: center; padding: 20px 32px; border-bottom: 2px solid var(--text-primary); background: var(--bg-surface); position: sticky; top: 0; z-index: 10; }
.header-title { font-size: 16px; font-weight: 900; letter-spacing: 0.1em; color: var(--text-primary); display: flex; align-items: center; gap: 10px; }

.content-inner { padding: 48px 32px; width: 100%; }
.max-w-xl { max-width: 600px; }
.mx-auto { margin-left: auto; margin-right: auto; }

/* Utils */
.flex-align { display: flex; align-items: center; }
.flex-col { display: flex; flex-direction: column; }
.flex-start { display: flex; align-items: flex-start; }
.gap-sm { gap: 12px; }
.gap-md { gap: 16px; }
.gap-lg { gap: 24px; }
.mb-md { margin-bottom: 16px; }
.mb-lg { margin-bottom: 24px; }
.mt-sm { margin-top: 8px; }
.mt-xs { margin-top: 4px; }
.p-lg { padding: 32px; }
.m-0 { margin: 0; }
.min-w-0 { min-width: 0; }
.shrink-0 { flex-shrink: 0; }

.text-muted { color: var(--text-muted); }
.text-sm { font-size: 13px; }
.font-bold { font-weight: 800; }
.lh-lg { line-height: 1.6; }

/* Panels & Shadows */
.brutal-panel { 
  background: transparent; 
  border: 1px solid var(--border); 
  border-radius: 0; 
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s; 
}
.shadow-normal { box-shadow: none; }
.shadow-none { box-shadow: none; }

/* Profile Area */
.avatar-circle { width: 64px; height: 64px; border: 2px solid var(--text-primary); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 20px; font-weight: 900; background: var(--bg-base); color: var(--text-primary); }
.profile-name { font-size: 20px; font-weight: 900; margin: 0 0 4px 0; color: var(--text-primary); }
.profile-email { font-size: 13px; font-weight: 700; margin: 0; color: var(--text-muted); }
.profile-meta { font-size: 12px; font-weight: 800; color: var(--text-muted); }

/* Menu Cards */
.menu-card { 
  display: flex; align-items: center; gap: 20px; text-align: left; 
  padding: 24px; background: transparent; 
  border: 1px solid var(--border); cursor: pointer; 
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1); 
  font-family: inherit; margin-bottom: 16px; 
}
.menu-card:hover { 
  background: var(--bg-hover); border-color: var(--text-primary); 
}
.menu-icon-box { 
  width: 48px; height: 48px; background: transparent; 
  border: 1px solid var(--border); display: flex; align-items: center; justify-content: center; 
  font-size: 20px; color: var(--text-primary); transition: all 0.3s; 
}
.menu-card:hover .menu-icon-box { border-color: var(--text-primary); }
.menu-text-wrap { flex: 1; min-width: 0; }
.menu-title { font-size: 16px; font-weight: 900; margin: 0 0 4px 0; color: var(--text-primary); }
.menu-desc { font-size: 13px; font-weight: 700; margin: 0; color: var(--text-muted); }
.menu-arrow { font-size: 18px; color: var(--text-muted); transition: color 0.3s; }
.menu-card:hover .menu-arrow { color: var(--text-primary); opacity: 1; transform: translateX(4px); }

/* Additional Info */
.info-note { 
  background: transparent; padding: 20px; 
  border: 1px dashed var(--border); 
}
=======
const themeStore = useThemeStore()

onMounted(() => {
  if (themeStore.isDark) themeStore.isDark = false;
})

const nickname     = ref('김싸피')
const nicknameSaved = ref(false)
function saveNickname() {
  if (!nickname.value.trim()) return
  nicknameSaved.value = true
  setTimeout(() => { nicknameSaved.value = false }, 2000)
}

const github = ref({ connected: true, username: 'kimssafy', repos: 24, commits: 87, streak: 12 })
function toggleGithub() { github.value.connected = !github.value.connected }

const TECH_META = {
  'Vue': { color: '#42d392', icon: '💚' }, 'React': { color: '#61dafb', icon: '⚛️' }, 'Spring': { color: '#6db33f', icon: '🍃' },
  'Python': { color: '#3776ab', icon: '🐍' }, 'TypeScript': { color: '#3178c6', icon: '🔷' }, 'Java': { color: '#ed8b00', icon: '☕' },
  'Node.js': { color: '#339933', icon: '🟢' }, 'MySQL': { color: '#4479a1', icon: '🗄️' }, 'Docker': { color: '#2496ed', icon: '🐳' },
}
const SUGGESTIONS = Object.keys(TECH_META)

const techStack = ref([ { name: 'Vue', ...TECH_META['Vue'] }, { name: 'Python', ...TECH_META['Python'] }, { name: 'Spring', ...TECH_META['Spring'] } ])
const stackInput = ref('')

const filteredSuggestions = computed(() => {
  const added = new Set(techStack.value.map(t => t.name))
  const q = stackInput.value.toLowerCase()
  return SUGGESTIONS.filter(s => !added.has(s) && (q === '' || s.toLowerCase().includes(q))).slice(0, 5)
})

function addStack() {
  const name = stackInput.value.trim()
  if (!name) return
  if (techStack.value.some(t => t.name.toLowerCase() === name.toLowerCase())) { stackInput.value = ''; return }
  const meta = TECH_META[name] || { color: '#6b7280', icon: '🔧' }
  techStack.value.push({ name, ...meta })
  stackInput.value = ''
}

function addStackDirect(name) {
  if (techStack.value.some(t => t.name === name)) return
  const meta = TECH_META[name] || { color: '#6b7280', icon: '🔧' }
  techStack.value.push({ name, ...meta })
}

function removeStack(name) { techStack.value = techStack.value.filter(t => t.name !== name) }

const persona     = ref('')
const personaSaved = ref(false)
const showPreview  = ref(false)
const personaRef   = ref(null)

function insertMd(before, after) {
  const el = personaRef.value
  if (!el) return
  const s = el.selectionStart, e = el.selectionEnd
  const sel = persona.value.substring(s, e)
  persona.value = persona.value.substring(0,s) + before + sel + after + persona.value.substring(e)
  nextTick(() => { el.selectionStart = s+before.length; el.selectionEnd = e+before.length; el.focus() })
}

function savePersona() {
  personaSaved.value = true
  setTimeout(() => { personaSaved.value = false }, 2000)
}

function renderMarkdown(text) {
  return text.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>').replace(/^### (.+)$/gm, '<h3>$1</h3>').replace(/^# (.+)$/gm, '<h1>$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/\*(.+?)\*/g, '<em>$1</em>').replace(/`(.+?)`/g, '<code>$1</code>')
    .replace(/^- (.+)$/gm, '<li>$1</li>').replace(/\n/g, '<br>')
}
</script>

<style scoped>
@font-face { font-family: 'Mulmaru'; src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/2601-4@1.1/Mulmaru.woff2') format('woff2'); font-weight: normal; font-display: swap; }
@font-face { font-family: 'NeoDunggeunmo'; src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.3/NeoDunggeunmoPro-Regular.woff2') format('woff2'); font-weight: normal; font-display: swap; }

/* ── 테마 변수 (명도 대비 극대화) ── */
.theme-light { --k-bg: #F4F0EB; --k-housing: #E6DFD3; --k-key-bg: #FFFFFF; --k-key-border: #1A1A1A; --k-key-shadow: #1A1A1A; --k-border-main: #1A1A1A; --bg-base: #F4F0EB; --bg-surface: #E6DFD3; --bg-elevated: #FFFFFF; --border: #1A1A1A; --border-mid: #1A1A1A; --text-primary: #1A1A1A; --text-secondary: #333333; --text-muted: #555555; --text-faint: #777777; --accent: #E53935; --k-acc-1-bg: #E53935; --k-acc-1-shadow: #B71C1C; --k-acc-2-bg: #1E88E5; --k-acc-2-shadow: #1565C0; --k-acc-3-bg: #43A047; --k-acc-3-shadow: #2E7D32; }
.theme-dark { --k-bg: #1A1A1A; --k-housing: #2C2C2C; --k-key-bg: #3D3D3D; --k-key-border: #000000; --k-key-shadow: #000000; --k-border-main: #000000; --bg-base: #1A1A1A; --bg-surface: #2C2C2C; --bg-elevated: #3D3D3D; --border: #000000; --border-mid: #000000; --text-primary: #F0F0F0; --text-secondary: #CCCCCC; --text-muted: #999999; --text-faint: #666666; --accent: #FF5252; --k-acc-1-bg: #FF5252; --k-acc-1-shadow: #D50000; --k-acc-2-bg: #448AFF; --k-acc-2-shadow: #2962FF; --k-acc-3-bg: #69F0AE; --k-acc-3-shadow: #00E676; }

/* ── 레이아웃 및 배경 ── */
.mypage-layout { display: flex; width: 100%; height: 100vh; overflow: hidden; background: var(--bg-base); color: var(--text-primary); font-family: 'Mulmaru', sans-serif; position: relative; }
.mypage-main { flex: 1; display: flex; flex-direction: column; overflow-y: auto; overflow-x: hidden; z-index: 10; }

.crt-scanlines { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(rgba(18,16,16,0) 50%, rgba(0,0,0,0.1) 50%); background-size: 100% 4px; z-index: 9999; pointer-events: none; opacity: 0.15; }
.theme-dark .crt-scanlines { opacity: 0.3; }
.retro-dot-bg { position: absolute; inset: 0; background-image: radial-gradient(var(--border-mid) 1px, transparent 1px); background-size: 20px 20px; opacity: 0.1; z-index: 0; pointer-events: none; }

/* ── UI 요소 ── */
.retro-panel { background: var(--bg-surface); border: 2px solid var(--border); box-shadow: 4px 4px 0 var(--border); border-radius: 6px; }
.terminal-input { width: 100%; background: var(--k-key-shadow); color: var(--k-acc-3-bg); border: 2px solid var(--border); border-radius: 4px; box-shadow: inset 0 4px 8px rgba(0,0,0,0.4); padding: 12px 16px; font-family: 'NeoDunggeunmo', monospace; font-size: 16px; outline: none; transition: border-color 0.2s;}
.terminal-input:focus { border-color: var(--accent); color: var(--text-primary); }
.terminal-input::placeholder { color: var(--text-faint); font-family: 'Mulmaru', sans-serif; font-size: 14px; }
.terminal-bg { background: var(--bg-elevated); border: 2px solid var(--border); border-radius: 4px; padding: 12px; }
.retro-badge { border: 2px solid var(--border); box-shadow: 2px 2px 0 var(--border); border-radius: 4px; padding: 4px 8px; font-family: 'NeoDunggeunmo', sans-serif; }

.mech-key { padding: 10px 20px; background: var(--bg-elevated); color: var(--text-primary); border: 2px solid var(--border); border-radius: 4px; box-shadow: 4px 4px 0 var(--border); cursor: pointer; transition: all 0.1s; display: inline-flex; align-items: center; justify-content: center; gap: 8px; }
.mech-key:active { transform: translate(4px, 4px); box-shadow: 0 0 0 transparent; }
.mech-key-small { padding: 6px 12px; background: var(--bg-elevated); color: var(--text-primary); border: 2px solid var(--border); border-radius: 4px; box-shadow: 2px 2px 0 var(--border); cursor: pointer; font-family: 'NeoDunggeunmo', sans-serif; font-size: 12px; transition: 0.1s; }
.mech-key-small:active { transform: translate(2px, 2px); box-shadow: 0 0 0 transparent; }

.key-legend { font-size: 14px; font-weight: 800; font-family: 'NeoDunggeunmo', sans-serif; display: flex; align-items: center; gap: 8px; }
.key-accent-1 { background: var(--k-acc-1-bg); color: #fff; border-color: var(--border); }
.key-accent-2 { background: var(--k-acc-2-bg); color: #fff; border-color: var(--border); }
.key-accent-3 { background: var(--k-acc-3-bg); color: #fff; border-color: var(--border); }

/* 직관적인 레트로 텍스트 호버 (글리치 대체) */
.retro-text-hover { transition: transform 0.1s, text-shadow 0.1s; display: inline-block; }
.retro-text-hover:hover { transform: translate(-2px, -2px); text-shadow: 3px 3px 0px var(--accent); color: var(--text-primary); cursor: pointer; }

/* ── 헤더 ── */
.mypage-header { display: flex; align-items: center; gap: 20px; padding: 32px 40px 0; flex-shrink: 0; }
.btn-back { padding: 0; width: 44px; height: 44px; border-radius: 6px; }
.page-title { font-size: 32px; font-weight: 900; font-family: 'NeoDunggeunmo', sans-serif; color: var(--text-primary); margin-bottom: 4px; }
.page-sub { font-size: 14px; font-weight: 600; color: var(--text-muted); }

/* ── 본문 ── */
.mypage-content { padding: 32px 40px 40px; display: flex; flex-direction: column; gap: 24px; max-width: 900px; margin: 0 auto; width: 100%; }

.card-header { display: flex; align-items: center; gap: 16px; padding: 20px 24px; border-bottom: 2px dashed var(--border); background: var(--bg-elevated); }
.card-icon { width: 44px; height: 44px; border-radius: 6px; border: 2px solid var(--border); display: flex; align-items: center; justify-content: center; font-size: 20px; box-shadow: inset 0 2px 4px rgba(255,255,255,0.2); }
.card-title { font-size: 18px; font-weight: 900; font-family: 'NeoDunggeunmo', sans-serif; color: var(--text-primary); margin-bottom: 4px; }
.card-sub { font-size: 13px; color: var(--text-faint); }
.card-body { padding: 24px; }

/* A. 닉네임 */
.field-group { display: flex; flex-direction: column; gap: 10px; }
.field-label { font-size: 14px; font-weight: 800; font-family: 'NeoDunggeunmo', sans-serif; color: var(--text-primary); }
.input-row { display: flex; gap: 12px; align-items: center; }
.field-hint { font-size: 12px; color: var(--text-faint); font-family: 'NeoDunggeunmo', sans-serif; }
.btn-save { height: 50px; }

/* B. GitHub */
.github-status-row { display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap; }
.github-info { display: flex; align-items: center; gap: 12px; }
.status-badge { display: flex; align-items: center; gap: 8px; font-size: 14px; font-weight: 800; }
.badge--connected { background: var(--k-acc-3-bg); color: #fff; }
.badge--disconnected { background: var(--bg-elevated); color: var(--text-muted); }
.status-dot { width: 8px; height: 8px; border-radius: 50%; background: currentColor; border: 1px solid var(--border); animation: pulse 2s infinite; }
@keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.4; } }
.github-username { font-size: 16px; font-weight: 800; font-family: 'NeoDunggeunmo', sans-serif; color: var(--text-primary); }
.btn-github { height: 44px; }

.github-stats { display: flex; gap: 0; margin-top: 20px; }
.github-stat { flex: 1; display: flex; flex-direction: column; align-items: center; padding: 16px; border-right: 2px dashed var(--border); }
.github-stat:last-child { border-right: none; }
.stat-num { font-size: 28px; font-weight: 900; font-family: 'NeoDunggeunmo', sans-serif; color: var(--text-primary); }
.stat-label { font-size: 12px; font-weight: 800; font-family: 'NeoDunggeunmo', sans-serif; color: var(--text-muted); margin-top: 4px; }

/* C. 스택 */
.stack-input-row { display: flex; gap: 12px; align-items: center; }
.stack-input-wrap { flex: 1; position: relative; }
.stack-search-icon { position: absolute; left: 16px; top: 50%; transform: translateY(-50%); color: var(--text-faint); font-size: 14px; }
.stack-input { padding-left: 40px !important; }

.stack-suggestions { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; margin-top: 12px; }
.suggest-label { font-size: 12px; font-weight: 800; font-family: 'NeoDunggeunmo', sans-serif; color: var(--text-muted); }

.stack-pills { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 20px; }
.stack-pill { display: flex; align-items: center; gap: 8px; font-size: 14px; font-weight: 800; }
.pill-remove { background: none; border: none; cursor: pointer; color: currentColor; opacity: 0.5; padding: 0; font-size: 12px; transition: 0.1s; }
.pill-remove:hover { opacity: 1; transform: scale(1.2); }
.stack-empty { font-size: 14px; font-family: 'NeoDunggeunmo', sans-serif; color: var(--k-acc-1-bg); margin-top: 16px; }

/* D. 페르소나 */
.md-badge { margin-left: auto; display: flex; align-items: center; gap: 6px; background: var(--bg-elevated); color: var(--text-primary); font-size: 12px; }
.persona-toolbar { display: flex; align-items: center; gap: 6px; padding: 8px 16px; border-bottom: 2px solid var(--border); }
.toolbar-btn { width: 32px; height: 32px; border-radius: 4px; background: var(--bg-base); border: 2px solid var(--border); color: var(--text-primary); cursor: pointer; font-size: 14px; display: flex; align-items: center; justify-content: center; box-shadow: 2px 2px 0 var(--border); transition: 0.1s; }
.toolbar-btn:active { transform: translate(2px,2px); box-shadow: 0 0 0 transparent; }
.toolbar-sep { width: 2px; height: 20px; background: var(--border-mid); margin: 0 8px; }
.char-count { font-size: 12px; font-weight: 800; font-family: 'NeoDunggeunmo', sans-serif; color: var(--text-muted); margin-left: auto; }
.persona-actions { display: flex; justify-content: flex-end; gap: 12px; margin-top: 16px; }

.persona-preview { margin-top: 20px; line-height: 1.8; font-size: 14px; color: var(--text-primary); font-family: 'Mulmaru', sans-serif; }
.persona-preview :deep(h1) { font-size: 20px; font-weight: 900; margin: 12px 0 6px; }
.persona-preview :deep(h2) { font-size: 18px; font-weight: 800; margin: 10px 0 4px; }
.persona-preview :deep(strong) { font-weight: 900; color: var(--accent); }
.persona-preview :deep(code) { background: var(--bg-base); padding: 2px 6px; border: 1px solid var(--border); border-radius: 4px; font-family: monospace; }
.persona-preview :deep(li) { margin-left: 20px; list-style: square; }

.custom-scroll::-webkit-scrollbar { width: 8px; }
.custom-scroll::-webkit-scrollbar-track { background: var(--bg-base); border-left: 2px solid var(--border); }
.custom-scroll::-webkit-scrollbar-thumb { background: var(--border-mid); border: 2px solid var(--border); }
>>>>>>> d9d81185ededc2b2de1631f9ff7968776e03e2e7
</style>