<template>
  <div class="app-layout">
    <AppSidebar />

    <main class="main-content">
      <!-- 헤더 -->
      <div class="page-header">
        <span class="page-title">분석</span>
        <div class="header-right">
          <div class="period-tabs">
            <button
              v-for="p in periods" :key="p.value"
              class="period-tab"
              :class="{ active: activePeriod === p.value }"
              @click="activePeriod = p.value"
            >{{ p.label }}</button>
          </div>
          <button class="icon-btn"><i class="fas fa-bell" /></button>
          <RouterLink to="/mypage" class="avatar-btn">K</RouterLink>
        </div>
      </div>

      <div class="body fade-in">

        <!-- KPI -->
        <div class="kpi-grid">
          <div v-for="kpi in kpis" :key="kpi.label" class="kpi-card">
            <div class="kpi-icon" :style="{ background: kpi.bg, color: kpi.color }">
              <i :class="kpi.icon" />
            </div>
            <div class="kpi-info">
              <div class="kpi-value">{{ kpi.value }}</div>
              <div class="kpi-label">{{ kpi.label }}</div>
            </div>
            <div class="kpi-trend" :class="kpi.up ? 'trend-up' : 'trend-down'">
              <i :class="kpi.up ? 'fas fa-arrow-up' : 'fas fa-arrow-down'" /> {{ kpi.trend }}
            </div>
          </div>
        </div>

        <!-- 주간 학습 시간 + GitHub 커밋 -->
        <div class="two-col">
          <div class="section-card">
            <div class="card-title"><i class="fas fa-clock" /> 주간 학습 시간 <span class="card-sub-badge">이번 주</span></div>
            <div class="bar-chart">
              <div v-for="(d, i) in weekData" :key="d.day" class="bar-col">
                <div class="bar-value">{{ d.hours }}h</div>
                <div class="bar-wrap">
                  <div class="bar-fill" :class="{ 'bar-fill--today': i === todayIdx }" :style="{ height: (d.hours / maxHours * 100) + '%' }" />
                </div>
                <div class="bar-day" :class="{ 'bar-day--today': i === todayIdx }">{{ d.day }}</div>
              </div>
            </div>
            <div class="bar-summary">총 <strong>{{ totalHours }}시간</strong> · 일평균 <strong>{{ avgHours }}시간</strong></div>
          </div>

          <div class="section-card">
            <div class="card-title"><i class="fab fa-github" /> GitHub 커밋 <span class="card-sub-badge">최근 8주</span></div>
            <div class="heatmap-wrap">
              <div class="heatmap-days">
                <span v-for="d in ['월','화','수','목','금','토','일']" :key="d">{{ d }}</span>
              </div>
              <div class="heatmap-grid">
                <div v-for="(cell, i) in heatmapCells" :key="i" class="heatmap-cell" :class="`heat-${cell.level}`" :title="`${cell.date}: ${cell.count}커밋`" />
              </div>
            </div>
            <div class="heatmap-legend">
              <span>적음</span>
              <div v-for="l in [0,1,2,3,4]" :key="l" class="heatmap-cell legend-cell" :class="`heat-${l}`" />
              <span>많음</span>
            </div>
            <div class="bar-summary">이번 달 <strong>{{ monthCommits }}커밋</strong> · 연속 <strong>{{ streak }}일</strong></div>
          </div>
        </div>

        <!-- 트랙별 학습 분포 -->
        <div class="section-card">
          <div class="card-title"><i class="fas fa-chart-pie" /> 트랙별 학습 분포</div>
          <div class="track-dist">
            <div class="donut-wrap">
              <svg viewBox="0 0 140 140" class="donut-svg">
                <circle cx="70" cy="70" r="52" fill="none" stroke="var(--bg-elevated)" stroke-width="22"/>
                <circle v-for="(seg, i) in donutSegments" :key="i"
                  cx="70" cy="70" r="52" fill="none"
                  :stroke="seg.color" stroke-width="22"
                  :stroke-dasharray="`${seg.dash} ${326 - seg.dash}`"
                  :stroke-dashoffset="seg.offset"
                  stroke-linecap="round" />
                <text x="70" y="67" text-anchor="middle" class="donut-center-num">{{ totalSchedules }}</text>
                <text x="70" y="82" text-anchor="middle" class="donut-center-label">일정</text>
              </svg>
            </div>
            <div class="track-legend">
              <div v-for="t in trackStats" :key="t.name" class="track-legend-row">
                <div class="track-dot" :style="{ background: t.color }" />
                <div class="track-name">{{ t.name }}</div>
                <div class="track-bar-wrap">
                  <div class="track-bar">
                    <div class="track-bar-fill" :style="{ width: (t.count / totalSchedules * 100) + '%', background: t.color }" />
                  </div>
                </div>
                <div class="track-count">{{ t.count }}개</div>
                <div class="track-pct" :style="{ color: t.color }">{{ Math.round(t.count / totalSchedules * 100) }}%</div>
              </div>
            </div>
          </div>
        </div>

        <!-- 최근 활동 + 레이더 -->
        <div class="two-col">
          <div class="section-card">
            <div class="card-title"><i class="fas fa-history" /> 최근 학습 활동</div>
            <div class="activity-list">
              <div v-for="act in recentActivity" :key="act.title" class="activity-row">
                <div class="activity-dot" :style="{ background: act.color }" />
                <div class="activity-info">
                  <div class="activity-title">{{ act.title }}</div>
                  <div class="activity-meta">{{ act.track }} · {{ act.date }}</div>
                </div>
                <div class="activity-badge" :style="{ background: act.color + '22', color: act.color }">{{ act.tag }}</div>
              </div>
            </div>
          </div>

          <div class="section-card">
            <div class="card-title"><i class="fas fa-star" /> 기술 숙련도</div>
            <div class="radar-wrap">
              <svg viewBox="0 0 200 200" class="radar-svg">
                <polygon v-for="r in [20,40,60,80,100]" :key="r" :points="hexPoints(r)" fill="none" stroke="var(--border)" stroke-width="1"/>
                <line v-for="(_, i) in radarLabels" :key="i"
                  x1="100" y1="100"
                  :x2="100 + 100 * Math.cos((i * 60 - 90) * Math.PI / 180)"
                  :y2="100 + 100 * Math.sin((i * 60 - 90) * Math.PI / 180)"
                  stroke="var(--border)" stroke-width="1"/>
                <polygon :points="radarDataPoints" fill="rgba(129,140,248,0.18)" stroke="#818cf8" stroke-width="2" stroke-linejoin="round"/>
                <circle v-for="(pt, i) in radarDots" :key="i" :cx="pt.x" :cy="pt.y" r="4" fill="#818cf8" stroke="var(--bg-surface)" stroke-width="2"/>
                <text v-for="(lb, i) in radarLabels" :key="lb"
                  :x="100 + 112 * Math.cos((i * 60 - 90) * Math.PI / 180)"
                  :y="104 + 112 * Math.sin((i * 60 - 90) * Math.PI / 180)"
                  text-anchor="middle" class="radar-label">{{ lb }}</text>
              </svg>
            </div>
          </div>
        </div>

      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import AppSidebar from '@/components/AppSidebar.vue'
import { useCalendarStore } from '@/stores/useCalendarStore'
import { storeToRefs } from 'pinia'

const store = useCalendarStore()
const { schedules } = storeToRefs(store)

const periods = [{ label: '이번 주', value: 'week' }, { label: '이번 달', value: 'month' }, { label: '3개월', value: 'quarter' }]
const activePeriod = ref('month')

const kpis = [
  { icon: 'fas fa-fire',         bg: 'rgba(251,146,60,0.15)',  color: '#fb923c', value: '12일', label: '연속 학습',    trend: '3일',  up: true  },
  { icon: 'fas fa-clock',        bg: 'rgba(129,140,248,0.15)', color: '#818cf8', value: '47h',  label: '이번 달 학습', trend: '8h',   up: true  },
  { icon: 'fab fa-github',       bg: 'rgba(56,189,248,0.15)',  color: '#38bdf8', value: '87',   label: '이번 달 커밋', trend: '12',   up: true  },
  { icon: 'fas fa-check-circle', bg: 'rgba(16,185,129,0.15)', color: '#10b981', value: '73%',  label: '일정 완료율',  trend: '5%',   up: false },
]

const weekData = [
  { day: '월', hours: 2.5 }, { day: '화', hours: 4 }, { day: '수', hours: 3 },
  { day: '목', hours: 5.5 }, { day: '금', hours: 4.5 }, { day: '토', hours: 1.5 }, { day: '일', hours: 2 },
]
const todayIdx   = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1
const maxHours   = Math.max(...weekData.map(d => d.hours))
const totalHours = weekData.reduce((a, b) => a + b.hours, 0).toFixed(1)
const avgHours   = (totalHours / 7).toFixed(1)

const monthCommits = 87
const streak = 12
const heatmapCells = Array.from({ length: 56 }, (_, i) => {
  const d = new Date(); d.setDate(d.getDate() - (55 - i))
  const rnd = Math.random()
  return { date: `${d.getMonth()+1}/${d.getDate()}`, count: Math.floor(rnd * 8), level: rnd < 0.3 ? 0 : rnd < 0.55 ? 1 : rnd < 0.75 ? 2 : rnd < 0.9 ? 3 : 4 }
})

const trackStats = computed(() => {
  const counts = {}
  schedules.value.forEach(s => { counts[s.track] = (counts[s.track] || 0) + 1 })
  return store.allTracks.map(t => ({ name: t.name, color: t.color, count: counts[t.id] || 0 }))
    .filter(t => t.count > 0).sort((a, b) => b.count - a.count)
})
const totalSchedules = computed(() => Math.max(trackStats.value.reduce((a, b) => a + b.count, 0), 1))

const CIRC = 326
const donutSegments = computed(() => {
  let off = CIRC * 0.25
  return trackStats.value.map(t => {
    const dash = (t.count / totalSchedules.value) * CIRC
    const seg = { color: t.color, dash, offset: off }
    off -= dash
    return seg
  })
})

const recentActivity = computed(() => {
  return [...schedules.value].sort((a, b) => b.day.localeCompare(a.day)).slice(0, 6).map(s => {
    const track = store.getTrackById(s.track)
    return { title: s.tooltip?.title || s.text || '일정', track: track?.name || s.track, color: track?.color || '#818cf8', date: s.day, tag: s.tooltip?.tags?.[0] || '#학습' }
  })
})

const radarLabels = ['알고리즘', '프론트', '백엔드', 'DevOps', 'DB', 'CS기초']
const radarValues = [75, 85, 65, 50, 60, 80]

function hexPoints(r) {
  return radarLabels.map((_, i) => {
    const a = (i * 60 - 90) * Math.PI / 180
    return `${100 + r * Math.cos(a)},${100 + r * Math.sin(a)}`
  }).join(' ')
}
const radarDots = radarValues.map((v, i) => {
  const a = (i * 60 - 90) * Math.PI / 180
  return { x: 100 + v * Math.cos(a), y: 100 + v * Math.sin(a) }
})
const radarDataPoints = radarDots.map(p => `${p.x},${p.y}`).join(' ')
</script>

<style scoped>
.app-layout { display: flex; width: 100%; height: 100vh; overflow: hidden; background: var(--bg-base); color: var(--text-primary); font-family: 'Escoredream', system-ui, sans-serif; }
.main-content { flex: 1; display: flex; flex-direction: column; overflow: hidden; }

.page-header { height: 64px; background: var(--bg-surface); border-bottom: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between; padding: 0 28px; flex-shrink: 0; gap: 12px; }
.page-title { font-weight: 700; font-size: 15px; color: var(--text-primary); }
.header-right { display: flex; align-items: center; gap: 12px; }
.period-tabs { display: flex; gap: 4px; background: var(--bg-elevated); border-radius: 10px; padding: 4px; }
.period-tab { padding: 5px 14px; border-radius: 7px; border: none; cursor: pointer; font-size: 12px; font-weight: 600; color: var(--text-faint); background: transparent; transition: all 0.15s; font-family: 'Escoredream', sans-serif; }
.period-tab.active { background: var(--bg-surface); color: var(--text-primary); box-shadow: 0 1px 4px rgba(0,0,0,0.15); }
.icon-btn { background: none; border: none; cursor: pointer; color: var(--text-muted); font-size: 16px; }
.avatar-btn { width: 32px; height: 32px; border-radius: 50%; text-decoration: none; background: linear-gradient(135deg, #818cf8, #38bdf8); display: flex; align-items: center; justify-content: center; font-size: 13px; color: #fff; font-weight: 700; }

.body { flex: 1; overflow-y: auto; padding: 24px 28px; display: flex; flex-direction: column; gap: 20px; scrollbar-width: thin; scrollbar-color: var(--scrollbar-thumb) transparent; }
@keyframes fadeIn { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }
.fade-in { animation: fadeIn 0.35s ease both; }

.section-card { background: var(--bg-surface); border: 1px solid var(--border); border-radius: 16px; padding: 22px 24px; }
.card-title { display: flex; align-items: center; gap: 9px; font-weight: 700; font-size: 14px; color: var(--text-primary); margin-bottom: 20px; }
.card-title i { color: #818cf8; }
.card-sub-badge { margin-left: auto; font-size: 11px; font-weight: 500; color: var(--text-faint); background: var(--bg-elevated); border: 1px solid var(--border); border-radius: 6px; padding: 2px 9px; }

.kpi-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(190px, 1fr)); gap: 16px; }
.kpi-card { background: var(--bg-surface); border: 1px solid var(--border); border-radius: 14px; padding: 18px 20px; display: flex; align-items: center; gap: 14px; transition: border-color 0.2s; }
.kpi-card:hover { border-color: rgba(129,140,248,0.35); }
.kpi-icon { width: 44px; height: 44px; border-radius: 12px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; font-size: 18px; }
.kpi-info { flex: 1; }
.kpi-value { font-size: 22px; font-weight: 800; color: var(--text-primary); }
.kpi-label { font-size: 11px; color: var(--text-faint); margin-top: 4px; }
.kpi-trend { font-size: 11px; font-weight: 600; white-space: nowrap; }
.trend-up { color: #10b981; } .trend-down { color: #ef4444; }

.two-col { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; }

.bar-chart { display: flex; align-items: flex-end; gap: 10px; height: 140px; padding: 0 4px; margin-bottom: 14px; }
.bar-col { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 6px; }
.bar-value { font-size: 10px; font-weight: 700; color: var(--text-faint); }
.bar-wrap { flex: 1; width: 100%; display: flex; align-items: flex-end; background: var(--bg-elevated); border-radius: 6px; overflow: hidden; min-height: 8px; }
.bar-fill { width: 100%; border-radius: 6px; background: linear-gradient(180deg, #818cf8, #38bdf8); transition: height 0.7s cubic-bezier(0.34,1.56,0.64,1); }
.bar-fill--today { background: linear-gradient(180deg, #f59e0b, #fb923c); }
.bar-day { font-size: 11px; color: var(--text-faint); font-weight: 600; }
.bar-day--today { color: #f59e0b; }
.bar-summary { font-size: 12px; color: var(--text-faint); text-align: center; }
.bar-summary strong { color: var(--text-primary); }

.heatmap-wrap { display: flex; gap: 4px; margin-bottom: 10px; overflow-x: auto; }
.heatmap-days { display: flex; flex-direction: column; gap: 3px; padding-top: 2px; flex-shrink: 0; }
.heatmap-days span { font-size: 9px; color: var(--text-faint); height: 14px; line-height: 14px; }
.heatmap-grid { display: grid; grid-template-rows: repeat(7, 14px); grid-auto-columns: 14px; grid-auto-flow: column; gap: 3px; }
.heatmap-cell { width: 14px; height: 14px; border-radius: 3px; }
.heat-0 { background: var(--bg-elevated); } .heat-1 { background: rgba(129,140,248,0.25); } .heat-2 { background: rgba(129,140,248,0.45); } .heat-3 { background: rgba(129,140,248,0.7); } .heat-4 { background: #818cf8; }
.heatmap-legend { display: flex; align-items: center; gap: 4px; font-size: 10px; color: var(--text-faint); margin-bottom: 10px; }
.legend-cell { width: 14px !important; height: 14px !important; border-radius: 3px !important; }

.track-dist { display: flex; align-items: center; gap: 32px; flex-wrap: wrap; }
.donut-wrap { width: 160px; flex-shrink: 0; }
.donut-svg { width: 100%; }
.donut-center-num { font-size: 22px; font-weight: 800; fill: var(--text-primary); }
.donut-center-label { font-size: 10px; fill: var(--text-faint); }
.track-legend { flex: 1; display: flex; flex-direction: column; gap: 12px; min-width: 200px; }
.track-legend-row { display: flex; align-items: center; gap: 10px; }
.track-dot { width: 10px; height: 10px; border-radius: 3px; flex-shrink: 0; }
.track-name { font-size: 12px; color: var(--text-secondary); width: 70px; font-weight: 600; }
.track-bar-wrap { flex: 1; }
.track-bar { height: 6px; background: var(--bg-elevated); border-radius: 3px; overflow: hidden; }
.track-bar-fill { height: 100%; border-radius: 3px; transition: width 0.8s ease; }
.track-count { font-size: 11px; color: var(--text-faint); width: 28px; text-align: right; }
.track-pct { font-size: 11px; font-weight: 700; width: 32px; text-align: right; }

.activity-list { display: flex; flex-direction: column; }
.activity-row { display: flex; align-items: center; gap: 14px; padding: 12px 0; border-bottom: 1px solid var(--border); }
.activity-row:last-child { border-bottom: none; padding-bottom: 0; }
.activity-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }
.activity-info { flex: 1; min-width: 0; }
.activity-title { font-size: 13px; font-weight: 600; color: var(--text-primary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.activity-meta { font-size: 11px; color: var(--text-faint); margin-top: 2px; }
.activity-badge { font-size: 10px; font-weight: 700; padding: 3px 9px; border-radius: 6px; white-space: nowrap; flex-shrink: 0; }

.radar-wrap { display: flex; justify-content: center; }
.radar-svg { width: 100%; max-width: 220px; }
.radar-label { font-size: 9px; fill: var(--text-faint); font-family: 'Escoredream', sans-serif; }
</style>
