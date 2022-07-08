<script setup lang="ts">
import * as Cesium from 'cesium'
import { onMounted, ref } from 'vue'
import { addWallGraphics, addLabel } from '@/demo/entities'
import { addPickEvent, addClickEvent } from '@/demo/Event'
import { addClassifcationTileset } from '@/demo/3dTileset'

const container = ref()

onMounted(() => InitMap())

/**
 * 初始化地图
 */
function InitMap() {
  const viewer = new Cesium.Viewer(container.value, {
    animation: false, // 动画小组件
    baseLayerPicker: false, // 底图组件，选择三维数字地球的底图（imagery and terrain）。
    fullscreenButton: false, // 全屏组件
    vrButton: false, // VR模式
    geocoder: false, // 地理编码（搜索）组件
    homeButton: false, // 首页，点击之后将视图跳转到默认视角
    infoBox: false, // 信息框
    sceneModePicker: false, // 场景模式，切换2D、3D 和 Columbus View (CV) 模式。
    selectionIndicator: false, //是否显示选取指示器组件
    timeline: false, // 时间轴
    navigationHelpButton: false, // 帮助提示，如何操作数字地球。
    terrainProvider: Cesium.createWorldTerrain(),
  })
  // viewer.scene.sun.show = false
  // viewer.scene.moon.show = false

  viewer.scene.globe.depthTestAgainstTerrain = true
  // viewer.scene.skyBox.show = false
  viewer.scene.globe.show = false
  ;(viewer as any)._cesiumWidget._creditContainer.style.display = 'none'
  window.viewer = viewer

  addWallGraphics(viewer)
  const labelEntity = addLabel(viewer)
  addClickEvent(viewer)
  addPickEvent(viewer, ({ cartesian, longitude, latitude }) => {
    labelEntity.position = cartesian
    if (labelEntity.label) {
      labelEntity.label.show = true
      labelEntity.label.text = `Lon:${longitude}\nLat:${latitude}`
    }
  })

  addClassifcationTileset(viewer)
}
</script>

<template>
  <div ref="container" class="container"></div>
</template>

<style scoped>
.container {
  height: 100vh;
}
</style>
