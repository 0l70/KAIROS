<template>
  <div class="app-layout" :class="themeStore.isDark ? 'theme-dark' : 'theme-light'">
    <div class="crt-scanlines"></div>
    <div class="retro-dot-bg"></div>

    <AppSidebar />
    <main class="main-content custom-scroll">
      
      <header class="page-header">
        <div>
          <h1 class="page-title retro-text-hover">RECOMMEND_</h1>
          <p class="page-desc">KAIROS AI가 학습 패턴을 분석하여 최적의 다음 스텝을 제안합니다.</p>
        </div>
      </header>

      <div class="page-body">
        <section class="rec-section">
          <h2 class="section-title">CURRENT TRACK NEXT STEP</h2>
          <div class="card-grid">
            
            <div class="rec-card retro-panel">
              <div class="rc-header">
                <span class="rc-track text-accent-4"><i class="fas fa-layer-group"></i> 졸업작품</span>
                <span class="rc-tag retro-badge">난이도: 중</span>
              </div>
              <h3 class="rc-title">JPA 연관관계 매핑 심화 학습</h3>
              <p class="rc-reason terminal-input"><strong>[추천 이유]</strong><br>최근 ERD 설계를 완료하셨습니다. DB 테이블을 객체지향적으로 다루기 위해 JPA 연관관계 학습이 필수적입니다.</p>
              <div class="rc-footer">
                <span class="rc-time"><i class="fas fa-clock"></i> 예상 3시간</span>
                <button class="mech-key retro-text-hover"><i class="fas fa-plus"></i> ADD TO CALENDAR</button>
              </div>
            </div>

            <div class="rec-card retro-panel">
              <div class="rc-header">
                <span class="rc-track text-accent-3"><i class="fas fa-layer-group"></i> 알고리즘</span>
                <span class="rc-tag retro-badge text-accent-1">난이도: 상</span>
              </div>
              <h3 class="rc-title">A* 알고리즘 기초 문제 3선</h3>
              <p class="rc-reason terminal-input"><strong>[추천 이유]</strong><br>다익스트라 알고리즘을 성공적으로 학습했습니다. 심화 응용인 A* 알고리즘을 통해 탐색 능력을 넓힐 수 있습니다.</p>
              <div class="rc-footer">
                <span class="rc-time"><i class="fas fa-clock"></i> 예상 4시간</span>
                <button class="mech-key retro-text-hover"><i class="fas fa-plus"></i> ADD TO CALENDAR</button>
              </div>
            </div>

          </div>
        </section>

        <section class="rec-section mt-40">
          <h2 class="section-title">NEW TRACK SUGGESTIONS</h2>
          <div class="card-grid">
            
            <div class="rec-card retro-panel highlight-card">
              <div class="rc-header">
                <span class="rc-track text-accent-1 pulse-anim"><i class="fas fa-lightbulb"></i> NEW 트랙 제안</span>
                <span class="rc-tag retro-badge">인프라/DevOps</span>
              </div>
              <h3 class="rc-title">Docker & Github Actions 기초</h3>
              <p class="rc-desc">졸업작품 배포 시기가 다가옵니다. 수동 배포 대신 CI/CD 파이프라인을 구축해 개발 효율을 높여보세요.</p>
              <div class="rc-tags">
                <span class="retro-badge">#DevOps</span> <span class="retro-badge">#자동화</span> <span class="retro-badge">#AWS</span>
              </div>
              <div class="rc-footer mt-auto">
                <button class="mech-key key-accent-1 w-full retro-text-hover">START THIS TRACK</button>
              </div>
            </div>

          </div>
        </section>
      </div>
    </main>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import AppSidebar from '@/components/AppSidebar.vue'
import { useThemeStore } from '@/stores/useThemeStore'

const themeStore = useThemeStore()
onMounted(() => { if (themeStore.isDark) themeStore.isDark = false; })
</script>

<style scoped>
@font-face { font-family: 'Mulmaru'; src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/2601-4@1.1/Mulmaru.woff2') format('woff2'); font-weight: normal; font-display: swap; }
@font-face { font-family: 'NeoDunggeunmo'; src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.3/NeoDunggeunmoPro-Regular.woff2') format('woff2'); font-weight: normal; font-display: swap; }

.theme-light { --k-bg: #F4F0EB; --k-housing: #E6DFD3; --k-key-bg: #FFFFFF; --k-key-border: #1A1A1A; --k-key-shadow: #1A1A1A; --k-border-main: #1A1A1A; --bg-base: #F4F0EB; --bg-surface: #E6DFD3; --bg-elevated: #FFFFFF; --border: #1A1A1A; --border-mid: #1A1A1A; --text-primary: #1A1A1A; --text-secondary: #333333; --text-muted: #555555; --text-faint: #777777; --accent: #E53935; --k-acc-1-bg: #E53935; --k-acc-1-shadow: #B71C1C; --k-acc-2-bg: #1E88E5; --k-acc-2-shadow: #1565C0; --k-acc-3-bg: #43A047; --k-acc-3-shadow: #2E7D32; --k-acc-4-bg: #FBC02D; }
.theme-dark { --k-bg: #1A1A1A; --k-housing: #2C2C2C; --k-key-bg: #3D3D3D; --k-key-border: #000000; --k-key-shadow: #000000; --k-border-main: #000000; --bg-base: #1A1A1A; --bg-surface: #2C2C2C; --bg-elevated: #3D3D3D; --border: #000000; --border-mid: #000000; --text-primary: #F0F0F0; --text-secondary: #CCCCCC; --text-muted: #999999; --text-faint: #666666; --accent: #FF5252; --k-acc-1-bg: #FF5252; --k-acc-1-shadow: #D50000; --k-acc-2-bg: #448AFF; --k-acc-2-shadow: #2962FF; --k-acc-3-bg: #69F0AE; --k-acc-3-shadow: #00E676; --k-acc-4-bg: #FFD54F; }

.app-layout { display: flex; width: 100%; height: 100vh; overflow: hidden; background: var(--bg-base); font-family: 'Mulmaru', sans-serif; position: relative; }
.main-content { flex: 1; display: flex; flex-direction: column; overflow-y: auto; z-index: 10; }
.crt-scanlines { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(rgba(18,16,16,0) 50%, rgba(0,0,0,0.1) 50%); background-size: 100% 4px; z-index: 9999; pointer-events: none; opacity: 0.15; }
.theme-dark .crt-scanlines { opacity: 0.3; }
.retro-dot-bg { position: absolute; inset: 0; background-image: radial-gradient(var(--border-mid) 1px, transparent 1px); background-size: 20px 20px; opacity: 0.1; z-index: 0; pointer-events: none; }

.retro-panel { background: var(--bg-surface); border: 2px solid var(--border); box-shadow: 6px 6px 0 var(--border); border-radius: 4px; }
.retro-badge { border: 2px solid var(--border); box-shadow: 2px 2px 0 var(--border); border-radius: 4px; padding: 4px 8px; font-family: 'NeoDunggeunmo', sans-serif; font-size: 12px; background: var(--bg-elevated); color: var(--text-primary); }
.terminal-input { background: var(--k-key-shadow); color: var(--k-acc-3-bg); border: 2px solid var(--border); border-radius: 4px; box-shadow: inset 0 4px 8px rgba(0,0,0,0.3); padding: 16px; font-family: 'NeoDunggeunmo', sans-serif; line-height: 1.6; }

.mech-key { padding: 12px 16px; background: var(--bg-elevated); color: var(--text-primary); border: 2px solid var(--border); border-radius: 4px; box-shadow: 4px 4px 0 var(--border); cursor: pointer; font-family: 'NeoDunggeunmo', sans-serif; font-size: 14px; font-weight: 800; transition: all 0.1s; display: inline-flex; align-items: center; justify-content: center; gap: 8px; }
.mech-key:active { transform: translate(4px, 4px) !important; box-shadow: 0 0 0 transparent !important; }
.key-accent-1 { background: var(--k-acc-1-bg); color: #fff; }

/* 💡 아날로그 지터 호버 (글리치 대체) */
.retro-text-hover { transition: all 0.1s ease; display: inline-block; position: relative; }
.retro-text-hover:hover { color: var(--accent); transform: translate(-2px, -2px); cursor: pointer; animation: analog-jitter 0.2s infinite linear alternate; }
@keyframes analog-jitter {
  0% { text-shadow: 3px 3px 0px var(--border), -1px 0 0 rgba(255,0,0,0.7), 1px 0 0 rgba(0,255,255,0.7); }
  50% { text-shadow: 3px 3px 0px var(--border), 1px 0 0 rgba(255,0,0,0.7), -1px 0 0 rgba(0,255,255,0.7); }
  100% { text-shadow: 3px 3px 0px var(--border), -1px 0 0 rgba(255,0,0,0.7), 1px 0 0 rgba(0,255,255,0.7); }
}

.text-accent-1 { color: var(--k-acc-1-bg); } .text-accent-2 { color: var(--k-acc-2-bg); } .text-accent-3 { color: var(--k-acc-3-bg); } .text-accent-4 { color: var(--k-acc-4-bg); }

.page-header { padding: 32px 40px; border-bottom: 2px solid var(--border); background: var(--k-housing); position: sticky; top: 0; z-index: 10; }
.page-title { font-size: 32px; font-weight: 900; font-family: 'NeoDunggeunmo', sans-serif; color: var(--text-primary); margin-bottom: 8px; }
.page-desc { font-size: 14px; font-weight: 600; color: var(--text-muted); }

.page-body { padding: 40px; max-width: 1200px; margin: 0 auto; width: 100%; display: flex; flex-direction: column; gap: 40px; }
.section-title { font-size: 20px; font-weight: 900; font-family: 'NeoDunggeunmo', sans-serif; color: var(--text-primary); margin-bottom: 20px; border-bottom: 2px dashed var(--border); padding-bottom: 12px; }

.card-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 24px; }
.rec-card { padding: 24px; display: flex; flex-direction: column; }
.rc-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
.rc-track { font-size: 14px; font-weight: 900; font-family: 'NeoDunggeunmo', sans-serif; display: flex; align-items: center; gap: 6px; }
.rc-title { font-size: 18px; font-weight: 900; font-family: 'NeoDunggeunmo', sans-serif; color: var(--text-primary); margin-bottom: 16px; line-height: 1.4; }
.rc-reason strong { color: var(--accent); }
.rc-desc { font-size: 14px; color: var(--text-secondary); line-height: 1.6; margin-bottom: 20px; font-weight: 600;}

.rc-tags { display: flex; gap: 8px; margin-bottom: 24px; flex-wrap: wrap;}
.rc-footer { display: flex; justify-content: space-between; align-items: center; margin-top: 24px; }
.mt-auto { margin-top: auto; }
.rc-time { font-size: 14px; font-weight: 800; font-family: 'NeoDunggeunmo', sans-serif; color: var(--text-muted); display: flex; align-items: center; gap: 6px; }

.w-full { width: 100%; }
.pulse-anim { animation: pulse 1.5s infinite; }
@keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.1); } }
.highlight-card { border-color: var(--accent); box-shadow: 6px 6px 0 var(--accent); }

.custom-scroll::-webkit-scrollbar { width: 8px; }
.custom-scroll::-webkit-scrollbar-track { background: var(--bg-base); border-left: 2px solid var(--border); }
.custom-scroll::-webkit-scrollbar-thumb { background: var(--border-mid); border: 2px solid var(--border); }
</style>