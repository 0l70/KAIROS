<template>
  <div class="app-layout" :class="themeStore.isDark ? 'theme-dark' : 'theme-light'">
    <div class="crt-scanlines"></div>
    <div class="retro-dot-bg"></div>

    <AppSidebar />

    <main class="main-content custom-scroll">
      <header class="page-header">
<<<<<<< HEAD
        <div class="header-title"><i class="fas fa-compass" /> RECOMMENDATIONS</div>
      </header>

      <div class="content-inner">
        <!-- 첫 진입 시 (활동 목록을 고르지 않은 상태) -->
        <template v-if="!selectedActivity">
          <div class="title-section">
            <h2>추천</h2>
            <p>최근 7일간 활동을 기반으로 맞춤 추천을 제공합니다. 확인할 활동을 선택하세요.</p>
=======
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

>>>>>>> d9d81185ededc2b2de1631f9ff7968776e03e2e7
          </div>

<<<<<<< HEAD
          <div class="recommend-grid">
            <button
              v-for="activity in store.recentActivities"
              :key="activity.id"
              class="brutal-panel activity-card"
              @click="selectedActivity = activity.id"
            >
              <div class="activity-top">
                <div class="activity-icon-wrap" :class="'type-' + activity.type">
                  <i :class="activityTypeConfig[activity.type].icon" />
                </div>
                <div class="activity-info">
                  <div class="activity-header">
                    <span class="activity-title">{{ activity.title }}</span>
                    <span v-if="activity.status === 'in-progress'" class="brutal-tag active-tag">진행 중</span>
                    <span v-if="activity.status === 'done'" class="brutal-tag done-tag">완료</span>
                  </div>
                  <div class="activity-meta">
                    <span class="activity-date"><i class="fas fa-calendar-alt" /> {{ activity.date }}</span>
                    <div class="tag-group-small">
                      <span v-for="tag in activity.tags" :key="tag" class="small-tag">{{ tag }}</span>
                    </div>
                  </div>
                </div>
                <i class="fas fa-arrow-right arrow-icon" />
              </div>
            </button>
          </div>
        </template>

        <!-- 특정 활동(맥락)을 선택하여 들어온 후 -->
        <template v-else>
          <button class="btn-back" @click="handleBack">
            <i class="fas fa-arrow-left" /> 활동 목록으로 돌아가기
          </button>

          <section class="brutal-panel highlight-panel main-recommendation mb-gap">
            <div class="panel-header-flex">
              <div class="flex-align">
                <div class="icon-box-white"><i class="fas fa-lightbulb" /></div>
                <div>
                  <div class="panel-title-group">
                    <h3 class="panel-title">React Server Components 심화 학습</h3>
                    <button class="btn-primary-small-invert" @click="showCurriculumModal = true">
                      <i class="fas fa-book-open" /> 커리큘럼 추천받기
                    </button>
                  </div>
                  <span class="panel-sub">맞춤 추천 · 최근 학습 흐름 기반</span>
                </div>
              </div>
              <div class="flex-align gap-sm">
                <span class="brutal-tag badge-dark">AI 추천</span>
                <button class="btn-outline-small" @click="$router.push('/recommend/new-learning')">
                  <i class="fas fa-plus" /> 신규 학습 시작
                </button>
              </div>
            </div>

            <p class="panel-desc large-desc">
              최근 React 상태관리 학습을 완료하고, Next.js App Router 기반 프로젝트를 진행하고 있습니다. 
              현재 기술 흐름에서 자연스럽게 이어지는 React Server Components를 다음 학습 주제로 추천합니다.
            </p>

            <div class="flow-box">
              <div class="flow-title">최근 학습 흐름</div>
              <div class="flow-track scroll-x">
                <template v-for="(flow, index) in store.recentFlow" :key="index">
                  <div class="flow-item">
                    <span class="flow-node" :class="'status-' + flow.status">{{ flow.label }}</span>
                    <span v-if="index < store.recentFlow.length - 1" class="flow-line"></span>
                  </div>
                </template>
                <div class="flow-item">
                  <span class="flow-line"></span>
                  <span class="flow-node dashed-node">RSC 학습</span>
                </div>
              </div>
            </div>

            <div class="flex-footer">
              <div class="info-group">
                <span class="info-text"><i class="fas fa-clock" /> 예상 소요: 4시간 40분 (5일)</span>
                <span class="info-text"><i class="fas fa-chart-line" /> 난이도: 중급</span>
              </div>
              <div class="tag-group">
                <span class="brutal-tag tag-white" v-for="tag in ['React', 'SSR', 'Next.js']" :key="tag">
                  <i class="fas fa-tag" style="font-size: 10px;" /> {{ tag }}
                </span>
              </div>
              <button class="btn-outline-invert ml-auto" @click="showReasonModal = true">
                <i class="fas fa-info-circle" /> 추천 근거 보기
              </button>
            </div>
          </section>

          <!-- 미션 및 활성 패널 구역 -->
          <div class="layout-split" :class="{ 'has-active': activeMission }">
            <div class="mission-list">
              <div class="flex-between mb-sm" v-if="activeMission">
                <span></span>
                <button class="btn-text" @click="closeMission">전체 보기</button>
              </div>
              
              <div class="missions-grid" :class="{ 'compact': activeMission }">
                <div 
                  v-for="mission in store.missions" 
                  :key="mission.key"
                  class="brutal-panel mission-card"
                  :class="{ 'active': activeMission === mission.key }"
                >
                  <div class="mission-icon"><i :class="mission.icon" /></div>
                  <div class="mission-content">
                    <div class="mission-header">
                      <span class="mission-title">{{ mission.title }}</span>
                      <span v-if="mission.badge" class="brutal-tag small-badge">{{ mission.badge }}</span>
                    </div>
                    <p class="mission-desc">{{ mission.desc }}</p>
                    <div class="mission-footer mt-md">
                      <div class="info-group">
                        <span class="info-text"><i class="fas fa-clock" /> {{ mission.time }}</span>
                        <span class="brutal-tag outline-badge ml-sm">{{ mission.tag }}</span>
                      </div>
                      <button 
                        class="btn-primary-small" 
                        :class="{ 'btn-dark': activeMission === mission.key }" 
                        @click="openMission(mission.key)"
                      >
                        시작하기 <i class="fas fa-arrow-right" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div v-if="activeMission" class="active-panel">
              <div class="brutal-panel panel-sticky shadow-heavy p-0">
                <div class="panel-header-flex mb-md p-lg border-b">
                  <div>
                    <h3 class="panel-title-lg">{{ activeMission === 'quiz' ? '복습 퀴즈' : 'velog 글 작성하기' }}</h3>
                    <p class="panel-sub" v-if="activeMission === 'quiz'">퀴즈 제안과 실제 퀴즈 흐름을 확인합니다.</p>
                    <p class="panel-sub mt-sm" v-if="activeMission === 'velog'">글 작성을 위한 레퍼런스와 뼈대를 제안합니다.</p>
                  </div>
                  <button class="btn-close" @click="closeMission"><i class="fas fa-times" /></button>
                </div>

                <!-- 퀴즈 패널 내용 -->
                <div v-if="activeMission === 'quiz'" class="panel-body p-lg pt-0">
                  <template v-if="quizStep === 'intro'">
                    <div class="info-box mb-md">
                      <div class="info-title"><i class="fas fa-brain" /> 이전 학습 맥락 기반 복습 퀴즈</div>
                      <p>최근 학습한 React Server Components와 렌더링 흐름을 다시 떠올릴 수 있게 핵심 개념 위주로 구성했습니다.</p>
                    </div>
                    <div class="grid-2 col-gap mb-md">
                      <div class="stat-box">
                        <span class="stat-lbl">예상 소요 시간</span>
                        <span class="stat-val">약 15분</span>
                      </div>
                      <div class="stat-box">
                        <span class="stat-lbl">문항 수</span>
                        <span class="stat-val">총 2문제</span>
                      </div>
                    </div>
                    <button class="btn-primary-block" @click="quizStep = 'question'">퀴즈 시작하기</button>
                  </template>

                  <template v-else-if="quizStep === 'question'">
                    <div class="progress-bar-wrap mb-md">
                      <div class="flex-between mb-xs">
                        <span class="lbl-light">문제 {{ currentQuizIndex + 1 }} / {{ store.quizQuestions.length }}</span>
                        <span class="lbl-bold">진행 중</span>
                      </div>
                      <div class="track-bg"><div class="track-fill" :style="{ width: ((currentQuizIndex + 1) / store.quizQuestions.length) * 100 + '%' }"></div></div>
                    </div>

                    <div class="brutal-panel mb-md p-md">
                      <h4 class="quiz-q">{{ store.quizQuestions[currentQuizIndex].question }}</h4>
                      <div class="options-list">
                        <button 
                          v-for="(opt, idx) in store.quizQuestions[currentQuizIndex].options" 
                          :key="idx"
                          class="option-btn"
                          :class="{ 'selected': selectedOption === idx }"
                          @click="selectedOption = idx"
                        >
                          <div class="radio-circle">
                            <div class="radio-inner" v-if="selectedOption === idx"></div>
                          </div>
                          <span>{{ opt }}</span>
                        </button>
                      </div>
                    </div>
                    <button class="btn-primary-block" :disabled="selectedOption === null" @click="handleQuizSubmit">
                      {{ currentQuizIndex < store.quizQuestions.length - 1 ? '다음 문제' : '결과 확인' }}
                    </button>
                  </template>

                  <template v-else-if="quizStep === 'result'">
                    <div class="info-box center-txt mb-md p-lg">
                      <div class="score-circle">{{ quizCorrectCount }}/{{ store.quizQuestions.length }}</div>
                      <h3 class="panel-title mb-sm mt-md">퀴즈를 완료했어요!</h3>
                      <p>현재 이해 수준을 반영해서 다음 추천 흐름을 조정할 수 있습니다.</p>
                    </div>
                  </template>
                </div>

                <!-- 벨로그 래퍼런스 패널 -->
                <div v-if="activeMission === 'velog'" class="panel-body p-lg pt-0">
                  <div class="info-box mb-md">
                    <div class="info-title"><i class="fas fa-pen-nib" /> velog 글 작성을 위한 레퍼런스 추천</div>
                    <p>글을 대신 써주는 것이 아니라, 지금 학습 흐름에 맞는 참고 자료를 추천해서 글 구조를 잡는 데 도움을 줍니다.</p>
                  </div>

                  <div class="ref-list space-y">
                    <div v-for="ref in store.references" :key="ref.title" class="brutal-panel p-md option-btn">
                      <div class="flex-between mb-sm">
                        <div class="flex-align gap-sm"><i class="fas fa-file-alt text-muted" /><span class="font-bold">{{ ref.title }}</span></div>
                        <span class="brutal-tag outline-badge">{{ ref.type }}</span>
                      </div>
                      <p class="text-muted text-sm ml-lg mb-sm">{{ ref.reason }}</p>
                      <div class="flex-between ml-lg mt-md">
                        <div class="flex-align gap-md text-muted text-xs">
                          <span>{{ ref.freshness }}</span>
                          <span><i class="fas fa-shield-alt" /> 안전한 링크</span>
                        </div>
                        <button class="btn-text-muted"><i class="fas fa-external-link-alt" /> 보기</button>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </template>
=======
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
>>>>>>> d9d81185ededc2b2de1631f9ff7968776e03e2e7
      </div>
    </main>

    <!-- 모달: 추천 이유 -->
    <div v-if="showReasonModal" class="modal-overlay" @click.self="showReasonModal = false">
      <div class="brutal-modal shadow-heavy">
        <div class="modal-header">
          <h3><i class="fas fa-magic" /> 추천 근거 확인</h3>
          <button class="btn-close" @click="showReasonModal = false"><i class="fas fa-times"/></button>
        </div>
        <div class="reason-content custom-scroll">
          <div class="reason-item shadow-normal">
            <div class="reason-item-header"><i class="fab fa-github" /><h4>GitHub 활동 분석</h4></div>
            <p>최근 2주간 React의 <code>useMemo</code>와 <code>useCallback</code>을 활용한 렌더링 최적화 커밋이 15건 이상 발생했습니다. 프론트엔드 최적화의 기초를 충분히 다진 것으로 판단되어, 다음 단계인 SSR(서버 사이드 렌더링) 및 Next.js 도입을 추천합니다.</p>
          </div>
          <div class="reason-item shadow-normal">
            <div class="reason-item-header"><i class="fas fa-bullseye" /><h4>설문 및 목표</h4></div>
            <p>희망 포지션을 <strong>'프론트엔드 개발자'</strong>로 설정하셨으며, 최근 시장에서 Next.js App Router 경험이 필수적 요구사항으로 떠오르고 있습니다.</p>
          </div>
        </div>
        <div class="modal-actions mt-md"><button class="btn-primary" @click="showReasonModal = false">확인</button></div>
      </div>
    </div>

    <!-- 모달: 커리큘럼 추천 -->
    <div v-if="showCurriculumModal" class="modal-overlay" @click.self="showCurriculumModal = false">
      <div class="brutal-modal shadow-heavy">
        <div class="modal-header">
          <h3><i class="fas fa-book-open" /> 추천 커리큘럼</h3>
          <button class="btn-close" @click="showCurriculumModal = false"><i class="fas fa-times"/></button>
        </div>
        <div class="reason-content custom-scroll">
          <div v-for="i in 3" :key="i" class="reason-item shadow-normal">
            <div class="flex-between mb-xs">
              <span class="font-bold text-sm">{{ i }}일차</span>
              <span class="text-muted text-xs"><i class="fas fa-clock"/> 1시간 30분</span>
            </div>
            <h4 class="mb-xs">RSC의 핵심 개념 {{ i }}</h4>
            <p class="text-muted text-sm">Server Component와 Client Component의 경계선을 이해합니다.</p>
          </div>
        </div>
        <div class="modal-actions mt-md"><button class="btn-primary" @click="showCurriculumModal = false">확인</button></div>
      </div>
    </div>

  </div>
</template>

<script setup>
<<<<<<< HEAD
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useRecommendStore } from '@/stores/useRecommendStore'
import AppSidebar from '@/components/AppSidebar.vue'

const router = useRouter()
const store = useRecommendStore()

const activityTypeConfig = {
  study: { icon: "fas fa-book-open" },
  dev:   { icon: "fas fa-code" },
  blog:  { icon: "fas fa-file-alt" },
  review:{ icon: "fas fa-clock" },
}

const selectedActivity = ref(null)
const showReasonModal = ref(false)
const showCurriculumModal = ref(false)

const activeMission = ref(null)
const quizStep = ref("intro") // 'intro' | 'question' | 'result'
const currentQuizIndex = ref(0)
const selectedOption = ref(null)
const quizAnswers = ref([])

const handleBack = () => {
  selectedActivity.value = null
  closeMission()
}

const openMission = (missionKey) => {
  activeMission.value = missionKey
  quizStep.value = "intro"
  currentQuizIndex.value = 0
  selectedOption.value = null
  quizAnswers.value = []
}

const closeMission = () => {
  activeMission.value = null
  quizStep.value = "intro"
  currentQuizIndex.value = 0
  selectedOption.value = null
  quizAnswers.value = []
}

const handleQuizSubmit = () => {
  if (selectedOption.value === null) return
  quizAnswers.value.push(selectedOption.value)
  if (currentQuizIndex.value < store.quizQuestions.length - 1) {
    currentQuizIndex.value++
    selectedOption.value = null
  } else {
    quizStep.value = 'result'
  }
}

const quizCorrectCount = computed(() => {
  return quizAnswers.value.filter((ans, idx) => ans === store.quizQuestions[idx].correct).length
})

</script>

<style scoped>
.app-layout { display: flex; width: 100%; height: 100vh; overflow: hidden; background: var(--bg-base); font-family: 'Space Grotesk', 'Escoredream', system-ui, sans-serif; }
.main-content { flex: 1; display: flex; flex-direction: column; overflow-y: auto; position: relative; }
.custom-scroll { -ms-overflow-style: none; scrollbar-width: none; }
.custom-scroll::-webkit-scrollbar { display: none; }

.page-header { display: flex; align-items: center; padding: 16px 24px; border-bottom: 1px solid var(--border); background: var(--bg-surface); position: sticky; top: 0; z-index: 10; }
.header-title { font-size: 16px; font-weight: 800; letter-spacing: 0.1em; color: var(--text-primary); display: flex; align-items: center; gap: 10px; }

.content-inner { max-width: 1000px; margin: 0 auto; padding: 48px 32px; width: 100%; }
.title-section { margin-bottom: 32px; }
.title-section h2 { font-size: 24px; font-weight: 800; color: var(--text-primary); margin-bottom: 8px; letter-spacing: 0.05em; }
.title-section p { font-size: 14px; font-weight: 600; color: var(--text-muted); }

/* Buttons & Tags */
.btn-back { background: transparent; border: none; font-size: 14px; font-weight: 700; color: var(--text-muted); cursor: pointer; display: flex; align-items: center; gap: 6px; margin-bottom: 32px; padding: 0; transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
.btn-back:hover { color: var(--text-primary); transform: translateX(-4px); }

.brutal-panel { background: transparent; border: 1px solid var(--border); padding: 32px; display: flex; flex-direction: column; transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1); border-radius: 0; }
.brutal-panel:hover { border-color: var(--text-primary); background: var(--bg-hover); }

.brutal-tag { padding: 4px 10px; border: 1px solid var(--border); background: transparent; font-size: 11px; font-weight: 700; border-radius: 40px; }
.badge-dark { background: var(--text-primary); color: var(--bg-base); border-color: var(--text-primary); }
.tag-white { border-color: var(--border); color: var(--text-primary); background: transparent; }

/* Common Utilities */
.flex-align { display: flex; align-items: center; gap: 12px; }
.flex-between { display: flex; align-items: center; justify-content: space-between; }
.gap-sm { gap: 8px; }
.gap-md { gap: 12px; }
.mb-xs { margin-bottom: 8px; }
.mb-sm { margin-bottom: 12px; }
.mb-md { margin-bottom: 20px; }
.mb-lg { margin-bottom: 32px; }
.mb-gap { margin-bottom: 32px; }
.ml-auto { margin-left: auto; }
.ml-lg { margin-left: 36px; }
.mt-md { margin-top: 20px; }
.p-md { padding: 20px; }
.p-lg { padding: 32px; }
.p-0 { padding: 0 !important; }
.pt-0 { padding-top: 0 !important; }
.border-b { border-bottom: 1px solid var(--border); }
.space-y > * + * { margin-top: 16px; }
.font-bold { font-weight: 800; }
.text-sm { font-size: 13px; }
.text-xs { font-size: 11px; }
.text-muted { color: var(--text-muted); }
.center-txt { text-align: center; }
.shadow-heavy { box-shadow: none; border-top: 1px solid var(--border); border-bottom: none; border-left: none; border-right: none;}
.shadow-heavy:hover { border-color: var(--text-primary); }
.shadow-normal { box-shadow: none; }
.shadow-normal:hover { border-color: var(--text-primary); background: var(--bg-hover); transform: translateX(4px); }

/* Buttons Set */
button { font-family: 'Space Grotesk', 'Pretendard', sans-serif; cursor: pointer; border-radius: 40px; transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1); letter-spacing: 0.05em;}
.btn-primary { background: transparent; color: var(--text-primary); border: 1px solid var(--text-primary); padding: 14px 24px; font-weight: 800; font-size: 13px;}
.btn-primary:hover { background: var(--text-primary); color: var(--bg-base); }

.btn-primary-small { background: transparent; color: var(--text-primary); border: 1px solid var(--text-primary); padding: 10px 18px; font-size: 12px; font-weight: 800; }
.btn-primary-small:hover { background: var(--text-primary); color: var(--bg-base); }
.btn-dark { background: var(--text-primary); color: var(--bg-base); }

.btn-primary-small-invert { background: var(--text-primary); color: var(--bg-base); border: 1px solid var(--text-primary); padding: 8px 16px; font-size: 12px; font-weight: 800; display: inline-flex; align-items: center; gap: 6px; border-radius: 40px;}
.btn-primary-small-invert:hover { background: transparent; color: var(--text-primary); }

.btn-primary-block { width: 100%; display: block; background: transparent; color: var(--text-primary); border: 1px solid var(--text-primary); padding: 16px; font-size: 14px; font-weight: 800; border-radius: 40px;}
.btn-primary-block:hover:not(:disabled) { background: var(--text-primary); color: var(--bg-base); }
.btn-primary-block:disabled { background: transparent; border-color: var(--border); color: var(--text-faint); cursor: not-allowed; }

.btn-outline-small { background: transparent; color: var(--text-primary); border: 1px solid var(--border); padding: 8px 16px; font-size: 12px; font-weight: 700; display: inline-flex; align-items: center; gap: 6px; border-radius: 40px;}
.btn-outline-small:hover { border-color: var(--text-primary); background: var(--bg-hover); }

.btn-outline-invert { background: transparent; color: var(--text-primary); border: 1px solid var(--border); padding: 12px 20px; font-size: 13px; font-weight: 800; display: inline-flex; align-items: center; gap: 8px; border-radius: 40px;}
.btn-outline-invert.ml-auto { margin-left: auto; }
.btn-outline-invert:hover { border-color: var(--text-primary); background: var(--bg-hover); }

.btn-text { background: transparent; border: none; padding: 4px 8px; font-size: 12px; font-weight: 700; color: var(--text-muted); }
.btn-text:hover { color: var(--text-primary); }
.btn-text-muted { background: transparent; border: none; font-size: 12px; color: var(--text-muted); display: flex; align-items: center; gap: 4px; padding: 0; }
.btn-text-muted:hover { color: var(--text-primary); }

.btn-close { background: transparent; border: none; font-size: 20px; color: var(--text-muted); padding: 4px; line-height: 1; transition: color 0.3s; }
.btn-close:hover { color: var(--text-primary); }

/* Activity Card */
.recommend-grid { display: flex; flex-direction: column; gap: 16px; }
.activity-card { padding: 24px; cursor: pointer; background: transparent; border: 1px solid var(--border); transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1); border-radius: 0;}
.activity-card:hover { border-color: var(--text-primary); background: var(--bg-hover); }
.activity-card:hover .arrow-icon { color: var(--text-primary); transform: translateX(4px); }
.activity-top { display: flex; align-items: center; gap: 20px; }
.activity-icon-wrap { width: 48px; height: 48px; display: flex; align-items: center; justify-content: center; font-size: 20px; border: 1px solid var(--border); flex-shrink: 0; border-radius: 50%; background: transparent; color: var(--text-primary);}
.type-study { border-color: var(--border); }
.type-dev { border-color: var(--border); }
.type-blog { border-color: var(--border); }
.type-review { border-color: var(--border); font-weight: 800;}

.activity-info { flex: 1; min-width: 0; }
.activity-header { display: flex; align-items: center; gap: 12px; margin-bottom: 8px; }
.activity-title { font-size: 16px; font-weight: 800; color: var(--text-primary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; letter-spacing: 0.05em;}
.active-tag { background: transparent; color: var(--text-primary); padding: 4px 8px; font-size: 10px; border-color: var(--text-primary); }
.done-tag { background: transparent; color: var(--text-muted); padding: 4px 8px; font-size: 10px; border-color: var(--border); }
.activity-meta { display: flex; align-items: center; gap: 16px; }
.activity-date { font-size: 12px; color: var(--text-muted); font-weight: 600; display: flex; align-items: center; gap: 8px; }
.tag-group-small { display: flex; gap: 4px; }
.small-tag { padding: 4px 8px; background: transparent; border: 1px solid var(--border); font-size: 10px; color: var(--text-muted); font-weight: 600; border-radius: 40px;}
.arrow-icon { font-size: 20px; color: var(--border); transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1); }

/* Highlighted Main Recommendation */
.highlight-panel { background: transparent; color: var(--text-primary); border-color: var(--text-primary); padding: 40px; }
.panel-header-flex { display: flex; justify-content: space-between; align-items: flex-start; }
.icon-box-white { width: 48px; height: 48px; background: transparent; color: var(--text-primary); display: flex; align-items: center; justify-content: center; font-size: 24px; border: 1px solid var(--border); border-radius: 50%;}
.panel-title-group { display: flex; align-items: center; gap: 16px; margin-bottom: 8px; }
.panel-title { font-size: 20px; font-weight: 800; margin: 0; letter-spacing: 0.05em; }
.panel-sub { font-size: 13px; font-weight: 600; color: var(--text-muted); }
.large-desc { font-size: 15px; line-height: 1.6; color: var(--text-secondary); margin: 32px 0; font-weight: 600; }

.flow-box { background: transparent; padding: 24px; border: 1px dashed var(--border); margin-bottom: 32px; border-radius: 0; }
.flow-title { font-size: 12px; font-weight: 800; margin-bottom: 16px; color: var(--text-muted); letter-spacing: 0.1em; text-transform: uppercase;}
.flow-track { display: flex; align-items: center; overflow-x: auto; padding-bottom: 8px; }
.scroll-x::-webkit-scrollbar { height: 4px; }
.scroll-x::-webkit-scrollbar-thumb { background: var(--border); }
.flow-item { display: flex; align-items: center; flex-shrink: 0; }
.flow-node { padding: 6px 12px; font-size: 11px; font-weight: 700; border: 1px solid var(--border); background: transparent; border-radius: 40px;}
.status-done { background: transparent; color: var(--text-muted); border-color: var(--border); text-decoration: line-through;}
.status-in-progress { border-color: var(--text-primary); color: var(--text-primary); font-weight: 800;}
.dashed-node { border-style: dashed; padding: 6px 16px; font-weight: 800; color: var(--text-primary);}
.flow-line { width: 24px; height: 1px; background: var(--border); margin: 0 8px; }

.flex-footer { display: flex; align-items: center; gap: 24px; flex-wrap: wrap; }
.info-group { display: flex; align-items: center; gap: 16px; }
.info-text { font-size: 13px; font-weight: 600; display: flex; align-items: center; gap: 8px; color: var(--text-muted);}
.highlight-panel .info-text { color: var(--text-muted); }

/* Dashboard Split Layout */
.layout-split { display: grid; grid-template-columns: 1fr; gap: 32px; transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
.layout-split.has-active { grid-template-columns: 1fr 1.2fr; }
@media (max-width: 900px) { .layout-split.has-active { grid-template-columns: 1fr; } }

.missions-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; }
.missions-grid.compact { grid-template-columns: 1fr; }

.mission-card { padding: 32px; flex-direction: column; gap: 20px; background: transparent; } /* Layout changed to column */
.mission-card.active { border-color: var(--text-primary); background: transparent; }
.mission-icon { width: 48px; height: 48px; background: transparent; border: 1px solid var(--border); display: flex; align-items: center; justify-content: center; font-size: 20px; color: var(--text-primary); flex-shrink: 0; border-radius: 50%;}
.mission-card.active .mission-icon { border-color: var(--text-primary); }
.mission-content { flex: 1; min-width: 0; }
.mission-header { display: flex; align-items: center; gap: 12px; margin-bottom: 12px; }
.mission-title { font-size: 16px; font-weight: 800; letter-spacing: 0.05em;}
.small-badge { font-size: 10px; padding: 4px 8px; border-radius: 40px;}
.mission-desc { font-size: 13px; color: var(--text-muted); line-height: 1.6; margin-bottom: 24px; font-weight: 600; }
.mission-footer { display: flex; align-items: center; justify-content: space-between; gap: 16px; margin-top: auto; }
.outline-badge { border-color: var(--border); color: var(--text-muted); background: transparent; padding: 6px 12px; font-size: 11px; font-weight: 800; border-radius: 40px; }

/* Active Panel (Sticky) */
.active-panel { position: sticky; top: 100px; }
.panel-sticky { min-height: 480px; background: transparent;}
.panel-title-lg { font-size: 20px; font-weight: 800; margin-bottom: 8px; letter-spacing: 0.05em;}
.panel-sub { font-size: 13px; color: var(--text-muted); font-weight: 600; }
.info-box { background: transparent; border: 1px dashed var(--border); padding: 24px; border-radius: 0;}
.info-title { font-size: 14px; font-weight: 800; margin-bottom: 12px; display: flex; align-items: center; gap: 8px; color: var(--text-primary);}
.info-box p { font-size: 13px; color: var(--text-muted); line-height: 1.6; font-weight: 600;}

.grid-2 { display: grid; grid-template-columns: 1fr 1fr; }
.col-gap { gap: 16px; }
.stat-box { background: transparent; border: 1px solid var(--border); padding: 20px; display: flex; flex-direction: column; gap: 8px; }
.stat-lbl { font-size: 11px; color: var(--text-muted); font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em;}
.stat-val { font-size: 16px; font-weight: 800; color: var(--text-primary); }

.lbl-light { font-size: 12px; color: var(--text-muted); font-weight: 600; }
.lbl-bold { font-size: 12px; font-weight: 800; color: var(--text-primary); }
.track-bg { height: 4px; background: transparent; border: 1px solid var(--border); width: 100%; border-radius: 4px; overflow: hidden; }
.track-fill { height: 100%; background: var(--text-primary); transition: width 0.3s cubic-bezier(0.16, 1, 0.3, 1); }

.quiz-q { font-size: 18px; font-weight: 800; line-height: 1.6; margin-bottom: 32px; margin-top: 0; color: var(--text-primary); letter-spacing: 0.05em;}
.options-list { display: flex; flex-direction: column; gap: 16px; }
.option-btn { background: transparent; border: 1px solid var(--border); padding: 20px; cursor: pointer; text-align: left; display: flex; align-items: flex-start; gap: 16px; transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1); border-radius: 0; }
.option-btn:hover { border-color: var(--text-primary); background: var(--bg-hover); }
.option-btn.selected { border-color: var(--text-primary); background: transparent; font-weight: bold; }
.radio-circle { width: 18px; height: 18px; border: 1px solid var(--border); border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 2px; }
.option-btn.selected .radio-circle { border-color: var(--text-primary); }
.radio-inner { width: 8px; height: 8px; background: var(--text-primary); border-radius: 50%; }
.option-btn span { font-size: 14px; line-height: 1.5; color: var(--text-primary); font-weight: 600; }
.option-btn.selected span { color: var(--text-primary); }

.score-circle { width: 80px; height: 80px; border: 2px solid var(--text-primary); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 24px; font-weight: 800; margin: 0 auto; margin-bottom: 32px; color: var(--text-primary); }

/* Modal specific */
.modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.8); backdrop-filter: blur(8px); z-index: 1000; display: flex; align-items: center; justify-content: center; padding: 24px; }
.brutal-modal { width: 100%; max-width: 600px; max-height: 85vh; display: flex; flex-direction: column; background: var(--bg-surface); border: 1px solid var(--border); padding: 40px; animation: fadeUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) both; border-radius: 0; }
@keyframes fadeUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
.modal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 32px; border-bottom: 1px solid var(--border); padding-bottom: 24px; }
.modal-header h3 { font-size: 20px; font-weight: 800; display: flex; align-items: center; gap: 12px; margin: 0; letter-spacing: 0.05em; color: var(--text-primary);}
.reason-content { flex: 1; display: flex; flex-direction: column; gap: 24px; margin-bottom: 16px; padding-right: 8px; }
.reason-item { background: transparent; border: 1px solid var(--border); padding: 24px; transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1); border-radius: 0;}
.reason-item:hover { border-color: var(--text-primary); background: var(--bg-hover);}
.reason-item-header { display: flex; align-items: center; gap: 12px; margin-bottom: 12px; }
.reason-item-header i { font-size: 18px; color: var(--text-primary);}
.reason-item-header h4 { font-size: 16px; font-weight: 800; margin: 0; letter-spacing: 0.05em;}
.reason-item p { font-size: 14px; font-weight: 600; color: var(--text-muted); line-height: 1.6; margin: 0; }
.reason-item code { background: transparent; color: var(--text-primary); border: 1px solid var(--border); padding: 2px 8px; font-size: 12px; font-family: 'Space Grotesk', monospace; font-weight: 800; border-radius: 4px;}
=======
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
>>>>>>> d9d81185ededc2b2de1631f9ff7968776e03e2e7
</style>