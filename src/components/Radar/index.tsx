import { Box, Icon } from '@chakra-ui/react';
import { VictoryChart, VictoryScatter, VictoryTheme } from 'victory';
import useAirplanesStore from '../../stores/airplanesStore';
import { IoIosAirplane } from 'react-icons/io';

interface RadarProps {
	className?: string;
}

const Radar = ({ className }: RadarProps) => {
	const airplanes = useAirplanesStore((state) => state.airplanes);

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
			<VictoryChart theme={VictoryTheme.material} domain={[limit * -1, limit]}>
				<VictoryScatter data={airplanes} dataComponent={<AirplanePoint />} />
			</VictoryChart>
		</Box>
	);
};

const AirplanePoint = (props: any) => {
	const { x, y, datum } = props;

	return (
		<IoIosAirplane x={x} y={y} transform={`rotate(${datum.direction + 90})`} />
	);
};
export default Radar;
