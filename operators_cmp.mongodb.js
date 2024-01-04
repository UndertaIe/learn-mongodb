// Select the database to use.
use('mongodbVSCodePlaygroundDB');

db.orders2.deleteMany({})
db.orders2.insertMany([
   { "_id" : 1, "item" : "abc1", description: "product 1", qty: 300 },
{ "_id" : 2, "item" : "abc2", description: "product 2", qty: 200 },
{ "_id" : 3, "item" : "xyz1", description: "product 3", qty: 250 },
{ "_id" : 4, "item" : "VWZ1", description: "product 4", qty: 300 },
{ "_id" : 5, "item" : "VWZ2", description: "product 5", qty: 180 },
])

// 大于目标值结果为1，小于为-1，等于为0
db.orders2.aggregate([
   {
      $set:{
         cmpTo200:{
            $cmp:["$qty", 200],
         }
      }
   }
])


