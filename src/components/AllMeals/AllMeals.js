import { Link } from 'react-router-dom';
import './AllMeals.css';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function AllMeals(props) {

  if (props !== undefined) {
    console.log('AllMeals props:', props)
  }

  let mealList = props.allMeals.map((value, index) => {
    return (
        <Card className='' key={value.id} style={{ width: '16rem' }}>
          <Link to={`/meal/${value.id}`}>
          <Card.Img className='cardImg' variant="top" src={value.imageUrl} />
          <Card.Body>
            <Card.Title>{value.name}</Card.Title>
          </Card.Body>
          </Link>
        </Card>
    )
  })

  return( 
    <div className='AllMeals'>

      {/* <form onSubmit={(e) => props.addMeal(e)}>
        <input placeholder='Name of Meal' name='name' />
        <input type="submit" value="Add Meal" />
      </form> */}

      <Form className='form' onSubmit={(e) => props.addMeal(e)}>
        {/* <Form.Group> */}
          {/* <Form.Label>Add A New Meal!</Form.Label> */}
          <Form.Control placeholder="ex. Newton's Tasty Tacos" name='name'/>
        {/* </Form.Group> */}
        <button className='btn btn-primary button' type="submit">Add Meal</button>
      </Form>

      <div className='mealCardArray'>
        {mealList}
      </div>
    </div>
  )
}