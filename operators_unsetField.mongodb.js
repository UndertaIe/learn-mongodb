// Select the database to use.
use('mongodbVSCodePlaygroundDB');

db.inventory.deleteMany({})
db.inventory.insertMany( [
   { _id: 1, item: "sweatshirt", qty: 300, "price.usd": 45.99 },
   { _id: 2, item: "winter coat", qty: 200, "price.usd": 499.99 },
   { _id: 3, item: "sun dress", qty: 250, "price.usd": 199.99 },
   { _id: 4, item: "leather boots", qty: 300, "price.usd": 249.99 },
   { _id: 5, item: "bow tie", qty: 180, "price.usd": 9.99 }
] );

db.inventory.aggregate( [
   { $replaceWith: {
        $unsetField: {
           field: "price.usd",
           input: "$$ROOT"
   } } }
] );

db.col.deleteMany({});
db.col.insertMany([
   { "_id": 1, "name" : { "first" : "John", "last" : "Backus" } },
   { "_id": 2, "name" : { "first" : "John", "last" : "McCarthy" } },
   { "_id": 3, "name": { "first" : "Grace", "last" : "Hopper" } },
   { "_id": 4, "firstname": "Ole-Johan", "lastname" : "Dahl" },
])
// err stage because some doc dont have `name` field
db.col.aggregate([
   { $replaceWith: "$name" }
])
db.col.aggregate([
   { $replaceWith: { $mergeObjects: [ { _id: "$_id", first: "", last: "" }, "$name" ] } }
])


db.col.aggregate([
   { $match: { name : { $exists: true, $not: { $type: "array" }, $type: "object" } } },
   { $replaceWith: "$name" }
])
db.col.aggregate([
   { $replaceWith: { $ifNull: [ "$name", { _id: "$_id", missingName: true} ] } }
])



