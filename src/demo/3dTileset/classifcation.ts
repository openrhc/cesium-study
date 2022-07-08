import * as Cesium from 'cesium'

export async function addClassifcationTileset(viewer: Cesium.Viewer) {
  const tileset = new Cesium.Cesium3DTileset({
    url: 'http://192.168.110.70:9002/model/f039c3b0fc3011eca5b3d9707210ef59/tileset.json',
    skipLevelOfDetail: true,
    baseScreenSpaceError: 1024,
    maximumScreenSpaceError: 100, // 数值加大，能让最终成像变模糊
    skipScreenSpaceErrorFactor: 16,
    skipLevels: 1,
    immediatelyLoadDesiredLevelOfDetail: false,
    loadSiblings: true, // 如果为true则不会在已加载完概况房屋后，自动从中心开始超清化房屋
    cullWithChildrenBounds: true,
    cullRequestsWhileMoving: true,
    cullRequestsWhileMovingMultiplier: 10, // 值越小能够更快的剔除
    preloadWhenHidden: true,
    preferLeaves: true,
    maximumMemoryUsage: 1024, // 内存分配变小有利于倾斜摄影数据回收，提升性能体验
    progressiveResolutionHeightFraction: 0.5, // 数值偏于0能够让初始加载变得模糊
    dynamicScreenSpaceErrorDensity: 0.8, // 数值加大，能让周边加载变快
    dynamicScreenSpaceErrorFactor: 1, // 不知道起了什么作用没，反正放着吧先
    dynamicScreenSpaceError: false, // 根据测试，有了这个后，会在真正的全屏加载完之后才清晰化房屋
  })
  viewer.scene.primitives.add(tileset)
  viewer.zoomTo(tileset)

  // 记载glb模型
  const modelEntity = viewer.entities.add({
    name: 'glb模型',
    position: Cesium.Cartesian3.fromDegrees(
      120.34165151102953,
      31.605847870369807,
      50
    ),
    model: {
      uri: '/Cesium_Air.glb',
    },
  })

  // const classifcationTilesetUrl = '/maoanxinyuan/tileset.json'

  // const classificationTileset = new Cesium.Cesium3DTileset({
  //   url: classifcationTilesetUrl,
  //   // classificationType: Cesium.ClassificationType.CESIUM_3D_TILE,
  // })

  // classificationTileset.style = new Cesium.Cesium3DTileStyle({
  //   color: 'rgba(255, 0, 0, 0.5)',
  // })
  // viewer.scene.primitives.add(classificationTileset)
  // viewer.zoomTo(classificationTileset)

  new Cesium.ClassificationPrimitive({
    geometryInstances: new Cesium.GeometryInstance({
      geometry: new Cesium.PolygonGeometry({
        polygonHierarchy: new Cesium.PolygonHierarchy(
          Cesium.Cartesian3.fromDegreesArray([
            120.34179357991856, 31.60545126478819, 120.34178562919566,
            31.605255516287645, 120.3421320056702, 31.60526445816279,
            120.34213143164374, 31.60546573456373,
          ])
        ),
        extrudedHeight: 500,
      }),
      attributes: {
        color: Cesium.ColorGeometryInstanceAttribute.fromColor(
          new Cesium.Color(1, 0, 0, 0)
        ),
        show: new Cesium.ShowGeometryInstanceAttribute(true),
      },
    }),
    classificationType: Cesium.ClassificationType.CESIUM_3D_TILE,
  })
}
