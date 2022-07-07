/**
 * Label
 */

import * as Cesium from 'cesium'

export function addLabel(viewer: Cesium.Viewer) {
  return viewer.entities.add({
    label: {
      show: true,
      showBackground: true,
      font: '14px monospace',
      horizontalOrigin: Cesium.HorizontalOrigin.LEFT,
      verticalOrigin: Cesium.VerticalOrigin.TOP,
      pixelOffset: new Cesium.Cartesian2(10, 10),
    },
  })
}
