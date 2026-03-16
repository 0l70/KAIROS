<template>
<<<<<<< HEAD
  <aside class="app-sidebar">
    <div class="sidebar-header" @click="$router.push('/calendar')">
      <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
        <path d="M6 3h16v5l-6 6 6 6v5H6v-5l6-6-6-6V3z" stroke="currentColor" stroke-width="2" fill="none" stroke-linejoin="round"/>
        <rect x="12" y="12" width="4" height="4" fill="currentColor"/>
      </svg>
      <span class="logo-text">KAIROS</span>
    </div>

    <nav class="sidebar-nav">
      <div class="nav-group">
        <button 
          class="nav-item nav-toggle" 
          :class="{ 'active': $route.path.startsWith('/calendar') || $route.path.startsWith('/study-calendar') || $route.path.startsWith('/prompt') }"
          @click="toggleCalendarMenu"
        >
          <div class="nav-toggle-left">
            <i class="fas fa-calendar-alt" /> CALENDAR
          </div>
          <i class="fas" :class="isCalendarMenuOpen ? 'fa-chevron-up' : 'fa-chevron-down'" />
        </button>
        
        <div v-show="isCalendarMenuOpen" class="nav-sub-menu">
          <router-link to="/calendar" class="nav-sub-item" active-class="active">
            <div class="bullet"></div> CALENDAR
          </router-link>
          <router-link to="/study-calendar" class="nav-sub-item" active-class="active">
            <div class="bullet"></div> STUDY CALENDAR
          </router-link>
          <router-link to="/prompt" class="nav-sub-item" active-class="active">
            <div class="bullet"></div> PROMPT
          </router-link>
        </div>
      </div>
      <router-link to="/recommend" class="nav-item" active-class="active">
        <i class="fas fa-compass" /> RECOMMEND
      </router-link>
      <router-link to="/history" class="nav-item" active-class="active">
        <i class="fas fa-history" /> HISTORY
      </router-link>
      <router-link to="/mypage" class="nav-item" active-class="active">
        <i class="fas fa-user-circle" /> MY PAGE
      </router-link>
    </nav>

    <div class="sync-section">
      <div class="sync-title">MANUAL SYNC</div>
      
      <button class="btn-sync" :disabled="isGithubSyncing" @click="handleSync('github')">
        <i v-if="!isGithubSyncing" class="fab fa-github" />
        <i v-else class="fas fa-spinner fa-spin" />
        GITHUB SYNC
      </button>
      
      <button class="btn-sync" :disabled="isVelogSyncing" @click="handleSync('velog')">
        <i v-if="!isVelogSyncing" class="fas fa-v" />
        <i v-else class="fas fa-spinner fa-spin" />
        VELOG SYNC
      </button>
=======
  <aside class="sidebar">
    <RouterLink to="/" class="sidebar-brand">
      <div class="brand-logo">
        <div class="pixel-hourglass-logo"></div>
      </div>
      <div class="brand-text retro-text-hover">
        <span class="brand-name">KAIROS</span>
        <span class="brand-sub">SYS. OS v2.0</span>
      </div>
    </RouterLink>

    <nav class="sidebar-nav custom-scroll">
      <div class="nav-section-label">MAIN_MENU</div>

      <template v-for="item in NAV_ITEMS" :key="item.to ?? item.id">
        <div v-if="item.sub" ref="calWrapRef" class="nav-item-wrap">
          <button
            class="nav-item nav-item--has-sub"
            :class="{ 'nav-item--active': isCalActive, 'nav-item--open': calOpen }"
            @click.stop="toggleCal"
          >
            <i :class="item.icon" />
            <span>{{ item.label }}</span>
            <i class="fas fa-chevron-right nav-sub-arrow" :class="{ 'nav-sub-arrow--open': calOpen }" />
          </button>

          <Transition name="sub-expand">
            <div v-if="calOpen" class="sub-menu retro-panel">
              <RouterLink
                v-for="s in item.sub" :key="s.to" :to="s.to"
                class="sub-item" :class="{ 'sub-item--active': route.path === s.to }"
                @click="calOpen = false"
              >
                <div class="sub-item-left">
                  <div class="sub-dot" :class="{ 'sub-dot--active': route.path === s.to }" />
                  <div class="sub-info"><span class="sub-label">{{ s.label }}</span></div>
                </div>
                <i v-if="route.path === s.to" class="fas fa-check sub-check" />
              </RouterLink>
            </div>
          </Transition>
        </div>

        <RouterLink v-else :to="item.to" class="nav-item" active-class="nav-item--active">
          <i :class="item.icon" /><span>{{ item.label }}</span>
        </RouterLink>
      </template>
    </nav>

    <div class="sidebar-footer">
      <div class="theme-toggle retro-btn" @click="themeStore.toggle()">
        <div class="theme-track" :class="{ 'theme-track--light': !themeStore.isDark }">
          <div class="theme-thumb"><i :class="themeStore.isDark ? 'fas fa-moon' : 'fas fa-sun'" /></div>
        </div>
        <span class="theme-label">{{ themeStore.isDark ? 'DARK_MODE' : 'LIGHT_MODE' }}</span>
      </div>

      <RouterLink to="/mypage" class="user-info user-info--link retro-btn">
        <div class="user-avatar"><i class="fab fa-github" /></div>
        <div class="user-detail">
          <div class="user-name">USER_SSAFY</div>
          <div class="user-sub text-accent-2">CONNECTED</div>
        </div>
        <i class="fas fa-caret-right user-arrow" />
      </RouterLink>
>>>>>>> d9d81185ededc2b2de1631f9ff7968776e03e2e7
    </div>

    <Transition name="toast">
      <div v-if="showToast" class="sync-toast">
        <i class="fas fa-check-circle" /> {{ toastMsg }}
      </div>
    </Transition>
  </aside>
</template>

<script setup>
import { ref } from 'vue'

const isGithubSyncing = ref(false)
const isVelogSyncing = ref(false)
const showToast = ref(false)
const toastMsg = ref('')

<<<<<<< HEAD
// 캘린더 드랍다운 토글 상태
const isCalendarMenuOpen = ref(false)
const toggleCalendarMenu = () => {
  isCalendarMenuOpen.value = !isCalendarMenuOpen.value
=======
function toggleCal() { calOpen.value = !calOpen.value }
function onDocClick(e) {
  const el = Array.isArray(calWrapRef.value) ? calWrapRef.value[0] : calWrapRef.value
  if (el && !el.contains(e.target)) calOpen.value = false
>>>>>>> d9d81185ededc2b2de1631f9ff7968776e03e2e7
}

const handleSync = (type) => {
  if (type === 'github') isGithubSyncing.value = true
  else isVelogSyncing.value = true

<<<<<<< HEAD
  // 1.5초 후 동기화 완료 시뮬레이션
  setTimeout(() => {
    if (type === 'github') isGithubSyncing.value = false
    else isVelogSyncing.value = false
    
    toastMsg.value = `${type === 'github' ? 'GitHub' : 'Velog'} 데이터가 동기화되었습니다.`
    showToast.value = true
    setTimeout(() => showToast.value = false, 3000)
  }, 1500)
}
</script>

<style scoped>
.app-sidebar { 
  width: 260px; height: 100vh; 
  background: var(--bg-base); 
  border-right: 1px solid var(--border); 
  display: flex; flex-direction: column; flex-shrink: 0; 
  font-family: 'Escoredream', sans-serif; 
  position: relative; z-index: 100; 
}
.sidebar-header { 
  height: 80px; padding: 0 24px; 
  display: flex; align-items: center; gap: 12px; 
  color: var(--text-primary); 
  border-bottom: 1px solid var(--border); 
  cursor: pointer; transition: background 0.3s; 
}
.sidebar-header:hover { background: var(--bg-hover); }
.logo-text { font-size: 20px; font-weight: 900; letter-spacing: 0.15em; }

.sidebar-nav { 
  flex: 1; padding: 32px 16px; 
  display: flex; flex-direction: column; gap: 4px; 
  overflow-y: auto; -ms-overflow-style: none; scrollbar-width: none; 
}
.sidebar-nav::-webkit-scrollbar { display: none; }

.nav-item { 
  display: flex; align-items: center; gap: 16px; 
  padding: 16px; 
  font-size: 13px; font-weight: 700; color: var(--text-muted); 
  text-decoration: none; border: 1px solid transparent; 
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1); 
  letter-spacing: 0.1em; cursor: pointer; background: transparent; 
  width: 100%; text-align: left; font-family: inherit; border-radius: 8px;
}
.nav-item:hover { color: var(--text-primary); background: var(--bg-hover); }
.nav-item.active { background: var(--text-primary); color: var(--bg-base); border-color: var(--border); }
.nav-item i { font-size: 16px; width: 20px; text-align: center; }

.nav-toggle { justify-content: space-between; }
.nav-toggle-left { display: flex; align-items: center; gap: 16px; }

.nav-sub-menu { 
  display: flex; flex-direction: column; gap: 4px; 
  padding-left: 16px; margin: 4px 0 12px 24px; 
  border-left: 1px dashed var(--border-mid); 
  animation: slideDown 0.2s ease-out; 
}
@keyframes slideDown { from { opacity: 0; transform: translateY(-5px); } to { opacity: 1; transform: translateY(0); } }

.nav-sub-item { 
  display: flex; align-items: center; gap: 12px; 
  padding: 12px; font-size: 12px; font-weight: 700; 
  color: var(--text-faint); text-decoration: none; 
  transition: all 0.2s; letter-spacing: 0.05em; border-radius: 6px;
}
.nav-sub-item .bullet { width: 4px; height: 4px; border-radius: 50%; background: var(--border-mid); transition: all 0.2s; }
.nav-sub-item:hover { color: var(--text-primary); background: var(--bg-hover); }
.nav-sub-item:hover .bullet { background: var(--text-primary); }
.nav-sub-item.active { color: var(--text-primary); background: var(--bg-hover); }
.nav-sub-item.active .bullet { background: var(--text-primary); box-shadow: 0 0 4px var(--text-primary); }

/* 수동 동기화 섹션 */
.sync-section { 
  padding: 24px 16px; 
  border-top: 1px solid var(--border); 
  background: var(--bg-base); 
  display: flex; flex-direction: column; gap: 12px; 
}
.sync-title { font-size: 10px; font-weight: 900; color: var(--text-faint); letter-spacing: 0.15em; margin-bottom: 4px; padding-left: 4px; }
.btn-sync { 
  display: flex; align-items: center; gap: 12px; 
  padding: 14px; background: transparent; 
  border: 1px solid var(--border); border-radius: 40px;
  color: var(--text-muted); font-size: 12px; font-weight: 700; 
  cursor: pointer; transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1); 
  font-family: inherit; letter-spacing: 0.1em; 
}
.btn-sync:hover:not(:disabled) { border-color: var(--text-primary); color: var(--text-primary); background: var(--bg-hover); }
.btn-sync:disabled { opacity: 0.5; cursor: not-allowed; }

/* 토스트 메시지 */
.sync-toast { 
  position: fixed; bottom: 24px; left: 284px; 
  background: var(--text-primary); color: var(--bg-base); 
  padding: 16px 24px; font-size: 13px; font-weight: 700; 
  border: 1px solid var(--border); display: flex; align-items: center; gap: 12px; 
  z-index: 1000; border-radius: 40px;
}
.toast-enter-active, .toast-leave-active { transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
.toast-enter-from, .toast-leave-to { opacity: 0; transform: translateY(20px) scale(0.95); }
=======
const isCalActive = computed(() => route.path === '/calendar' || route.path === '/study-calendar')

const NAV_ITEMS = [
  {
    id: 'cal', to: '/calendar', icon: 'fas fa-calendar-alt', label: 'CALENDAR',
    sub: [
      { to: '/calendar',       label: 'FLOW CALENDAR' },
      { to: '/study-calendar', label: 'STUDY CALENDAR'},
      { to: '/prompt',         label: 'AI ASSISTANT'  },
    ],
  },
  { to: '/recommend', icon: 'fas fa-lightbulb', label: 'RECOMMEND' },
  { to: '/history',   icon: 'fas fa-history',   label: 'HISTORY'   },
]
</script>

<style scoped>
@font-face { font-family: 'Mulmaru'; src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/2601-4@1.1/Mulmaru.woff2') format('woff2'); font-weight: normal; font-display: swap; }
@font-face { font-family: 'NeoDunggeunmo'; src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.3/NeoDunggeunmoPro-Regular.woff2') format('woff2'); font-weight: normal; font-display: swap; }

.sidebar { width: 220px; background: var(--bg-surface); border-right: 2px solid var(--border); display: flex; flex-direction: column; flex-shrink: 0; z-index: 40; transition: background 0.3s, border-color 0.3s; font-family: 'NeoDunggeunmo', sans-serif; }
.sidebar-brand { height: 80px; display: flex; align-items: center; justify-content: center; padding: 0 16px; gap: 12px; border-bottom: 2px solid var(--border); text-decoration: none; cursor: pointer; transition: background 0.15s; flex-shrink: 0; background: var(--bg-elevated); }
.sidebar-brand:hover { background: var(--bg-hover); }

/* 💡 직관적인 레트로 텍스트 호버 (글리치 삭제) */
.retro-text-hover { transition: all 0.1s ease; display: inline-block; }
.retro-text-hover:hover { color: var(--accent); text-shadow: 2px 2px 0px var(--border); transform: translate(-2px, -2px); }

.pixel-hourglass-logo { width: 3px; height: 3px; background: transparent; box-shadow: 0 0 0 var(--accent), 3px 0 0 var(--accent), 6px 0 0 var(--accent), 9px 0 0 var(--accent), 12px 0 0 var(--accent), 0 3px 0 var(--accent), 3px 3px 0 var(--text-primary), 6px 3px 0 var(--text-primary), 9px 3px 0 var(--text-primary), 12px 3px 0 var(--accent), 3px 6px 0 var(--accent), 6px 6px 0 var(--text-primary), 9px 6px 0 var(--accent), 6px 9px 0 var(--accent), 3px 12px 0 var(--accent), 6px 12px 0 var(--bg-base), 9px 12px 0 var(--accent), 0 15px 0 var(--accent), 3px 15px 0 var(--bg-base), 6px 15px 0 var(--text-primary), 9px 15px 0 var(--bg-base), 12px 15px 0 var(--accent), 0 18px 0 var(--accent), 3px 18px 0 var(--accent), 6px 18px 0 var(--accent), 9px 18px 0 var(--accent), 12px 18px 0 var(--accent); animation: flipHourglass 4s infinite cubic-bezier(0.68, -0.55, 0.27, 1.55); margin-right: 12px; margin-bottom: 12px;}
@keyframes flipHourglass { 0%, 40% { transform: rotate(0deg); } 50%, 90% { transform: rotate(180deg); } 100% { transform: rotate(360deg); } }

.brand-text { display: flex; flex-direction: column; gap: 4px; }
.brand-name { font-weight: 900; font-size: 22px; letter-spacing: 0.1em; color: var(--text-primary); line-height: 1; }
.brand-sub { font-size: 10px; color: var(--text-faint); letter-spacing: 0.05em; }

.sidebar-nav { padding: 24px 16px; display: flex; flex-direction: column; gap: 8px; flex: 1; overflow-y: auto; overflow-x: hidden; }
.nav-section-label { font-size: 11px; font-weight: 800; color: var(--text-muted); letter-spacing: 0.1em; margin-bottom: 8px; border-bottom: 2px dashed var(--border-mid); padding-bottom: 6px; }

.nav-item { display: flex; align-items: center; gap: 12px; padding: 12px; border-radius: 6px; border: 2px solid transparent; font-size: 14px; font-weight: 800; text-decoration: none; color: var(--text-secondary); transition: all 0.1s; width: 100%; background: transparent; cursor: pointer; text-align: left; }
.nav-item i { width: 18px; text-align: center; font-size: 16px; flex-shrink: 0; }
.nav-item:hover { background: var(--bg-hover); border-color: var(--border); box-shadow: 2px 2px 0 var(--border); color: var(--text-primary); transform: translate(-2px, -2px); }
.nav-item:active { transform: translate(0, 0); box-shadow: 0 0 0 transparent; }
.nav-item--active { background: var(--bg-elevated); border-color: var(--border); box-shadow: 4px 4px 0 var(--border); color: var(--accent); }
.nav-item--open { background: var(--bg-hover); color: var(--text-primary); border-color: var(--border); }
.nav-item-wrap { display: flex; flex-direction: column; }
.nav-item--has-sub { width: 100%; }
.nav-sub-arrow { margin-left: auto; font-size: 12px; color: var(--text-faint); transition: transform 0.2s; }
.nav-sub-arrow--open { transform: rotate(90deg); color: var(--accent); }

.sub-menu { margin: 8px 0 8px 16px; padding: 8px; display: flex; flex-direction: column; gap: 4px; }
.retro-panel { background: var(--bg-elevated); border: 2px solid var(--border); border-radius: 6px; box-shadow: inset 0 2px 4px rgba(0,0,0,0.1); }
.sub-item { display: flex; align-items: center; justify-content: space-between; padding: 8px 10px; border-radius: 4px; text-decoration: none; transition: 0.1s; border: 2px solid transparent; }
.sub-item:hover { background: var(--bg-hover); border-color: var(--border); box-shadow: 2px 2px 0 var(--border); transform: translate(-2px,-2px); }
.sub-item:active { transform: translate(0,0); box-shadow: 0 0 0 transparent; }
.sub-item--active { background: var(--bg-base); border-color: var(--accent); color: var(--accent); box-shadow: 2px 2px 0 var(--accent); transform: translate(-2px,-2px); }
.sub-item-left { display: flex; align-items: center; gap: 8px; }
.sub-dot { width: 8px; height: 8px; border-radius: 50%; border: 2px solid var(--border-mid); flex-shrink: 0; }
.sub-dot--active { background: var(--accent); border-color: var(--accent); }
.sub-info { display: flex; flex-direction: column; }
.sub-label { font-size: 12px; font-weight: 800; color: var(--text-secondary); }
.sub-item--active .sub-label { color: var(--accent); }
.sub-check { font-size: 12px; color: var(--accent); }

.sub-expand-enter-active, .sub-expand-leave-active { transition: all 0.2s; }
.sub-expand-enter-from, .sub-expand-leave-to { opacity: 0; transform: translateY(-10px); }

.sidebar-footer { border-top: 2px solid var(--border); padding: 16px; display: flex; flex-direction: column; gap: 12px; background: var(--bg-elevated); }
.retro-btn { display: flex; align-items: center; gap: 10px; padding: 10px; border-radius: 6px; border: 2px solid var(--border); background: var(--bg-base); cursor: pointer; transition: 0.1s; text-decoration: none; box-shadow: 4px 4px 0 var(--border); }
.retro-btn:hover { background: var(--bg-hover); transform: translate(-2px, -2px); box-shadow: 6px 6px 0 var(--border); }
.retro-btn:active { transform: translate(2px, 2px); box-shadow: 0 0 0 transparent; }
.theme-track { width: 36px; height: 20px; background: var(--k-key-shadow); border: 2px solid var(--border); border-radius: 10px; position: relative; transition: 0.3s; flex-shrink: 0; box-shadow: inset 0 2px 4px rgba(0,0,0,0.3); }
.theme-track--light { background: #1E88E5; }
.theme-thumb { position: absolute; top: 1px; left: 1px; width: 14px; height: 14px; border-radius: 50%; background: var(--text-primary); display: flex; align-items: center; justify-content: center; font-size: 8px; color: var(--bg-base); transition: transform 0.3s; }
.theme-track--light .theme-thumb { transform: translateX(16px); background: #FFF; color: #f59e0b; }
.theme-label { font-size: 13px; font-weight: 800; color: var(--text-primary); }
.user-avatar { width: 32px; height: 32px; border-radius: 4px; background: var(--k-key-shadow); border: 2px solid var(--border); display: flex; align-items: center; justify-content: center; color: var(--text-primary); font-size: 16px; flex-shrink: 0; }
.user-detail { flex: 1; }
.user-name { font-size: 14px; font-weight: 900; color: var(--text-primary); }
.user-sub  { font-size: 10px; font-weight: 700; margin-top: 2px; }
.user-arrow { font-size: 14px; color: var(--text-primary); }
.text-accent-2 { color: #1E88E5; }
.theme-dark .text-accent-2 { color: #448AFF; }
.custom-scroll::-webkit-scrollbar { width: 6px; }
.custom-scroll::-webkit-scrollbar-track { background: transparent; }
.custom-scroll::-webkit-scrollbar-thumb { background: var(--border-mid); border-radius: 0; }
>>>>>>> d9d81185ededc2b2de1631f9ff7968776e03e2e7
</style>