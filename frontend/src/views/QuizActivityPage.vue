<template>
  <div class="quiz-activity-root">
    <!-- 헤더 -->
    <header class="quiz-header">
      <button class="btn-back" @click="$router.push('/activity-select')">
        <i class="fas fa-arrow-left" /> 활동 진행 중
      </button>
      <button class="btn-menu"><i class="fas fa-ellipsis-v" /></button>
    </header>

    <!-- 퀴즈 화면 -->
    <div v-if="phase === 'quiz'" class="quiz-body">
      <h2 class="quiz-set-title">지난 달 작성한 블로그 내용을 기반으로 한 복습 퀴즈</h2>

      <!-- 진행바 -->
      <div class="progress-box">
        <div class="progress-info">
          <span>문제 {{ currentIdx + 1 }} / {{ quizzes.length }}</span>
          <span>{{ Math.round(((currentIdx) / quizzes.length) * 100) }}% 완료</span>
        </div>
        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: (currentIdx / quizzes.length * 100) + '%' }" />
        </div>
      </div>

      <!-- 문제 카드 -->
      <div class="question-card">
        <p class="question-text">{{ current.question }}</p>
        <div class="option-list">
          <label
            v-for="(opt, i) in current.options"
            :key="i"
            class="option-item"
            :class="{ selected: selected === i }"
            @click="selected = i"
          >
            <input type="radio" :value="i" v-model="selected" style="display:none" />
            <div class="radio-circle" :class="{ checked: selected === i }">
              <div v-if="selected === i" class="radio-dot" />
            </div>
            {{ opt }}
          </label>
        </div>
      </div>
    </div>

    <!-- 결과 화면 -->
    <div v-else class="result-body">
      <div class="result-card">
        <div class="result-emoji">🎉</div>
        <h2>퀴즈 완료!</h2>
        <p>{{ quizzes.length }}문제 중 {{ quizzes.length - 1 }}개 정답이에요</p>
        <button class="btn-primary" @click="$router.push('/calendar')">캘린더로 이동</button>
      </div>
    </div>

    <!-- 하단 버튼 -->
    <div v-if="phase === 'quiz'" class="quiz-footer">
      <button class="btn-prev" @click="prev" :disabled="currentIdx === 0">
        <i class="fas fa-arrow-left" /> 이전
      </button>
      <div class="footer-right">
        <button class="btn-next" @click="next" v-if="currentIdx < quizzes.length - 1">
          다음 <i class="fas fa-arrow-right" />
        </button>
        <button class="btn-submit" @click="phase = 'result'">제출</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const phase = ref('quiz')
const currentIdx = ref(1)
const selected = ref(null)

const quizzes = [
  {
    question: 'REST API에서 GET과 POST의 주요 차이점은 무엇인가요?',
    options: [
      'GET은 데이터를 조회할 때 사용된다',
      'POST는 데이터를 생성할 때 사용된다',
      'GET은 요청 본문을 포함할 수 있다',
      'POST는 캐싱이 기본 동작이다',
    ],
  },
  {
    question: 'React에서 useEffect의 두 번째 인자로 빈 배열([])을 넘기면 언제 실행되나요?',
    options: [
      '컴포넌트가 렌더링될 때마다',
      '컴포넌트가 마운트될 때만',
      '상태가 변경될 때마다',
      '언마운트될 때만',
    ],
  },
  {
    question: 'TypeScript에서 interface와 type의 주요 차이점은?',
    options: [
      'interface는 확장이 불가능하다',
      'type은 유니온 타입을 만들 수 있다',
      'interface만 클래스에 사용 가능하다',
      'type은 선언 병합이 된다',
    ],
  },
  {
    question: 'HTTP 상태 코드 401과 403의 차이는?',
    options: [
      '401은 인증 실패, 403은 권한 없음',
      '401은 서버 오류, 403은 클라이언트 오류',
      '401은 리소스 없음, 403은 요청 잘못됨',
      '둘 다 인증 오류',
    ],
  },
  {
    question: 'Docker 컨테이너와 가상 머신의 가장 큰 차이점은?',
    options: [
      '컨테이너는 OS 커널을 공유한다',
      '가상 머신이 더 가볍다',
      '컨테이너는 네트워크를 사용할 수 없다',
      '가상 머신이 더 빠르게 시작된다',
    ],
  },
]

const current = computed(() => quizzes[currentIdx.value])

function next() {
  if (currentIdx.value < quizzes.length - 1) {
    currentIdx.value++
    selected.value = null
  }
}
function prev() {
  if (currentIdx.value > 0) {
    currentIdx.value--
    selected.value = null
  }
}
</script>

<style scoped>
.quiz-activity-root {
  min-height: 100vh;
  background: var(--bg-base);
  font-family: 'Escoredream', system-ui, sans-serif;
  color: var(--text-primary);
  display: flex;
  flex-direction: column;
}

.quiz-header {
  height: 56px;
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  background: var(--bg-surface);
  flex-shrink: 0;
}
.btn-back {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: 'Escoredream', sans-serif;
}
.btn-back:hover { opacity: 0.7; }
.btn-menu {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text-muted);
  font-size: 16px;
}

.quiz-body {
  flex: 1;
  max-width: 720px;
  width: 100%;
  margin: 0 auto;
  padding: 36px 24px 120px;
}

.quiz-set-title {
  font-size: 16px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 22px;
}

.progress-box {
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 16px 20px;
  margin-bottom: 20px;
}
.progress-info {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  color: var(--text-muted);
  margin-bottom: 10px;
}
.progress-bar {
  height: 6px;
  background: var(--bg-elevated);
  border-radius: 3px;
  overflow: hidden;
}
.progress-fill {
  height: 100%;
  background: #111;
  border-radius: 3px;
  transition: width 0.4s ease;
}

.question-card {
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 28px 24px;
}
.question-text {
  font-size: 16px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 22px;
  line-height: 1.5;
}

.option-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.option-item {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px 18px;
  border: 1px solid var(--border);
  border-radius: 12px;
  cursor: pointer;
  font-size: 14px;
  color: var(--text-primary);
  background: var(--bg-elevated);
  transition: border-color 0.15s, background 0.15s;
  user-select: none;
}
.option-item:hover {
  border-color: rgba(129, 140, 248, 0.4);
}
.option-item.selected {
  border-color: #111;
  background: rgba(17, 17, 17, 0.05);
}
.radio-circle {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: border-color 0.15s;
}
.radio-circle.checked { border-color: #111; }
.radio-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #111;
}

/* 하단 버튼 */
.quiz-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 16px 24px;
  background: var(--bg-surface);
  border-top: 1px solid var(--border);
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.footer-right {
  display: flex;
  gap: 10px;
}
.btn-prev {
  padding: 11px 20px;
  border: 1px solid var(--border);
  border-radius: 10px;
  background: var(--bg-elevated);
  color: var(--text-muted);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  font-family: 'Escoredream', sans-serif;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.15s;
}
.btn-prev:disabled { opacity: 0.4; cursor: not-allowed; }
.btn-prev:not(:disabled):hover { color: var(--text-primary); }

.btn-next {
  padding: 11px 22px;
  border: none;
  border-radius: 10px;
  background: #111;
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  font-family: 'Escoredream', sans-serif;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: opacity 0.15s;
}
.btn-next:hover { opacity: 0.85; }

.btn-submit {
  padding: 11px 22px;
  border: 1px solid var(--border);
  border-radius: 10px;
  background: var(--bg-elevated);
  color: var(--text-muted);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  font-family: 'Escoredream', sans-serif;
  transition: all 0.15s;
}
.btn-submit:hover { color: var(--text-primary); }

/* 결과 */
.result-body {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}
.result-card {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}
.result-emoji { font-size: 56px; }
.result-card h2 { font-size: 24px; font-weight: 800; color: var(--text-primary); }
.result-card p  { font-size: 14px; color: var(--text-muted); }
.btn-primary {
  margin-top: 12px;
  padding: 13px 32px;
  border: none;
  border-radius: 12px;
  background: #111;
  color: #fff;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  font-family: 'Escoredream', sans-serif;
}
</style>
