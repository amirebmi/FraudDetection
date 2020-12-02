"use strict";

const MongoClient = require("mongodb").MongoClient;


let recipes = [
{
    name: "General Tso's Cauliflower",
    yield: 4,
    ingredient: ["1/4 cup all-purpose flour",
        "1/4 teaspoon freshly ground pepper", 
        "1 pound beef stewing meat, trimmed and cut into inch cubes",
        "1 potato", 
        "2 tablespoons red wine vinegar",
        "1 cup red wine",
        "3 1/2 cups beef broth, homemade or low-sodium canned"],

    direction: ["Combine the flour and pepper in a bowl, add the beef and toss to coat well. Heat 3 teaspoons of the oil in a large pot. Add the beef a few pieces at a time; do not overcrowd. Cook, turning the pieces until beef is browned on all sides, about 5 minutes per batch; add more oil as needed between batches."
                ,"Remove the beef from the pot and add the vinegar and wine. Cook over medium-high heat, scraping the pan with a wooden spoon to loosen any browned bits. Add the beef, beef broth and bay leaves. Bring to a boil, then reduce to a slow simmer.",
                "Cover and cook, skimming broth from time to time, until the beef is tender, about 1 1/2 hours. Add the onions and carrots and simmer, covered, for 10 minutes. Add the potatoes and simmer until vegetables are tender, about 30 minutes more. Add broth or water if the stew is dry. Season with salt and pepper to taste. Ladle among 4 bowls and serve."]

},
{
    name: "Vegan Biscuits",
    yield: 12,
    ingredient: ["1 1/2 sticks (12 tablespoons) vegan butter, cut into 1/2-inch pieces",
        "2 cups all-purpose flour, plus more for dusting (see Cook's Note)",
        "2 scallions, trimmed and thinly sliced",
        "1 tablespoon baking powder",
        "1 teaspoon kosher salt",
        "1/4 teaspoon baking soda",
        "1/2 teaspoon coarsely ground black pepper, plus more for topping",
        "2/3 cup unsweetened unflavored almond milk",
        "1 teaspoon fresh lemon juice"],
    direction: ["Preheat the oven to 400 degrees F. Line a rimmed baking sheet with parchment.",
        "Place 10 tablespoons of the vegan butter in a small bowl, then freeze until solid, about 10 minutes.",
        "Meanwhile, whisk the flour, scallions, baking powder, salt, baking soda and pepper in a large bowl until combined. Add the frozen vegan butter, then use a pastry cutter or fork to mix in the butter until only even, pea-size pieces remain. Gently stir in the almond milk and lemon juice to make a loose, shaggy dough.",
        "Turn the dough out onto a work surface that’s lightly dusted with flour, then pat into a 7-inch square that's about 3/4-inch thick. Fold in half from left to right, like a book, then fold in half again from top to bottom, so it’s now 1/4 of the original size. Pat the dough again into a 7-inch square. ",
        "Use a sharp chef's knife to cut the dough into 12 even rectangular pieces, then transfer to the prepared baking sheet, spacing 2 inches apart. Melt the remaining 2 tablespoons vegan butter in a small microwave-safe bowl on high, 30 to 60 seconds, then brush onto the top of each piece with a pastry brush. Sprinkle with more pepper. Bake until the biscuits are puffed and lightly browned, 15 to 20 minutes. Serve warm or at room temperature."
    ]
}];





let dbUsername = "cs5220stu07";
let dbPassword = "AvVSayOAy6Aq";
let dbUrl = `mongodb://${dbUsername}:${dbPassword}@cs3.calstatela.edu:4042/${dbUsername}`;

async function run() {
    let client = await MongoClient.connect(dbUrl, { useUnifiedTopology: true });
    let db = client.db("cs5220stu07");

    // Drop recipes collection if exists
    db.collection("recipes").drop(function (err, delOK){
        console.log("Deleted");
    });

    // Insert recipes into the database
    let collection = await db.collection("recipes");
    await collection.insertMany(recipes);


    await collection.createIndex({
        name: "text"
    });

    // Find
    // const cursor = await db.collection.find({ingredient:{"$regex": "potato", "$option": "i"}});
    // await cursor.forEach(function (cr){
    //     console.log(cr.name);
    // });

    let r = db.recipes.find({
        $and: [
            {ingredients: "potato"},
            {ingredients: "beef"}
        ]
    })




    await client.close();
  }
  
  run();