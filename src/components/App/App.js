import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import Header from '../Header/Header';
import Home from '../Home/Home';
import AllMeals from '../AllMeals/AllMeals';
import MealDetail from '../MealDetail/MealDetail';
import MealUpdate from '../MealUpdate/MealUpdate';
import Footer from '../Footer/Footer';

let baseURL = 'https://chadwick-project-4-backend.herokuapp.com/api/'

export default class App extends Component {
  constructor() {
    super() 
    this.state = {
      allMeals: [],
      // mealId: undefined
    }
  }

  componentDidMount = async() => {
    await this.getAllMeals();
  }

  getAllMeals = async() => {
    const url = baseURL + 'meals/';
    let response = await axios.get(url);
    
    this.setState({
      allMeals: response.data.meals
    })
  }
  
  addMeal = async(e) => {
    e.preventDefault()
    const url = baseURL + 'meals/';
    let response = await axios.post(url, {
      name: e.target.name.value
    }); 
    await this.getAllMeals();
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
  }
  
  deleteIngredient = async(e) => {
    e.preventDefault();
    let ingredientId = e.target.id;
    let ingredientIndex = e.target.ingredientIndex.value;
    let mealIndex = e.target.mealIndex.value;
    let allMealsCopy = this.state.allMeals;
    const url = baseURL + 'meals/' + ingredientId + '/deleteingredient';
    
    allMealsCopy[mealIndex].Ingredients.splice(ingredientIndex, 1)

    this.setState({
        allMeals: allMealsCopy
      })
    
    await axios.delete(url);
  }

  render() {
    return (
      <div className="App">
        <div className='wrapper'>
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
          <div className='push'></div>
        </div>
        <Footer />
      </div>
    );
  }
}

