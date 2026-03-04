<template>
  <div class="modal-backdrop">
    <div class="modal-card">
      <!-- 헤더 -->
      <div class="modal-header">
        <h2 class="modal-title">다음 주 커리큘럼을 제안드려요</h2>
        <button class="btn-close" @click="$router.push('/analysis')">×</button>
      </div>

      <p class="modal-desc">
        최근 블로그와 GitHub 활동을 바탕으로 OO 관련 학습 커리큘럼을 작성했어요.<br>
        이대로 캘린더에 업로드해볼까요?
      </p>

      <!-- 제안된 학습 주제 -->
      <div class="section">
        <div class="section-title">
          <span class="section-icon">📚</span>
          제안된 학습 주제
        </div>
        <div class="topic-list">
          <div v-for="topic in topics" :key="topic.title" class="topic-item">
            <div class="topic-dot" />
            <div>
              <div class="topic-title">{{ topic.title }}</div>
              <div class="topic-desc">{{ topic.desc }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 추천 이유 요약 -->
      <div class="section">
        <div class="section-title">
          <span class="section-icon">💡</span>
          추천 이유 요약
        </div>
        <div class="reason-list">
          <div v-for="reason in reasons" :key="reason.title" class="reason-item">
            <span class="reason-icon">{{ reason.icon }}</span>
            <div>
              <div class="reason-title">{{ reason.title }}</div>
              <div class="reason-desc">{{ reason.desc }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 버튼 -->
      <div class="modal-actions">
        <button class="btn-secondary" @click="$router.push('/activity-select')">다른 활동도 알아볼래요</button>
        <button class="btn-primary" @click="$router.push('/curriculum-upload')">네, 업로드할게요</button>
      </div>
    </div>
  </div>
</template>

<script setup>
const topics = [
  { title: 'React 고급 패턴 학습', desc: '컴포넌트 최적화 및 상태 관리 심화' },
  { title: 'TypeScript 실전 활용', desc: '타입 안정성 강화 및 고급 타입 시스템' },
  { title: '성능 최적화 기법', desc: '번들 최적화 및 렌더링 성능 개선' },
]

const reasons = [
  {
    icon: '⊙',
    title: 'GitHub 활동 분석',
    desc: '최근 React 프로젝트 커밋 패턴과 코드 리뷰 내용을 기반으로 학습 방향을 설정했어요.',
  },
  {
    icon: '⚙️',
    title: '블로그 포스팅 트렌드',
    desc: '작성하신 기술 블로그 주제들과 관심 분야를 분석하여 연관성 높은 커리큘럼을 구성했어요.',
  },
  {
    icon: '📈',
    title: '학습 진도 예측',
    desc: '현재 실력 수준을 고려하여 적절한 난이도와 학습량으로 계획을 세웠어요.',
  },
]
</script>

<style scoped>
.modal-backdrop {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.45);
  font-family: 'Escoredream', system-ui, sans-serif;
  padding: 24px;
}

.modal-card {
  width: 100%;
  max-width: 580px;
  background: var(--bg-surface);
  border-radius: 20px;
  padding: 36px 36px 28px;
  display: flex;
  flex-direction: column;
  gap: 0;
  animation: fadeIn 0.3s ease both;
  max-height: 90vh;
  overflow-y: auto;
}
@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.97); }
  to   { opacity: 1; transform: scale(1); }
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
}
.modal-title {
  font-size: 20px;
  font-weight: 800;
  color: var(--text-primary);
  line-height: 1.3;
}
.btn-close {
  background: none;
  border: none;
  font-size: 22px;
  color: var(--text-muted);
  cursor: pointer;
  padding: 0 4px;
  line-height: 1;
  transition: color 0.15s;
}
.btn-close:hover { color: var(--text-primary); }

.modal-desc {
  font-size: 13px;
  color: var(--text-muted);
  line-height: 1.7;
  margin-bottom: 24px;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--border);
}

.section {
  margin-bottom: 22px;
}
.section-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 14px;
}
.section-icon { font-size: 16px; }

/* 토픽 */
.topic-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.topic-item {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 16px 18px;
  border: 1px solid var(--border);
  border-radius: 12px;
  background: var(--bg-elevated);
}
.topic-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--text-faint);
  flex-shrink: 0;
  margin-top: 6px;
}
.topic-title {
  font-size: 14px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 4px;
}
.topic-desc {
  font-size: 12px;
  color: var(--text-muted);
}

/* 이유 */
.reason-list {
  padding: 16px 18px;
  border: 1px solid var(--border);
  border-radius: 12px;
  background: var(--bg-elevated);
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.reason-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}
.reason-icon {
  font-size: 16px;
  flex-shrink: 0;
  margin-top: 2px;
}
.reason-title {
  font-size: 13px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 4px;
}
.reason-desc {
  font-size: 12px;
  color: var(--text-muted);
  line-height: 1.6;
}

/* 버튼 */
.modal-actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 8px;
  padding-top: 20px;
  border-top: 1px solid var(--border);
}
.btn-secondary {
  padding: 12px 22px;
  border: 1px solid var(--border);
  border-radius: 12px;
  background: var(--bg-elevated);
  color: var(--text-muted);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  font-family: 'Escoredream', sans-serif;
  transition: all 0.15s;
}
.btn-secondary:hover { background: var(--bg-hover); color: var(--text-primary); }

.btn-primary {
  padding: 12px 24px;
  border: none;
  border-radius: 12px;
  background: #111;
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  font-family: 'Escoredream', sans-serif;
  transition: opacity 0.15s;
}
.btn-primary:hover { opacity: 0.85; }
</style>
