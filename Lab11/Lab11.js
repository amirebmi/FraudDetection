"use strict";

const MongoClient = require("mongodb").MongoClient;

let recipes = [{
    name: "Garlic-Butter Steak",
    yield: 3,
    ingredients: ["1 pound beef flat iron steak", "2 tablespoons butter", "1 teaspoon minced fresh parsley", "1/4 teaspoon reduced-sodium soy sauce"],
    directions: ["Mix 1 tablespoon butter, parsley, garlic and soy sauce.", 
                "Sprinkle steak with salt and pepper.",
                "Add steak; cook until meat reaches desired doneness (for medium-rare, a thermometer should read 135°; medium, 140°; medium-well, 145°), 4-7 minutes per side"]
},
{
    name: "Beef Stroganoff",
    yield: 4,
    ingredients: ["1 pound mushrooms", "2 pounds beef", "250 gram butter", "Egg noodle", "1 pound potato"],
    directions: ["heat the water for your pasta to cook, then cook the pasta until al dente and drain", 
                "While the pasta water is heating, sauté the steak in a single layer (you may need to do this in two batches) until browned, then transfer to a clean plate.",
                "Next, in that same pan, sauté the onions, mushrooms and garlic until browned.",
                "whisk together the beef stock, Worcestershire sauce and flour.  Then pour the mixture into the sauté pan and let it simmer for a bit, add in the steak and Greek yogurt, and season with salt and pepper as needed"]  
}
];


let dbUsername = "cs5220stu07";
let dbPassword = "AvVSayOAy6Aq";
let dbUrl = `mongodb://${dbUsername}:${dbPassword}@cs3.calstatela.edu:4042/${dbUsername}`;

async function run() {
    let client = await MongoClient.connect(dbUrl, { useUnifiedTopology: true });
    let db = client.db("cs5220stu07");

    // Drop recipes collection
    db.collection("recipes").drop(function (err, delOK){
    });

    // Insert recipes into the database
    let collection = await db.collection("recipes");
    await collection.insertMany(recipes);


    

    // 1. Query the database for recipes that use the ingredients "beef" and "potato". 
    // Print out the id and name of the recipes found.
    const query = {
        $and: [{
        ingredients: { $regex: /potato/ }
        },
        {
        ingredients: { $regex: /beef/ }
        }
        ]};
        console.log("This recipe includes 'Beef' and 'Potato' --> \n");
    const cursor1 = collection.find(query, {_id:1,name:1});
        await cursor1.forEach(function (result){
            console.log("Id: " + result._id + "\nName of the recipe: " + result.name);
        });

    // 2. Query the database for recipes whose names include the word "Steak". 
    // Print out the id and name of the recipes found. You must use Text Search for this query. 
    // You can create the necessary text index outside the program.
    await collection.createIndex({
        name: "text"
    });

    console.log("\n");

    // test
    let amir = "steak";
    console.log("This recipe's name includes 'Steak' --> \n");
    const cursor2 = await collection.find({$text: {$search: amir}}, {$caseSensitive: true});
        await cursor2.forEach(function (result){
            console.log("Id: " + result._id + "\nName of the recipe: " + result.name);
        });


    await client.close();
  }
  // Call the function
  run();