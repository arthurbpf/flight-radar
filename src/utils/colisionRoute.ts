import { convertToRad } from './coordinateConversion';
import Airplane from '../types/Airplane';
import useAirplanesStore from '../stores/airplanesStore';

interface AirplanesRiskOfColision {
	airplaneA: Airplane;
	airplaneB: Airplane;
	timeToColision: number;
	timeToPointA: number;
	timeToPointB: number;
}

interface ReturnGetTimeDistance {
	timeToColision: number;
	timeToPointA: number;
	timeToPointB: number;
	riskOfColision: boolean;
}

export function colisionRoute(time: number) {
	const airplanesRiskOfColision = <AirplanesRiskOfColision[]>[];

	const { setState, getState } = useAirplanesStore;
	const { airplanes } = getState();

	let logs: string[] = [];

	airplanes.map((airplane, index) => {
		for (let i = index + 1; i <= airplanes.length - 1; i++) {
			const airplanesColision = getTimeDistance(airplane, airplanes[i]);

			if (
				airplanesColision.timeToColision <= time &&
				airplanesColision.riskOfColision
			) {
				logs.push(
					`Avião (X: ${airplane.x}; Y: ${
						airplane.y
					}) T: ${airplanesColision.timeToPointA.toFixed(2)}s | Avião (X: ${
						airplanes[i].x
					}; Y: ${airplanes[i].y}) T: ${airplanesColision.timeToPointB.toFixed(
						2
					)}s - Colisão em: ${airplanesColision.timeToColision.toFixed(2)}s`
				);

				airplanesRiskOfColision.push({
					airplaneA: airplane,
					airplaneB: airplanes[i],
					timeToColision: airplanesColision.timeToColision,
					timeToPointA: airplanesColision.timeToPointA,
					timeToPointB: airplanesColision.timeToPointB
				});
			}
		}
	});

	setState({ logs });
}

function getTimeDistance(
	airplaneA: Airplane,
	airplaneB: Airplane
): ReturnGetTimeDistance {
	const directionAInRad = convertToRad(airplaneA.direction);
	const directionBInRad = convertToRad(airplaneB.direction);

	const coefA = Number(Math.tan(directionAInRad).toFixed(2)) || 0;

	const coefB = Number(Math.tan(directionBInRad).toFixed(2)) || 0;

	const yInicialA = coefA * -airplaneA.x + airplaneA.y,
		xInicialA = coefA;

	const yInicialB = coefB * -airplaneB.x + airplaneB.y,
		xInicialB = coefB;

	const ladoX = xInicialA + xInicialB * -1,
		ladoY = yInicialA * -1 + yInicialB;

	const xColision = ladoY / ladoX;

	if (!xColision || Math.abs(xColision) === Infinity) {
		return {
			riskOfColision: false,
			timeToColision: 0,
			timeToPointA: 0,
			timeToPointB: 0
		};
	}

	const yColision =
		xInicialA < 0 ? -xColision + yInicialA : xColision + yInicialA;

	const dA = Number(
			Math.sqrt(
				Math.pow(xColision - airplaneA.x, 2) +
					Math.pow(yColision - airplaneA.y, 2)
			).toFixed(4)
		),
		dB = Number(
			Math.sqrt(
				Math.pow(xColision - airplaneB.x, 2) +
					Math.pow(yColision - airplaneB.y, 2)
			).toFixed(4)
		);

	let riskOfColision = true;

	const tA = (dA / airplaneA.speed) * 3600,
		tB = (dB / airplaneB.speed) * 3600;

	const timeToColision = Math.abs(tA - tB);

	if (Math.sin(directionAInRad) > 0 || Math.sin(directionBInRad) > 0) {
		riskOfColision = yColision >= 0;
	} else {
		riskOfColision = yColision <= 0;
	}

	if (Math.cos(directionAInRad) > 0 || Math.cos(directionBInRad) > 0) {
		riskOfColision = xColision >= 0;
	} else {
		riskOfColision = xColision <= 0;
	}

	return {
		riskOfColision,
		timeToColision,
		timeToPointA: tA,
		timeToPointB: tB
	};
}
