// Select the database to use.
use('mongodbVSCodePlaygroundDB');

db.orders2.deleteMany({})
db.orders2.insertMany([
   { "_id" : 1, "item" : "abc1", description: "product 1", qty: 300 },
   { "_id" : 2, "item" : "abc2", description: "product 2", qty: 200 },
   { "_id" : 3, "item" : "xyz1", description: "product 3", qty: 250 },
])
db.orders2.find()

// https://www.mongodb.com/docs/manual/reference/operator/aggregation/convert/
/*
toBoolean:
   Boolean
      Returns the boolean value.

   Double/Decimal/Integer/Long
      Returns true if not zero.
      Return false if zero.

   ObjectId/String/Date/Timestamp
      Returns true
*/






