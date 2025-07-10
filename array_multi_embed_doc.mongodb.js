
db.multi_layer_arr.deleteMany({});
db.multi_layer_arr.insertMany([
  {"1":[{"2":[{"3":[{"id":2,"val":"gugu1"}]}]},{"2":[{"3":[{"id":1,"val":"gugu1"}]}]}]},
  {"1":[{"2":[{"3":[{"id":2,"val":"gugu2"}]}]}]},
  {"1":[{"2":[{"3":[{"id":3,"val":"gugu3"}]}]}]},
])
db.multi_layer_arr.find({});

db.multi_layer_arr.find({
  "1.2.3.id":1
})

// 满足条件后则更新路径上所有值
db.multi_layer_arr.updateOne(
  {"1.2.3.id":1},
  {"$set":{"1.$[].2.$[].3.$[].val":"gugu11"}}
);
// 更新满足条件的路径值
db.multi_layer_arr.updateOne(
  {},
  {"$set":{"1.$[].2.$[].3.$[element].val":"arrayFilters update"}},
  {arrayFilters:[{"element.id":1}]}
);

db.students.insertMany( [
   { "_id" : 1, "grades" : [ 85, 80, 80 ] },
   { "_id" : 2, "grades" : [ 88, 90, 92 ] },
   { "_id" : 3, "grades" : [ 85, 100, 90 ] }
] )
db.students.find();

db.students.updateOne(
   { _id: 1, grades: 80 },
   { $set: { "grades.$" : 82 } }
)