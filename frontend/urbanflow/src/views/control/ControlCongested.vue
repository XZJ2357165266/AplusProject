<template>
  <div class="congested-box">
    <div class="title">Congested Roads</div>

    <div class="table-header">
      <span class="col location">Location</span>
      <span class="col queue">Queue Length</span>
    </div>

    <div class="table-body">
      <div
        class="table-row"
        v-for="(item, index) in congestedData"
        :key="index"
      >
        <span class="col location" :class="getLocationClass(index)">
          {{ item.j }}
        </span>
        <span class="col queue" :class="getQueueClass(item.q)">
          {{ item.q }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'

interface CongestedItem {
  j: string
  q: number
}

const congestedData = ref<CongestedItem[]>([])

const getQueueClass = (q: number) => {
  if (q >= 13) return 'danger'
  if (q >= 10) return 'warning'
  return 'normal'
}

const getLocationClass = (index: number) => {
  if (index === 0) return 'location-danger'
  if (index === 1 || index === 2) return 'location-warning'
  return 'location-normal'
}

onMounted(async () => {
  try {
    const response = await axios.get('/api/status/congested')
    console.log(response.data)
    congestedData.value = response.data
  } catch (error) {
    console.error( error)
  }
})
</script>

<style scoped lang="scss">
.congested-box {
  width: 100%;
  height: 2.8rem;
  background-color: #1E1E2F;
  box-sizing: border-box;
  border-bottom: 0.01rem solid #3A3A4C;
  flex-shrink: 0;
  position: relative;
  padding: 0.2rem 0.24rem 0rem 0.24rem;
  overflow: hidden;
}

// 标题
.title {
  font-size: 0.2rem;
  font-weight: bold;
  color: #ff4c4c;
  line-height: 0.2rem;
  padding-bottom: 0.16rem;
}

// 表头
.table-header {
  display: flex;
  justify-content: space-between;
  font-size: 0.16rem;
  font-weight: bold;
  color: #FFFFFF;
  font-family: Arial, Helvetica, sans-serif;
  line-height: 0.16rem;
  padding-bottom: 0.16rem;
}

// 表体
.table-body {
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

// 每一行
.table-row {
  display: flex;
  justify-content: space-between;
  flex-shrink: 0;
  height: 0.28rem;
  line-height: 0.28rem;
  padding-bottom: 0.12rem;
}

// 列
.col {
  display: flex;
  align-items: center;
}

.col.location {
  width: 75%;
  font-size: 0.14rem;
}

.col.queue {
  width: 0.9rem;
  font-size: 0.14rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

// 颜色类
.danger {
  color: #ff4c4c;
}
.warning {
  color: #ffc107;
}
.normal {
  color: #ffff00;
}

.location-danger {
  color: #D9001B;
}
.location-warning {
  color: #F59A23;
}
.location-normal {
  color: #FFFF00;
}
</style>
