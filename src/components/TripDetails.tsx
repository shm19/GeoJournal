import { useState, useEffect } from "react";
import useTripStore from "../store";

interface TripDetailsProps {
  selectedTripIndex: number;
  showingTripDetails: boolean;
  setShowingTripDetails: (showing: boolean) => void;
}

function TripDetails({ selectedTripIndex = -1, showingTripDetails, setShowingTripDetails }: TripDetailsProps) {

  const [tripTitle, setTripTitle] = useState("");
  const [tripDescription, setTripDescription] = useState("");
  const [tripRating, setTripRating] = useState(0);  
  
  const [formError, setFormError] = useState({
    title: "",
    description: "",
    rating: "",
  });

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

  if (!showingTripDetails) {
    return <div>No trip details</div>;
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError({ title: "", description: "", rating: "" });
    if (tripTitle === "" || tripTitle.length < 3) {
      setFormError((prev) => ({ ...prev, title: "Title should be at least 3 characters" }));
    }
    if (tripDescription === "" || tripDescription.length < 3) {
      setFormError((prev) => ({ ...prev, description: "Description should be at least 3 characters" }));
    }
    if (tripRating < 1 || tripRating > 5) {
      setFormError((prev) => ({ ...prev, rating: "Rating should be a number between 1 and 5" }));
    }
    console.log(formError);
    console.log({title: tripTitle, description: tripDescription, rating: tripRating});
    if (Object.values(formError).some((error) => error !== "")) {
      return;
    }
    updateTrip(selectedTripIndex, {title: tripTitle, description: tripDescription, rating: tripRating});
    clearForm();
    setShowingTripDetails(false);
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
        {formError.title && <p className="text-red-500">{formError.title}</p>}
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
        {formError.description && <p className="text-red-500">{formError.description}</p>}
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
        {formError.rating && <p className="text-red-500">{formError.rating}</p>}
      </div>
      <button type="submit" className="form-button">
        Save
      </button>
    </form>
  );
}

export default TripDetails;
