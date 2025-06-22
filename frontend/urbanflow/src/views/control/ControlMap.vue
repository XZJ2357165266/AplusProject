<template>
  <div class="map-show" :class="{ 'sidebar-open': isSidebarOpen }">
    <div class="toolbar">
      <div class="zoom-controls">
        <div class="iconfont zoom-btn-plus" @click="zoomIn">&#xeaf3;</div>
        <div class="iconfont zoom-btn-minus" @click="zoomOut">&#xeaf5;</div>
      </div>
      <div class="search-wrapper">
        <input class="search-input" type="text" placeholder=" " />
      </div>
      <div class="iconfont search-btn">&#xeafe;</div>
    </div>

    <div class="map-container" ref="mapRef"></div>

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
import { onMounted, onUnmounted, ref } from 'vue'
import 'ol/ol.css'
import Map from 'ol/Map'
import View from 'ol/View'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import GeoJSON from 'ol/format/GeoJSON'
import { Style, Stroke } from 'ol/style'

defineProps<{ isSidebarOpen: boolean }>()

const mapRef = ref<HTMLElement | null>(null)

let map: Map | null = null
let view: View | null = null
let userMoved = false
let hasFitted = false

onMounted(() => {
  if (!map) {
    const vectorSource = new VectorSource({
      url: '/edges.geojson',
      format: new GeoJSON()
    })

    const vectorLayer = new VectorLayer({
      source: vectorSource,
      style: new Style({
        stroke: new Stroke({
          color: '#00B4D8',
          width: 1
        })
      })
    })

    view = new View({
      center: [0, 0],
      zoom: 1,
      minZoom: 1,
      maxZoom: 18
    })

    map = new Map({
      target: mapRef.value!,
      layers: [vectorLayer],
      view,
      controls: []
    })

    map.on('movestart', () => {
      userMoved = true
    })

    vectorSource.on('change', () => {
      if (vectorSource.getState() === 'ready' && !hasFitted && view && !userMoved) {
        view.fit(vectorSource.getExtent(), {
          padding: [20, 20, 20, 20],
          duration: 300
        })
        hasFitted = true
        userMoved = true
      }
    })
  } else {
    map.setTarget(mapRef.value!)
    setTimeout(() => map!.updateSize(), 300)
  }
})

onUnmounted(() => {
  if (map) {
    map.setTarget(undefined)
  }
})

const zoomIn = () => {
  if (view) {
    const currentZoom = view.getZoom() ?? 1
    const targetZoom = Math.min(currentZoom + 0.5, view.getMaxZoom() ?? 18)
    view.animate({
      zoom: targetZoom,
      duration: 250 // 毫秒，越大越平滑
    })
  }
}

const zoomOut = () => {
  if (view) {
    const currentZoom = view.getZoom() ?? 1
    const targetZoom = Math.max(currentZoom - 0.5, view.getMinZoom() ?? 1)
    view.animate({
      zoom: targetZoom,
      duration: 250
    })
  }
}

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
  font-size: 0.4rem;
  width: 0.3rem;
  height: 0.3rem;
  line-height: 0.3rem;
  color: #CFCFCF;
  text-align: center;
  cursor: pointer;
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
  margin-left: 3rem;
  width: 8.73rem;               // ✅ 固定宽度
  height: 0.4rem;
  display: flex;
  align-items: center;
  border: 0.01rem solid #00B4D8;
  background-color: #2B2C3D;
  border-radius: 0.2rem;
  padding: 0 0.12rem;
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
  position: absolute;
  right: 0.24rem;
}

.map-container {
  flex: 1;
  width: 100%;
  height: 100%; // ✅ 关键：必须明确高度
  position: relative;
  overflow: hidden;
  display: flex;
  background-color: #1E1E2F;
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
