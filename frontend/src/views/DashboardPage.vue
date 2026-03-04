<template>
  <div class="app-layout">
    <AppSidebar />

    <main class="main-content">
      <!-- Top header -->
      <div class="page-header">
        <span class="page-title">분석 대시보드</span>
        <div class="header-right">
          <button class="icon-btn"><i class="fas fa-bell" /></button>
          <RouterLink to="/mypage" class="avatar-btn">K</RouterLink>
        </div>
      </div>

      <div class="dashboard-body fade-in">

        <!-- 사용자 카드 -->
        <div class="user-card">
          <div class="user-avatar">
            <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Kairos" alt="avatar" />
          </div>
          <div>
            <h1>김철수님</h1>
            <p class="user-sub">분석 완료일: 2026년 3월 3일</p>
          </div>
        </div>

        <!-- 스탯 카드 -->
        <div class="stats-grid">
          <div v-for="stat in stats" :key="stat.label" class="stat-card">
            <div class="stat-value">{{ stat.value }}</div>
            <div class="stat-label">{{ stat.label }}</div>
            <div class="stat-badge"><i :class="stat.icon" /></div>
          </div>
        </div>

        <!-- 기술 스택 분포 -->
        <div class="section-card">
          <div class="section-card-header">
            <span>기술 스택 분포</span>
            <button class="btn-sm">내보내기</button>
          </div>
          <div class="chart-placeholder">
            <i class="fas fa-chart-bar" />
            <span>기술 스택 차트</span>
            <small>카테고리별 기술 분포 그래프</small>
          </div>
          <div class="chart-legend">
            <div v-for="l in legend" :key="l.label" class="legend-item">
              <div class="legend-dot" :style="{ background: l.color }" />
              {{ l.label }}
            </div>
          </div>
        </div>

        <!-- 상세 기술 목록 -->
        <div class="section-card">
          <div class="section-card-header"><span>상세 기술 목록</span></div>
          <div class="skill-list">
            <div v-for="skill in skills" :key="skill.name" class="skill-row">
              <div class="skill-meta">
                <div class="skill-emoji">{{ skill.emoji }}</div>
                <div>
                  <div class="skill-name">{{ skill.name }}</div>
                  <div class="skill-desc">{{ skill.desc }}</div>
                </div>
              </div>
              <div class="skill-bar-wrap">
                <div class="skill-bar">
                  <div class="skill-bar-fill" :style="{ width: skill.pct + '%' }" />
                </div>
                <span class="skill-pct">{{ skill.pct }}%</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 분석 확인 -->
        <div class="confirm-card">
          <div class="confirm-icon"><i class="fas fa-question" /></div>
          <h3>이 결과가 맞나요?</h3>
          <p>분석된 기술 스택과 숙련도가 정확한지 확인해 주세요.</p>
          <div class="confirm-actions">
            <button class="btn-yes" @click="$router.push('/curriculum-suggest')"><i class="fas fa-check-circle" /> 네</button>
            <button class="btn-no" @click="$router.push('/feedback')"><i class="fas fa-times" /> 아니오</button>
          </div>
        </div>

      </div>
    </main>
  </div>
</template>

<script setup>
import AppSidebar from '@/components/AppSidebar.vue'

const stats = [
  { value: '12',    label: '확인된 기술 스택', icon: 'fas fa-layer-group' },
  { value: '중급',  label: '전반적 수준',       icon: 'fas fa-user' },
  { value: '프론트', label: '주요 전문 분야',    icon: 'fas fa-code' },
]

const legend = [
  { label: '프론트엔드', color: '#818cf8' },
  { label: '백엔드',     color: '#38bdf8' },
  { label: '데이터베이스', color: '#10b981' },
  { label: '도구',       color: '#f59e0b' },
]

const skills = [
  { name: 'React',   desc: '프론트엔드 프레임워크', pct: 85, emoji: '⚛️' },
  { name: 'Node.js', desc: '백엔드 런타임',         pct: 70, emoji: '🟢' },
  { name: 'Python',  desc: '프로그래밍 언어',       pct: 65, emoji: '🐍' },
  { name: 'Docker',  desc: '컨테이너 플랫폼',       pct: 60, emoji: '🐳' },
]
</script>

<style scoped>
.app-layout {
  display: flex; width: 100%; height: 100vh; overflow: hidden;
  background: var(--bg-base); color: var(--text-primary);
  font-family: 'Escoredream', system-ui, sans-serif;
}
.main-content { flex: 1; display: flex; flex-direction: column; overflow: hidden; }

.page-header {
  height: 64px; background: var(--bg-surface); border-bottom: 1px solid var(--border);
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 28px; flex-shrink: 0;
}
.page-title { font-weight: 700; font-size: 15px; color: var(--text-primary); }
.header-right { display: flex; align-items: center; gap: 14px; }
.icon-btn {
  background: none; border: none; cursor: pointer;
  color: var(--text-muted); font-size: 16px; transition: color 0.15s;
}
.icon-btn:hover { color: var(--text-primary); }
.avatar-btn {
  width: 32px; height: 32px; border-radius: 50%; cursor: pointer; text-decoration: none;
  background: linear-gradient(135deg, #818cf8, #38bdf8);
  display: flex; align-items: center; justify-content: center;
  font-size: 13px; color: #fff; font-weight: 700;
}

.dashboard-body {
  flex: 1; overflow-y: auto; padding: 28px 32px;
  display: flex; flex-direction: column; gap: 20px;
  scrollbar-width: thin; scrollbar-color: var(--scrollbar-thumb) transparent;
}
@keyframes fadeIn { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }
.fade-in { animation: fadeIn 0.35s ease both; }

/* 사용자 카드 */
.user-card {
  display: flex; align-items: center; gap: 18px;
  background: var(--bg-surface); border: 1px solid var(--border);
  border-radius: 16px; padding: 22px 24px;
}
.user-avatar {
  width: 58px; height: 58px; border-radius: 50%;
  background: var(--bg-elevated); overflow: hidden; flex-shrink: 0;
  border: 2px solid var(--border);
}
.user-avatar img { width: 100%; height: 100%; object-fit: cover; }
.user-card h1 { font-size: 20px; font-weight: 800; color: var(--text-primary); }
.user-sub { font-size: 12px; color: var(--text-faint); margin-top: 4px; }

/* 스탯 */
.stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 16px; }
.stat-card {
  background: var(--bg-surface); border: 1px solid var(--border);
  border-radius: 16px; padding: 22px 22px 18px; position: relative; overflow: hidden;
  transition: border-color 0.2s;
}
.stat-card:hover { border-color: rgba(129,140,248,0.4); }
.stat-value { font-size: 32px; font-weight: 800; color: var(--text-primary); margin-bottom: 6px; }
.stat-label { font-size: 12px; color: var(--text-muted); }
.stat-badge {
  position: absolute; top: 16px; right: 16px;
  width: 32px; height: 32px; border-radius: 8px;
  background: rgba(129,140,248,0.15);
  display: flex; align-items: center; justify-content: center;
  color: #818cf8; font-size: 13px;
}

/* 섹션 카드 */
.section-card {
  background: var(--bg-surface); border: 1px solid var(--border);
  border-radius: 16px; padding: 22px 24px;
}
.section-card-header {
  display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;
  font-weight: 700; font-size: 15px; color: var(--text-primary);
}
.btn-sm {
  padding: 6px 14px; border: 1px solid var(--border); border-radius: 8px;
  background: var(--bg-elevated); color: var(--text-muted); font-size: 12px;
  cursor: pointer; transition: all 0.15s;
}
.btn-sm:hover { background: var(--bg-hover); color: var(--text-primary); }

.chart-placeholder {
  height: 180px; background: var(--bg-elevated); border: 1px dashed var(--border-mid);
  border-radius: 12px; display: flex; flex-direction: column;
  align-items: center; justify-content: center; gap: 6px;
  color: var(--text-faint); font-size: 20px; margin-bottom: 16px;
}
.chart-placeholder span { font-size: 13px; font-weight: 600; }
.chart-placeholder small { font-size: 11px; }

.chart-legend { display: flex; justify-content: center; gap: 20px; flex-wrap: wrap; }
.legend-item { display: flex; align-items: center; gap: 7px; font-size: 12px; color: var(--text-muted); }
.legend-dot { width: 10px; height: 10px; border-radius: 3px; }

/* 스킬 리스트 */
.skill-list { display: flex; flex-direction: column; gap: 18px; }
.skill-row { display: flex; align-items: center; gap: 16px; }
.skill-meta { display: flex; align-items: center; gap: 12px; width: 200px; flex-shrink: 0; }
.skill-emoji {
  width: 38px; height: 38px; border-radius: 10px; background: var(--bg-elevated);
  display: flex; align-items: center; justify-content: center; font-size: 18px; flex-shrink: 0;
}
.skill-name { font-weight: 700; font-size: 13px; color: var(--text-primary); }
.skill-desc { font-size: 11px; color: var(--text-faint); margin-top: 2px; }
.skill-bar-wrap { flex: 1; display: flex; align-items: center; gap: 12px; }
.skill-bar { flex: 1; height: 6px; background: var(--bg-elevated); border-radius: 3px; overflow: hidden; }
.skill-bar-fill {
  height: 100%; border-radius: 3px;
  background: linear-gradient(90deg, #818cf8, #38bdf8);
  transition: width 0.8s ease;
}
.skill-pct { font-size: 12px; font-weight: 600; color: var(--text-muted); width: 36px; text-align: right; }

/* 확인 카드 */
.confirm-card {
  background: var(--bg-elevated); border: 1px solid var(--border);
  border-radius: 16px; padding: 36px 24px; text-align: center;
}
.confirm-icon {
  width: 48px; height: 48px; border-radius: 50%; margin: 0 auto 16px;
  background: rgba(129,140,248,0.15);
  display: flex; align-items: center; justify-content: center;
  color: #818cf8; font-size: 18px;
}
.confirm-card h3 { font-size: 18px; font-weight: 800; color: var(--text-primary); margin-bottom: 8px; }
.confirm-card p  { font-size: 13px; color: var(--text-muted); margin-bottom: 22px; }
.confirm-actions { display: flex; justify-content: center; gap: 12px; }
.btn-yes, .btn-no {
  display: flex; align-items: center; gap: 8px;
  padding: 10px 24px; border-radius: 10px; font-size: 14px; font-weight: 600;
  cursor: pointer; transition: all 0.15s; font-family: 'Escoredream', sans-serif;
}
.btn-yes { background: linear-gradient(135deg, #818cf8, #38bdf8); color: #fff; border: none; }
.btn-yes:hover { opacity: 0.87; }
.btn-no {
  background: var(--bg-surface); border: 1px solid var(--border);
  color: var(--text-muted);
}
.btn-no:hover { background: var(--bg-hover); color: var(--text-primary); }
</style>
