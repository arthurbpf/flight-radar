import styles from './index.module.scss';
import {
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
	TableContainer,
	Tooltip
} from '@chakra-ui/react';
import { Checkbox } from '@chakra-ui/react';
import { FiInfo, FiTrash } from 'react-icons/fi';

import useAirplanesStore from '../../stores/airplanesStore';

const AirplanesList = () => {
	const airplanes = useAirplanesStore((state) => state.airplanes);
	const removeAirplane = useAirplanesStore((state) => state.removeAirplane);
	const selectAirplane = useAirplanesStore((state) => state.selectAirplane);
	const deselectAirplane = useAirplanesStore((state) => state.deselectAirplane);

	return (
		<TableContainer width="100%">
			<Table>
				<Thead>
					<Tr>
						<Th></Th>
						<Th>Id</Th>
						<Th>X</Th>
						<Th>Y</Th>
						<Th>R</Th>
						<Th>A</Th>
						<Th>V</Th>
						<Th>D</Th>
						<Th></Th>
					</Tr>
				</Thead>
				<Tbody>
					{airplanes.map((airplane) => (
						<Tr key={airplane.id}>
							<Td>
								<Checkbox />
							</Td>
							<Td>
								<Tooltip label={airplane.id}>
									<span>
										<FiInfo />
									</span>
								</Tooltip>
							</Td>
							<Td>{Number(airplane.x).toFixed(2)}</Td>
							<Td>{Number(airplane.y).toFixed(2)}</Td>
							<Td>{Number(airplane.radius).toFixed(2)}</Td>
							<Td>{Number(airplane.angle).toFixed(2)}</Td>
							<Td>{Number(airplane.speed).toFixed(2)}</Td>
							<Td>{Number(airplane.direction).toFixed(2)}</Td>
							<Td>
								<span onClick={() => removeAirplane(airplane.id)}>
									<FiTrash className={styles.deleteIcon} />
								</span>
							</Td>
						</Tr>
					))}
				</Tbody>
			</Table>
		</TableContainer>
	);
};

export default AirplanesList;
