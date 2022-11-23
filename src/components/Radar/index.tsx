import { Box } from '@chakra-ui/react';
import { VictoryChart, VictoryScatter, VictoryTheme } from 'victory';
import useAirplanesStore from '../../stores/airplanesStore';
import { IoIosAirplane } from 'react-icons/io';
import { GiSpikyExplosion } from 'react-icons/gi';
import useCollisionPointStore from '../../stores/collisionPointsStore';
import { useEffect, useState } from 'react';

interface RadarProps {
	className?: string;
}

const Radar = ({ className }: RadarProps) => {
	const airplanes = useAirplanesStore((state) => state.airplanes);
	const collisionPoints = useCollisionPointStore(
		(state) => state.collisionPoint
	);

	let limit = airplanes.reduce((limit, airplane) => {
		const airplaneX = Math.abs(airplane.x);
		const airplaneY = Math.abs(airplane.y);

		if (airplaneX > limit) {
			limit = airplaneX;
		}

		if (airplaneY > limit) {
			limit = airplaneY;
		}

		return limit;
	}, 0);

	if (limit < 15) limit = 15;

	return (
		<Box className={className || ''}>
			<VictoryChart
				theme={VictoryTheme.material}
				domain={[limit * -1, limit]}
				key={new Date().toISOString()}
			>
				<VictoryScatter
					data={[...airplanes]}
					dataComponent={<AirplanePoint />}
				/>
				<VictoryScatter
					data={[...collisionPoints]}
					dataComponent={<CollisionPoint />}
				/>
			</VictoryChart>
		</Box>
	);
};

const AirplanePoint = (props: any) => {
	const { datum } = props;
	const angle = datum?.direction.toString() || '0';
	const id = datum?.id || '';
	let { x, y } = props;

	const size = 15;

	x -= size / 2;
	y -= size / 2;

	return (
		<g
			id={id}
			style={{
				transformBox: 'fill-box',
				transformOrigin: 'center',
				transform: `rotate(${-angle}deg)`
			}}
		>
			<IoIosAirplane x={x} y={y} fontSize={`${size}px`} />
		</g>
	);
};

const CollisionPoint = (props: any) => {
	let { x, y } = props;
	const size = 15;

	x -= size / 2;
	y -= size / 2;

	return (
		<g
			style={{
				transformBox: 'fill-box',
				transformOrigin: 'center'
			}}
		>
			<GiSpikyExplosion x={x} y={y} fontSize={`${size}px`} color="Orange" />
		</g>
	);
};

export default Radar;
