"use client";
import Map1 from "@/components/Map";
import TableScrollArea from "@/components/Table/Table";
import TimelineComp from "@/components/Timeline";
import { Grid, Skeleton, Container } from "@mantine/core";
import Synchronize from "ol-ext/interaction/Synchronize";
import { useEffect, useMemo, useState } from "react";
// import "ol-ext/dist/ol-ext.css";

const child = <Skeleton height={140} radius="md" animate={false} />;

export default function GridAsymmetrical() {
	const [map1Object, setMap1Object] = useState(null);

	useEffect(() => {
		if (!map1Object) return;

		// Define the synchronization interaction for map1Object
		const synchronizeInteraction = new Synchronize({ maps: [map1Object] });
		map1Object.addInteraction(synchronizeInteraction);

		// Cleanup function
		return () => {
			if (map1Object) map1Object.removeInteraction(synchronizeInteraction);
		};
	}, [map1Object]);

	return (
		<Container my="md">
			<Grid>
				<Grid.Col span={{ base: 12, xs: 8 }}>
					<TableScrollArea />
				</Grid.Col>
				<Grid.Col span={{ base: 12, xs: 4 }}>
					<TimelineComp />
				</Grid.Col>
				<Grid.Col span={{ base: 12, xs: 4 }}>
					<Map1 setMap1Object={setMap1Object} />
				</Grid.Col>
				<Grid.Col span={{ base: 12, xs: 8 }}>{child}</Grid.Col>
				{/* <Grid.Col span={{ base: 12, xs: 3 }}>{child}</Grid.Col> */}
				<Grid.Col span={{ base: 12, xs: 6 }}>{child}</Grid.Col>
				<Grid.Col span={{ base: 12, xs: 6 }}>{child}</Grid.Col>
			</Grid>
		</Container>
	);
}
