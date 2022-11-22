import Airplane from '../types/Airplane';
import useAirplanesStore from '../stores/airplanesStore';

interface returnAirPlanesNext {
	airplaneA: Airplane;
	airplaneB: Airplane;
	distance: number;
}

export function getAirplanesNextToAirport(minDistance: number): void {
	const { setState, getState } = useAirplanesStore;
	const { airplanes } = getState();

	let logs: string[] = [];

	airplanes.forEach((airplane) => {
		if (airplane.radius < minDistance) {
			logs.push(
				`Avião (X: ${airplane.x}; Y: ${
					airplane.y
				}) - Distância: ${airplane.radius.toFixed(2)}km`
			);
		}
	});

	setState({ logs });
}

export function getNextPlanes(minDistance: number) {
	const { setState, getState } = useAirplanesStore;
	const { airplanes } = getState();

	let logs: string[] = [];

	airplanes.map((airplane, index) => {
		for (let i = index + 1; i <= airplanes.length - 1; i++) {
			const distance = Number(
				Math.sqrt(
					Math.pow(airplanes[i].x - airplane.x, 2) +
						Math.pow(airplanes[i].y - airplane.y, 2)
				).toFixed(4)
			);

			if (distance <= minDistance) {
				logs.push(
					`Avião (X: ${airplane.x}; Y: ${airplane.y}) | Avião (X: ${
						airplanes[i].x
					}; Y: ${airplanes[i].y})  - Distância: ${distance.toFixed(2)}km`
				);
			}
		}
	});

	setState({ logs });
}
