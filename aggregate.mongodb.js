// Select the database to use.
use('mongodbVSCodePlaygroundDB');

db.getCollection("aggregate").deleteMany({})
db.getCollection("aggregate").insertMany([
    {   
        name:"tata",
        price:20,
    },
    {   
        name:"jojo",
        price:18,
    },
    {   
        name:"tata",
        price:22,
    },
    {   
        name:"zoe",
        price:15
    },
]);

db.getCollection("aggregate").find({});
db.getCollection("aggregate").aggregate([
    {$group: {
      _id: "$name",
      totalPrice: {
        $sum: "$price"
      }
    }}
]);