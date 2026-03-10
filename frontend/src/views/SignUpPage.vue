<template>
  <div class="auth-root">
    <div class="auth-card">
      <div class="auth-logo-wrap">
        <div class="auth-avatar"><i class="fas fa-user" /></div>
        <h2>CREATE ACCOUNT</h2>
        <p>계정 정보를 확인하고 서비스를 연동해주세요</p>
      </div>

      <div class="auth-section">
        <div class="section-label">
          <div class="google-badge">G</div>
          <span>GOOGLE ACCOUNT</span>
        </div>
        <div class="field-row">
          <label>NAME</label>
          <div class="field-display">홍길동</div>
        </div>
        <div class="field-row">
          <label>EMAIL</label>
          <div class="field-display">hong.gildong@gmail.com</div>
        </div>
      </div>

      <div class="auth-section auth-section--bordered">
        <div class="section-plain-label">DATA SYNCHRONIZATION</div>
        <button class="link-btn">
          <div class="link-btn-left">
            <div class="link-icon"><i class="fas fa-link" /></div>
            <span>Velog 연동하기</span>
          </div>
          <i class="fas fa-arrow-right" />
        </button>
        <button class="link-btn">
          <div class="link-btn-left">
            <div class="link-icon"><i class="fab fa-github" /></div>
            <span>GitHub 연동하기</span>
          </div>
          <i class="fas fa-arrow-right" />
        </button>
        <p class="link-hint">연동은 선택사항이며, 설정에서 추가할 수 있습니다.</p>
      </div>

      <button class="btn-primary" @click="$router.push('/setup')">COMPLETE SIGN UP</button>

      <p class="terms-text">
        회원가입을 진행하면<br>
        <a href="#">이용약관</a> 및 <a href="#">개인정보처리방침</a>에 동의하는 것으로 간주됩니다
      </p>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.auth-root {
  min-height: 100vh; display: flex; align-items: center; justify-content: center;
  background: var(--bg-base); padding: 24px;
  font-family: 'Space Grotesk', 'Escoredream', system-ui, sans-serif;
}
.auth-card {
  width: 100%; max-width: 440px;
  background: transparent; border: 1px solid var(--border);
  border-radius: 0; padding: 48px 40px;
  animation: fadeUp 0.3s ease both;
}
@keyframes fadeUp { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }

.auth-logo-wrap { text-align: center; margin-bottom: 32px; }
.auth-avatar {
  width: 56px; height: 56px; border-radius: 0; margin: 0 auto 16px;
  background: transparent; border: 1px solid var(--text-primary);
  display: flex; align-items: center; justify-content: center;
  font-size: 20px; color: var(--text-primary);
}
.auth-logo-wrap h2 { font-size: 22px; font-weight: 900; color: var(--text-primary); letter-spacing: 0.05em; margin-bottom: 8px; }
.auth-logo-wrap p  { font-size: 12px; color: var(--text-muted); font-weight: 600; }

.auth-section { margin-bottom: 24px; }
.auth-section--bordered { padding-top: 24px; border-top: 1px solid var(--border); }

.section-label {
  display: flex; align-items: center; gap: 10px; margin-bottom: 16px;
  font-weight: 800; font-size: 13px; color: var(--text-primary); letter-spacing: 0.05em;
}
.google-badge {
  width: 24px; height: 24px; border-radius: 0; background: var(--text-primary);
  display: flex; align-items: center; justify-content: center;
  font-size: 12px; font-weight: 900; color: var(--bg-base);
}
.section-plain-label { font-weight: 800; font-size: 13px; color: var(--text-primary); margin-bottom: 16px; letter-spacing: 0.05em; }

.field-row { margin-bottom: 16px; }
.field-row label { font-size: 11px; font-weight: 700; color: var(--text-muted); display: block; margin-bottom: 6px; letter-spacing: 0.05em; }
.field-display {
  background: transparent; border: 1px solid var(--border);
  border-radius: 0; padding: 14px 16px; font-size: 14px;
  color: var(--text-primary); text-align: center; font-weight: 600;
}

.link-btn {
  width: 100%; display: flex; align-items: center; justify-content: space-between;
  border: 1px solid var(--border); padding: 12px 16px; border-radius: 0;
  background: transparent; cursor: pointer; margin-bottom: 12px;
  color: var(--text-primary); transition: all 0.15s;
}
.link-btn:hover { border-color: var(--text-primary); background: var(--text-primary); color: var(--bg-base); }
.link-btn:hover .link-icon { border-color: var(--bg-base); color: var(--bg-base); }

.link-btn-left { display: flex; align-items: center; gap: 12px; }
.link-icon {
  width: 32px; height: 32px; background: transparent; border-radius: 0; border: 1px solid var(--border);
  display: flex; align-items: center; justify-content: center;
  color: var(--text-primary); font-size: 14px; transition: all 0.15s;
}
.link-btn span { font-size: 13px; font-weight: 700; }
.link-btn .fa-arrow-right { font-size: 12px; }

.link-hint { text-align: center; font-size: 11px; color: var(--text-faint); margin-top: 8px; font-weight: 600; }

.btn-primary {
  width: 100%; padding: 16px; border-radius: 0; border: 1px solid var(--text-primary); cursor: pointer;
  background: var(--text-primary); color: var(--bg-base); font-weight: 800; font-size: 14px; margin-top: 12px; letter-spacing: 0.05em;
  transition: all 0.15s; font-family: 'Space Grotesk', 'Escoredream', sans-serif;
}
.btn-primary:hover { background: transparent; color: var(--text-primary); }

.terms-text {
  text-align: center; font-size: 11px; color: var(--text-muted); font-weight: 600;
  margin-top: 24px; line-height: 1.8; letter-spacing: 0.02em;
}
.terms-text a { color: var(--text-primary); text-decoration: none; border-bottom: 1px solid var(--text-primary); cursor: pointer; }
.terms-text a:hover { background: var(--text-primary); color: var(--bg-base); }
</style>