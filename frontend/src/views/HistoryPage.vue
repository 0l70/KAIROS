<template>
  <div class="app-layout" :class="themeStore.isDark ? 'theme-dark' : 'theme-light'">
    <div class="crt-scanlines"></div>
    <div class="retro-dot-bg"></div>

    <AppSidebar />

    <main class="main-content custom-scroll">
      <header class="page-header">
<<<<<<< HEAD
        <div class="header-title"><i class="fas fa-history" /> HISTORY & GROWTH</div>
      </header>

      <div class="content-inner max-w-xl mx-auto">
        <div class="flex-between mb-lg flex-wrap gap-md">
          <div class="flex-align flex-wrap gap-lg">
            <div class="stat-item">
              <span class="stat-lbl">전체 기록</span>
              <span class="stat-val">{{ store.totalCount }}건</span>
            </div>
            <div class="stat-item">
              <span class="stat-lbl">이번 주 활동</span>
              <span class="stat-val">{{ store.thisWeekCount }}건</span>
            </div>
            <div class="stat-item">
              <span class="stat-lbl">제외된 기록</span>
              <span class="stat-val">{{ store.excludedCount }}건</span>
            </div>
          </div>
          <button class="btn-outline-small border-dark font-bold px-md" @click="$router.push('/history/growth')">
            <i class="fas fa-chart-line" /> 나의 성장 일지 <i class="fas fa-arrow-right text-[10px]" />
          </button>
        </div>

        <div class="brutal-panel p-md mb-md shadow-normal">
          <div class="flex-between flex-wrap gap-md">
            <div class="tag-group-small flex-wrap">
              <button 
                v-for="cat in categoryFilters" 
                :key="cat.value"
                class="filter-tag"
                :class="{ 'active': store.filter === cat.value }"
                @click="store.filter = cat.value"
              >
                {{ cat.label }}
              </button>
            </div>

            <div class="flex-align flex-wrap gap-sm">
              <div class="search-box" :class="{ 'focused': showSearchPanel }">
                <i class="fas fa-search search-icon" />
                <input 
                  v-model="store.keyword"
                  @focus="showSearchPanel = true"
                  class="search-input"
                  :placeholder="showSearchPanel ? '키워드 입력' : '지난 최근 활동과 추천 기록을 검색할 수 있어요!'"
                />
              </div>

              <div class="relative">
                <button class="btn-outline-small" @click="showSortMenu = !showSortMenu">
                  {{ sortLabel }} <i class="fas fa-chevron-down text-[10px]" />
                </button>
                <div v-if="showSortMenu" class="dropdown-menu">
                  <button 
                    v-for="opt in sortOptions" 
                    :key="opt.value"
                    class="dropdown-item"
                    :class="{ 'text-primary font-bold': store.sort === opt.value }"
                    @click="store.sort = opt.value; showSortMenu = false"
                  >
                    {{ opt.label }}
                  </button>
=======
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
>>>>>>> d9d81185ededc2b2de1631f9ff7968776e03e2e7
                </div>
              </div>
            </div>
          </div>

<<<<<<< HEAD
          <!-- Extended Search Panel -->
          <div v-if="showSearchPanel" class="search-extended mt-md">
            <div class="flex-align flex-wrap gap-md items-end">
              <div class="form-group mb-0">
                <label>년도</label>
                <select v-model="store.selectedYear" @change="store.selectedMonth = ''" class="brutal-select">
                  <option value="">전체</option>
                  <option v-for="y in yearOptions" :key="y" :value="y">{{ y }}년</option>
                </select>
              </div>
              <div class="form-group mb-0">
                <label>월</label>
                <select v-model="store.selectedMonth" class="brutal-select">
                  <option value="">전체</option>
                  <option v-for="m in monthOptions" :key="m" :value="m">{{ m }}월</option>
                </select>
=======
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
>>>>>>> d9d81185ededc2b2de1631f9ff7968776e03e2e7
              </div>
            </div>
            <button class="btn-text-muted font-bold ml-auto" @click="store.resetQueries">
              조회 초기화
            </button>
          </div>
<<<<<<< HEAD
=======

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
          
>>>>>>> d9d81185ededc2b2de1631f9ff7968776e03e2e7
        </div>

        <div class="brutal-panel p-0 shadow-heavy overflow-hidden">
          <div class="table-header">
            <span>날짜</span>
            <span>활동</span>
            <span>유형</span>
            <span>태그</span>
            <span>관리</span>
          </div>

          <div v-if="store.filteredItems.length === 0" class="empty-state">
            해당 조건의 기록이 없습니다
          </div>

          <div 
            v-for="item in store.filteredItems" 
            :key="item.id"
            class="table-row"
            :class="{ 'is-excluded': item.excluded }"
          >
            <span class="row-date">{{ item.date }}</span>
            <div class="row-main">
              <div class="flex-align gap-sm mb-xs">
                <span class="row-title">{{ item.title }}</span>
                <span class="row-badge">{{ recordKindConfig[item.recordKind].label }}</span>
              </div>
              <p class="row-desc">{{ item.summary }}</p>
            </div>
            <div class="row-type">
              <span class="type-badge"><i :class="typeConfig[item.type].icon" /> {{ typeConfig[item.type].label }}</span>
            </div>
            <div class="row-tags">
              <span v-for="tag in item.tags" :key="tag" class="small-tag"><i class="fas fa-tag text-[8px]" /> {{ tag }}</span>
            </div>
            <div class="row-actions flex gap-sm h-full">
              <button 
                class="btn-exclude flex-1 justify-center items-center" 
                :class="{ 'btn-restore': item.excluded }"
                @click="store.toggleExclude(item.id)"
              >
                <template v-if="item.excluded"><i class="fas fa-undo-alt" /> 제외 취소</template>
                <template v-else><i class="fas fa-ban" /> 제외</template>
              </button>
              <button 
                class="btn-delete flex-1"
                @click="store.deleteItem(item.id)"
                title="삭제"
              >
                <i class="fas fa-trash mb-0" />
              </button>
            </div>
          </div>
        </div>

        <p class="text-xs text-muted text-center mt-md font-bold">
          제외된 기록은 이후 추천 분석에 반영되지 않습니다. 필요하면 언제든 다시 복원할 수 있습니다.
        </p>

      </div>
    </main>
  </div>
</template>

<script setup>
<<<<<<< HEAD
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import AppSidebar from '@/components/AppSidebar.vue'
import { useHistoryStore } from '@/stores/useHistoryStore'

const router = useRouter()
const store = useHistoryStore()

const categoryFilters = [
  { value: "all", label: "전체" },
  { value: "study", label: "학습" },
  { value: "dev", label: "개발" },
  { value: "career", label: "취준" },
]

const sortOptions = [
  { value: "newest", label: "최신순" },
  { value: "oldest", label: "오래된 순" },
]

const sortLabel = computed(() => {
  return sortOptions.find(opt => opt.value === store.sort)?.label || ''
})

const typeConfig = {
  study: { label: "학습", icon: "fas fa-book-open" },
  dev: { label: "개발", icon: "fas fa-code" },
  blog: { label: "블로그", icon: "fas fa-file-alt" },
  review: { label: "퀴즈", icon: "fas fa-calendar-alt" },
  career: { label: "취준", icon: "fas fa-chart-line" },
}

const recordKindConfig = {
  recommendation: { label: "과거 추천 내역", icon: "fas fa-magic" },
  learning: { label: "학습 기록", icon: "fas fa-book-open" },
  quiz: { label: "퀴즈 진행 결과", icon: "fas fa-brain" },
}

const showSortMenu = ref(false)
const showSearchPanel = ref(false)

const currentDate = new Date()
const currentYear = currentDate.getFullYear()
const currentMonth = currentDate.getMonth() + 1

const yearOptions = Array.from({ length: 6 }, (_, index) => String(currentYear - index))
const monthOptions = computed(() => {
  if (store.selectedYear === String(currentYear)) {
    return Array.from({ length: currentMonth }, (_, index) => String(index + 1))
  }
  return Array.from({ length: 12 }, (_, index) => String(index + 1))
})

</script>

<style scoped>
.app-layout { display: flex; width: 100%; height: 100vh; overflow: hidden; background: var(--bg-base); font-family: 'Space Grotesk', 'Escoredream', system-ui, sans-serif; }
.main-content { flex: 1; display: flex; flex-direction: column; overflow-y: auto; position: relative; }
.custom-scroll { -ms-overflow-style: none; scrollbar-width: none; }
.custom-scroll::-webkit-scrollbar { display: none; }

.page-header { display: flex; align-items: center; padding: 20px 32px; border-bottom: 2px solid var(--text-primary); background: var(--bg-surface); position: sticky; top: 0; z-index: 10; }
.header-title { font-size: 16px; font-weight: 900; letter-spacing: 0.1em; color: var(--text-primary); display: flex; align-items: center; gap: 10px; }

.content-inner { padding: 48px 32px; width: 100%; }
.max-w-xl { max-width: 1000px; }
.mx-auto { margin-left: auto; margin-right: auto; }

/* Utils */
.flex-align { display: flex; align-items: center; }
.flex-between { display: flex; align-items: center; justify-content: space-between; }
.flex-wrap { display: flex; flex-wrap: wrap; }
.items-end { align-items: flex-end; }
.gap-sm { gap: 8px; }
.gap-md { gap: 16px; }
.gap-lg { gap: 32px; }
.mb-xs { margin-bottom: 4px; }
.mb-md { margin-bottom: 24px; }
.mb-lg { margin-bottom: 32px; }
.mt-md { margin-top: 24px; }
.p-md { padding: 24px; }
.p-lg { padding: 32px; }
.p-0 { padding: 0 !important; }
.px-md { padding-left: 24px; padding-right: 24px; }
.mb-0 { margin-bottom: 0 !important; }
.ml-auto { margin-left: auto; }
.relative { position: relative; }
.overflow-hidden { overflow: hidden; }

.font-bold { font-weight: 800; }
.text-xs { font-size: 11px; }
.text-muted { color: var(--text-muted); }
.text-primary { color: var(--text-primary); }
.text-center { text-align: center; }
.text-\[10px\] { font-size: 10px; }
.text-\[8px\] { font-size: 8px; }

.brutal-panel { background: transparent; border: 1px solid var(--border); border-radius: 0; transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
.shadow-normal { box-shadow: none; border: 1px dashed var(--border); }
.shadow-normal:hover { box-shadow: none; border-style: solid; border-color: var(--text-primary); background: var(--bg-hover);}
.shadow-heavy { box-shadow: none; border-top: 1px solid var(--border); border-bottom: none; border-left: none; border-right: none;}

/* Header Stats */
.stat-item { display: flex; align-items: center; gap: 12px; }
.stat-lbl { font-size: 13px; color: var(--text-muted); font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em;}
.stat-val { font-size: 18px; font-weight: 800; color: var(--text-primary); letter-spacing: 0.05em;}

.border-dark { border-color: var(--border) !important; color: var(--text-primary) !important; }
.btn-outline-small { background: transparent; color: var(--text-primary); border: 1px solid var(--border); padding: 10px 16px; font-size: 13px; font-weight: 800; display: inline-flex; align-items: center; gap: 8px; cursor: pointer; transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1); font-family: inherit; border-radius: 40px; letter-spacing: 0.05em;}
.btn-outline-small:hover { border-color: var(--text-primary); background: var(--bg-hover); }

/* Filters & Search */
.tag-group-small { display: flex; gap: 8px; }
.filter-tag { padding: 8px 16px; border: 1px solid var(--border); background: transparent; font-size: 13px; font-weight: 800; color: var(--text-muted); cursor: pointer; transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1); border-radius: 40px; letter-spacing: 0.05em;}
.filter-tag:hover { background: var(--bg-hover); color: var(--text-primary); border-color: var(--text-primary);}
.filter-tag.active { background: transparent; color: var(--text-primary); border-color: var(--text-primary); font-weight: 800; }

.search-box { display: flex; align-items: center; gap: 12px; background: transparent; border: 1px solid var(--border); padding: 12px 16px; min-width: 320px; border-radius: 40px; transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
.search-box.focused { border-color: var(--text-primary); background: var(--bg-hover); }
.search-icon { font-size: 14px; color: var(--text-muted); flex-shrink: 0; }
.search-input { width: 100%; border: none; background: transparent; font-size: 14px; color: var(--text-primary); outline: none; font-family: inherit; font-weight: 600; }
.search-input::placeholder { color: var(--text-muted); font-weight: 500; }

.dropdown-menu { position: absolute; top: 100%; right: 0; margin-top: 8px; z-index: 10; width: 140px; background: var(--bg-surface); border: 1px solid var(--border); border-radius: 0; padding: 8px 0; box-shadow: none; animation: fadeUp 0.2s cubic-bezier(0.16, 1, 0.3, 1) both; }
@keyframes fadeUp { from { transform: translateY(10px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
.dropdown-item { width: 100%; padding: 10px 16px; text-align: left; background: transparent; border: none; font-size: 13px; color: var(--text-muted); font-weight: 600; cursor: pointer; transition: all 0.2s; font-family: inherit; }
.dropdown-item:hover { background: var(--bg-hover); color: var(--text-primary); }

.search-extended { background: transparent; border: 1px dashed var(--border); padding: 24px; border-radius: 0; display: flex; align-items: flex-end; gap: 24px; }
.form-group { display: flex; flex-direction: column; gap: 8px; }
.form-group label { font-size: 12px; font-weight: 800; color: var(--text-muted); letter-spacing: 0.1em; text-transform: uppercase;}
.brutal-select { padding: 10px 16px; border: 1px solid var(--border); background: transparent; color: var(--text-primary); font-size: 13px; font-weight: 700; outline: none; cursor: pointer; font-family: inherit; border-radius: 0; min-width: 120px; transition: all 0.3s; }
.brutal-select:focus { border-color: var(--text-primary); background: var(--bg-hover);}
.btn-text-muted { background: transparent; border: none; font-size: 13px; color: var(--text-muted); display: flex; align-items: center; gap: 8px; padding: 10px 16px; cursor: pointer; transition: all 0.3s; border-radius: 40px; font-family: inherit; font-weight: 800;}
.btn-text-muted:hover { color: var(--text-primary); background: var(--bg-hover); }

/* Table */
.table-header { display: grid; grid-template-columns: 100px minmax(0, 1.3fr) 100px 140px 220px; gap: 24px; background: transparent; border-bottom: 1px solid var(--border); padding: 16px 24px; font-size: 12px; font-weight: 800; color: var(--text-muted); letter-spacing: 0.1em; text-transform: uppercase;}
.empty-state { padding: 64px; text-align: center; color: var(--text-muted); font-size: 14px; font-weight: 700; border-bottom: 1px solid var(--border);}

.table-row { display: grid; grid-template-columns: 100px minmax(0, 1.3fr) 100px 140px 220px; gap: 24px; padding: 24px; border-bottom: 1px solid var(--border); transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1); align-items: center; }
.table-row:last-child { border-bottom: none; }
.table-row:hover:not(.is-excluded) { background: var(--bg-hover); }
.table-row.is-excluded { background: transparent; opacity: 0.4; }

.row-date { font-size: 13px; font-weight: 700; color: var(--text-secondary); font-family: 'Space Grotesk', monospace; }
.table-row.is-excluded .row-date { color: var(--text-muted); opacity: 0.7; }

.row-main { min-width: 0; }
.row-title { font-size: 15px; font-weight: 800; color: var(--text-primary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-bottom: 8px; display: block; letter-spacing: 0.05em;}
.table-row.is-excluded .row-title { color: var(--text-muted); }

.row-badge { background: transparent; border: 1px solid var(--border); color: var(--text-primary); padding: 4px 8px; font-size: 10px; font-weight: 800; border-radius: 40px; margin-left: 8px;}
.row-desc { font-size: 13px; color: var(--text-muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin: 0; font-weight: 600; line-height: 1.6; }

.type-badge { display: inline-flex; align-items: center; gap: 8px; background: transparent; border: 1px solid var(--border); padding: 6px 12px; font-size: 11px; font-weight: 800; color: var(--text-primary); border-radius: 40px; }
.row-tags { display: flex; flex-wrap: wrap; gap: 8px; }
.small-tag { display: flex; align-items: center; gap: 6px; background: transparent; border: 1px solid var(--border); padding: 6px 12px; font-size: 11px; font-weight: 700; color: var(--text-muted); border-radius: 40px; }

.btn-exclude { flex: 1; text-align: center; background: transparent; border: 1px solid var(--border); padding: 10px 16px; font-size: 12px; font-weight: 800; color: var(--text-primary); cursor: pointer; transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1); border-radius: 40px; display: flex; align-items: center; justify-content: center; gap: 8px; font-family: inherit; }
.btn-exclude:hover { background: var(--bg-hover); border-color: var(--text-primary); }
.btn-restore { background: transparent; color: var(--text-muted); border-style: dashed;}
.btn-exclude i { margin-top: 0; }
.btn-delete { flex: 1; background: transparent; border: 1px solid var(--border); padding: 10px 16px; font-size: 12px; color: var(--text-muted); cursor: pointer; transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1); border-radius: 40px; display: flex; align-items: center; justify-content: center; }
.btn-delete:hover { border-color: var(--text-primary); color: var(--bg-base); background: var(--text-primary); }

@media (max-width: 768px) {
  .table-header, .table-row { grid-template-columns: 1fr; gap: 8px; }
  .row-date { display: none; }
}
=======
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
>>>>>>> d9d81185ededc2b2de1631f9ff7968776e03e2e7
</style>