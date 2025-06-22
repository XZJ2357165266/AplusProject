<template>
  <div class="manual-control">
    <div class="panel-title">Manual Control</div>

    <!-- Junction 选择 -->
    <div class="form-row">
      <label class="label">Junction</label>
      <select class="common-box" v-model="selectedJunctionIndex">
        <option
          v-for="(junction, index) in junctions"
          :key="index"
          :value="index"
        >
          {{ junction.name }}
        </option>
      </select>
    </div>

    <!-- Traffic Light 方向选择 -->
    <div class="form-row">
      <label class="label">Traffic Light</label>
      <select class="common-box" v-model="selectedDirection">
        <option
          v-for="(dir, idx) in currentDirections"
          :key="idx"
          :value="`${dir.fromEdge}->${dir.toEdge}`"
        >
          From {{ dir.fromEdge }} To {{ dir.toEdge }}
        </option>
      </select>
    </div>

    <!-- 灯光状态 -->
    <div class="form-row">
      <label class="label">Light State</label>
      <div class="light-buttons">
        <button
          class="light-btn red"
          :class="{ 'active-red': selectedLight === 'RED' }"
          @click="selectLight('RED')"
        >RED</button>
        <button
          class="light-btn green"
          :class="{ 'active-green': selectedLight === 'GREEN' }"
          @click="selectLight('GREEN')"
        >GREEN</button>
      </div>
    </div>

    <div class="form-row">
      <label class="label">Duration</label>
      <input
        type="number"
        class="common-box num-box"
        v-model="duration"
        min="1"
        max="300"
        step="1"
        placeholder="Duration (s)"
      />
    </div>

    <!-- 操作按钮 -->
    <div class="action-buttons">
      <button class="apply-btn" :disabled="!isFormComplete" @click="onApply">APPLY</button>
      <button class="cancel-btn" @click="resetForm">CANCEL</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import axios from 'axios'

// ===== 类型定义 =====

interface Direction {
  fromEdge: string
  toEdge: string
}

interface Junction {
  id: string
  name: string
  position: number[]
  directions: Direction[]
}

// 对应后端结构
interface RawConnection {
  from: string
  to: string
}

interface RawJunction {
  junctionID: string
  junctionName: string
  connections: RawConnection[][]
}

// ===== 表单状态 =====

const junctions = ref<Junction[]>([])
const selectedJunctionIndex = ref(0)
const selectedDirection = ref('')
const selectedLight = ref('')
const duration = ref<number | null>(null)

// ===== 计算属性 =====

const currentDirections = computed(() => {
  return junctions.value[selectedJunctionIndex.value]?.directions || []
})

const isFormComplete = computed(() => {
  return (
    selectedJunctionIndex.value !== null &&
    selectedDirection.value !== '' &&
    selectedLight.value !== '' &&
    duration.value !== null
  )
})

// ===== 事件方法 =====

const selectLight = (color: string) => {
  selectedLight.value = color
}

const resetForm = () => {
  selectedDirection.value = ''
  selectedLight.value = ''
  duration.value = null
}

const onApply = async () => {
  const junction = junctions.value[selectedJunctionIndex.value]
  const lightIndex = currentDirections.value.findIndex(
    dir => `${dir.fromEdge}->${dir.toEdge}` === selectedDirection.value
  )

  if (!junction || lightIndex === -1 || duration.value === null) {
    console.warn('表单数据不完整')
    return
  }

  const state = selectedLight.value === 'GREEN'
    ? 'G'
    : selectedLight.value === 'RED'
    ? 'r'
    : null

  const requestBody = {
    junctionId: 181747232,
    lightIndex: 0,
    duration: 5,
    state: state,
    source: 'manual'
  }

  try {
    const response = await axios.post('/api-remote-signal/api/signalcontrol/manual', requestBody)
    console.log(response.data)
    resetForm()
  } catch (error) {
    console.error(error)
  }
}

// ===== 后端数据拉取（修复 data.junction 取值） =====

const fetchJunctions = async () => {
  try {
    const response = await axios.get('/api-signal/api/status/realtime')

    const data = response.data
    const raw = data.junction as Record<string, RawJunction>

    junctions.value = Object.values(raw).map((junc): Junction => ({
      id: junc.junctionID,
      name: junc.junctionName,
      position: [], // 暂无坐标字段，空数组占位
      directions: junc.connections?.flat().map((conn) => ({
        fromEdge: conn.from,
        toEdge: conn.to
      })) || []
    }))

    console.log('获取到的路口列表:', junctions.value)
  } catch (error) {
    console.error(error)
  }
}

// ===== 生命周期 & 监听 =====

watch(selectedJunctionIndex, () => {
  selectedDirection.value = ''
})

onMounted(fetchJunctions)
</script>





<style scoped lang="scss">
.manual-control {
  width: 100%;
  height: 4.3rem;
  box-sizing: border-box;
  background-color: #1E1E2F;
  display: flex;
  flex-direction: column;
  padding-top: 0.2rem;
  padding-bottom: 0.4rem;
  gap: 0.24rem;
  flex-shrink: 0;
}

.panel-title {
  font-size: 0.18rem;
  font-weight: bold;
  color: #00B4D8;
  margin-bottom: 0.1rem;
  padding-left: 0.24rem;
}

.form-row {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  padding-right: 0.24rem;
}

.label {
  width: 1.6rem;
  font-size: 0.14rem;
  color: white;
  font-weight: bold;
  padding-left: 0.24rem;
}

.light-buttons {
  display: flex;
  gap: 0.3rem;
}

.light-btn {
  width: 1rem;
  height: 0.4rem;
  border: none;
  border-radius: 0.08rem;
  font-weight: bold;
  font-size: 0.14rem;
  color: #FFFFFF;
  cursor: pointer;
  background-color: #2B2C3D;
}

.red {
  color: #E63946;
}

.green {
  color: #2A9D8F;
}

.active-red {
  border: 2px solid #E63946;
}

.active-green {
  border: 2px solid #2A9D8F;
}

.action-buttons {
  display: flex;
  justify-content: space-between;
  width: 4.2rem;
  margin: 0 auto;
}

.apply-btn,
.cancel-btn {
  width: 1.4rem;
  height: 0.4rem;
  font-size: 0.14rem;
  font-weight: bold;
  border-radius: 0.2rem;
  border: none;
  cursor: pointer;
}

.apply-btn {
  background-color: #00B4D8;
  color: white;
}

.apply-btn:disabled {
  background-color: #999999;
  cursor: not-allowed;
}

.cancel-btn {
  background-color: #999999;
  color: white;
}

.num-box {
  width: 1.6rem;
}

select.common-box option {
  max-width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  opacity: 1;
}
</style>
