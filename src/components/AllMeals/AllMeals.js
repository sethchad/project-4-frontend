import { Link } from 'react-router-dom'
import './AllMeals.css'

export default function AllMeals(props) {

  if (props !== undefined) {
    console.log('AllMeals props:', props)
  }

  let mealList = props.allMeals.map((value, index) => {
    return (
        <li key={value.id}>
          <Link to={`/meal/${value.id}`}>{value.name}</Link>
          {/* <button key={`button-${value.id}`} 
            // onClick={props.deleteMeal}
            >Delete
            </button> */}
        </li>
    )
  })

  return( 
    <div className='AllMeals'>
      <h2>All Meals</h2>
      <form onSubmit={(e) => props.addMeal(e)}>
        <input placeholder='Name of Meal' name='name' />
        <input type="submit" value="Add Meal" />
      </form>
      <ul>{mealList}</ul>
    </div>
  )
}