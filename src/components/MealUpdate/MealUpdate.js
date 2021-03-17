import './MealUpdate.css';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


export default function MealUpdate(props) {

  // console.log('MealUpdate props:', props)

  let meal = props.allMeals.find(meal => meal.id == props.match.params.id);
  // console.log('MealUpdate meal:', meal);

  let mealIndex = props.allMeals.findIndex(meal => meal.id == props.match.params.id)
  // console.log('MealUpdate mealIndex:', mealIndex);


  // Creates the list of ingredients, used as a variable below
  let ingredientList = [];
  if (meal !== undefined) {
    ingredientList = meal.Ingredients.map((value,index) => {
      return (
        <div key={index} className='ingredientItem'>
          <p>{value.description}</p>
          <form id={value.id} onSubmit={(e) => props.deleteIngredient(e)}>
            <input type='hidden' name='mealIndex' value={mealIndex} />
            <input type='hidden' name='ingredientIndex' value={index} />
            <Button 
              variant="secondary" 
              type="subit"
            >X
            </Button>
          </form>
        </div>
      )
    })
  }

  return (
    <div className='MealUpdate'>
      {meal ?
      <div className='MealUpdateContainer'> 
          <h3 className='mealName'>{meal.name}</h3>
        <div className="mealUpdateHeader">
          <Link to={`/meal/${meal.id}`}>
            <Button className='button' variant="success">Back</Button>
          </Link>
          <Button className='button'
            variant="danger" 
            id={meal.id}
            onClick={(e) => props.deleteMeal(e) && props.history.push('/allmeals')}
          >Delete Meal
          </Button>
        </div>
        <div className='entryForms'>

          <div className='mealDetailForm'>
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
                <Form.Label>Location (ex. Colorado Springs, Colorado)</Form.Label>
                <Form.Control defaultValue={meal.location} name='location' />
              </Form.Group>
              <Form.Group>
                <Form.Label>Cooking Directions</Form.Label>
                <Form.Control as="textarea" rows={5} defaultValue={meal.directions} name='directions' />
              </Form.Group>
              <Button variant="primary" type="submit">
                Update
              </Button>
            </Form>
          </div>

          <div className='ingredientList'>
          <Form id={meal.id} onSubmit={(e) => props.addIngredient(e)}>
            <Form.Group>
              <Form.Label>Add A New Ingredient</Form.Label>
              <Form.Control placeholder='ex: 1 tsp salt' name='description'/>
            </Form.Group>
            <Button variant="primary" type="submit">Add</Button>
          </Form>
          <br />
          {ingredientList}
          </div>

        </div>  

      </div>
      : null }
    </div>
  )
}

