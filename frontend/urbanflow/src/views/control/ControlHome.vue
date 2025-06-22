<template>
  <div class="control-page">
    <ControlHeader @toggle-nav="toggleSidebar" />
    <ControlNav :isVisible="showSidebar" />

    <div class="main-area">
      <div class="map-contain">
        <ControlMap :isSidebarOpen="showSidebar" />
      </div>

      <div class="control-board">
        <ControlBoard />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ControlHeader from '@/views/control/ControlHeader.vue'
import ControlMap from '@/views/control/ControlMap.vue'
import ControlBoard from './ControlBoard.vue'

import ControlNav from './ControlNav.vue'

const showSidebar = ref(false)
function toggleSidebar() {
  showSidebar.value = !showSidebar.value
}
</script>

<style lang="scss">
.control-page {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background-color: #1E1E2F;
  z-index: 1;
}

.main-area {
  height: calc(100% - 0.64rem); // 减去 Header 高度
  margin-top: 0.64rem;
  display: flex;
}

.map-contain {
  width: 13.59rem;// 占 70% 宽度
  height: 100%;
  position: relative;
  overflow: hidden;
}

.control-board {
  width: 5.61rem; // 占 30% 宽度
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #1E1E2F;
  overflow: hidden;
}

</style>
