// Select the database to use.
use('mongodbVSCodePlaygroundDB');

db.inventory03.deleteMany({})
db.inventory03.insertMany([
   { "_id" : 1, "item" : "abc1", description: "product 1", qty: 300 },
   { "_id" : 2, "item" : "abc2", description: "product 2", qty: 200 },
   { "_id" : 3, "item" : "xyz1", description: "product 3", qty: 250 },
   { "_id" : 4, "item" : "VWZ1", description: "product 4", qty: 300 },
   { "_id" : 5, "item" : "VWZ2", description: "product 5", qty: 180 }
])

db.inventory03.aggregate([
   {
      $set:{
         result:{
            $and:[
               {$gt: ["$qty",200]},
               {$lte: ["$qty",300]},  
            ]
         }
      }
   },
   {
      $set:{
         result2:{
            $and:[
               {$gt: ["$qty",200]},
               {$lte: ["$qty",300]},  
            ]
         }
      }
   }
])

