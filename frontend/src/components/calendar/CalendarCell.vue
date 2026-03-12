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

// 💡 안전한 필터링: props.hiddenTracks가 존재할 때만 .has() 실행
const filteredSchedules = computed(() => {
  if (!props.hiddenTracks) return props.schedules;
  return props.schedules.filter(s => !props.hiddenTracks.has(s.track))
})

const MAX_VISIBLE = 3
const visibleSchedules = computed(() => filteredSchedules.value.slice(0, MAX_VISIBLE))
const hiddenCount = computed(() => Math.max(0, filteredSchedules.value.length - MAX_VISIBLE))
</script>

<style scoped>
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

/* 반짝임 이펙트 */
@keyframes targetFlash { 0% { background-color: var(--today-bg); box-shadow: inset 0 0 0 4px var(--accent); } 100% { background-color: transparent; box-shadow: inset 0 0 0 0px transparent; } }
:deep(.flash-target) { animation: targetFlash 1.2s ease-out; }

.custom-scroll::-webkit-scrollbar { display: none; }
</style>