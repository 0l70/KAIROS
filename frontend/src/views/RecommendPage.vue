<template>
  <div class="app-layout">
    <AppSidebar />

    <main class="main-content custom-scroll">
      <header class="page-header">
        <div class="header-title"><i class="fas fa-compass" /> RECOMMENDATIONS</div>
      </header>

      <div class="content-inner">
        <div class="title-section">
          <h2>새로운 학습을 시작해볼까요?</h2>
          <p>최근 학습 기록과 목표를 바탕으로 AI가 다음 단계를 제안합니다.</p>
        </div>

        <div class="recommend-grid">
          <section class="brutal-panel highlight-panel">
            <div class="panel-badge">TOP MATCH</div>
            <h3 class="panel-title">Next.js App Router 심화 및 최적화</h3>
            <p class="panel-desc">
              최근 React 최적화 학습을 완료하셨네요! 다음 단계로 Next.js의 App Router를 활용한 서버 사이드 렌더링(SSR) 및 라우팅 최적화 학습을 추천합니다.
            </p>
            <div class="tag-group">
              <span class="brutal-tag">Next.js</span>
              <span class="brutal-tag">SSR</span>
              <span class="brutal-tag">예상 소요: 3일</span>
            </div>
            
            <div class="panel-actions">
              <button class="btn-outline-invert" @click="showReasonModal = true">
                <i class="fas fa-magic" /> AI 추천 이유 보기
              </button>
              <button class="btn-primary-invert" @click="$router.push('/curriculum/suggest')">
                커리큘럼 확인하기 <i class="fas fa-arrow-right" />
              </button>
            </div>
          </section>

          <div class="sub-grid">
            <section class="brutal-panel">
              <div class="panel-top">
                <i class="fas fa-file-alt panel-icon" />
                <h3>아티클 추천</h3>
              </div>
              <p class="panel-desc">"React 18의 동시성 렌더링 이해하기" 공식 문서와 번역본을 읽어보세요.</p>
              <div class="mt-auto flex-row">
                <button class="btn-outline flex-1" @click="$router.push('/activity/select')">읽기 시작</button>
              </div>
            </section>

            <section class="brutal-panel">
              <div class="panel-top">
                <i class="fas fa-brain panel-icon" />
                <h3>복습 퀴즈</h3>
              </div>
              <p class="panel-desc">지난주에 학습한 상태 관리(Zustand) 개념을 퀴즈로 가볍게 점검해보세요.</p>
              <div class="mt-auto flex-row">
                <button class="btn-outline flex-1" @click="$router.push('/quiz')">퀴즈 풀기</button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>

    <div v-if="showReasonModal" class="modal-overlay" @click.self="showReasonModal = false">
      <div class="brutal-modal">
        <div class="modal-header">
          <h3><i class="fas fa-magic" style="color: #ffca28;" /> AI가 이 과정을 추천한 이유</h3>
          <button class="btn-close" @click="showReasonModal = false"><i class="fas fa-times"/></button>
        </div>

        <div class="reason-content custom-scroll">
          <div class="reason-item">
            <div class="reason-item-header">
              <i class="fab fa-github" />
              <h4>GitHub 활동 분석</h4>
            </div>
            <p>최근 2주간 React의 <code>useMemo</code>와 <code>useCallback</code>을 활용한 렌더링 최적화 커밋이 15건 이상 발생했습니다. 프론트엔드 최적화의 기초를 충분히 다진 것으로 판단되어, 다음 단계인 SSR(서버 사이드 렌더링) 및 Next.js 도입을 추천합니다.</p>
          </div>

          <div class="reason-item">
            <div class="reason-item-header">
              <i class="fas fa-file-alt" />
              <h4>Velog 회고 분석</h4>
            </div>
            <p>작성하신 "React 성능 최적화 후기" 포스팅 말미에 '다음에는 Next.js를 프로젝트에 적용해보고 싶다'는 목표를 남기셨습니다. 해당 목표를 바로 실행으로 옮길 수 있도록 과정을 구성했습니다.</p>
          </div>

          <div class="reason-item">
            <div class="reason-item-header">
              <i class="fas fa-bullseye" />
              <h4>사전 설문 및 목표</h4>
            </div>
            <p>희망 포지션을 <strong>'프론트엔드 개발자'</strong>로 설정하셨으며, 최근 프론트엔드 채용 시장에서 Next.js App Router 경험이 필수적인 요구사항으로 떠오르고 있어 커리어 성장에 매우 유리합니다.</p>
          </div>
        </div>

        <div class="modal-actions">
          <button class="btn-primary-small" @click="showReasonModal = false">확인</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import AppSidebar from '@/components/AppSidebar.vue'

const router = useRouter()
const showReasonModal = ref(false)
</script>

<style scoped>
.app-layout { display: flex; width: 100%; height: 100vh; overflow: hidden; background: var(--bg-base); font-family: 'Space Grotesk', 'Escoredream', system-ui, sans-serif; }
.main-content { flex: 1; display: flex; flex-direction: column; overflow-y: auto; position: relative; }
.custom-scroll { -ms-overflow-style: none; scrollbar-width: none; }
.custom-scroll::-webkit-scrollbar { display: none; }

.page-header { display: flex; align-items: center; padding: 20px 32px; border-bottom: 2px solid var(--text-primary); background: var(--bg-surface); position: sticky; top: 0; z-index: 10; }
.header-title { font-size: 16px; font-weight: 900; letter-spacing: 0.1em; color: var(--text-primary); display: flex; align-items: center; gap: 10px; }

.content-inner { max-width: 1000px; margin: 0 auto; padding: 48px 32px; width: 100%; }
.title-section { margin-bottom: 40px; }
.title-section h2 { font-size: 28px; font-weight: 900; color: var(--text-primary); margin-bottom: 12px; }
.title-section p { font-size: 15px; font-weight: 700; color: var(--text-muted); }

.recommend-grid { display: flex; flex-direction: column; gap: 24px; }
.sub-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; }

.brutal-panel { background: var(--bg-surface); border: 2px solid var(--text-primary); padding: 32px; box-shadow: 6px 6px 0 #6b7280; display: flex; flex-direction: column; transition: all 0.1s; }
.brutal-panel:hover { transform: translate(-2px, -2px); box-shadow: 8px 8px 0 #6b7280; }

.highlight-panel { background: var(--text-primary); color: var(--bg-base); }
.highlight-panel .panel-title { color: var(--bg-base); font-size: 24px; font-weight: 900; margin-bottom: 16px; }
.highlight-panel .panel-desc { color: var(--bg-base); opacity: 0.9; font-size: 15px; line-height: 1.6; margin-bottom: 24px; }

.panel-badge { display: inline-block; padding: 6px 12px; border: 2px solid var(--bg-base); font-size: 12px; font-weight: 900; letter-spacing: 0.1em; margin-bottom: 20px; align-self: flex-start; }

.tag-group { display: flex; gap: 10px; margin-bottom: 32px; flex-wrap: wrap; }
.brutal-tag { padding: 6px 12px; border: 2px solid var(--bg-base); background: transparent; font-size: 12px; font-weight: 800; }

.panel-actions { display: flex; justify-content: flex-end; gap: 12px; flex-wrap: wrap; }
.btn-primary-invert { padding: 16px 24px; font-size: 14px; font-weight: 900; cursor: pointer; display: inline-flex; align-items: center; gap: 8px; background: var(--bg-base); color: var(--text-primary); border: 2px solid var(--bg-base); transition: all 0.1s; box-shadow: 4px 4px 0 rgba(0,0,0,0.5); }
.btn-primary-invert:hover { box-shadow: 6px 6px 0 rgba(0,0,0,0.8); transform: translate(-2px, -2px); }
.btn-outline-invert { padding: 14px 20px; font-size: 14px; font-weight: 900; cursor: pointer; display: inline-flex; align-items: center; gap: 8px; background: transparent; color: var(--bg-base); border: 2px solid var(--bg-base); transition: all 0.1s; box-shadow: 4px 4px 0 rgba(0,0,0,0.3); }
.btn-outline-invert:hover { background: var(--bg-base); color: var(--text-primary); transform: translate(-2px, -2px); box-shadow: 6px 6px 0 rgba(0,0,0,0.5); }

.panel-top { display: flex; align-items: center; gap: 10px; margin-bottom: 16px; }
.panel-icon { font-size: 20px; color: var(--text-primary); }
.panel-top h3 { font-size: 18px; font-weight: 900; color: var(--text-primary); }
.brutal-panel .panel-desc { font-size: 14px; font-weight: 700; color: var(--text-muted); line-height: 1.6; margin-bottom: 24px; }

.mt-auto { margin-top: auto; }
.flex-row { display: flex; gap: 12px; }
.flex-1 { flex: 1; text-align: center; }

.btn-outline { padding: 14px 20px; font-size: 14px; font-weight: 900; cursor: pointer; background: var(--bg-base); color: var(--text-primary); border: 2px solid var(--text-primary); transition: all 0.1s; box-shadow: 4px 4px 0 #6b7280; }
.btn-outline:hover { background: var(--text-primary); color: var(--bg-base); box-shadow: 6px 6px 0 #6b7280; transform: translate(-2px, -2px); }

/* 모달 관련 CSS */
.modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.7); backdrop-filter: blur(2px); z-index: 1000; display: flex; align-items: center; justify-content: center; padding: 24px; }
.brutal-modal { width: 100%; max-width: 560px; max-height: 85vh; display: flex; flex-direction: column; background: var(--bg-base); border: 2px solid var(--text-primary); box-shadow: 12px 12px 0 #6b7280; padding: 32px; animation: popUp 0.2s ease-out; }
@keyframes popUp { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }

.modal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; border-bottom: 2px solid var(--border); padding-bottom: 16px; }
.modal-header h3 { font-size: 18px; font-weight: 900; color: var(--text-primary); display: flex; align-items: center; gap: 8px; }
.btn-close { background: transparent; border: none; font-size: 20px; color: var(--text-primary); cursor: pointer; transition: transform 0.1s; }
.btn-close:hover { transform: scale(1.2); }

.reason-content { flex: 1; display: flex; flex-direction: column; gap: 20px; margin-bottom: 24px; padding-right: 8px; }
.reason-item { background: var(--bg-surface); border: 2px dashed var(--border); padding: 20px; transition: all 0.1s; }
.reason-item:hover { border-color: var(--text-primary); border-style: solid; box-shadow: 4px 4px 0 #6b7280; transform: translate(-2px, -2px); }
.reason-item-header { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; }
.reason-item-header i { font-size: 18px; color: var(--text-primary); }
.reason-item-header h4 { font-size: 15px; font-weight: 900; color: var(--text-primary); }
.reason-item p { font-size: 13px; font-weight: 700; color: var(--text-muted); line-height: 1.6; }
.reason-item code { background: var(--text-primary); color: var(--bg-base); padding: 2px 6px; font-size: 12px; font-family: monospace; font-weight: bold; }

.modal-actions { display: flex; justify-content: flex-end; }
.btn-primary-small { padding: 12px 24px; background: var(--text-primary); color: var(--bg-base); border: 2px solid var(--text-primary); font-size: 13px; font-weight: 900; cursor: pointer; transition: all 0.1s; box-shadow: 4px 4px 0 #6b7280; }
.btn-primary-small:hover { transform: translate(-2px, -2px); box-shadow: 6px 6px 0 #6b7280; background: transparent; color: var(--text-primary); }

@media (max-width: 768px) {
  .sub-grid { grid-template-columns: 1fr; }
}
</style>