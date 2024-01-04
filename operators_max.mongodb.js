// Select the database to use.
use('mongodbVSCodePlaygroundDB');


db.sales.deleteMany({})
db.sales.insertMany( [
  { "_id" : 1, "item" : "abc", "price" : 10, "quantity" : 2, "date" : ISODate("2014-01-01T08:00:00Z") },
  { "_id" : 2, "item" : "jkl", "price" : 20, "quantity" : 1, "date" : ISODate("2014-02-03T09:00:00Z") },
  { "_id" : 3, "item" : "xyz", "price" : 5, "quantity" : 5, "date" : ISODate("2014-02-03T09:05:00Z") },
  { "_id" : 4, "item" : "abc", "price" : 10, "quantity" : 10, "date" : ISODate("2014-02-15T08:00:00Z") },
  { "_id" : 5, "item" : "xyz", "price" : 5, "quantity" : 10, "date" : ISODate("2014-02-15T09:05:00Z") },
]);
db.sales.find({})

db.sales.aggregate(
  [
    {
      $group:
        {
          _id: "$item",
          maxTotalAmount: { $max: { $multiply: [ "$price", "$quantity" ] } },
          maxQuantity: { $max: "$quantity" }
        }
    }
  ]
)

db.sales.aggregate(
  [
    {
      $group:
        {
          _id: null,
          maxPrice: { $max: "$price" },
          maxQuantity: { $max: "$quantity" },
        }
    }
  ]
)

