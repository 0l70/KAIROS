<template>
  <div class="feedback-root">
    <div class="feedback-card">
      <h2 class="feedback-title">분석 결과가 정확하지 않나요?</h2>

      <textarea
        v-model="feedback"
        class="feedback-textarea"
        placeholder="어떤 부분이 잘못 분석되었는지 입력해주세요."
      />

      <p class="feedback-hint">입력해주신 내용을 바탕으로 다시 분석합니다.</p>

      <button class="btn-reanalyze" @click="handleReanalyze">다시 분석하기</button>
      <button class="btn-back" @click="$router.push('/analysis')">이전으로</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const feedback = ref('')

function handleReanalyze() {
  router.push('/loading')
}
</script>

<style scoped>
.feedback-root {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-base);
  font-family: 'Escoredream', system-ui, sans-serif;
  padding: 24px;
}

.feedback-card {
  width: 100%;
  max-width: 420px;
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 40px 36px;
  display: flex;
  flex-direction: column;
  gap: 0;
  animation: fadeIn 0.35s ease both;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
}

.feedback-title {
  font-size: 20px;
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: 20px;
  text-align: center;
}

.feedback-textarea {
  width: 100%;
  min-height: 140px;
  padding: 16px;
  border: 1px solid var(--border);
  border-radius: 12px;
  background: var(--bg-elevated);
  color: var(--text-primary);
  font-size: 14px;
  font-family: 'Escoredream', sans-serif;
  resize: vertical;
  transition: border-color 0.15s;
  box-sizing: border-box;
  margin-bottom: 12px;
}
.feedback-textarea:focus {
  outline: none;
  border-color: #818cf8;
}
.feedback-textarea::placeholder {
  color: var(--text-faint);
}

.feedback-hint {
  font-size: 13px;
  color: var(--text-muted);
  margin-bottom: 20px;
}

.btn-reanalyze {
  width: 100%;
  padding: 14px;
  border: none;
  border-radius: 12px;
  background: #111;
  color: #fff;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  font-family: 'Escoredream', sans-serif;
  transition: opacity 0.15s;
  margin-bottom: 10px;
}
.btn-reanalyze:hover { opacity: 0.85; }

.btn-back {
  width: 100%;
  padding: 13px;
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
.btn-back:hover { background: var(--bg-hover); color: var(--text-primary); }
</style>
