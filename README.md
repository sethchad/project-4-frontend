# Project 4 - Full Stack App - Recipe Book

This application is an online recipe book, allowing the user to add, edit, and delete meals along with their instructions, ingredients, and other details.  

This is a full stack app that consists of a Node/Express backend connected to a Postgres database serving as the API, and React frontend. This app has full CRUD functionality, and both the backend and frontend are deployed on Heroku. 

## Deployed App Links
- [Deployed App Frontend - Heroku](https://chadwick-project-4-frontend.herokuapp.com/)
- [Deployed App Backend - Heroku](https://chadwick-project-4-backend.herokuapp.com/)
- [Repo for Backend Code](https://github.com/sethchad/project-4-backend)

## Screenshots

![](https://i.imgur.com/iJAWaUb.png)

![](https://i.imgur.com/tLcr97B.png)

## Technologies Used 
- Node.js
- Express
- Sequelize
- Postgres
- React 
- React Router
- React Bootstrap
- Axios 

All dependencies can be installed using the CLI command ```npm install``` in both the frontend and backend root diretories.  

## Component Structure 
- App 
  - Header
  - Switch
      * Home
      * AllMeals
      * MealUpdate
      * MealDetails
  - Footer

## Wireframes 

  [Home, AllMeals, & MealDetail Components](/planning/IMG_8206.jpg)
  
  [MealUpdate Component](/planning/IMG_8207.jpg)


  ## User Stories
  - As a user, I want to be able to have all of my recipes in one place, so I don't have to go to different websites or cookbooks. 
  - As a user, I want to be able to add the name of a new recipe to the list, so I can find it again later.  
  - As a user, I want to be able to add a picture of a recipe, so I can find it easier when I look for it, and know what it should look like when it's done. 
  - As a user, I want to see the pictures of all of my recipes on one page, so I don't have to click through different pages or tabs. 
  - As a user, I want to be able add the cooking directions, so I know how to prepare the food. 
  - As a user, I want to be able to add a location to a meal item, so I know where I ate it first, or where it originated. 
  - As a user, I want to be able to add and delete ingredients, so I can know what I need to make it, and remove ones I don't use. 
  - As a user, I want to be able to update the details of a recipe, so I can change something if I cook it differently, or I find a better picture of it. 
  - As a user, I want to be able to delete a recipe, if I decide I don't like it anymore. 
  - As a user, I want to be able to see my recipes on my phone, so I don't need my computer when I cook. 

## Major Hurdles
One feature that required significant debugging was the 'delete ingredient' function on the MealUpdate component. Adding an ingredient behaved as expected, with the new item showing up on the page when the 'add' button on the form was clicked. The 'delete' button however did not cause the component to rerender, and the update (the ingredient list with the item removed) only occured when the page was refreshed. Since this would not be intuitive to a user, it had to be fixed. 

After multiple attempts to force the component to rerender in different ways, ultimately I changed the 'X' next to the ingredient item to a form with hidden input fields so that I could pass the index numbers of the meal and the ingredients in their respective arrays back to the delete function in the App component, in addition to the ingredient's id number, which was the only value needed for the axios delete call. I used the indexes to update the list of meals and ingredients in this.state prior to the axios call, which resolved the issue. 

## Future Development
Future releases could include adding a third party API call to Google Maps or Leaflet to use the 'Location' attribute of a meal to render a map on the meal detail page. This would be convenient if the user had a meal at a particular restaurant and wanted to see a map without going to another app, or if a meal was from a specific region or city. 