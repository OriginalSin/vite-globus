import './lib/og/og.css'
import {XYZ, Globe, GlobusTerrain, control,
	math,
	Entity,
	Vector,

	LonLat,
            Extent
} from './lib/og/src';
import {EmptyTerrain} from './lib/og/src/terrain/EmptyTerrain';

import {tg} from './lib/og/sandbox/epsg4326/epsg4326.js';
import {countries} from './lib/og/sandbox/vectorLayer/vectorLayer.js';
// import {pointLayer, pathLonLat, pathColors} from './lib/oper.js';
// console.log('ggggggggg', XYZ);

const osm = new XYZ("OpenStreetMap", {
	isBaseLayer: true,
	// url: "//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
	url: "//{s}tilecart.kosmosnimki.ru/kosmo/{z}/{x}/{y}.png",
	visibility: true,
});
// const carte = new XYZ("Coastline", {
	// isBaseLayer: false,
	// visibility: true,
	// url: "https://geo.vliz.be/geoserver/gwc/service/wmts/rest/MarineRegions:world_countries_coasts/Line_green/EPSG:4326/EPSG:4326:{z}/{y}/{x}?format=image/png"
// });
    const marble = new XYZ("Blue Marble", {
        isBaseLayer: true,
        visibility: true,
        url: "https://soggy2.zoology.ubc.ca/geoserver/gn/gwc/service/wmts/rest/world/raster/EPSG:4326/EPSG:4326:{z}/{y}/{x}?format=image/png"
    });
 const pointLayer = new Vector("points", {
	'relativeToGround': true,
	'visibility': true
});

const globus = new Globe({
	target: "globus", // a HTMLDivElement which its id is
	name: "Earth",
    // quadTreeStrategyPrototype: quadTreeStrategyType.epsg4326,
    terrain: new EmptyTerrain(),
	// terrain: new GlobusTerrain(),
	// layers: [osm],
	// layers: [osm, marble, tg, countries],
	// layers: [osm, tg, pointLayer],
	layers: [osm, pointLayer],
	autoActivate: true,
	fontsSrc: "../res/fonts",  // Fonts folder
	resourcesSrc: "../res",    // Night and water mask terxtures folder
	// viewExtent: [5.56707, 45.15679, 5.88834, 45.22260]
	viewExtent: [ -180, -90, 180, 90.0]
});
window.globus1 = globus;

let planet = globus.planet;
        // let layerSwitcher = new control.LayerSwitcher({
            // switcherDependent: true
        // });

        // globus.planet.addControl(layerSwitcher);
		// layerSwitcher.dialog.show();
		// layerSwitcher.addNewLayer(marble);
		// layerSwitcher.addNewLayer(tg);
		// console.log('layerSwitcher', layerSwitcher);

// globus.planet.addControl(new control.ToggleWireframe());		// ?
planet.addControl(new control.KeyboardNavigation());		// Клавиатура
// let layerSwitcher = new control.LayerSwitcher();			// ?
// globus.planet.addControl(layerSwitcher);
// globus.planet.layers[1].setVisibility(false);
// planet.layers[1].setVisibility(true);

let radiusMerc = 2600000;
let ell = planet.ellipsoid;
let points = [
	[55.634464,37.441234],
	[52.280551,104.28359],
	[59.556244,150.79833],
	[61.033541,76.099205]
];
        function createCircle(ellipsoid, center, radius = 300) {
            let circleCoords = [];
            for (let i = 0; i < 360; i += 4) {
                circleCoords.push(ellipsoid.getGreatCircleDestination(center, i, radius));
            }
            return circleCoords;
        };

        function createCircles(outPathLonLat, outPathColors, num = 4) {
            // let ell = globe.planet.ellipsoid;
            for (let i = 0; i < num; i++) {
				let p = points[i].reverse();
                let center = new LonLat(p[0], p[1]);
                // let center = new LonLat(math.random(8.08, 8.31), math.random(46.7, 46.8));
                let circle = createCircle(ell, center, radiusMerc);
                // let circle = createCircle(ell, center, math.random(100, 1000));
                outPathLonLat.push(circle);

                // let color = [math.random(), math.random(), math.random()];
                let color = [0, 0, 1];
// console.log('ggggggggg', math.random(100, 1000));
                outPathColors.push([color]);
            }
        }

        let pathLonLat = [],
            pathColors = [];

        createCircles(pathLonLat, pathColors);

        const polylineEntity = new Entity({
            'polyline': {
                'pathLonLat': pathLonLat,
                'pathColors': pathColors,
                'thickness': 13.3,
                'isClosed': true
            }
        });

        pointLayer.addEntities([polylineEntity]);
	// [37.441234, 55.634464],
planet.viewLonLat(new LonLat(86.71, 74.02));
        // globus.planet.viewExtentArr([37.441234, 55.634464, 150.79833, 61.033541]);

/*
	[59.556244,150.79833],
	[61.033541,76.099205]
let pathLonLat = [],
	pathColors = [];



function createCircle(ellipsoid, center, radius = 300) {
	let circleCoords = [];
	for (let i = 0; i < 360; i += 5) {
		circleCoords.push(ellipsoid.getGreatCircleDestination(center, i, radius));
	}
	return circleCoords;
};
// let radiusMerc = 2600000;
let radiusMerc = 260;

[
	[55.634464,37.441234],
	[52.280551,104.28359],
	[59.556244,150.79833],
	[61.033541,76.099205]
].forEach(p => {
	// let center = new LonLat(p[1], p[0]);
                let center = new LonLat(math.random(p[1], p[1] + 1), math.random(p[0], p[0] + 1));
	let circle = createCircle(ell, center, radiusMerc);
	pathLonLat.push(circle);
                let color = [math.random(), math.random(), math.random()];
		// let color = [0, 0, 255];
		pathColors.push([color]);
// import {pointLayer, pathLonLat, pathColors} from './lib/oper.js';

});

const polylineEntity = new Entity({
	'polyline': {
		'pathLonLat': pathLonLat,
		'pathColors': pathColors,
		'thickness': 3.3,
		'isClosed': true
	}
});

pointLayer.addEntities([polylineEntity]);

planet.viewExtentArr([37.441234, 52.280551, 104.28359, 61.033541]);
*/

            // let destPos = new LonLat(37.595214, 55.702355, 3039);
            // let viewPoi = new LonLat(37.595214, 55.702355, 0);

            // let lookCart = ell.lonLatToCartesian(viewPoi);
            // let upVec = ell.lonLatToCartesian(destPos).normalize();

            // 0 - is an amplitude of the fly track
            // planet.camera.look(destPos, lookCart, upVec, 0);
            // planet.camera.set(planet.camera.eye, lookCart, upVec);
			
            // planet.camera.flyLonLat(destPos, lookCart, upVec, 0, 0, () => {
// planet.flyCartesian(planet.camera.eye);
			// });
            // planet.camera.rotateUp(180);
            // planet.camera.look(destPos, lookCart);
// planet.flyCartesian(planet.camera.eye);
// globus.planet.viewExtent(new Extent(new LonLat(158.31010, 54.45445), new LonLat(158.55687, 54.56659)));
// globus.planet.addControl(new control.DrawingSwitcher());

		// countries.events.on("mouseleave", function (e) {
			// e.pickingObject.geometry.setFillColor(1, 1, 1, 0.6);
			// e.pickingObject.geometry.setLineColor(0.2, 0.6, 0.8, 1.0);
		// });
		// countries.events.on("mouseenter", function (e) {
			// e.pickingObject.geometry.bringToFront();
			// e.pickingObject.geometry.setFillColor(1, 0, 0, 0.4);
			// e.pickingObject.geometry.setLineColor(1, 0, 0, 1.0);
		// });
		// countries.events.on("lclick", function (e) {
			// globus.planet.flyExtent(e.pickingObject.geometry.getExtent());
		// });
		// countries.events.on("touchstart", function (e) {
			// globus.planet.flyExtent(e.pickingObject.geometry.getExtent());
		// });


/*
let ell = globus.planet.ellipsoid;
            let destPos = new LonLat(10.13176, 46.18868, 10779);
            let viewPoi = new LonLat(9.98464, 46.06157, 3039);

            let lookCart = ell.lonLatToCartesian(viewPoi);
            let upVec = ell.lonLatToCartesian(destPos).normalize();

            // 0 - is an amplitude of the fly track
            globus.planet.camera.flyLonLat(destPos, lookCart, upVec, 0);

import {geoObjects} from './lib/og/sandbox/geoObject/geoObject.js';
globus.planet.addControl(new control.ToggleWireframe());
globus.planet.addControl(new control.KeyboardNavigation());
globus.planet.addControl(new control.RulerSwitcher());
let di = new control.DebugInfo();
globus.planet.addControl(di);
di.addWatch({
    label: "distance",
    frame: () => {
        if (geoObjects.getEntities()[0]) {
            return globus.planet.camera.eye.distance(geoObjects.getEntities()[0].getCartesian())
        }
        return 0.0;
    }
});

geoObjects.events.on("lclick", function (e) {
    //e.pickingObject.geoObject.remove();
});

geoObjects.events.on("mouseenter", function (e) {
    let en = e.pickingObject, b = en.geoObject;
    //b.setColor(1, 1, 1);
});
geoObjects.events.on("mouseleave", function (e) {
    let en = e.pickingObject,
        b = en.geoObject;
    //b.setColor4v(utils.htmlColorToRgba(en.properties.color));
});

let counter = 0;
globus.planet.renderer.events.on("draw", () => {
    let e = geoObjects.getEntities();
    for (let i = 0; i < e.length; i++) {
        let gi = e[i].geoObject;
        gi.setYaw(counter * Math.PI / 180);
        gi.setPitch(counter * Math.PI / 180);
        gi.setRoll(counter * Math.PI / 180);
        counter += 0.01;
    }
})

geoObjects.addTo(globus.planet);
*/


export default globus
