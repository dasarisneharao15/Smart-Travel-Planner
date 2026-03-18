import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

function Home() {
  const [city, setCity] = useState("");
  const [date, setDate] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate("/result", { state: { city, date } });
  };

  return (
    <div className="center">
      <h1>🇮🇳 Smart Travel Planner</h1>

      <input
        type="text"
        placeholder="Enter City"
        onChange={(e) => setCity(e.target.value)}
      />

      <input
        type="date"
        onChange={(e) => setDate(e.target.value)}
      />

      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

export default Home;