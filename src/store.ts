import { create } from "zustand";

interface Trip {
  title: string;
  description: string;
  rating: number;
  marker: [number, number];
}

interface TripStore {
  trips: Trip[];
  setTrips: (trips: Trip[]) => void;
  updateTrip: (index: number, trip: Partial<Trip>) => void;
}

const useTripStore = create<TripStore>((set) => ({
  trips: [],
  setTrips: (trips: Trip[]) => set({ trips }),
  updateTrip: (index: number, trip: Partial<Trip>) => set((state) => ({ trips: state.trips.map((t, i) => i === index ? { ...t, ...trip } : t) })),
}))

export default useTripStore;