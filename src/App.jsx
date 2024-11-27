import React from 'react';
import WeatherSearch from './components/WeatherSearch';
import WeatherForecast from './components/WeatherForecast';
import WeatherFavorites from './components/WeatherFavorites';

// createContext so data is available to other components
export const WeatherContext = React.createContext();

function App() {
  const [weatherData, setWeatherData] = React.useState(null);
  const [favorites, setFavorites] = React.useState([])
  const [searchCity, setSearchCity] = React.useState('')

  return (
    <>
      <WeatherContext.Provider value={{ weatherData, setWeatherData, favorites, setFavorites, searchCity, setSearchCity }}>
        <div className="weather-dashboard">
          <div className="header">
            <h1>Weather Dashboard</h1>
          </div>
          <WeatherFavorites />
          <WeatherSearch />
          <WeatherForecast />
        </div>
      </WeatherContext.Provider>
    </>
  );
}

export default App;
