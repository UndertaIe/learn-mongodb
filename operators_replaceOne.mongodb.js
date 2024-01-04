// Select the database to use.
use('mongodbVSCodePlaygroundDB');

db.createCollection( "myColl", { collation: { locale: "fr", strength: 1 } } )

db.myColl.deleteMany({})
db.myColl.insertMany([
  { _id: 1, name: "cafe" },
  { _id: 2, name: "Cafe" },
  { _id: 3, name: "café" }
])

db.myColl.aggregate([
  {
    $addFields:
      {
        resultObject: { $replaceOne: { input: "$name", find: "Cafe", replacement: "CAFE" } }
      }
  }
])

db.inventory.deleteMany({})
db.inventory.insertMany([
  { "_id" : 1, "item" : "blue paint" },
  { "_id" : 2, "item" : "blue and green paint" },
  { "_id" : 3, "item" : "blue paint with blue paintbrush" },
  { "_id" : 4, "item" : "blue paint with green paintbrush" },
])

// $replaceOne 替换第一个匹配项
db.inventory.aggregate([
  {
    $set:
     {
        new_item: { $replaceOne: { input: "$item", find: "blue paint", replacement: "red paint" } }
     }
  }
])

// $replaceAll 替换所有匹配项
db.inventory.aggregate([
  {
    $project:
     {
        item: { $replaceAll: { input: "$item", find: "blue paint", replacement: "red paint" } }
     }
  }
]);


