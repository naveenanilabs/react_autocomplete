import React from 'react';
import axios from 'axios'
// import logo from './logo.svg';
import './App.css';
import * as Multi from './MultiSelect.js';
import * as Config from './apiPath.js';


class App extends React.Component {

  constructor(props) {
  super(props);
  this.state = {
      query: '',
      data: [],
      value: 'select',
      selectedData: []
    };

  }

  componentDidMount(){
    // console.log("did.state.data")
    // console.log(this.state.data) 
  }

  componentWillMount(){
    let component = this;
    const request =   axios.get(Config.GET_MOVIES_API_PATH);
    request.then(function (response) {
      // console.log("response.data.data")
      // console.log(response.status)
      // console.log(response.data.Search)
      if(response.status === 200){
        component.setState({data: response.data.Search.map(item => ({ label: item.Title, value: item.Title, imdbID: item.imdbID})) 
        })
        Multi.autocomplete(document.getElementById("myInput"), component.state.data, (success, k) => {
          component.setState({selectedData: k})
        });
      }
    })
    .catch(function (error) {
    
    });
  }

  render() {
    const multiSelected = this.state.selectedData.map( (item, index) => {
                    return (   <div key={index}>{item.label},{item.imdbID} </div>)
                  });
    // console.log("harpreet")

    // console.log(this.state.data)
    return (
      <div className="App">
        <form autoComplete="off" action="/action_page.php">
          <div className="autocomplete" id="autocomplete_div" style ={{width:"100%"}}>
            <input id="myInput" type="text" name="myCountry" />
          </div>
          
        </form>
      </div>
    );
  }
}

export default App;
