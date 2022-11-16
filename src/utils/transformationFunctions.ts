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
