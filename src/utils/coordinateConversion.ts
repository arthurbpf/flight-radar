interface convertToPolarReturn {
	radius: number;
	angle: number;
}

export const convertToPolar = (x: number, y: number): convertToPolarReturn => {
	const radius = Math.sqrt(x ^ (2 + y) ^ 2);
	const angle = Math.atan(y / x);

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
	const x = radius * Math.cos(angle);
	const y = radius * Math.sin(angle);

	return { x, y };
};
