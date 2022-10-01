import { v4 as uuid } from 'uuid';
import create from 'zustand';
import Airplane from '../types/Airplane';

interface AirplanesState {
	airplanes: Airplane[];
	addAirplane: (airplane: Airplane) => void;
}

const useAirplanesStore = create<AirplanesState>()((set) => ({
	airplanes: [],
	addAirplane: (airplane) => {
		airplane.id = uuid();
		set((state) => ({ airplanes: [...state.airplanes, airplane] }));
	}
}));

export default useAirplanesStore;
