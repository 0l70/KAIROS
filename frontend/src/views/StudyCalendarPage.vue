<template>
  <div class="app-layout" :class="themeStore.isDark ? 'theme-dark' : 'theme-light'">
    <div class="crt-scanlines"></div>
    <div class="retro-dot-bg"></div>
    
    <AppSidebar />

    <main class="main-content custom-scroll">
      <div class="page-header">
        <div class="header-left">
          <h1 class="page-title retro-text-hover">STUDY_CALENDAR</h1>
          <div class="gcal-badge retro-badge">
            <i class="fas fa-check-circle" /> Google Calendar SYNCED
          </div>
        </div>
        <div class="header-actions">
          <div v-if="lastSync" class="sync-time">LAST_SYNC: {{ lastSync }}</div>
          <button class="mech-key btn-import" @click="showImportModal = true">
            <span class="key-legend"><i class="fas fa-download" /> IMPORT</span>
          </button>
          <button class="mech-key btn-sync key-accent-3" @click="handleSync">
            <span class="key-legend">
              <i :class="syncing ? 'fas fa-spinner fa-spin' : 'fas fa-sync-alt'" /> SYNC
            </span>
          </button>

          <RouterLink to="/calendar" class="mech-key btn-flow-cal key-accent-1" style="text-decoration: none;">
            <span class="key-legend"><i class="fas fa-code-branch" /> FLOW CALENDAR</span>
          </RouterLink>
        </div>
      </div>

      <div class="body-grid">
        <div class="cal-panel">
          <div class="cal-top retro-panel">
            <button class="mech-key nav-btn" @click="prevMonth"><i class="fas fa-chevron-left" /></button>
            <span class="cal-month-label retro-text-hover">{{ monthLabel }}</span>
            <button class="mech-key nav-btn" @click="nextMonth"><i class="fas fa-chevron-right" /></button>
          </div>

          <div class="dow-row">
            <span v-for="d in ['SUN','MON','TUE','WED','THU','FRI','SAT']" :key="d" class="dow">{{ d }}</span>
          </div>

          <div class="date-grid retro-panel-wrapper terminal-bg">
            <div
              v-for="cell in calendarCells" :key="cell.key"
              class="date-cell"
              :class="{
                'date-cell--other':    !cell.current,
                'date-cell--today':     cell.isToday,
                'date-cell--selected':  cell.dateStr === selectedDay,
                'date-cell--has-event': cell.events.length > 0,
              }"
              @click="selectDay(cell.dateStr)"
            >
              <span class="date-num">{{ cell.day }}</span>
              <div class="dots-row">
                <span v-for="(ev, i) in cell.events.slice(0, 3)" :key="i" class="event-dot" :style="{ background: ev.color }" />
              </div>
            </div>
          </div>
        </div>

        <div class="day-panel retro-panel" style="margin: 32px 32px 32px 0;">
          <div class="day-panel-title">DATE: [ {{ dayPanelTitle }} ]</div>

          <div class="today-card terminal-input" v-if="selectedDayEvents.length">
            <div class="today-card-left">
              <div class="today-icon pulse-anim"><i class="fas fa-star" /></div>
              <div>
                <div class="today-label">TODAY'S MISSION</div>
                <div class="today-status text-accent-3">STATUS: IN PROGRESS</div>
              </div>
            </div>
            <div class="today-progress-wrap">
              <div class="today-progress-label">
                COMPLETION <strong style="color:var(--text-primary)">{{ completionPct }}%</strong>
              </div>
              <div class="progress-bar bar-track">
                <div class="progress-fill bar-fill" :style="{ width: completionPct + '%' }" />
              </div>
            </div>
          </div>

          <div v-if="!selectedDayEvents.length" class="day-empty terminal-input" style="padding: 40px 0; text-align: center;">
            <i class="fas fa-calendar-times" style="font-size: 32px; color: var(--k-text-muted); margin-bottom: 10px;" />
            <p>NO MISSIONS FOUND.</p>
            <button class="mech-key mt-4 key-accent-1" style="margin: 0 auto; margin-top: 15px;" @click="openAddModal">
              <span class="key-legend"><i class="fas fa-plus" /> ADD MISSION</span>
            </button>
          </div>

          <div v-else>
            <div class="activities-label">ACTIVITY LOG</div>
            <div class="activities-list">
              <div
                v-for="ev in selectedDayEvents" :key="ev.id"
                class="activity-card retro-panel retro-text-hover"
                :class="{ 'activity-card--done': ev.done }"
                style="padding: 12px; margin-bottom: 12px; width:100%; display:flex;"
                @click.stop="toggleDone(ev.id)"
              >
                <div class="activity-icon" :style="{ background: ev.color }"><i :class="ev.icon" style="color:#fff;" /></div>
                <div class="activity-info" style="flex:1; text-align:left;">
                  <div class="activity-name">{{ ev.title }}</div>
                  <div class="activity-time">{{ ev.time }}</div>
                </div>
                <button
                  class="mech-key activity-check"
                  :class="{ 'key-accent-3': ev.done }"
                  style="width: 32px; height: 32px; padding: 0;"
                >
                  <i class="fas fa-check" v-if="ev.done"/>
                </button>
              </div>
            </div>

            <button class="mech-key btn-large mt-4 retro-text-hover" style="width: 100%;" @click="openAddModal">
               <span class="key-legend"><i class="fas fa-plus" /> ADD MISSION</span>
            </button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import AppSidebar from '@/components/AppSidebar.vue'
import { useCalendarStore } from '@/stores/useCalendarStore'
import { useThemeStore } from '@/stores/useThemeStore'
import { storeToRefs } from 'pinia'

const calendarStore = useCalendarStore()
const themeStore = useThemeStore()
const { schedules } = storeToRefs(calendarStore)

const today = new Date(); const viewYear  = ref(today.getFullYear()); const viewMonth = ref(today.getMonth()); const todayStr  = today.toISOString().slice(0, 10); const selectedDay = ref(todayStr)
const monthLabel = computed(() => `${viewYear.value} / ${String(viewMonth.value + 1).padStart(2,'0')}`)
function prevMonth() { if (viewMonth.value === 0) { viewMonth.value = 11; viewYear.value-- } else viewMonth.value-- }
function nextMonth() { if (viewMonth.value === 11) { viewMonth.value = 0; viewYear.value++ } else viewMonth.value++ }

const calendarCells = computed(() => {
  const y = viewYear.value, m = viewMonth.value; const firstDay = new Date(y, m, 1).getDay(); const daysInMonth = new Date(y, m + 1, 0).getDate(); const cells = []; const prevDays = new Date(y, m, 0).getDate()
  for (let i = firstDay - 1; i >= 0; i--) { const d = prevDays - i; const pm = m === 0 ? 12 : m; const py = m === 0 ? y - 1 : y; const ds = `${py}-${String(pm).padStart(2,'0')}-${String(d).padStart(2,'0')}`; cells.push({ key: `p${i}`, day: d, dateStr: ds, current: false, isToday: false, events: eventsFor(ds) }) }
  for (let d = 1; d <= daysInMonth; d++) { const ds = `${y}-${String(m+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`; cells.push({ key: ds, day: d, dateStr: ds, current: true, isToday: ds === todayStr, events: eventsFor(ds) }) }
  const remaining = 42 - cells.length
  for (let d = 1; d <= remaining; d++) { const nm = m === 11 ? 1 : m + 2; const ny = m === 11 ? y + 1 : y; const ds = `${ny}-${String(nm).padStart(2,'0')}-${String(d).padStart(2,'0')}`; cells.push({ key: `n${d}`, day: d, dateStr: ds, current: false, isToday: false, events: eventsFor(ds) }) }
  return cells
})

function eventsFor(dateStr) { return schedules.value.filter(s => s.day === dateStr).map(s => { const track = calendarStore.getTrackById(s.track); return { id: s.id, title: s.tooltip?.title || s.text || 'Mission', time: s.tooltip?.time ? `${s.tooltip.time}` : '', color: track?.color || '#E53935', icon: trackIcon(s.track), done: s.done || false } }) }
function trackIcon(trackId) { const map = { main: 'fas fa-book', algo: 'fas fa-code-branch', react: 'fas fa-code', portfolio: 'fas fa-briefcase' }; return map[trackId] || 'fas fa-circle' }
function selectDay(ds) { selectedDay.value = ds }

const dayPanelTitle = computed(() => { const d = new Date(selectedDay.value + 'T00:00:00'); return `${d.getMonth()+1}/${d.getDate()} ${['SUN','MON','TUE','WED','THU','FRI','SAT'][d.getDay()]}` })
const selectedDayEvents = computed(() => eventsFor(selectedDay.value))
const completionPct = computed(() => { const evs = selectedDayEvents.value; if (!evs.length) return 0; return Math.round(evs.filter(e => e.done).length / evs.length * 100) })
function toggleDone(id) { const s = schedules.value.find(x => x.id === id); if (s) s.done = !s.done }

onMounted(() => { if (themeStore.isDark) themeStore.isDark = false })
</script>

<style scoped>
@font-face { font-family: 'Mulmaru'; src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/2601-4@1.1/Mulmaru.woff2') format('woff2'); font-weight: normal; font-display: swap; }
@font-face { font-family: 'NeoDunggeunmo'; src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.3/NeoDunggeunmoPro-Regular.woff2') format('woff2'); font-weight: normal; font-display: swap; }

/* 테마 변수 통일 */
.theme-light { --k-bg: #F4F0EB; --k-housing: #E6DFD3; --k-key-bg: #FFFFFF; --k-key-border: #1A1A1A; --k-key-shadow: #1A1A1A; --k-border-main: #1A1A1A; --bg-base: #F4F0EB; --bg-surface: #E6DFD3; --bg-elevated: #FFFFFF; --border: #1A1A1A; --border-mid: #1A1A1A; --text-primary: #1A1A1A; --text-secondary: #333333; --text-muted: #555555; --text-faint: #777777; --accent: #E53935; --k-acc-1-bg: #E53935; --k-acc-1-shadow: #B71C1C; --k-acc-2-bg: #1E88E5; --k-acc-2-shadow: #1565C0; --k-acc-3-bg: #43A047; --k-acc-3-shadow: #2E7D32; }
.theme-dark { --k-bg: #1A1A1A; --k-housing: #2C2C2C; --k-key-bg: #3D3D3D; --k-key-border: #000000; --k-key-shadow: #000000; --k-border-main: #000000; --bg-base: #1A1A1A; --bg-surface: #2C2C2C; --bg-elevated: #3D3D3D; --border: #000000; --border-mid: #000000; --text-primary: #F0F0F0; --text-secondary: #CCCCCC; --text-muted: #999999; --text-faint: #666666; --accent: #FF5252; --k-acc-1-bg: #FF5252; --k-acc-1-shadow: #D50000; --k-acc-2-bg: #448AFF; --k-acc-2-shadow: #2962FF; --k-acc-3-bg: #69F0AE; --k-acc-3-shadow: #00E676; }

.app-layout { display: flex; width: 100%; height: 100vh; overflow: hidden; background: var(--bg-base); color: var(--text-primary); font-family: 'Mulmaru', sans-serif; position: relative; }
.main-content { flex: 1; display: flex; flex-direction: column; overflow: hidden; z-index: 10; }
.crt-scanlines { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(rgba(18,16,16,0) 50%, rgba(0,0,0,0.1) 50%); background-size: 100% 4px; z-index: 9999; pointer-events: none; opacity: 0.15; }
.theme-dark .crt-scanlines { opacity: 0.3; }
.retro-dot-bg { position: absolute; inset: 0; background-image: radial-gradient(var(--border-mid) 1px, transparent 1px); background-size: 20px 20px; opacity: 0.1; z-index: 0; pointer-events: none; }

/* 새로 교체된 아날로그 호버 (글리치 삭제) */
.retro-text-hover { transition: all 0.1s ease; display: inline-block; position: relative; }
.retro-text-hover:hover { color: var(--accent); transform: translate(-2px, -2px); cursor: pointer; animation: analog-jitter 0.2s infinite linear alternate; }
@keyframes analog-jitter {
  0% { text-shadow: 3px 3px 0px var(--border), -1px 0 0 rgba(255,0,0,0.7), 1px 0 0 rgba(0,255,255,0.7); }
  50% { text-shadow: 3px 3px 0px var(--border), 1px 0 0 rgba(255,0,0,0.7), -1px 0 0 rgba(0,255,255,0.7); }
  100% { text-shadow: 3px 3px 0px var(--border), -1px 0 0 rgba(255,0,0,0.7), 1px 0 0 rgba(0,255,255,0.7); }
}

.page-header { height: 80px; border-bottom: 2px solid var(--border); background: var(--k-housing); display: flex; align-items: center; justify-content: space-between; padding: 0 32px; flex-shrink: 0; position: sticky; top:0; z-index:90;}
.header-left { display: flex; align-items: center; gap: 16px; }
.page-title { font-family: 'NeoDunggeunmo', sans-serif; font-size: 32px; font-weight: 900; }
.retro-badge { border: 2px solid var(--border); box-shadow: 2px 2px 0 var(--border); border-radius: 4px; padding: 4px 8px; font-family: 'NeoDunggeunmo', sans-serif; font-size: 12px; background: var(--bg-elevated); font-weight: 800;}
.gcal-badge { color: var(--k-acc-2-bg); display: flex; align-items: center; gap: 6px; }
.header-actions { display: flex; align-items: center; gap: 12px; }
.sync-time { font-family: 'NeoDunggeunmo', sans-serif; font-size: 12px; font-weight: 800; color: var(--text-muted); margin-right: 8px; }

.mech-key { position: relative; box-sizing: border-box; background: var(--bg-elevated); color: var(--text-primary); border: 2px solid var(--border); border-radius: 4px; box-shadow: 4px 4px 0 var(--border); cursor: pointer; text-decoration: none; transition: all 0.1s; display: inline-flex; justify-content: center; align-items: center; }
.mech-key:active { transform: translate(4px, 4px) !important; box-shadow: 0 0 0 transparent !important; }
.key-legend { font-family: 'NeoDunggeunmo', sans-serif; font-size: 14px; font-weight: 800; display: flex; align-items: center; gap: 6px; }
.btn-import, .btn-sync, .btn-flow-cal { height: 44px; padding: 0 16px; }
.key-accent-1 { background: var(--k-acc-1-bg); color: #fff; }
.key-accent-3 { background: var(--k-acc-3-bg); color: #fff; }

.retro-panel-wrapper { border: 2px solid var(--border); border-radius: 4px; box-shadow: 6px 6px 0 var(--border); overflow: hidden; display: flex; flex-direction: column; background: var(--bg-surface); }
.retro-panel { background: var(--bg-surface); border: 2px solid var(--border); box-shadow: 6px 6px 0 var(--border); border-radius: 4px; }
.terminal-bg { background: var(--k-key-shadow); box-shadow: inset 0 4px 10px rgba(0,0,0,0.3); }
.terminal-input { background: var(--k-key-shadow); color: var(--k-acc-3-bg); border: 2px solid var(--border); border-radius: 4px; box-shadow: inset 0 4px 8px rgba(0,0,0,0.4); padding: 16px; font-family: 'NeoDunggeunmo', sans-serif; }

.body-grid { flex: 1; display: grid; grid-template-columns: 1fr 400px; overflow: hidden; }
.cal-panel { padding: 32px; overflow-y: auto; }
.cal-top { display: flex; align-items: center; justify-content: center; gap: 24px; padding: 16px; margin-bottom: 24px; width: max-content; margin-left: auto; margin-right: auto; }
.nav-btn { width: 44px; height: 44px; padding: 0; font-size: 16px;}
.cal-month-label { font-family: 'NeoDunggeunmo', sans-serif; font-size: 28px; font-weight: 900; letter-spacing: 0.1em; }
.dow-row { display: grid; grid-template-columns: repeat(7, 1fr); text-align: center; margin-bottom: 12px; }
.dow { font-family: 'NeoDunggeunmo', sans-serif; font-size: 16px; font-weight: 800; color: var(--text-primary); }

.date-grid { display: grid; grid-template-columns: repeat(7, 1fr); }
.date-cell { aspect-ratio: 1.1; padding: 8px; display: flex; flex-direction: column; align-items: center; cursor: pointer; border-right: 2px solid var(--border); border-bottom: 2px solid var(--border); position: relative; background: var(--bg-surface); transition: filter 0.1s; }
.date-cell:hover { filter: brightness(0.95); }
.date-cell:nth-child(7n) { border-right: none; } .date-cell:nth-last-child(-n+7) { border-bottom: none; }
.date-num { font-family: 'NeoDunggeunmo', sans-serif; font-size: 18px; font-weight: 800; width: 36px; height: 36px; border-radius: 4px; display: flex; align-items: center; justify-content: center; color: var(--text-primary); }
.date-cell--today .date-num { background: var(--accent); color: #fff; border: 2px solid var(--border); box-shadow: 2px 2px 0 var(--border); }
.date-cell--selected { background: var(--bg-elevated); outline: 4px solid var(--accent); outline-offset: -4px; z-index: 2;}
.date-cell--selected .date-num { color: var(--accent); }
.date-cell--other .date-num { color: var(--text-muted); opacity: 0.5; }

.dots-row { display: flex; gap: 4px; margin-top: auto; padding-bottom: 4px;}
.event-dot { width: 10px; height: 10px; border: 2px solid var(--border); border-radius: 50%; }

.day-panel { display: flex; flex-direction: column; padding: 24px; }
.day-panel-title { font-family: 'NeoDunggeunmo', sans-serif; font-size: 20px; font-weight: 900; color: var(--text-primary); margin-bottom: 20px; border-bottom: 2px dashed var(--border); padding-bottom: 12px; }

.today-card-left { display: flex; align-items: center; gap: 16px; margin-bottom: 20px;}
.today-icon { font-size: 32px; color: var(--k-acc-2-bg); text-shadow: 2px 2px 0 var(--border);}
.pulse-anim { animation: pulse 1.5s infinite; }
@keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.1); } }

.today-label { font-family: 'NeoDunggeunmo', sans-serif; font-size: 18px; font-weight: 900; color: var(--text-primary); }
.today-status { font-family: 'NeoDunggeunmo', sans-serif; font-size: 14px; margin-top: 6px; font-weight: 800;}
.today-progress-label { display: flex; justify-content: space-between; font-family: 'NeoDunggeunmo', sans-serif; font-size: 14px; color: var(--text-muted); margin-bottom: 8px; font-weight: 800;}
.bar-track { width: 100%; height: 16px; background: var(--bg-base); border: 2px solid var(--border); border-radius: 4px; overflow: hidden; display: flex; box-shadow: inset 0 2px 4px rgba(0,0,0,0.3);}
.bar-fill { height: 100%; background: var(--k-acc-3-bg); transition: width 0.3s; border-right: 2px solid var(--border);}

.activities-label { font-family: 'NeoDunggeunmo', sans-serif; font-size: 16px; font-weight: 900; color: var(--text-primary); margin: 32px 0 16px; border-bottom: 2px dashed var(--border); padding-bottom: 8px;}
.activity-card { display: flex; align-items: center; gap: 12px; }
.activity-icon { width: 36px; height: 36px; border-radius: 4px; display: flex; align-items: center; justify-content: center; border: 2px solid var(--border); font-size: 16px;}
.activity-name { font-family: 'NeoDunggeunmo', sans-serif; font-size: 15px; font-weight: 800; color: var(--text-primary);}
.activity-time { font-family: 'NeoDunggeunmo', sans-serif; font-size: 12px; color: var(--text-muted); margin-top: 4px; font-weight: 800;}
.activity-card--done { opacity: 0.6; filter: grayscale(0.5); } 
.activity-card--done .activity-name { text-decoration: line-through; }
.btn-large { height: 56px; }
.text-accent-3 { color: var(--k-acc-3-bg); }

.custom-scroll::-webkit-scrollbar { width: 8px; }
.custom-scroll::-webkit-scrollbar-track { background: var(--bg-base); border-left: 2px solid var(--border); }
.custom-scroll::-webkit-scrollbar-thumb { background: var(--border-mid); border: 2px solid var(--border); }
</style>