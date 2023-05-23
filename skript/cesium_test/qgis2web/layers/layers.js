var wms_layers = [];

var format_SanitaryProtectionZone_0 = new ol.format.GeoJSON();
var features_SanitaryProtectionZone_0 = format_SanitaryProtectionZone_0.readFeatures(json_SanitaryProtectionZone_0, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_SanitaryProtectionZone_0 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_SanitaryProtectionZone_0.addFeatures(features_SanitaryProtectionZone_0);
var lyr_SanitaryProtectionZone_0 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_SanitaryProtectionZone_0, 
                style: style_SanitaryProtectionZone_0,
                interactive: true,
    title: 'SanitaryProtectionZone<br />\
    <img src="styles/legend/SanitaryProtectionZone_0_0.png" /> 603010101<br />\
    <img src="styles/legend/SanitaryProtectionZone_0_1.png" /> <br />'
        });
var format_FunctionalZone_1 = new ol.format.GeoJSON();
var features_FunctionalZone_1 = format_FunctionalZone_1.readFeatures(json_FunctionalZone_1, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_FunctionalZone_1 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_FunctionalZone_1.addFeatures(features_FunctionalZone_1);
var lyr_FunctionalZone_1 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_FunctionalZone_1, 
                style: style_FunctionalZone_1,
                interactive: true,
    title: 'FunctionalZone<br />\
    <img src="styles/legend/FunctionalZone_1_0.png" /> Зона застройки индивидуальными жилыми домами<br />\
    <img src="styles/legend/FunctionalZone_1_1.png" /> Зона застройки малоэтажными жилыми домами (до 4 этажей, включая мансардный)<br />\
    <img src="styles/legend/FunctionalZone_1_2.png" /> Зона застройки среднеэтажными жилыми домами (от 5 до 8 этажей, включая мансардный)<br />\
    <img src="styles/legend/FunctionalZone_1_3.png" /> Зона застройки многоэтажными жилыми домами (9 этажей и более)<br />\
    <img src="styles/legend/FunctionalZone_1_4.png" /> Зона смешанной и общественно-деловой застройки<br />\
    <img src="styles/legend/FunctionalZone_1_5.png" /> Общественно-деловые зоны<br />\
    <img src="styles/legend/FunctionalZone_1_6.png" /> Многофункциональная общественно-деловая зона<br />\
    <img src="styles/legend/FunctionalZone_1_7.png" /> Зона специализированной общественной застройки<br />\
    <img src="styles/legend/FunctionalZone_1_8.png" /> Производственные зоны, зоны инженерной и транспортной инфраструктур<br />\
    <img src="styles/legend/FunctionalZone_1_9.png" /> Производственная зона<br />\
    <img src="styles/legend/FunctionalZone_1_10.png" /> Коммунально-складская зона<br />\
    <img src="styles/legend/FunctionalZone_1_11.png" /> Научно-производственная зона<br />\
    <img src="styles/legend/FunctionalZone_1_12.png" /> Зона инженерной инфраструктуры<br />\
    <img src="styles/legend/FunctionalZone_1_13.png" /> Зона транспортной инфраструктуры<br />\
    <img src="styles/legend/FunctionalZone_1_14.png" /> Зоны сельскохозяйственного использования<br />\
    <img src="styles/legend/FunctionalZone_1_15.png" /> Зона садоводческих, огороднических или дачных некоммерческих объединений граждан<br />\
    <img src="styles/legend/FunctionalZone_1_16.png" /> Производственная зона сельскохозяйственных предприятий<br />\
    <img src="styles/legend/FunctionalZone_1_17.png" /> Иные зоны сельскохозяйственного назначения<br />\
    <img src="styles/legend/FunctionalZone_1_18.png" /> Зоны рекреационного назначения<br />\
    <img src="styles/legend/FunctionalZone_1_19.png" /> Зона озелененных территорий общего пользования (лесопарки, парки, сады, скверы, бульвары, городские леса)<br />\
    <img src="styles/legend/FunctionalZone_1_20.png" /> Зона отдыха<br />\
    <img src="styles/legend/FunctionalZone_1_21.png" /> Курортная зона<br />\
    <img src="styles/legend/FunctionalZone_1_22.png" /> Зона лесов<br />\
    <img src="styles/legend/FunctionalZone_1_23.png" /> Иные рекреационные зоны<br />\
    <img src="styles/legend/FunctionalZone_1_24.png" /> Зоны специального назначения<br />\
    <img src="styles/legend/FunctionalZone_1_25.png" /> Зона кладбищ<br />\
    <img src="styles/legend/FunctionalZone_1_26.png" /> Зона складирования и захоронения отходов<br />\
    <img src="styles/legend/FunctionalZone_1_27.png" /> Зона озелененных территорий специального назначения<br />\
    <img src="styles/legend/FunctionalZone_1_28.png" /> Зона режимных территорий<br />\
    <img src="styles/legend/FunctionalZone_1_29.png" /> Зона акваторий<br />\
    <img src="styles/legend/FunctionalZone_1_30.png" /> Иные зоны<br />\
    <img src="styles/legend/FunctionalZone_1_31.png" /> <br />'
        });

lyr_SanitaryProtectionZone_0.setVisible(true);lyr_FunctionalZone_1.setVisible(true);
var layersList = [lyr_SanitaryProtectionZone_0,lyr_FunctionalZone_1];
lyr_SanitaryProtectionZone_0.set('fieldAliases', {'id': 'id', 'GLOBALID': 'GLOBALID', 'CLASSID': 'CLASSID', 'SZZ_TYPE': 'SZZ_TYPE', 'HZRD_CLASS': 'HZRD_CLASS', 'SPZ_EVENT': 'SPZ_EVENT', 'ZONE_DESC': 'ZONE_DESC', 'OBJECTNAME': 'OBJECTNAME', 'SOURCE': 'SOURCE', 'NOTE': 'NOTE', 'STATUS': 'STATUS', });
lyr_FunctionalZone_1.set('fieldAliases', {'id': 'id', 'fid': 'fid', 'cat': 'cat', 'GLOBALID': 'GLOBALID', 'CLASSID': 'CLASSID', 'FZ_MFSTP': 'FZ_MFSTP', 'FZ_ODSTP': 'FZ_ODSTP', 'FZ_INGSTP': 'FZ_INGSTP', 'FZ_TRSTP': 'FZ_TRSTP', 'FZ_SHSTP': 'FZ_SHSTP', 'FZ_RECSTP': 'FZ_RECSTP', 'FZ_ORECSTP': 'FZ_ORECSTP', 'AREA': 'AREA', 'INFO_OBJ': 'INFO_OBJ', 'CONSTR_DEN': 'CONSTR_DEN', 'BLD_HEIGHT': 'BLD_HEIGHT', 'POP_DEN': 'POP_DEN', 'POPULATION': 'POPULATION', 'HZRD_CLASS': 'HZRD_CLASS', 'OTHER': 'OTHER', 'EVENT_TIME': 'EVENT_TIME', 'STATUS': 'STATUS', 'REG_STATUS': 'REG_STATUS', });
lyr_SanitaryProtectionZone_0.set('fieldImages', {'id': '', 'GLOBALID': '', 'CLASSID': '', 'SZZ_TYPE': '', 'HZRD_CLASS': '', 'SPZ_EVENT': '', 'ZONE_DESC': '', 'OBJECTNAME': '', 'SOURCE': '', 'NOTE': '', 'STATUS': '', });
lyr_FunctionalZone_1.set('fieldImages', {'id': 'TextEdit', 'fid': 'TextEdit', 'cat': 'TextEdit', 'GLOBALID': 'TextEdit', 'CLASSID': 'ValueMap', 'FZ_MFSTP': 'ValueMap', 'FZ_ODSTP': 'ValueMap', 'FZ_INGSTP': 'ValueMap', 'FZ_TRSTP': 'ValueMap', 'FZ_SHSTP': 'ValueMap', 'FZ_RECSTP': 'ValueMap', 'FZ_ORECSTP': 'ValueMap', 'AREA': 'TextEdit', 'INFO_OBJ': 'TextEdit', 'CONSTR_DEN': 'TextEdit', 'BLD_HEIGHT': 'Range', 'POP_DEN': 'TextEdit', 'POPULATION': 'Range', 'HZRD_CLASS': 'Range', 'OTHER': 'TextEdit', 'EVENT_TIME': 'Range', 'STATUS': 'ValueMap', 'REG_STATUS': 'ValueMap', });
lyr_SanitaryProtectionZone_0.set('fieldLabels', {'id': 'no label', 'GLOBALID': 'no label', 'CLASSID': 'no label', 'SZZ_TYPE': 'no label', 'HZRD_CLASS': 'no label', 'SPZ_EVENT': 'no label', 'ZONE_DESC': 'no label', 'OBJECTNAME': 'no label', 'SOURCE': 'no label', 'NOTE': 'no label', 'STATUS': 'no label', });
lyr_FunctionalZone_1.set('fieldLabels', {'id': 'no label', 'fid': 'no label', 'cat': 'no label', 'GLOBALID': 'no label', 'CLASSID': 'no label', 'FZ_MFSTP': 'no label', 'FZ_ODSTP': 'no label', 'FZ_INGSTP': 'no label', 'FZ_TRSTP': 'no label', 'FZ_SHSTP': 'no label', 'FZ_RECSTP': 'no label', 'FZ_ORECSTP': 'no label', 'AREA': 'no label', 'INFO_OBJ': 'no label', 'CONSTR_DEN': 'no label', 'BLD_HEIGHT': 'no label', 'POP_DEN': 'no label', 'POPULATION': 'no label', 'HZRD_CLASS': 'no label', 'OTHER': 'no label', 'EVENT_TIME': 'no label', 'STATUS': 'no label', 'REG_STATUS': 'no label', });
lyr_FunctionalZone_1.on('precompose', function(evt) {
    evt.context.globalCompositeOperation = 'normal';
});