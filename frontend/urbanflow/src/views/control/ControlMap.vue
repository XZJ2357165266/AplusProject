<template>
  <div class="map-show" :class="{ 'sidebar-open': isSidebarOpen }">
    <!-- 工具栏 -->
    <div class="toolbar">
      <div class="zoom-controls">
        <div class="iconfont zoom-btn-plus">&#xeaf3;</div>
        <div class="iconfont zoom-btn-minus">&#xeaf5;</div>
      </div>
      <div class="search-wrapper">
        <input class="search-input" type="text" placeholder=" " />
      </div>
      <div class="iconfont search-btn">&#xeafe;</div>
    </div>

    <!-- 地图内容 -->
    <div class="map-container">
      <img src="@/assets/images/ControlMap.png" alt="Map" class="map-image" />
    </div>

    <!-- 底部信息栏 -->
    <div class="footer-container">
      <div class="footer-content">
        <span class="iconfont footer-icon">&#xe60b;</span>
        <span class="footer-text">
          Current Location:
          <span class="footer-link">Dublin Castle, Dame Street, Dublin 2</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ isSidebarOpen: boolean }>()
</script>

<style scoped lang="scss">
.map-show {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  position: relative;
  background-color: #1E1E2F;
  transition: width 0.3s ease, transform 0.3s ease;
}


.map-show.sidebar-open {
  width: 11.20rem;
  transform: translateX(2.4rem);
}


.toolbar {
  position: relative;
  height: 0.64rem;
  background-color: #1E1E2F;
  display: flex;
  align-items: center;
  padding: 0 0.24rem;
  border-bottom: 0.01rem solid #3A3A4C;
  z-index: 999;
  flex-shrink: 0;
}

.iconfont {
  font-size: 0.30rem;
  width: 0.3rem;
  height: 0.3rem;
  line-height: 0.3rem;
  color: #CFCFCF;
  text-align: center;
}
.zoom-controls {
  display: flex;
  align-items: center;

}
.zoom-btn-plus {
  left: 0.3rem;
  margin-right: 0.4rem;
}

.search-wrapper {
  margin-left: 4rem;
  flex: 1;
  height: 0.4rem;
  display: flex;
  align-items: center;
  border: 0.01rem solid #00B4D8;
  background-color: #2B2C3D;
  border-radius: 0.2rem;
  padding: 0 0.1rem;
  box-sizing: border-box;

  .search-input {
    flex: 1;
    height: 100%;
    background-color: transparent;
    border: none;
    outline: none;
    color: white;
    font-size: 0.13rem;
    padding: 0 0.08rem;
  }
}

.search-btn {
  margin-left: 0.24rem;
}

.map-container {
  flex: 1; /* 占据剩余空间 */
  width: 100%;
  position: relative;
  overflow: hidden;
  display: flex;
  background-color: #1E1E2F; /* 添加背景色 */
}

.map-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.footer-container {
  height: 0.92rem;
  background-color: #1E1E2F;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  font-size: 0.16rem;
}

.footer-content {
  width: 10.57rem;
  height: 0.57rem;
  display: flex;
  justify-content: center;
  align-items: center;

  color: white;
  font-family: Arial, sans-serif;
}

.footer-icon {
  color: #00B4D8;
  font-size: 0.18rem;
  margin-right: 0.08rem;
}

.footer-link {
  color: #00B4D8;
  margin-left: 0.04rem;
}
</style>
