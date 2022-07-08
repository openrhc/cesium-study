/**
 * 点击事件
 * WGS84坐标系：[longitude, latitude, height]
 * 笛卡尔空间坐标: { x: number; y: number; z: number }
 */

import * as Cesium from 'cesium'

export function addPickEvent(
  viewer: Cesium.Viewer,
  cb?: ({}: Record<string, any>) => void
) {
  viewer.screenSpaceEventHandler.setInputAction(
    (movement: Cesium.ScreenSpaceEventHandler.MotionEvent) => {
      const cartesian = viewer.camera.pickEllipsoid(
        movement.endPosition,
        viewer.scene.globe.ellipsoid
      )
      if (cartesian) {
        const cartographic = Cesium.Cartographic.fromCartesian(cartesian)
        const longitudeString = Cesium.Math.toDegrees(
          cartographic.longitude
        ).toFixed(2)
        const latitudeString = Cesium.Math.toDegrees(
          cartographic.latitude
        ).toFixed(2)
        cb?.({
          cartesian,
          longitude: longitudeString,
          latitude: latitudeString,
        })
      }
    },
    Cesium.ScreenSpaceEventType.MOUSE_MOVE
  )
}

export function addClickEvent(
  viewer: Cesium.Viewer,
  cb?: ({}: Record<string, any>) => void
) {
  viewer.screenSpaceEventHandler.setInputAction(
    (event: Cesium.ScreenSpaceEventHandler.PositionedEvent) => {
      const pickedFeature: Cesium.Cesium3DTileFeature = viewer.scene.pick(
        event.position
      )

      window.$$pickedFeature = pickedFeature
      const cartesian3 = viewer.scene.pickPosition(event.position)
      if (!Cesium.defined(cartesian3)) return
      const wgs84 = Cartesian3_to_WGS84(cartesian3)
      console.log(wgs84.longitude, wgs84.latitude)
    },
    Cesium.ScreenSpaceEventType.LEFT_CLICK
  )
}

/**
 * 笛卡尔空间坐标转WGS84坐标
 * @param point { x: number; y: number; z: number }
 * @returns
 */
function Cartesian3_to_WGS84(cartesian3: Cesium.Cartesian3) {
  const cartographic = Cesium.Cartographic.fromCartesian(cartesian3)
  const longitude = Cesium.Math.toDegrees(cartographic.longitude)
  const latitude = Cesium.Math.toDegrees(cartographic.latitude)
  const height = cartographic.height
  return { longitude, latitude, height }
}

/**
 * WGS84坐标转笛卡尔空间坐标
 * @param wgs84 {longitude: number, latitude: number, height: number}
 * @returns
 */
function WGS84_to_Cartesian3(wgs84: Cesium.Cartographic) {
  const cartesian3 = Cesium.Cartesian3.fromDegrees(
    wgs84.longitude,
    wgs84.latitude,
    wgs84.height
  )
  const { x, y, z } = cartesian3
  return { x, y, z }
}
