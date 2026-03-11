<template>
  <header class="calendar-header">
    <div class="header-left">
      <div class="date-nav">
        <div class="date-text-wrap" ref="dateWrapRef">
          <h2
            class="date-text mech-key retro-text-hover"
            title="CHANGE DATE"
            @click="toggleDatePopover"
            style="padding: 6px 12px; margin: 0; font-size: 16px;"
          >
            {{ dateText }}
            <i class="fas" :class="isPopoverOpen ? 'fa-caret-up' : 'fa-caret-down'" style="margin-left: 8px; font-size: 14px;" />
          </h2>

          <Transition name="fade-pop">
            <div v-if="isPopoverOpen" class="custom-date-popover retro-panel">
              <div class="popover-row">
                <div class="custom-sel-wrap">
                  <div class="custom-sel-display terminal-input" @click="toggleSelect('year')" :class="{ active: activeSelect === 'year' }">
                    {{ selYear }} <i class="fas fa-chevron-down sel-icon"></i>
                  </div>
                  <Transition name="drop-anim">
                    <ul v-if="activeSelect === 'year'" class="custom-sel-list custom-scroll retro-panel">
                      <li v-for="y in yearOptions" :key="y" class="custom-sel-item" :class="{ selected: selYear === y }" @click="pickYear(y)">{{ y }}</li>
                    </ul>
                  </Transition>
                </div>
                <div class="custom-sel-wrap">
                  <div class="custom-sel-display terminal-input" @click="toggleSelect('month')" :class="{ active: activeSelect === 'month' }">
                    {{ selMonth }} <i class="fas fa-chevron-down sel-icon"></i>
                  </div>
                  <Transition name="drop-anim">
                    <ul v-if="activeSelect === 'month'" class="custom-sel-list custom-scroll retro-panel">
                      <li v-for="m in 12" :key="m" class="custom-sel-item" :class="{ selected: selMonth === m }" @click="pickMonth(m)">{{ m }}</li>
                    </ul>
                  </Transition>
                </div>
                <div class="custom-sel-wrap">
                  <div class="custom-sel-display terminal-input" @click="toggleSelect('day')" :class="{ active: activeSelect === 'day' }">
                    {{ selDay }} <i class="fas fa-chevron-down sel-icon"></i>
                  </div>
                  <Transition name="drop-anim">
                    <ul v-if="activeSelect === 'day'" class="custom-sel-list custom-scroll retro-panel">
                      <li v-for="d in daysInSelectedMonth" :key="d" class="custom-sel-item" :class="{ selected: selDay === d }" @click="pickDay(d)">{{ d }}</li>
                    </ul>
                  </Transition>
                </div>
              </div>
              <button class="btn-pop-confirm mech-key key-accent-1" @click="applyCustomDate">GO TO DATE</button>
            </div>
          </Transition>
        </div>

        <div class="nav-controls">
          <button class="mech-key nav-btn" @click="$emit('navigate', 'prev')"><i class="fas fa-chevron-left" /></button>
          <button class="mech-key nav-btn nav-btn--text" @click="$emit('navigate', 'today')">TODAY</button>
          <button class="mech-key nav-btn" @click="$emit('navigate', 'next')"><i class="fas fa-chevron-right" /></button>
        </div>
      </div>

      <div class="view-switcher retro-panel" style="padding: 4px; display: flex; gap: 4px; box-shadow: 2px 2px 0 var(--border);">
        <button class="view-btn" :class="{ 'view-btn--active': currentView === 'month' }" @click="$emit('change-view', 'month')">MONTH</button>
        <button class="view-btn" :class="{ 'view-btn--active': currentView === 'week' }" @click="$emit('change-view', 'week')">WEEK</button>
      </div>
    </div>

    <div class="header-right">
      <div ref="legendBtnRef" class="legend-collapse-wrap">
        <button class="mech-key btn-legend-toggle" :class="{ 'key-accent-2': legendOpen }" @click="toggleLegend">
          <i class="fas fa-filter" /><span>FILTER</span>
          <i class="fas" :class="legendOpen ? 'fa-chevron-up' : 'fa-chevron-down'" style="font-size:10px;" />
        </button>

        <Teleport to="body">
          <Transition name="legend-fade">
            <div v-if="legendOpen" ref="legendPanelRef" class="legend-panel-teleport retro-panel" :style="legendPanelStyle">
              <div class="legend-panel-title">
                <span><i class="fas fa-filter" style="margin-right: 4px;" /> TRACK FILTER</span>
                <button class="mech-key legend-panel-close" style="padding: 2px 6px;" @click="legendOpen = false"><i class="fas fa-times" /></button>
              </div>
              <BranchLegend :hidden-tracks="hiddenTracks" :visible-tracks="visibleTracks" @update:hiddenTracks="$emit('update:hiddenTracks', $event)" @hover-track="$emit('hover-track', $event)" />
            </div>
          </Transition>
        </Teleport>
      </div>

      <button class="mech-key btn-manage retro-text-hover" @click="$emit('open-track-modal')">
        <i class="fas fa-code-branch" /><span>MANAGE</span>
      </button>

      <RouterLink to="/study-calendar" class="mech-key btn-study-cal key-accent-1 retro-text-hover" style="text-decoration: none;">
        <i class="fas fa-gamepad" /><span>STUDY CAL</span>
      </RouterLink>
    </div>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import BranchLegend from '@/components/BranchLegend.vue'
import { RouterLink } from 'vue-router'

const props = defineProps({
  dateText: { type: String, required: true }, currentView: { type: String, required: true }, currentDate: { type: Date, required: true }, visibleTracks: { type: Array, default: () => [] }
})
const emit = defineEmits(['navigate', 'change-view', 'open-track-modal', 'jump-to-date', 'update:hiddenTracks', 'hover-track'])

const legendOpen = ref(false); const legendBtnRef = ref(null); const legendPanelRef = ref(null); const legendPanelStyle = ref({}); const hiddenTracks = ref(new Set())
function toggleLegend() { legendOpen.value = !legendOpen.value; if (legendOpen.value && legendBtnRef.value) { const rect = legendBtnRef.value.getBoundingClientRect(); legendPanelStyle.value = { top: rect.bottom + 8 + 'px', right: window.innerWidth - rect.right + 'px', } } }
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
@font-face { font-family: 'NeoDunggeunmo'; src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.3/NeoDunggeunmoPro-Regular.woff2') format('woff2'); font-weight: normal; font-display: swap; }

.calendar-header { height: 80px; border-bottom: 2px solid var(--border); background: var(--bg-surface); display: flex; align-items: center; justify-content: space-between; padding: 0 32px; flex-shrink: 0; z-index: 30; gap: 16px; font-family: 'NeoDunggeunmo', sans-serif; }
.header-left { display: flex; align-items: center; gap: 24px; flex-shrink: 0; }
.date-nav { display: flex; align-items: center; gap: 16px; }
.header-right { display: flex; align-items: center; gap: 12px; min-width: 0; flex: 1; justify-content: flex-end; }

/* 💡 직관적인 레트로 텍스트 호버 (글리치 삭제) */
.retro-text-hover { transition: all 0.1s ease; display: inline-flex; }
.retro-text-hover:hover { color: var(--accent); text-shadow: 2px 2px 0px var(--border); transform: translate(-2px, -2px); box-shadow: 6px 6px 0 var(--border) !important;}

/* 기계식 버튼 */
.mech-key { padding: 8px 16px; background: var(--bg-elevated); color: var(--text-primary); border: 2px solid var(--border); border-radius: 4px; box-shadow: 4px 4px 0 var(--border); cursor: pointer; font-family: 'NeoDunggeunmo', sans-serif; font-size: 14px; font-weight: 800; transition: all 0.1s; display: inline-flex; align-items: center; justify-content: center; gap: 8px; white-space: nowrap; }
.mech-key:active { transform: translate(4px, 4px); box-shadow: 0 0 0 transparent !important; }
.key-accent-1 { background: var(--accent); color: #fff; border-color: var(--border); }
.key-accent-2 { background: var(--text-primary); color: var(--bg-base); border-color: var(--border); }

/* 패널 */
.retro-panel { background: var(--bg-surface); border: 2px solid var(--border); box-shadow: 6px 6px 0 var(--border); border-radius: 4px; }
.terminal-input { background: var(--k-key-shadow); color: var(--text-primary); border: 2px solid var(--border); border-radius: 4px; box-shadow: inset 0 4px 8px rgba(0,0,0,0.3); }

/* 팝오버 */
.date-text-wrap { position: relative; }
.custom-date-popover { position: absolute; top: 100%; left: 0; margin-top: 12px; padding: 20px; z-index: 100; display: flex; flex-direction: column; gap: 16px; min-width: 320px; }
.popover-row { display: flex; gap: 12px; }
.custom-sel-wrap { position: relative; flex: 1; }
.custom-sel-display { padding: 10px 12px; font-size: 14px; font-weight: 800; cursor: pointer; display: flex; align-items: center; justify-content: space-between; gap: 8px; transition: all 0.2s ease; user-select: none; }
.custom-sel-display:hover, .custom-sel-display.active { border-color: var(--accent); color: var(--accent); }
.sel-icon { font-size: 10px; transition: transform 0.2s ease; }
.custom-sel-display.active .sel-icon { transform: rotate(180deg); }
.custom-sel-list { position: absolute; top: calc(100% + 6px); left: 0; width: 100%; max-height: 200px; overflow-y: auto; overflow-x: hidden; padding: 6px; z-index: 110; list-style: none; margin: 0; }
.custom-sel-item { padding: 8px 10px; font-size: 14px; border-radius: 4px; cursor: pointer; transition: 0.1s; font-weight: 800; color: var(--text-primary); text-align: center; border: 2px solid transparent;}
.custom-sel-item:hover { background: var(--bg-hover); border-color: var(--border); box-shadow: 2px 2px 0 var(--border); transform: translate(-2px, -2px); }
.custom-sel-item.selected { background: var(--text-primary); color: var(--bg-base); border-color: var(--border); }
.btn-pop-confirm { width: 100%; padding: 12px; font-size: 14px; }

/* 네비게이션 버튼 */
.nav-controls { display: flex; align-items: center; gap: 8px; }
.nav-btn { width: 36px; height: 36px; padding: 0; }
.nav-btn--text { width: auto; padding: 0 16px; }

/* 뷰 스위처 */
.view-btn { padding: 6px 16px; font-size: 12px; font-weight: 800; border: 2px solid transparent; border-radius: 2px; cursor: pointer; background: transparent; color: var(--text-muted); transition: 0.1s; font-family: 'NeoDunggeunmo', sans-serif; }
.view-btn:hover { color: var(--text-primary); background: var(--bg-hover); }
.view-btn--active { background: var(--text-primary); color: var(--bg-base); border-color: var(--border); }

/* 레전드 필터 모달 */
.legend-panel-teleport { position: absolute; z-index: 9999; padding: 20px; width: max-content; min-width: 340px; display: flex; flex-direction: column; gap: 16px; }
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
</style>