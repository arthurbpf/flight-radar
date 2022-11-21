import { convertToRad } from './coordinateConversion';
import Airplane from '../types/Airplane';

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

export function colisionRoute(time: number, airplanes: Airplane[]) {
	const airplanesRiskOfColision = <AirplanesRiskOfColision[]>[];

	airplanes.map((airplane, index) => {
		for (let i = index + 1; i <= airplanes.length - 1; i++) {
			const airplanesColision = getTimeDistance(airplane, airplanes[i]);

			if (
				airplanesColision.timeToColision <= time &&
				airplanesColision.riskOfColision
			) {
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

	return airplanesRiskOfColision;
}

export function getTimeDistance(
	airplaneA: Airplane,
	airplaneB: Airplane
): ReturnGetTimeDistance {
	const angleAConversion = Number(
		Math.tan(convertToRad(airplaneA.direction)).toFixed(2)
	);
	const angleBConversion = Number(
		Math.tan(convertToRad(airplaneB.direction)).toFixed(2)
	);

	const yInicialA = angleAConversion * -airplaneA.x + airplaneA.y,
		xInicialA = angleAConversion;

	const yInicialB = angleBConversion * -airplaneB.x + airplaneB.y,
		xInicialB = angleBConversion;

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

	const tA = (dA / airplaneA.speed) * 3600,
		tB = (dB / airplaneB.speed) * 3600;

	const timeDiferenceToColisionPoint = Math.abs(tA - tB);

	return {
		riskOfColision: true,
		timeToColision: timeDiferenceToColisionPoint,
		timeToPointA: tA,
		timeToPointB: tB
	};
}
