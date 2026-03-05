import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCalendarStore = defineStore('calendar', () => {
  // ★ 트랙 상태에 isEnded 추가
  const tracks = ref([
    { id: 'project',   name: '졸업작품 (Spring Boot)', color: '#818cf8', index: 0, isEnded: false },
    { id: 'cert',      name: '정보처리기사 준비',      color: '#f472b6', index: 1, isEnded: false },
    { id: 'algo',      name: '코딩테스트 스터디',      color: '#34d399', index: 2, isEnded: false },
    { id: 'cs',        name: 'CS 전공지식',            color: '#fbbf24', index: 3, isEnded: false },
  ])

  const schedules = ref([
    // ... (기존 프로젝트, 정처기 등 데이터 유지) ...
    { id: 'p1', day: '2026-03-05', track: 'project', text: '주제 선정 및 기획', tooltip: { title: '졸업작품 주제 선정 및 요구사항 정의', time: '10:00' } },
    { id: 'p2', day: '2026-03-18', track: 'project', text: 'DB ERD 설계', tooltip: { title: 'MySQL 테이블 및 관계 설계', time: '14:00' } },
    { id: 'p3', day: '2026-04-02', track: 'project', text: 'Spring 초기 세팅', tooltip: { title: '프로젝트 구조 세팅 및 의존성 추가', time: '13:00' } },
    { id: 'c1', day: '2026-03-08', track: 'cert', text: '정처기 필기 1과목', tooltip: { title: '소프트웨어 설계 이론', time: '09:00' } },
    { id: 'a1', day: '2026-03-12', track: 'algo', text: '자료구조 리뷰', tooltip: { title: 'Stack, Queue, HashMap', time: '20:00' } },

    // ★ 3~4월 프롬프트 & 블로그 어시스턴트 더미 데이터
    { id: 'pr1', day: '2026-03-07', track: 'prompt', text: 'Spring Security 설정 질문', tooltip: { title: 'JWT 필터 체인 구현 방법', time: '10:30', tags: ['#Spring', '#Security'] } },
    { id: 'bl1', day: '2026-03-10', track: 'blog', text: 'JPA N+1 문제 해결', tooltip: { title: 'Fetch Join을 활용한 쿼리 최적화 포스팅', time: '22:00', tags: ['#JPA', '#블로그'] } },
    { id: 'pr2', day: '2026-03-25', track: 'prompt', text: 'SQL 튜닝 방법 문의', tooltip: { title: '인덱스 타는 쿼리 작성법', time: '14:00', tags: ['#DB', '#SQL'] } },
    { id: 'bl2', day: '2026-04-05', track: 'blog', text: '정처기 필기 합격 후기', tooltip: { title: '공부 방법 및 요약 정리 포스팅', time: '23:00', tags: ['#자격증'] } },
    { id: 'pr3', day: '2026-04-18', track: 'prompt', text: 'AWS EC2 배포 에러 해결', tooltip: { title: 'Nginx 502 Bad Gateway 디버깅', time: '16:00', tags: ['#AWS', '#Inf라'] } },
  ])

  const connections = ref([
    { from: 'p1', to: 'p2' }, { from: 'p2', to: 'p3' },
    // 프롬프트 및 블로그는 보통 독립적이므로 선을 긋지 않거나 필요시 추가
  ])

  const allTracks = computed(() => {
    const list = [...tracks.value]
    if (!list.some(t => t.id === 'prompt')) list.push({ id: 'prompt', name: '프롬프트', color: '#facc15', index: 98, isHighlight: true, isEnded: false })
    if (!list.some(t => t.id === 'blog')) list.push({ id: 'blog', name: '블로그 어시스턴트', color: '#10b981', index: 99, isHighlight: true, isEnded: false })
    return list.sort((a, b) => a.index - b.index)
  })

  // ★ 진행 중인 트랙 / 종료된 트랙 분류
  const activeTracks = computed(() => tracks.value.filter(t => !t.isEnded))
  const endedTracks  = computed(() => tracks.value.filter(t => t.isEnded))

  // ... (getHoliday 등 기존 로직 유지) ...
  const holidays = ref({})
  const fetchedYears = ref(new Set())
  const getHoliday = (dateStr) => holidays.value[dateStr] || null
  const fetchHolidaysForYear = async (year) => { /* 기존 API 코드 유지 */ }

  const getSchedulesForDay = (dateStr) => schedules.value.filter(s => s.day === dateStr)
  const getTrackById = (id) => allTracks.value.find(t => t.id === id)

  // ★ 트랙 관리 전용 Action
  const toggleTrackEnded = (id) => {
    const t = tracks.value.find(x => x.id === id)
    if (t) t.isEnded = !t.isEnded
  }

  const addTrack = (newTrack) => {
    if (activeTracks.value.length >= 4) return alert('진행 중인 트랙은 최대 4개까지만 생성할 수 있습니다.')
    tracks.value.push({ ...newTrack, isEnded: false, index: tracks.value.length })
  }
  const updateTrackObj = (id, data) => {
    const idx = tracks.value.findIndex(t => t.id === id)
    if (idx !== -1) tracks.value[idx] = { ...tracks.value[idx], ...data }
  }

  const createSchedule = async (data) => {
    const newId = 's_' + Date.now()
    schedules.value.push({ id: newId, day: data.day, track: data.track, text: data.text || data.tooltip?.title, tooltip: data.tooltip })
    return newId
  }
  const updateSchedule = async (id, data) => {
    const idx = schedules.value.findIndex(s => s.id === id)
    if (idx !== -1) schedules.value[idx] = { ...schedules.value[idx], ...data }
  }
  const deleteSchedule = async (id) => {
    schedules.value = schedules.value.filter(s => s.id !== id)
    connections.value = connections.value.filter(c => c.from !== id && c.to !== id)
  }
  const updateConnectionsForSchedule = (nodeId, parentIds, childIds) => {
    connections.value = connections.value.filter(c => c.from !== nodeId && c.to !== nodeId)
    parentIds.forEach(pId => connections.value.push({ from: pId, to: nodeId }))
    childIds.forEach(cId => connections.value.push({ from: nodeId, to: cId }))
  }

  return {
    tracks, allTracks, activeTracks, endedTracks, schedules, connections,
    getSchedulesForDay, getTrackById, getHoliday, fetchHolidaysForYear,
    toggleTrackEnded, addTrack, updateTrackObj, // 추가된 트랙 조작 함수
    createSchedule, updateSchedule, deleteSchedule, updateConnectionsForSchedule
  }
})