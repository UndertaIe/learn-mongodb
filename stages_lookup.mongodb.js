
db.orders.deleteMany({})
db.orders.insertMany( [
  { "_id" : 1, "item" : "almonds", "price" : 12, "quantity" : 2 },
  { "_id" : 2, "item" : "pecans", "price" : 20, "quantity" : 1 },
  { "_id" : 3  }
] )
db.orders.find({})

db.inventory.deleteMany({})
db.inventory.insertMany( [
  { "_id" : 1, "sku" : "almonds", "description": "product 1", "instock" : 120 },
  { "_id" : 2, "sku" : "bread", "description": "product 2", "instock" : 80 },
  { "_id" : 3, "sku" : "cashews", "description": "product 3", "instock" : 60 },
  { "_id" : 4, "sku" : "pecans", "description": "product 4", "instock" : 70 },
  { "_id" : 5, "sku": null, "description": "Incomplete" },
  { "_id" : 6 }
] )
db.inventory.find({})

// 集合的总文档/记录数
// from： 被join的表
// localField：主表join的字段
// foreignField：被join表的字段
// as：join的文档数组对应的字段名

// 字段值相等join
db.orders.aggregate( [{
  $lookup: {
    from: "inventory",
    localField: "item",
    foreignField: "sku",
    as: "inventory_docs"
  }
}])

db.classes.deleteMany({})
db.classes.insertMany( [
  { _id: 1, title: "Reading is ...", enrollmentlist: [ "giraffe2", "pandabear", "artie" ], days: ["M", "W", "F"] },
  { _id: 2, title: "But Writing ...", enrollmentlist: [ "giraffe1", "artie" ], days: ["T", "F"] }
] )
db.classes.find({})

db.members.deleteMany({})
db.members.insertMany( [
  { _id: 1, name: "artie", joined: new Date("2016-05-01"), status: "A" },
  { _id: 2, name: "giraffe", joined: new Date("2017-05-01"), status: "D" },
  { _id: 3, name: "giraffe1", joined: new Date("2017-10-01"), status: "A" },
  { _id: 4, name: "panda", joined: new Date("2018-10-11"), status: "A" },
  { _id: 5, name: "pandabear", joined: new Date("2018-12-01"), status: "A" },
  { _id: 6, name: "giraffe2", joined: new Date("2018-12-01"), status: "D" }
] )
db.members.find({})

// Use $lookup with an Array
db.classes.aggregate([
  {
    $lookup: {
      from: "members",
      localField: "enrollmentlist",
      foreignField: "name",
      as: "joined_records"
    }
  }
]);

db.orders.deleteMany({})
db.orders.insertMany( [
  { "_id" : 1, "item" : "almonds", "price" : 12, "quantity" : 2 },
  { "_id" : 2, "item" : "pecans", "price" : 20, "quantity" : 1 }
] );

db.items.deleteMany({})
db.items.insertMany( [
  { "_id" : 1, "item" : "almonds", description: "almond clusters", "instock" : 120 },
  { "_id" : 2, "item" : "bread", description: "raisin and nut bread", "instock" : 80 },
  { "_id" : 3, "item" : "pecans", description: "candied pecans", "instock" : 60 }
] )

// Use $lookup with $mergeObjects
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

db.orders.deleteMany({})
db.orders.insertMany( [
  { "_id" : 1, "item" : "almonds", "price" : 12, "ordered" : 2 },
  { "_id" : 2, "item" : "pecans", "price" : 20, "ordered" : 1 },
  { "_id" : 3, "item" : "cookies", "price" : 10, "ordered" : 60 }
] )

db.warehouses.deleteMany({})
db.warehouses.insertMany( [
  { "_id" : 1, "stock_item" : "almonds", warehouse: "A", "instock" : 120 },
  { "_id" : 2, "stock_item" : "pecans", warehouse: "A", "instock" : 80 },
  { "_id" : 3, "stock_item" : "almonds", warehouse: "B", "instock" : 60 },
  { "_id" : 4, "stock_item" : "cookies", warehouse: "B", "instock" : 40 },
  { "_id" : 5, "stock_item" : "cookies", warehouse: "A", "instock" : 80 }
] )
/*
  select _id, item, price,ordered,stockdata
  from orders as o 
  join warerhouses as w 
  on o.stock_item==w.stock_item 
  where w.instock >= o.ordered
*/


/*
  SELECT *, stockdata
  FROM orders
  WHERE stockdata IN (
    SELECT warehouse, instock
    FROM warehouses
    WHERE stock_item = orders.item
    AND instock >= orders.ordered
  );

    子查询
*/
db.orders.aggregate( [
  {
     $lookup:
        {
          from: "warehouses",
          let: { order_item: "$item", order_qty: "$ordered" },
          pipeline: [
             { $match:
                { $expr:
                   { $and:
                      [
                        { $eq: [ "$stock_item",  "$$order_item" ] },
                        { $gte: [ "$instock", "$$order_qty" ] }
                      ]
                   }
                }
             },
             { $project: { stock_item: 0, _id: 0 } }
          ],
          as: "stockdata"
        }
   }
] )

db.restaurants.deleteMany({})
db.restaurants.insertMany( [
  {
     _id: 1,
     name: "American Steak House",
     food: [ "filet", "sirloin" ],
     beverages: [ "beer", "wine" ]
  },
  {
     _id: 2,
     name: "Honest John Pizza",
     food: [ "cheese pizza", "pepperoni pizza" ],
     beverages: [ "soda" ]
  }
] )

db.orders.deleteMany({})
db.orders.insertMany( [
  {
     _id: 1,
     item: "filet",
     restaurant_name: "American Steak House"
  },
  {
     _id: 2,
     item: "cheese pizza",
     restaurant_name: "Honest John Pizza",
     drink: "lemonade"
  },
  {
     _id: 3,
     item: "cheese pizza",
     restaurant_name: "Honest John Pizza",
     drink: "soda"
  }
] )

db.orders.aggregate( [
  {
     $lookup: {
        from: "restaurants",
        localField: "restaurant_name",
        foreignField: "name",
        let: { orders_drink: "$drink" },
        pipeline: [ {
           $match: {
              $expr: { $in: [ "$$orders_drink", "$beverages" ] }
           }
        } ],
        as: "matches"
     }
  }
] )






