/**
 * 墙
 */

import * as Cesium from 'cesium'

export function addWallGraphics(viewer: Cesium.Viewer) {
  viewer.entities.add({
    wall: {
      positions: Cesium.Cartesian3.fromDegreesArrayHeights([]),
    },
  })
}
