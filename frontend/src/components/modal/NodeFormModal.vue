<template>
  <Transition name="modal-fade">
    <div v-if="modelValue" class="modal-overlay" @click.self="close">
      <div class="modal-content retro-modal">
        <div class="modal-header">
          <h2 class="retro-text-hover">{{ mode === 'create' ? 'ADD_MISSION' : 'EDIT_MISSION' }}</h2>
          <button class="mech-key btn-close" style="padding: 4px 8px;" @click="close"><i class="fas fa-times" /></button>
        </div>

        <div class="modal-body custom-scroll">
          <div class="form-group">
            <label class="form-label">DATE / TIME</label>
            <div class="form-row">
              <input v-model="form.day" type="date" class="terminal-input flex-1" />
              <input v-model="form.time" type="time" class="terminal-input flex-1" />
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">TRACK</label>
            <select v-model="form.track" class="terminal-input">
              <option value="" disabled>Select Track...</option>
              <option v-for="t in activeTracks" :key="t.id" :value="t.id">{{ t.name }}</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">MISSION TITLE</label>
            <input v-model="form.text" type="text" class="terminal-input" placeholder="e.g., UI Design Review" />
          </div>

          <div class="form-group">
            <label class="form-label">TAGS</label>
            <input v-model="form.tags" type="text" class="terminal-input" placeholder="comma separated (e.g., css, design)" />
          </div>
        </div>

        <div class="modal-footer">
          <button class="mech-key btn-cancel" @click="close">CANCEL</button>
          <button class="mech-key key-accent-1 btn-save" @click="save" :disabled="!isValid">
            <i class="fas fa-save" /> SAVE
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { reactive, watch, computed } from 'vue'
import { useCalendarStore } from '@/stores/useCalendarStore'

const props = defineProps({ modelValue: Boolean, mode: String, initialForm: Object, editNodeId: String })
const emit = defineEmits(['update:modelValue', 'save'])
const store = useCalendarStore()
const activeTracks = computed(() => store.activeTracks)

const form = reactive({ day: '', track: '', text: '', time: '', tags: '' })
watch(() => props.modelValue, (val) => {
  if (val && props.initialForm) {
    Object.assign(form, props.initialForm)
  } else {
    Object.assign(form, { day: '', track: '', text: '', time: '', tags: '' })
  }
})

const isValid = computed(() => form.day && form.track && form.text)
function close() { emit('update:modelValue', false) }
function save() {
  if (!isValid.value) return
  const payload = { day: form.day, track: form.track, text: form.text, tooltip: { title: form.text, time: form.time, tags: form.tags.split(',').map(s=>s.trim()).filter(Boolean) } }
  emit('save', payload)
}
</script>

<style scoped>
@font-face { font-family: 'Mulmaru'; src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/2601-4@1.1/Mulmaru.woff2') format('woff2'); font-weight: normal; font-display: swap; }
@font-face { font-family: 'NeoDunggeunmo'; src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.3/NeoDunggeunmoPro-Regular.woff2') format('woff2'); font-weight: normal; font-display: swap; }

.modal-overlay { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(0,0,0,0.7); display: flex; align-items: center; justify-content: center; z-index: 9999; backdrop-filter: blur(4px); }

/* 💡 브루탈리즘 모달 스타일 일치 완료 */
.retro-modal {
  width: 90%; max-width: 480px;
  background: var(--bg-surface);
  border: 2px solid var(--border);
  box-shadow: 8px 8px 0 var(--border);
  border-radius: 4px;
  display: flex; flex-direction: column;
  font-family: 'Mulmaru', sans-serif;
}

.modal-header { padding: 20px 24px; border-bottom: 2px dashed var(--border); display: flex; justify-content: space-between; align-items: center; background: var(--bg-elevated); border-radius: 4px 4px 0 0;}
.modal-header h2 { font-size: 20px; font-weight: 900; font-family: 'NeoDunggeunmo', sans-serif; color: var(--text-primary); margin: 0; }

.modal-body { padding: 24px; display: flex; flex-direction: column; gap: 20px; max-height: 60vh; overflow-y: auto; background: var(--bg-base); }
.form-group { display: flex; flex-direction: column; gap: 8px; }
.form-label { font-size: 14px; font-weight: 800; font-family: 'NeoDunggeunmo', sans-serif; color: var(--text-primary); }
.form-row { display: flex; gap: 12px; }
.flex-1 { flex: 1; }

.terminal-input { background: #111111; color: #00FF66; border: 2px solid var(--border); border-radius: 4px; box-shadow: inset 0 2px 4px rgba(0,0,0,0.5); padding: 12px; font-family: 'NeoDunggeunmo', monospace; font-size: 14px; outline: none; transition: 0.2s;}
.terminal-input:focus { border-color: var(--accent); box-shadow: inset 0 2px 4px rgba(0,0,0,0.5), 0 0 0 2px var(--accent); }

.modal-footer { padding: 20px 24px; border-top: 2px solid var(--border); display: flex; justify-content: flex-end; gap: 12px; background: var(--bg-elevated); border-radius: 0 0 4px 4px;}

.mech-key { padding: 10px 20px; background: var(--bg-elevated); color: var(--text-primary); border: 2px solid var(--border); border-radius: 4px; box-shadow: 4px 4px 0 var(--border); cursor: pointer; font-family: 'NeoDunggeunmo', sans-serif; font-size: 14px; font-weight: 800; transition: all 0.1s; display: inline-flex; align-items: center; justify-content: center; gap: 8px; }
.mech-key:active { transform: translate(4px, 4px) !important; box-shadow: 0 0 0 transparent !important; }
.mech-key:disabled { opacity: 0.5; cursor: not-allowed; pointer-events: none;}
.key-accent-1 { background: var(--accent); color: #fff; border-color: var(--border);}

.modal-fade-enter-active, .modal-fade-leave-active { transition: opacity 0.2s; }
.modal-fade-enter-from, .modal-fade-leave-to { opacity: 0; }
</style>