<template>
  <div class="app-layout">
    <AppSidebar />

    <main class="main-content custom-scroll">
      <header class="page-header">
        <div class="header-title"><i class="fas fa-user-circle" /> MY PAGE</div>
      </header>

      <div class="content-inner">
        <div class="brutal-tabs">
          <button class="tab-btn" :class="{ active: activeTab === 'profile' }" @click="activeTab = 'profile'">
            PROFILE SETTINGS
          </button>
          <button class="tab-btn" :class="{ active: activeTab === 'account' }" @click="activeTab = 'account'">
            ACCOUNT MANAGEMENT
          </button>
        </div>

        <div v-if="activeTab === 'profile'" class="tab-content">
          <div class="brutal-panel">
            <h2 class="panel-title">내 정보 수정</h2>
            
            <div class="form-group">
              <label>이름</label>
              <input type="text" v-model="profile.name" class="brutal-input" />
            </div>

            <div class="form-group">
              <label>현재 직업</label>
              <div class="select-wrapper">
                <select v-model="profile.job" class="brutal-input appearance-none">
                  <option value="학생">학생</option>
                  <option value="취준생">취업 준비생</option>
                  <option value="개발자">현직 개발자</option>
                </select>
                <i class="fas fa-chevron-down select-icon" />
              </div>
            </div>

            <div class="form-group">
              <label>관심 기술 스택</label>
              <div class="input-row">
                <input type="text" v-model="techInput" placeholder="기술 입력 후 Enter" class="brutal-input" @keydown.enter.prevent="addTech" />
                <button class="btn-add" @click="addTech"><i class="fas fa-plus"/></button>
              </div>
              <div class="pill-group mt-3">
                <span v-for="t in profile.techs" :key="t" class="brutal-pill">
                  {{ t }}
                  <button @click="removeTech(t)"><i class="fas fa-times"/></button>
                </span>
              </div>
            </div>

            <button class="btn-primary mt-6">SAVE CHANGES</button>
          </div>
        </div>

        <div v-if="activeTab === 'account'" class="tab-content">
          <div class="brutal-panel mb-8">
            <h2 class="panel-title">연동된 계정</h2>
            
            <div class="link-item">
              <div class="link-info">
                <i class="fab fa-google text-xl" />
                <div>
                  <div class="link-name">Google</div>
                  <div class="link-sub">user@gmail.com</div>
                </div>
              </div>
              <span class="status-badge connected">연동됨</span>
            </div>

            <div class="link-item" v-if="isGithubLinked">
              <div class="link-info">
                <i class="fab fa-github text-xl" />
                <div>
                  <div class="link-name">GitHub</div>
                  <div class="link-sub">@developer_user</div>
                </div>
              </div>
              <button class="btn-outline-small" @click="openConfirmModal('github')">연동 해제</button>
            </div>
          </div>

          <div class="brutal-panel danger-zone">
            <h2 class="panel-title text-danger">DANGER ZONE</h2>
            <p class="danger-desc">계정을 삭제하거나 로그아웃 할 수 있습니다.</p>
            
            <div class="flex-row gap-4">
              <button class="btn-outline flex-1" @click="openConfirmModal('logout')">LOGOUT</button>
              <button class="btn-danger flex-1" @click="openConfirmModal('delete')">DELETE ACCOUNT</button>
            </div>
          </div>
        </div>
      </div>
    </main>

    <div v-if="modalType" class="modal-overlay" @click.self="closeModal">
      <div class="brutal-modal" :class="{ 'modal-danger': modalType === 'delete' }">
        <div class="modal-header">
          <h3 :class="modalType === 'delete' ? 'text-danger' : 'text-primary'">
            <i class="fas fa-exclamation-triangle" v-if="modalType === 'delete'" />
            <i class="fas fa-info-circle" v-else />
            {{ modalTitle }}
          </h3>
        </div>
        <p class="modal-desc">{{ modalDesc }}</p>
        
        <div class="modal-actions">
          <button class="btn-outline-small" @click="closeModal">취소</button>
          <button 
            :class="modalType === 'delete' ? 'btn-danger-small' : 'btn-primary-small'" 
            @click="executeAction"
          >
            {{ confirmText }}
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import AppSidebar from '@/components/AppSidebar.vue'

const activeTab = ref('profile')

const profile = ref({
  name: '김카이로스',
  job: '취준생',
  techs: ['React', 'TypeScript', 'Next.js']
})
const techInput = ref('')
const isGithubLinked = ref(true)

const addTech = () => {
  const val = techInput.value.trim()
  if (val && !profile.value.techs.includes(val)) profile.value.techs.push(val)
  techInput.value = ''
}
const removeTech = (t) => { profile.value.techs = profile.value.techs.filter(x => x !== t) }

// 모달 상태 관리
const modalType = ref(null) // 'github', 'logout', 'delete', null

const openConfirmModal = (type) => { modalType.value = type }
const closeModal = () => { modalType.value = null }

const modalTitle = computed(() => {
  if (modalType.value === 'github') return 'GitHub 연동 해제'
  if (modalType.value === 'logout') return '로그아웃'
  if (modalType.value === 'delete') return '회원 탈퇴'
  return ''
})

const modalDesc = computed(() => {
  if (modalType.value === 'github') return '연동을 해제하면 더 이상 커밋 기록이 캘린더에 동기화되지 않습니다. 계속하시겠습니까?'
  if (modalType.value === 'logout') return '현재 기기에서 KAIROS 로그아웃 하시겠습니까?'
  if (modalType.value === 'delete') return '모든 학습 기록, 캘린더 일정, 분석 데이터가 영구적으로 삭제되며 복구할 수 없습니다.'
  return ''
})

const confirmText = computed(() => {
  if (modalType.value === 'github') return '해제하기'
  if (modalType.value === 'logout') return '로그아웃'
  if (modalType.value === 'delete') return '영구 삭제'
  return '확인'
})

const executeAction = () => {
  if (modalType.value === 'github') isGithubLinked.value = false
  if (modalType.value === 'logout') window.location.href = '/login'
  if (modalType.value === 'delete') window.location.href = '/' // 랜딩페이지로
  closeModal()
}
</script>

<style scoped>
.app-layout { display: flex; width: 100%; height: 100vh; overflow: hidden; background: var(--bg-base); font-family: 'Space Grotesk', 'Escoredream', system-ui, sans-serif; }
.main-content { flex: 1; display: flex; flex-direction: column; overflow-y: auto; position: relative; }
.custom-scroll { -ms-overflow-style: none; scrollbar-width: none; }
.custom-scroll::-webkit-scrollbar { display: none; }

.page-header { display: flex; align-items: center; padding: 20px 32px; border-bottom: 2px solid var(--text-primary); background: var(--bg-surface); position: sticky; top: 0; z-index: 10; }
.header-title { font-size: 16px; font-weight: 900; letter-spacing: 0.1em; color: var(--text-primary); display: flex; align-items: center; gap: 10px; }

.content-inner { max-width: 800px; margin: 0 auto; padding: 48px 32px; width: 100%; }

.brutal-tabs { display: flex; margin-bottom: 32px; border-bottom: 2px solid var(--text-primary); }
.tab-btn { flex: 1; padding: 16px; background: transparent; border: none; font-size: 14px; font-weight: 900; color: var(--text-muted); cursor: pointer; transition: all 0.2s; position: relative; letter-spacing: 0.05em; }
.tab-btn:hover { color: var(--text-primary); }
.tab-btn.active { color: var(--text-primary); background: var(--bg-surface); }
.tab-btn.active::after { content: ''; position: absolute; bottom: -2px; left: 0; width: 100%; height: 4px; background: var(--text-primary); }

.tab-content { animation: fadeIn 0.2s ease; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }

.brutal-panel { background: var(--bg-surface); border: 2px solid var(--text-primary); padding: 32px; box-shadow: 6px 6px 0 #6b7280; }
.panel-title { font-size: 18px; font-weight: 900; color: var(--text-primary); margin-bottom: 24px; border-bottom: 2px solid var(--border); padding-bottom: 12px; }

.form-group { margin-bottom: 24px; }
.form-group label { display: block; font-size: 12px; font-weight: 900; margin-bottom: 8px; color: var(--text-primary); letter-spacing: 0.05em; }

.select-wrapper { position: relative; }
.select-icon { position: absolute; right: 16px; top: 50%; transform: translateY(-50%); pointer-events: none; font-size: 12px; }
.appearance-none { appearance: none; }

.input-row { display: flex; gap: 8px; }
.brutal-input { width: 100%; padding: 14px 16px; border: 2px solid var(--border); background: var(--bg-base); color: var(--text-primary); font-size: 14px; font-weight: 700; outline: none; transition: all 0.1s; font-family: inherit; }
.brutal-input:focus { border-color: var(--text-primary); box-shadow: 4px 4px 0 #6b7280; transform: translate(-2px, -2px); }

.btn-add { width: 50px; border: 2px solid var(--text-primary); background: var(--text-primary); color: var(--bg-base); cursor: pointer; transition: all 0.1s; font-size: 16px; }
.btn-add:hover { background: transparent; color: var(--text-primary); box-shadow: 4px 4px 0 #6b7280; transform: translate(-2px, -2px); }

.pill-group { display: flex; flex-wrap: wrap; gap: 8px; }
.brutal-pill { padding: 6px 14px; border: 2px solid var(--text-primary); background: var(--text-primary); color: var(--bg-base); font-size: 12px; font-weight: 800; display: inline-flex; align-items: center; gap: 8px; }
.brutal-pill button { background: transparent; border: none; color: var(--bg-base); cursor: pointer; padding: 0; font-size: 12px; opacity: 0.8; transition: transform 0.1s; }
.brutal-pill button:hover { transform: scale(1.2); opacity: 1; color: #ffca28; }

.mt-3 { margin-top: 12px; }
.mt-6 { margin-top: 24px; }
.mb-8 { margin-bottom: 32px; }
.flex-row { display: flex; }
.gap-4 { gap: 16px; }
.flex-1 { flex: 1; }

.btn-primary, .btn-outline, .btn-danger { padding: 16px 24px; font-size: 14px; font-weight: 900; cursor: pointer; transition: all 0.1s; font-family: inherit; border: 2px solid var(--text-primary); letter-spacing: 0.05em; display: flex; align-items: center; justify-content: center; }
.btn-primary { background: var(--text-primary); color: var(--bg-base); box-shadow: 4px 4px 0 #6b7280; width: 100%; }
.btn-primary:hover { transform: translate(-2px, -2px); box-shadow: 6px 6px 0 #6b7280; background: transparent; color: var(--text-primary); }

.btn-outline { background: var(--bg-base); color: var(--text-primary); box-shadow: 4px 4px 0 #6b7280; }
.btn-outline:hover { background: var(--text-primary); color: var(--bg-base); transform: translate(-2px, -2px); box-shadow: 6px 6px 0 #6b7280; }

.btn-danger { background: var(--bg-base); color: #dc2626; border-color: #dc2626; box-shadow: 4px 4px 0 rgba(220, 38, 38, 0.3); }
.btn-danger:hover { background: #dc2626; color: white; transform: translate(-2px, -2px); box-shadow: 6px 6px 0 rgba(220, 38, 38, 0.5); }

/* 계정 링크 UI */
.link-item { display: flex; justify-content: space-between; align-items: center; padding: 16px; border: 2px solid var(--border); margin-bottom: 12px; background: var(--bg-base); }
.link-info { display: flex; align-items: center; gap: 16px; color: var(--text-primary); }
.text-xl { font-size: 24px; }
.link-name { font-weight: 900; font-size: 14px; }
.link-sub { font-size: 12px; color: var(--text-muted); font-weight: 700; margin-top: 4px; }

.status-badge { padding: 6px 12px; font-size: 11px; font-weight: 900; border: 2px solid #2563eb; color: #2563eb; }
.status-badge.connected { background: rgba(37, 99, 235, 0.1); }

.btn-outline-small { padding: 8px 16px; font-size: 12px; font-weight: 900; border: 2px solid var(--border); background: transparent; cursor: pointer; transition: all 0.1s; color: var(--text-primary); }
.btn-outline-small:hover { border-color: var(--text-primary); background: var(--text-primary); color: var(--bg-base); }

.danger-zone { border-color: #dc2626; box-shadow: 6px 6px 0 rgba(220, 38, 38, 0.2); }
.text-danger { color: #dc2626 !important; }
.danger-desc { font-size: 13px; font-weight: 700; color: var(--text-muted); margin-bottom: 24px; }

/* 🚀 모달 CSS */
.modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.7); backdrop-filter: blur(2px); z-index: 1000; display: flex; align-items: center; justify-content: center; padding: 24px; }
.brutal-modal { width: 100%; max-width: 420px; background: var(--bg-base); border: 2px solid var(--text-primary); box-shadow: 12px 12px 0 #6b7280; padding: 32px; animation: popUp 0.2s ease-out; }
.modal-danger { border-color: #dc2626; box-shadow: 12px 12px 0 rgba(220, 38, 38, 0.3); }
@keyframes popUp { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }

.modal-header h3 { font-size: 18px; font-weight: 900; display: flex; align-items: center; gap: 8px; margin-bottom: 16px; }
.text-primary { color: var(--text-primary); }
.modal-desc { font-size: 14px; font-weight: 700; color: var(--text-muted); line-height: 1.6; margin-bottom: 32px; }

.modal-actions { display: flex; justify-content: flex-end; gap: 12px; }
.btn-primary-small { padding: 12px 20px; font-size: 13px; font-weight: 900; background: var(--text-primary); color: var(--bg-base); border: 2px solid var(--text-primary); cursor: pointer; transition: all 0.1s; font-family: inherit; }
.btn-primary-small:hover { transform: translate(-2px, -2px); box-shadow: 4px 4px 0 #6b7280; }

.btn-danger-small { padding: 12px 20px; font-size: 13px; font-weight: 900; background: #dc2626; color: white; border: 2px solid #dc2626; cursor: pointer; transition: all 0.1s; font-family: inherit; }
.btn-danger-small:hover { transform: translate(-2px, -2px); box-shadow: 4px 4px 0 rgba(220, 38, 38, 0.4); }
</style>