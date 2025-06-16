<template>
  <div class="manual-control">
    <!-- 标题 -->
    <div class="panel-title">Manual Control</div>

    <!-- Junction -->
    <label class="label junction-label">Junction</label>
    <select class="common-box junction-input"></select>

    <!-- Traffic Light -->
    <label class="label light-label">Traffic Light</label>
    <select class="common-box light-input"></select>

    <!-- Light State -->
    <label class="label state-label">Light State</label>
    <div class="light-buttons">
      <button class="light-btn red">RED</button>
      <button class="light-btn green">GREEN</button>
    </div>

    <!-- Duration -->
    <label class="label duration-label">Duration</label>
    <input type="number" class="common-box duration-input" />

    <!-- Action Buttons -->
    <button class="apply-btn">APPLY</button>
    <button class="cancel-btn">CANCEL</button>
  </div>
</template>


<script setup lang="ts">

</script>

<style scoped lang="scss">
.manual-control {
  width: 100%;
  height: 4.3rem;
  background-color: #1E1E2F;
  box-sizing: border-box;
  position: relative;
  flex-shrink: 0;
}

.panel-title {
  position: absolute;
  top: 0.2rem;
  left: 0.23rem;
  font-size: 0.18rem;
  font-weight: bold;
  color: #00B4D8;
}

.label {
  position: absolute;
  width: 1.6rem;
  font-size: 0.14rem;
  color: white;
  font-weight: bold;
}


.junction-label {
  position: absolute;
  top: 0.71rem;
  left: 0.23rem;
}
.junction-input {
  position: absolute;
  top: 0.6rem;
  left: 1.76rem;
}

.light-label {
  position: absolute;
  top: 1.35rem;
  left: 0.23rem;
}
.light-input {
  position: absolute;
  top: 1.24rem;
  left: 1.76rem;
}

.state-label {
  position: absolute;
  top: 1.98rem;
  left: 0.23rem;
}
.light-buttons {
  position: absolute;
  top: 1.88rem;
  left: 1.76rem;
  display: flex;
  gap: 0.55rem;
}
.light-btn {
  flex: 1;
  padding: 0.08rem 0;
  width: 1rem;
  height: .4rem;
  border: none;
  border-radius: 0.08rem;
  font-weight: bold;
  font-size: 0.14rem;
  color: white;
  cursor: pointer;
}
.red {
  background-color: #2B2C3D;
  color: #E63946;
  border: 0px solid #EC808D;

}

.green {
 background-color: #2B2C3D;
  color: #2A9D8F;
  border: 0px solid #CAF982;
}

.duration-label {
  position: absolute;
  top: 2.61rem;
  left: 0.23rem;
}
.duration-input {
  position: absolute;
  width: 1.6rem;
  top: 2.52rem;
  left: 1.76rem;
}

.apply-btn,
.cancel-btn {
  position: absolute;
  width: 1.4rem;
  height: .4rem;
  font-size: 0.14rem;
  font-weight: bold;
  border-radius: 0.2rem;
  border: none;
  cursor: pointer;
}

.apply-btn {
  top: 3.22rem;
  left: 0.7rem;
  background-color: #00B4D8;
  color: white;
}

.cancel-btn {
  top: 3.22rem;
  left: 3.5rem;
  background-color: #999999;
  color: white;
}
</style>
