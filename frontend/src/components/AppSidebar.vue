<template>
  <aside class="sidebar">
    <RouterLink to="/" class="sidebar-brand">
      <div class="brand-logo">
        <svg width="32" height="32" viewBox="0 0 28 28" fill="none">
          <path d="M6 3h16v5l-6 6 6 6v5H6v-5l6-6-6-6V3z" fill="currentColor" opacity="0.15"/>
          <path d="M6 3h16v5l-6 6 6 6v5H6v-5l6-6-6-6V3z" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linejoin="round"/>
          <circle cx="14" cy="14" r="2" fill="currentColor"/>
          <path d="M8 5h12l-4 4H12L8 5z" fill="currentColor" opacity="0.5"/>
        </svg>
      </div>
      <div class="brand-text">
        <span class="brand-name">KAIROS</span>
        <span class="brand-sub">SEIZE THE TIME</span>
      </div>
    </RouterLink>

    <nav class="sidebar-nav">
      <div class="nav-section-label">MAIN MENU</div>

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
            <div v-if="calOpen" class="sub-menu">
              <RouterLink
                v-for="s in item.sub" :key="s.to"
                :to="s.to"
                class="sub-item"
                :class="{ 'sub-item--active': route.path === s.to }"
                @click="calOpen = false"
              >
                <div class="sub-item-left">
                  <div class="sub-dot" :class="{ 'sub-dot--active': route.path === s.to }" />
                  <div class="sub-info">
                    <span class="sub-label">{{ s.label }}</span>
                    <span class="sub-desc">{{ s.desc }}</span>
                  </div>
                </div>
                <i v-if="route.path === s.to" class="fas fa-arrow-right sub-check" />
              </RouterLink>
            </div>
          </Transition>
        </div>

        <RouterLink
          v-else
          :to="item.to"
          class="nav-item"
          active-class="nav-item--active"
        >
          <i :class="item.icon" />
          <span>{{ item.label }}</span>
        </RouterLink>

      </template>
    </nav>

    <div class="sidebar-footer">
      <div class="theme-toggle" @click="themeStore.toggle()">
        <div class="theme-track" :class="{ 'theme-track--light': !themeStore.isDark }">
          <div class="theme-thumb">
            <i :class="themeStore.isDark ? 'fas fa-moon' : 'fas fa-sun'" />
          </div>
        </div>
        <span class="theme-label">{{ themeStore.isDark ? 'DARK MODE' : 'LIGHT MODE' }}</span>
      </div>

      <RouterLink to="/mypage" class="user-info user-info--link">
        <div class="user-avatar"><i class="fab fa-github" /></div>
        <div class="user-detail">
          <div class="user-name">GUEST USER</div>
          <div class="user-sub">GITHUB SYNCED</div>
        </div>
        <i class="fas fa-chevron-right user-arrow" />
      </RouterLink>
    </div>
  </aside>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { useThemeStore } from '@/stores/useThemeStore'

const themeStore = useThemeStore()
const route      = useRoute()
const calOpen    = ref(false)
const calWrapRef = ref(null)

function toggleCal() { calOpen.value = !calOpen.value }

function onDocClick(e) {
  const el = Array.isArray(calWrapRef.value) ? calWrapRef.value[0] : calWrapRef.value
  if (el && !el.contains(e.target)) calOpen.value = false
}

onMounted(()  => document.addEventListener('click', onDocClick))
onUnmounted(() => document.removeEventListener('click', onDocClick))

const isCalActive = computed(() =>
  route.path === '/calendar' || route.path === '/study-calendar'
)

const NAV_ITEMS = [
  {
    id: 'cal',
    to: '/calendar',
    icon: 'fas fa-calendar-alt',
    label: 'CALENDAR',
    sub: [
      { to: '/calendar',       label: 'FLOW',      desc: 'Branch based tracking' },
      { to: '/study-calendar', label: 'DAILY',     desc: 'Daily study log'       },
      { to: '/prompt',         label: 'ASSISTANT', desc: 'AI blog assistant'     },
    ],
  },
  { to: '/recommend', icon: 'fas fa-lightbulb',       label: 'RECOMMEND' },
  { to: '/history',   icon: 'fas fa-history',         label: 'HISTORY'   },
]
</script>

<style scoped>
.sidebar {
  width: 220px; background: var(--bg-surface); border-right: 1px solid var(--border);
  display: flex; flex-direction: column; flex-shrink: 0; z-index: 40;
  transition: background 0.3s, border-color 0.3s;
  font-family: 'Space Grotesk', 'Escoredream', system-ui, sans-serif;
}

.sidebar-brand {
  height: 64px; display: flex; align-items: center; justify-content: center;
  padding: 0 16px; gap: 10px; border-bottom: 1px solid var(--border);
  text-decoration: none; cursor: pointer; transition: background 0.15s; flex-shrink: 0;
  color: var(--text-primary);
}
.sidebar-brand:hover { background: var(--text-primary); color: var(--bg-base); }
.brand-logo { flex-shrink: 0; }
.brand-text { display: flex; flex-direction: column; gap: 2px; }
.brand-name {
  font-weight: 900; font-size: 18px; letter-spacing: 0.15em; line-height: 1;
}
.brand-sub { font-size: 9px; letter-spacing: 0.1em; font-weight: 600; }

.sidebar-nav {
  padding: 24px 12px; display: flex; flex-direction: column; gap: 4px;
  flex: 1; overflow-y: auto; overflow-x: hidden;
}
.nav-section-label {
  font-size: 10px; font-weight: 800; color: var(--text-muted);
  letter-spacing: 0.1em; padding: 0 10px; margin-bottom: 12px;
}

.nav-item {
  display: flex; align-items: center; gap: 12px; padding: 12px 14px; border-radius: 0; /* 직각 */
  font-size: 13px; font-weight: 700; text-decoration: none; color: var(--text-muted);
  transition: all 0.1s; width: 100%; background: transparent; border: 1px solid transparent; cursor: pointer;
  text-align: left; letter-spacing: 0.05em;
}
.nav-item i { width: 16px; text-align: center; font-size: 14px; flex-shrink: 0; }
.nav-item:hover { border-color: var(--border); color: var(--text-primary); }

/* 활성화 상태를 색상 반전으로 표현 */
.nav-item--active { background: var(--text-primary) !important; color: var(--bg-base) !important; border-color: var(--text-primary); }
.nav-item--open { border-color: var(--text-primary); color: var(--text-primary); }

.nav-item-wrap { display: flex; flex-direction: column; }
.nav-item--has-sub { width: 100%; }
.nav-sub-arrow {
  margin-left: auto; font-size: 10px; color: inherit;
  transition: transform 0.2s;
}
.nav-sub-arrow--open { transform: rotate(90deg); }

.sub-menu {
  margin: 4px 0 8px 16px;
  background: transparent;
  border-left: 1px solid var(--border);
  padding: 4px 0 4px 12px;
  display: flex; flex-direction: column; gap: 4px;
  overflow: hidden;
}
.sub-item {
  display: flex; align-items: center; justify-content: space-between;
  padding: 10px 12px; border-radius: 0; border: 1px solid transparent;
  text-decoration: none; transition: all 0.1s;
}
.sub-item:hover { border-color: var(--border); }

/* 서브 메뉴 활성화 상태 반전 */
.sub-item--active { background: var(--text-primary); color: var(--bg-base); border-color: var(--text-primary); }

.sub-item-left { display: flex; align-items: center; gap: 10px; }
.sub-dot {
  width: 6px; height: 6px; border-radius: 0; /* 직각 */
  background: var(--border); flex-shrink: 0; transition: background 0.1s;
}
.sub-dot--active { background: var(--bg-base); }
.sub-item:hover .sub-dot:not(.sub-dot--active) { background: var(--text-primary); }

.sub-info { display: flex; flex-direction: column; gap: 2px; }
.sub-label { font-size: 12px; font-weight: 700; color: var(--text-muted); letter-spacing: 0.05em; }
.sub-item:hover .sub-label { color: var(--text-primary); }
.sub-item--active .sub-label { color: var(--bg-base); }
.sub-desc  { font-size: 9px; color: var(--text-faint); font-weight: 600; text-transform: uppercase; }
.sub-item--active .sub-desc { color: var(--bg-base); opacity: 0.7; }
.sub-check { font-size: 11px; color: var(--bg-base); }

.sub-expand-enter-active { transition: all 0.2s; }
.sub-expand-leave-active { transition: all 0.15s; }
.sub-expand-enter-from, .sub-expand-leave-to { opacity: 0; transform: translateY(-4px); max-height: 0; }

.sidebar-footer { border-top: 1px solid var(--border); padding: 16px 14px; display: flex; flex-direction: column; gap: 16px; }

/* 직각 테마 토글 스위치 */
.theme-toggle { display: flex; align-items: center; gap: 12px; cursor: pointer; padding: 8px 6px; border-radius: 0; border: 1px solid transparent; transition: all 0.1s; }
.theme-toggle:hover { border-color: var(--border); }
.theme-track { width: 44px; height: 24px; background: transparent; border: 1px solid var(--text-primary); border-radius: 0; position: relative; transition: background 0.3s; flex-shrink: 0; }
.theme-track--light { background: transparent; }
.theme-thumb { position: absolute; top: 2px; left: 2px; width: 18px; height: 18px; border-radius: 0; background: var(--text-primary); display: flex; align-items: center; justify-content: center; font-size: 10px; color: var(--bg-base); transition: transform 0.3s; }
.theme-track--light .theme-thumb { transform: translateX(20px); }
.theme-label { font-size: 11px; font-weight: 700; color: var(--text-primary); letter-spacing: 0.05em; }

.user-info--link { display: flex; align-items: center; gap: 10px; text-decoration: none; padding: 8px 6px; border-radius: 0; border: 1px solid transparent; cursor: pointer; transition: all 0.1s; }
.user-info--link:hover { border-color: var(--border); }
.user-avatar { width: 32px; height: 32px; border-radius: 0; background: transparent; border: 1px solid var(--text-primary); display: flex; align-items: center; justify-content: center; color: var(--text-primary); font-size: 14px; flex-shrink: 0; }
.user-detail { flex: 1; }
.user-name { font-size: 12px; font-weight: 800; color: var(--text-primary); letter-spacing: 0.05em; }
.user-sub  { font-size: 9px; font-weight: 600; color: var(--text-muted); margin-top: 2px; letter-spacing: 0.05em; }
.user-arrow { font-size: 10px; color: var(--text-primary); transition: transform 0.15s; }
.user-info--link:hover .user-arrow { transform: translateX(2px); }
</style>