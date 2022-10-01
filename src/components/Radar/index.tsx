import { Box } from '@chakra-ui/react';
import useAirplanesStore from '../../stores/airplanesStore';

interface RadarProps {
	className?: string;
}

const Radar = ({ className }: RadarProps) => {
	const airplanes = useAirplanesStore((state) => state.airplanes);
	return <Box className={className || ''}></Box>;
};

export default Radar;
