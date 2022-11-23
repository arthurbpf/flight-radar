import { v4 as uuid } from 'uuid';
import create from 'zustand';
import CollisionPoint from '../types/CollisionPoint';

interface CollisionPointState {
	collisionPoint: CollisionPoint[];
	setCollisionPoints: (collisionPoint: CollisionPoint[]) => void;
}

const useCollisionPointStore = create<CollisionPointState>()((set) => ({
	collisionPoint: [],
	setCollisionPoints: (collisionPoint) => {
		set({ collisionPoint: [...collisionPoint] });
	}
}));

export default useCollisionPointStore;
