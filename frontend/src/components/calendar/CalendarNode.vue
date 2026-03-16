<template>
  <div
    :id="'node-' + schedule.id"
    class="calendar-node retro-node"
    :class="{ 'is-dimmed': isDimmed, 'is-active': isTooltipOpen }"
    @click.stop="toggleTooltip"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
  >
    <div class="node-indicator" :style="{ background: trackColor }"></div>
    <div class="node-content">
      <span class="node-title">{{ schedule.text }}</span>
      <span v-if="schedule.tooltip?.time" class="node-time">{{ schedule.tooltip.time }}</span>
    </div>
    
    <NodeTooltip 
      v-if="isTooltipOpen" 
      :schedule="schedule"
      :track-name="trackName"
      :track-color="trackColor"
      @edit="$emit('edit-schedule', schedule)"
      @delete="$emit('delete-schedule', schedule.id)"
      @close="isTooltipOpen = false" 
    />
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useCalendarStore } from '@/stores/useCalendarStore'
import NodeTooltip from './NodeTooltip.vue'

const props = defineProps({
  schedule: { type: Object, required: true },
  isDimmed: { type: Boolean, default: false },
  activeTooltipId: { type: String, default: null }
})
const emit = defineEmits(['hover-node', 'toggle-tooltip', 'edit-schedule', 'delete-schedule'])

const store = useCalendarStore()
const track = computed(() => store.getTrackById(props.schedule.track))
const trackColor = computed(() => track.value?.color || '#cbd5e1')
const trackName = computed(() => track.value?.name || 'Unknown Track')

const isTooltipOpen = computed(() => props.activeTooltipId === props.schedule.id)

function toggleTooltip() { emit('toggle-tooltip', props.schedule.id) }
function onMouseEnter()  { emit('hover-node', props.schedule) }
function onMouseLeave()  { emit('hover-node', null) }
</script>

<style scoped>
@font-face { font-family: 'Mulmaru'; src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/2601-4@1.1/Mulmaru.woff2') format('woff2'); font-weight: normal; font-display: swap; }
@font-face { font-family: 'NeoDunggeunmo'; src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.3/NeoDunggeunmoPro-Regular.woff2') format('woff2'); font-weight: normal; font-display: swap; }

/* 💡 레트로 브루탈리즘 뱃지 디자인 적용 */
.retro-node {
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 10px;
  margin-bottom: 6px;
  border: 2px solid var(--border);
  background: var(--bg-elevated);
  box-shadow: 2px 2px 0 var(--border);
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.1s ease;
  z-index: 10;
}

.retro-node:hover {
  transform: translate(-2px, -2px);
  box-shadow: 4px 4px 0 var(--border);
  border-color: var(--text-primary);
}

.retro-node.is-active {
  background: var(--bg-hover);
  border-color: var(--accent);
  box-shadow: inset 0 0 0 1px var(--accent), 4px 4px 0 var(--accent);
  transform: translate(-2px, -2px);
  z-index: 50; /* 툴팁 활성화 시 최상단 유지 */
}

.is-dimmed {
  opacity: 0.3;
  filter: grayscale(0.5);
  box-shadow: 0 0 0 transparent;
}

.node-indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
  border: 1px solid var(--border);
}

.node-content {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
}

.node-title {
  font-size: 13px;
  font-weight: 800;
  color: var(--text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-family: 'Mulmaru', sans-serif;
}

.node-time {
  font-size: 10px;
  color: var(--text-muted);
  margin-top: 2px;
  font-family: 'NeoDunggeunmo', sans-serif;
}
</style>