import './MealDetail.css';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button'


export default function MealDetail(props) {

  console.log('MealDetail props:', props)

  let meal = props.allMeals.find(meal => meal.id == props.match.params.id)
  let updateLink = `/meal/update/${props.match.params.id}`
  console.log('MealDetail meal:', meal)

  let ingredientList = meal.Ingredients.map((value,index) => {
    return (
      <div className='ingredientItem'>
        <p key={value.description}>{value.description}</p>
        {/* <Button variant="secondary">X</Button> */}
      </div>
    )
  })

  return (
    <div className='MealDetail'>
      <div className='picAndUpdate'>
      <img src={meal.imageUrl} />
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
      <p>{meal.directions}</p>
      {/* <form onSubmit={(e) => props.updateMeal(e)}>
        <input placeholder={meal.name} name='name' />
        <br />
        <input placeholder={meal.imageUrl} name='imageUrl' />
        <br />
        <input placeholder={meal.location} name='location' />
        <br />
        <input type="submit" value="Update Meal" />
        <br />
      </form> */}
    </div>
  )
}