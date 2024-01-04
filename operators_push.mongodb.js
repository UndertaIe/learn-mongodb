// Select the database to use.
use('mongodbVSCodePlaygroundDB');

db.sales.deleteMany({})
db.sales.insertMany([
   { "_id" : 1, "item" : "abc", "price" : 10, "quantity" : 2, "date" : ISODate("2014-01-01T08:00:00Z") },
   { "_id" : 2, "item" : "jkl", "price" : 20, "quantity" : 1, "date" : ISODate("2014-02-03T09:00:00Z") },
   { "_id" : 3, "item" : "xyz", "price" : 5, "quantity" : 5, "date" : ISODate("2014-02-03T09:05:00Z") },
   { "_id" : 4, "item" : "abc", "price" : 10, "quantity" : 10, "date" : ISODate("2014-02-15T08:00:00Z") },
   { "_id" : 5, "item" : "xyz", "price" : 5, "quantity" : 10, "date" : ISODate("2014-02-15T09:05:00Z") },
   { "_id" : 6, "item" : "xyz", "price" : 5, "quantity" : 5, "date" : ISODate("2014-02-15T12:05:10Z") },
   { "_id" : 7, "item" : "xyz", "price" : 5, "quantity" : 10, "date" : ISODate("2014-02-15T14:12:12Z") },
])

// 聚合后将分组中记录写入数组中
db.sales.aggregate([
   { 
      $sort: { 
         date: 1, item: 1 
      } 
   },
   {
       $group:{
         _id: { day: { $dayOfYear: "$date"}, year: { $year: "$date" } },
         itemsSold: { $push:  { item: "$item", quantity: "$quantity" } }
      }
   }
]);

