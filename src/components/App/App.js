import React, { Component } from 'react'
import { Switch, Link, Route } from 'react-router-dom'
import axios from 'axios';

import './App.css';
import Home from '../Home/Home'
import AllMeals from '../AllMeals/AllMeals'
import MealDetail from '../MealDetail/MealDetail'

let baseURL = 'http://localhost:3005/api/'

export default class App extends Component {
  constructor() {
    super() 
    this.state = {
      allMeals: [],
    }
  }

  componentDidMount = async() => {
    await this.getAllMeals();
  }

  getAllMeals = async() => {
    const url = baseURL + 'meals/';
    // console.log('URL is:', url)
    let response = await axios.get(url);
    console.log('App API response:', response);
    
    this.setState({
      allMeals: response.data.meals
    })
    console.log('App this.allmeals:', this.state.allMeals);
  }
  
  addMeal = async(e) => {
    e.preventDefault()
    const url = baseURL + 'meals/';
    let response = await axios.post(url, {
      name: e.target.name.value
    }); 
    
    console.log('addMeal response:', response)

    await this.getAllMeals();
  }

  render() {
    return (
      <div className="App">
        <nav>
          <h3><Link to="/">Home</Link></h3>
          <h3><Link to="/allmeals">All Meals</Link></h3>
        </nav>
        <Switch>
          <Route exact path="/" component={Home} />

          <Route exact path="/allmeals">
            <AllMeals 
              allMeals={this.state.allMeals} 
              addMeal={this.addMeal} 
              />
          </Route>

          <Route 
            path="/meal/:id" component={(routerProps) => (
              <MealDetail 
                allMeals={this.state.allMeals} 
                deleteMeal={this.deleteMeal}
                addIngredient={this.addIngredient} 
                deleteIngredient={this.deleteIngredient}
                {...routerProps} 
              />
            )}
          />

        </Switch>

      </div>
    );
  }
}

