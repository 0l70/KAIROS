<template>
  <div class="app-layout">
    <AppSidebar />
    <main class="main-content custom-scroll">
      
      <header class="page-header">
        <div>
          <h1 class="page-title">학습 기록</h1>
          <p class="page-desc">지금까지의 성장 궤적과 회고를 확인하세요.</p>
        </div>
      </header>

      <div class="page-body">
        
        <div class="filter-bar">
          <div class="tabs">
            <button class="tab-btn active">전체 기록</button>
            <button class="tab-btn">성장 일지(회고)</button>
          </div>
          <select class="track-select">
            <option value="all">모든 트랙</option>
            <option v-for="t in store.allTracks" :key="t.id" :value="t.id">{{ t.name }}</option>
          </select>
        </div>

        <div class="timeline-container">
          <div class="timeline-line"></div>
          
          <div class="timeline-item">
            <div class="tl-date">3월 24일</div>
            <div class="tl-dot"></div>
            <div class="tl-content">
              <div class="tl-card">
                <div class="tl-header">
                  <span class="tl-badge" style="background: #607D8B">졸업작품</span>
                  <span class="tl-time">오후 10:00</span>
                </div>
                <h3 class="tl-title">DB ERD 설계 1차 완료</h3>
                <div class="tl-journal">
                  <i class="fas fa-quote-left quote-icon"></i>
                  <p>유저 테이블과 게시글 테이블의 1:N 관계를 설정했다. JPA로 변환할 때 양방향 매핑을 어떻게 할지 좀 더 고민해봐야겠다.</p>
                </div>
              </div>
            </div>
          </div>

          <div class="timeline-item">
            <div class="tl-date">3월 22일</div>
            <div class="tl-dot"></div>
            <div class="tl-content">
              <div class="tl-card">
                <div class="tl-header">
                  <span class="tl-badge" style="background: #B97A7E">정처기</span>
                  <span class="tl-time">오전 10:00</span>
                </div>
                <h3 class="tl-title">필기 기출 3개년 풀이</h3>
                <div class="tl-journal">
                  <i class="fas fa-quote-left quote-icon"></i>
                  <p>소프트웨어 설계 파트 점수가 잘 안 나온다. 디자인 패턴 암기가 덜 된 것 같아서 내일 다시 요약본을 봐야겠다.</p>
                </div>
              </div>
            </div>
          </div>

          <div class="timeline-item">
            <div class="tl-date">3월 15일</div>
            <div class="tl-dot"></div>
            <div class="tl-content">
              <div class="tl-card">
                <div class="tl-header">
                  <span class="tl-badge" style="background: #A87C6C">CS 전공지식</span>
                  <span class="tl-time">오후 07:00</span>
                </div>
                <h3 class="tl-title">운영체제 스케줄링 복습</h3>
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
import AppSidebar from '@/components/AppSidebar.vue'
import { useCalendarStore } from '@/stores/useCalendarStore'

const store = useCalendarStore()
</script>

<style scoped>
.app-layout { display: flex; width: 100%; height: 100vh; overflow: hidden; background: var(--bg-base); }
.main-content { flex: 1; display: flex; flex-direction: column; overflow-y: auto; background: var(--bg-base); }

.page-header { padding: 32px 40px; border-bottom: 1px solid var(--border); background: var(--bg-surface); position: sticky; top: 0; z-index: 10; }
.page-title { font-size: 22px; font-weight: 800; color: var(--text-primary); margin-bottom: 6px; }
.page-desc { font-size: 13px; color: var(--text-faint); }

.page-body { padding: 32px 40px; max-width: 900px; margin: 0 auto; width: 100%; display: flex; flex-direction: column; gap: 24px; }

/* 상단 필터바 */
.filter-bar { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-mid); padding-bottom: 16px; }
.tabs { display: flex; gap: 16px; }
.tab-btn { background: none; border: none; font-size: 14px; font-weight: 600; color: var(--text-muted); cursor: pointer; padding-bottom: 4px; position: relative; }
.tab-btn.active { color: var(--text-primary); font-weight: 700; }
.tab-btn.active::after { content: ''; position: absolute; bottom: -17px; left: 0; right: 0; height: 2px; background: var(--text-primary); }

.track-select { background: var(--bg-surface); border: 1px solid var(--border); color: var(--text-primary); padding: 6px 12px; border-radius: 8px; font-size: 12px; font-weight: 600; outline: none; }

/* 타임라인 UI */
.timeline-container { position: relative; padding-left: 80px; display: flex; flex-direction: column; gap: 24px; margin-top: 10px; }
.timeline-line { position: absolute; left: 140px; top: 10px; bottom: 0; width: 1px; background: var(--border-mid); }

.timeline-item { position: relative; display: flex; gap: 30px; }
.tl-date { width: 50px; flex-shrink: 0; font-size: 12px; font-weight: 700; color: var(--text-muted); text-align: right; margin-top: 4px; }
.tl-dot { position: absolute; left: 60px; top: 6px; width: 11px; height: 11px; border-radius: 50%; background: var(--bg-surface); border: 2px solid var(--text-faint); z-index: 2; }
.timeline-item:hover .tl-dot { border-color: var(--accent); background: var(--accent); }

.tl-content { flex: 1; }
.tl-card { background: var(--bg-surface); border: 1px solid var(--border); border-radius: 12px; padding: 20px; transition: transform 0.15s, box-shadow 0.15s; }
.tl-card:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.04); }

.tl-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
.tl-badge { font-size: 10px; font-weight: 700; color: #fff; padding: 3px 8px; border-radius: 4px; }
.tl-time { font-size: 11px; color: var(--text-faint); font-family: monospace; }
.tl-title { font-size: 15px; font-weight: 700; color: var(--text-primary); margin-bottom: 8px; }
.tl-desc { font-size: 13px; color: var(--text-secondary); line-height: 1.5; }

/* 회고(Journal) 스타일 */
.tl-journal { background: var(--bg-base); padding: 12px 16px; border-radius: 8px; margin-top: 12px; position: relative; }
.quote-icon { font-size: 12px; color: var(--border-mid); margin-bottom: 6px; display: block; }
.tl-journal p { font-size: 13px; color: var(--text-secondary); line-height: 1.6; font-style: italic; margin: 0; }
</style>