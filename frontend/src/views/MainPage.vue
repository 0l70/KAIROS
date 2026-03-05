<template>
  <div class="app-layout" @click="handleBackdropClick">
    <AppSidebar />

    <main class="main-content">
      <CalendarHeader
        :date-text="headerDateText"
        :current-view="currentView"
        :current-date="parseDate(focusedDay)"
        :visible-tracks="tracksInCurrentView" 
        @navigate="navigate"
        @change-view="setView"
        @open-track-modal="isTrackModalOpen = true"
        @jump-to-date="jumpToDate"
        @update:hiddenTracks="onHiddenTracksChange"
        @hover-track="onTrackHover" 
      />

      <div v-if="currentView === 'month'" class="calendar-area">
        <div ref="calendarWrapper" class="calendar-wrapper">
          <div class="calendar-header-row grid-cols-7 month-dow-header">
            <div v-for="(d, i) in DAY_LABELS" :key="d" class="day-header"
              :class="{ 'day-header--sat': i===6, 'day-header--sun': i===0 }">
              {{ d }}
            </div>
          </div>
          
          <div
            class="month-scroll-body"
            ref="monthScrollBody"
            @scroll.passive="handleMonthScroll"
          >
            <div class="calendar-grid grid-cols-7" :style="{ gridAutoRows: 'var(--month-row-height, 150px)' }">
              <CalendarCell
                v-for="cell in monthCells"
                :key="cell.dateStr"
                :date-str="cell.dateStr"
                :current-month="currentMonth" 
                :schedules="store.getSchedulesForDay(cell.dateStr)"
                :active-tooltip-id="activeTooltipId"
                :is-today="cell.dateStr === todayStr"
                :is-selected="cell.dateStr === selectedDay"
                :hidden-tracks="hiddenTracks"
                :dimmed-node-ids="dimmedNodeIds"
                @cell-click="handleCellClick"
                @add-schedule="openCreateModal"
                @toggle-tooltip="toggleTooltip"
                @edit-schedule="openEditModal"
                @delete-schedule="handleDeleteSchedule"
                @day-detail="openDayDetailModal"
                @hover-node="onNodeHover"
              />
            </div>
            <canvas ref="lineCanvas" class="line-canvas" />
          </div>
        </div>

        <Transition name="floatbar">
          <div v-if="selectedSchedules.length" class="floating-action-bar">
            <span class="sel-count">{{ selectedSchedules.length }}개 선택됨</span>
            <button class="btn-sel-delete" @click="deleteSelected">
              <i class="fas fa-trash" /> 삭제
            </button>
            <button class="btn-sel-clear" @click="selectedSchedules = []">
              <i class="fas fa-times" />
            </button>
          </div>
        </Transition>
      </div>

      <div v-else-if="currentView === 'week'" class="calendar-area">
        <div ref="calendarWrapper" class="week-wrapper"
          @touchstart.passive="onWeekTouchStart"
          @touchend.passive="onWeekTouchEnd">

          <div class="calendar-header-row grid-cols-7">
            <div v-for="(day, idx) in weekDays" :key="`wh-${day}`"
              class="week-col-header"
              :class="{ 'day-header--sat': idx===6, 'day-header--sun': idx===0 }">
              <span class="week-col-label">{{ DAY_LABELS[idx] }}</span>
              <span class="week-col-date" :class="{ 'is-today': day === todayStr }">
                {{ dateOf(day) }}
                <span v-if="day === todayStr" class="week-today-tag">TODAY</span>
              </span>
            </div>
          </div>

          <div ref="weekGraphZone" class="week-graph-zone" :style="{ height: weekGraphHeight + 'px' }">
            <canvas ref="lineCanvas" class="line-canvas" />
            <div class="week-lane-labels">
              <div
                v-for="(track, tIdx) in sortedAllTracks"
                :key="track.id"
                class="week-lane-label"
                :class="{ 'week-lane-label--highlight': track.isHighlight }"
                :style="{
                  top: (WEEK_TOP_MARGIN + tIdx * WEEK_LANE_SPACING) + 'px',
                  color: track.color,
                  borderColor: track.color + '44'
                }"
                @mouseenter="onTrackHover(track.id)"
                @mouseleave="onTrackHover(null)"
              >
                <span class="lane-dot" :style="{ background: track.color }" />
                {{ track.name }}
                <span v-if="track.isHighlight" class="lane-hl-badge">✦</span>
              </div>
            </div>
            <div
              v-for="(track, tIdx) in sortedAllTracks"
              :key="`lane-bg-${track.id}`"
              class="week-lane-bg"
              :style="{
                top: (WEEK_TOP_MARGIN + tIdx * WEEK_LANE_SPACING) + 'px',
                background: track.color + (track.isHighlight ? '22' : '14')
              }"
            />
            <template v-for="(day, colIdx) in weekDays" :key="`nodes-col-${colIdx}`">
              <WeekGraphNode
                v-for="s in store.getSchedulesForDay(day)"
                :key="s.id"
                v-show="!hiddenTracks.has(s.track)"
                :schedule="s"
                :col-idx="colIdx"
                :total-cols="7"
                :is-active="activeTooltipId === s.id"
                :total-tracks="sortedAllTracks.length"
                :is-dimmed="dimmedNodeIds.has(s.id)"
                @toggle-tooltip="toggleTooltip"
                @edit="openEditModal"
                @delete="handleDeleteSchedule"
                @hover="onNodeHover"
              />
            </template>
          </div>

          <div class="week-card-zone grid-cols-7" :class="weekSlideAnimClass">
            <div v-for="(day, idx) in weekDays" :key="day"
              class="week-cell"
              :class="{
                'week-cell--today':    day === todayStr,
                'week-cell--selected': day === selectedDay,
                'week-cell--sat':      idx===6,
                'week-cell--sun':      idx===0
              }"
              @click.stop="handleWeekCellClick(day)"
            >
              <div class="week-cards">
                <WeekScheduleCard
                  v-for="s in store.getSchedulesForDay(day)" :key="s.id"
                  :schedule="s"
                  @edit="openEditModal"
                  @delete="handleDeleteSchedule"
                  @mouseenter="onNodeHover(s)"
                  @mouseleave="onNodeHover(null)"
                />
              </div>
              <button class="btn-add-week" @click.stop="openCreateModal(day)">
                <i class="fas fa-plus" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>

    <Transition name="fade">
      <div v-if="edgeTooltip.visible" class="edge-tooltip-popup" :style="{ left: edgeTooltip.x + 'px', top: edgeTooltip.y + 'px' }">
        <div class="et-track" :style="{ color: edgeTooltip.edge.color }">
          {{ store.getTrackById(edgeTooltip.edge.track)?.name }}
        </div>
        <div class="et-nodes">
          <span>{{ edgeTooltip.edge.from.tooltip?.title || edgeTooltip.edge.from.text || '시작' }}</span>
          <i class="fas fa-arrow-right" />
          <span>{{ edgeTooltip.edge.to.tooltip?.title || edgeTooltip.edge.to.text || '종료' }}</span>
        </div>
      </div>
    </Transition>

    <NodeFormModal v-model="isScheduleModalOpen" :mode="modalMode" :initial-form="modalInitialForm" :edit-node-id="editTargetId" @save="handleSaveSchedule" />
    <BranchManageModal v-model="isTrackModalOpen" />
    <DayDetailModal v-model="isDayDetailOpen" :day-str="dayDetailTarget" :schedules="store.getSchedulesForDay(dayDetailTarget)" @add-schedule="(d) => { isDayDetailOpen = false; openCreateModal(d) }" @edit-schedule="(s) => { isDayDetailOpen = false; openEditModal(s) }" @delete-schedule="(id) => { handleDeleteSchedule(id) }" />
  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick, onMounted, reactive } from 'vue'
import { storeToRefs } from 'pinia'
import { useCalendarStore } from '@/stores/useCalendarStore'
import { useCanvasLines, WEEK_LANE_SPACING, WEEK_TOP_MARGIN } from '@/composables/useCanvasLines'

import AppSidebar        from '@/components/AppSidebar.vue'
import CalendarHeader    from '@/components/CalendarHeader.vue'
import CalendarCell      from '@/components/calendar/CalendarCell.vue'
import WeekScheduleCard  from '@/components/calendar/WeekScheduleCard.vue'
import WeekGraphNode     from '@/components/calendar/WeekGraphNode.vue'
import DayDetailModal    from '@/components/calendar/DayDetailModal.vue'
import NodeFormModal     from '@/components/modal/NodeFormModal.vue'
import BranchManageModal from '@/components/modal/BranchManageModal.vue'

const DAY_LABELS = ['일', '월', '화', '수', '목', '금', '토']

const store = useCalendarStore()
const { schedules, connections } = storeToRefs(store)

function toDateStr(date) { return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}` }
function parseDate(str) { if (!str) return new Date(); const [y,m,d] = str.split('-').map(Number); return new Date(y, m-1, d) }
function dateOf(str) { return new Date(str + 'T00:00:00').getDate() }

const today    = new Date()
const todayStr = toDateStr(today)

const currentView  = ref('month')
const currentYear  = ref(today.getFullYear())
const currentMonth = ref(today.getMonth() + 1)
const focusedDay   = ref(todayStr)
const selectedDay  = ref(null)
const activeTooltipId = ref(null)
const selectedSchedules = ref([])

const anchorDate = ref(new Date(today.getFullYear(), today.getMonth(), 1))

const isScheduleModalOpen = ref(false)
const isTrackModalOpen    = ref(false)
const isDayDetailOpen     = ref(false)
const dayDetailTarget     = ref(todayStr)
const modalMode           = ref('create')
const editTargetId        = ref(null)
const modalInitialForm    = ref({})

const calendarWrapper  = ref(null)
const monthScrollBody  = ref(null)
const weekSlideDir     = ref(null)
const weekGraphZone    = ref(null)
const lineCanvas       = ref(null)

const hiddenTracks = ref(new Set())
function onHiddenTracksChange(set) { hiddenTracks.value = new Set(set) }

const interactionState = ref({ hovered: null, clicked: null })
const edgeTooltip = ref({ visible: false, x: 0, y: 0, edge: null })

function onTrackHover(trackId) { interactionState.value.hovered = trackId ? { type: 'track', data: trackId } : null; }
function onNodeHover(schedule) { interactionState.value.hovered = schedule ? { type: 'node', data: schedule } : null; }

function onEdgeHover(edge, mouseEvent) {
  if (edge) {
    interactionState.value.hovered = { type: 'edge', data: edge }
    if (mouseEvent) edgeTooltip.value = { visible: true, x: mouseEvent.clientX, y: mouseEvent.clientY - 30, edge }
  } else {
    if (interactionState.value.hovered?.type === 'edge') interactionState.value.hovered = null;
    edgeTooltip.value.visible = false;
  }
}
function onEdgeClick(edge) {
  if (edge) {
    interactionState.value.clicked = { type: 'edge', data: edge }
    activeTooltipId.value = null; 
  }
}

const dimmedNodeIds = computed(() => {
  const ids = new Set();
  const { hovered, clicked } = interactionState.value;

  let activeHover = hovered;
  if (hovered && hovered.type === 'track' && hiddenTracks.value.has(hovered.data)) activeHover = null;
  if (!activeHover && !clicked) return ids;

  schedules.value.forEach(s => {
    if (hiddenTracks.value.has(s.track)) return;
    let isHL = false;

    if (activeHover) {
      if (activeHover.type === 'track') isHL = (s.track === activeHover.data);
      else if (activeHover.type === 'node') isHL = (s.id === activeHover.data.id); 
      else if (activeHover.type === 'edge') isHL = (s.id === activeHover.data.from.id || s.id === activeHover.data.to.id); 
    } else if (clicked) {
      if (clicked.type === 'node') {
        const cId = clicked.data.id;
        const cTrack = clicked.data.track;
        isHL = (s.track === cTrack);
        if (!isHL) {
          isHL = connections.value.some(c => (c.from === cId && c.to === s.id) || (c.to === cId && c.from === s.id));
        }
      } else if (clicked.type === 'edge') {
        isHL = (s.id === clicked.data.from.id || s.id === clicked.data.to.id);
      }
    }
    if (!isHL) ids.add(s.id);
  });
  return ids;
});

const { drawLines, requestDraw, startSlideAnimation } = useCanvasLines(
  calendarWrapper, lineCanvas, currentView, currentYear, currentMonth, focusedDay,
  weekGraphZone, monthScrollBody, hiddenTracks, interactionState,
  { onEdgeHover, onEdgeClick }
)

const monthCells = computed(() => {
  const cells = [];
  const start = new Date(anchorDate.value.getFullYear(), anchorDate.value.getMonth() - 6, 1);
  const startDow = start.getDay();
  const d = new Date(start);
  d.setDate(d.getDate() - startDow);

  for (let i = 0; i < 52 * 7; i++) { 
    cells.push({
      dateStr: toDateStr(d),
      month: d.getMonth() + 1,
      year: d.getFullYear()
    });
    d.setDate(d.getDate() + 1);
  }
  return cells;
})

const monthWeekCount = computed(() => monthCells.value.length / 7)

const weekDays = computed(() => {
  const d = parseDate(focusedDay.value); const dow = d.getDay()
  const start = new Date(d); start.setDate(d.getDate() - dow)
  return Array.from({ length: 7 }, (_, i) => {
    const day = new Date(start); day.setDate(start.getDate() + i); return toDateStr(day)
  })
})

const headerDateText = computed(() => {
  const y = currentYear.value, m = currentMonth.value
  if (currentView.value === 'week') return `${parseDate(focusedDay.value).getFullYear()}년 ${parseDate(focusedDay.value).getMonth()+1}월 ${Math.ceil(parseDate(focusedDay.value).getDate()/7)}주차`
  return `${y}년 ${m}월`
})

// ★ 이번 달에 일정 데이터가 있거나, 진행 중이거나, 시스템 트랙인 것만 필터에 노출 ★
const tracksInCurrentView = computed(() => {
  const datesInView = currentView.value === 'month' ? monthCells.value.map(c => c.dateStr) : weekDays.value
  const idsWithData = new Set()
  store.schedules.forEach(s => {
    if (datesInView.includes(s.day)) idsWithData.add(s.track)
  })
  
  return store.allTracks.filter(t => 
    !t.isEnded || idsWithData.has(t.id) || t.isHighlight
  )
})

function handleBackdropClick() { 
  activeTooltipId.value = null; 
  interactionState.value.clicked = null; 
}
function openDayDetailModal(dateStr) { dayDetailTarget.value = dateStr; isDayDetailOpen.value = true }
function handleCellClick(dateStr) { 
  if (selectedDay.value !== dateStr) activeTooltipId.value = null; 
  selectedDay.value = dateStr; focusedDay.value  = dateStr;
  interactionState.value.clicked = null; 
}
function handleWeekCellClick(dateStr) { 
  if (selectedDay.value !== dateStr) activeTooltipId.value = null; 
  selectedDay.value = dateStr;
  interactionState.value.clicked = null;
}

function toggleTooltip(id) {
  activeTooltipId.value = activeTooltipId.value === id ? null : id
  if (activeTooltipId.value) {
    const s = schedules.value.find(s => s.id === id)
    if (s) {
      selectedDay.value = s.day; focusedDay.value  = s.day;
      interactionState.value.clicked = { type: 'node', data: s };
    }
  } else {
    interactionState.value.clicked = null;
  }
}

let scrollTicking = false;
function handleMonthScroll(e) {
  if (!scrollTicking) {
    window.requestAnimationFrame(() => {
      const el = monthScrollBody.value;
      if (el) {
        const centerLine = el.scrollTop + el.clientHeight / 2;
        const firstCell = el.querySelector('.calendar-cell');
        if (firstCell) {
          const rowHeight = firstCell.offsetHeight || 150;
          const rowIndex = Math.floor(centerLine / rowHeight);
          const cellIndex = rowIndex * 7 + 3; 
          
          if (cellIndex >= 0 && cellIndex < monthCells.value.length) {
            const targetCell = monthCells.value[cellIndex];
            if (targetCell.month !== currentMonth.value || targetCell.year !== currentYear.value) {
              currentMonth.value = targetCell.month;
              currentYear.value  = targetCell.year;
            }
          }
        }
      }
      scrollTicking = false;
    });
    scrollTicking = true;
  }
}

function scrollToDate(dateStr, behavior = 'smooth') {
  const el = document.getElementById(`day-${dateStr}`);
  const container = monthScrollBody.value;
  if (el && container) container.scrollTo({ top: el.offsetTop - 10, behavior });
}

function navigate(dir) {
  if (currentView.value === 'month') {
    let d;
    if (dir === 'prev') d = new Date(currentYear.value, currentMonth.value - 2, 1);
    else if (dir === 'next') d = new Date(currentYear.value, currentMonth.value, 1);
    else { jumpToDate(today); return; }
    
    const el = document.getElementById(`day-${toDateStr(d)}`);
    if (el) scrollToDate(toDateStr(d), 'smooth');
    else jumpToDate(d);

  } else if (currentView.value === 'week') {
    const d = parseDate(focusedDay.value)
    if (dir === 'prev') d.setDate(d.getDate() - 7)
    else if (dir === 'next') d.setDate(d.getDate() + 7)
    else { focusedDay.value = todayStr; weekSlideDir.value = null; return }
    weekSlideDir.value = dir; focusedDay.value = toDateStr(d); currentMonth.value = d.getMonth() + 1; currentYear.value = d.getFullYear()
  }
}

function setView(v) { 
  currentView.value = v; 
  const d = parseDate(focusedDay.value); currentYear.value = d.getFullYear(); currentMonth.value = d.getMonth() + 1; 
  if (v === 'month') nextTick(() => initMonthScroll()); 
}

function jumpToDate(date) {
  anchorDate.value = date;
  currentYear.value = date.getFullYear();
  currentMonth.value = date.getMonth() + 1;
  focusedDay.value = toDateStr(date);
  selectedDay.value = toDateStr(date);
  if (currentView.value === 'month') {
    nextTick(() => scrollToDate(toDateStr(new Date(currentYear.value, currentMonth.value - 1, 1)), 'auto'));
  }
}

function openCreateModal(dateStr) { selectedDay.value = dateStr; focusedDay.value = dateStr; modalMode.value = 'create'; editTargetId.value = null; modalInitialForm.value = { day: dateStr, track: 'main', title: '', text: '', time: '09:00', tags: '', parentIds: [], childIds: [] }; isScheduleModalOpen.value = true; activeTooltipId.value = null }
function openEditModal(schedule) { focusedDay.value = schedule.day; selectedDay.value = schedule.day; modalMode.value = 'edit'; editTargetId.value = schedule.id; modalInitialForm.value = { day: schedule.day, track: schedule.track, title: schedule.tooltip?.title||'', text: schedule.text||'', time: schedule.tooltip?.time||'09:00', tags: schedule.tooltip?.tags?.join(', ')||'', parentIds: connections.value.filter(e => e.to === schedule.id).map(e => e.from), childIds: connections.value.filter(e => e.from === schedule.id).map(e => e.to) }; isScheduleModalOpen.value = true; activeTooltipId.value = null }

async function handleSaveSchedule(payload) {
  const { parentIds, childIds, ...data } = payload
  if (modalMode.value === 'create') {
    const newId = await store.createSchedule(data); store.updateConnectionsForSchedule(newId, parentIds || [], childIds || [])
  } else {
    await store.updateSchedule(editTargetId.value, data); store.updateConnectionsForSchedule(editTargetId.value, parentIds || [], childIds || [])
  }
  isScheduleModalOpen.value = false
}
async function handleDeleteSchedule(id) { if (!confirm('이 일정을 삭제하시겠습니까?')) return; await store.deleteSchedule(id); activeTooltipId.value = null }

const weekGraphHeight = computed(() => WEEK_TOP_MARGIN + (store.allTracks.length - 1) * WEEK_LANE_SPACING + WEEK_TOP_MARGIN)
const weekSlideAnimClass = computed(() => { if (!weekSlideDir.value) return ''; return weekSlideDir.value === 'next' ? 'slide-in-left' : 'slide-in-right' })
watch(weekSlideDir, (v) => { if (v) setTimeout(() => { weekSlideDir.value = null }, 340) })

const sortedAllTracks = computed(() => {
  return [...store.allTracks].sort((a,b) => {
    if(a.isHighlight && !b.isHighlight) return 1;
    if(!a.isHighlight && b.isHighlight) return -1;
    return a.index - b.index
  })
})

function deleteSelected() { if (!selectedSchedules.value.length) return; if (!confirm(`선택한 ${selectedSchedules.value.length}개의 일정을 삭제하시겠습니까?`)) return; selectedSchedules.value.forEach(id => store.deleteSchedule(id)); selectedSchedules.value = [] }

function initMonthScroll() { 
  const firstDayStr = `${currentYear.value}-${String(currentMonth.value).padStart(2,'0')}-01`;
  scrollToDate(firstDayStr, 'auto');
}

// ─────────────────────────────────────────────────────────────
// ★ 연도가 바뀔 때마다 API를 통해 공휴일을 호출
watch(currentYear, (newYear) => { store.fetchHolidaysForYear(newYear) })
onMounted(() => { 
  store.fetchHolidaysForYear(currentYear.value)
  nextTick(() => initMonthScroll()) 
})
// ─────────────────────────────────────────────────────────────

let _touchStartX = 0
function onWeekTouchStart(e) { _touchStartX = e.touches[0].clientX }
function onWeekTouchEnd(e) { const dx = e.changedTouches[0].clientX - _touchStartX; if (Math.abs(dx) > 50) navigate(dx < 0 ? 'next' : 'prev') }
</script>

<style scoped>
.edge-tooltip-popup {
  position: fixed; z-index: 9999; pointer-events: none;
  background: var(--bg-surface); border: 1px solid var(--border);
  border-radius: 8px; padding: 10px 14px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.15);
  display: flex; flex-direction: column; gap: 6px;
  transform: translate(-50%, -100%);
  margin-top: -10px;
}
.et-track { font-size: 11px; font-weight: 800; font-family: 'Escoredream', sans-serif; }
.et-nodes { display: flex; align-items: center; gap: 8px; font-size: 13px; font-weight: 600; color: var(--text-primary); font-family: 'Escoredream', sans-serif; }
.et-nodes i { color: var(--text-faint); font-size: 11px; }

.app-layout { display: flex; width: 100%; height: 100vh; overflow: hidden; background: var(--bg-base); color: var(--text-primary); font-family: 'Escoredream', system-ui, sans-serif; }
.main-content { flex: 1; display: flex; flex-direction: column; overflow: hidden; }
.calendar-area { flex: 1; overflow: hidden; background: var(--bg-base); display: flex; flex-direction: column; position: relative; }
.calendar-wrapper { position: relative; width: 100%; height: 100%; background: var(--bg-surface); display: flex; flex-direction: column; overflow: hidden; }
.calendar-header-row { display: grid; border-bottom: 1px solid var(--border); background: var(--bg-elevated); flex-shrink: 0; }
.month-dow-header { position: sticky; top: 0; z-index: 10; }
.grid-cols-7 { grid-template-columns: repeat(7, 1fr); }
.day-header { padding: 10px 0; text-align: center; font-size: 12px; font-weight: 700; color: var(--text-faint); font-family: 'Escoredream', sans-serif; }
.day-header--sat { color: var(--sat-color) !important; }
.day-header--sun { color: var(--sun-color) !important; }

.line-canvas { position: absolute; top: 0; left: 0; pointer-events: none; z-index: 2; }

.calendar-grid { display: grid; grid-template-columns: repeat(7, 1fr); position: relative; }
.floating-action-bar { position: absolute; bottom: 20px; left: 50%; transform: translateX(-50%); z-index: 200; display: flex; align-items: center; gap: 10px; padding: 8px 18px; background: var(--bg-elevated); border: 1.5px solid var(--accent); border-radius: 999px; box-shadow: 0 4px 24px rgba(0,0,0,0.3); white-space: nowrap; }
.sel-count { font-size: 13px; font-weight: 700; color: var(--accent); font-family: 'Escoredream', sans-serif; }
.btn-sel-delete { display: flex; align-items: center; gap: 5px; padding: 5px 12px; border: 1px solid #ef4444; background: rgba(239,68,68,0.08); color: #ef4444; border-radius: 7px; font-size: 12px; font-weight: 700; cursor: pointer; transition: all 0.15s; font-family: 'Escoredream', sans-serif; }
.btn-sel-delete:hover { background: #ef4444; color: #fff; }
.btn-sel-clear { background: none; border: none; color: var(--text-faint); font-size: 16px; cursor: pointer; padding: 2px 4px; line-height: 1; }
.btn-sel-clear:hover { color: var(--text-primary); }
.floatbar-enter-active { transition: all 0.18s ease; }
.floatbar-leave-active { transition: all 0.14s ease; }
.floatbar-enter-from, .floatbar-leave-to { opacity: 0; transform: translateX(-50%) translateY(8px); }

.month-scroll-body { flex: 1; overflow-y: auto; overflow-x: hidden; position: relative; scrollbar-width: thin; scrollbar-color: var(--scrollbar-thumb) var(--scrollbar-track); overscroll-behavior-y: none; scroll-behavior: auto; }
.week-wrapper { position: relative; width: 100%; border: 1px solid var(--border); border-radius: 12px; background: var(--bg-surface); box-shadow: 0 2px 16px rgba(0,0,0,0.08); display: flex; flex-direction: column; flex: 1; min-height: 0; overflow: hidden; }
.week-col-header { padding: 14px 12px 12px; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 4px; border-right: 1px solid var(--border); }
.week-col-label { font-size: 10px; font-weight: 700; color: var(--text-faint); letter-spacing: 0.08em; text-transform: uppercase; }
.week-col-date { font-size: 20px; font-weight: 800; color: var(--text-muted); font-family: 'Escoredream', sans-serif; line-height: 1; display: flex; align-items: center; gap: 5px; }
.week-col-date.is-today { color: var(--text-primary); }
.week-today-tag { font-size: 8px; font-weight: 800; color: var(--text-muted); background: rgba(168, 162, 158, 0.12); border: 1px solid rgba(168, 162, 158, 0.3); border-radius: 4px; padding: 1px 4px; letter-spacing: 0.04em; line-height: 1.5; }
.week-graph-zone { position: relative; flex-shrink: 0; border-bottom: 1px solid var(--border); background: var(--bg-base); overflow: visible;  }
.week-lane-labels { position: absolute; left: 0; top: 0; bottom: 0; width: 90px; pointer-events: none; z-index: 3; }
.week-lane-label { position: absolute; left: 8px; transform: translateY(-50%); display: flex; align-items: center; gap: 5px; font-size: 9px; font-weight: 700; font-family: 'Escoredream', sans-serif; letter-spacing: 0.03em; background: var(--bg-surface); border: 1px solid; border-radius: 999px; padding: 2px 8px 2px 5px; white-space: nowrap; opacity: 0.85; pointer-events: auto; cursor: pointer; }
.lane-dot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; }
.lane-hl-badge { font-size: 8px; margin-left: 1px; opacity: 0.8; }
.week-lane-label--highlight { border-style: dashed !important; opacity: 0.9; }
.week-lane-bg { position: absolute; left: 0; right: 0; height: 1px; transform: translateY(-50%); pointer-events: none; z-index: 0; }
.week-graph-zone::before { content: ''; position: absolute; inset: 0; background: repeating-linear-gradient( to right, transparent 0, transparent calc(100% / 7 - 1px), var(--border) calc(100% / 7 - 1px), var(--border) calc(100% / 7) ); pointer-events: none; z-index: 0; }
.week-graph-anchor { position: absolute; width: 1px; height: 1px; pointer-events: none; z-index: 0; }
.week-card-zone { display: grid; flex: 1; overflow: auto; scrollbar-width: thin; }
.week-cell { border-right: 1px solid var(--border); padding: 12px 10px 44px; background: var(--bg-surface); position: relative; display: flex; flex-direction: column; gap: 8px; transition: background 0.15s; min-height: 160px; cursor: pointer; }
.week-cell:hover          { background: var(--bg-elevated); }
.week-cell--today         { background: var(--today-bg) !important; border-top: 2px solid rgba(168, 162, 158, 0.5); }
.week-cell--selected      { background: rgba(59,130,246,0.06) !important; outline: 2px solid var(--accent); outline-offset: -2px; }
.week-cell--sat, .week-cell--sun { background: color-mix(in srgb, var(--bg-surface), var(--bg-base) 30%); }
.week-cards { display: flex; flex-direction: column; gap: 8px; }
.btn-add-week { position: absolute; bottom: 10px; right: 10px; width: 26px; height: 26px; border-radius: 7px; background: var(--bg-hover); color: var(--text-muted); border: 1px solid var(--border); cursor: pointer; font-size: 10px; display: flex; align-items: center; justify-content: center; opacity: 0; transition: all 0.15s; }
.week-cell:hover .btn-add-week { opacity: 1; }
.btn-add-week:hover { background: var(--accent); color: #fff; border-color: var(--accent); }
@keyframes slideInFromLeft { from { transform: translateX(-6%); opacity: 0.5; } to { transform: translateX(0); opacity: 1; } }
@keyframes slideInFromRight { from { transform: translateX(6%); opacity: 0.5; } to { transform: translateX(0); opacity: 1; } }
.slide-in-left  { animation: slideInFromLeft  0.32s cubic-bezier(0.25,0.46,0.45,0.94) both; }
.slide-in-right { animation: slideInFromRight 0.32s cubic-bezier(0.25,0.46,0.45,0.94) both; }
</style>