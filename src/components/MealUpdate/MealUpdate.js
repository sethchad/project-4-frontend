import './MealUpdate.css';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


export default function MealUpdate(props) {

  console.log('MealUpdate props:', props)

  let meal = props.allMeals.find(meal => meal.id == props.match.params.id)
  // let updateLink = `/meal/update/${props.match.params.id}`
  console.log('MealUpdate meal:', meal)

  // props.setMealId(meal.id);

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
        <h3 className='mealName'>{meal.name}</h3>
        
        {/* <form id={meal.id} onSubmit={(e) => props.updateMeal(e)}>
          <input defaultValue={meal.name} name='name' />
          <br />
          <input defaultValue={meal.imageUrl} name='imageUrl' />
          <br />
          <input defaultValue={meal.location} name='location' />
          <br />
          <textarea defaultValue={meal.directions} name='directions' />
          <br />
          <input id={meal.id} type="submit" value="Update Meal" />
          <br />
        </form>
        <br /> */}
        
        <Form id={meal.id} onSubmit={(e) => props.updateMeal(e)}>
          <Form.Group>
            <Form.Label>Meal Name</Form.Label>
            <Form.Control defaultValue={meal.name} name='name' />
          </Form.Group>
          <Form.Group>
            <Form.Label>Image URL</Form.Label>
            <Form.Control defaultValue={meal.imageUrl} name='imageUrl' />
          </Form.Group>
          <Form.Group>
            <Form.Label>Location</Form.Label>
            <Form.Control defaultValue={meal.location} name='location' />
          </Form.Group>
          <Form.Group>
            <Form.Label>Directions</Form.Label>
            <Form.Control as="textarea" rows={5} defaultValue={meal.directions} name='directions' />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit Updates
          </Button>
        </Form>
        <br />

        <div className='ingredientList'>
        <h3>Ingredient List</h3>
        <Form id={meal.id} onSubmit={(e) => props.addIngredient(e)}>
          <Form.Group>
            <Form.Label>Add A New Ingredient</Form.Label>
            <Form.Control placeholder='ex: 1 tsp salt' name='description'/>
          </Form.Group>
          <Button variant="primary" type="submit">Submit</Button>
        </Form>
            {ingredientList}
        </div>
      </div>
      : null }
    </div>
  )
}