<template>
  <div class="suggested-actions">
    <div class="panel-title">Suggested Actions</div>

    <div class="action-box">
      <p class="placeholder-text" v-if="suggestionData">
        Suggest changing <strong>{{ suggestionData.light.toUpperCase() }}</strong> light at
        <strong>{{ suggestionData.junctionName }}</strong><br />
        From <strong>{{ suggestionData.fromEdge }}</strong> to
        <strong>{{ suggestionData.toEdge }}</strong>,
        for <strong>{{ suggestionData.duration }}s</strong>.
      </p>
      <p class="placeholder-text" v-else>
        No suggestion available.
      </p>
    </div>

    <div class="action-buttons">
      <button
        ref="applyBtnRef"
        class="apply-btn"
        :disabled="!suggestionData"
        :class="{ 'progress-active': suggestionData }"
        @click="handleApply"
      >
        <span>APPLY</span>
      </button>
      <button class="ignore-btn" @click="handleIgnore">IGNORE</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import { toast } from '@/utils/ToastService'
import { suggestionList, type Suggestion } from '@/mocks/mockSuggestions'

const suggestionData = ref<null | Suggestion>(null)
const applyBtnRef = ref<HTMLElement | null>(null)

const showSuggestion = () => {
  const randomIndex = Math.floor(Math.random() * suggestionList.length)
  suggestionData.value = suggestionList[randomIndex]

  // 触发进度条动画
  if (applyBtnRef.value) {
    applyBtnRef.value.classList.remove('progress-active')
    void applyBtnRef.value.offsetWidth // 强制重绘触发动画
    applyBtnRef.value.classList.add('progress-active')
  }

  // 6 秒后自动清除建议
  setTimeout(() => {
    suggestionData.value = null
  }, 6000)
}

// 每 10 秒展示一条建议
setInterval(showSuggestion, 10000)

const handleApply = async () => {
  if (!suggestionData.value) return

  const payload = {
    tlsID: suggestionData.value.tlsId,
    index: suggestionData.value.index,
    light: suggestionData.value.light,
    duration: suggestionData.value.duration
  }

  try {
    await axios.post('/api/traffic/applySuggestion', payload)
    toast.success('Traffic light settings updated successfully!')
  } catch {
    toast.error('Failed to send data to backend.')
  }

  suggestionData.value = null
}

const handleIgnore = () => {
  suggestionData.value = null
}
</script>

<style scoped lang="scss">
.suggested-actions {
  width: 100%;
  height: 3.08rem;
  box-sizing: border-box;
  background-color: #1E1E2F;
  border-bottom: 0.01rem solid #3A3A4C;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
}

.panel-title {
  font-size: 0.18rem;
  font-weight: bold;
  color: #00B4D8;
  padding-left: 0.24rem;
  padding-top: 0.2rem;
  padding-bottom: 0.16rem;
}

.action-box {
  height: 1.5rem;
  border: 1px solid #00B4D8;
  border-radius: 0.2rem;
  background-color: #1A1B2C;
  padding: 0.16rem 0.24rem;
  margin: 0 0.24rem 0.26rem 0.24rem;
  box-sizing: border-box;

  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.placeholder-text {
  color: #ccc;
  font-size: 0.14rem;
  line-height: 1.4;
  margin: 0;
}

.action-buttons {
  display: flex;
  justify-content: space-between;
  width: 4.2rem;
  margin: 0 auto;
}

.apply-btn,
.ignore-btn {
  width: 1.4rem;
  height: 0.4rem;
  font-size: 0.14rem;
  border: none;
  border-radius: 0.2rem;
  position: relative;
  overflow: hidden;
  cursor: pointer;
}

// 默认灰色背景
.apply-btn {
  background-color: #999999;
  color: #FFFFFF;
  transition: background-color 0.3s ease;

  // 蓝色进度条遮罩
  &::before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    width: 100%;
    background-color: #00B4D8;
    transform: scaleX(0);
    transform-origin: left;
    z-index: 1;
  }

  &.progress-active::before {
    animation: countdown 6s linear forwards;
  }

  // 文字置顶
  span {
    position: relative;
    z-index: 2;
  }
}

// 禁用状态显示灰色鼠标
.apply-btn:disabled {
  cursor: not-allowed;
}

.ignore-btn {
  background-color: #999999;
  color: #FFFFFF;
}

// 动画：从右向左收缩蓝色条
@keyframes countdown {
  from {
    transform: scaleX(1);
  }
  to {
    transform: scaleX(0);
  }
}
</style>
