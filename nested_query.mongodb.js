// Select the database to use.
use('mongodbVSCodePlaygroundDB');

db.getCollection('inventory').insertMany([
  {
    item: 'journal',
    qty: 25,
    size: { h: 14, w: 21, uom: 'cm' },
    status: 'A'
  },
  {
    item: 'notebook',
    qty: 50,
    size: { h: 8.5, w: 11, uom: 'in' },
    status: 'A'
  },
  {
    item: 'paper',
    qty: 100,
    size: { h: 8.5, w: 11, uom: 'in' },
    status: 'D'
  },
  {
    item: 'planner',
    qty: 75,
    size: { h: 22.85, w: 30, uom: 'cm' },
    status: 'D'
  },
  {
    item: 'postcard',
    qty: 45,
    size: { h: 10, w: 15.25, uom: 'cm' },
    status: 'A'
  },
  {
    item: 'postcard',
    qty: 45,
    size: { h: 10, w: 15.25, uom: 'cm' },
    status: 'B'
  }
]);

use('mongodbVSCodePlaygroundDB');
db.getCollection("inventory").deleteMany({});

use('mongodbVSCodePlaygroundDB');
db.getCollection('inventory').find({});

// 匹配文档(有顺序)
use('mongodbVSCodePlaygroundDB');
db.getCollection('inventory').find({
  size: { h: 14,w: 21, uom: 'cm' }
});
use('mongodbVSCodePlaygroundDB');
db.getCollection('inventory').find({
  size: { h: 14, uom: 'cm',w: 21 }
});
use('mongodbVSCodePlaygroundDB');
db.getCollection('inventory').find({
  "size": {"$elemMatch":{ "h": 14, "w": 21, "uom": "cm" }}
});

// 匹配文档中的字段值
use('mongodbVSCodePlaygroundDB');
db.getCollection('inventory').find({
  "size.uom": {$ne:"cm"}
});
use('mongodbVSCodePlaygroundDB');
db.getCollection('inventory').find({
  "size.uom": "cm"
});


