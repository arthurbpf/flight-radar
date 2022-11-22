import type { NextPage } from 'next';
import styles from '../styles/Home.module.scss';
import ActionsForm from '../components/ActionsForm';
import Radar from '../components/Radar';
import AirplanesList from '../components/AirplanesList';
import LogList from '../components/LogList';

const Home: NextPage = () => {
	return (
		<div>
			<div className={styles.container}>
				<ActionsForm className={styles.actionsForm} />
				<Radar className={styles.radar} />
				<LogList className={styles.logList} />
			</div>
			<AirplanesList />
		</div>
	);
};

export default Home;
