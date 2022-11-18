import Airplane from '../types/Airplane';
import { convertToPolar } from './coordinateConversion';

export function translate(airplane: Airplane, x: number, y: number): Airplane {
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
	const x =
		airplane.x * Math.cos(rotationAngle) - airplane.y * Math.sin(rotationAngle);
	const y =
		airplane.x * Math.sin(rotationAngle) + airplane.y * Math.cos(rotationAngle);

	const { angle, radius } = convertToPolar(x, y);

	airplane.x = x;
	airplane.y = y;
	airplane.angle = angle;
	airplane.radius = radius;

	return airplane;
}
