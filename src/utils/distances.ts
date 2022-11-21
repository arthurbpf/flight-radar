import Airplane from '../types/Airplane';

interface returnAirPlanesNextToAirport {
	airplane: Airplane;
	distance: number;
}

interface returnAirPlanesNext {
	airplaneA: Airplane;
	airplaneB: Airplane;
	distance: number;
}

export function getAirplanesNextToAirport(
	airplanes: Airplane[],
	distanceMin: number
): returnAirPlanesNextToAirport[] {
	const airplanesNext = <returnAirPlanesNextToAirport[]>[];

	airplanes.map((airplane) => {
		const distance = Number(
			Math.sqrt(
				Math.pow(0 - airplane.x, 2) + Math.pow(0 - airplane.y, 2)
			).toFixed(4)
		);

		if (distance <= distanceMin) {
			airplanesNext.push({
				airplane,
				distance
			});
		}
	});

	return airplanesNext;
}

export function getNextPlanes(
	airplanes: Airplane[],
	distanceMin: number
): returnAirPlanesNext[] {
	const airplanesNext = <returnAirPlanesNext[]>[];

	airplanes.map((airplane, index) => {
		for (let i = index + 1; i <= airplanes.length - 1; i++) {
			const distance = Number(
				Math.sqrt(
					Math.pow(airplanes[i].x - airplane.x, 2) +
						Math.pow(airplanes[i].y - airplane.y, 2)
				).toFixed(4)
			);

			if (distance <= distanceMin) {
				airplanesNext.push({
					airplaneA: airplanes[i],
					airplaneB: airplane,
					distance
				});
			}
		}
	});

	return airplanesNext;
}
