db = connect('cs3.calstatela.edu:4042/cs5220stu07');

db.auth("cs5220stu07", "AvVSayOAy6Aq");

db.articles.drop();
db.users.drop();


db.users.createIndex({
    email: 1
}, {
        unique: true
});

db.articles.createIndex({
    title: "text",
    text: "text"
});

userId1 = db.users.insertOne({
    firstName: "Amir",
    lastName: "Ebrahimi",
    email: "aebrahi9@calstatela.edu"
}).insertedId;

userId2 = db.users.insertOne({
    firstName: "John",
    lastName: "Doe",
    email: "jdoe2020@calstatela.edu"
}).insertedId;

print(userId1);
print(userId2);

article1 = {
    title: "Using MongoDB Demo",
    text: "This article is written for MongoDB tutorial",
    author: userId1,
    date: new Date(2020, 11, 3),
    comments: [{
        text: "Thanks for the tutorial!",
        author: {
            id: userId2,
            firstName: 'John',
            lastName: 'Doe'
        },
        date: new Date(2020,11,4)
    }],
    tags: ['NoSQL', 'MongoDB', 'Web Development']
};

article2 = {
    title: "Node.Js tutorial",
    text: "This article is written for NodeJs tutorial",
    author: userId1,
    date: new Date(2020, 10, 20),
    comments: [{
        text: "Thanks!",
        author: {
            id: userId2,
            firstName: 'John',
            lastName: 'Doe'
        },
        date: new Date(2020,11,5)
    }],
    tags: ['NodeJs', 'JavaScript', 'Web Development']
};

db.articles.insert(article1);
db.articles.insert(article2);

