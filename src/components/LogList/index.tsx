import { ListItem, UnorderedList } from '@chakra-ui/react';
import useAirplanesStore from '../../stores/airplanesStore';
interface RadarProps {
	className?: string;
}

const LogList = ({ className }: RadarProps) => {
	const logs = useAirplanesStore((state) => state.logs);

	return (
		<UnorderedList
			className={className}
			display="flex"
			flexDirection="column"
			justifyContent="center"
		>
			{logs.map((log, index) => (
				<ListItem key={index}>{log}</ListItem>
			))}
		</UnorderedList>
	);
};

export default LogList;
