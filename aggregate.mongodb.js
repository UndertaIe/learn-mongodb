
db.aggregate.deleteMany({})
db.aggregate.insertMany([
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

db.aggregate.find({});

db.aggregate.aggregate([
    {$group: {
      _id: "$name",
      totalPrice: {
        $sum: "$price"
      },
      count: {
        $sum:1
      },
      avgPrice: {
        $avg: "$price"
      }
    }}
]);