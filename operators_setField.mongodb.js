// Select the database to use.
use('mongodbVSCodePlaygroundDB');

db.inventory.deleteMany({});
db.inventory.insertMany( [
  { "_id" : 1, "item" : "sweatshirt", price: 45.99, qty: 300 },
  { "_id" : 2, "item" : "winter coat", price: 499.99, qty: 200 },
  { "_id" : 3, "item" : "sun dress", price: 199.99, qty: 250 },
  { "_id" : 4, "item" : "leather boots", price: 249.99, qty: 300 },
  { "_id" : 5, "item" : "bow tie", price: 9.99, qty: 180 },
] );

// 添加一个包含.的字段
db.inventory.aggregate( [
  { $replaceWith: {
       $setField: {
          field: "price.usd",
          input: "$$ROOT",
          value: "$price"
  } } },
  { $unset: "price" }
] );

// 添加一个包含$的字段
db.inventory.aggregate( [
  { $replaceWith: {
       $setField: {
          field: { $literal: "$price" },
          input: "$$ROOT",
          value: "$price"
  } } },
  { $unset: "price" }
] )

// 更新一个包含.的字段
db.inventory.aggregate( [
  { $match: { _id: 1 } },
  { $replaceWith: {
       $setField: {
          field: "price.usd",
          input: "$$ROOT",
          value: 49.99
   } } }
] )

db.inventory.deleteMany({})
db.inventory.insertMany([
  { _id: 1, item: 'sweatshirt', qty: 300, 'price.usd': 45.99 },
  { _id: 2, item: 'winter coat', qty: 200, 'price.usd': 499.99 },
  { _id: 3, item: 'sun dress', qty: 250, 'price.usd': 199.99 },
  { _id: 4, item: 'leather boots', qty: 300, 'price.usd': 249.99 },
  { _id: 5, item: 'bow tie', qty: 180, 'price.usd': 9.99 }
] )
db.inventory.find()
// value: "$$REMOVE" 删除一个包含.的字段
db.inventory.aggregate( [
  { $replaceWith:  {
       $setField: {
          field: "price.usd",
          input: "$$ROOT",
          value: "$$REMOVE"
  } } }
] )
// unsetField: 删除一个包含.的字段
db.inventory.aggregate( [
  { $replaceWith:  {
       $unsetField: {
          field: "price.usd",
          input: "$$ROOT",
  } } }
] )





