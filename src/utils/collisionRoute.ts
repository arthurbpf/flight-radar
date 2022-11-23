import { convertToRad } from './coordinateConversion';
import Airplane from '../types/Airplane';
import useAirplanesStore from '../stores/airplanesStore';
import useCollisionPointStore from '../stores/collisionPointsStore';
import CollisionPoint from '../types/CollisionPoint';

interface AirplanesRiskOfCollision {
	airplaneA: Airplane;
	airplaneB: Airplane;
	timeToCollision: number;
	timeToPointA: number;
	timeToPointB: number;
}

interface ReturnGetTimeDistance {
	timeToCollision: number;
	timeToPointA: number;
	timeToPointB: number;
	riskOfCollision: boolean;
	collisionPoint: CollisionPoint;
}

export function collisionRoute(time: number) {
	const airplanesRiskOfCollision = <AirplanesRiskOfCollision[]>[];

	const collisionPoints = <CollisionPoint[]>[];

	const { setState, getState } = useAirplanesStore;
	const { airplanes } = getState();

	const { setState: setStateCollision } = useCollisionPointStore;

	setStateCollision({ collisionPoint: [] });

	let logs: string[] = [];

	airplanes.map((airplane, index) => {
		for (let i = index + 1; i <= airplanes.length - 1; i++) {
			const airplanesCollision = getTimeDistance(airplane, airplanes[i]);

			if (
				airplanesCollision.timeToCollision <= time &&
				airplanesCollision.riskOfCollision
			) {
				logs.push(
					`Avião (X: ${airplane.x}; Y: ${
						airplane.y
					}) T: ${airplanesCollision.timeToPointA.toFixed(2)}s | Avião (X: ${
						airplanes[i].x
					}; Y: ${airplanes[i].y}) T: ${airplanesCollision.timeToPointB.toFixed(
						2
					)}s - Colisão em: ${airplanesCollision.timeToCollision.toFixed(2)}s`
				);

				airplanesRiskOfCollision.push({
					airplaneA: airplane,
					airplaneB: airplanes[i],
					timeToCollision: airplanesCollision.timeToCollision,
					timeToPointA: airplanesCollision.timeToPointA,
					timeToPointB: airplanesCollision.timeToPointB
				});

				collisionPoints.push({
					x: airplanesCollision.collisionPoint.x,
					y: airplanesCollision.collisionPoint.y
				});
			}
		}
	});

	setStateCollision({ collisionPoint: collisionPoints });

	setState({ logs });
}

function getTimeDistance(
	airplaneA: Airplane,
	airplaneB: Airplane
): ReturnGetTimeDistance {
	const directionAInRad = convertToRad(airplaneA.direction);
	const directionBInRad = convertToRad(airplaneB.direction);

	if (airplaneA.direction === 90 || airplaneA.direction === 270) {
		return handle90and270cases(airplaneA, airplaneB, directionBInRad);
	} else if (airplaneB.direction === 90 || airplaneB.direction === 270) {
		const inverter = handle90and270cases(airplaneB, airplaneA, directionAInRad);

		return {
			...inverter,
			timeToPointA: inverter.timeToPointB,
			timeToPointB: inverter.timeToPointA
		};
	}

	const coefA = Number(Math.tan(directionAInRad).toFixed(2)) || 0;

	const coefB = Number(Math.tan(directionBInRad).toFixed(2)) || 0;

	const yInicialA = coefA * -airplaneA.x + airplaneA.y,
		xInicialA = coefA;

	const yInicialB = coefB * -airplaneB.x + airplaneB.y,
		xInicialB = coefB;

	const ladoX = xInicialA + xInicialB * -1,
		ladoY = yInicialA * -1 + yInicialB;

	const xCollision = ladoY / ladoX;

	if (xCollision === null || 
		xCollision === undefined || 
		xCollision === NaN ||
		Math.abs(xCollision) === Infinity) {
		return {
			riskOfCollision: false,
			timeToCollision: 0,
			timeToPointA: 0,
			timeToPointB: 0,
			collisionPoint: {
				x: 0,
				y: 0
			}
		};
	}

	const yCollision =
		xInicialA < 0
			? -(xInicialA * xCollision) + yInicialA
			: xInicialA * xCollision + yInicialA;

	const dA = Number(
			Math.sqrt(
				Math.pow(xCollision - airplaneA.x, 2) +
					Math.pow(yCollision - airplaneA.y, 2)
			).toFixed(4)
		),
		dB = Number(
			Math.sqrt(
				Math.pow(xCollision - airplaneB.x, 2) +
					Math.pow(yCollision - airplaneB.y, 2)
			).toFixed(4)
		);

	let riskOfCollision = true;

	const tA = (dA / airplaneA.speed) * 3600,
		tB = (dB / airplaneB.speed) * 3600;

	const timeToCollision = Math.abs(tA - tB);

	if (Math.sin(directionAInRad) > 0 || Math.sin(directionBInRad) > 0) {
		riskOfCollision = yCollision >= 0;
	} else {
		riskOfCollision = yCollision <= 0;
	}

	if (Math.cos(directionAInRad) > 0 || Math.cos(directionBInRad) > 0) {
		riskOfCollision = xCollision >= 0;
	} else {
		riskOfCollision = xCollision <= 0;
	}

	return {
		riskOfCollision,
		timeToCollision,
		timeToPointA: tA,
		timeToPointB: tB,
		collisionPoint: {
			x: xCollision,
			y: yCollision
		}
	};
}

function handle90and270cases(
	airplaneA: Airplane,
	airplaneB: Airplane,
	directionBInRad: number
): ReturnGetTimeDistance {
	const coefB = Number(Math.tan(directionBInRad).toFixed(2)) || 0;

	const yFinalB = coefB * -airplaneB.x + airplaneB.y,
		xFinalB = coefB;

	const xCollision = airplaneA.x;

	const yCollision = xFinalB * airplaneA.x + yFinalB;

	let riskOfCollision = true;

	const dA = Number(
			Math.sqrt(
				Math.pow(xCollision, 2) + Math.pow(yCollision - airplaneA.y, 2)
			).toFixed(4)
		),
		dB = Number(
			Math.sqrt(
				Math.pow(xCollision - airplaneB.x, 2) +
					Math.pow(yCollision - airplaneB.y, 2)
			).toFixed(4)
		);

	const tA = (dA / airplaneA.speed) * 3600,
		tB = (dB / airplaneB.speed) * 3600;

	const timeToCollision = Math.abs(tA - tB);

	return {
		riskOfCollision,
		timeToCollision,
		timeToPointA: tA,
		timeToPointB: tB,
		collisionPoint: {
			x: xCollision,
			y: yCollision
		}
	};
}
