// Select the database to use.
use('mongodbVSCodePlaygroundDB');

db.fruits2.deleteMany({})
db.fruits2.insertMany( [
   { "_id" : 1, "location" : "24th Street",
  "in_stock" : [ "apples", "oranges", "bananas" ] },
{ "_id" : 2, "location" : "36th Street",
  "in_stock" : [ "bananas", "pears", "grapes" ] },
{ "_id" : 3, "location" : "82nd Street",
  "in_stock" : [ "cantaloupes", "watermelons", "apples" ] },
] )

db.fruits2.find({})

db.fruits2.aggregate([
   {
     $project: {
       "_id type" : {$type:"$_id"},
       "location type" : {$type:"$location"},
       "in_stock type" : {$type:"$in_stock"},
       "in_stock is array" :{$isArray: "$in_stock"},
       "location is array" :{$isArray: "$location"},
       "_id is number" :{$isNumber: "$_id"},
     }
   }
 ])





