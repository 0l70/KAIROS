<template>
  <div class="tooltip-wrapper retro-modal" @click.stop>
    <div class="tooltip-header">
      <div class="header-track retro-badge" :style="{ color: trackColor, borderColor: trackColor }">
        <span class="track-dot" :style="{ background: trackColor }"></span>
        {{ trackName }}
      </div>
<<<<<<< HEAD
      <div class="tooltip-title">{{ tooltip.title }}</div>
      <div v-if="tooltip.tags?.length" class="tooltip-tags">
        <span v-for="(tag, i) in tooltip.tags" :key="i" class="tooltip-tag">{{ tag }}</span>
      </div>
      <div class="tooltip-actions">
        <button class="tooltip-btn tooltip-btn--edit" @click.stop="$emit('edit')">
          EDIT
        </button>
        <button class="tooltip-btn tooltip-btn--delete" @click.stop="$emit('delete')">
          DELETE
        </button>
=======
      <div class="header-actions">
        <button class="action-btn" title="Edit" @click="$emit('edit')"><i class="fas fa-edit" /></button>
        <button class="action-btn action-btn-del" title="Delete" @click="$emit('delete')"><i class="fas fa-trash" /></button>
        <button class="action-btn" title="Close" @click="$emit('close')"><i class="fas fa-times" /></button>
>>>>>>> d9d81185ededc2b2de1631f9ff7968776e03e2e7
      </div>
    </div>

    <div class="tooltip-body terminal-bg">
      <div class="detail-row">
        <i class="fas fa-calendar-day detail-icon" />
        <span class="detail-text">{{ schedule.day }}</span>
      </div>
      <div class="detail-row" v-if="schedule.tooltip?.time">
        <i class="fas fa-clock detail-icon" />
        <span class="detail-text">{{ schedule.tooltip.time }}</span>
      </div>
      
      <div class="title-wrap">
        <h4 class="tooltip-title">{{ schedule.tooltip?.title || schedule.text }}</h4>
      </div>

      <div class="tags-wrap" v-if="schedule.tooltip?.tags?.length">
        <span v-for="tag in schedule.tooltip.tags" :key="tag" class="tag-chip retro-badge text-accent-1">#{{ tag }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
<<<<<<< HEAD
import { ref, watch, nextTick } from 'vue'

const props = defineProps({
  visible: { type: Boolean, required: true },
  tooltip: { type: Object,  required: true }
})
defineEmits(['edit', 'delete'])

const tooltipEl = ref(null)
const posStyle  = ref({})

watch(() => props.visible, async (val) => {
  if (!val) { posStyle.value = {}; return }
  await nextTick()

  const el = tooltipEl.value
  if (!el) return

  const nodeEl  = el.parentElement   
  const cellEl  = nodeEl?.closest('.calendar-cell')
  const gridEl  = nodeEl?.closest('.calendar-grid')
  const scrollBody = nodeEl?.closest('.month-scroll-body')

  if (!cellEl || !gridEl) {
    posStyle.value = { bottom: '28px', left: '50%', transform: 'translateX(-50%)' }
    return
  }

  const gridRect = gridEl.getBoundingClientRect()
  const cellRect = cellEl.getBoundingClientRect()
  
  // ★ 스크롤 컨테이너의 기준 좌표 가져오기 (없으면 body 기준)
  const scrollRect = scrollBody ? scrollBody.getBoundingClientRect() : { top: 0 }

  // 가로 위치 (0~6 컬럼)
  const colW   = gridRect.width / 7
  const colIdx = Math.round((cellRect.left - gridRect.left) / colW)

  // ★ 세로 방향 결정 로직:
  // 셀의 top 좌표가 스크롤 영역의 최상단에서 220px(약 1~2줄 높이) 이내라면 무조건 아래로 펼침
  const showBelow = (cellRect.top - scrollRect.top) < 220

  let horizStyle = {}
  if (colIdx === 0) {
    horizStyle = { left: '0', right: 'auto', transform: 'none' }
  } else if (colIdx >= 6) {
    horizStyle = { right: '0', left: 'auto', transform: 'none' }
  } else {
    horizStyle = { left: '50%', right: 'auto', transform: 'translateX(-50%)' }
  }

  const vertStyle = showBelow
    ? { top: '24px', bottom: 'auto' }
    : { bottom: '24px', top: 'auto' }

  posStyle.value = { ...vertStyle, ...horizStyle }
=======
defineProps({
  schedule: Object,
  trackName: String,
  trackColor: String
>>>>>>> d9d81185ededc2b2de1631f9ff7968776e03e2e7
})
defineEmits(['edit', 'delete', 'close'])
</script>

<style scoped>
/* 💡 브루탈리즘 툴팁 팝업 스타일 */
.retro-modal {
  position: absolute;
<<<<<<< HEAD
  width: 220px;
  background: var(--bg-base);
  border: 2px solid var(--text-primary);
  border-radius: 0; /* 직각 형태 */
  padding: 16px;
  box-shadow: 6px 6px 0 var(--text-primary); /* 강력한 단색 그림자 */
  z-index: 200;
=======
  top: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%);
  width: 280px;
  background: var(--bg-surface);
  border: 2px solid var(--border);
  box-shadow: 6px 6px 0 var(--border);
  border-radius: 6px;
  z-index: 100;
  font-family: 'Mulmaru', sans-serif;
>>>>>>> d9d81185ededc2b2de1631f9ff7968776e03e2e7
  cursor: default;
  font-family: 'Space Grotesk', 'Escoredream', system-ui, sans-serif;
}

<<<<<<< HEAD
.tooltip-time-row {
  display: flex; align-items: center; gap: 6px;
  font-size: 11px; font-weight: 800;
  color: var(--text-muted); font-family: monospace;
  margin-bottom: 10px; border-bottom: 1px solid var(--border); padding-bottom: 6px;
}
.tooltip-title {
  font-weight: 900; color: var(--text-primary);
  font-size: 14px; line-height: 1.4; margin-bottom: 12px;
  letter-spacing: 0.05em;
}
.tooltip-tags {
  display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 16px;
}
.tooltip-tag {
  background: transparent; color: var(--text-primary);
  font-size: 9px; font-weight: 800; letter-spacing: 0.05em;
  padding: 4px 8px; border-radius: 0;
  border: 1px solid var(--text-primary);
}
.tooltip-actions {
  display: flex; gap: 8px;
}
.tooltip-btn {
  flex: 1; font-size: 11px; font-weight: 900; letter-spacing: 0.1em;
  border: 2px solid var(--text-primary); border-radius: 0; cursor: pointer;
  background: transparent; color: var(--text-primary);
  display: flex; align-items: center; justify-content: center;
  gap: 6px; padding: 8px 0; transition: all 0.1s;
}
.tooltip-btn--edit:hover {
  background: var(--text-primary); color: var(--bg-base);
  transform: translate(-2px, -2px); box-shadow: 4px 4px 0 var(--text-primary);
}

/* 삭제 버튼 포인트 컬러 유지 */
.tooltip-btn--delete {
  border-color: #ef4444; color: #ef4444;
}
.tooltip-btn--delete:hover {
  background: #ef4444; color: var(--bg-base);
  transform: translate(-2px, -2px); box-shadow: 4px 4px 0 #ef4444;
}

.tooltip-fade-enter-active, .tooltip-fade-leave-active { transition: all 0.1s ease; }
.tooltip-fade-enter-from, .tooltip-fade-leave-to { opacity: 0; }
=======
/* 말풍선 꼬리 (삼각형) */
.retro-modal::before {
  content: '';
  position: absolute;
  top: -8px;
  left: 50%;
  transform: translateX(-50%);
  border-width: 0 8px 8px 8px;
  border-style: solid;
  border-color: transparent transparent var(--border) transparent;
}

.tooltip-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 2px dashed var(--border);
  background: var(--bg-elevated);
  border-radius: 6px 6px 0 0;
}

.retro-badge {
  border: 2px solid var(--border);
  background: var(--bg-surface);
  padding: 4px 8px;
  border-radius: 4px;
  font-family: 'NeoDunggeunmo', sans-serif;
  font-size: 11px;
  font-weight: 800;
  display: flex;
  align-items: center;
  gap: 6px;
}

.track-dot { width: 8px; height: 8px; border-radius: 50%; border: 1px solid var(--border); }

.header-actions { display: flex; gap: 8px; }
.action-btn { background: none; border: none; color: var(--text-muted); cursor: pointer; font-size: 14px; transition: 0.1s; padding: 4px; }
.action-btn:hover { color: var(--text-primary); transform: scale(1.2); }
.action-btn-del:hover { color: var(--accent); }

.tooltip-body { padding: 16px; display: flex; flex-direction: column; gap: 12px; }
.terminal-bg { background: var(--k-key-shadow); box-shadow: inset 0 2px 4px rgba(0,0,0,0.2); border-radius: 0 0 4px 4px; color: var(--text-primary); }

.detail-row { display: flex; align-items: center; gap: 8px; font-size: 13px; font-family: 'NeoDunggeunmo', sans-serif; color: var(--text-muted); }
.detail-icon { font-size: 12px; width: 14px; text-align: center; color: var(--text-primary); }

.title-wrap { margin-top: 4px; }
.tooltip-title { font-size: 16px; font-weight: 800; margin: 0; color: var(--text-primary); line-height: 1.4; }

.tags-wrap { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 4px; }
.tag-chip { padding: 2px 6px; font-size: 10px; background: var(--bg-elevated); }
.text-accent-1 { color: var(--accent); }
>>>>>>> d9d81185ededc2b2de1631f9ff7968776e03e2e7
</style>