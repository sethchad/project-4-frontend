import './MealDetail.css';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button'


export default function MealDetail(props) {

  console.log('MealDetail props:', props)

  let meal = props.allMeals.find(meal => meal.id == props.match.params.id)
  let updateLink = `/meal/update/${props.match.params.id}`
  console.log('MealDetail meal:', meal)

  let ingredientList = [];
  if (meal != undefined) {
    ingredientList = meal.Ingredients.map((value,index) => {
      return (
        // <div className='ingredientItem'>
          <li className='ingredientItem' key={value.description}>{value.description}</li>
        // </div>
      )
    })
  }

  return (
    <div className='MealDetail'>
      {meal ?
        <div className='MealDetailContainer'> 
          <div className='picAndUpdate'>
            <img src={meal.imageUrl} alt={meal.name}/>
            <br />
            <Link to={updateLink}>
              <Button variant="primary">Update Details</Button>
            </Link>
          </div>
          
          <div className='mealText'>
            <h2>{meal.name}</h2>

            <h3>Ingredients</h3>
            <div className='ingredientList'>
              <ul>
                {ingredientList}
              </ul>
            </div>

            <h3>Directions</h3>
            <p className='whitespace'>{meal.directions}</p>
            
            <h3>Location</h3>
            <div className='map'>
              <p>I'll be a map one day.</p>
            </div>
          </div>

        </div>
      : null }
    </div>
  )
}