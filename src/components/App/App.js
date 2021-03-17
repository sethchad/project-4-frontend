import React, { Component } from 'react';
import { Switch, Link, Route } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import Header from '../Header/Header';
import Home from '../Home/Home';
import AllMeals from '../AllMeals/AllMeals';
import MealDetail from '../MealDetail/MealDetail';
import MealUpdate from '../MealUpdate/MealUpdate';
import Footer from '../Footer/Footer';

// let baseURL = 'http://localhost:3005/api/'
let baseURL = 'https://git.heroku.com/chadwick-project-4-backend.git'

// Heroku git URL 
// https://git.heroku.com/chadwick-project-4-backend.git

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
    let response = await axios.get(url);
    console.log('App API response:', response);
    
    this.setState({
      allMeals: response.data.meals
    })
    // console.log('App this.allmeals:', this.state.allMeals);
  }
  
  addMeal = async(e) => {
    e.preventDefault()
    const url = baseURL + 'meals/';
    let response = await axios.post(url, {
      name: e.target.name.value
    }); 
    await this.getAllMeals();
    // console.log('addMeal response:', response)
  }

  updateMeal = async(e) => {
    e.preventDefault()

    let mealId = e.target.id;
    const url = baseURL + 'meals/' + mealId;

    let response = await axios.put(url, {
      name: e.target.name.value,
      imageUrl: e.target.imageUrl.value,
      location: e.target.location.value,
      directions: e.target.directions.value
    }); 
    
    await this.getAllMeals();
  }

  deleteMeal = async(e) => {
    e.preventDefault();
    
    let mealId = e.target.id;
    const url = baseURL + 'meals/' + mealId
    let response = await axios.delete(url)
    
    await this.getAllMeals();
  }

  addIngredient = async(e) => {
    e.preventDefault();
    let mealId = e.target.id;
    
    const url = baseURL + 'meals/' + mealId + '/newingredient'
    let response = await axios.post(url, {
      description: e.target.description.value
    })
    
    await this.getAllMeals();
    console.log('addIngredient this.state.allMeals:', this.state.allMeals);
  }
  
  deleteIngredient = async(e) => {
    e.preventDefault();
    
    // console.log('deleteIngredient e.target:', e.target)
    // console.log('deleteIngredient ingredientId e.target.id:', e.target.id)
    // console.log('deleteIngredient mealIndex e.target.mealIndex.value:', e.target.mealIndex.value)
    // console.log('deleteIngredient ingredientIndex e.target.ingedientIndex.value:', e.target.ingredientIndex.value)
    let ingredientId = e.target.id;
    let ingredientIndex = e.target.ingredientIndex.value;
    let mealIndex = e.target.mealIndex.value;
    let allMealsCopy = this.state.allMeals;
    const url = baseURL + 'meals/' + ingredientId + '/deleteingredient';
    
    // console.log('mealIndex', mealIndex, 'ingredientIndex', ingredientIndex)
    // console.log('allMealsCopy[mealIndex]:', allMealsCopy[mealIndex]);
    
    allMealsCopy[mealIndex].Ingredients.splice(ingredientIndex, 1)
    // console.log('allMealsCopy post-splice', allMealsCopy);

    this.setState({
        allMeals: allMealsCopy
      })
    
    await axios.delete(url);
    // await this.getAllMeals();
  }

  render() {
    return (
      <div className="App">
        <Header />
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
        <Footer />
      </div>
    );
  }
}

