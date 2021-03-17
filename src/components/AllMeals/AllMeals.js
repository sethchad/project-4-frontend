import { Link } from 'react-router-dom'
import './AllMeals.css'
import Card from 'react-bootstrap/Card'

export default function AllMeals(props) {

  if (props !== undefined) {
    console.log('AllMeals props:', props)
  }

  let mealList = props.allMeals.map((value, index) => {
    return (
        <Card className='card' key={value.id} style={{ width: '16rem' }}>
          <Link to={`/meal/${value.id}`}>
          <Card.Img variant="top" src={value.imageUrl} />
          <Card.Body>
            <Card.Title>{value.name}</Card.Title>
          </Card.Body>
          </Link>
        </Card>
    )
  })

  return( 
    <div className='AllMeals'>
      <h2>All Meals</h2>

      <form onSubmit={(e) => props.addMeal(e)}>
        <input placeholder='Name of Meal' name='name' />
        <input type="submit" value="Add Meal" />
      </form>

      <div className='mealCardArray'>
        {mealList}
      </div>
    </div>
  )
}