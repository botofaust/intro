import React from "react";
import axios from "axios";

const inlineStyle = {
    display: 'inline',
}

function WeatherWidget({weather}) {
  return (
    <div>
      temp: {weather.main.temp}<br />
      wind: {weather.wind.speed}<br />
      { weather.dt_txt }
      { weather.name }
    </div>  
  )
}
  
class Weather extends React.Component {
  state = {
    coords: null,
    weather: null,
    forecast: null,
    error: "",
  }

  setCoords = ({ latitude, longitude }) => {
    this.setState({
      coords: {latitude: latitude, longitude: longitude}
    })
  }

  callOpenWeather = () => {
    if (this.state.coords == null) {
      this.setState({ error: "Не установлены координаты" })
    }
    const urlWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${this.state.coords.latitude}&lon=${this.state.coords.longitude}&units=metric&lang=ru&appid=4f145577e286f86edf377185d8af97c2`;
    const urlForecast = `https://api.openweathermap.org/data/2.5/forecast?lat=${this.state.coords.latitude}&lon=${this.state.coords.longitude}&cnt=3&units=metric&lang=ru&appid=4f145577e286f86edf377185d8af97c2`;
    axios.get(urlWeather)
      .then(res => {
        this.setState({ weather: res.data })
      })
      .catch(err => {
        this.setState({ error: err.message });
      });
    axios.get(urlForecast)
      .then(res => {
        this.setState({ forecast: res.data })
      })
      .catch(err => {
        this.setState({ error: err.message });
      });  
  }

  render () {
    var weather = (this.state.weather == null) ? '' : <WeatherWidget weather={this.state.weather} />;
    var forecast = [];
    if (this.state.forecast != null) {
      for (let day of this.state.forecast.list) {
        forecast.push(<WeatherWidget weather={day} />);
      }
    }
    return (
      <div style={{ display: 'block', color: 'red' }}>
        { weather }
        { forecast }
      </div>
    )
  }
}

export default Weather;
