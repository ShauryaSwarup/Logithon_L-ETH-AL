"use client";
import { useEffect, useRef } from "react";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";

const Map1 = ({ setMap1Object }) => {
	const map1Container = useRef();

	useEffect(() => {
		const map1 = new Map({
			layers: [
				new TileLayer({
					source: new OSM(),
				}),
			],
			view: new View({
				center: [8546575.886939, 2137169.681579], // Longitude, Latitude
				zoom: 6,
			}),
		});
		map1.setTarget(map1Container.current);
		setMap1Object(map1);

		return () => {
			map1.setTarget(undefined);
			setMap1Object(null);
		};
	}, []);

	return (
		<div style={{ width: "100%", height: "200px" }}>
			<div ref={map1Container} style={{ width: "100%", height: "100%" }} />
		</div>
	);
};

export default Map1;
