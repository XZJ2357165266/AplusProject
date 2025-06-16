<template>
  <div class="map-wrapper">
    <div id="map" class="map-container"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import 'ol/ol.css'
import Map from 'ol/Map'
import View from 'ol/View'
import VectorSource from 'ol/source/Vector'
import VectorLayer from 'ol/layer/Vector'
import GeoJSON from 'ol/format/GeoJSON'
import { Style, Stroke, Fill, Circle as CircleStyle } from 'ol/style'
import { Feature } from 'ol'
import Point from 'ol/geom/Point'

// ✅ 定义节点类型
interface NodeData {
  id: string
  x: string
  y: string
  type?: string
}

onMounted(() => {
  // ✅ 加载 edges.geojson
  const vectorSource = new VectorSource({
    url: '/edges.geojson',
    format: new GeoJSON()
  })

  const vectorLayer = new VectorLayer({
    source: vectorSource,
    style: new Style({
      stroke: new Stroke({
        color: '#1e90ff',
        width: 1.5
      })
    })
  })

  const map = new Map({
    target: 'map',
    layers: [vectorLayer],
    view: new View({
      center: [0, 0],
      zoom: 2,
      projection: 'EPSG:3857'
    })
  })

  vectorSource.once('change', () => {
  if (vectorSource.getState() === 'ready') {
    const extent = vectorSource.getExtent()
    map.getView().fit(extent, { padding: [50, 50, 50, 50] })
  }
})


  // ✅ 加载 nodes.json 节点
  fetch('/nodes.json')
    .then(res => res.json())
    .then((nodes: NodeData[]) => {
      const features = nodes.map((node) => {
        return new Feature({
          geometry: new Point([parseFloat(node.x), parseFloat(node.y)]),
          id: node.id,
          type: node.type

        })

      })

      const nodeSource = new VectorSource({
        features: features
      })

      const nodeLayer = new VectorLayer({
        source: nodeSource,
        style: new Style({
          image: new CircleStyle({
            radius: 6,
            fill: new Fill({ color: '#ff4d4f' }) // 红色节点
          })
        })
      })

      map.addLayer(nodeLayer)
    })
})
</script>

<style scoped lang="scss">
.map-wrapper {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

.map-container {
  width: 100%;
  height: 100%;
  background-color: #f4f4f4;
}
</style>
