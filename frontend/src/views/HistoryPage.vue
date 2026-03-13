<template>
  <div class="app-layout">
    <AppSidebar />

    <main class="main-content custom-scroll">
      <header class="page-header">
        <div class="header-title"><i class="fas fa-history" /> GROWTH JOURNAL</div>
      </header>

      <div class="content-inner">
        <div class="title-section">
          <h2>나의 학습 및 성장 기록</h2>
          <div class="select-wrapper">
            <select class="brutal-select-small">
              <option>최근 1개월</option>
              <option>최근 3개월</option>
              <option>전체 기간</option>
            </select>
            <i class="fas fa-chevron-down select-icon" />
          </div>
        </div>

        <div class="stat-grid">
          <div class="stat-card">
            <div class="stat-value text-blue-600">24</div>
            <div class="stat-label">완료한 활동</div>
          </div>
          <div class="stat-card">
            <div class="stat-value text-green-600">85%</div>
            <div class="stat-label">목표 달성률</div>
          </div>
          <div class="stat-card">
            <div class="stat-value text-purple-600">12</div>
            <div class="stat-label">작성한 회고/블로그</div>
          </div>
        </div>

        <div class="timeline-wrapper">
          <div v-for="journal in growthLogs" :key="journal.id" class="journal-card">
            <div class="j-header">
              <span class="j-date">{{ journal.date }}</span>
              <div class="j-tags">
                <span v-for="tag in journal.tags" :key="tag" class="j-tag">{{ tag }}</span>
              </div>
            </div>
            <h3 class="j-title">{{ journal.title }}</h3>
            <p class="j-desc">{{ journal.description }}</p>
            
            <div class="j-ai-feedback">
              <i class="fas fa-magic" />
              <span><strong>AI Comment:</strong> {{ journal.aiFeedback }}</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AppSidebar from '@/components/AppSidebar.vue'

const growthLogs = ref([
  {
    id: 1,
    date: '2026-03-01',
    title: 'React 렌더링 최적화 적용',
    description: 'useMemo와 useCallback을 사용하여 불필요한 리렌더링을 방지하는 실습을 완료했습니다.',
    tags: ['React', 'Frontend'],
    aiFeedback: '이전 커밋 대비 렌더링 성능이 향상된 코드를 작성했습니다. 다음은 상태 관리 툴 연동을 추천합니다.'
  },
  {
    id: 2,
    date: '2026-02-25',
    title: 'TypeScript 기초 완강',
    description: '인터페이스와 제네릭을 활용한 기본 타입 선언 방법을 학습하고 관련 블로그 포스팅을 작성했습니다.',
    tags: ['TypeScript', 'Velog'],
    aiFeedback: '블로그 글의 구조가 매우 논리적입니다. 이제 실제 프로젝트에 TS를 도입해 볼 차례입니다.'
  }
])
</script>

<style scoped>
.app-layout { display: flex; width: 100%; height: 100vh; overflow: hidden; background: var(--bg-base); font-family: 'Space Grotesk', 'Escoredream', system-ui, sans-serif; }
.main-content { flex: 1; display: flex; flex-direction: column; overflow-y: auto; }
.custom-scroll { -ms-overflow-style: none; scrollbar-width: none; }
.custom-scroll::-webkit-scrollbar { display: none; }

.page-header { display: flex; align-items: center; padding: 20px 32px; border-bottom: 2px solid var(--text-primary); background: var(--bg-surface); position: sticky; top: 0; z-index: 10; }
.header-title { font-size: 16px; font-weight: 900; letter-spacing: 0.1em; color: var(--text-primary); display: flex; align-items: center; gap: 10px; }

.content-inner { max-width: 900px; margin: 0 auto; padding: 48px 32px; width: 100%; }

.title-section { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 40px; flex-wrap: wrap; gap: 16px; }
.title-section h2 { font-size: 28px; font-weight: 900; color: var(--text-primary); }
.select-wrapper { position: relative; }
.brutal-select-small { padding: 12px 36px 12px 16px; border: 2px solid var(--text-primary); background: var(--bg-surface); color: var(--text-primary); font-size: 13px; font-weight: 800; outline: none; cursor: pointer; box-shadow: 4px 4px 0 #6b7280; transition: all 0.1s; appearance: none; }
.brutal-select-small:hover { transform: translate(-2px, -2px); box-shadow: 6px 6px 0 #6b7280; }
.select-icon { position: absolute; right: 14px; top: 50%; transform: translateY(-50%); font-size: 12px; pointer-events: none; color: var(--text-primary); }

.stat-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 48px; }
.stat-card { background: var(--bg-surface); border: 2px solid var(--text-primary); padding: 24px; text-align: center; box-shadow: 6px 6px 0 #6b7280; transition: transform 0.1s; }
.stat-card:hover { transform: translate(-2px, -2px); box-shadow: 8px 8px 0 #6b7280; }
.stat-value { font-size: 40px; font-weight: 900; font-family: monospace; margin-bottom: 8px; }
.stat-label { font-size: 14px; font-weight: 800; color: var(--text-muted); }

.timeline-wrapper { display: flex; flex-direction: column; gap: 24px; border-left: 4px solid var(--border); padding-left: 24px; margin-left: 12px; }
.journal-card { position: relative; background: var(--bg-surface); border: 2px solid var(--text-primary); padding: 24px; box-shadow: 6px 6px 0 #6b7280; transition: all 0.1s; }
.journal-card:hover { transform: translate(-2px, -2px); box-shadow: 8px 8px 0 #6b7280; }
.journal-card::before { content: ''; position: absolute; left: -38px; top: 24px; width: 24px; height: 24px; background: var(--bg-base); border: 4px solid var(--text-primary); border-radius: 50%; }

.j-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; flex-wrap: wrap; gap: 12px; }
.j-date { font-size: 13px; font-weight: 900; font-family: monospace; color: var(--text-muted); }
.j-tags { display: flex; gap: 8px; }
.j-tag { font-size: 11px; font-weight: 800; border: 1px solid var(--text-primary); padding: 4px 8px; color: var(--text-primary); }

.j-title { font-size: 18px; font-weight: 900; color: var(--text-primary); margin-bottom: 12px; }
.j-desc { font-size: 14px; font-weight: 700; color: var(--text-muted); line-height: 1.6; margin-bottom: 20px; }

.j-ai-feedback { background: var(--bg-base); border: 2px dashed var(--text-primary); padding: 14px 16px; font-size: 13px; color: var(--text-primary); display: flex; gap: 10px; align-items: flex-start; }
.j-ai-feedback i { color: #ffca28; margin-top: 2px; font-size: 16px; }

@media (max-width: 640px) { .stat-grid { grid-template-columns: 1fr; } }
</style>