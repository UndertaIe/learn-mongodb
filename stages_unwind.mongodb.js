// Select the database to use.
use('mongodbVSCodePlaygroundDB');

db.inventory.deleteMany({});
db.inventory.insertOne({ "_id" : 1, "item" : "ABC1", sizes: [ "S", "M", "L"] })

db.inventory.aggregate([
  {$unwind:"$sizes"}
])

db.clothing.insertMany([
  { "_id" : 1, "item" : "Shirt", "sizes": [ "S", "M", "L"] },
  { "_id" : 2, "item" : "Shorts", "sizes" : [ ] },
  { "_id" : 3, "item" : "Hat", "sizes": "M" },
  { "_id" : 4, "item" : "Gloves" },
  { "_id" : 5, "item" : "Scarf", "sizes" : null }
])
db.clothing.aggregate( [ { $unwind: { path: "$sizes" } } ] )


db.inventory2.insertMany([
  { "_id" : 1, "item" : "ABC", price: NumberDecimal("80"), "sizes": [ "S", "M", "L"] },
  { "_id" : 2, "item" : "EFG", price: NumberDecimal("120"), "sizes" : [ ] },
  { "_id" : 3, "item" : "IJK", price: NumberDecimal("160"), "sizes": "M" },
  { "_id" : 4, "item" : "LMN" , price: NumberDecimal("10") },
  { "_id" : 5, "item" : "XYZ", price: NumberDecimal("5.75"), "sizes" : null }
])
db.inventory2.aggregate( [
  { $unwind: { path: "$sizes", preserveNullAndEmptyArrays: true } }
] )

db.inventory2.aggregate( [
  {
    $unwind:
      {
        path: "$sizes",
        includeArrayIndex: "arrayIndex"
      }
   }])