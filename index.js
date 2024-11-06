const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data.json');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    return Recipe.deleteMany();
  })
  .then(() => {
    return Recipe.create({
      title: "RTest Recipe",
      level: "Easy Peasy",
      ingredients: [
        "2 pounds red onions, sliced salt to taste",
        "2 (16 ounce) boxes uncooked rigatoni",
        "1 tablespoon chopped fresh marjoram leaves",
        "1 pinch cayenne pepper",
        "2 tablespoons freshly grated Parmigiano-Reggiano cheese"
      ],
      cuisine: "Italian",
      dishType: "main_course",
      image: "https://images.media-allrecipes.com/userphotos/720x405/3489951.jpg",
      duration: 220,
      creator: "Chef Luigi"
    });
  })
  .then(() => {
    return Recipe.insertMany(data);
  })
  .then(recipesCreated => {
    console.log('Recipes created:', recipesCreated);
    return Recipe.findOneAndUpdate(
      {title: "Rigatoni alla Genovese"},
      {duration: 100},
      {new: true}
    )
  })
  .then(() => {
    return Recipe.deleteOne(
      {title: "Carrot Cake"}
    )
  })
  .then((deletedRecipe) => {
    console.log(deletedRecipe)
    return mongoose.connection.close(); 
  })
  .then(() => {
    console.log('Connection closed');
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

