import React from "react";
import axios from "axios";

class Weather extends React.Component {
  state = {
    coords: {},
    current: [],
    error: "",
  }

  setCoords = ({ latitude, longitude }) => {
    this.setState({
      coords: {latitude: latitude, longitude: longitude}
    })
  }

  callOpenWeather = () => {
    if (!this.state.coords) {
      this.setState({
        error: "Не установлены координаты",
      })
    }
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${this.state.coords.latitude}&lon=${this.state.coords.longitude}&units=metric&lang=ru&appid=4f145577e286f86edf377185d8af97c2`;
    axios.get(url)
      .then(res => {
        console.log(res);
        })
        .catch(err => {
          this.setState({ error: err.message, });
        })

  }

  render () {
    return (
      <div>
        {this.state.current}
        {this.state.error}
      </div>
    )
  }
}

export default Weather;
