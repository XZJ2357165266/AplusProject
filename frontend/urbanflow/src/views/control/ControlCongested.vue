<template>
  <div class="congested-box">
    <div class="title">Congested Roads</div>
    <div class="table-header">
      <span class="col location">Location</span>
      <span class="col queue">Queue Length</span>
    </div>

    <div class="table-body">
      <div class="table-row" v-for="(item, index) in congestedData" :key="index">
        <span class="col location" :class="getLocationClass(index)">
          {{ item.location }}
        </span>
        <span class="col queue" :class="getQueueClass(item.queue)">
          {{ item.queue }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const congestedData = [
  { location: 'Dublin Castle, Dame Street, Dublin 2', queue: 15 },
  { location: 'Dublin Castle, Dame Street, Dublin 2', queue: 13 },
  { location: 'Dublin Castle, Dame Street, Dublin 2', queue: 10 },
  { location: 'Dublin Castle, Dame Street, Dublin 2', queue: 9 },
  { location: 'Dublin Castle, Dame Street, Dublin 2', queue: 9 },
  { location: 'Dublin Castle, Dame Street, Dublin 2', queue: 9 }
]


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
</script>

<style scoped lang="scss">
.congested-box {
  width: 100%;
  height: 2.8rem;
  background-color: #1E1E2F;
  padding: 0.16rem;
  box-sizing: border-box;
  border-bottom: 0.01rem solid #3A3A4C;
  flex-shrink: 0;
}

.title {
  font-size: 0.2rem;
  font-weight: bold;
  color: #ff4c4c;
  margin-bottom: 0.12rem;
}

.table-header {
  display: flex;
  justify-content: space-between;
  font-size: 0.16rem;
  font-weight: bold;
  color: #F1F1F1;
  font-family: Arial, Helvetica, sans-serif;
  padding-bottom: 0.06rem;
  margin-bottom: 0.06rem;
}

.table-body {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}

.table-row {
  display: flex;
  justify-content: space-between;
  padding: 0.04rem 0;
  flex-shrink: 0;
}

.table-row:last-child {
  margin-bottom: 0.31rem;
}

.col.location {
  width: 75%;
  font-size: 0.14rem;
}

.col.queue {
  width: 25%;
  text-align: right;
  font-size: 0.14rem;
  text-align: center;
}

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
