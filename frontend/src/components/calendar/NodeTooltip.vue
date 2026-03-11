<template>
  <div class="tooltip-wrapper retro-modal" @click.stop>
    <div class="tooltip-header">
      <div class="header-track retro-badge" :style="{ color: trackColor, borderColor: trackColor }">
        <span class="track-dot" :style="{ background: trackColor }"></span>
        {{ trackName }}
      </div>
      <div class="header-actions">
        <button class="action-btn" title="Edit" @click="$emit('edit')"><i class="fas fa-edit" /></button>
        <button class="action-btn action-btn-del" title="Delete" @click="$emit('delete')"><i class="fas fa-trash" /></button>
        <button class="action-btn" title="Close" @click="$emit('close')"><i class="fas fa-times" /></button>
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
defineProps({
  schedule: Object,
  trackName: String,
  trackColor: String
})
defineEmits(['edit', 'delete', 'close'])
</script>

<style scoped>
/* 💡 브루탈리즘 툴팁 팝업 스타일 */
.retro-modal {
  position: absolute;
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
  cursor: default;
}

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
</style>