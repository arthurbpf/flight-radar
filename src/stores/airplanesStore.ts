import { v4 as uuid } from 'uuid';
import create from 'zustand';
import Airplane from '../types/Airplane';

interface AirplanesState {
	airplanes: Airplane[];
	selection: string[];
	logs: string[];
	setAirplanes: (airplanesArray: Airplane[]) => void;
	addAirplane: (airplane: Airplane) => void;
	removeAirplane: (id: string) => void;
	selectAirplane: (id: string) => void;
	deselectAirplane: (id: string) => void;
	setLogs: (logsArray: string[]) => void;
}

const useAirplanesStore = create<AirplanesState>()((set) => ({
	airplanes: [],
	selection: [],
	logs: [],
	setAirplanes: (airplanesArray) => {
		set({ airplanes: [...airplanesArray] });
	},
	addAirplane: (airplane) => {
		airplane.id = uuid();
		set((state) => ({ airplanes: [...state.airplanes, airplane] }));
	},
	removeAirplane: (id) => {
		set((state) => ({
			airplanes: state.airplanes.filter((airplane) => airplane.id !== id)
		}));
	},
	selectAirplane: (id) => {
		set((state) => {
			let newSelection = [...state.selection, id];

			newSelection = [...new Set(newSelection)];

			return {
				selection: newSelection
			};
		});
	},
	deselectAirplane: (id) => {
		set((state) => ({
			selection: state.selection.filter((selectedId) => selectedId !== id)
		}));
	},
	setLogs: (logsArray) => {
		set({ logs: [...logsArray] });
	}
}));

export default useAirplanesStore;
