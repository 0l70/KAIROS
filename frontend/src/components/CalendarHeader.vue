<template>
  <header class="calendar-header">
    <div class="header-left">
      <div class="date-nav">
        <div class="date-text-wrap" ref="dateWrapRef">
          <h2 class="date-text mech-key retro-text-hover" title="CHANGE DATE" @click="toggleDatePopover" style="padding: 6px 12px; margin: 0; font-size: 16px;">
            {{ dateText }}
            <i class="fas" :class="isPopoverOpen ? 'fa-caret-up' : 'fa-caret-down'" style="margin-left: 8px; font-size: 14px;" />
          </h2>

          <Transition name="fade-pop">
            <div v-if="isPopoverOpen" class="custom-date-popover retro-panel">
              <div class="popover-row">
                <div class="custom-sel-wrap">
                  <div class="custom-sel-display" @click="toggleSelect('year')" :class="{ active: activeSelect === 'year' }">
                    {{ selYear }} <i class="fas fa-chevron-down sel-icon"></i>
                  </div>
                  <Transition name="drop-anim">
                    <ul v-if="activeSelect === 'year'" class="custom-sel-list custom-scroll retro-panel">
                      <li v-for="y in yearOptions" :key="y" class="custom-sel-item" :class="{ selected: selYear === y }" @click="pickYear(y)">{{ y }}</li>
                    </ul>
                  </Transition>
                </div>
                <div class="custom-sel-wrap">
                  <div class="custom-sel-display" @click="toggleSelect('month')" :class="{ active: activeSelect === 'month' }">
                    {{ selMonth }} <i class="fas fa-chevron-down sel-icon"></i>
                  </div>
                  <Transition name="drop-anim">
                    <ul v-if="activeSelect === 'month'" class="custom-sel-list custom-scroll retro-panel">
                      <li v-for="m in 12" :key="m" class="custom-sel-item" :class="{ selected: selMonth === m }" @click="pickMonth(m)">{{ m }}</li>
                    </ul>
                  </Transition>
                </div>
                <div class="custom-sel-wrap">
                  <div class="custom-sel-display" @click="toggleSelect('day')" :class="{ active: activeSelect === 'day' }">
                    {{ selDay }} <i class="fas fa-chevron-down sel-icon"></i>
                  </div>
                  <Transition name="drop-anim">
                    <ul v-if="activeSelect === 'day'" class="custom-sel-list custom-scroll retro-panel">
                      <li v-for="d in daysInSelectedMonth" :key="d" class="custom-sel-item" :class="{ selected: selDay === d }" @click="pickDay(d)">{{ d }}</li>
                    </ul>
                  </Transition>
                </div>
              </div>
<<<<<<< HEAD
              <button class="btn-pop-confirm" @click="applyCustomDate">JUMP TO DATE</button>
=======
              <button class="btn-pop-confirm mech-key key-accent-1" @click="applyCustomDate">GO TO DATE</button>
>>>>>>> d9d81185ededc2b2de1631f9ff7968776e03e2e7
            </div>
          </Transition>
        </div>

        <div class="nav-controls">
<<<<<<< HEAD
          <button class="nav-btn" @click="$emit('navigate', 'prev')"><i class="fas fa-chevron-left" /></button>
          <button class="nav-btn nav-btn--text" @click="$emit('navigate', 'today')">TODAY</button>
          <button class="nav-btn" @click="$emit('navigate', 'next')"><i class="fas fa-chevron-right" /></button>
        </div>
      </div>

      <div class="view-switcher">
=======
          <button class="mech-key nav-btn" @click="$emit('navigate', 'prev')"><i class="fas fa-chevron-left" /></button>
          <button class="mech-key nav-btn nav-btn--text" @click="$emit('navigate', 'today')">TODAY</button>
          <button class="mech-key nav-btn" @click="$emit('navigate', 'next')"><i class="fas fa-chevron-right" /></button>
        </div>
      </div>

      <div class="view-switcher retro-panel" style="padding: 4px; display: flex; gap: 4px; box-shadow: 2px 2px 0 var(--border);">
>>>>>>> d9d81185ededc2b2de1631f9ff7968776e03e2e7
        <button class="view-btn" :class="{ 'view-btn--active': currentView === 'month' }" @click="$emit('change-view', 'month')">MONTH</button>
        <button class="view-btn" :class="{ 'view-btn--active': currentView === 'week' }" @click="$emit('change-view', 'week')">WEEK</button>
      </div>
    </div>

    <div class="header-right">
<<<<<<< HEAD
      <div ref="legendBtnRef" class="legend-collapse-wrap">
        <button
          class="btn-legend-toggle"
          :class="{ 'btn-legend-toggle--open': legendOpen }"
          @click="toggleLegend"
        >
          <i class="fas fa-filter" />
          <span>FILTER</span>
          <i class="fas" :class="legendOpen ? 'fa-chevron-up' : 'fa-chevron-down'" style="font-size:9px;" />
        </button>

        <Teleport to="body">
          <Transition name="legend-fade">
            <div
              v-if="legendOpen"
              ref="legendPanelRef"
              class="legend-panel-teleport"
              :style="legendPanelStyle"
            >
              <div class="legend-panel-title">
                <span>TRACK FILTER</span>
                <button class="legend-panel-close" @click="legendOpen = false">
                  <i class="fas fa-times" />
                </button>
              </div>
              <BranchLegend 
                :hidden-tracks="hiddenTracks"
                :visible-tracks="visibleTracks" 
                @update:hiddenTracks="$emit('update:hiddenTracks', $event)" 
                @hover-track="$emit('hover-track', $event)" 
              />
=======
      <div ref="legendBtnRef" class="legend-collapse-wrap" style="position: relative;">
        <button class="mech-key btn-legend-toggle" :class="{ 'key-accent-2': legendOpen }" @click="toggleLegend">
          <i class="fas fa-filter" /><span>FILTER</span>
          <i class="fas" :class="legendOpen ? 'fa-chevron-up' : 'fa-chevron-down'" style="font-size:10px;" />
        </button>

        <Transition name="legend-fade">
          <div v-if="legendOpen" ref="legendPanelRef" class="legend-panel-dropdown retro-panel">
            <div class="legend-panel-title">
              <span><i class="fas fa-filter" style="margin-right: 4px;" /> TRACK FILTER</span>
              <button class="mech-key legend-panel-close" style="padding: 2px 6px;" @click="legendOpen = false"><i class="fas fa-times" /></button>
>>>>>>> d9d81185ededc2b2de1631f9ff7968776e03e2e7
            </div>
            <BranchLegend :hidden-tracks="hiddenTracks" :visible-tracks="visibleTracks" @update:hiddenTracks="$emit('update:hiddenTracks', $event)" @hover-track="$emit('hover-track', $event)" />
          </div>
        </Transition>
      </div>

<<<<<<< HEAD
      <button class="btn-manage" @click="$emit('open-track-modal')">
        <i class="fas fa-layer-group" /><span>MANAGE</span>
      </button>

      <RouterLink to="/study-calendar" class="btn-study-cal">
        <i class="fas fa-bolt" />
        <span>STUDY LOG</span>
=======
      <button class="mech-key btn-manage retro-text-hover" @click="$emit('open-track-modal')">
        <i class="fas fa-code-branch" /><span>MANAGE</span>
      </button>

      <RouterLink to="/study-calendar" class="mech-key key-accent-1 retro-text-hover" style="text-decoration: none;">
        <i class="fas fa-gamepad" /><span>STUDY CAL</span>
>>>>>>> d9d81185ededc2b2de1631f9ff7968776e03e2e7
      </RouterLink>
    </div>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import BranchLegend from '@/components/BranchLegend.vue'
import { RouterLink } from 'vue-router'

const props = defineProps({ dateText: String, currentView: String, currentDate: Date, visibleTracks: Array })
const emit = defineEmits(['navigate', 'change-view', 'open-track-modal', 'jump-to-date', 'update:hiddenTracks', 'hover-track'])

const legendOpen = ref(false); const legendBtnRef = ref(null); const legendPanelRef = ref(null); const hiddenTracks = ref(new Set())
function toggleLegend() { legendOpen.value = !legendOpen.value }
function onDocClick(e) { const inBtn = legendBtnRef.value?.contains(e.target); const inPanel = legendPanelRef.value?.contains(e.target); if (!inBtn && !inPanel) legendOpen.value = false }

const isPopoverOpen = ref(false); const dateWrapRef = ref(null); const activeSelect = ref(null); const selYear = ref(new Date().getFullYear()); const selMonth = ref(new Date().getMonth() + 1); const selDay = ref(new Date().getDate());
const yearOptions = computed(() => { const current = new Date().getFullYear(); return Array.from({ length: 11 }, (_, i) => current - 5 + i) })
const daysInSelectedMonth = computed(() => new Date(selYear.value, selMonth.value, 0).getDate())

function toggleDatePopover() { if (!isPopoverOpen.value) { const d = props.currentDate || new Date(); selYear.value = d.getFullYear(); selMonth.value = d.getMonth() + 1; selDay.value = d.getDate() || 1; activeSelect.value = null; } isPopoverOpen.value = !isPopoverOpen.value }
function toggleSelect(type) { activeSelect.value = activeSelect.value === type ? null : type }
function pickYear(y) { selYear.value = y; activeSelect.value = null; }
function pickMonth(m) { selMonth.value = m; if (selDay.value > daysInSelectedMonth.value) selDay.value = daysInSelectedMonth.value; activeSelect.value = null; }
function pickDay(d) { selDay.value = d; activeSelect.value = null; }
function applyCustomDate() { emit('jump-to-date', new Date(selYear.value, selMonth.value - 1, selDay.value)); isPopoverOpen.value = false; activeSelect.value = null; }
function handleClickOutside(e) { if (isPopoverOpen.value && dateWrapRef.value && !dateWrapRef.value.contains(e.target)) { isPopoverOpen.value = false; activeSelect.value = null; } }

onMounted(() => { document.addEventListener('click', handleClickOutside); document.addEventListener('click', onDocClick, true) })
onUnmounted(() => { document.removeEventListener('click', handleClickOutside); document.removeEventListener('click', onDocClick, true) })
</script>

<style scoped>
<<<<<<< HEAD
.calendar-header {
  height: 64px;
  border-bottom: 2px solid var(--border);
  background: var(--bg-surface);
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 24px;
  flex-shrink: 0; z-index: 30;
  gap: 12px; font-family: 'Space Grotesk', 'Escoredream', system-ui, sans-serif;
=======
@font-face { font-family: 'NeoDunggeunmo'; src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.3/NeoDunggeunmoPro-Regular.woff2') format('woff2'); font-weight: normal; font-display: swap; }

/* 💡 FIX: z-index를 200으로 대폭 상승시켜 요일 칸 밑으로 깔리지 않게 방지 */
.calendar-header { height: 80px; border-bottom: 2px solid var(--border); background: var(--bg-surface); display: flex; align-items: center; justify-content: space-between; padding: 0 32px; flex-shrink: 0; z-index: 200; position: relative; gap: 16px; font-family: 'NeoDunggeunmo', sans-serif; }
.header-left { display: flex; align-items: center; gap: 24px; flex-shrink: 0; }
.date-nav { display: flex; align-items: center; gap: 16px; }
.header-right { display: flex; align-items: center; gap: 12px; min-width: 0; flex: 1; justify-content: flex-end; }

.retro-text-hover { transition: all 0.1s ease; display: inline-flex; }
.retro-text-hover:hover { color: var(--accent); text-shadow: 2px 2px 0px var(--border); transform: translate(-2px, -2px); box-shadow: 6px 6px 0 var(--border) !important;}
.mech-key { padding: 8px 16px; background: var(--bg-elevated); color: var(--text-primary); border: 2px solid var(--border); border-radius: 4px; box-shadow: 4px 4px 0 var(--border); cursor: pointer; font-family: 'NeoDunggeunmo', sans-serif; font-size: 14px; font-weight: 800; transition: all 0.1s; display: inline-flex; align-items: center; justify-content: center; gap: 8px; white-space: nowrap; }
.mech-key:active { transform: translate(4px, 4px); box-shadow: 0 0 0 transparent !important; }
.key-accent-1 { background: var(--accent); color: #fff !important; border-color: var(--border); }
.key-accent-2 { background: var(--text-primary); color: var(--bg-base); border-color: var(--border); }

.retro-panel { background: var(--bg-surface); border: 2px solid var(--border); box-shadow: 6px 6px 0 var(--border); border-radius: 4px; }

/* 팝오버 컨테이너 */
.date-text-wrap { position: relative; }
.custom-date-popover { position: absolute; top: 100%; left: 0; margin-top: 12px; padding: 20px; z-index: 250; display: flex; flex-direction: column; gap: 16px; min-width: 320px; background: var(--bg-elevated); }
.popover-row { display: flex; gap: 12px; }
.custom-sel-wrap { position: relative; flex: 1; }

/* 💡 FIX: 강제 검정색 제거! 라이트모드 하얀색/빨간글씨, 다크모드 검정/네온글씨 자동반영 */
.custom-sel-display { 
  padding: 10px 12px; font-size: 14px; font-weight: 800; cursor: pointer; display: flex; align-items: center; justify-content: space-between; gap: 8px; transition: all 0.2s ease; user-select: none; 
  background: var(--bg-base); color: var(--accent); border: 2px solid var(--border); border-radius: 4px; box-shadow: inset 0 2px 4px rgba(0,0,0,0.1); font-family: 'NeoDunggeunmo', monospace;
>>>>>>> d9d81185ededc2b2de1631f9ff7968776e03e2e7
}
.custom-sel-display:hover, .custom-sel-display.active { border-color: var(--accent); }
.sel-icon { font-size: 10px; transition: transform 0.2s ease; }
.custom-sel-display.active .sel-icon { transform: rotate(180deg); }

<<<<<<< HEAD
.header-left  { display: flex; align-items: center; gap: 20px; flex-shrink: 0; }
.date-nav     { display: flex; align-items: center; gap: 12px; }

.header-right {
  display: flex; align-items: center; gap: 10px; min-width: 0; flex: 1; 
  overflow-x: auto; padding-bottom: 2px;
}
.header-right > :first-child { margin-left: auto; }
.header-right > * { flex-shrink: 0; }
.header-right::-webkit-scrollbar { display: none; }

.date-text-wrap { position: relative; min-width: 150px; }

.date-text {
  font-size: 20px; font-weight: 900; color: var(--text-primary);
  cursor: pointer; display: flex; align-items: center; gap: 4px;
  border-radius: 0; padding: 4px 8px; letter-spacing: 0.05em;
  transition: background 0.15s; white-space: nowrap;
}
.date-text:hover { background: var(--text-primary); color: var(--bg-base); }

.custom-date-popover {
  position: absolute; top: 100%; left: 0; margin-top: 8px;
  background: var(--bg-base); border: 2px solid var(--text-primary);
  border-radius: 0; padding: 20px; box-shadow: 6px 6px 0 var(--text-primary);
  z-index: 100; display: flex; flex-direction: column; gap: 16px;
}

.popover-row { display: flex; gap: 12px; }

.custom-sel-wrap { position: relative; }
.custom-sel-display {
  background: transparent; border: 1px solid var(--border); color: var(--text-primary);
  padding: 10px 14px; border-radius: 0;
  font-size: 13px; font-weight: 800; cursor: pointer;
  display: flex; align-items: center; justify-content: space-between; gap: 8px;
  min-width: 95px; white-space: nowrap; transition: all 0.1s ease;
}
.custom-sel-display:hover, .custom-sel-display.active { border-color: var(--text-primary); background: var(--text-primary); color: var(--bg-base); }
.sel-icon { font-size: 10px; transition: transform 0.2s ease; }
.custom-sel-display.active .sel-icon { transform: rotate(180deg); }

.custom-sel-list {
  position: absolute; top: calc(100% + 6px); left: 0; width: 100%;
  max-height: 200px; overflow-y: auto; overflow-x: hidden;
  background: var(--bg-base); border: 2px solid var(--text-primary);
  border-radius: 0; padding: 6px; z-index: 110;
  box-shadow: 4px 4px 0 var(--text-primary); list-style: none; margin: 0;
}
.custom-sel-item {
  padding: 8px 10px; font-size: 12px; border-radius: 0; cursor: pointer;
  transition: all 0.1s; font-weight: 700; color: var(--text-primary); white-space: nowrap;
}
.custom-sel-item:hover { background: var(--text-primary); color: var(--bg-base); }
.custom-sel-item.selected { background: var(--text-primary); color: var(--bg-base); }

.btn-pop-confirm { width: 100%; background: var(--text-primary); color: var(--bg-base); border: none; padding: 12px; border-radius: 0; font-size: 13px; font-weight: 900; letter-spacing: 0.1em; cursor: pointer; transition: all 0.15s; }
.btn-pop-confirm:hover { background: transparent; color: var(--text-primary); border: 2px solid var(--text-primary); }

.nav-controls { display: flex; align-items: center; gap: 6px; }
.nav-btn { width: 34px; height: 34px; border: 1px solid var(--border); background: transparent; border-radius: 0; color: var(--text-primary); cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 12px; transition: all 0.1s; }
.nav-btn--text { width: auto; padding: 0 14px; font-size: 12px; font-weight: 800; letter-spacing: 0.05em; }
.nav-btn:hover { background: var(--text-primary); color: var(--bg-base); border-color: var(--text-primary); }

.view-switcher { display: flex; gap: 4px; background: transparent; border: 1px solid var(--border); padding: 4px; border-radius: 0; }
.view-btn { padding: 6px 16px; font-size: 12px; font-weight: 800; letter-spacing: 0.05em; border: 1px solid transparent; border-radius: 0; cursor: pointer; background: transparent; color: var(--text-muted); transition: all 0.1s; }
.view-btn:hover { color: var(--text-primary); border-color: var(--border); }
.view-btn--active { background: var(--text-primary); color: var(--bg-base); border-color: var(--text-primary); }

.btn-manage, .btn-legend-toggle, .btn-study-cal {
  display: flex; align-items: center; gap: 8px;
  padding: 10px 16px; border: 1px solid var(--border); background: transparent;
  color: var(--text-primary); border-radius: 0;
  font-size: 12px; font-weight: 800; cursor: pointer;
  transition: all 0.1s; white-space: nowrap; letter-spacing: 0.05em;
}
.btn-manage:hover, .btn-legend-toggle:hover, .btn-legend-toggle--open { background: var(--text-primary); color: var(--bg-base); }

.btn-study-cal { border: 2px solid var(--text-primary); box-shadow: 3px 3px 0 var(--text-primary); }
.btn-study-cal:hover { transform: translate(1px, 1px); box-shadow: 2px 2px 0 var(--text-primary); background: transparent; color: var(--text-primary); }

/* 모달 */
.legend-panel-teleport {
  position: absolute; z-index: 9999;
  background: var(--bg-base); border: 2px solid var(--text-primary);
  border-radius: 0; padding: 20px; 
  width: max-content; min-width: 320px;
  box-shadow: 6px 6px 0 var(--text-primary);
  display: flex; flex-direction: column; gap: 16px;
  font-family: 'Space Grotesk', 'Escoredream', system-ui, sans-serif;
}
.legend-panel-title {
  display: flex; justify-content: space-between; align-items: center;
  font-size: 14px; font-weight: 900; letter-spacing: 0.1em; color: var(--text-primary);
  border-bottom: 2px solid var(--text-primary); padding-bottom: 12px;
}
.legend-panel-close { background: none; border: none; color: var(--text-primary); font-size: 16px; cursor: pointer; transition: 0.1s; }
.legend-panel-close:hover { transform: scale(1.1); }
=======
.custom-sel-list { position: absolute; top: calc(100% + 6px); left: 0; width: 100%; max-height: 200px; overflow-y: auto; overflow-x: hidden; padding: 6px; z-index: 260; list-style: none; margin: 0; background: var(--bg-elevated); }
.custom-sel-item { padding: 8px 10px; font-size: 14px; border-radius: 4px; cursor: pointer; transition: 0.1s; font-weight: 800; color: var(--accent); text-align: center; border: 2px solid transparent;}
.custom-sel-item:hover { background: var(--bg-hover); border-color: var(--accent); transform: translate(-2px, -2px); box-shadow: 2px 2px 0 var(--border);}
.custom-sel-item.selected { background: var(--accent); color: #fff; border-color: var(--border); }
.btn-pop-confirm { width: 100%; padding: 12px; font-size: 14px; }

/* 네비게이션 & 뷰 스위처 */
.nav-controls { display: flex; align-items: center; gap: 8px; }
.nav-btn { width: 36px; height: 36px; padding: 0; }
.nav-btn--text { width: auto; padding: 0 16px; }
.view-btn { padding: 6px 16px; font-size: 12px; font-weight: 800; border: 2px solid transparent; border-radius: 2px; cursor: pointer; background: transparent; color: var(--text-muted); transition: 0.1s; font-family: 'NeoDunggeunmo', sans-serif; }
.view-btn:hover { color: var(--text-primary); background: var(--bg-hover); }
.view-btn--active { background: var(--text-primary); color: var(--bg-base); border-color: var(--border); }

/* 레전드 필터 모달 */
.legend-panel-dropdown { position: absolute; top: calc(100% + 12px); right: 0; z-index: 250; padding: 20px; width: max-content; min-width: 340px; display: flex; flex-direction: column; gap: 16px; background: var(--bg-elevated); }
.legend-panel-title { display: flex; justify-content: space-between; align-items: center; font-size: 16px; font-weight: 900; color: var(--text-primary); border-bottom: 2px dashed var(--border); padding-bottom: 12px; }

.legend-fade-enter-active, .legend-fade-leave-active { transition: all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1); }
.legend-fade-enter-from, .legend-fade-leave-to { opacity: 0; transform: translateY(-10px); }
.fade-pop-enter-active, .fade-pop-leave-active { transition: all 0.2s ease; }
.fade-pop-enter-from, .fade-pop-leave-to { opacity: 0; transform: translateY(-10px); }
.drop-anim-enter-active, .drop-anim-leave-active { transition: all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1); }
.drop-anim-enter-from, .drop-anim-leave-to { opacity: 0; transform: translateY(-6px); }

.custom-scroll::-webkit-scrollbar { width: 6px; }
.custom-scroll::-webkit-scrollbar-track { background: transparent; }
.custom-scroll::-webkit-scrollbar-thumb { background: var(--border-mid); border-radius: 0; }
>>>>>>> d9d81185ededc2b2de1631f9ff7968776e03e2e7
</style>