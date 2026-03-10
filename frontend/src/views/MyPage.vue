<template>
  <div class="mypage-layout">
    <AppSidebar />
    <main class="mypage-main custom-scroll">
      <div class="mypage-header">
        <div class="mypage-header-title">
          <h1 class="page-title">MY PAGE</h1>
          <p class="page-sub">프로필과 AI 설정을 관리하세요</p>
        </div>
      </div>

      <div class="mypage-content">
        <section class="card">
          <div class="card-header">
            <h2 class="card-title">PROFILE</h2>
            <p class="card-sub">닉네임을 수정할 수 있습니다</p>
          </div>
          <div class="card-body">
            <div class="field-group">
              <label class="field-label">NICKNAME</label>
              <div class="input-row">
                <input v-model="nickname" type="text" class="field-input" maxlength="20" />
                <button class="btn-save" @click="saveNickname">SAVE</button>
              </div>
            </div>
          </div>
        </section>

        <section class="card">
          <div class="card-header">
            <h2 class="card-title">GITHUB SYNC</h2>
            <p class="card-sub">커밋 기록과 학습 일정을 연동합니다</p>
          </div>
          <div class="card-body">
            <div class="github-status-row">
              <div class="github-info">
                <span class="status-badge" :class="github.connected ? 'badge--connected' : 'badge--disconnected'">
                  {{ github.connected ? 'CONNECTED' : 'DISCONNECTED' }}
                </span>
                <span v-if="github.connected" class="github-username">@{{ github.username }}</span>
              </div>
              <button class="btn-github" @click="toggleGithub">
                {{ github.connected ? 'UNLINK' : 'LINK GITHUB' }}
              </button>
            </div>
            <div v-if="github.connected" class="github-stats">
              <div class="github-stat"><span class="stat-num">{{ github.repos }}</span><span class="stat-label">REPOS</span></div>
              <div class="github-stat"><span class="stat-num">{{ github.commits }}</span><span class="stat-label">COMMITS</span></div>
              <div class="github-stat"><span class="stat-num">{{ github.streak }}</span><span class="stat-label">STREAK</span></div>
            </div>
          </div>
        </section>

        <section class="card">
          <div class="card-header">
            <h2 class="card-title">TECH STACK</h2>
            <p class="card-sub">보유한 기술을 등록하세요</p>
          </div>
          <div class="card-body">
            <div class="stack-input-row">
              <input v-model="stackInput" type="text" class="field-input" placeholder="e.g. Vue, Spring..." @keydown.enter.prevent="addStack" />
              <button class="btn-add-stack" @click="addStack">ADD</button>
            </div>
            <div v-if="techStack.length" class="stack-pills">
              <div v-for="tech in techStack" :key="tech.name" class="stack-pill">
                <span>{{ tech.name }}</span>
                <button class="pill-remove" @click="removeStack(tech.name)"><i class="fas fa-times" /></button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  </div>
</template>

<script setup>
/* 기존 로직 동일 */
import { ref, computed } from 'vue'; import { useRouter } from 'vue-router'; import AppSidebar from '@/components/AppSidebar.vue'
const router = useRouter()
const nickname = ref('김싸피'); function saveNickname() {}
const github = ref({ connected: true, username: 'kimssafy', repos: 24, commits: 87, streak: 12 }); function toggleGithub() { github.value.connected = !github.value.connected }
const techStack = ref([{ name: 'Vue' }, { name: 'Python' }]); const stackInput = ref(''); function addStack() { if(stackInput.value) techStack.value.push({name: stackInput.value}); stackInput.value=''; } function removeStack(n) { techStack.value = techStack.value.filter(t=>t.name!==n) }
</script>

<style scoped>
.mypage-layout { display: flex; width: 100%; height: 100vh; overflow: hidden; background: var(--bg-base); font-family: 'Space Grotesk', 'Escoredream', system-ui, sans-serif; }
.mypage-main { flex: 1; display: flex; flex-direction: column; overflow-y: auto; background: var(--bg-base); }
.custom-scroll::-webkit-scrollbar { width: 6px; } .custom-scroll::-webkit-scrollbar-thumb { background: var(--border-mid); border-radius: 0; }

.mypage-header { padding: 40px 40px 20px; border-bottom: 2px solid var(--border); }
.page-title { font-size: 32px; font-weight: 900; color: var(--text-primary); letter-spacing: 0.05em; }
.page-sub { font-size: 13px; color: var(--text-muted); font-weight: 700; margin-top: 8px; }

.mypage-content { padding: 40px; display: flex; flex-direction: column; gap: 32px; max-width: 900px; margin: 0 auto; width: 100%; }

.card { background: transparent; border: 2px solid var(--text-primary); border-radius: 0; box-shadow: 8px 8px 0 var(--text-primary); transition: transform 0.1s; }
.card:hover { transform: translate(-2px, -2px); box-shadow: 10px 10px 0 var(--text-primary); }

.card-header { padding: 20px 24px; border-bottom: 2px solid var(--text-primary); background: var(--text-primary); color: var(--bg-base); }
.card-title { font-size: 18px; font-weight: 900; letter-spacing: 0.05em; color: var(--bg-base); }
.card-sub { font-size: 12px; font-weight: 600; margin-top: 4px; opacity: 0.8; }
.card-body { padding: 24px; }

.field-label { font-size: 12px; font-weight: 800; letter-spacing: 0.1em; color: var(--text-primary); margin-bottom: 8px; display: block; }
.input-row, .stack-input-row { display: flex; gap: 12px; }
.field-input { flex: 1; background: transparent; border: 2px solid var(--border); border-radius: 0; padding: 12px 16px; font-size: 14px; font-weight: 700; color: var(--text-primary); outline: none; transition: 0.1s; }
.field-input:focus { border-color: var(--text-primary); box-shadow: 4px 4px 0 var(--border); }

.btn-save, .btn-github, .btn-add-stack { padding: 12px 24px; background: var(--text-primary); border: 2px solid var(--text-primary); color: var(--bg-base); font-size: 13px; font-weight: 900; letter-spacing: 0.05em; cursor: pointer; transition: 0.1s; border-radius: 0; }
.btn-save:hover, .btn-add-stack:hover { background: transparent; color: var(--text-primary); box-shadow: 4px 4px 0 var(--text-primary); transform: translate(-2px, -2px); }

.github-status-row { display: flex; justify-content: space-between; align-items: center; }
.github-info { display: flex; align-items: center; gap: 16px; }
.status-badge { border: 2px solid var(--text-primary); padding: 4px 10px; font-weight: 900; font-size: 11px; }
.badge--connected { background: var(--text-primary); color: var(--bg-base); }
.github-username { font-weight: 800; font-size: 15px; }

.github-stats { display: flex; border: 2px solid var(--text-primary); margin-top: 24px; }
.github-stat { flex: 1; padding: 16px; text-align: center; border-right: 2px solid var(--text-primary); }
.github-stat:last-child { border-right: none; }
.stat-num { display: block; font-size: 28px; font-weight: 900; }
.stat-label { font-size: 11px; font-weight: 800; letter-spacing: 0.1em; color: var(--text-muted); }

.stack-pills { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 20px; }
.stack-pill { display: flex; align-items: center; gap: 8px; border: 2px solid var(--text-primary); padding: 6px 12px; font-weight: 800; font-size: 13px; box-shadow: 3px 3px 0 var(--border); }
.pill-remove { background: none; border: none; font-size: 12px; cursor: pointer; color: var(--text-primary); transition: 0.1s; }
.pill-remove:hover { transform: scale(1.2); }
</style>