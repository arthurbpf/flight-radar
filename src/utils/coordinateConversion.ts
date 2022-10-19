const convertToRad = (angleInDeg: number) => {
	return (Math.PI * 2 * angleInDeg) / 360;
};

const convertToDeg = (angleInRad: number) => {
	let angleInDeg = angleInRad * (180 / Math.PI);

	if (angleInDeg < 0) {
		angleInDeg += 360;
	}

	return angleInDeg;
};

interface convertToPolarReturn {
	radius: number;
	angle: number;
}

export const convertToPolar = (x: number, y: number): convertToPolarReturn => {
	const radius = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
	const angle = convertToDeg(Math.atan2(y, x));

	return { radius, angle };
};

interface convertToCartesianReturn {
	x: number;
	y: number;
}

export const convertToCartesian = (
	radius: number,
	angle: number
): convertToCartesianReturn => {
	const angleInRad = convertToRad(angle);

	const x = radius * Math.cos(angleInRad);
	const y = radius * Math.sin(angleInRad);

	return { x, y };
};
