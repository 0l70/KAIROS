<template>
  <div class="flex h-screen bg-gray-50">
    <AppSidebar />

    <div class="flex-1 flex flex-col overflow-hidden">
      <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
        <h1 class="text-3xl font-bold text-gray-800 mb-6">마이페이지</h1>
        
        <div class="mb-6 border-b border-gray-200">
          <ul class="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500">
            <li class="mr-2">
              <a href="#" @click.prevent="activeTab = 'profile'" 
                 :class="{'text-blue-600 border-blue-600': activeTab === 'profile', 'border-transparent hover:text-gray-600 hover:border-gray-300': activeTab !== 'profile'}"
                 class="inline-flex p-4 border-b-2 rounded-t-lg group">
                프로필 & 계정 관리
              </a>
            </li>
            <li class="mr-2">
              <a href="#" @click.prevent="activeTab = 'growth'"
                 :class="{'text-blue-600 border-blue-600': activeTab === 'growth', 'border-transparent hover:text-gray-600 hover:border-gray-300': activeTab !== 'growth'}"
                 class="inline-flex p-4 border-b-2 rounded-t-lg group">
                성장 일지 (Growth Journal)
              </a>
            </li>
          </ul>
        </div>

        <div v-if="activeTab === 'profile'" class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="bg-white p-6 rounded-lg shadow">
            <h2 class="text-xl font-semibold mb-4">내 정보</h2>
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700">이름</label>
                <input type="text" v-model="user.name" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">이메일</label>
                <input type="email" v-model="user.email" disabled class="mt-1 block w-full bg-gray-100 rounded-md border-gray-300 shadow-sm" />
              </div>
              <button class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">정보 수정</button>
            </div>
          </div>

          <div class="bg-white p-6 rounded-lg shadow">
            <h2 class="text-xl font-semibold mb-4 text-red-600">계정 관리</h2>
            <div class="space-y-4">
              <p class="text-sm text-gray-600">비밀번호 변경 및 계정 탈퇴를 진행할 수 있습니다.</p>
              <button class="w-full px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition mb-2">비밀번호 변경</button>
              <button class="w-full px-4 py-2 border border-red-500 text-red-500 rounded-md hover:bg-red-50 transition">회원 탈퇴</button>
            </div>
          </div>
        </div>

        <div v-if="activeTab === 'growth'" class="bg-white p-6 rounded-lg shadow">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-xl font-semibold">나의 학습 및 성장 기록</h2>
            <select class="rounded-md border-gray-300 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500">
              <option>최근 1개월</option>
              <option>최근 3개월</option>
              <option>전체 기간</option>
            </select>
          </div>
          
          <div class="grid grid-cols-3 gap-4 mb-6 text-center">
            <div class="p-4 bg-blue-50 rounded-lg">
              <div class="text-2xl font-bold text-blue-600">24</div>
              <div class="text-sm text-gray-600">완료한 활동</div>
            </div>
            <div class="p-4 bg-green-50 rounded-lg">
              <div class="text-2xl font-bold text-green-600">85%</div>
              <div class="text-sm text-gray-600">목표 달성률</div>
            </div>
            <div class="p-4 bg-purple-50 rounded-lg">
              <div class="text-2xl font-bold text-purple-600">12</div>
              <div class="text-sm text-gray-600">작성한 블로그/회고</div>
            </div>
          </div>

          <div class="space-y-4">
            <div v-for="journal in growthLogs" :key="journal.id" class="border-l-4 border-blue-500 pl-4 py-2">
              <span class="text-sm text-gray-500">{{ journal.date }}</span>
              <h3 class="font-medium text-lg">{{ journal.title }}</h3>
              <p class="text-gray-600 mt-1">{{ journal.description }}</p>
              <div class="mt-2 flex gap-2">
                <span v-for="tag in journal.tags" :key="tag" class="px-2 py-1 bg-gray-100 text-xs rounded-full text-gray-600">
                  {{ tag }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AppSidebar from '../components/AppSidebar.vue'

const activeTab = ref('profile')

const user = ref({
  name: '사용자명',
  email: 'user@example.com'
})

// 와이어프레임 Mock Data 기반 이식
const growthLogs = ref([
  {
    id: 1,
    date: '2023-11-20',
    title: 'Vue.js 기초 마스터',
    description: '컴포넌트 라이프사이클과 Pinia 상태관리에 대한 이해도를 높였습니다.',
    tags: ['Vue', 'Frontend']
  },
  {
    id: 2,
    date: '2023-11-15',
    title: '알고리즘: 다익스트라 완벽 이해',
    description: '백준 골드 티어 최단경로 문제를 3개 해결하고 리뷰를 작성했습니다.',
    tags: ['Algorithm', 'Python']
  }
])
</script>