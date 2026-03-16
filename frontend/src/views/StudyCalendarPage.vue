<template>
  <div class="app-layout" :class="themeStore.isDark ? 'theme-dark' : 'theme-light'">
    <div class="crt-scanlines"></div>
    <div class="retro-dot-bg"></div>
    
    <AppSidebar />

    <main class="main-content custom-scroll">
      <div class="page-header">
        <div class="header-left">
<<<<<<< HEAD
          <h1 class="page-title">STUDY LOG</h1>
          <div class="gcal-badge">
            <i class="fas fa-check" />
            GOOGLE CALENDAR CONNECTED
          </div>
        </div>
        <div class="header-actions">
          <div v-if="lastSync" class="sync-time">LAST SYNC: {{ lastSync }}</div>
          <button class="btn-import" @click="showImportModal = true">
            <i class="fas fa-download" /> IMPORT
          </button>
          <button class="btn-sync" @click="handleSync">
            <i :class="syncing ? 'fas fa-spinner fa-spin' : 'fas fa-sync-alt'" />
            SYNC NOW
          </button>

          <RouterLink to="/calendar" class="btn-flow-cal">
            <i class="fas fa-code-branch" />
            FLOW CALENDAR
=======
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
>>>>>>> d9d81185ededc2b2de1631f9ff7968776e03e2e7
          </RouterLink>
        </div>
      </div>

      <div class="body-grid">
<<<<<<< HEAD

        <div class="cal-panel custom-scroll">
          <div class="cal-top">
            <button class="nav-btn" @click="prevMonth"><i class="fas fa-chevron-left"/></button>
            <span class="cal-month-label">{{ monthLabel }}</span>
            <button class="nav-btn" @click="nextMonth"><i class="fas fa-chevron-right"/></button>
=======
        <div class="cal-panel">
          <div class="cal-top retro-panel">
            <button class="mech-key nav-btn" @click="prevMonth"><i class="fas fa-chevron-left" /></button>
            <span class="cal-month-label retro-text-hover">{{ monthLabel }}</span>
            <button class="mech-key nav-btn" @click="nextMonth"><i class="fas fa-chevron-right" /></button>
>>>>>>> d9d81185ededc2b2de1631f9ff7968776e03e2e7
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

<<<<<<< HEAD
        <div class="day-panel custom-scroll">
          <div class="day-panel-title">{{ dayPanelTitle }}</div>
=======
        <div class="day-panel retro-panel" style="margin: 32px 32px 32px 0;">
          <div class="day-panel-title">DATE: [ {{ dayPanelTitle }} ]</div>
>>>>>>> d9d81185ededc2b2de1631f9ff7968776e03e2e7

          <div class="today-card terminal-input" v-if="selectedDayEvents.length">
            <div class="today-card-left">
              <div class="today-icon pulse-anim"><i class="fas fa-star" /></div>
              <div>
                <div class="today-label">TODAY'S MISSION</div>
<<<<<<< HEAD
                <div class="today-status">IN PROGRESS</div>
=======
                <div class="today-status text-accent-3">STATUS: IN PROGRESS</div>
>>>>>>> d9d81185ededc2b2de1631f9ff7968776e03e2e7
              </div>
            </div>
            <div class="today-progress-wrap">
              <div class="today-progress-label">
<<<<<<< HEAD
                COMPLETION <strong>{{ completionPct }}%</strong>
=======
                COMPLETION <strong style="color:var(--text-primary)">{{ completionPct }}%</strong>
>>>>>>> d9d81185ededc2b2de1631f9ff7968776e03e2e7
              </div>
              <div class="progress-bar bar-track">
                <div class="progress-fill bar-fill" :style="{ width: completionPct + '%' }" />
              </div>
            </div>
          </div>

<<<<<<< HEAD
          <div v-if="!selectedDayEvents.length" class="day-empty">
            <i class="fas fa-calendar-times" />
            <p>NO SCHEDULES FOUND</p>
            <button class="btn-add-sched" @click="openAddModal">
              <i class="fas fa-plus" /> ADD SCHEDULE
=======
          <div v-if="!selectedDayEvents.length" class="day-empty terminal-input" style="padding: 40px 0; text-align: center;">
            <i class="fas fa-calendar-times" style="font-size: 32px; color: var(--k-text-muted); margin-bottom: 10px;" />
            <p>NO MISSIONS FOUND.</p>
            <button class="mech-key mt-4 key-accent-1" style="margin: 0 auto; margin-top: 15px;" @click="openAddModal">
              <span class="key-legend"><i class="fas fa-plus" /> ADD MISSION</span>
>>>>>>> d9d81185ededc2b2de1631f9ff7968776e03e2e7
            </button>
          </div>

          <div v-else>
<<<<<<< HEAD
            <div class="activities-label">ACTIVITIES</div>
=======
            <div class="activities-label">ACTIVITY LOG</div>
>>>>>>> d9d81185ededc2b2de1631f9ff7968776e03e2e7
            <div class="activities-list">
              <div
                v-for="ev in selectedDayEvents" :key="ev.id"
                class="activity-card retro-panel retro-text-hover"
                :class="{ 'activity-card--done': ev.done }"
                style="padding: 12px; margin-bottom: 12px; width:100%; display:flex;"
                @click.stop="toggleDone(ev.id)"
              >
<<<<<<< HEAD
                <div class="activity-icon" :style="{ color: ev.color, borderColor: ev.color }">
                  <i :class="ev.icon" />
                </div>
                <div class="activity-info">
=======
                <div class="activity-icon" :style="{ background: ev.color }"><i :class="ev.icon" style="color:#fff;" /></div>
                <div class="activity-info" style="flex:1; text-align:left;">
>>>>>>> d9d81185ededc2b2de1631f9ff7968776e03e2e7
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

<<<<<<< HEAD
            <button class="btn-add-sched btn-add-sched--ghost" @click="openAddModal">
              <i class="fas fa-plus" /> ADD SCHEDULE
            </button>
          </div>

          <div class="track-filter-wrap">
            <button class="track-filter-toggle" @click="showTrackFilter = !showTrackFilter">
              <i class="fas fa-filter" />
              TRACK FILTER
              <i class="fas" :class="showTrackFilter ? 'fa-chevron-up' : 'fa-chevron-down'" style="margin-left:auto; font-size:10px;" />
            </button>

            <Transition name="filter-expand">
              <div v-if="showTrackFilter" class="track-filter-body">
                <button
                  class="tf-btn tf-btn--all"
                  :class="{ 'tf-off': hiddenTracks.size > 0 }"
                  @click="toggleAllTracks"
                >
                  <span class="tf-all-dots">
                    <span v-for="t in visibleTrackList.slice(0,4)" :key="t.id" class="tf-dot" :style="{ background: t.color }" />
                  </span>
                  ALL
                </button>
                <div class="tf-sep" />
                <button
                  v-for="t in visibleTrackList" :key="t.id"
                  class="tf-btn"
                  :class="{ 'tf-off': hiddenTracks.has(t.id) }"
                  @click="toggleTrack(t.id)"
                >
                  <span
                    class="tf-dot"
                    :style="{ background: hiddenTracks.has(t.id) ? 'transparent' : t.color, borderColor: t.color }"
                  />
                  {{ t.name }}
                </button>
              </div>
            </Transition>
          </div>
        </div>
      </div>
    </main>

    <Teleport to="body">
      <Transition name="modal-fade">
        <div v-if="showAddModal" class="modal-overlay" @click.self="showAddModal = false">
          <div class="modal-box">
            <div class="modal-header">
              <h3>ADD SCHEDULE</h3>
              <button class="modal-close" @click="showAddModal = false"><i class="fas fa-times" /></button>
            </div>
            <div class="modal-form">
              <div class="form-row">
                <label>TITLE</label>
                <input v-model="newEvent.title" type="text" class="form-input" placeholder="Enter study topic" />
              </div>
              <div class="form-row">
                <label>DATE</label>
                <input v-model="newEvent.date" type="date" class="form-input" />
              </div>
              <div class="form-row two-col">
                <div>
                  <label>START</label>
                  <input v-model="newEvent.start" type="time" class="form-input" />
                </div>
                <div>
                  <label>END</label>
                  <input v-model="newEvent.end" type="time" class="form-input" />
                </div>
              </div>
              <div class="form-row">
                <label>TRACK</label>
                <select v-model="newEvent.track" class="form-input">
                  <option v-for="t in calendarStore.allTracks" :key="t.id" :value="t.id">{{ t.name }}</option>
                </select>
              </div>
            </div>
            <div class="modal-actions">
              <button class="modal-btn-cancel" @click="showAddModal = false">CANCEL</button>
              <button class="modal-btn-ok" @click="addEvent">ADD</button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <Teleport to="body">
      <Transition name="modal-fade">
        <div v-if="showImportModal" class="modal-overlay" @click.self="showImportModal = false">
          <div class="modal-box">
            <div class="modal-header">
              <h3>IMPORT DATA</h3>
              <button class="modal-close" @click="showImportModal = false"><i class="fas fa-times" /></button>
            </div>
            <p class="modal-desc">Google Calendar 등 외부 소스에서 일정을 가져옵니다.</p>
            <div class="import-source-list">
              <div v-for="src in importSources" :key="src.label" class="import-source"
                :class="{ 'import-source--selected': selectedImport === src.label }"
                @click="selectedImport = src.label">
                <i :class="src.icon" :style="{ color: src.color }" />
                <span>{{ src.label }}</span>
                <i v-if="selectedImport === src.label" class="fas fa-check import-check" />
              </div>
            </div>
            <div class="modal-actions">
              <button class="modal-btn-cancel" @click="showImportModal = false">CANCEL</button>
              <button class="modal-btn-ok" @click="doImport">IMPORT</button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
=======
            <button class="mech-key btn-large mt-4 retro-text-hover" style="width: 100%;" @click="openAddModal">
               <span class="key-legend"><i class="fas fa-plus" /> ADD MISSION</span>
            </button>
          </div>
        </div>
      </div>
    </main>
>>>>>>> d9d81185ededc2b2de1631f9ff7968776e03e2e7
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

<<<<<<< HEAD
const today = new Date()
const viewYear  = ref(today.getFullYear())
const viewMonth = ref(today.getMonth())
const todayStr  = today.toISOString().slice(0, 10)
const selectedDay = ref(todayStr)

const monthLabel = computed(() => `${viewYear.value}.${String(viewMonth.value + 1).padStart(2,'0')}`)

function prevMonth() { if (viewMonth.value === 0) { viewMonth.value = 11; viewYear.value-- } else viewMonth.value-- }
function nextMonth() { if (viewMonth.value === 11) { viewMonth.value = 0; viewYear.value++ } else viewMonth.value++ }

const calendarCells = computed(() => {
  const y = viewYear.value, m = viewMonth.value
  const firstDay = new Date(y, m, 1).getDay()
  const daysInMonth = new Date(y, m + 1, 0).getDate()
  const cells = []

  const prevDays = new Date(y, m, 0).getDate()
  for (let i = firstDay - 1; i >= 0; i--) {
    const d = prevDays - i
    const pm = m === 0 ? 12 : m; const py = m === 0 ? y - 1 : y
    const ds = `${py}-${String(pm).padStart(2,'0')}-${String(d).padStart(2,'0')}`
    cells.push({ key: `p${i}`, day: d, dateStr: ds, current: false, isToday: false, events: eventsFor(ds) })
  }
  for (let d = 1; d <= daysInMonth; d++) {
    const ds = `${y}-${String(m+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`
    cells.push({ key: ds, day: d, dateStr: ds, current: true, isToday: ds === todayStr, events: eventsFor(ds) })
  }
  const remaining = 42 - cells.length
  for (let d = 1; d <= remaining; d++) {
    const nm = m === 11 ? 1 : m + 2; const ny = m === 11 ? y + 1 : y
    const ds = `${ny}-${String(nm).padStart(2,'0')}-${String(d).padStart(2,'0')}`
    cells.push({ key: `n${d}`, day: d, dateStr: ds, current: false, isToday: false, events: eventsFor(ds) })
  }
  return cells
})

function eventsFor(dateStr) {
  return schedules.value
    .filter(s => s.day === dateStr && !hiddenTracks.value.has(s.track))
    .map(s => {
      const track = calendarStore.getTrackById(s.track)
      return {
        id: s.id, title: s.tooltip?.title || s.text || '일정',
        time: s.tooltip?.time ? `${s.tooltip.time} - ${s.tooltip.endTime || ''}` : '',
        color: track?.color || '#818cf8', icon: trackIcon(s.track), done: s.done || false,
      }
    })
}

function trackIcon(trackId) { const map = { main: 'fas fa-book', algo: 'fas fa-code-branch', react: 'fas fa-code', portfolio: 'fas fa-briefcase' }; return map[trackId] || 'fas fa-stop' }
function selectDay(ds) { selectedDay.value = ds }

const dayPanelTitle = computed(() => {
  const d = new Date(selectedDay.value + 'T00:00:00')
  return `${d.getMonth() + 1}/${d.getDate()} ${['SUN','MON','TUE','WED','THU','FRI','SAT'][d.getDay()]}`
})

const selectedDayEvents = computed(() => eventsFor(selectedDay.value))
const completionPct = computed(() => { const evs = selectedDayEvents.value; if (!evs.length) return 0; return Math.round(evs.filter(e => e.done).length / evs.length * 100) })

function toggleDone(id) { const s = schedules.value.find(x => x.id === id); if (s) s.done = !s.done }

const showTrackFilter = ref(false)
const hiddenTracks = ref(new Set())
const visibleTrackList = computed(() => calendarStore.allTracks)

function toggleTrack(id) { const next = new Set(hiddenTracks.value); if (next.has(id)) next.delete(id); else next.add(id); hiddenTracks.value = next }
function toggleAllTracks() { if (hiddenTracks.value.size === 0) hiddenTracks.value = new Set(calendarStore.allTracks.map(t => t.id)); else hiddenTracks.value = new Set() }

const showAddModal = ref(false)
const newEvent = reactive({ title: '', date: selectedDay.value, start: '09:00', end: '10:00', track: 'main' })

function openAddModal() { newEvent.date = selectedDay.value; newEvent.title = ''; newEvent.start = '09:00'; newEvent.end = '10:00'; showAddModal.value = true }
function addEvent() {
  if (!newEvent.title.trim()) return
  calendarStore.createSchedule({ day: newEvent.date, track: newEvent.track, text: newEvent.title, done: false, tooltip: { title: newEvent.title, time: newEvent.start, endTime: newEvent.end, tags: ['#학습'] }})
  showAddModal.value = false
}

const syncing  = ref(false)
const lastSync = ref('2026.03.04 14:32')
function handleSync() { syncing.value = true; setTimeout(() => { syncing.value = false; const now = new Date(); lastSync.value = `${now.getFullYear()}.${String(now.getMonth()+1).padStart(2,'0')}.${String(now.getDate()).padStart(2,'0')} ${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}` }, 1800) }

const showImportModal = ref(false)
const selectedImport  = ref('Google Calendar')
const importSources = [ { label: 'Google Calendar', icon: 'fab fa-google', color: '#ea4335' }, { label: 'Notion', icon: 'fas fa-file-alt', color: '#000' }, { label: 'CSV File', icon: 'fas fa-file-csv', color: '#10b981' } ]
function doImport() { showImportModal.value = false }
</script>

<style scoped>
.app-layout { display: flex; width: 100%; height: 100vh; overflow: hidden; background: var(--bg-base); color: var(--text-primary); font-family: 'Space Grotesk', 'Escoredream', system-ui, sans-serif; }
.main-content { flex: 1; display: flex; flex-direction: column; overflow: hidden; }

/* ★ 스크롤바 완전히 숨김 (기능은 유지) */
.custom-scroll {
  overflow-y: auto;
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
.custom-scroll::-webkit-scrollbar {
  display: none; /* Chrome, Safari and Opera */
}

.page-header {
  height: 64px; background: var(--bg-surface); border-bottom: 2px solid var(--border);
  display: flex; align-items: center; justify-content: space-between; padding: 0 24px; flex-shrink: 0;
=======
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
>>>>>>> d9d81185ededc2b2de1631f9ff7968776e03e2e7
}

.page-header { height: 80px; border-bottom: 2px solid var(--border); background: var(--k-housing); display: flex; align-items: center; justify-content: space-between; padding: 0 32px; flex-shrink: 0; position: sticky; top:0; z-index:90;}
.header-left { display: flex; align-items: center; gap: 16px; }
<<<<<<< HEAD
.page-title { font-size: 20px; font-weight: 900; letter-spacing: 0.05em; }
.gcal-badge { display: flex; align-items: center; gap: 6px; font-size: 11px; font-weight: 800; color: var(--text-primary); border: 1px solid var(--text-primary); padding: 4px 10px; border-radius: 0; }

.header-actions { display: flex; align-items: center; gap: 8px; }
.btn-import, .btn-sync, .btn-flow-cal {
  display: flex; align-items: center; gap: 6px; padding: 8px 14px; border-radius: 0;
  font-size: 12px; font-weight: 800; cursor: pointer; transition: 0.1s; letter-spacing: 0.05em; text-decoration: none;
}
.btn-import { background: transparent; border: 1px solid var(--border); color: var(--text-primary); }
.btn-import:hover { border-color: var(--text-primary); }
.btn-sync { background: var(--text-primary); border: 1px solid var(--text-primary); color: var(--bg-base); }
.btn-sync:hover { background: transparent; color: var(--text-primary); }
.btn-flow-cal { background: transparent; border: 2px solid var(--text-primary); color: var(--text-primary); box-shadow: 2px 2px 0 var(--text-primary); }
.btn-flow-cal:hover { transform: translate(1px, 1px); box-shadow: 0 0 0 var(--text-primary); }
.sync-time { font-size: 10px; font-weight: 700; color: var(--text-muted); margin-right: 8px; }

.body-grid { flex: 1; display: grid; grid-template-columns: 1fr 340px; overflow: hidden; }

/* 달력 */
.cal-panel { padding: 32px; border-right: 2px solid var(--border); }
.cal-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; padding: 0 10px; }
.cal-month-label { font-size: 24px; font-weight: 900; letter-spacing: 0.1em; }
.nav-btn { width: 36px; height: 36px; border-radius: 0; background: transparent; border: 2px solid var(--border); cursor: pointer; font-size: 14px; color: var(--text-primary); transition: 0.1s; }
.nav-btn:hover { border-color: var(--text-primary); background: var(--text-primary); color: var(--bg-base); }

.dow-row { display: grid; grid-template-columns: repeat(7, 1fr); text-align: center; margin-bottom: 8px; }
.dow { font-size: 12px; font-weight: 800; color: var(--text-muted); padding: 8px 0; letter-spacing: 0.1em; }

.date-grid { display: grid; grid-template-columns: repeat(7, 1fr); border: 2px solid var(--text-primary); background: var(--bg-surface); }
.date-cell { aspect-ratio: 1.1; padding: 8px; display: flex; flex-direction: column; align-items: center; cursor: pointer; transition: 0.1s; border-right: 1px solid var(--border); border-bottom: 1px solid var(--border); }
.date-cell:nth-child(7n) { border-right: none; }
.date-cell:nth-last-child(-n+7) { border-bottom: none; }
.date-cell:hover { background: var(--bg-hover); }

.date-num { font-size: 14px; font-weight: 800; width: 28px; height: 28px; border-radius: 0; display: flex; align-items: center; justify-content: center; }
.date-cell--today .date-num { background: var(--text-primary); color: var(--bg-base); }
.date-cell--selected .date-num { outline: 2px solid var(--text-primary); }
.date-cell--other .date-num { color: var(--border-mid); }

.dots-row { display: flex; gap: 4px; justify-content: center; margin-top: 8px; }
.event-dot { width: 8px; height: 8px; border-radius: 0; border: 1px solid rgba(0,0,0,0.1); }

/* 오른쪽 패널 */
.day-panel { display: flex; flex-direction: column; gap: 24px; padding: 32px 24px; background: var(--bg-surface); }
.day-panel-title { font-size: 20px; font-weight: 900; letter-spacing: 0.1em; border-bottom: 2px solid var(--text-primary); padding-bottom: 12px; }

.today-card { background: transparent; border: 2px solid var(--text-primary); border-radius: 0; padding: 20px; box-shadow: 6px 6px 0 var(--text-primary); display: flex; flex-direction: column; gap: 16px; }
.today-card-left { display: flex; align-items: center; gap: 12px; }
.today-icon { width: 44px; height: 44px; border: 2px solid var(--text-primary); display: flex; align-items: center; justify-content: center; font-size: 18px; color: var(--text-primary); }
.today-label { font-size: 16px; font-weight: 900; letter-spacing: 0.05em; }
.today-status { font-size: 11px; font-weight: 700; color: var(--text-muted); margin-top: 2px; }

.today-progress-label { display: flex; justify-content: space-between; font-size: 11px; font-weight: 800; margin-bottom: 8px; }
.today-progress-label strong { font-size: 14px; }
.progress-bar { height: 12px; border: 1px solid var(--text-primary); background: transparent; }
.progress-fill { height: 100%; background: var(--text-primary); transition: width 0.3s; }

.activities-label { font-size: 14px; font-weight: 900; letter-spacing: 0.1em; margin-bottom: 12px; }
.activities-list { display: flex; flex-direction: column; gap: 12px; }
.activity-card { display: flex; align-items: center; gap: 14px; background: transparent; border: 2px solid var(--border); padding: 14px; transition: 0.1s; }
.activity-card:hover { border-color: var(--text-primary); transform: translateX(2px); }
.activity-card--done { opacity: 0.4; border-style: dashed; }
.activity-icon { width: 36px; height: 36px; border: 2px solid; display: flex; align-items: center; justify-content: center; font-size: 14px; }
.activity-name { font-size: 14px; font-weight: 800; }
.activity-time { font-size: 11px; font-weight: 700; color: var(--text-muted); margin-top: 4px; font-family: monospace; }
.activity-check { width: 28px; height: 28px; border: 2px solid var(--text-primary); background: transparent; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: 0.1s; color: transparent; border-radius: 0; }
.activity-check:hover { background: var(--bg-hover); }
.activity-check--done { color: var(--bg-base) !important; border-color: var(--text-primary) !important; }

.day-empty { padding: 40px 0; text-align: center; color: var(--text-muted); }
.day-empty i { font-size: 40px; margin-bottom: 12px; }
.day-empty p { font-size: 14px; font-weight: 800; letter-spacing: 0.05em; }

.btn-add-sched { width: 100%; padding: 14px; border: 2px dashed var(--text-primary); background: transparent; color: var(--text-primary); font-size: 13px; font-weight: 900; cursor: pointer; transition: 0.1s; letter-spacing: 0.1em; margin-top: 12px; }
.btn-add-sched:hover { background: var(--text-primary); color: var(--bg-base); border-style: solid; }

/* 트랙 필터 */
.track-filter-wrap { margin-top: auto; border-top: 2px solid var(--border); padding-top: 16px; }
.track-filter-toggle { width: 100%; display: flex; align-items: center; gap: 8px; padding: 12px; border: 1px solid var(--border); background: transparent; color: var(--text-primary); font-size: 12px; font-weight: 900; cursor: pointer; transition: 0.1s; letter-spacing: 0.05em; }
.track-filter-toggle:hover { border-color: var(--text-primary); }

.track-filter-body { display: flex; flex-wrap: wrap; gap: 8px; padding: 12px 0 0; }
.tf-btn { display: inline-flex; align-items: center; gap: 6px; padding: 6px 10px; border: 1px solid var(--border); background: transparent; font-size: 11px; font-weight: 800; color: var(--text-primary); cursor: pointer; text-transform: uppercase; }
.tf-btn:hover { border-color: var(--text-primary); }
.tf-btn.tf-off { opacity: 0.3; text-decoration: line-through; }
.tf-dot { width: 10px; height: 10px; border: 2px solid; }

/* 모달 */
.modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.6); backdrop-filter: blur(2px); z-index: 200; display: flex; align-items: center; justify-content: center; }
.modal-box { width: 440px; background: var(--bg-base); border: 3px solid var(--text-primary); padding: 32px; box-shadow: 12px 12px 0 var(--text-primary); }
.modal-header { display: flex; justify-content: space-between; margin-bottom: 24px; border-bottom: 2px solid var(--text-primary); padding-bottom: 12px; }
.modal-header h3 { font-size: 20px; font-weight: 900; letter-spacing: 0.05em; }
.modal-close { background: transparent; border: none; font-size: 20px; color: var(--text-primary); cursor: pointer; }
.modal-form { display: flex; flex-direction: column; gap: 16px; }
.form-row label { font-size: 12px; font-weight: 800; letter-spacing: 0.1em; display: block; margin-bottom: 6px; }
.form-input { width: 100%; border: 2px solid var(--border); background: transparent; color: var(--text-primary); padding: 12px; font-size: 14px; font-weight: 700; outline: none; }
.form-input:focus { border-color: var(--text-primary); box-shadow: 4px 4px 0 var(--border); }
.modal-actions { display: flex; gap: 12px; margin-top: 32px; }
.modal-btn-cancel, .modal-btn-ok { flex: 1; padding: 14px; font-size: 14px; font-weight: 900; cursor: pointer; transition: 0.1s; border: 2px solid var(--text-primary); letter-spacing: 0.1em; }
.modal-btn-cancel { background: transparent; color: var(--text-primary); }
.modal-btn-cancel:hover { box-shadow: 4px 4px 0 var(--text-primary); transform: translate(-2px, -2px); }
.modal-btn-ok { background: var(--text-primary); color: var(--bg-base); box-shadow: 4px 4px 0 var(--text-primary); }
.modal-btn-ok:hover { background: transparent; color: var(--text-primary); transform: translate(-2px, -2px); box-shadow: 6px 6px 0 var(--text-primary); }

.import-source { border: 2px solid var(--border); padding: 16px; font-weight: 800; cursor: pointer; display: flex; align-items: center; gap: 12px; transition: 0.1s; }
.import-source--selected { border-color: var(--text-primary); box-shadow: 4px 4px 0 var(--text-primary); transform: translate(-2px, -2px); }
=======
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
>>>>>>> d9d81185ededc2b2de1631f9ff7968776e03e2e7
</style>