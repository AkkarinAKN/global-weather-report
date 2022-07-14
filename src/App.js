import React, { useState } from "react";
import keys from "./apiKey";
import "./App.css";

const api = {
  key: keys.API_KEY,
  base: keys.BASE_URL,
};

function App() {
  const Build = (d) => {
    let date = String(new window.Date());
    date = date.slice(3, 15);
    return date;
  };

  const [query, setQuery] = useState("");
  const [data, setData] = useState({});
  const serch = (e) => {
    if (e.key == "Enter") {
      fetch(`${api.base}weather?q=${query}&units=imperial&appid=${api.key}`)
        .then((res) => res.json())
        .then((results) => {
          setQuery("");
          setData(results);
          console.log(results);
        });
    }
  };

  return (
    <div
      className={
        typeof data.main !== "undefined"
          ? data.main.temp > 70
            ? "App hot"
            : "App cold"
          : "App"
      }
    >
      <main>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search"
            className="search-bar"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={serch}
          />
        </div>
        {typeof data.main !== "undefined" ? (
          <div>
            <div className="location-container">
              <div className="location">
                {data.name},{data.sys.country}
              </div>
              <div className="date">{Build(new Date())}</div>
            </div>
            <div className="weather-container">
              <div className="temperature">{Math.round(data.main.temp)}°F</div>
            </div>
          </div>
        ) : (
          ""
        )}
      </main>
    </div>
  );
}

export default App;
