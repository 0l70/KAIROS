<template>
  <div class="app-layout">
    <AppSidebar />
    <main class="main-content custom-scroll">
      <header class="page-header">
        <div>
          <h1 class="page-title">HISTORY</h1>
          <p class="page-desc">지금까지의 성장 궤적과 회고</p>
        </div>
      </header>

      <div class="page-body">
        <div class="filter-bar">
          <div class="tabs">
            <button class="tab-btn active">ALL RECORDS</button>
            <button class="tab-btn">JOURNAL</button>
          </div>
          <select class="track-select">
            <option value="all">ALL TRACKS</option>
            <option v-for="t in store.allTracks" :key="t.id" :value="t.id">{{ t.name }}</option>
          </select>
        </div>

        <div class="timeline-container">
          <div class="timeline-line"></div>
          
          <div class="timeline-item">
            <div class="tl-date">MAR 24</div>
            <div class="tl-dot"></div>
            <div class="tl-content">
              <div class="tl-card">
                <div class="tl-header">
                  <span class="tl-badge">졸업작품</span>
                  <span class="tl-time">22:00</span>
                </div>
                <h3 class="tl-title">DB ERD 설계 1차 완료</h3>
                <div class="tl-journal">
                  <p>"유저와 게시글 1:N 관계 설정 완료. JPA 양방향 매핑 고민 필요."</p>
                </div>
              </div>
            </div>
          </div>

          <div class="timeline-item">
            <div class="tl-date">MAR 22</div>
            <div class="tl-dot"></div>
            <div class="tl-content">
              <div class="tl-card">
                <div class="tl-header">
                  <span class="tl-badge">정처기</span>
                  <span class="tl-time">10:00</span>
                </div>
                <h3 class="tl-title">필기 기출 3개년 풀이</h3>
                <div class="tl-journal">
                  <p>"디자인 패턴 암기 부족 확인. 요약본 재검토 예정."</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import AppSidebar from '@/components/AppSidebar.vue'
import { useCalendarStore } from '@/stores/useCalendarStore'
const store = useCalendarStore()
</script>

<style scoped>
.app-layout { display: flex; width: 100%; height: 100vh; overflow: hidden; background: var(--bg-base); font-family: 'Space Grotesk', 'Escoredream', system-ui, sans-serif; }
.main-content { flex: 1; display: flex; flex-direction: column; overflow-y: auto; background: var(--bg-base); }
.custom-scroll::-webkit-scrollbar { width: 6px; } .custom-scroll::-webkit-scrollbar-thumb { background: var(--border-mid); border-radius: 0; }

.page-header { padding: 40px 40px 20px; border-bottom: 2px solid var(--border); position: sticky; top: 0; background: var(--bg-surface); z-index: 10; }
.page-title { font-size: 32px; font-weight: 900; color: var(--text-primary); letter-spacing: 0.05em; }
.page-desc { font-size: 13px; font-weight: 700; color: var(--text-muted); margin-top: 8px; }

.page-body { padding: 40px; max-width: 900px; margin: 0 auto; width: 100%; display: flex; flex-direction: column; gap: 32px; }

.filter-bar { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid var(--text-primary); padding-bottom: 16px; }
.tabs { display: flex; gap: 24px; }
.tab-btn { background: none; border: none; font-size: 14px; font-weight: 800; color: var(--text-muted); cursor: pointer; letter-spacing: 0.05em; transition: 0.1s; padding: 0 0 8px 0; position: relative; }
.tab-btn.active { color: var(--text-primary); }
.tab-btn.active::after { content: ''; position: absolute; bottom: -18px; left: 0; right: 0; height: 4px; background: var(--text-primary); }

.track-select { background: transparent; border: 2px solid var(--border); font-family: 'Space Grotesk', sans-serif; font-weight: 800; color: var(--text-primary); padding: 8px 12px; font-size: 12px; outline: none; cursor: pointer; border-radius: 0; }
.track-select:hover { border-color: var(--text-primary); }

.timeline-container { position: relative; padding-left: 100px; display: flex; flex-direction: column; gap: 32px; margin-top: 20px; }
.timeline-line { position: absolute; left: 146px; top: 10px; bottom: 0; width: 2px; background: var(--border); }

.timeline-item { position: relative; display: flex; gap: 40px; }
.tl-date { width: 60px; flex-shrink: 0; font-size: 14px; font-weight: 900; color: var(--text-primary); text-align: right; margin-top: 2px; }
.tl-dot { position: absolute; left: 140px; top: 4px; width: 14px; height: 14px; background: var(--bg-base); border: 2px solid var(--text-primary); z-index: 2; transition: 0.1s; }
.timeline-item:hover .tl-dot { background: var(--text-primary); transform: scale(1.2); }

.tl-content { flex: 1; }
.tl-card { background: var(--bg-surface); border: 2px solid var(--text-primary); padding: 24px; box-shadow: 6px 6px 0 var(--border); transition: 0.1s; }
.timeline-item:hover .tl-card { transform: translate(-2px, -2px); box-shadow: 8px 8px 0 var(--text-primary); }

.tl-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; border-bottom: 1px dashed var(--border); padding-bottom: 12px; }
.tl-badge { font-size: 11px; font-weight: 900; color: var(--bg-base); background: var(--text-primary); padding: 4px 8px; letter-spacing: 0.05em; text-transform: uppercase; }
.tl-time { font-size: 12px; font-weight: 800; color: var(--text-muted); }
.tl-title { font-size: 18px; font-weight: 800; color: var(--text-primary); margin-bottom: 12px; }

.tl-journal { background: transparent; border-left: 4px solid var(--text-primary); padding: 8px 16px; margin-top: 16px; }
.tl-journal p { font-size: 14px; font-weight: 600; color: var(--text-secondary); line-height: 1.6; margin: 0; font-style: italic; }
</style>