import useCollisionPointStore from '../stores/collisionPointsStore';
import Airplane from '../types/Airplane';
import { convertToPolar, convertToRad } from './coordinateConversion';

export function translate(airplane: Airplane, x: number, y: number): Airplane {
	const { setState: setStateCollision } = useCollisionPointStore;

	setStateCollision({ collisionPoint: [] });

	x += airplane.x;
	y += airplane.y;

	const { angle, radius } = convertToPolar(x, y);

	airplane.x = x;
	airplane.y = y;
	airplane.angle = angle;
	airplane.radius = radius;

	return airplane;
}

export function rotate(
	airplane: Airplane,
	rotationAngle: number,
	xCenter: number,
	yCenter: number
): Airplane {
	const { setState: setStateCollision } = useCollisionPointStore;

	setStateCollision({ collisionPoint: [] });

	rotationAngle = convertToRad(rotationAngle);

	const x =
		(airplane.x - xCenter) * Math.cos(rotationAngle) -
		(airplane.y - yCenter) * Math.sin(rotationAngle) +
		xCenter;
	const y =
		(airplane.x - xCenter) * Math.sin(rotationAngle) +
		(airplane.y - yCenter) * Math.cos(rotationAngle) +
		yCenter;

	const { angle, radius } = convertToPolar(x, y);

	airplane.x = x;
	airplane.y = y;
	airplane.angle = angle;
	airplane.radius = radius;

	return airplane;
}

export function scale(
	airplane: Airplane,
	xFactor: number,
	yFactor: number
): Airplane {
	const { setState: setStateCollision } = useCollisionPointStore;

	setStateCollision({ collisionPoint: [] });

	const x = airplane.x * xFactor;
	const y = airplane.y * yFactor;

	const { angle, radius } = convertToPolar(x, y);

	airplane.x = x;
	airplane.y = y;
	airplane.angle = angle;
	airplane.radius = radius;

	return airplane;
}
