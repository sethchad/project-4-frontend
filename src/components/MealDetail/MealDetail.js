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
        <div className='ingredientItem'>
          <p key={value.description}>{value.description}</p>
          {/* <Button variant="secondary">X</Button> */}
        </div>
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
        <Button variant="primary">
          <Link to={updateLink}>Update</Link>
        </Button>
        </div>
        
        <h2>{meal.name}</h2>

        <h3>Ingredients</h3>
        <div className='ingredientList'>
          {ingredientList}
        </div>

        <h2>Directions</h2>
        <p className='whitespace'>{meal.directions}</p>
        
        <h2>Location</h2>
        <div className='map'>
          <p>I'll be a map one day.</p>
        </div>
  
        </div>
      : null }
    </div>
  )
}