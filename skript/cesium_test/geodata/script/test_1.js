function startup(Cesium) {
    'use strict';
//Sandcastle_Begin
//Start
// Grant CesiumJS access to your ion assets
        //Входные данные токенов
		Cesium.Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJhMTUwNzAyMS1mMzMwLTQyYTUtOTZmOS00ZGM4YjY3MTIzNDYiLCJpZCI6NjQyMjUsImlhdCI6MTYyODk3NDA3OX0.Fl7fX1fyLVL864wneNG3dik4VhpESZ-AWWl8xXJAyK0";
		var cesiumTerrainProvider = Cesium.createWorldTerrain();
        var ellipsoidProvider = new Cesium.EllipsoidTerrainProvider();
        var clockViewModel = new Cesium.ClockViewModel();

          
        //Опции сцены
        var OptionsTerrain={
          timeline: false,
          animation: false,
          terrainProvider: cesiumTerrainProvider,
        
        };
		var viewer = new Cesium.Viewer("cesiumContainer",  OptionsTerrain);
        //Глобальные опции
        //viewer.animation.container.style.visibility= 'hidden';
        //viewer.timeline.container.style.visibility= 'hidden';
        //viewer.forceResize = 'none';
          
       // /*
        //Точки проектов
        console.log('Начало_1');
        var promiseTestPoint_p=Cesium.GeoJsonDataSource.load(
          "../../geodata/geojson/test_point_4326.geojson")
           
   //     .then(function (dataSource) {
	//		return viewer.dataSources.add(dataSource);
     //     })
       .then(function (dataSource) {
			viewer.dataSources.add(dataSource);
             
         var entities = dataSource.entities.values;
         
             for (var i = 0; i < entities.length; i++) {
              var entity = entities[i];
               entity.billboard={
                image: "../../geodata/lebels/1320866-ffffff.svg",
                scale: 0.05,
                color: Cesium.Color.fromRandom({red:1, green:0.5,alpha: 1,}),
                heightReference:Cesium.HeightReference.RELATIVE_TO_GROUND,
                scaleByDistance: new Cesium.NearFarScalar(1500, 0.5, 7000000, 1),
                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                };
                //console.log(Cesium.Ellipsoid.WGS84.cartesianToCartographic(entity.point));
   //           entity.markerColor=Cesium.Color.ANTIQUEWHITE;
   //           entity.point.outlineWidth=4;
   //           entity.point.pixelSize=20;
   //           entity.point.heightReference=Cesium.HeightReference.RELATIVE_TO_GROUND;
   //           entity.point.extrudedHeight = 10000;
            }
         })
         .otherwise(function (error) {
			console.log(error);
         });

        console.log('Начало_2');
//*/   
        //3D-mode, УЮН

function createModel(url, position, orientation) {
 // viewer.entities.removeAll();

 // var position = Cesium.Cartesian3.fromDegrees(
 //   -123.0744619,
 //   44.0503706,
 //   height
 // );
 // var heading = Cesium.Math.toRadians(135);
 // var pitch = 0;
 // var roll = 0;
 // var hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll);
 // var orientation = Cesium.Transforms.headingPitchRollQuaternion(
 //   position,
 //   hpr
 // );

  var entity = viewer.entities.add({
    name: url,
    position: position,
    orientation: orientation,
    model: {
      uri: url,
      minimumPixelSize: 128,
      maximumScale: 20000,
    },
  });
}





 //        function createModel(url, position) {
 //           viewer.entities.add({
 //             name: url,
 //             position: position,
 //             model: {
 //               uri: url,
 //               minimumPixelSize: 128,
 //               maximumScale: 20000,
 //             },
 //           });
 //         }
          var promise_0 = Cesium.GeoJsonDataSource.load(
            "../../geodata/geojson/3d_model.geojson"
          );
          promise_0
            .then(function (dataSource) {
              //viewer.dataSources.add(dataSource);
        
              //Get the array of entities
              var entities = dataSource.entities.values;
        
              for (var i = 0; i < entities.length; i++) {
                //For each entity, create a random color based on the state name.
                //Some states have multiple entities, so we store the color in a
                //hash so that we use the same color for the entire state.
                var entity = entities[i];
                //var name = entity.properties.fid;
                var position_3d = entity.position.getValue(Cesium.JulianDate.now());
                var hpr_d3 = new Cesium.HeadingPitchRoll(Cesium.Math.toRadians(0),0, 0);
                var orientation_d3 = Cesium.Transforms.headingPitchRollQuaternion(
                  position_3d,
                  hpr_d3
                 );
                console.log(entity.properties.model);
                createModel(entity.properties.model,position_3d,orientation_d3);
           //     var entity_3d2 = viewer.entities.add({
           //       name:entity.properties.model,
           //       position: position_3d,
           //       model:{
           //         uri:entity.properties.model,
           //               minimumPixelSize: 128,
           //               maximumScale: 20000,
           //       },
           //     //  
           //     });
              }
            })
            .otherwise(function (error) {
              //Display any errrors encountered while loading.
              window.alert(error);
            });

//3D-mode, Moscow
          var lon=37.617780;
          var lat=55.751670;
          var h=149.02+20;
          console.log(h);
          var position_3d = Cesium.Cartesian3.fromDegrees(
            lon,
            lat,
              h,
          );
          console.log(Cesium.Ellipsoid.WGS84.cartesianToCartographic(position_3d));
          var hpr_d3 = new Cesium.HeadingPitchRoll(Cesium.Math.toRadians(0),0, 0);
          var orientation_d3 = Cesium.Transforms.headingPitchRollQuaternion(
            position_3d,
            hpr_d3
          );
          createModel("../../geodata/3dmodel/hans_christian_andersen/scene.gltf",position_3d,orientation_d3);
    //      var entity_3d = viewer.entities.add({
    //        name: "../../geodata/3dmodel/hans_christian_andersen/scene.gltf",
    //        position: position_3d,
    //        //heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND,
    //        //verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
    //        orientation: orientation_d3,
    //        model: {
    //          uri: "../../geodata/3dmodel/hans_christian_andersen/scene.gltf",
    //          //minimumPixelSize: 128,
    //          //maximumScale: 1,
    //          //heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND,
    //        },
    //        
    //      });
            //console.log(Cesium.Ellipsoid.WGS84.cartographicToCartesian(entity_3d.position));
          //console.log(Cesium.Ellipsoid.WGS84.cartesianToCartographic(entity_3d.name));
           // console.log(Cesium.Ellipsoid.WGS84.cartesianToCartographic(entity_3d.position));
          
        
        
        
/*
        //Линии субъектов
        var promiseShtat_L = Cesium.GeoJsonDataSource.load(
          "../../geodata/geojson/Субъекты РФ_line.geojson"
          )
        .then(function (dataSource) {
			return viewer.dataSources.add(dataSource);
        })
         .then(function (dataSource) {
			viewer.dataSources.add(dataSource); 
           var entities = dataSource.entities.values;
            for (var i = 0; i < entities.length; i++) {
              var entity = entities[i];
              
              entity.polyline.material = Cesium.Color.RED;
              entity.polyline.width = 3;
              entity.polyline.clampToGround=true;
            }
         })
        .otherwise(function (error) {
			console.log(error);
         });
         
 */        
        //Полигоны Субъектов
        console.log('Начало_3');
		var promiseShtat_G = Cesium.GeoJsonDataSource.load(
			"../../geodata/geojson/Субъекты РФ.geojson"
			)
        .then(function (dataSource) {
			return viewer.dataSources.add(dataSource);
          })
        .then(function (dataSource) {
			viewer.dataSources.add(dataSource);
            var entities = dataSource.entities.values;
            for (var i = 0; i < entities.length; i++) {
              var entity = entities[i];
              
              entity.polygon.material = Cesium.Color.fromBytes(255,0,0,25);
              entity.polygon.outlineColor = Cesium.Color.fromBytes(255,0,0,255);
              entity.polygon.height=10000;
               // entity.polygon.heightReference=Cesium.HeightReference.CLAMP_TO_GROUND;
              entity.polygon.extrudedHeight = 10000;
				//entity.polygon.extrudedHeightReference=Cesium.HeightReference.CLAMP_TO_GROUND;
               
              //entity.polyline.material=Cesium.Color.fromBytes(0,0,0,10);
             // entity.polyline.width = 10;
             // entity.polyline.zIndex =10000;
             
              
              }
         
        
        })
         .otherwise(function (error) {
			console.log(error);
		});
        //Здания УЮН
		//var promise = Cesium.IonResource.fromAssetId(588507)
		var promise = Cesium.GeoJsonDataSource.load(
			"../../geodata/geojson/Здания проектируемые.geojson"
			)
		.then(function (dataSource) {
			return viewer.dataSources.add(dataSource);
		})
		.then(function (dataSource) {
			viewer.dataSources.add(dataSource);
			
				//Get the array of entities
			var entities = dataSource.entities.values;
			var colorHash = {};
			for (var i = 0; i < entities.length; i++) {
				//For each entity, create a random color based on the state name.
				//Some states have multiple entities, so we store the color in a
				//hash so that we use the same color for the entire state.
				var entity = entities[i];
				var name = entity.id;
				var color = colorHash[name];
				if (!color) {
				color = Cesium.Color.fromRandom({
					alpha: 1.0,
				});
				colorHash[name] = color;
				//console.log([colorHash[name],]);
				}
				entity.polygon.material = color;
				entity.polygon.outline = false;
		
				entity.polygon.height=-10;
				entity.polygon.heightReference=Cesium.HeightReference.RELATIVE_TO_GROUND;
				entity.polygon.extrudedHeight = entity.properties.H+3;
				entity.polygon.extrudedHeightReference=Cesium.HeightReference.RELATIVE_TO_GROUND;
				
			}
			
		})
		.otherwise(function (error) {
			console.log(error);
		});
		Sandcastle.reset = function () {
		viewer.dataSources.removeAll();
		
		//Настройки стартовой камеры
		viewer.camera.lookAt(
			Cesium.Cartesian3.fromDegrees(95,65, 150000),
			new Cesium.HeadingPitchRange(
			Cesium.Math.PI*2,
			(-Cesium.Math.PI)/4,
			7000000
			)
		);
		viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY);
		};
        //console.log(viewer.Timeline.resize());
        for (var i = 0; i < viewer.length; i++){
          console.log(viewer[i]);
        }
//END


//доп
/*
 handler.setInputAction(function (movement) {
      var cartesian = viewer.camera.pickEllipsoid(
        movement.endPosition,
        scene.globe.ellipsoid
      );
      if (cartesian) {
        var cartographic = Cesium.Cartographic.fromCartesian(cartesian);
        var longitudeString = Cesium.Math.toDegrees(
          cartographic.longitude
        ).toFixed(2);
        var latitudeString = Cesium.Math.toDegrees(
          cartographic.latitude
        ).toFixed(2);
        //var distanse = cartographic.height.toFixed(2);
        var distanse_lon = Cesium.Math.toDegrees(
          Cesium.Ellipsoid.WGS84.cartesianToCartographic(viewer.camera.getPickRay(movement.endPosition).origin).longitude
          ).toFixed(2);
        var distanse_lat =  Cesium.Math.toDegrees(
          Cesium.Ellipsoid.WGS84.cartesianToCartographic(viewer.camera.getPickRay(movement.endPosition).origin).latitude
          ).toFixed(2);
        var distanse_h = Cesium.Ellipsoid.WGS84.cartesianToCartographic(viewer.camera.getPickRay(movement.endPosition).origin).height.toFixed(2);
        
        console.log(distanse_lon+"m"+distanse_lat+"m"+ distanse_h);
        */
//Sandcastle_End
    Sandcastle.finishedLoading();
}
if (typeof Cesium !== 'undefined') {
    window.startupCalled = true;
    startup(Cesium);
}