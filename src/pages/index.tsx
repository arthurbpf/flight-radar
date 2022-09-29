import type { NextPage } from 'next';
import styles from '../styles/Home.module.scss';
import ActionsForm from '../components/ActionsForm';
import Radar from '../components/Radar';
import PlanesList from '../components/PlanesList';
import LogList from '../components/LogList';
import { Box } from '@chakra-ui/react';

const Home: NextPage = () => {
	return (
		<div className={styles.container}>
			<ActionsForm />
			<Radar />
			<Box>
				<PlanesList />
				<LogList />
			</Box>
		</div>
	);
};

export default Home;
