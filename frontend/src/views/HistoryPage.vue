<template>
  <div class="app-layout" :class="themeStore.isDark ? 'theme-dark' : 'theme-light'">
    <div class="crt-scanlines"></div>
    <div class="retro-dot-bg"></div>

    <AppSidebar />
    <main class="main-content custom-scroll">
      
      <header class="page-header">
        <div>
          <h1 class="page-title retro-text-hover">HISTORY_LOG</h1>
          <p class="page-desc">시스템에 기록된 성장 궤적 및 터미널 회고 로그</p>
        </div>
      </header>

      <div class="page-body">
        
        <div class="filter-bar retro-panel">
          <div class="tabs">
            <button class="mech-key key-accent-2 retro-text-hover">ALL LOGS</button>
            <button class="mech-key retro-text-hover">JOURNAL</button>
          </div>
          <select class="track-select mech-key">
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
              <div class="tl-card retro-panel">
                <div class="tl-header">
                  <span class="tl-badge retro-badge text-accent-2">졸업작품</span>
                  <span class="tl-time">22:00</span>
                </div>
                <h3 class="tl-title retro-text-hover">DB ERD 설계 1차 완료</h3>
                <div class="tl-journal terminal-input">
                  <i class="fas fa-quote-left quote-icon"></i>
                  <p>유저 테이블과 게시글 테이블의 1:N 관계를 설정했다. JPA로 변환할 때 양방향 매핑을 어떻게 할지 좀 더 고민해봐야겠다.</p>
                </div>
              </div>
            </div>
          </div>

          <div class="timeline-item">
            <div class="tl-date">MAR 22</div>
            <div class="tl-dot"></div>
            <div class="tl-content">
              <div class="tl-card retro-panel">
                <div class="tl-header">
                  <span class="tl-badge retro-badge text-accent-1">정처기</span>
                  <span class="tl-time">10:00</span>
                </div>
                <h3 class="tl-title retro-text-hover">필기 기출 3개년 풀이</h3>
                <div class="tl-journal terminal-input">
                  <i class="fas fa-quote-left quote-icon"></i>
                  <p>소프트웨어 설계 파트 점수가 잘 안 나온다. 디자인 패턴 암기가 덜 된 것 같아서 내일 다시 요약본을 봐야겠다.</p>
                </div>
              </div>
            </div>
          </div>

          <div class="timeline-item">
            <div class="tl-date">MAR 15</div>
            <div class="tl-dot"></div>
            <div class="tl-content">
              <div class="tl-card retro-panel">
                <div class="tl-header">
                  <span class="tl-badge retro-badge text-accent-4">CS 전공지식</span>
                  <span class="tl-time">19:00</span>
                </div>
                <h3 class="tl-title retro-text-hover">운영체제 스케줄링 복습</h3>
                <p class="tl-desc">라운드로빈, SJF 등 CPU 스케줄링 알고리즘 개념 정리 완료.</p>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import AppSidebar from '@/components/AppSidebar.vue'
import { useCalendarStore } from '@/stores/useCalendarStore'
import { useThemeStore } from '@/stores/useThemeStore'

const store = useCalendarStore()
const themeStore = useThemeStore()

onMounted(() => { if (themeStore.isDark) themeStore.isDark = false; })
</script>

<style scoped>
@font-face { font-family: 'Mulmaru'; src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/2601-4@1.1/Mulmaru.woff2') format('woff2'); font-weight: normal; font-display: swap; }
@font-face { font-family: 'NeoDunggeunmo'; src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.3/NeoDunggeunmoPro-Regular.woff2') format('woff2'); font-weight: normal; font-display: swap; }

.theme-light { --k-bg: #F4F0EB; --k-housing: #E6DFD3; --k-key-bg: #FFFFFF; --k-key-border: #1A1A1A; --k-key-shadow: #1A1A1A; --k-border-main: #1A1A1A; --bg-base: #F4F0EB; --bg-surface: #E6DFD3; --bg-elevated: #FFFFFF; --border: #1A1A1A; --border-mid: #1A1A1A; --text-primary: #1A1A1A; --text-secondary: #333333; --text-muted: #555555; --text-faint: #777777; --accent: #E53935; --k-acc-1-bg: #E53935; --k-acc-1-shadow: #B71C1C; --k-acc-2-bg: #1E88E5; --k-acc-2-shadow: #1565C0; --k-acc-3-bg: #43A047; --k-acc-3-shadow: #2E7D32; --k-acc-4-bg: #FBC02D;}
.theme-dark { --k-bg: #1A1A1A; --k-housing: #2C2C2C; --k-key-bg: #3D3D3D; --k-key-border: #000000; --k-key-shadow: #000000; --k-border-main: #000000; --bg-base: #1A1A1A; --bg-surface: #2C2C2C; --bg-elevated: #3D3D3D; --border: #000000; --border-mid: #000000; --text-primary: #F0F0F0; --text-secondary: #CCCCCC; --text-muted: #999999; --text-faint: #666666; --accent: #FF5252; --k-acc-1-bg: #FF5252; --k-acc-1-shadow: #D50000; --k-acc-2-bg: #448AFF; --k-acc-2-shadow: #2962FF; --k-acc-3-bg: #69F0AE; --k-acc-3-shadow: #00E676; --k-acc-4-bg: #FFD54F;}

.app-layout { display: flex; width: 100%; height: 100vh; overflow: hidden; background: var(--bg-base); font-family: 'Mulmaru', sans-serif; position: relative; }
.main-content { flex: 1; display: flex; flex-direction: column; overflow-y: auto; z-index: 10; }
.crt-scanlines { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(rgba(18,16,16,0) 50%, rgba(0,0,0,0.1) 50%); background-size: 100% 4px; z-index: 9999; pointer-events: none; opacity: 0.15; }
.theme-dark .crt-scanlines { opacity: 0.3; }
.retro-dot-bg { position: absolute; inset: 0; background-image: radial-gradient(var(--border-mid) 1px, transparent 1px); background-size: 20px 20px; opacity: 0.1; z-index: 0; pointer-events: none; }

.retro-panel { background: var(--bg-surface); border: 2px solid var(--border); box-shadow: 4px 4px 0 var(--border); border-radius: 4px; }
.retro-badge { border: 2px solid var(--border); box-shadow: 2px 2px 0 var(--border); border-radius: 4px; padding: 4px 8px; font-family: 'NeoDunggeunmo', sans-serif; font-size: 12px; background: var(--bg-elevated); color: var(--text-primary); }
.terminal-input { background: var(--k-key-shadow); color: var(--k-acc-3-bg); border: 2px solid var(--border); border-radius: 4px; box-shadow: inset 0 4px 8px rgba(0,0,0,0.4); padding: 16px; font-family: 'NeoDunggeunmo', sans-serif; line-height: 1.6; }

.mech-key { padding: 8px 16px; background: var(--bg-elevated); color: var(--text-primary); border: 2px solid var(--border); border-radius: 4px; box-shadow: 4px 4px 0 var(--border); cursor: pointer; font-family: 'NeoDunggeunmo', sans-serif; font-size: 14px; font-weight: 800; transition: all 0.1s; display: inline-flex; align-items: center; justify-content: center; gap: 8px; }
.mech-key:active { transform: translate(4px, 4px) !important; box-shadow: 0 0 0 transparent !important; }
.key-accent-2 { background: var(--text-primary); color: var(--bg-base); }

/* 💡 아날로그 지터 호버 (글리치 삭제) */
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

.page-body { padding: 40px; max-width: 900px; margin: 0 auto; width: 100%; display: flex; flex-direction: column; gap: 32px; }

.filter-bar { display: flex; justify-content: space-between; align-items: center; padding: 16px; }
.tabs { display: flex; gap: 16px; }
.track-select { outline: none; }

.timeline-container { position: relative; padding-left: 80px; display: flex; flex-direction: column; gap: 32px; margin-top: 10px; }
.timeline-line { position: absolute; left: 140px; top: 10px; bottom: 0; width: 2px; border-left: 4px dashed var(--border); opacity: 0.5;}

.timeline-item { position: relative; display: flex; gap: 40px; }
.tl-date { width: 50px; flex-shrink: 0; font-size: 14px; font-weight: 900; font-family: 'NeoDunggeunmo', sans-serif; color: var(--text-primary); text-align: right; margin-top: 4px; }
.tl-dot { position: absolute; left: 56px; top: 6px; width: 14px; height: 14px; background: var(--bg-surface); border: 2px solid var(--border); z-index: 2; transition: 0.2s; box-shadow: 2px 2px 0 var(--border);}
.timeline-item:hover .tl-dot { background: var(--accent); }

.tl-content { flex: 1; }
.tl-card { padding: 24px; transition: transform 0.1s; }
.tl-card:hover { transform: translate(-4px, -4px); box-shadow: 8px 8px 0 var(--border); }

.tl-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
.tl-badge { font-size: 12px; }
.tl-time { font-size: 14px; font-weight: 800; color: var(--text-muted); font-family: 'NeoDunggeunmo', sans-serif; }
.tl-title { font-size: 20px; font-weight: 900; font-family: 'NeoDunggeunmo', sans-serif; color: var(--text-primary); margin-bottom: 12px; }
.tl-desc { font-size: 14px; font-weight: 600; color: var(--text-secondary); line-height: 1.6; }

.tl-journal { margin-top: 16px; position: relative; }
.quote-icon { font-size: 14px; color: var(--accent); margin-bottom: 8px; display: block; }
.tl-journal p { font-size: 14px; color: var(--k-acc-3-bg); line-height: 1.8; margin: 0; }

.custom-scroll::-webkit-scrollbar { width: 8px; }
.custom-scroll::-webkit-scrollbar-track { background: var(--bg-base); border-left: 2px solid var(--border); }
.custom-scroll::-webkit-scrollbar-thumb { background: var(--border-mid); border: 2px solid var(--border); }
</style>