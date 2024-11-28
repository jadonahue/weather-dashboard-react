import React from 'react';
import { WeatherContext } from '../App';
import axios from 'axios';

export default function WeatherSearch() {
    const { setWeatherData, favorites, setFavorites, searchCity, setSearchCity } = React.useContext(WeatherContext);
    const [cityName, setCityName] = React.useState('');
    const [error, setError] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const inputRef = React.useRef(null);

    // Show whats being typed for input city search
    const handleInputChange = (event) => {
        setCityName(event.target.value);
    };

    // Call handleOnClick() for search button when eenter is pressed
    function handleKeyPress(event) {
        if (event.key === 'Enter') {
            handleOnClick();
        }
    }

    // Onclick search the city
    function handleOnClick() {
        if (!cityName.trim()) return; // Trim white space for city name. If blank or only whitespace return, stop executing rest.
        setSearchCity(cityName);
        setCityName(''); // Sets the name blank after searching
        inputRef.current.focus(); // Focuses input field after search
    }

    // Check if city name is in favorites
    function handleAddToFavorites() {
        if (!cityName.trim()) return; // Trim white space for city name. If blank or only whitespace return, stop executing rest.
        if (favorites.includes(cityName)) {
            alert(`${cityName} is already in your favorites!`);
        } else {
            setFavorites([...favorites, cityName]); // Keep current favorits and add new city
            setCityName(''); // Set the city input field blank after adding to favorites
            inputRef.current.focus() // Focuses input field after search
        }
    }

    // Api handling with useEffect since we are dealing with external data
    React.useEffect(() => {
        if (!searchCity) return; // If the city is not found return and dont execute anymore

        // Get external api city info
        const fetchWeatherData = async () => {
            setLoading(true) // While waiting to retireve info display loading message

            try {
                const url = `https://api.openweathermap.org/data/2.5/forecast?q=${searchCity}&appid=${import.meta.env.VITE_OPEN_WEATHER_API_KEY}&units=imperial`;
                const response = await axios.get(url);

                setWeatherData(response.data); // Set the weather data for city
                setError(null); // If there is no error set as null
            } catch (error) {
                console.log('Error fetching data:', error);
                setWeatherData(null); // If error is caught set the weather info as null
                setError('City is not found. Please try another city.'); // If error is caught set error message.
            } finally {
                setLoading(false); // set the loading to false once complete
            }
        };

        fetchWeatherData(); // Call fetchWeatherData
    }, [searchCity]);

    return (
        <>
            <div className="city-search">
                <input
                    type="text"
                    placeholder='Input City...'
                    onChange={handleInputChange}
                    onKeyDown={handleKeyPress}
                    value={cityName}
                    ref={inputRef}
                />
                <button onClick={() => handleOnClick(cityName)}>Search</button>
                <button onClick={handleAddToFavorites}>Add To Favorites</button>
            </div>
            {loading && <h2>Loading weather data...</h2>}
            {error ? <p>{error}</p> : <h2>{searchCity.toUpperCase()}</h2>}
        </>
    );
}
