<template>
  <div class="upload-root">
    <div class="upload-card">
      <div class="check-circle">
        <i class="fas fa-check" />
      </div>
      <h2 class="upload-title">커리큘럼이 캘린더에 업로드되었습니다.</h2>
      <p class="upload-sub">다음 주 학습 계획을 확인해보세요.</p>
      <button class="btn-primary" @click="$router.push('/calendar')">캘린더로 이동</button>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.upload-root {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-base);
  font-family: 'Escoredream', system-ui, sans-serif;
  padding: 24px;
}

.upload-card {
  width: 100%;
  max-width: 420px;
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 48px 36px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;
  text-align: center;
  animation: fadeIn 0.35s ease both;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
}

.check-circle {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-muted);
  font-size: 22px;
  margin-bottom: 24px;
}

.upload-title {
  font-size: 18px;
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: 10px;
  line-height: 1.4;
}
.upload-sub {
  font-size: 13px;
  color: var(--text-muted);
  margin-bottom: 28px;
}

.btn-primary {
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
}
.btn-primary:hover { opacity: 0.85; }
</style>
