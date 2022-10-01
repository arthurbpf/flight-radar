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
							<Td>{airplane.x}</Td>
							<Td>{airplane.y}</Td>
							<Td>{airplane.radius}</Td>
							<Td>{airplane.angle}</Td>
							<Td>{airplane.speed}</Td>
							<Td>{airplane.direction}</Td>
							<Td>
								<span>
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
