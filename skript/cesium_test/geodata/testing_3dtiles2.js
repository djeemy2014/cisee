//import Cesium from 'cesium'
//let data = sessionStorage.getItem('key');
//console.log(data);
//document.querySelector('#glotalshow1').forEach(res=>{console.log(res)})
//console.log(document.querySelector('#glotalshow1'))


 async function startup(Cesium) {
    'use strict';
    //Sandcastle_Begin
    //Start
    // Grant CesiumJS access to your ion assets
    //Входные данные токенов
    Cesium.Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJhMTUwNzAyMS1mMzMwLTQyYTUtOTZmOS00ZGM4YjY3MTIzNDYiLCJpZCI6NjQyMjUsImlhdCI6MTYyODk3NDA3OX0.Fl7fX1fyLVL864wneNG3dik4VhpESZ-AWWl8xXJAyK0";
    let cesiumTerrainProvider = Cesium.createWorldTerrainAsync();
    let ellipsoidProvider = await new Cesium.EllipsoidTerrainProvider();
    let clockViewModel = new Cesium.ClockViewModel();
    let openstreetmapimagery = await new Cesium.OpenStreetMapImageryProvider();
    // let terrainProviderArcGis = new Cesium.ArcGISTiledElevationTerrainProvider({
    //     url: 'https://elevation3d.arcgis.com/arcgis/rest/services/WorldElevation3D/Terrain3D/ImageServer',
    // });





    //  );


    //Опции сцены
    let OptionsTerrain = {
        timeline: false,
        animation: false,
        homeButton: false,
        terrainProvider: ellipsoidProvider,
        imageryProvider: openstreetmapimagery,

    };
    let viewer = new Cesium.Viewer("cesiumContainer", OptionsTerrain);
    viewer.scene.globe.depthTestAgainstTerrain = true;
    //Глобальные опции
    //viewer.animation.container.style.visibility= 'hidden';
    //viewer.timeline.container.style.visibility= 'hidden';
    //viewer.forceResize = 'none';



/*     //тулбар (управление легендой)
    let viewModel = {
        statshow: true,
        glotalshow: true,
        localshow: true,
        nanshow: true,
        homeshow: true,
    }; */
    async function abcd(viewer){
      const tiles = await new Cesium.Cesium3DTileset({
        url : 'http://localhost:18077/cesium_test/geodata/tileset_17768/tileset.json'
      })
      /* .then((tiles)=>{
        console.log(tiles)
        
      }) */
      viewer.scene.primitives.add(tiles);
    }
    abcd(viewer)
    //НУЖНЫЕ ФУНКЦИИ
    function createModel(url, position, orientation) {
        let entity = viewer.entities.add({
            name: url,
            position: position,
            orientation: orientation,
            model: {
                uri: url,
                //minimumPixelSize: 128,
                //maximumScale: 20000,
            },
        });
    }


    let lon = 37.62144589;
    let lat = 55.75252130;
    let h = 149.02;
    //console.log(h);
    let position_3d = Cesium.Cartesian3.fromDegrees(
        lon,
        lat,
        h
    );
    let hpr_d3 = new Cesium.HeadingPitchRoll(Cesium.Math.toRadians(-45), 0, 0);
    let orientation_d3 = Cesium.Transforms.headingPitchRollQuaternion(
        position_3d,
        hpr_d3
    );
    //createModel("./geodata/3dmodel/spasskaya_tower_of_moscow_kremlin_russia_2/scene.gltf", position_3d, orientation_d3);




    //Cesium.knockout.track(viewModel);
    //let toolbar = document.getElementById("toolbar");
    //Cesium.knockout.applyBindings(viewModel, toolbar);
    //for (let name in viewModel) {
    //    if (viewModel.hasOwnProperty(name)) {
    //        Cesium.knockout.getObservable(viewModel, name)
    //        //.subscribe(update);
    //    }
    //}

/*     async function addOSMBILD (){
        viewer.scene.primitives.add(
           await Cesium.createOsmBuildingsAsync()
            );
    }
    addOSMBILD() */
    //Настройки стартовой камеры

    viewer.camera.lookAt(
        Cesium.Cartesian3.fromDegrees( 37.632806, 55.735484, 0),
        new Cesium.HeadingPitchRange(
            //Cesium.Math.PI * 2,
            0,
            //(-Cesium.Math.PI) / 3, //(-Cesium.Math.PI)/4,
            (-Cesium.Math.PI),
            210000
            //10
        ));

    viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY);
    //console.log(Cesium.HomeButton);
    //console.log(viewer.Timeline.resize());
    const scene = viewer.scene
    const pixelSize = viewer.camera.frustum.getPixelDimensions(scene.drawingBufferWidth, scene.drawingBufferHeight, 1.0, scene.pixelRatio, new Cesium.Cartesian2());
    const pixelSize2 = viewer.camera.frustum.getPixelDimensions(scene.drawingBufferWidth, scene.drawingBufferHeight, viewer.camera.positionCartographic.height, scene.pixelRatio, new Cesium.Cartesian2());
    const pixelSize3 = viewer.camera.frustum.getPixelDimensions(scene.drawingBufferWidth, scene.drawingBufferHeight, 180000, scene.pixelRatio, new Cesium.Cartesian2());
    console.log(Cesium.Math.cosh(viewer.camera.positionCartographic.latitude))
    console.log(viewer.camera.positionCartographic.latitude)
    console.log(pixelSize)
    console.log(pixelSize2)
    console.log(pixelSize3)
    console.log((Cesium.Math.log2((Cesium.Math.PI*6378137*Cesium.Math.cosh(viewer.camera.positionCartographic.latitude)/pixelSize3.x))-8))
    console.log(pixelSize2.x/pixelSize.x)
    console.log(scene.drawingBufferWidth, scene.drawingBufferHeight, 1.0, scene.pixelRatio)
    console.log(viewer.camera)
    console.log(Cesium.Cartographic.fromCartesian(viewer.camera.position))
    for (let i = 0; i < viewer.dataSources.length; i++) {
        console.log(viewer.dataSources[i]);
    }


    /*
      Cesium.knockout
      .getObservable(viewModel, "glotalshow")
      .subscribe(function (show) {
        pointStyles.medium_vegetation.show = show;

        applyStyle(tileset, pointStyles);
      });
      */

    //END


    //доп
    /*
     handler.setInputAction(function (movement) {
          let cartesian = viewer.camera.pickEllipsoid(
            movement.endPosition,
            scene.globe.ellipsoid
          );
          if (cartesian) {
            let cartographic = Cesium.Cartographic.fromCartesian(cartesian);
            let longitudeString = Cesium.Math.toDegrees(
              cartographic.longitude
            ).toFixed(2);
            let latitudeString = Cesium.Math.toDegrees(
              cartographic.latitude
            ).toFixed(2);
            //let distanse = cartographic.height.toFixed(2);
            let distanse_lon = Cesium.Math.toDegrees(
              Cesium.Ellipsoid.WGS84.cartesianToCartographic(viewer.camera.getPickRay(movement.endPosition).origin).longitude
              ).toFixed(2);
            let distanse_lat =  Cesium.Math.toDegrees(
              Cesium.Ellipsoid.WGS84.cartesianToCartographic(viewer.camera.getPickRay(movement.endPosition).origin).latitude
              ).toFixed(2);
            let distanse_h = Cesium.Ellipsoid.WGS84.cartesianToCartographic(viewer.camera.getPickRay(movement.endPosition).origin).height.toFixed(2);
            
            console.log(distanse_lon+"m"+distanse_lat+"m"+ distanse_h);
            */
    //Sandcastle_End
    Sandcastle.finishedLoading();
}
if (typeof Cesium !== 'undefined') {
    window.startupCalled = true;
    startup(Cesium);
}