import './lib/og/og.css'
import {XYZ, Globe, GlobusTerrain,
    control
} from './lib/og/src';

// console.log('ggggggggg', XYZ);

const osm = new XYZ("OpenStreetMap", {
	isBaseLayer: true,
	// url: "//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
	url: "//{s}tilecart.kosmosnimki.ru/kosmo/{z}/{x}/{y}.png",
	visibility: true,
});

const globus = new Globe({
	target: "globus", // a HTMLDivElement which its id is
	name: "Earth",
	// terrain: new GlobusTerrain(),
	layers: [osm],
	autoActivate: true,
	fontsSrc: "../res/fonts",  // Fonts folder
	resourcesSrc: "../res",    // Night and water mask terxtures folder
	// viewExtent: [5.56707, 45.15679, 5.88834, 45.22260]
	viewExtent: [ -10.54, -90.0, 85.781, 90.0]
});
window.globus1 = globus;

/*
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
