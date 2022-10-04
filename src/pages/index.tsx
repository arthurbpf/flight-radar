import type { NextPage } from 'next';
import styles from '../styles/Home.module.scss';
import ActionsForm from '../components/ActionsForm';
import Radar from '../components/Radar';
import AirplanesList from '../components/AirplanesList';
import LogList from '../components/LogList';
import { Box } from '@chakra-ui/react';

const Home: NextPage = () => {
	return (
		<div className={styles.container}>
			<ActionsForm className={styles.actionsForm} />
			<Box className={styles.rightColumn}>
				<Radar className={styles.radar} />
				<LogList />
			</Box>
			<AirplanesList />
		</div>
	);
};

export default Home;
