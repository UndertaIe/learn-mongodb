// Select the database to use.
use('mongodbVSCodePlaygroundDB');

db.orders.deleteMany({})
db.orders.insertMany( [
   { "_id" : 1, "item" : "abc", "price" : 12, "ordered" : 2 },
   { "_id" : 2, "item" : "jkl", "price" : 20, "ordered" : 1 }
]);

db.items.deleteMany({})
db.items.insertMany( [
   { "_id" : 1, "item" : "abc", description: "product 1", "instock" : 120 },
   { "_id" : 2, "item" : "def", description: "product 2", "instock" : 80 },
   { "_id" : 3, "item" : "jkl", description: "product 3", "instock" : 60 }
 ] )

 // lookup:join表后在文档中加了一个对应匹配列文档的字段
db.orders.aggregate( [
   {
      $lookup: {
         from: "items",
         localField: "item",    // field in the orders collection
         foreignField: "item",  // field in the items collection
         as: "fromItems"
      }
   }
] )


 // join后的文档合并文档根路径。
 db.orders.aggregate( [
   {
      $lookup: {
         from: "items",
         localField: "item",    // field in the orders collection
         foreignField: "item",  // field in the items collection
         as: "fromItems"
      }
   },
   {
      $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$fromItems", 0 ] }, "$$ROOT" ] } }
   },
   { $project: { fromItems: 0 } }
] )


