import React, { Component } from 'react'
import { Switch, Link, Route, Redirect } from 'react-router-dom'
import './App.css';
import axios from 'axios';
let baseURL = 'http://localhost:3005/api/'

export default class App extends Component {
  constructor() {
    super() 
    this.state = {
      allmeals: []
    }
  }

  componentDidMount = async() => {
    const url = baseURL + 'meals/';
    // console.log('URL is:', url)
    let response = await axios.get(url);
    console.log('App API response:', response);
    
    this.setState({
      allmeals: response.data.meals
    })
    console.log('App this.allmeals:', this.state.allmeals);
  }

  render() {
    return (
      <div className="App">
        <nav>
          <h3><Link to="/">Home</Link></h3>
          <h3><Link to="/allmeals">All Meals</Link></h3>
        </nav>
        <h1>Recipe App</h1>

      </div>
    );
  }
}

