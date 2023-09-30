import './lib/og/og.css'
import {XYZ, Globe, GlobusTerrain} from './lib/og/src';
// import {XYZ, Globe, GlobusTerrain} from '@openglobus/og';

// console.log('ggggggggg', XYZ);

const osm = new XYZ("OpenStreetMap", {
	isBaseLayer: true,
	url: "//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
	visibility: true,
});

const globus = new Globe({
	target: "globus", // a HTMLDivElement which its id is
	name: "Earth",
	terrain: new GlobusTerrain(),
	layers: [osm],
	autoActivate: true,
	fontsSrc: "../res/fonts",  // Fonts folder
	resourcesSrc: "../res",    // Night and water mask terxtures folder
	viewExtent: [5.56707, 45.15679, 5.88834, 45.22260]
});

export default globus
