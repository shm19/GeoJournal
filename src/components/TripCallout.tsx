import useTripStore from "../store";

interface TripCalloutProps {
  setSelectedTripIndex: (index: number) => void;
  setShowingTripDetails: (showing: boolean) => void;
}

function TripCallout({ setSelectedTripIndex, setShowingTripDetails }: TripCalloutProps) {
  const trips = useTripStore((state) => state.trips);

  return trips.length === 0 ? (
    <div className="flex flex-col items-center justify-center h-full">
      <h1>Welcome to GeoJournal!</h1>
      <p>Click on the map to add a new trip</p>
    </div>
  ) : (
    // display cards in a list from top to button
    <div>
      {trips.map((trip, index) => (
        <div
          className="bg-white p-4 rounded-md text-black my-2 text-right p-4"
          key={trip.marker[0] + trip.marker[1]}
        >
          <h1>title: {trip.title}</h1>
          <p>description: {trip.description}</p>
          {/* show a number from 1 to 5 */}
          <p>rating: {trip.rating}</p>
          <button 
          onClick={() => {
            setSelectedTripIndex(index);
            setShowingTripDetails(true);
          }}
          className="bg-blue-500 text-white rounded-md px-2 py-1 cursor-pointer mt-2">
            View
          </button>
        </div>
      ))}
    </div>
  );
}

export default TripCallout;
