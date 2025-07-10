// Select the database to use.
use('mongodbVSCodePlaygroundDB');

db.fruits.deleteMany({})
db.fruits.insertMany( [
   { "_id" : 1, "location" : "24th Street",
  "in_stock" : [ "apples", "oranges", "bananas" ] },
{ "_id" : 2, "location" : "36th Street",
  "in_stock" : [ "bananas", "pears", "grapes" ] },
{ "_id" : 3, "location" : "82nd Street",
  "in_stock" : [ "cantaloupes", "watermelons", "apples" ] },
] )

db.fruits.find({})

// 判断是否包含在数组
db.fruits.aggregate([
   {
     $set: {
       "store location" : "$location",
       "has bananas" : {
         $in: [ "bananas", "$in_stock" ]
       }
     }
   }
 ])





