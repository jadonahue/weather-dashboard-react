import React from 'react'
import { WeatherContext } from '../App'
import axios from 'axios';

export default function WeatherFavorites() {
    const { favorites, setFavorites, weatherData, setWeatherData, searchCity, setSearchCity } = React.useContext(WeatherContext)

    // When city selected to be added to favorites 
    const handleSelectFavorite = async (city) => {
        try {
            const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${import.meta.env.VITE_OPEN_WEATHER_API_KEY}&units=imperial`;
            const response = await axios.get(url);

            setWeatherData(response.data);
            setSearchCity(city);
        } catch (error) {
            console.log('Error fetching data:', error);
        }
    }

    const handleRemoveFavorite = (city, event) => {
        event.stopPropagation(); // Prevents internal button from selecting parent button

        // Create new array and keep all cities except the one that is selected
        const updatedFavorites = favorites.filter(fav => fav !== city)
        setFavorites(updatedFavorites)

        // Clear weatherData if the current city is being removed
        if (searchCity === city) {
            setWeatherData(null);
            setSearchCity(''); // Optionally clear the search city as well
            console.log('Favorites:', updatedFavorites);
            console.log('WeatherData:', weatherData);
            console.log('SearchCity:', searchCity);

        }
    }

    return (
        <div className='favorite-container'>
            <h2>Favorites</h2>
            {favorites.length === 0 ?
                (<p>No favorites yet. Add some cities!</p>)
                : (
                    <ul className="favorite-list">
                        {favorites.map((city, index) => (
                            <li key={index} className='favorite-city'>

                                <button onClick={() => handleSelectFavorite(city)}>
                                    {city}
                                    <button onClick={(event) => handleRemoveFavorite(city, event)}>
                                        -
                                    </button>
                                </button>
                            </li>
                        ))}
                    </ul>
                )
            }
        </div>
    )
}