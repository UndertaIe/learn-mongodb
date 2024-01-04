// Select the database to use.

/*
  mongodb $ne在数组字段A上使用
  A:{$ne:2}  A全部项不等于2
  A.a:{$ne:2}  A全部项a字段不等于2
  A:{$elemMatch:{"a":{$ne:2}}}  A存在一项a字段不等于2
  
  A:2  A存在一项等于2
  A.a:2  A存在一项a字段等于2
  A:{$not:{$elemMatch:{"a":{$ne:2}}}} A不存在一项a字段不等于2 即A全部项都为2
*/

use('test');
db.getCollection('ne').deleteMany({});
db.getCollection('ne').insertMany([
  {
    A:[1,2]
  },
  {
    A:[1,1]
  },
  {
    A:[3,4]
  },
  {
    A:[5,8]
  }
]);

// 匹配数组A中 存在1 的文档记录(数组存在一项)
db.getCollection('ne').find({
  A:1
})

//!!! 匹配数组中 不存在2 的文档记录（即数组全部项都不能为2）
db.getCollection('ne').find({
  A:{"$ne":2}
})

// 匹配数组A中 存在1 的文档记录(数组存在一项满足)
db.getCollection('ne').find({
  A:{"$eq":1} // == A:1
})

// 匹配数组A中 存在1 的文档记录(即数组全部项都不能为2）
db.getCollection('ne').find({
  A:{"$not":{"$eq":2}}// ==  A:{"$ne":2}
})

// 匹配数组中 存在 元素大于1的文档(数组元素一项满足)
db.getCollection('ne').find({
  A:{"$gt":1}
})

// 匹配数组中 存在 元素小于6的文档(数组元素一项满足)
db.getCollection('ne').find({
  A:{"$lt":6}
})

db.getCollection("nee").insertMany([
  {
    "a":[
      {"b":1},
      {"b":0},
    ]
  },
  {
    "a":[
      {"b":1},
      {"b":2},
    ]
  },
  {
    "a":[
      {"b":2},
      {"b":2},
    ]
  }
])

// 匹配 a数组存在一项b字段等于2 的文档
db.getCollection('nee').find(
  {"a": {"b":2} }
)
db.getCollection('nee').find(
  {"a.b":2 }
)

// 匹配 a数组全部项b字段不等于2 的文档（数组全部项字段全部不为2）
db.getCollection('nee').find(
  {"a.b": {$ne:2} }
)

// 匹配 a数组中存在一项b字段不等于2 的文档（数组中存在一项字段不为2）
db.getCollection('nee').find(
  {"a":{$elemMatch:{"b": {$ne:2} }}}
)

// 匹配 a数组所有项b字段都等于2 的文档（数组项全部匹配）
db.getCollection('nee').find(
 { a:{$not:{$elemMatch:{"b":{$ne:2}}}}}
)

