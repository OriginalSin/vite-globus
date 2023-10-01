import data from './countries.json';
import {Entity, Vector} from '../../src';

var countries = new Vector("Countries", {
	'visibility': true,
	'isBaseLayer': false,
	'diffuse': [0, 0, 0],
	'ambient': [1, 1, 1]
});
// console.log('fffffff ', json);
// fetch("./countries.json")
	// .then(r => {
		// return r.text();
	// }).then(data => {
		// var countries = new Vector("Countries", {
			// 'visibility': true,
			// 'isBaseLayer': false,
			// 'diffuse': [0, 0, 0],
			// 'ambient': [1, 1, 1]
		// });

		// countries.addTo(globus.planet);

		var f = data.features;
		for (let i = 0; i < f.length; i++) {
			var fi = f[i];
			countries.add(new Entity({
				'geometry': {
					'type': fi.geometry.type,
					'coordinates': fi.geometry.coordinates,
					'style': {
						'fillColor': "rgba(255,255,255,0.6)"
					}
				}
			}));
		}

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
	// });

export { countries };
/*
        import {
            Globe,
            Entity,
            GlobusTerrain,
            XYZ,
            Vector
        } from "../../lib/@openglobus/og.esm.js";

        var osm = new XYZ("OpenStreetMap", {
            specular: [0.0003, 0.00012, 0.00001],
            shininess: 20,
            diffuse: [0.89, 0.9, 0.83],
            isBaseLayer: true,
            url: "//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
            visibility: true,
            attribution: 'Data @ OpenStreetMap contributors, ODbL'
        });

        var globus = new Globe({
            "target": "globus",
            "name": "Earth",
            "terrain": new GlobusTerrain(),
            "layers": [osm]
        });

        window.globus = globus;

        fetch("./countries.json")
            .then(r => {
                return r.json();
            }).then(data => {
                var countries = new Vector("Countries", {
                    'visibility': true,
                    'isBaseLayer': false,
                    'diffuse': [0, 0, 0],
                    'ambient': [1, 1, 1]
                });

                countries.addTo(globus.planet);

                var f = data.features;
                for (let i = 0; i < f.length; i++) {
                    var fi = f[i];
                    countries.add(new Entity({
                        'geometry': {
                            'type': fi.geometry.type,
                            'coordinates': fi.geometry.coordinates,
                            'style': {
                                'fillColor': "rgba(255,255,255,0.6)"
                            }
                        }
                    }));
                }

                countries.events.on("mouseleave", function (e) {
                    e.pickingObject.geometry.setFillColor(1, 1, 1, 0.6);
                    e.pickingObject.geometry.setLineColor(0.2, 0.6, 0.8, 1.0);
                });
                countries.events.on("mouseenter", function (e) {
                    e.pickingObject.geometry.bringToFront();
                    e.pickingObject.geometry.setFillColor(1, 0, 0, 0.4);
                    e.pickingObject.geometry.setLineColor(1, 0, 0, 1.0);
                });
                countries.events.on("lclick", function (e) {
                    globus.planet.flyExtent(e.pickingObject.geometry.getExtent());
                });
                countries.events.on("touchstart", function (e) {
                    globus.planet.flyExtent(e.pickingObject.geometry.getExtent());
                });
            });
    </script>
</body>

</html>
*/