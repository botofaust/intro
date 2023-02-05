import React from "react";

class BrowserPosition extends React.Component {
  state = {
    latitude: null,
    longitude: null,
    error: null,
  }

  onSuccess = (pos) => {
    this.setState({
      latitude: pos.coords.latitude,
      longitude: pos.coords.longitude,
    })
  }

  onError = (err) => {
    this.setState({
      error: `Error ${err.code}: ${err.message}`,
    })
  }

  getPosition = () => {
    const geo = navigator.geolocation;
    if (!geo) {
      this.setState({
        error: 'Not support',
      });
      return;
    }
    geo.getCurrentPosition(this.onSuccess, this.onError);
  }

  componentDidMount = this.getPosition();

  render () {
    return (
      <div>
        lat: {this.state.latitude}<br />
        long: {this.state.longitude}<br />
        error: {this.state.error}<br />
      </div>
    );
  }
}

export default BrowserPosition;