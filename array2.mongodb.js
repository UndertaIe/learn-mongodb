// Select the database to use.
use('mydb');

db.getCollection('array_ele_update').insertMany([
  {
    item: 'journal',
    qty: 25,
    tags: ['blank', 'red'],
    dim_cm: [14, 23]
  },
  {
    item: 'planner',
    qty: 75,
    tags: ['blank', 'red'],
    dim_cm: [22.85, 30]
  }
]);
db.getCollection('array_ele_update').deleteMany({});

// 更新数组中满足过滤条件的第一个元素
db.getCollection('array_ele_update').updateMany({"dim_cm":{"$gt":10}},{"$inc":{"dim_cm.$":2}});

// 更新数组中满足过滤条件的所有元素
db.getCollection('array_ele_update').updateMany(
   { },
   { $set: { "dim_cm.$[element]" : 100 } },
   { arrayFilters: [ { "element": { $gt: 22 } } ] }
)

