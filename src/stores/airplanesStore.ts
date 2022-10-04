import { v4 as uuid } from 'uuid';
import create from 'zustand';
import Airplane from '../types/Airplane';

interface AirplanesState {
	airplanes: Airplane[];
	selection: string[];
	addAirplane: (airplane: Airplane) => void;
	removeAirplane: (id: string) => void;
}

const useAirplanesStore = create<AirplanesState>()((set) => ({
	airplanes: [],
	selection: [],
	addAirplane: (airplane) => {
		airplane.id = uuid();
		set((state) => ({ airplanes: [...state.airplanes, airplane] }));
	},
	removeAirplane: (id) => {
		set((state) => ({
			airplanes: state.airplanes.filter((airplane) => airplane.id !== id)
		}));
	}
}));

export default useAirplanesStore;
