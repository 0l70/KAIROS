<template>
  <div class="app-layout">
    <AppSidebar />
    <main class="main-content custom-scroll">
      
      <header class="page-header">
        <div>
          <h1 class="page-title">새로운 활동 추천</h1>
          <p class="page-desc">KAIROS AI가 학습 패턴을 분석하여 최적의 다음 스텝을 제안합니다.</p>
        </div>
      </header>

      <div class="page-body">
        
        <section class="rec-section">
          <h2 class="section-title">현재 트랙을 위한 다음 스텝</h2>
          <div class="card-grid">
            
            <div class="rec-card">
              <div class="rc-header">
                <span class="rc-track" style="color: #607D8B"><i class="fas fa-layer-group"></i> 졸업작품</span>
                <span class="rc-tag rc-diff">난이도: 중</span>
              </div>
              <h3 class="rc-title">JPA 연관관계 매핑 심화 학습</h3>
              <p class="rc-reason"><strong>추천 이유:</strong> 최근 ERD 설계를 완료하셨습니다. DB 테이블을 객체지향적으로 다루기 위해 JPA 연관관계 학습이 필수적입니다.</p>
              <div class="rc-footer">
                <span class="rc-time"><i class="fas fa-clock"></i> 예상 3시간</span>
                <button class="btn-add"><i class="fas fa-plus"></i> 캘린더 추가</button>
              </div>
            </div>

            <div class="rec-card">
              <div class="rc-header">
                <span class="rc-track" style="color: #8B9A73"><i class="fas fa-layer-group"></i> 알고리즘</span>
                <span class="rc-tag rc-diff">난이도: 상</span>
              </div>
              <h3 class="rc-title">A* 알고리즘 기초 문제 3선</h3>
              <p class="rc-reason"><strong>추천 이유:</strong> 다익스트라 알고리즘을 성공적으로 학습했습니다. 심화 응용인 A* 알고리즘을 통해 탐색 능력을 넓힐 수 있습니다.</p>
              <div class="rc-footer">
                <span class="rc-time"><i class="fas fa-clock"></i> 예상 4시간</span>
                <button class="btn-add"><i class="fas fa-plus"></i> 캘린더 추가</button>
              </div>
            </div>

          </div>
        </section>

        <section class="rec-section mt-40">
          <h2 class="section-title">이런 새로운 학습은 어떠세요?</h2>
          <div class="card-grid">
            
            <div class="rec-card highlight-card">
              <div class="rc-header">
                <span class="rc-track text-accent"><i class="fas fa-lightbulb"></i> NEW 트랙 제안</span>
                <span class="rc-tag rc-type">인프라/DevOps</span>
              </div>
              <h3 class="rc-title">Docker & Github Actions 기초</h3>
              <p class="rc-desc">졸업작품 배포 시기가 다가옵니다. 수동 배포 대신 CI/CD 파이프라인을 구축해 개발 효율을 높여보세요.</p>
              <div class="rc-tags">
                <span>#DevOps</span> <span>#자동화</span> <span>#AWS</span>
              </div>
              <div class="rc-footer mt-auto">
                <button class="btn-primary w-full">이 트랙으로 시작하기</button>
              </div>
            </div>

          </div>
        </section>

      </div>
    </main>
  </div>
</template>

<script setup>
import AppSidebar from '@/components/AppSidebar.vue'
</script>

<style scoped>
.app-layout { display: flex; width: 100%; height: 100vh; overflow: hidden; background: var(--bg-base); }
.main-content { flex: 1; display: flex; flex-direction: column; overflow-y: auto; background: var(--bg-base); }

.page-header { padding: 32px 40px; border-bottom: 1px solid var(--border); background: var(--bg-surface); position: sticky; top: 0; z-index: 10; }
.page-title { font-size: 22px; font-weight: 800; color: var(--text-primary); margin-bottom: 6px; }
.page-desc { font-size: 13px; color: var(--text-faint); }

.page-body { padding: 40px; max-width: 1200px; margin: 0 auto; width: 100%; display: flex; flex-direction: column; gap: 40px; }

.section-title { font-size: 18px; font-weight: 800; color: var(--text-primary); margin-bottom: 20px; }

.card-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 20px; }

.rec-card { background: var(--bg-surface); border: 1px solid var(--border); border-radius: 16px; padding: 24px; display: flex; flex-direction: column; transition: all 0.2s; box-shadow: 0 4px 12px rgba(0,0,0,0.01); }
.rec-card:hover { border-color: var(--border-mid); transform: translateY(-4px); box-shadow: 0 12px 24px rgba(0,0,0,0.05); }

.rc-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
.rc-track { font-size: 12px; font-weight: 700; display: flex; align-items: center; gap: 6px; }
.rc-tag { font-size: 11px; font-weight: 600; padding: 3px 8px; border-radius: 6px; background: var(--bg-base); color: var(--text-muted); }
.text-accent { color: var(--text-primary); }

.rc-title { font-size: 16px; font-weight: 800; color: var(--text-primary); margin-bottom: 12px; line-height: 1.4; }
.rc-reason { font-size: 13px; color: var(--text-secondary); line-height: 1.6; background: rgba(17, 24, 39, 0.03); padding: 12px; border-radius: 8px; margin-bottom: 20px; }
.rc-reason strong { color: var(--text-primary); font-weight: 700; }
.rc-desc { font-size: 13px; color: var(--text-secondary); line-height: 1.6; margin-bottom: 16px; }

.rc-tags { display: flex; gap: 8px; margin-bottom: 24px; }
.rc-tags span { font-size: 11px; color: var(--text-muted); background: var(--bg-base); padding: 4px 8px; border-radius: 4px; }

.rc-footer { display: flex; justify-content: space-between; align-items: center; margin-top: auto; }
.mt-auto { margin-top: auto; }
.rc-time { font-size: 12px; font-weight: 600; color: var(--text-faint); display: flex; align-items: center; gap: 4px; }

.btn-add { background: var(--bg-elevated); border: 1px solid var(--border); color: var(--text-primary); padding: 8px 14px; border-radius: 8px; font-size: 12px; font-weight: 600; cursor: pointer; transition: 0.15s; display: flex; align-items: center; gap: 6px; }
.btn-add:hover { background: var(--bg-hover); border-color: var(--border-mid); }

.btn-primary { background: var(--accent); color: var(--bg-surface); border: none; padding: 12px; border-radius: 8px; font-size: 13px; font-weight: 700; cursor: pointer; transition: 0.15s; text-align: center; }
.btn-primary:hover { opacity: 0.9; }
.w-full { width: 100%; }

.highlight-card { border: 2px solid var(--text-primary); }
</style>