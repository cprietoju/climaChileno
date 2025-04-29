import React, { useState } from "react"
import Navbar from "../src/components/NavBar"
import MainWeatherCard from "../src/components/MainWeatherCard"
import FiveDayForecast from "../src/components/FiveDay"
import TodayHighlights from "../src/components/TodayHighlights"
import CircularProgressWithLabel from "../src/utilities/CircularProgressWithLabel"
import WeatherSummary from "../src/components/WeatherSummary"
import axios from "axios"
import { useSnackbar } from 'notistack'

const WeatherDashboard = () => {
  const [weatherData, setWeatherData] = useState(null)
  const [airQualityData, setAirQualityData] = useState(null)
  const [fiveDayForecast, setFiveDayForecast] = useState(null)
  const [hourlyTemperatures, setHourlyTemperatures] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const rainProbability = fiveDayForecast?.list?.[0]?.pop
    ? `${Math.round(fiveDayForecast.list[0].pop * 100)}%`
    : '0%'
  const firstForecast = fiveDayForecast?.list?.[0];
  const nextPop = firstForecast?.pop ?? null;
  const nextForecastHour = firstForecast?.dt ? new Date(firstForecast.dt * 1000).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }) : null;

  const maxTempEntry = fiveDayForecast?.list?.reduce((max, current) =>
    current.main.temp > (max?.main?.temp ?? -Infinity) ? current : max, null
  )
  const minTempEntry = fiveDayForecast?.list?.reduce((min, current) =>
    current.main.temp < (min?.main?.temp ?? Infinity) ? current : min, null
  )

  const maxTemp = maxTempEntry ? Math.round(maxTempEntry.main.temp) : 'No disponible'
  const minTemp = minTempEntry ? Math.round(minTempEntry.main.temp) : 'No disponible'

  const { enqueueSnackbar } = useSnackbar()
  const API_KEY = '4b57a604a3e4683fe04218175b3e1e13'

  const fetchAirQualityData = (lat, lon) => {
    axios.get(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
      .then(response => setAirQualityData(response.data.list[0]))
      .catch(error => console.error('Error fetching the air quality data:', error))
  }

  const fetchWeatherData = (cityOrLat, lon = null) => {
    setIsLoading(true)
    setWeatherData(null)
    setAirQualityData(null)
    setFiveDayForecast(null)

    let weatherUrl, forecastUrl;

    if (lon !== null) {
      weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${cityOrLat}&lon=${lon}&units=metric&appid=${API_KEY}`
      forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${cityOrLat}&lon=${lon}&units=metric&appid=${API_KEY}`
    } else {
      weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityOrLat},CL&units=metric&appid=${API_KEY}`
      forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityOrLat},CL&units=metric&appid=${API_KEY}`
    }

    fetch(weatherUrl)
      .then(response => response.json())
      .then(data => {
        if (data.cod !== 200 || data.sys?.country !== "CL") {
          enqueueSnackbar("Solo puedes buscar ciudades Chilenas.", { variant: "error" })
          setIsLoading(false)
          return
        }

        setWeatherData(data)
        fetchAirQualityData(data.coord.lat, data.coord.lon)

        axios.get(forecastUrl)
          .then(response => {
            setFiveDayForecast(response.data)
            extractHourlyTemperatures(response.data)
            setIsLoading(false)
          })
          .catch(error => {
            console.error('Error fetching the 5-day forecast data:', error)
            setIsLoading(false)
          })
      })
      .catch(error => {
        console.error('Error fetching the weather data:', error)
        setIsLoading(false)
      })
  }

  const extractHourlyTemperatures = (forecastData) => {
    if (!forecastData?.list) return;

    const hourlyMap = new Map();

    forecastData.list.forEach(entry => {
      const date = new Date(entry.dt * 1000);
      const hour = date.getHours();

      if (!hourlyMap.has(hour)) {
        hourlyMap.set(hour, {
          time: date.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false // Esto fuerza el formato 24h
          }),
          temp: Math.round(entry.main.temp),
          description: entry.weather?.[0]?.description || null
        });
      }
    });

    const filteredHours = Array.from(hourlyMap.entries())
      .filter(([, entry]) => entry.temp !== 'No disponible')
      .sort(([aHour], [bHour]) => aHour - bHour)
      .map(([, entry]) => entry);

    setHourlyTemperatures(filteredHours);
  };

  const handleSearch = (searchedCity) => {
    fetchWeatherData(searchedCity)
  }

  const handleCurrentLocationSearch = ({ latitude, longitude }) => {
    fetchWeatherData(latitude, longitude)
  }

  const handleUpdateWeather = () => {
    if (weatherData) {
      const { lat, lon } = weatherData.coord
      fetchWeatherData(lat, lon)
    }
  }

  return (
    <div style={{ marginLeft: "0px" }}>
      <Navbar onSearch={handleSearch} onCurrentLocationSearch={handleCurrentLocationSearch} />
      {isLoading ? (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '100px' }}>
          <CircularProgressWithLabel />
        </div>
      ) : (
        weatherData && airQualityData && (
          <div style={{ display: "flex", flexDirection: "column", padding: "30px", gap: "20px" }}>
            <div style={{ display: "flex", gap: "20px" }}>
              <div style={{ flex: "1" }}>
                <MainWeatherCard weatherData={weatherData} onUpdateWeather={handleUpdateWeather} maxTemp={maxTemp} minTemp={minTemp} rainProbability={rainProbability} nextPop={nextPop} nextForecastHour={nextForecastHour} />
              </div>
              <div style={{ flex: "1", marginLeft: "0px" }}>
                <TodayHighlights weatherData={weatherData} airQualityData={airQualityData} />
              </div>
            </div>
            <div style={{ marginTop: "-645px" }}>
              <p style={{ fontWeight: "700", fontSize: "20px", fontFamily: "Arial", marginLeft: "1350px", position: 'relative', top: '25px' }}>Siguientes 4 días:</p>
              {fiveDayForecast && (
                <>
                  <FiveDayForecast forecastData={fiveDayForecast} maxTemp={maxTemp} minTemp={minTemp} />
                </>
              )}
            </div>
            <div style={{ marginTop: "0px" }}>
              <WeatherSummary hourlyTemperatures={hourlyTemperatures} weatherData={weatherData} nextPop={nextPop} nextForecastHour={nextForecastHour}/>
            </div>
          </div>
        )
      )}
    </div>
  )
}

export default WeatherDashboard
