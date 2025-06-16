<template>
  <div class="control-page">
    <ControlHeader @toggle-nav="toggleSidebar" />

    <ControlNav :isVisible="showSidebar" />

    <div class="main-area">
      <!-- 地图容器占70%宽度 -->
      <div class="map-contain">
        <ControlMap :isSidebarOpen="showSidebar"/>
      </div>

      <!-- 控制面板占30%宽度 -->
      <div class="control-board">
        <ControlCongested />
        <ControlAI />
        <ControlManual />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ControlHeader from '@/views/control/ControlHeader.vue'
import ControlMap from '@/views/control/ControlMap.vue'
import ControlCongested from '@/views/control/ControlCongested.vue'
import ControlAI from './ControlAI.vue'
import ControlManual from './ControlManual.vue'
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
  padding: 0;
  margin: 0;
  z-index: 1;
}

.main-area {
  height: calc(100% - 0.64rem);
  margin-top: 0.64rem;
  display: flex;
}


.map-contain {
  width: 13.59rem;      /* 占据70%宽度 */
  height: 100%;    /* 填满高度 */
  position: relative;
}

.control-board {
  width: 5.6rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #1E1E2F;
}
</style>
