import {
	Entity,
	Vector
} from './og/src';

 const pointLayer = new Vector("points", {
	'relativeToGround': true,
	'visibility': true
});

let pathLonLat = [],
	pathColors = [];


const polylineEntity = new Entity({
	'polyline': {
		'pathLonLat': pathLonLat,
		'pathColors': pathColors,
		'thickness': 3.3,
		'isClosed': true
	}
});

pointLayer.addEntities([polylineEntity]);


export { pointLayer, pathLonLat, pathColors };
/*
function() {
     var lmap = nsGmx.leafletMap;
   var optionsMarker = {
		// clickable: false,
		title: '',
		draggable: true,
		icon: L.icon({ iconSize: [20, 20], iconAnchor: [10, 10], iconUrl: './img/stations/lorett.jpg' })
	};
    var optionsPoly = { fill: false, color: '#1470bb', weight: 3, opacity: 0.5 };

	[
		[55.634464,37.441234],
		[52.280551,104.28359],
		[59.556244,150.79833],
		[61.033541,76.099205]
	].forEach(function(point) {
		var polygon,
			latlngs = [],
			sq = 0;
			
		
		var dragMe = function(ev) {
			if (polygon) lmap.removeLayer(polygon);
			
			var latlng = ev.latlng || ev;
			latlngs = L.gmxUtil.getCircleLatLngs(latlng, 2500000);
			polygon = L.polygon(latlngs, optionsPoly).addTo(lmap);
		}
        L.marker(point, optionsMarker)
			.on('drag', dragMe)
			.bindPopup(function(e) {
				var sq = L.gmxUtil.getArea(polygon.getLatLngs()[0]);
				return 'area: ' + L.gmxUtil.prettifyArea(sq) + ' ';
			})
			.addTo(lmap);
		dragMe(point);
	});
return;
var l = nsGmx.gmxMap.layersByID['8EE2C7996800458AAF70BABB43321FA4'];
var l = nsGmx.gmxMap.layersByID['1E5E615E9F4C420FB3B3E23151A6CE29'];

if (l) {
//l._gmx.showScreenTiles = true;
window.lt = l;
}
return;
    var lmap = nsGmx.leafletMap,
        radiusMerc = 2600000,
        optionsMarker = {
            clickable: false,
            icon: L.icon({
                iconAnchor: [0, 21],
                iconUrl: 'http://images.kosmosnimki.ru/icons/alisa_15x21.png'
            })
        },
        options = {
            fill: false,
            color: '#ff0000',
            weight: 2,
            opacity: 0.25
        };
        
    [
        [48.479639, 135.06042],
        [55.634230, 37.441640],
        [52.289747, 104.29670],
        [59.554506, 150.81400]
    ].map(function(it) {
        L.marker(it, optionsMarker).addTo(lmap);
        var latlngs = L.gmxUtil.getCircleLatLngs(it, radiusMerc);
        L.polygon(latlngs, options).addTo(lmap);
    });
return;

    var lmap = nsGmx.leafletMap;
lmap.options.snaping= 50;
lmap.options.fadeAnimation = false;
var l = nsGmx.gmxMap.layersByID['8EE2C7996800458AAF70BABB43321FA4']
if (l) {
//l.bindHeatMap();
l.bindClusters();
}
return;

lmap .options.zoomAnimation = false;
lmap .removeLayer(lmap ._labelsLayer);
lmap .addLayer(lmap ._labelsLayer);

return;

}
*/