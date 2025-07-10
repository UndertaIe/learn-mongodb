// Select the database to use.
use('mongodbVSCodePlaygroundDB');

db.inventory03.deleteMany({})
db.inventory03.insertMany( [
   { "_id" : 1, "item" : "buggy", description: "toy car", "quantity" : 300 },
   { "_id" : 2, "item" : "bicycle", description: null, "quantity" : 200 },
   { "_id" : 3, "item" : "flag" }
] )

db.inventory03.find({})

// ifNull传入字段判断不存在或为null值则字段重新赋新值
db.inventory03.aggregate( [
   {
      $set: {
         description:{
            $ifNull:["$description", "desc not found"]
         }
      }
   }
] )

db.inventory.aggregate(
   [
      {
         $project: {
            item: 1,
            value: { $ifNull: [ "$description", "$quantity", "Unspecified" ] }
         }
      }
   ]
)






