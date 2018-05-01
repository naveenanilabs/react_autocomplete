import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
   query: '',
 }


  handleInputChange = () => {
   this.setState({
     query: this.search.value
   })
 }

  render() {
    return (
      <div className="App">
        <form>
         <input
           placeholder="Search for..."
           ref={input => this.search = input}
           onChange={this.handleInputChange}
         />
         <p>{this.state.query}</p>
       </form>
      </div>
    );
  }
}

export default App;
