var data = sessionStorage.getItem('key');
console.log(data);



function startup(Cesium) {
    'use strict';
    //Sandcastle_Begin
    //Start
    // Grant CesiumJS access to your ion assets
    //Входные данные токенов
    Cesium.Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJhMTUwNzAyMS1mMzMwLTQyYTUtOTZmOS00ZGM4YjY3MTIzNDYiLCJpZCI6NjQyMjUsImlhdCI6MTYyODk3NDA3OX0.Fl7fX1fyLVL864wneNG3dik4VhpESZ-AWWl8xXJAyK0";
    const cesiumTerrainProvider = Cesium.createWorldTerrain();
    const ellipsoidProvider = new Cesium.EllipsoidTerrainProvider();
    const clockViewModel = new Cesium.ClockViewModel();
    const openstreetmapimagery = new Cesium.OpenStreetMapImageryProvider();
    const terrainProviderArcGis = new Cesium.ArcGISTiledElevationTerrainProvider({
        url: 'https://elevation3d.arcgis.com/arcgis/rest/services/WorldElevation3D/Terrain3D/ImageServer',
    });





    //  );


    //Опции сцены
    let OptionsTerrain = {
        timeline: false,
        animation: false,
        homeButton: false,
        terrainProvider: ellipsoidProvider,
        imageryProvider: openstreetmapimagery,

    };
    var viewer = new Cesium.Viewer("cesiumContainer", OptionsTerrain);
    viewer.scene.globe.depthTestAgainstTerrain = true;
    //Глобальные опции
    //viewer.animation.container.style.visibility= 'hidden';
    //viewer.timeline.container.style.visibility= 'hidden';
    //viewer.forceResize = 'none';



    //тулбар (управление легендой)
    var viewModel = {
        statshow: true,
        glotalshow: true,
        localshow: true,
        nanshow: true,
        homeshow: true,
    };






    //Точки проектов
    console.log(['Начало_1', viewModel.statshow]);
    var promiseTestPoint_p = Cesium.GeoJsonDataSource.load(
        "/Apps/geodata/geojson/test_point_4326.geojson")

    .then(function(dataSource) {
            viewer.dataSources.add(dataSource);
            var entities = dataSource.entities.values;
            for (var i = 0; i < entities.length; i++) {
                var entity = entities[i];
                //console.log([entity.show,viewModel.statshow]);
                //entity.show = viewModel.statshow;
                //console.log([entity.show,viewModel.statshow]);
                entity.billboard = {
                    //show: viewModel.statshow,
                    show: true,
                    scale: 0.05,
                    color: Cesium.Color.fromRandom({ red: 0.8, green: 0.5, alpha: 1, }),
                    heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND,
                    scaleByDistance: new Cesium.NearFarScalar(1500, 0.5, 7000000, 1),
                    verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                };

                if (entity.properties.type == 'Global') {
                    entity.billboard = {
                        image: "/Apps/geodata/lebels/Berisamokat-3_transp.svg",
                        //image: "/Apps/geodata/lebels/1320866-ffffff.svg",
                        scale: 0.25,
                        //color: Cesium.Color.fromRandom({blue:0.8, green:0.5,alpha: 1,}),
                        heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND,
                        scaleByDistance: new Cesium.NearFarScalar(1500, 0.5, 7000000, 0.5),
                        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                    };
                } else if (entity.properties.type == 'Local') {
                    //entity.billboard.image= "/Apps/geodata/lebels/1001598-ffffff.svg";
                    entity.billboard = {
                        image: "/Apps/geodata/lebels/cityscape-city-svgrepo-com.svg",
                        //image: "/Apps/geodata/lebels/1001598-ffffff.svg",
                        scale: 0.5,
                        //color: Cesium.Color.fromRandom({blue:0.8, green:0.5,alpha: 1,}),
                        heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND,
                        scaleByDistance: new Cesium.NearFarScalar(1500, 1, 7000000, 0.5),
                        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                    };
                } else {
                    entity.billboard = {
                        image: "/Apps/geodata/lebels/home-svgrepo-com (1).svg",
                        //image: "/Apps/geodata/lebels/37296-ffffff.svg",
                        scale: 0.5,
                        //color: Cesium.Color.fromRandom({blue:0.8, green:0.5,alpha: 1,}),
                        heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND,
                        scaleByDistance: new Cesium.NearFarScalar(1500, 0.5, 7000000, 0.5),
                        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                    };

                }
                //console.log(Cesium.Ellipsoid.WGS84.cartesianToCartographic(entity.point));
                //           entity.markerColor=Cesium.Color.ANTIQUEWHITE;
                //           entity.point.outlineWidth=4;
                //           entity.point.pixelSize=20;
                //           entity.point.heightReference=Cesium.HeightReference.RELATIVE_TO_GROUND;
                //           entity.point.extrudedHeight = 10000;
            }

        })
        .otherwise(function(error) {
            console.log(error);
        });

    console.log('Начало_2');







    //Линии субъектов
    var promiseShtat_L = Cesium.GeoJsonDataSource.load(
            "/Apps/geodata/geojson/Субъекты РФ_line.geojson"
        )
        .then(function(dataSource) {
            return viewer.dataSources.add(dataSource);
        })
        .then(function(dataSource) {
            viewer.dataSources.add(dataSource);
            var entities = dataSource.entities.values;
            for (var i = 0; i < entities.length; i++) {
                var entity = entities[i];
                //entity.polyline.show = viewModel.statshow
                entity.polyline.material = Cesium.Color.RED;
                entity.polyline.width = 0.5;
                //entity.polyline.height = 2; 




            }
            //entity.polyline.clampToGround = true;
        })
        .otherwise(function(error) {
            console.log(error);
        });


    /*
        //Полигоны Субъектов
        console.log('Начало_3');
   // Sandcastle.addToggleButton("Субъекты РФ", true, function (
   //   checked
   // ){if (checked==true){
       
      var promiseShtat_G = Cesium.GeoJsonDataSource.load(
		        	"/Apps/geodata/geojson/Субъекты РФ.geojson"
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
                      //entity.label.show=true;
                      //entity.label.text=entity.properties.name;
                      //entity.label.font='30px sans-serif';
                      //console.log(entity)
		        		      //entity.polygon.extrudedHeightReference=Cesium.HeightReference.CLAMP_TO_GROUND;

                      //entity.polyline.material=Cesium.Color.fromBytes(0,0,0,10);
                      // entity.polyline.width = 10;
                      // entity.polyline.zIndex =10000;
                      //console.log(entity.show)
                      //entity.show=checked_01();
                      }
                      console.log(entity.show);
                     // Sandcastle.addToggleButton("Субъекты РФ", true, function (
                     //   checked
                     // ){for (var i = 0; i < entities.length; i++) {
                     //   var entity = entities[i];
                     //   if (!checked){
                     //     entity.show=false
                     // }
                     // }})
                    
                })
                 .otherwise(function (error) {
		        	console.log(error);
		        });
          
        */
    //   }});
    //Здания УЮН
    //var promise = Cesium.IonResource.fromAssetId(588507)
    var promise = Cesium.GeoJsonDataSource.load(
            "/Apps/geodata/geojson/Здания проектируемые.geojson"
        )
        .then(function(dataSource) {
            return viewer.dataSources.add(dataSource);
        })
        .then(function(dataSource) {
            viewer.dataSources.add(dataSource);
            var colorHash = {};
            //Get the array of entities
            var entities = dataSource.entities.values;
            for (var i = 0; i < entities.length; i++) {
                var entity = entities[i];
                var name = entity.id;
                var color = colorHash[name];
                //if (!color) {
                //  const color = Cesium.Color.fromBytes{
                //    red: 200,
                //    green: (entity.properties.lvl._value/10)*255,
                //    blue: 255,
                //    alpha: 255
                //  };
                //  console.log(color);  
                if (!color) {
                    if (entity.properties.bild_type._value == 'Жилые') {
                        entity.polygon.material = Cesium.Color.fromBytes(
                            200,
                            //green: (entity.properties.lvl._value/10)*255,
                            ((entity.properties.lvl._value / 4) * 255),
                            255,
                            255
                        );
                        colorHash[name] = color;
                        //console.log([colorHash[name],]);
                    } else {
                        entity.polygon.material = Cesium.Color.fromBytes(
                            100,
                            ((entity.properties.lvl._value / 4) * 255),
                            255,
                            255

                        );
                        colorHash[name] = color;
                    }
                }
                //console.log([colorHash[name],]);
                //}



                //	entity.polygon.material = color;
                entity.polygon.outline = false;

                entity.polygon.height = -10;
                entity.polygon.heightReference = Cesium.HeightReference.RELATIVE_TO_GROUND;
                entity.polygon.extrudedHeight = entity.properties.H + 3;
                entity.polygon.extrudedHeightReference = Cesium.HeightReference.RELATIVE_TO_GROUND;

            }

        })
        .otherwise(function(error) {
            console.log(error);
        });

    //здания Кроншад
    var promise_2 = Cesium.GeoJsonDataSource.load(
            "/Apps/geodata/geojson/Kronstad.geojson"
        )
        .then(function(dataSource) {
            return viewer.dataSources.add(dataSource);
        })
        .then(function(dataSource) {
            viewer.dataSources.add(dataSource);
            var colorHash = {};
            //Get the array of entities
            var entities = dataSource.entities.values;
            for (var i = 0; i < entities.length; i++) {
                var entity = entities[i];
                var name = entity.id;
                var color = colorHash[name];
                //if (!color) {
                //  const color = Cesium.Color.fromBytes{
                //    red: 200,
                //    green: (entity.properties.lvl._value/10)*255,
                //    blue: 255,
                //    alpha: 255
                //  };
                //  console.log(color);  
                if (!color) {
                    if ((entity.properties.type._value == 'Жилые' || entity.properties.type._value == 'Жилой')) {
                        entity.polygon.material = Cesium.Color.fromBytes(
                            255,
                            //green: (entity.properties.lvl._value/10)*255,
                            ((entity.properties.floor_num._value / 4) * 255),
                            255,
                            255
                        );
                        colorHash[name] = color;
                        console.log([colorHash[name], ]);
                    } else {
                        entity.polygon.material = Cesium.Color.fromBytes(
                            100,
                            ((entity.properties.floor_num._value / 4) * 255),
                            255,
                            255

                        );
                        colorHash[name] = color;
                    }
                }
                console.log([colorHash[name], entity.properties.floor_num._value]);
                //}



                //	entity.polygon.material = color;
                entity.polygon.outline = false;

                entity.polygon.height = entity.properties.h_min._value;
                entity.polygon.heightReference = Cesium.HeightReference.RELATIVE_TO_GROUND;
                entity.polygon.extrudedHeight = entity.properties.h_max._value;
                entity.polygon.extrudedHeightReference = Cesium.HeightReference.RELATIVE_TO_GROUND;
                //	console.log(entity.properties);
            }

        })
        .otherwise(function(error) {
            console.log(error);
        });

    //3D-mode, УЮН

    function createModel(url, position, orientation) {
        var entity = viewer.entities.add({
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

    var promise_0 = Cesium.GeoJsonDataSource.load(
            "/Apps/geodata/geojson/3d_model.geojson"
        )
        .then(function(dataSource) {
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
                var hpr_d3 = new Cesium.HeadingPitchRoll(Cesium.Math.toRadians(0), 0, 0);
                var orientation_d3 = Cesium.Transforms.headingPitchRollQuaternion(
                    position_3d,
                    hpr_d3
                );
                createModel(entity.properties.model, position_3d, orientation_d3);
            }
        })
        .otherwise(function(error) {
            //Display any errrors encountered while loading.
            window.alert(error);
        });
    //3D-mode экста тест на большой объем данных
    var promise_10 = Cesium.GeoJsonDataSource.load(
            "/Apps/geodata/geojson/3d_model_extra_test_100.geojson"
        )
        .then(function(dataSource) {
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
                var hpr_d3 = new Cesium.HeadingPitchRoll(Cesium.Math.toRadians(0), 0, 0);
                var orientation_d3 = Cesium.Transforms.headingPitchRollQuaternion(
                    position_3d,
                    hpr_d3
                );
                createModel(entity.properties.model, position_3d, orientation_d3);
            }
        })
        .otherwise(function(error) {
            //Display any errrors encountered while loading.
            window.alert(error);
        });


    //3D-mode, Moscow
    var lon = 37.62144589;
    var lat = 55.75252130;
    var h = 149.02;
    console.log(h);
    var position_3d = Cesium.Cartesian3.fromDegrees(
        lon,
        lat,
        h
    );
    var hpr_d3 = new Cesium.HeadingPitchRoll(Cesium.Math.toRadians(-45), 0, 0);
    var orientation_d3 = Cesium.Transforms.headingPitchRollQuaternion(
        position_3d,
        hpr_d3
    );
    createModel("/Apps/geodata/3dmodel/spasskaya_tower_of_moscow_kremlin_russia_2/scene.gltf", position_3d, orientation_d3);




    var a = viewer;
    console.log(a);
    console.log(a.length);
    for (var i = 0; i < a.length; i++) {
        console.log(a[i]);
    }

    Cesium.knockout.track(viewModel);
    var toolbar = document.getElementById("toolbar");
    Cesium.knockout.applyBindings(viewModel, toolbar);
    for (var name in viewModel) {
        if (viewModel.hasOwnProperty(name)) {
            Cesium.knockout.getObservable(viewModel, name).subscribe(update);
        }
    }

    function update() {
        //entity.polyline.show = viewModel.statshow
        //entity.polyline.clampToGround=true;
        promiseTestPoint_p
            .then(function(dataSource) {
                viewer.dataSources.add(dataSource);
                dataSource.entities.values.show = viewModel.statshow$;
                var entities = dataSource.entities.values;

                for (var i = 0; i < entities.length; i++) {
                    var entity = entities[i];
                    entity.show = viewModel.statshow;
                    console.log([entity.show, viewModel.statshow]);
                }
            });
    }


    update();


    //Настройки стартовой камеры  29.738563816944616

    viewer.camera.lookAt(
        Cesium.Cartesian3.fromDegrees(29.738563816944616, 59.99546054665832, 0 /* 150000 */ ),
        new Cesium.HeadingPitchRange(
            Cesium.Math.PI * 2,
            (-Cesium.Math.PI) / 3, //(-Cesium.Math.PI)/4,
            7000
        ));

    viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY);
    //console.log(Cesium.HomeButton);
    //console.log(viewer.Timeline.resize());
    for (var i = 0; i < viewer.dataSources.length; i++) {
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