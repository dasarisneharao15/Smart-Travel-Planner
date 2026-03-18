import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import "./App.css";

function Result() {
  const location = useLocation();
  const { city, date } = location.state || {};

  const [weather, setWeather] = useState(null);
  const [places, setPlaces] = useState([]);

  const WEATHER_KEY = "6d83156e4e40ca97d0c6924b832fe00c";
  const GEO_KEY = "6f89f97774fd41a980277dce293d41a9";

  useEffect(() => {
    if (!city) return;

    // 🌦 Fetch Weather
    const fetchWeather = async () => {
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city},IN&appid=${WEATHER_KEY}&units=metric`
        );
        const data = await res.json();
        setWeather(data);
      } catch (err) {
        console.log("Weather error:", err);
      }
    };

    // 📍 Fetch Places
    const fetchPlaces = async () => {
      try {
        // Step 1: Get coordinates
        const geoRes = await fetch(
          `https://api.geoapify.com/v1/geocode/search?text=${city},India&apiKey=${GEO_KEY}`
        );
        const geoData = await geoRes.json();

        // Safety check
        if (!geoData.features || geoData.features.length === 0) {
          setPlaces(["City not found"]);
          return;
        }

        const lat = geoData.features[0].properties.lat;
        const lon = geoData.features[0].properties.lon;

        // Step 2: Get nearby tourist places
        const placeRes = await fetch(
          `https://api.geoapify.com/v2/places?categories=tourism.sights&filter=circle:${lon},${lat},20000&limit=6&apiKey=${GEO_KEY}`
        );
        const placeData = await placeRes.json();

        console.log(placeData); // DEBUG

        if (placeData.features && placeData.features.length > 0) {
          const placeNames = placeData.features
            .map((p) => p.properties.name)
            .filter((name) => name);

          setPlaces(placeNames);
        } else {
          setPlaces(["No famous places found"]);
        }
      } catch (err) {
        console.log("Places error:", err);
        setPlaces(["Error fetching places"]);
      }
    };

    fetchWeather();
    fetchPlaces();
  }, [city]);

  // If no data
  if (!city) {
    return <h2 style={{ textAlign: "center" }}>No data found</h2>;
  }

  return (
    <div className="center">
      <h1>{city} Travel Plan</h1>
      <p>📅 Travel Date: {date}</p>

      {/* Weather */}
      {weather && weather.main && (
        <div className="card">
          <p>🌡 {weather.main.temp}°C</p>
          <p>🌥 {weather.weather[0].description}</p>
        </div>
      )}

      {/* Places */}
      {places.length > 0 && (
        <div className="card">
          <h3>📍 Famous Places</h3>
          <ol>
            {places.map((place, i) => (
              <li key={i}>{place}</li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}

export default Result;

  const WEATHER_KEY = "6d83156e4e40ca97d0c6924b832fe00c";
  const GEO_KEY = "6f89f97774fd41a980277dce293d41a9";
  