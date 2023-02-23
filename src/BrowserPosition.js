import React from "react";

class BrowserPosition extends React.Component {
  state = {
    latitude: null,
    longitude: null,
    error: "",
  }

  getPosition = () => {
    const geo = navigator.geolocation;
    if (!geo) {
      this.setState({
        error: 'Not support',
      });
      return;
    }
    geo.getCurrentPosition(
      (pos) => {
        this.setState({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          error: "",
        })},
      (err) => {
        this.setState({
          error: `Error ${err.code}: ${err.message}`,
        })}
    );
  }

  componentDidMount = this.getPosition();

  render () {
    return (
      <div>
        lat: {this.state.latitude}<br />
        long: {this.state.longitude}<br />
        {this.state.error}
      </div>
    );
  }
}

export default BrowserPosition;