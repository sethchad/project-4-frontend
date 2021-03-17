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
      mealId: undefined
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

    console.log('updateMeal e.target:', e.target)
    console.log('updateMeal e.target.name, imageUrl, location, direction', e.target.name.value, e.target.imageUrl.value, e.target.location.value, e.target.directions.value)
    // console.log('mealId:', e.target.id)

    let mealId = e.target.id;

    const url = baseURL + 'meals/' + mealId;
    console.log('url:', url)
    let response = await axios.put(url, {
      name: e.target.name.value,
      imageUrl: e.target.imageUrl.value,
      location: e.target.location.value,
      directions: e.target.directions.value
    }); 
    
    console.log('updateMeal response:', response)
    
    await this.getAllMeals();
  }

  deleteMeal = async(e) => {
    e.preventDefault();
    console.log('deleteMeal e.target', e.target)
    
    let mealId = e.target.id;
    console.log('mealId:', mealId)

    const url = baseURL + 'meals/' + mealId
    let response = await axios.delete(url)

    console.log('deleteMeal response:', response)
    
    await this.getAllMeals();
  }

  addIngredient = async(e) => {
    e.preventDefault();
    let mealId = e.target.id;
    // console.log('mealId:', mealId)
    // console.log('addIngredient e.target.description.value:', e.target.description.value)
    
    const url = baseURL + 'meals/' + mealId + '/newingredient'
    let response = await axios.post(url, {
      description: e.target.description.value
    })
    console.log('addIngredient response:', response)
    
    await this.getAllMeals();
  }
  
  deleteIngredient = async(e) => {
    e.preventDefault();
    console.log('deleteIngredient e.target', e.target)
    
    let ingredientId = e.target.id;
    console.log('ingredientId:', ingredientId)

    const url = baseURL + 'meals/' + ingredientId + '/deleteingredient'
    let response = await axios.delete(url)

    console.log('deleteIngredient response:', response)
    
    await this.getAllMeals();
  }

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
                setMealId={this.setMealId}
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

