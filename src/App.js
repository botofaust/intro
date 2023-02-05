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

  magic = () => {
    const pos = this.refBrowserPosition.current.state;
    console.log(pos);
    this.refWeather.current.setCoords({latitude: pos.latitude, longitude: pos.longitude});
    this.refWeather.current.callOpenWeather();
  }
  
  getBrowserPosition = () => {
    this.refBrowserPosition.current.getPosition();
  }

  render () {
    return (
      <div className="App">
        <TextInput name="test" ref={this.positionRef} onChange={this.onInputChange} />
        <button onClick={this.magic}>click</button>
        <BrowserPosition ref={this.refBrowserPosition} />
        <Weather ref={this.refWeather} />
        <div>{this.state.textInput}</div>
      </div>
    );
  }
}

export default App;
