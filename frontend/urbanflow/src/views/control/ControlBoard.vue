<template>
  <div class="control-board">
    <ControlCongested />
    <ControlAI />
    <ControlManual />
  </div>
</template>

<script setup lang="ts">
import ControlCongested from './ControlCongested.vue'
import ControlAI from './ControlAI.vue'
import ControlManual from './ControlManual.vue'
</script>

<style scoped lang="scss">
.control-board {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  > * {
    width: 100%;
  }

  // 根据顺序设置高度占比
  > :nth-child(1) {
    height: 27%;
  }

  > :nth-child(2) {
    height: 30;
  }

  > :nth-child(3) {
    flex: 43%
  }
}
</style>
