import React, {Component} from 'react';
import './App.css';

import BrowserPosition from './BrowserPosition';
import Weather from './Weather';

const TextInput = React.forwardRef(({ name, onChange }, ref) => (
  <input type="text" ref={ref} name={name} onChange={onChange}/>
))

class App extends Component {
  constructor(props){
    super(props);
    this.refWeather = React.createRef();
    this.refBrowserPosition = React.createRef();
  }

  state = {
    textInput: "",
  }

  setPosition = () => {
    const pos = this.refBrowserPosition.current.state;
    this.refWeather.current.setCoords({latitude: pos.latitude, longitude: pos.longitude});
  }

  callOpenWeather = () => {
    this.refWeather.current.callOpenWeather();
  }
  
  getBrowserPosition = () => {
    this.refBrowserPosition.current.getPosition();
  }

  render () {
    return (
      <div className="App">
        <TextInput name="test" ref={this.positionRef} onChange={this.onInputChange} />
        <button onClick={this.setPosition}>set pos</button>
        <button onClick={this.callOpenWeather}>weather</button>
        <BrowserPosition ref={this.refBrowserPosition} />
        <Weather ref={this.refWeather} />
        <div>{this.state.textInput}</div>
      </div>
    );
  }
}

export default App;
