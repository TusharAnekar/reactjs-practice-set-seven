import { useEffect, useState } from "react"
import { fakeFetch } from "../apis/fakeFetchOne"

export function Weather() {

    const [weather, setWeather] = useState({})
    const [unitOfTemperature, setUnitOfTemperature] = useState("Celcius")
    const [errorMessage, setErrorMessage] = useState({})
    async function getWeatherData() {
        try {
            const { status, data } = await fakeFetch('https://example.com/api/weather')
            setErrorMessage({})
            if (status === 200)
                setWeather(data)
        } catch (error) {
            setWeather({})
            setErrorMessage(error)
        }
    }

    useEffect(() => {
        getWeatherData()
    }, [])

    function handleSwitch() {
        console.log(unitOfTemperature)
        if (unitOfTemperature === "Celcius") {
            weather.temperature = Math.round((weather.temperature * 9 / 5) + 32)
            setUnitOfTemperature("Fahrenheit")
        } else {
            weather.temperature = Math.round(((weather.temperature - 32) * 5) / 9)
            setUnitOfTemperature("Celcius")
        }
    }

    return (
        <>
            <h1>Weather in Celsius and Fahrenheit</h1>
            {!weather.temperature && !errorMessage.status && <p>Loading...</p>}
            {errorMessage.status && <p>{errorMessage.message}</p>}
            {
                weather.temperature &&
                <div>
                    <p>Temperature: {weather.temperature}{unitOfTemperature === "Celcius" ? "°C" : "°F"}</p>
                    <p>Humidity: {weather.humidity}%</p>
                    <p>Wind Speed: {weather.windSpeed} km/hr</p>
                    <button onClick={handleSwitch}>Switch to {unitOfTemperature === "Celcius" ? "Celcius" : "Fahrenheit"}</button>
                </div>
            }
        </>
    )
}