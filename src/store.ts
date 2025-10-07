import { create } from "zustand";
import { persist } from "zustand/middleware";

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

const useTripStore = create<TripStore>()(
  persist(
    (set) => ({
      trips: [],
      setTrips: (trips: Trip[]) => set({ trips }),
      updateTrip: (index: number, trip: Partial<Trip>) =>
        set((state) => ({
          trips: state.trips.map((t, i) => (i === index ? { ...t, ...trip } : t)),
        })),
    }),
    {
      name: "geojournal-trips",
    }
  )
);

export default useTripStore;
