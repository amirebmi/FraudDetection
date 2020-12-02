db = connect('cs3.calstatela.edu:4042/cs5220stu07');

db.auth("cs5220stu07", "AvVSayOAy6Aq");

// List all users
db.users.find({});
//or
db.users.find();

// List the first name of all users
db.users.find({}, {firstName: true});
// if you don't want id to be displayed 
db.users.find({}, {firstName: true, _id: false});

// Find the users whose last name is Ebrahimi
db.users.find({
    lastName: {
        $eq: "Ebrahimi"
    }
})
//More simplified 
db.users.find({
    lastName: "Ebrahimi"
})

// Find the users whose first name is Amir AND last name is Ebrahimi
db.users.find({
    $and: [
        {firstName: "Amir"},
        {lastName: "Ebrahimi"}
    ]
})


// Find the users whose first name is John OR last name is Doe
db.users.find({
    $or: [
        {firstName: "John"},
        {lastName: "Ebrahimi"}
    ]
})

// Find the users whose first name is Amir OR first name is John AND last name is Doe
db.users.find({
    $or: [
        {firstName: "Amir"},
        {$and: [
            {firstName: "John"},
            {lastName: "Doe"}
        ]}
    ]
})
// More simplified 
db.users.find({
    $or: [
        {firstName: "Amir"},
        {
            firstName: "John",
            lastName: "Doe"
        }
    ]
})

// Find the articles whose tags contain 'NoSQL'
db.articles.find({
    tags: {
        $all: ["NoSQL"]
    }
})
// More simplified
db.articles.find({
    tags: "NoSQL"
})

// Find the articles John Doe has commented on
db.articles.find({
     "comments.author.firstName": "John",
     "comments.author.lastName": "Doe"
 })


//List the articles with their authors (e.g. not the author id)
results = db.articles.aggregate({
    $lookup:{
        from: 'users',
        localField: 'authorId',
        foreignField: '_id',
        as: 'author'
    }
});


// List the article authors
results = db.articles.aggregate([{
    $lookup: {
        from: 'users',
        localField: 'authorId',
        foreignField: '_id',
        as: 'author'
    }
}, {
    $project: {
        author: true
    }
}]);


// Test search for "MongoDb" in articles

db.articles.find({
    $text:{$search: "MongoDb"}
});