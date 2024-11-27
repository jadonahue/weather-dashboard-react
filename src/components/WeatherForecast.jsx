import React from 'react';
import { WeatherContext } from '../App';

export default function WeatherForecast() {
  const { weatherData } = React.useContext(WeatherContext); // Get context date from parent app

  // Check if there is no weather data or if empty
  if (!weatherData?.list || !weatherData.list.length) {
    return <p>No forecast data available. Please try searching for another city.</p>;
  }


  const getDailyForecasts = (data) => {
    const forecasts = data.list;
    const dailyForecasts = {};

    // Loop through each entry in forecast
    forecasts.forEach((entry) => {
      const date = entry.dt_txt.split(' ')[0]; // Split the entry to only retrieve "yyyy-mm-dd"
      if (
        !dailyForecasts[date] || // Checks if there is a date yet. If not its first entry

        // Get next date nearesst 12
        Math.abs(new Date(`${date} 12:00:00`) - new Date(entry.dt_txt)) <
        Math.abs(new Date(`${date} 12:00:00`) - new Date(dailyForecasts[date].dt_txt))
      ) {
        dailyForecasts[date] = entry;
      }
    });

    return Object.values(dailyForecasts).slice(0, 5); // Return 5 days of forecast
  };

  const dailyForecast = getDailyForecasts(weatherData);

  return (
    <div className="weather-forecast-container">
      {dailyForecast.map((forecast) => (
        <div key={forecast.dt} className="weather-forecast-card">
          <p>
            <strong>Date:</strong> {forecast.dt_txt.split(' ')[0]}
          </p>
          <p>
            <strong>Temp:</strong> {forecast.main.temp}
          </p>
          <p>
            <strong>Weather:</strong> {forecast.weather[0].main}
          </p>
          <p>
            <strong>Wind Speed:</strong> {forecast.wind.speed}
          </p>
        </div>
      ))}
    </div>
  );
}
