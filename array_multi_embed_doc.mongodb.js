 // Select the database to use.
use('test');
db.getCollection("multi_layer_arr").deleteMany({});
db.getCollection('multi_layer_arr').insertMany([
  {"1":[{"2":[{"3":[{"id":1,"val":"gugu1"}]}]}]},
  {"1":[{"2":[{"3":[{"id":2,"val":"gugu2"}]}]}]},
  {"1":[{"2":[{"3":[{"id":3,"val":"gugu3"}]}]}]},
])
db.getCollection("multi_layer_arr").find({});

db.getCollection('multi_layer_arr').find({
  "1.2.3.id":1
})

db.getCollection('multi_layer_arr').updateOne(
  {"1.2.3.id":1},
  {"$set":{"1.$[].2.$[].3.$[].val":"gugu11"}}
);

db.getCollection('multi_layer_arr').insertMany([
  {"1":[{"2":[{"3":[{"id":1,"val":"gugu1"}]}]}]},
  {"1":[{"2":[{"3":[{"id":2,"val":"gugu2"}]}]}]},
  {"1":[{"2":[{"3":[{"id":3,"val":"gugu3"}]}]}]},
])
