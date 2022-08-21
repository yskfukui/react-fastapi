import React from 'react'
import { useState } from 'react'
import 'bulma/css/bulma.min.css'

export const WeatherApi = () => {
  const URL = 'https://weather.tsukumijima.net/api/forecast/'
  const [weather, setWeather] = useState()
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const getWeather = async () => {
    const response = await fetch(URL + 'city/011000', requestOptions)
    const data = await response.json()
    setWeather(data)
  }

  return (
    <div>
      <button className="button is-primary" onClick={getWeather}>
        GetWeather
      </button>
      {weather && (
        <table className="table is-hoverable has-text-left">
          <thead>
            <tr>
              <th>Area</th>
              <th>Weather</th>
              <th>Public Time</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{weather.title}</td>
              <td>{weather.forecasts[0].telop}</td>
              <td>{weather.publicTime}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  )
}
