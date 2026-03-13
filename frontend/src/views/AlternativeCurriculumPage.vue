<template>
  <div class="min-h-screen bg-gray-50 p-6 font-sans">
    <div class="max-w-4xl mx-auto space-y-12">
      
      <div v-if="isLoadingAI" class="flex flex-col items-center justify-center py-20 text-gray-500">
        <i class="fas fa-circle-notch fa-spin text-3xl mb-4 text-blue-500"></i>
        <p>새로운 대체 커리큘럼을 생성하는 중입니다...</p>
      </div>

      <template v-else>
        <section>
          <button @click="router.back()" class="flex items-center gap-1 text-gray-500 hover:text-gray-700 mb-6 text-sm">
            <i class="fas fa-arrow-left"></i> 뒤로
          </button>
          <h2 class="text-2xl font-bold text-gray-900 mb-2">같은 데이터를 바탕으로 다른 커리큘럼도 준비했어요</h2>
          <p class="text-gray-500 text-sm mb-6">이번에는 프로젝트 적용성과 협업 효율을 높이는 방향으로 다시 구성했습니다.</p>

          <div class="bg-white border border-gray-200 rounded-lg p-6 mb-6">
            <h3 class="text-lg font-bold mb-4">재구성된 학습 일정 요약</h3>
            
            <div v-if="alternativeCurriculum && alternativeCurriculum.length === 0" class="text-center text-gray-500 py-4">
              추천할 대체 일정이 없습니다.
            </div>
            
            <ul v-else class="space-y-3">
              <li v-for="item in alternativeCurriculum" :key="item.date" class="flex items-start gap-4 p-3 bg-gray-50 rounded">
                <span class="text-sm font-bold text-gray-700 w-24 shrink-0">{{ item.date }}</span>
                <div class="flex-1">
                  <p class="text-sm font-semibold text-gray-900">{{ item.title }}</p>
                  <p class="text-xs text-gray-500">{{ item.duration }}</p>
                </div>
              </li>
            </ul>
          </div>
          
          <div class="flex gap-4">
            <button @click="router.push('/curriculum/suggest')" class="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition">
              처음 추천 보기
            </button>
            <button @click="applyToCalendar" class="flex-1 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition flex justify-center items-center gap-2">
              <i class="fas fa-calendar-check"></i> 이 커리큘럼 캘린더에 추가하기
            </button>
          </div>
        </section>

        <section class="border-t border-gray-200 pt-10">
          <h2 class="text-xl font-bold text-gray-900 mb-2">다른 방식으로 시작해볼까요?</h2>
          <p class="text-gray-500 text-sm mb-6">커리큘럼 외에 다른 학습 활동도 추천합니다</p>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition">
              <div class="w-12 h-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mb-4 text-xl">
                <i class="fas fa-brain"></i>
              </div>
              <h3 class="text-gray-900 font-bold mb-2">복습 퀴즈 추천</h3>
              <p class="text-gray-500 text-sm mb-4 line-clamp-2">최근 활동을 기반으로 복습 퀴즈를 생성합니다. 학습 내용을 점검하세요.</p>
              <div class="flex gap-2 mb-6">
                <span class="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">상태관리</span>
                <span class="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">TypeScript</span>
              </div>
              <button @click="router.push('/quiz/activity')" class="w-full py-2 bg-gray-800 text-white rounded font-semibold text-sm hover:bg-gray-700">
                퀴즈 시작하기
              </button>
            </div>

            <div class="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition">
              <div class="w-12 h-12 bg-green-50 text-green-600 rounded-lg flex items-center justify-center mb-4 text-xl">
                <i class="fas fa-file-alt"></i>
              </div>
              <h3 class="text-gray-900 font-bold mb-2">레퍼런스 추천</h3>
              <p class="text-gray-500 text-sm mb-4 line-clamp-2">현재 학습 맥락과 연결된 최신 문서 및 아티클을 선별했습니다.</p>
              <div class="p-3 bg-yellow-50 border border-yellow-200 rounded text-xs text-yellow-800 mb-6">
                <i class="fas fa-exclamation-triangle mr-1"></i> 공식 문서를 함께 확인하는 것을 권장합니다.
              </div>
              <button @click="router.push('/activity/select')" class="w-full py-2 border border-gray-300 text-gray-700 rounded font-semibold text-sm hover:bg-gray-50">
                레퍼런스 보기
              </button>
            </div>
          </div>
        </section>
      </template>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useCalendarStore } from '@/stores/useCalendarStore'

const router = useRouter()
const store = useCalendarStore()

// Store 데이터 연동
const { alternativeCurriculum, isLoadingAI } = storeToRefs(store)

onMounted(async () => {
  // 실제 백엔드 연동: 데이터가 없으면 API 호출
  if (!alternativeCurriculum.value || alternativeCurriculum.value.length === 0) {
    await store.loadAlternativeCurriculum({ target: 'frontend' }) // 파라미터는 기획에 맞게 수정
  }
})

const applyToCalendar = async () => {
  // alternativeCurriculum의 항목들을 실제 캘린더 스토어의 일정 배열(schedules)에 밀어넣는 로직
  // 백엔드 API를 통해 일괄 저장 후, 캘린더 페이지로 라우팅
  
  /* 예시 구현:
  try {
    store.isLoadingAI = true;
    for (const item of alternativeCurriculum.value) {
      // 날짜 변환 등 가공 로직
      await store.addAiGeneratedSchedule({
        title: item.title,
        day: item.rawDate,
        reasoning: '대체 커리큘럼 선택',
        // ...
      });
    }
    router.push('/calendar');
  } catch (e) {
    console.error(e)
  }
  */
  
  router.push('/calendar')
}
</script>