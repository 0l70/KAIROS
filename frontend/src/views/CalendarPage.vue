<template>
  <div class="app-layout" @click="handleBackdropClick" :class="themeStore.isDark ? 'theme-dark' : 'theme-light'">
    <div class="crt-scanlines"></div>
    <div class="retro-dot-bg"></div>

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
        <div ref="calendarWrapper" class="calendar-wrapper retro-panel">
          <div class="calendar-header-row grid-cols-7 month-dow-header">
            <div v-for="(d, i) in DAY_LABELS" :key="d" class="day-header"
              :class="{ 'day-header--sat': i===6, 'day-header--sun': i===0 }">
              {{ d }}
            </div>
          </div>
          
          <div class="month-scroll-body custom-scroll" ref="monthScrollBody" @scroll.passive="handleMonthScroll">
            <div class="calendar-grid grid-cols-7" :style="{ gridAutoRows: 'var(--month-row-height, 150px)' }">
              <CalendarCell
                v-for="cell in monthCells"
                :key="cell.dateStr"
                :date-str="cell.dateStr"
                :current-month="currentMonth" 
                :schedules="store.getSchedulesForDay(cell.dateStr).filter(s => !hiddenTracks.has(s.track))"
                :active-tooltip-id="activeTooltipId"
                :is-today="cell.dateStr === todayStr"
                :is-selected="cell.dateStr === selectedDay"
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
          <div v-if="selectedSchedules.length" class="floating-action-bar retro-modal">
            <span class="sel-count">{{ selectedSchedules.length }} SELECT</span>
            <button class="btn-sel-delete mech-key key-accent-1" @click="deleteSelected"><i class="fas fa-trash" /> DEL</button>
            <button class="btn-sel-clear mech-key" @click="selectedSchedules = []"><i class="fas fa-times" /> CANCEL</button>
          </div>
        </Transition>
      </div>

      <div v-else-if="currentView === 'week'" class="calendar-area">
        <div ref="calendarWrapper" class="week-wrapper custom-scroll retro-panel"
          @wheel.passive="onWeekWheel"
          @touchstart.passive="onWeekTouchStart"
          @touchend.passive="onWeekTouchEnd">

          <div class="calendar-header-row week-grid-cols sticky-header">
            <div v-for="(day, idx) in weekDays" :key="`wh-${day}`"
              class="week-col-header"
              :class="{ 'day-header--sat': idx===6, 'day-header--sun': idx===0 }">
              <span class="week-col-label">{{ DAY_LABELS[idx] }}</span>
              <span class="week-col-date" :class="{ 'is-today text-accent-1': day === todayStr }">
                {{ dateOf(day) }}
                <span v-if="day === todayStr" class="week-today-tag retro-badge">TODAY</span>
              </span>
            </div>
          </div>

          <div ref="weekGraphZone" class="week-graph-zone" :style="{ height: weekGraphHeight + 'px' }">
            <div class="week-bg-grid week-grid-cols">
              <div v-for="i in 7" :key="`bg-col-${i}`" class="week-bg-col"></div>
            </div>
            
            <div
              v-for="(track, tIdx) in sortedAllTracks"
              :key="`lane-bg-${track.id}`"
              class="week-lane-bg"
              :style="{ top: getWeekLaneY(track.id) + 'px' }"
            />

            <div class="week-lane-labels">
              <div
                v-for="(track, tIdx) in sortedAllTracks"
                :key="track.id"
                class="week-lane-label retro-badge"
                :class="{ 'week-lane-label--highlight': track.isHighlight }"
                :style="{ top: getWeekLaneY(track.id) + 'px', color: track.color, borderColor: track.color }"
                @mouseenter="onTrackHover(track.id)"
                @mouseleave="onTrackHover(null)"
              >
                <span class="lane-dot" :style="{ background: track.color }" />
                <span class="lane-name" :title="track.name">{{ getShortTrackName(track.name) }}</span>
                <span v-if="track.isHighlight" class="lane-hl-badge">✦</span>
              </div>
            </div>

            <canvas ref="lineCanvas" class="line-canvas" />

            <template v-for="(day, colIdx) in weekDays" :key="`nodes-col-${colIdx}`">
              <WeekGraphNode
                v-for="s in store.getSchedulesForDay(day)"
                :key="s.id"
                v-show="!hiddenTracks.has(s.track)"
                :schedule="s"
                :col-idx="colIdx"
                :lane-y="getWeekLaneY(s.track)"
                :is-dimmed="dimmedNodeIds.has(s.id)"
                @hover="onNodeHover"
                @edit="openEditModal"
              />
            </template>
          </div>

          <div class="week-card-zone week-grid-cols" :class="weekSlideAnimClass">
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
                  v-show="!hiddenTracks.has(s.track)"
                  :schedule="s"
                  @edit="openEditModal"
                  @delete="handleDeleteSchedule"
                  @mouseenter="onNodeHover(s)"
                  @mouseleave="onNodeHover(null)"
                />
              </div>
              <button class="btn-add-week mech-key" @click.stop="openCreateModal(day)">
                <i class="fas fa-plus" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>

    <Transition name="fade">
      <div 
        v-if="edgeTooltip.visible" 
        class="edge-tooltip-popup retro-modal" 
        :style="{ left: edgeTooltip.x + 'px', top: edgeTooltip.baseY + 'px', transform: `translate(${edgeTooltip.translateX}, -100%)` }"
      >
        <div class="et-track" :style="{ color: edgeTooltip.edge.color }">{{ store.getTrackById(edgeTooltip.edge.track)?.name }}</div>
        <div class="et-nodes">
          <span>{{ edgeTooltip.edge.from.tooltip?.title || edgeTooltip.edge.from.text }}</span>
          <i class="fas fa-arrow-right" />
          <span>{{ edgeTooltip.edge.to.tooltip?.title || edgeTooltip.edge.to.text }}</span>
        </div>
      </div>
    </Transition>

    <NodeFormModal v-model="isScheduleModalOpen" :mode="modalMode" :initial-form="modalInitialForm" :edit-node-id="editTargetId" @save="handleSaveSchedule" />
    <BranchManageModal v-model="isTrackModalOpen" />
    <DayDetailModal v-model="isDayDetailOpen" :day-str="dayDetailTarget" :schedules="store.getSchedulesForDay(dayDetailTarget)" @add-schedule="(d) => { isDayDetailOpen = false; openCreateModal(d) }" @edit-schedule="(s) => { isDayDetailOpen = false; openEditModal(s) }" @delete-schedule="(id) => { handleDeleteSchedule(id) }" />
  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick, onMounted, onBeforeUnmount } from 'vue'
import { storeToRefs } from 'pinia'
import { useCalendarStore } from '@/stores/useCalendarStore'
import { useThemeStore } from '@/stores/useThemeStore'

import AppSidebar        from '@/components/AppSidebar.vue'
import CalendarHeader    from '@/components/CalendarHeader.vue'
import CalendarCell      from '@/components/calendar/CalendarCell.vue'
import WeekScheduleCard  from '@/components/calendar/WeekScheduleCard.vue'
import WeekGraphNode     from '@/components/calendar/WeekGraphNode.vue'
import DayDetailModal    from '@/components/calendar/DayDetailModal.vue'
import NodeFormModal     from '@/components/modal/NodeFormModal.vue'
import BranchManageModal from '@/components/modal/BranchManageModal.vue'

const WEEK_LANE_SPACING = 28;
const WEEK_TOP_MARGIN = 28;
const DAY_LABELS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'] 

const store = useCalendarStore()
const themeStore = useThemeStore()
const { schedules, connections, allTracks } = storeToRefs(store)

const today = new Date()
const todayStr = toDateStr(today)
const currentView = ref('month')
const currentYear = ref(today.getFullYear())
const currentMonth = ref(today.getMonth() + 1)
const focusedDay = ref(todayStr)
const selectedDay = ref(null)
const activeTooltipId = ref(null)
const selectedSchedules = ref([])

const currentScrollY = ref(0)
const anchorDate = ref(new Date(today.getFullYear(), today.getMonth(), 1))

const calendarWrapper = ref(null)
const monthScrollBody = ref(null)
const weekGraphZone = ref(null)
const lineCanvas = ref(null)
const weekSlideDir = ref(null)
const isScheduleModalOpen = ref(false)
const isTrackModalOpen = ref(false)
const isDayDetailOpen = ref(false)
const dayDetailTarget = ref(todayStr)
const modalMode = ref('create')
const editTargetId = ref(null)
const modalInitialForm = ref({})

const hiddenTracks = ref(new Set())
function onHiddenTracksChange(set) { hiddenTracks.value = new Set(set) }

const interactionState = ref({ hovered: null, clicked: null })
const edgeTooltip = ref({ visible: false, x: 0, baseY: 0, translateX: '-50%', edge: null })

function onTrackHover(trackId) { interactionState.value.hovered = trackId ? { type: 'track', data: trackId } : null }
function onNodeHover(schedule) { interactionState.value.hovered = schedule ? { type: 'node', data: schedule } : null }

function onEdgeHover(edge, e) {
  if (edge) {
    interactionState.value.hovered = { type: 'edge', data: edge }
    if (e) {
      const x = e.clientX; const w = window.innerWidth;
      let translateX = `-${(x / w) * 100}%`;
      edgeTooltip.value = { visible: true, x, baseY: e.clientY - 20, translateX, edge }
    }
  } else {
    if (interactionState.value.hovered?.type === 'edge') interactionState.value.hovered = null
    edgeTooltip.value.visible = false
  }
}

function jumpToNode(node) {
  const d = parseDate(node.day);
  anchorDate.value = d; currentYear.value = d.getFullYear(); currentMonth.value = d.getMonth() + 1; focusedDay.value = node.day;
  activeTooltipId.value = node.id; interactionState.value.clicked = { type: 'node', data: node };

  if (currentView.value === 'month') {
    nextTick(() => {
      setTimeout(() => {
        scrollToDate(node.day, 'smooth', 'center');
        const cellEl = document.getElementById(`day-${node.day}`);
        if (cellEl) {
          cellEl.classList.remove('flash-target'); void cellEl.offsetWidth; cellEl.classList.add('flash-target');
          setTimeout(() => cellEl.classList.remove('flash-target'), 1500);
        }
      }, 50);
    });
  }
}

function getShortTrackName(name) { if (!name) return ''; return name.trim().split(' ')[0]; }
function formatNodeDate(dateStr) { const [y, m, d] = dateStr.split('-').map(Number); return `${m}/${d}`; }

const dimmedNodeIds = computed(() => {
  const ids = new Set()
  const { hovered, clicked } = interactionState.value
  let activeHover = hovered;
  if (hovered && hovered.type === 'track' && hiddenTracks.value.has(hovered.data)) activeHover = null;
  if (!activeHover && !clicked) return ids

  schedules.value.forEach(s => {
    if (hiddenTracks.value.has(s.track)) return;
    let isHL = false
    if (activeHover) {
      if (activeHover.type === 'track') isHL = (s.track === activeHover.data)
      else if (activeHover.type === 'node') isHL = (s.id === activeHover.data.id)
      else if (activeHover.type === 'edge') isHL = (s.id === activeHover.data.from.id || s.id === activeHover.data.to.id)
    } else if (clicked) {
      if (clicked.type === 'node') {
        const cId = clicked.data.id; const cTrack = clicked.data.track;
        isHL = (s.track === cTrack);
        if (!isHL) isHL = connections.value.some(c => (c.from === cId && c.to === s.id) || (c.to === cId && c.from === s.id));
      }
      else if (clicked.type === 'edge') isHL = (s.id === clicked.data.from.id || s.id === clicked.data.to.id)
    }
    if (!isHL) ids.add(s.id)
  })
  return ids
})

// ============================================================================
// 💡 완벽하게 최적화된 캔버스 드로잉 로직 (좌표 오차 원천 차단)
// ============================================================================
const drawLines = () => {
  if (!lineCanvas.value) return;
  const ctx = lineCanvas.value.getContext('2d');
  if (!ctx) return;
  
  let scrollEl;
  if (currentView.value === 'month') scrollEl = monthScrollBody.value;
  else scrollEl = weekGraphZone.value;
  if (!scrollEl) return;

  // 캔버스 크기를 스크롤 가능한 전체 영역 크기로 맞춤
  lineCanvas.value.width = scrollEl.scrollWidth;
  lineCanvas.value.height = scrollEl.scrollHeight;
  ctx.clearRect(0, 0, lineCanvas.value.width, lineCanvas.value.height);

  const scrollRect = scrollEl.getBoundingClientRect();
  const offsetTop = scrollRect.top - scrollEl.scrollTop;
  const offsetLeft = scrollRect.left - scrollEl.scrollLeft;

  store.connections.forEach(conn => {
    const fromNode = document.getElementById(`node-${conn.from}`);
    const toNode = document.getElementById(`node-${conn.to}`);
    if (fromNode && toNode) {
      const sFrom = store.schedules.find(s => s.id === conn.from);
      const sTo = store.schedules.find(s => s.id === conn.to);
      if (!sFrom || !sTo) return;
      if (hiddenTracks.value.has(sFrom.track) || hiddenTracks.value.has(sTo.track)) return;
      
      const track = store.getTrackById(sTo.track);
      const fRect = fromNode.getBoundingClientRect();
      const tRect = toNode.getBoundingClientRect();

      let x1 = fRect.left + fRect.width / 2 - offsetLeft;
      let y1 = fRect.bottom - offsetTop;
      let x2 = tRect.left + tRect.width / 2 - offsetLeft;
      let y2 = tRect.top - offsetTop;

      ctx.beginPath();
      ctx.moveTo(x1, y1);
      
      if (currentView.value === 'week') {
        const midY = (y1 + y2) / 2;
        ctx.bezierCurveTo(x1, midY, x2, midY, x2, y2);
      } else {
        const midX = (x1 + x2) / 2;
        ctx.bezierCurveTo(midX, y1, midX, y2, x2, y2);
      }

      ctx.strokeStyle = track?.color || '#9ca3af';
      ctx.lineWidth = 2;
      ctx.globalAlpha = 0.7;
      ctx.stroke();
    }
  });
};

const requestDraw = () => { requestAnimationFrame(drawLines); };

onMounted(() => {
  store.fetchHolidaysForYear(currentYear.value); 
  nextTick(() => initMonthScroll());
  window.addEventListener('resize', requestDraw);
  setTimeout(requestDraw, 300);
});

onBeforeUnmount(() => { window.removeEventListener('resize', requestDraw); });

watch([currentView, currentYear, currentMonth, focusedDay, hiddenTracks, interactionState], () => {
  nextTick(() => { setTimeout(requestDraw, 50); });
}, { deep: true });
// ============================================================================

const monthCells = computed(() => {
  const cells = []
  const start = new Date(anchorDate.value.getFullYear(), anchorDate.value.getMonth() - 6, 1)
  const d = new Date(start)
  d.setDate(d.getDate() - d.getDay())
  for (let i = 0; i < 52 * 7; i++) {
    cells.push({ dateStr: toDateStr(d), month: d.getMonth() + 1, year: d.getFullYear() })
    d.setDate(d.getDate() + 1)
  }
  return cells
})

const tracksInCurrentView = computed(() => {
  const prefix = `${currentYear.value}-${String(currentMonth.value).padStart(2,'0')}`
  const idsWithDataInMonth = new Set()
  schedules.value.forEach(s => { if (s.day.startsWith(prefix)) idsWithDataInMonth.add(s.track) })
  return allTracks.value.filter(t => {
    if (t.isHighlight || t.id.includes('prompt') || t.id.includes('blog')) return true
    return !t.isEnded || idsWithDataInMonth.has(t.id)
  })
})

const sortedAllTracks = computed(() => {
  return [...store.allTracks].sort((a,b) => {
    if(a.isHighlight && !b.isHighlight) return 1;
    if(!a.isHighlight && b.isHighlight) return -1;
    return a.index - b.index
  })
})

const headerDateText = computed(() => `${currentYear.value} . ${String(currentMonth.value).padStart(2,'0')}`)

const weekDays = computed(() => {
  const d = parseDate(focusedDay.value)
  const day = d.getDay()
  const start = new Date(d)
  start.setDate(d.getDate() - day)
  const days = []
  for (let i = 0; i < 7; i++) {
    const cur = new Date(start)
    cur.setDate(start.getDate() + i)
    days.push(toDateStr(cur))
  }
  return days
})
const dateOf = (dateStr) => parseInt(dateStr.split('-')[2], 10)

const weekGraphHeight = computed(() => {
  let maxOffset = WEEK_TOP_MARGIN;
  let currentIdx = null;
  for (const t of sortedAllTracks.value) {
    if (currentIdx !== t.index) {
      if (currentIdx !== null) maxOffset += WEEK_LANE_SPACING;
      currentIdx = t.index;
    }
  }
  return maxOffset + WEEK_TOP_MARGIN; 
})

const getWeekLaneY = (trackId) => {
  let offset = WEEK_TOP_MARGIN;
  let currentIdx = null;
  for (const t of sortedAllTracks.value) {
    if (currentIdx !== t.index) {
      if (currentIdx !== null) offset += WEEK_LANE_SPACING;
      currentIdx = t.index;
    }
    if (t.id === trackId) return offset;
  }
  return offset;
}

const weekSlideAnimClass = computed(() => { if (!weekSlideDir.value) return ''; return weekSlideDir.value === 'next' ? 'slide-in-left' : 'slide-in-right' })
watch(weekSlideDir, (v) => { if (v) setTimeout(() => { weekSlideDir.value = null }, 340) })

let scrollTicking = false;
function handleMonthScroll(e) {
  if (e && e.target) currentScrollY.value = e.target.scrollTop;
  if (!scrollTicking) {
    window.requestAnimationFrame(() => {
      const el = monthScrollBody.value
      if (el) {
        const centerLine = el.scrollTop + el.clientHeight / 2
        const firstCell = el.querySelector('.calendar-cell')
        if (firstCell) {
          const rowHeight = firstCell.offsetHeight || 150
          const rowIndex = Math.floor(centerLine / rowHeight)
          const target = monthCells.value[rowIndex * 7 + 3]
          if (target && (target.month !== currentMonth.value || target.year !== currentYear.value)) {
            currentMonth.value = target.month; currentYear.value = target.year;
          }
        }
      }
      requestDraw();
      scrollTicking = false;
    });
    scrollTicking = true;
  }
}

function scrollToDate(dateStr, behavior = 'smooth', align = 'top') {
  const el = document.getElementById(`day-${dateStr}`);
  if (el && monthScrollBody.value) {
    let targetTop = el.offsetTop - 10;
    if (align === 'center') {
      const containerH = monthScrollBody.value.clientHeight;
      targetTop = Math.max(0, el.offsetTop - (containerH / 2) + (el.clientHeight / 2));
    }
    monthScrollBody.value.scrollTo({ top: targetTop, behavior });
    setTimeout(requestDraw, 300);
  }
}

function navigate(dir) {
  if (currentView.value === 'month') {
    let d;
    if (dir === 'prev') d = new Date(currentYear.value, currentMonth.value - 2, 1);
    else if (dir === 'next') d = new Date(currentYear.value, currentMonth.value, 1);
    else { jumpToDate(today); return; }
    const el = document.getElementById(`day-${toDateStr(d)}`);
    if (el) scrollToDate(toDateStr(d), 'smooth', 'top');
    else jumpToDate(d);
  } else if (currentView.value === 'week') {
    const d = parseDate(focusedDay.value)
    if (dir === 'prev') d.setDate(d.getDate() - 7)
    else if (dir === 'next') d.setDate(d.getDate() + 7)
    else { focusedDay.value = todayStr; return }
    weekSlideDir.value = dir; focusedDay.value = toDateStr(d); currentMonth.value = d.getMonth() + 1; currentYear.value = d.getFullYear()
  }
}

function jumpToDate(date) {
  anchorDate.value = date; currentYear.value = date.getFullYear(); currentMonth.value = date.getMonth() + 1; focusedDay.value = toDateStr(date);
  if (currentView.value === 'month') {
    nextTick(() => scrollToDate(toDateStr(new Date(currentYear.value, currentMonth.value - 1, 1)), 'auto', 'top'))
  }
}

function setView(v) { 
  currentView.value = v; currentScrollY.value = 0; 
  const d = parseDate(focusedDay.value); currentYear.value = d.getFullYear(); currentMonth.value = d.getMonth() + 1; 
  if (v === 'month') nextTick(() => initMonthScroll()); 
}

function toDateStr(d) { return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}` }
function parseDate(str) { const [y,m,d] = str.split('-').map(Number); return new Date(y, m-1, d) }

function handleBackdropClick(e) { activeTooltipId.value = null; interactionState.value.clicked = null; }

function openCreateModal(dateStr) { selectedDay.value = dateStr; focusedDay.value = dateStr; modalMode.value = 'create'; editTargetId.value = null; modalInitialForm.value = { day: dateStr, track: '', title: '', text: '', time: '09:00', tags: '', parentIds: [], childIds: [] }; isScheduleModalOpen.value = true; activeTooltipId.value = null }
function openEditModal(schedule) { 
  const t = store.allTracks.find(x => x.id === schedule.track);
  if (t && t.isEnded) { alert('종료된 트랙의 일정은 수정할 수 없습니다.'); return; }
  focusedDay.value = schedule.day; selectedDay.value = schedule.day; modalMode.value = 'edit'; editTargetId.value = schedule.id; modalInitialForm.value = { day: schedule.day, track: schedule.track, title: schedule.tooltip?.title||'', text: schedule.text||'', time: schedule.tooltip?.time||'09:00', tags: schedule.tooltip?.tags?.join(', ')||'', parentIds: connections.value.filter(e => e.to === schedule.id).map(e => e.from), childIds: connections.value.filter(e => e.from === schedule.id).map(e => e.to) }; isScheduleModalOpen.value = true; activeTooltipId.value = null 
}

function handleCellClick(dateStr) { if (selectedDay.value !== dateStr) activeTooltipId.value = null; selectedDay.value = dateStr; focusedDay.value = dateStr; interactionState.value.clicked = null;}
function handleWeekCellClick(dateStr) { if (selectedDay.value !== dateStr) activeTooltipId.value = null; selectedDay.value = dateStr; interactionState.value.clicked = null; }
function openDayDetailModal(dateStr) { dayDetailTarget.value = dateStr; isDayDetailOpen.value = true }
function toggleTooltip(id) { activeTooltipId.value = activeTooltipId.value === id ? null : id; if (activeTooltipId.value) { const s = schedules.value.find(s => s.id === id); if (s) { selectedDay.value = s.day; focusedDay.value = s.day; interactionState.value.clicked = { type: 'node', data: s }; } } else { interactionState.value.clicked = null; } }

async function handleSaveSchedule(payload) {
  const { parentIds, childIds, ...data } = payload
  if (modalMode.value === 'create') { const newId = await store.createSchedule(data); store.updateConnectionsForSchedule(newId, parentIds || [], childIds || []) } 
  else { await store.updateSchedule(editTargetId.value, data); store.updateConnectionsForSchedule(editTargetId.value, parentIds || [], childIds || []) }
  isScheduleModalOpen.value = false; setTimeout(requestDraw, 100);
}
async function handleDeleteSchedule(id) { if (!confirm('이 일정을 삭제하시겠습니까?')) return; await store.deleteSchedule(id); activeTooltipId.value = null; setTimeout(requestDraw, 100); }
function deleteSelected() { if (!selectedSchedules.value.length) return; if (!confirm(`선택한 ${selectedSchedules.value.length}개의 일정을 삭제하시겠습니까?`)) return; selectedSchedules.value.forEach(id => store.deleteSchedule(id)); selectedSchedules.value = []; setTimeout(requestDraw, 100); }

watch(currentYear, (y) => store.fetchHolidaysForYear(y))

let _touchStartX = 0; let wheelTimeout = null;
function onWeekTouchStart(e) { _touchStartX = e.touches[0].clientX }
function onWeekTouchEnd(e) { const dx = e.changedTouches[0].clientX - _touchStartX; if (Math.abs(dx) > 50) navigate(dx < 0 ? 'next' : 'prev') }
function onWeekWheel(e) {
  if (Math.abs(e.deltaX) > 20 && Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
    if (!wheelTimeout) { navigate(e.deltaX > 0 ? 'next' : 'prev'); wheelTimeout = setTimeout(() => { wheelTimeout = null }, 600); }
  }
}
</script>

<style scoped>
@font-face { font-family: 'Mulmaru'; src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/2601-4@1.1/Mulmaru.woff2') format('woff2'); font-weight: normal; font-display: swap; }
@font-face { font-family: 'NeoDunggeunmo'; src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.3/NeoDunggeunmoPro-Regular.woff2') format('woff2'); font-weight: normal; font-display: swap; }

/* ── 🎨 테마 변수 ── */
.theme-light { --k-bg: #F4F0EB; --k-housing: #E6DFD3; --k-key-bg: #FFFFFF; --k-key-border: #1A1A1A; --k-key-shadow: #1A1A1A; --k-border-main: #1A1A1A; --bg-base: #F4F0EB; --bg-surface: #E6DFD3; --bg-elevated: #FFFFFF; --border: #1A1A1A; --border-mid: #1A1A1A; --text-primary: #1A1A1A; --text-secondary: #333333; --text-muted: #555555; --text-faint: #777777; --accent: #E53935; --today-bg: rgba(229, 57, 53, 0.1); --sun-color: #E53935; --sat-color: #1E88E5; --k-acc-1-bg: #E53935; --k-acc-1-shadow: #B71C1C; --k-acc-2-bg: #1E88E5; --k-acc-2-shadow: #1565C0; --k-acc-3-bg: #43A047; --k-acc-3-shadow: #2E7D32; }
.theme-dark { --k-bg: #1A1A1A; --k-housing: #2C2C2C; --k-key-bg: #3D3D3D; --k-key-border: #000000; --k-key-shadow: #000000; --k-border-main: #000000; --bg-base: #1A1A1A; --bg-surface: #2C2C2C; --bg-elevated: #3D3D3D; --border: #000000; --border-mid: #000000; --text-primary: #F0F0F0; --text-secondary: #CCCCCC; --text-muted: #999999; --text-faint: #666666; --accent: #FF5252; --today-bg: rgba(255, 82, 82, 0.15); --sun-color: #FF5252; --sat-color: #448AFF; --k-acc-1-bg: #FF5252; --k-acc-1-shadow: #D50000; --k-acc-2-bg: #448AFF; --k-acc-2-shadow: #2962FF; --k-acc-3-bg: #69F0AE; --k-acc-3-shadow: #00E676; }

.app-layout { display: flex; width: 100%; height: 100vh; overflow: hidden; background: var(--bg-base); font-family: 'Mulmaru', sans-serif; position: relative; color: var(--text-primary); }
.main-content { flex: 1; display: flex; flex-direction: column; overflow: hidden; z-index: 10; }

.crt-scanlines { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(rgba(18,16,16,0) 50%, rgba(0,0,0,0.15) 50%); background-size: 100% 4px; z-index: 9999; pointer-events: none; opacity: 0.15; }
.theme-dark .crt-scanlines { opacity: 0.3; }
.retro-dot-bg { position: absolute; inset: 0; background-image: radial-gradient(var(--border-mid) 1px, transparent 1px); background-size: 20px 20px; opacity: 0.1; z-index: 0; pointer-events: none; }

:deep(.calendar-header) { position: relative !important; z-index: 200 !important; background: var(--k-housing); border-bottom: 2px solid var(--border); }
:deep(.app-sidebar) { border-right: 2px solid var(--border) !important; background: var(--k-housing) !important; }

.calendar-area { flex: 1; overflow: hidden; position: relative; display: flex; flex-direction: column; background: var(--bg-base); padding: 24px; }
.retro-panel-wrapper { border: 2px solid var(--border); border-radius: 4px; box-shadow: 6px 6px 0 var(--border); overflow: hidden; display: flex; flex-direction: column; background: var(--bg-surface); position: relative;}
.retro-panel { background: var(--bg-surface); border: 2px solid var(--border); box-shadow: 6px 6px 0 var(--border); border-radius: 4px; }
.retro-badge { border: 2px solid var(--border); box-shadow: 2px 2px 0 var(--border); border-radius: 4px; padding: 4px 8px; font-family: 'NeoDunggeunmo', sans-serif; font-size: 12px; background: var(--bg-elevated); color: var(--text-primary); font-weight: 800;}
.terminal-bg { background: var(--k-key-shadow); box-shadow: inset 0 4px 10px rgba(0,0,0,0.3); }

.mech-key { padding: 8px 16px; background: var(--bg-elevated); color: var(--text-primary); border: 2px solid var(--border); border-radius: 4px; box-shadow: 4px 4px 0 var(--border); cursor: pointer; font-family: 'NeoDunggeunmo', sans-serif; font-size: 14px; font-weight: 800; transition: all 0.1s; display: inline-flex; align-items: center; justify-content: center; gap: 8px; }
.mech-key:active { transform: translate(4px, 4px); box-shadow: 0 0 0 transparent; }
.key-accent-1 { background: var(--k-acc-1-bg); color: #fff !important; border-color: var(--border); }

/* 💡 FIX: 월간 뷰 헤더와 본문 너비를 100%로 꽉 채워서 완벽히 정렬 */
.calendar-header-row { display: grid; grid-template-columns: repeat(7, minmax(0, 1fr)); border-bottom: 2px solid var(--border); background: var(--bg-elevated); z-index: 90; position: sticky; top: 0; width: 100%;}
.day-header { padding: 12px 0; text-align: center; font-size: 14px; font-weight: 800; font-family: 'NeoDunggeunmo', sans-serif; color: var(--text-primary); border-right: 2px solid var(--border); }
.day-header:last-child { border-right: none; }
.day-header--sat { color: var(--sat-color) !important; }
.day-header--sun { color: var(--sun-color) !important; }

/* 💡 FIX: 본문도 width 100% 보장하여 칸 어긋남 방지 */
.month-scroll-body { flex: 1; overflow-y: auto; overflow-x: hidden; position: relative; z-index: 10; scroll-behavior: smooth; background: var(--bg-base); width: 100%; }
.calendar-grid { display: grid; grid-template-columns: repeat(7, minmax(0, 1fr)); width: 100%;}

/* 💡 FIX: 캔버스를 스크롤 바디 영역으로 가져와서 좌표 혼동 방지 */
.line-canvas { position: absolute; top: 0; left: 0; pointer-events: none; z-index: 50; filter: drop-shadow(2px 2px 0px var(--border)); }
.theme-dark .line-canvas { filter: drop-shadow(0px 0px 3px rgba(255,255,255,0.4)); }

/* 주간 뷰 */
.week-wrapper { flex: 1; display: flex; flex-direction: column; position: relative; background: var(--bg-surface); overflow-y: auto; overflow-x: hidden; }
.sticky-header { position: sticky; top: 0; z-index: 90; }
.week-grid-cols { display: grid; grid-template-columns: repeat(7, minmax(0, 1fr)); width: 100%;}
.week-col-header { padding: 16px 0; text-align: center; border-right: 2px dashed var(--border); display: flex; flex-direction: column; align-items: center; gap: 6px; }
.week-col-header:last-child { border-right: none; }
.week-col-label { font-size: 14px; font-weight: 800; font-family: 'NeoDunggeunmo', sans-serif; color: var(--text-primary); }
.week-col-date { font-size: 24px; font-weight: 900; font-family: 'NeoDunggeunmo', sans-serif; color: var(--text-secondary); display: flex; align-items: center; gap: 8px; }

.week-graph-zone { position: relative; border-bottom: 2px solid var(--border); flex-shrink: 0; z-index: 10; background: var(--bg-base); }
.week-bg-grid { position: absolute; inset: 0; pointer-events: none; z-index: 1; }
.week-bg-col { border-right: 2px dashed var(--border-mid); opacity: 0.3; }
.week-bg-col:last-child { border-right: none; }

.week-lane-bg { position: absolute; left: 0; right: 0; height: 1px; transform: translateY(-50%); z-index: 0; pointer-events: none; border-bottom: 1px dashed var(--border-mid); opacity: 0.3; }
.week-lane-labels { position: absolute; inset: 0; pointer-events: none; z-index: 45; }
.week-lane-label { position: absolute; left: 10px; transform: translateY(-50%); display: inline-flex; align-items: center; gap: 6px; background: var(--bg-elevated); font-size: 12px; font-weight: 800; font-family: 'NeoDunggeunmo', sans-serif; padding: 4px 8px; cursor: pointer; pointer-events: auto; max-width: calc((100% / 14) - 20px); }
.lane-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; border: 2px solid var(--border); }
.lane-name { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

.week-card-zone { flex: 1; background: var(--k-housing); min-height: 100%; }
.week-cell { border-right: 2px solid var(--border); padding: 16px 8px 44px; display: flex; flex-direction: column; gap: 10px; position: relative; transition: 0.15s; cursor: pointer; min-height: 100%; background: var(--bg-base); margin: 4px; border-radius: 6px; box-shadow: inset 0 2px 4px rgba(0,0,0,0.1); }
.week-cell:last-child { border-right: 2px solid var(--border); }

.custom-scroll::-webkit-scrollbar { display: none; }
.custom-scroll { -ms-overflow-style: none; scrollbar-width: none; }
</style>