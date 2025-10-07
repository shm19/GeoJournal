// @todo: handle form validation
import { useState, useEffect } from "react";
import useTripStore from "../store";

interface TripDetailsProps {
  selectedTripIndex: number;
  setSelectedTripIndexIndex: (index: number) => void;
}

function TripDetails({ selectedTripIndex = -1, setSelectedTripIndexIndex }: TripDetailsProps) {
  console.log("selectedTripIndex", selectedTripIndex);
  const [tripTitle, setTripTitle] = useState("");
  const [tripDescription, setTripDescription] = useState("");
  const [tripRating, setTripRating] = useState(0);  

  const updateTrip = useTripStore((state) => state.updateTrip);
  const trips = useTripStore((state) => state.trips);
  const selectedTrip = trips[selectedTripIndex];

  useEffect(() => {
    if (selectedTrip) {
    setTripTitle(selectedTrip.title);
      setTripDescription(selectedTrip.description);
      setTripRating(selectedTrip.rating);
    }
  }, [selectedTrip]);

  if (selectedTripIndex === -1) {
    return <div>No trip details</div>;
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateTrip(selectedTripIndex, {title: tripTitle, description: tripDescription, rating: tripRating});
    clearForm();
    setSelectedTripIndexIndex(-1);
  }

  const clearForm = () => {
    setTripTitle("");
    setTripDescription("");
    setTripRating(0);
  }

  return (
    <form className="flex flex-col gap-8 bg-white p-4 rounded-md text-black h-full" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-1">
        <label htmlFor="title">Title</label>
        <input
          className="form-input"
          placeholder="Enter title"
          name="title"
          id="title"
          type="text"
          value={tripTitle}
          onChange={(e) => setTripTitle(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="description">Description</label>
        <textarea
          className="form-textarea"
          placeholder="Enter description"
          name="description"
          id="description"
          value={tripDescription}
          onChange={(e) => setTripDescription(e.target.value)}
          rows={4}
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="rating">Rating</label>
        <input
          className="form-input"
          placeholder="Enter rating"
          name="rating"
          id="rating"
          type="number"
          value={tripRating}
          onChange={(e) => setTripRating(parseInt(e.target.value))}
        />
      </div>
      <button type="submit" className="form-button">
        Save
      </button>
    </form>
  );
}

export default TripDetails;
