// Select the database to use.
use('mongodbVSCodePlaygroundDB');

db.getCollection("inventory").deleteMany({});
db.getCollection('inventory').insertMany([ {
  item: 'journal',
  status: 'A',
  size: { h: 14, w: 21, uom: 'cm' },
  instock: [{ warehouse: 'A', qty: 5 }]
},
{
  item: 'notebook',
  status: 'A',
  size: { h: 8.5, w: 11, uom: 'in' },
  instock: [{ warehouse: 'C', qty: 5 }]
},
{
  item: 'paper',
  status: 'D',
  size: { h: 8.5, w: 11, uom: 'in' },
  instock: [{ warehouse: 'A', qty: 60 }]
},
{
  item: 'planner',
  status: 'D',
  size: { h: 22.85, w: 30, uom: 'cm' },
  instock: [{ warehouse: 'A', qty: 40 }]
},
{
  item: 'postcard',
  status: 'A',
  size: { h: 10, w: 15.25, uom: 'cm' },
  instock: [
    { warehouse: 'B', qty: 15 },
    { warehouse: 'C', qty: 35 }
  ]
}]);


db.getCollection('inventory').find({});

db.getCollection('inventory').find({status:"A"});

db.getCollection('inventory').find({status:"A"});

// projection 字段后可以跟1, true, 0, false.其他值则会直接赋值给结果集中的对应字段
// == SELECT _id, item, status from inventory WHERE status = "A"
db.getCollection('inventory').find({status:"A"}).projection({"item":true, "size":true});

db.getCollection('inventory').find({status:"A"}).projection({"item":1, "size":1});

db.getCollection('inventory').find({status:"A"}).projection({"item":0, "size":0, _id:false});

// 嵌套文档 projection
db.getCollection('inventory').find({status:"A"}).projection({"item":1, "size.w":1, });
db.getCollection('inventory').find({status:"A"}).projection({"size":{"w":1}});

// 数组 projection 第一个元素 ：{$slice: 1 }， 最后一个元素:{$slice: -1 }
db.getCollection('inventory').find({item:"postcard"});
db.getCollection('inventory').find({item:"postcard"}).projection({item:1,instock:{$slice: -1 }});
db.getCollection('inventory').find({item:"postcard"}).projection({item:1,instock:{$slice: 1 }});

