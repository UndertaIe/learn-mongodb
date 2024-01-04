// Select the database to use.
use('mongodbVSCodePlaygroundDB');

db.getCollection('inventory').insertMany([
  {
    item: 'journal',
    qty: 25,
    tags: ['blank', 'red'],
    dim_cm: [14, 21]
  },
  {
    item: 'notebook',
    qty: 50,
    tags: ['red', 'blank'],
    dim_cm: [14, 21]
  },
  {
    item: 'paper',
    qty: 100,
    tags: ['red', 'blank', 'plain'],
    dim_cm: [14, 21]
  },
  {
    item: 'planner',
    qty: 75,
    tags: ['blank', 'red'],
    dim_cm: [22.85, 30]
  },
  {
    item: 'postcard',
    qty: 45,
    tags: ['blue'],
    dim_cm: [10, 15.25]
  }
]);

use('mongodbVSCodePlaygroundDB');
db.getCollection("inventory").deleteMany({tags:{$exists:false}});

use('mongodbVSCodePlaygroundDB');
db.getCollection('inventory').find({});

// 精准匹配数组（顺序也要匹配）
use('mongodbVSCodePlaygroundDB');
db.getCollection('inventory').find({"tags":["blank","red"]});

use('mongodbVSCodePlaygroundDB');
db.getCollection('inventory').find({"tags":["red","blank"]});

// 匹配(包含)数组（顺序可不匹配）$all操作符两边都为数组，判断是否是包含关系
use('mongodbVSCodePlaygroundDB');
db.getCollection('inventory').find({"tags":{$all:["red","blank"]}});

// 等值匹配
use('mongodbVSCodePlaygroundDB');
db.getCollection('inventory').find({"tags":"red"});

// 比较操作符匹配
use('mongodbVSCodePlaygroundDB');
db.getCollection('inventory').find({"dim_cm":{"$gt": 21}});
use('mongodbVSCodePlaygroundDB');
db.getCollection('inventory').find({"dim_cm":{"$lt": 12}});
use('mongodbVSCodePlaygroundDB');
db.getCollection('inventory').find({"dim_cm":{"$lte": 45}});
use('mongodbVSCodePlaygroundDB');
db.getCollection('inventory').find({"dim_cm":{"$lte": 50,"$gte":40}});
use('mongodbVSCodePlaygroundDB');
db.getCollection('inventory').find({"dim_cm":{"$gt": 22,"$lt":30}});

// 指定位置值匹配元素
use('mongodbVSCodePlaygroundDB');
db.getCollection('inventory').find({'dim_cm.1': { $gt: 25 }});

// 长度匹配
use('mongodbVSCodePlaygroundDB');
db.getCollection('inventory').find({'tags': { $size: 2}});


