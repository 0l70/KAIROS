<template>
  <div
    class="calendar-cell retro-cell"
    :class="{ 'is-today': isToday, 'is-other-month': !isCurrentMonth, 'is-selected': isSelected }"
    @click="$emit('cell-click', dateStr)"
  >
    <div class="cell-header">
      <span class="cell-date" :class="{ 'text-accent-1': isToday }">{{ dayNum }}</span>
      <button class="mech-key-small btn-add-schedule" @click.stop="$emit('add-schedule', dateStr)">
        <i class="fas fa-plus"></i>
      </button>
    </div>
<<<<<<< HEAD

    <Transition name="chips-fade">
      <div v-if="labelSchedules.length && isAllTracksHidden" class="label-cluster">
        <div
          v-for="s in labelSchedules" :key="s.id"
          class="schedule-label-chip"
          :style="{ color: trackColor(s.track), borderColor: trackColor(s.track), background: 'transparent' }"
          @click.stop="$emit('toggle-tooltip', s.id)"
          @mouseenter="$emit('hover-node', s)"
          @mouseleave="$emit('hover-node', null)"
        >{{ s.text }}</div>
=======
    
    <div class="cell-body custom-scroll">
      <CalendarNode
        v-for="s in visibleSchedules"
        :key="s.id"
        :schedule="s"
        :is-dimmed="dimmedNodeIds.has(s.id)"
        :active-tooltip-id="activeTooltipId"
        @toggle-tooltip="$emit('toggle-tooltip', $event)"
        @edit-schedule="$emit('edit-schedule', $event)"
        @delete-schedule="$emit('delete-schedule', $event)"
        @hover-node="$emit('hover-node', $event)"
      />
      <div
        v-if="hiddenCount > 0"
        class="more-badge retro-badge"
        @click.stop="$emit('day-detail', dateStr)"
      >
        +{{ hiddenCount }} MORE
>>>>>>> d9d81185ededc2b2de1631f9ff7968776e03e2e7
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import CalendarNode from './CalendarNode.vue'

const props = defineProps({
  dateStr: String,
  currentMonth: Number,
  schedules: { type: Array, default: () => [] },
  activeTooltipId: String,
  isToday: Boolean,
  isSelected: Boolean,
  // 💡 FIX: undefined 에러를 방지하기 위해 기본값을 빈 Set으로 설정합니다!
  hiddenTracks: { type: Object, default: () => new Set() },
  dimmedNodeIds: { type: Object, default: () => new Set() },
})

defineEmits(['cell-click', 'add-schedule', 'toggle-tooltip', 'edit-schedule', 'delete-schedule', 'day-detail', 'hover-node'])

const dayNum = computed(() => parseInt(props.dateStr.split('-')[2], 10))
const isCurrentMonth = computed(() => { const [, m] = props.dateStr.split('-').map(Number); return m === props.currentMonth })

<<<<<<< HEAD
const parsed = computed(() => { const [y, m, d] = props.dateStr.split('-').map(Number); return { y, m, d, date: new Date(y, m-1, d) } })
const dayNum         = computed(() => parsed.value.d)
const dayOfWeek      = computed(() => parsed.value.date.getDay())
const isCurrentMonth = computed(() => parsed.value.m === props.currentMonth)
const labelSchedules = computed(() => props.schedules.filter(s => s.text))

const holidayName = computed(() => store.getHoliday(props.dateStr))
const isHoliday = computed(() => !!holidayName.value)

function trackColor(id) { return store.getTrackById(id)?.color || 'var(--text-primary)' }
function handleCellClick() { emit('toggle-tooltip', null); emit('cell-click', props.dateStr) }

const totalTrackCount = computed(() => {
  const list = store.allTracks || []
  let count = list.length
  if (!list.some(t => t.id === 'hl_prompt' || t.name?.includes('프롬프트'))) count++
  if (!list.some(t => t.id === 'hl_blog' || t.name?.includes('블로그'))) count++
  return count
=======
// 💡 안전한 필터링: props.hiddenTracks가 존재할 때만 .has() 실행
const filteredSchedules = computed(() => {
  if (!props.hiddenTracks) return props.schedules;
  return props.schedules.filter(s => !props.hiddenTracks.has(s.track))
>>>>>>> d9d81185ededc2b2de1631f9ff7968776e03e2e7
})

const MAX_VISIBLE = 3
const visibleSchedules = computed(() => filteredSchedules.value.slice(0, MAX_VISIBLE))
const hiddenCount = computed(() => Math.max(0, filteredSchedules.value.length - MAX_VISIBLE))
</script>

<style scoped>
<<<<<<< HEAD
.calendar-cell {
  position: relative; border-bottom: 1px solid var(--border); border-right:  1px solid var(--border);
  display: flex; flex-direction: column; padding: 8px; background: var(--bg-base);
  transition: background 0.1s; cursor: pointer; overflow: visible;
}
.calendar-cell:hover { background: var(--bg-hover); }
.calendar-cell:hover .btn-add-schedule { opacity: 1; }

/* Brutalism 투데이 강조 */
.cell--today { background: var(--bg-base) !important; border-top: 3px solid var(--text-primary); }
.wrapper--today { display: flex; align-items: center; gap: 6px; }
.date--today { 
  color: var(--bg-base) !important; 
  background: var(--text-primary) !important; 
  border-radius: 0; width: 24px; height: 24px; 
  display: flex; align-items: center; justify-content: center; 
  font-weight: 900 !important; 
}
.today-tag { 
  font-size: 9px; font-weight: 900; 
  color: var(--bg-base); background: var(--text-primary); 
  border: 1px solid var(--text-primary); 
  border-radius: 0; padding: 2px 6px; letter-spacing: 0.1em; 
}

.cell--selected { background: var(--bg-hover) !important; outline: 2px solid var(--text-primary); outline-offset: -2px; }
.cell--selected .date-label:not(.date--today) { color: var(--text-primary) !important; font-weight: 900 !important; }

/* ★ 토/일요일 색상 적용 (공휴일이 아닐 때만 파란색/빨간색 적용) */
.cell--sat .date-label:not(.date--holiday) { color: #2563eb !important; font-weight: 800; }
.cell--sun .date-label:not(.date--holiday) { color: #dc2626 !important; font-weight: 800; }

/* ★ 공휴일은 토/일 무관하게 무조건 빨간색 적용 */
.date--holiday { color: #dc2626 !important; font-weight: 900 !important; }
.holiday-name { font-size: 10px; font-weight: 800; color: #dc2626; font-family: 'Escoredream', sans-serif; letter-spacing: -0.04em; margin-top: 2px; }

.cell--other-month { background: var(--bg-surface) !important; cursor: default; }
.cell--other-month:hover { background: var(--bg-surface) !important; }
.cell--other-month .date-label { opacity: 0.3; font-weight: 600; }
.cell--other-month .holiday-name { opacity: 0.3; }
.cell--other-month .btn-add-schedule { display: none; }
=======
@font-face { font-family: 'NeoDunggeunmo'; src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.3/NeoDunggeunmoPro-Regular.woff2') format('woff2'); font-weight: normal; font-display: swap; }

/* 💡 브루탈리즘 달력 셀 */
.retro-cell {
  position: relative;
  display: flex;
  flex-direction: column;
  background: var(--bg-surface);
  border-right: 2px solid var(--border);
  border-bottom: 2px solid var(--border);
  padding: 8px;
  min-height: var(--month-row-height, 150px);
  transition: filter 0.1s ease;
  cursor: pointer;
}
.retro-cell:hover { filter: brightness(0.95); }

/* 셀 우측/하단 테두리 제거 (달력 껍데기에서 처리함) */
.retro-cell:nth-child(7n) { border-right: none; }
.retro-cell:nth-last-child(-n+7) { border-bottom: none; }

.is-other-month .cell-date { color: var(--text-faint) !important; opacity: 0.5; }
.is-selected { background: var(--bg-elevated); outline: 4px solid var(--accent); outline-offset: -4px; z-index: 2; }
.is-selected .cell-date { color: var(--accent); }
.is-today { background: var(--today-bg); }

.cell-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px; }
.cell-date { font-size: 16px; font-weight: 800; font-family: 'NeoDunggeunmo', sans-serif; color: var(--text-primary); padding: 4px; }
.text-accent-1 { color: var(--accent); }
.is-today .cell-date { background: var(--accent); color: #fff; border: 2px solid var(--border); border-radius: 4px; box-shadow: 2px 2px 0 var(--border); }

/* 추가 버튼 */
.btn-add-schedule { opacity: 0; }
.retro-cell:hover .btn-add-schedule { opacity: 1; }
.mech-key-small { padding: 4px 8px; background: var(--bg-elevated); color: var(--text-primary); border: 2px solid var(--border); border-radius: 4px; box-shadow: 2px 2px 0 var(--border); cursor: pointer; transition: 0.1s; }
.mech-key-small:active { transform: translate(2px, 2px); box-shadow: 0 0 0 transparent; }

.cell-body { flex: 1; display: flex; flex-direction: column; gap: 4px; overflow-y: auto; overflow-x: hidden; }
.more-badge { font-size: 10px; text-align: center; cursor: pointer; transition: 0.1s; margin-top: 2px; }
.more-badge:hover { color: var(--accent); border-color: var(--accent); transform: translate(-1px, -1px); box-shadow: 3px 3px 0 var(--accent); }
.retro-badge { border: 2px solid var(--border); background: var(--bg-elevated); padding: 2px 6px; border-radius: 4px; font-family: 'NeoDunggeunmo', sans-serif; font-weight: 800; box-shadow: 2px 2px 0 var(--border); }
>>>>>>> d9d81185ededc2b2de1631f9ff7968776e03e2e7

/* 반짝임 이펙트 */
@keyframes targetFlash { 0% { background-color: var(--today-bg); box-shadow: inset 0 0 0 4px var(--accent); } 100% { background-color: transparent; box-shadow: inset 0 0 0 0px transparent; } }
:deep(.flash-target) { animation: targetFlash 1.2s ease-out; }

<<<<<<< HEAD
.date-label { font-size: 13px; font-weight: 700; color: var(--text-primary); font-family: 'Escoredream', sans-serif; line-height: 1; min-width: 22px; text-align: center; transition: color 0.1s; }

.btn-add-schedule { 
  width: 20px; height: 20px; border-radius: 0; 
  background: transparent; color: var(--text-primary); 
  border: 1px solid var(--text-primary); cursor: pointer; 
  display: flex; align-items: center; justify-content: center; 
  font-size: 10px; opacity: 0; transition: all 0.1s; 
}
.btn-add-schedule:hover { background: var(--text-primary); color: var(--bg-base); }

.label-cluster { display: flex; flex-direction: column; gap: 4px; margin-top: 2px; margin-bottom: 4px; z-index: 25; position: relative; flex-shrink: 0; }
.schedule-label-chip { 
  font-size: 10px; font-weight: 800; padding: 4px 8px; border-radius: 0; 
  border: 1px solid currentColor; cursor: pointer; white-space: nowrap; 
  font-family: 'Escoredream', sans-serif; width: 100%; box-sizing: border-box; 
  overflow: hidden; text-overflow: ellipsis; text-align: left; 
  transition: transform 0.1s ease, box-shadow 0.1s ease; 
}
.schedule-label-chip:hover { transform: translate(-2px, -2px); box-shadow: 2px 2px 0 currentColor; }

.chips-fade-enter-active { transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1); }
.chips-fade-leave-active { transition: all 0.15s ease; }
.chips-fade-enter-from, .chips-fade-leave-to { opacity: 0; transform: translateY(-8px); }
=======
.custom-scroll::-webkit-scrollbar { display: none; }
>>>>>>> d9d81185ededc2b2de1631f9ff7968776e03e2e7
</style>