document.addEventListener('DOMContentLoaded', () => {

    const cityInput = document.getElementById('city-input')
    const getWeatherBtn = document.getElementById('get-weather-btn')
    const weatherInfo = document.getElementById('weather-info')
    const cityName = document.getElementById('city-name')
    const temperature = document.getElementById('temperature')
    const description = document.getElementById('description')
    const errorMessage = document.getElementById('error-message')

    const API_KEY = '30ae18bb35b47c0adf5e6dfafd86f306'

    getWeatherBtn.addEventListener('click', async () => {
        const city = cityInput.value.trim()
        if (!city) return


        try {
            const weatherData = await fetchWeatherData(city)
            displayWeatherData(weatherData)
        } catch (error) {
            displayError()
        }

        cityInput.value = ''



    })

    async function fetchWeatherData(city) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error(displayError())
        }
        const data = await response.json()
        return data

    }

    function displayWeatherData(weatherData) {
        // console.log(weatherData);

        const { name, main, weather } = weatherData

        cityName.textContent = name
        temperature.textContent = `Temperature: ${main.temp}`
        description.textContent = `Description: ${weather[0].description}`

        weatherInfo.classList.remove('hidden')
        errorMessage.classList.add('hidden')
    }

    function displayError() {
        errorMessage.classList.remove('hidden')
        weatherInfo.classList.add('hidden')
    }


})