import './MealUpdate.css';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button'


export default function MealUpdate(props) {

  console.log('MealUpdate props:', props)

  let meal = props.allMeals.find(meal => meal.id == props.match.params.id)
  // let updateLink = `/meal/update/${props.match.params.id}`
  console.log('MealUpdate meal:', meal)

  let ingredientList = [];
  if (meal != undefined) {
    ingredientList = meal.Ingredients.map((value,index) => {
      return (
        <div className='ingredientItem'>
          <p key={value.description}>{value.description}</p>
          <Button variant="secondary">X</Button>
        </div>
      )
    })
  }

  return (
    <div className='MealUpdate'>
      {meal ?
      <div className='MealUpdateContainer'> 
        {/* <div className='picAndUpdate'> */}
        {/* <img src={meal.imageUrl} /> */}
        {/* <br />
        <Button variant="primary">
          <Link to={updateLink}>Update</Link>
        </Button> */}
        {/* </div> */}
        <h3>{meal.name}</h3>
        
        <form onSubmit={(e) => props.updateMeal(e)}>
          <input placeholder={meal.name} name='name' />
          <br />
          <input placeholder={meal.imageUrl} name='imageUrl' />
          <br />
          <input placeholder={meal.location} name='location' />
          <br />
          <input placeholder={meal.directions} name='directions' />
          <br />
          <input type="submit" value="Update Meal" />
          <br />
        </form>
        <br />
        
        <h3>Ingredient List</h3>
        <div className='ingredientList'>
            {ingredientList}
        </div>
      </div>
      : null }
    </div>
  )
}