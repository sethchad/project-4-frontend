import React, { Component } from 'react'
import { Switch, Link, Route } from 'react-router-dom'
import axios from 'axios';

import './App.css';
import Home from '../Home/Home'
import AllMeals from '../AllMeals/AllMeals'
import MealDetail from '../MealDetail/MealDetail'
import MealUpdate from '../MealUpdate/MealUpdate'

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
  
  updateMeal = async(e) => {
    e.preventDefault()

    // console.log('updateMeal e.target:', e.target)
    // console.log('updateMeal e.target[0]:', e.target[0])
    console.log('updateMeal e.target.location.value:', e.target.location.value)

    // let mealId = parseInt(e.target.mealId.value);
    // console.log('mealId:', e.target.mealId.value)

    // const url = baseURL + 'meals/' + mealId;
    // let response = await axios.post(url, {
    //   name: e.target.name.value,
    //   imageUrl: e.target.image.value,
    //   location: e.target.location.value
    // }); 
    
    // console.log('updateMeal response:', response)
    
    // await this.getAllMeals();
  }

  // deleteMeal = async (e) => {
  //   e.preventDefault();
  //   let mealId = parseInt(e.target.id);
  //   let arrayIndex = e.target.getAttribute("arrayindex");

  //   await axios.delete(`${backendUrl}/meals/${mealId}`);


  render() {
    return (
      <div className="App">
        <div className='Header'>
          <h3>Recipe Tracker</h3>
          <h4><Link to="/">Home</Link></h4>
          <h4><Link to="/allmeals">All Meals</Link></h4>
        </div>
        <Switch>
          <Route exact path="/" component={Home} />

          <Route exact path="/allmeals">
            <AllMeals 
              allMeals={this.state.allMeals} 
              addMeal={this.addMeal} 
              />
          </Route>

          <Route 
            path="/meal/update/:id" component={(routerProps) => (
              <MealUpdate 
                allMeals={this.state.allMeals} 
                updateMeal={this.updateMeal}
                deleteMeal={this.deleteMeal}
                addIngredient={this.addIngredient} 
                deleteIngredient={this.deleteIngredient}
                {...routerProps} 
              />
            )}
          />

          <Route 
            path="/meal/:id" component={(routerProps) => (
              <MealDetail 
                allMeals={this.state.allMeals} 
                updateMeal={this.updateMeal}
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

