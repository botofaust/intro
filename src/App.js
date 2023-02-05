import React, {Component} from 'react';
import axios from 'axios';
import './App.css';

import BrowserPosition from './BrowserPosition';

const TextInput = React.forwardRef(({ name, onChange }, ref) => (
  <input type="text" ref={ref} name={name} onChange={onChange}/>
))

class App extends Component {
  constructor(props){
    super(props);
    this.positionRef = React.createRef();
    this.refGetPosition = React.createRef();
  }

  state = {
    textInput: "",
  }

  requestGismeteoPosition = () => {
    const geocodingAPI = 'http://api.openweathermap.org/geo/1.0/direct?q=' + this.positionRef.current.value + '&limit=5&appid=4f145577e286f86edf377185d8af97c2';
    axios.get(geocodingAPI)
        .then(res => {
          console.log(res);
          let result = '';
          for (let r of res.data) {
            console.log(r);
            result += r.country + ' ' + r.state + '\n';
          };
          this.setState({ textInput: result });
          console.log(result);
        })
        .catch(err => {
          // this.setState({ textInput: err.message, });
        })
  }
  
  getBrowserPosition = () => {
    this.refGetPosition.current.getPosition();
  }

  render () {
    return (
      <div className="App">
        <TextInput name="test" ref={this.positionRef} onChange={this.onInputChange}/>
        <button onClick={this.getBrowserPosition}>click</button>
        <BrowserPosition ref={this.refGetPosition}/>
        <div>{this.state.textInput}</div>
      </div>
    );
  }
}

export default App;
