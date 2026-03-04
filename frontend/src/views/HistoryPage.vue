<template>
  <div class="history-container">
    <header class="page-header">
      <h1 class="title">학습 히스토리</h1>
      <p class="subtitle">나의 성장을 한눈에 확인하세요.</p>
    </header>

    <section class="summary-section">
      <div class="stat-card">
        <span class="label">이번 주 학습량</span>
        <div class="value">24.5<small>h</small></div>
        <div class="trend up">▲ 15%</div>
      </div>
      <div class="stat-card">
        <span class="label">완료한 노드</span>
        <div class="value">42<small>개</small></div>
        <div class="trend text">전체 대비 78%</div>
      </div>
      <div class="stat-card">
        <span class="label">연속 학습일</span>
        <div class="value">12<small>일</small></div>
        <div class="trend text">최고 기록 15일</div>
      </div>
    </section>

    <div class="content-layout">
      <article class="chart-box card">
        <div class="card-header">
          <h3>학습 성취도 추이</h3>
          <select class="period-select">
            <option>최근 7일</option>
            <option>최근 30일</option>
          </select>
        </div>
        <div class="chart-content">
          <div class="placeholder-graph">
             [ 주간 성취도 그래프 영역 ]
          </div>
        </div>
      </article>

      <aside class="activity-log card">
        <div class="card-header">
          <h3>최근 활동</h3>
        </div>
        <ul class="log-list">
          <li v-for="i in 5" :key="i" class="log-item">
            <div class="status-dot"></div>
            <div class="log-info">
              <p class="log-title">ROS2 Jetson Orin 통신 테스트</p>
              <p class="log-date">2026.03.04 14:20</p>
            </div>
            <span class="category-tag">AIoT</span>
          </li>
        </ul>
      </aside>
    </div>
  </div>
</template>

<style scoped>
.history-container {
  padding: 30px;
  background-color: var(--bg-base); /* #18181e */
  min-height: 100vh;
  color: var(--text-primary);
}

.summary-section {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 30px;
}

.stat-card {
  background: var(--bg-surface); /* #1e1e24 */
  padding: 24px;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.stat-card .value {
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--accent); /* #3b82f6 */
  margin: 10px 0;
}

.content-layout {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 20px;
}

.card {
  background: var(--bg-surface);
  border-radius: 16px;
  padding: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.log-list {
  list-style: none;
  padding: 0;
}

.log-item {
  display: flex;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.status-dot {
  width: 10px;
  height: 10px;
  background: var(--accent);
  border-radius: 50%;
  margin-right: 15px;
  box-shadow: 0 0 8px var(--accent);
}

.category-tag {
  font-size: 0.75rem;
  background: rgba(59, 130, 246, 0.1);
  color: var(--accent);
  padding: 4px 8px;
  border-radius: 4px;
  margin-left: auto;
}
</style>