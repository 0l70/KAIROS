<template>
  <div class="app-layout">
    <AppSidebar />
    <main class="main-content custom-scroll">
      <header class="page-header">
        <div>
          <h1 class="page-title">RECOMMENDATIONS</h1>
          <p class="page-desc">AI가 분석한 최적의 다음 스텝</p>
        </div>
      </header>

      <div class="page-body">
        
        <section class="rec-section">
          <h2 class="section-title">NEXT STEPS</h2>
          <div class="card-grid">
            <div class="rec-card">
              <div class="rc-header">
                <span class="rc-track">졸업작품</span>
                <span class="rc-tag">난이도: 중</span>
              </div>
              <h3 class="rc-title">JPA 연관관계 매핑 심화 학습</h3>
              <div class="rc-reason"><strong>WHY:</strong> ERD 설계를 객체지향적으로 다루기 위해 필수적인 단계.</div>
              <div class="rc-footer">
                <span class="rc-time">예상 3시간</span>
                <button class="btn-add">ADD TO CALENDAR</button>
              </div>
            </div>

            <div class="rec-card">
              <div class="rc-header">
                <span class="rc-track">알고리즘</span>
                <span class="rc-tag">난이도: 상</span>
              </div>
              <h3 class="rc-title">A* 알고리즘 기초 문제 3선</h3>
              <div class="rc-reason"><strong>WHY:</strong> 다익스트라 이후 심화 응용 탐색 능력을 위해 추천.</div>
              <div class="rc-footer">
                <span class="rc-time">예상 4시간</span>
                <button class="btn-add">ADD TO CALENDAR</button>
              </div>
            </div>
          </div>
        </section>

        <section class="rec-section mt-40">
          <h2 class="section-title">NEW DISCOVERY</h2>
          <div class="card-grid">
            <div class="rec-card highlight-card">
              <div class="rc-header">
                <span class="rc-track text-accent">NEW TRACK</span>
                <span class="rc-tag">DevOps</span>
              </div>
              <h3 class="rc-title">Docker & Github Actions 기초</h3>
              <p class="rc-desc">졸업작품 배포 시기가 다가옵니다. 수동 배포 대신 CI/CD 자동화를 구축해보세요.</p>
              <div class="rc-tags"><span>#DevOps</span><span>#AWS</span></div>
              <div class="rc-footer mt-auto">
                <button class="btn-primary w-full">START TRACK</button>
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
.app-layout { display: flex; width: 100%; height: 100vh; overflow: hidden; background: var(--bg-base); font-family: 'Space Grotesk', 'Escoredream', system-ui, sans-serif; }
.main-content { flex: 1; display: flex; flex-direction: column; overflow-y: auto; background: var(--bg-base); }
.custom-scroll::-webkit-scrollbar { width: 6px; } .custom-scroll::-webkit-scrollbar-thumb { background: var(--border-mid); border-radius: 0; }

.page-header { padding: 40px 40px 20px; border-bottom: 2px solid var(--border); position: sticky; top: 0; background: var(--bg-surface); z-index: 10; }
.page-title { font-size: 32px; font-weight: 900; color: var(--text-primary); letter-spacing: 0.05em; }
.page-desc { font-size: 13px; font-weight: 700; color: var(--text-muted); margin-top: 8px; }

.page-body { padding: 40px; max-width: 1200px; margin: 0 auto; width: 100%; display: flex; flex-direction: column; gap: 48px; }

.section-title { font-size: 20px; font-weight: 900; letter-spacing: 0.1em; color: var(--text-primary); border-left: 6px solid var(--text-primary); padding-left: 12px; margin-bottom: 24px; }

.card-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(340px, 1fr)); gap: 24px; }

.rec-card { background: transparent; border: 2px solid var(--text-primary); padding: 32px; display: flex; flex-direction: column; transition: 0.1s; box-shadow: 6px 6px 0 var(--border); }
.rec-card:hover { transform: translate(-4px, -4px); box-shadow: 10px 10px 0 var(--text-primary); background: var(--bg-surface); }

.rc-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; border-bottom: 2px solid var(--text-primary); padding-bottom: 12px; }
.rc-track { font-size: 14px; font-weight: 900; text-transform: uppercase; color: var(--text-primary); }
.rc-tag { font-size: 11px; font-weight: 800; border: 1px solid var(--text-primary); padding: 4px 8px; }

.rc-title { font-size: 20px; font-weight: 900; color: var(--text-primary); margin-bottom: 16px; line-height: 1.3; }
.rc-reason, .rc-desc { font-size: 14px; font-weight: 600; color: var(--text-secondary); line-height: 1.6; border: 1px dashed var(--border); padding: 16px; margin-bottom: 24px; }
.rc-reason strong { color: var(--text-primary); font-weight: 900; font-size: 16px; display: block; margin-bottom: 4px; }

.rc-tags { display: flex; gap: 8px; margin-bottom: 32px; }
.rc-tags span { font-size: 12px; font-weight: 800; color: var(--bg-base); background: var(--text-primary); padding: 6px 10px; text-transform: uppercase; }

.rc-footer { display: flex; justify-content: space-between; align-items: center; margin-top: auto; }
.mt-auto { margin-top: auto; }
.rc-time { font-size: 13px; font-weight: 800; color: var(--text-muted); }

.btn-add { background: transparent; border: 2px solid var(--text-primary); color: var(--text-primary); padding: 10px 16px; font-size: 12px; font-weight: 900; cursor: pointer; transition: 0.1s; letter-spacing: 0.05em; }
.btn-add:hover { background: var(--text-primary); color: var(--bg-base); }

.btn-primary { background: var(--text-primary); color: var(--bg-base); border: 2px solid var(--text-primary); padding: 16px; font-size: 14px; font-weight: 900; letter-spacing: 0.1em; cursor: pointer; transition: 0.1s; text-align: center; }
.btn-primary:hover { background: transparent; color: var(--text-primary); box-shadow: 4px 4px 0 var(--text-primary); transform: translate(-2px, -2px); }
.w-full { width: 100%; }

.highlight-card { background: rgba(0,0,0,0.03); }
:global(body.theme-dark) .highlight-card { background: rgba(255,255,255,0.03); }
</style>