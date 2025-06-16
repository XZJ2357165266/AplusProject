<template>
  <div class="suggested-actions">
    <div class="panel-title">Suggested Actions</div>
    <div class="action-box">
      <p class="placeholder-text">AI Suggestions</p>
    </div>
    <div class="action-buttons">
      <button class="apply-btn">APPLY</button>
      <button class="ignore-btn">IGNORE</button>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
.suggested-actions {
  width: 100%;
  height: 3.08rem;
  padding: 0 0.16rem;
  box-sizing: border-box;
  background-color: #1E1E2F;
  border-bottom: 0.01rem solid #3A3A4C;
  flex-shrink: 0;
  position: relative;
}

.panel-title {
  font-size: 0.18rem;
  font-weight: bold;
  color: #00B4D8;
  margin-bottom: 0.1rem;
  position: absolute;
  top: 0.2rem;
  left: .23rem;
}

.action-box {
  width: 5.12rem;
  height: 1.5rem;
  border: 1px solid #00B4D8;
  border-radius: 0.2rem;
  background-color: #1A1B2C;
  padding: 0.08rem;
  box-sizing: border-box;
  margin-bottom: 0.12rem;
  position: absolute;
  left: .24rem;
  top: .59rem;
}

.placeholder-text {
  color: #777;
  font-size: 0.14rem;
}

.action-buttons {
  display: flex;
  justify-content: space-between;
}

.apply-btn,
.ignore-btn {
  width: 1.4rem;
  height: 0.4rem;
  padding: 0.1rem 0;
  font-size: 0.14rem;
  border: none;
  border-radius: 0.2rem;
  cursor: pointer;
}

.apply-btn {
  background-color: #00B4D8;
  color: white;
  position: absolute;
  left: 0.7rem;
  top: 2.37rem;
}

.ignore-btn {
  background-color: #888;
  color: white;
  position: absolute;
  left: 3.5rem;
  top: 2.37rem;
}
</style>
