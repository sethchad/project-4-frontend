import { Link } from 'react-router-dom';
import './AllMeals.css';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function AllMeals(props) {

  // if (props !== undefined) {
  //   console.log('AllMeals props:', props)
  // }

  let mealList = props.allMeals.map((value, index) => {
    return (
        <Card className='' key={value.id} style={{ width: '16rem' }}>
          <Link to={`/meal/${value.id}`}>
          <Card.Img className='cardImg' variant="top" src={value.imageUrl} />
          <Card.Body>
            <Card.Title className='cardTitle'>{value.name}</Card.Title>
          </Card.Body>
          </Link>
        </Card>
    )
  })

  return( 
    <div className='AllMeals'>

      <Form className='form' onSubmit={(e) => props.addMeal(e)}>
        <Form.Control placeholder="ex. Newton's Tasty Tacos" name='name'/>
        <Button variant="primary" type="submit">Add Meal</Button>
      </Form>

      <div className='mealCardArray'>
        {mealList}
      </div>
    </div>
  )
}