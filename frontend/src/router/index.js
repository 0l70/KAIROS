import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '../views/LandingPage.vue'
import LoginPage from '../views/LoginPage.vue'
import SignUpPage from '../views/SignUpPage.vue'
import SetupPage from '../views/SetupPage.vue'
import DashboardPage from '../views/DashboardPage.vue'
import CalendarPage from '../views/CalendarPage.vue'
import StudyCalendarPage from '../views/StudyCalendarPage.vue'
import AnalysisPage from '../views/AnalysisPage.vue'
// 와이어프레임에서 추가된 세부 분석/결과 페이지 (새로 생성 필요)
import AnalysisResultPage from '../views/AnalysisResultPage.vue' 
import RecommendPage from '../views/RecommendPage.vue'
import CurriculumSuggestPage from '../views/CurriculumSuggestPage.vue'
import CurriculumUploadPage from '../views/CurriculumUploadPage.vue'
// 와이어프레임에서 추가된 대체 커리큘럼 페이지
import AlternativeCurriculumPage from '../views/AlternativeCurriculumPage.vue' 
import ActivitySelectPage from '../views/ActivitySelectPage.vue'
import QuizPage from '../views/QuizPage.vue'
import QuizActivityPage from '../views/QuizActivityPage.vue'
import FeedbackPage from '../views/FeedbackPage.vue'
import PromptPage from '../views/PromptPage.vue'
import HistoryPage from '../views/HistoryPage.vue'
import MyPage from '../views/MyPage.vue'
import BlogAssistantPage from '../views/BlogAssistantPage.vue'
import TestView from '../views/TestView.vue'
import LoadingPage from '../views/LoadingPage.vue'

const routes = [
  { path: '/', name: 'Landing', component: LandingPage },
  { path: '/login', name: 'Login', component: LoginPage },
  { path: '/signup', name: 'SignUp', component: SignUpPage },
  // 온보딩 (와이어프레임의 OnboardingConnect, OnboardingSurvey 통합)
  { path: '/setup', name: 'Setup', component: SetupPage }, 
  
  // 메인 서비스
  { path: '/dashboard', name: 'Dashboard', component: DashboardPage },
  { path: '/calendar', name: 'Calendar', component: CalendarPage }, // GitHub 캘린더 100% 유지
  { path: '/study-calendar', name: 'StudyCalendar', component: StudyCalendarPage },
  
  // 분석 및 결과
  { path: '/analyze', name: 'Analysis', component: AnalysisPage },
  { path: '/analyze/result', name: 'AnalysisResult', component: AnalysisResultPage }, // 와이어프레임 기능
  
  // 추천 및 커리큘럼 (와이어프레임 기능 병합)
  { path: '/recommend', name: 'Recommend', component: RecommendPage },
  { path: '/curriculum/suggest', name: 'CurriculumSuggest', component: CurriculumSuggestPage },
  { path: '/curriculum/upload', name: 'CurriculumUpload', component: CurriculumUploadPage },
  { path: '/curriculum/alternative', name: 'AlternativeCurriculum', component: AlternativeCurriculumPage }, // 대체 활동/커리큘럼
  
  // 학습 및 활동
  { path: '/activity/select', name: 'ActivitySelect', component: ActivitySelectPage },
  { path: '/quiz', name: 'Quiz', component: QuizPage },
  { path: '/quiz/activity', name: 'QuizActivity', component: QuizActivityPage },
  { path: '/feedback', name: 'Feedback', component: FeedbackPage },
  
  // 기록 및 마이페이지
  { path: '/prompt', name: 'Prompt', component: PromptPage },
  { path: '/history', name: 'History', component: HistoryPage },
  { path: '/mypage', name: 'MyPage', component: MyPage }, // 와이어프레임의 Account, Growth Journal 병합됨
  { path: '/blog-assistant', name: 'BlogAssistant', component: BlogAssistantPage },
  
  // 기타
  { path: '/test', name: 'Test', component: TestView },
  { path: '/loading', name: 'Loading', component: LoadingPage },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router