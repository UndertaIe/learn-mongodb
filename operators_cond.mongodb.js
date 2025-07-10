// Select the database to use.
use('mongodbVSCodePlaygroundDB');

db.orders2.deleteMany({})
db.orders2.insertMany([
   { "_id" : 1, "item" : "abc1", description: "product 1", qty: 300 },
   { "_id" : 2, "item" : "abc2", description: "product 2", qty: 200 },
   { "_id" : 3, "item" : "xyz1", description: "product 3", qty: 250 },
])
db.orders2.find()

// 通过逻辑判断从字段中获取值
db.orders2.aggregate([
   {
      $set: {
         new_qty: {
            $cond:{
               if: {
                  $gte: ["$qty", 250]
               },
               then: 300,
               else: 200
            }
         }
      }
   }
])

db.orders2.aggregate([
   {
      $set: {
         new_qty: {
            $cond:[{$gt: ["$qty", 250]},300,200]
         }
      }
   }
])





