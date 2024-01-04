 // Select the database to use.
use('mongodbVSCodePlaygroundDB');
db.getCollection("inventory").deleteMany({});
db.getCollection('inventory').insertMany([
  {
    item: 'journal',
    instock: [
      { warehouse: 'A', qty: 5 },
      { warehouse: 'C', qty: 15 }
    ]
  },
  {
    item: 'notebook',
    instock: [{ warehouse: 'C', qty: 5 }]
  },
  {
    item: 'paper',
    instock: [
      { warehouse: 'A', qty: 60 },
      { warehouse: 'B', qty: 15 }
    ]
  },
  {
    item: 'planner',
    instock: [
      { warehouse: 'A', qty: 40 },
      { warehouse: 'B', qty: 5 }
    ]
  },
  {
    item: 'postcard',
    instock: [
      { warehouse: 'B', qty: 15 },
      { warehouse: 'C', qty: 35 }
    ]
  },
  {
    item: 'postcard',
    instock: [
      { warehouse: 'B', qty: 15,"time":1 },
      { warehouse: 'C', qty: 35,time:2 }
    ]
  }
]);

use('mongodbVSCodePlaygroundDB');
db.getCollection('inventory').find({});


// 精准匹配数组的文档(字段、顺序一致)
use('mongodbVSCodePlaygroundDB');
db.getCollection('inventory').find({instock: { warehouse: 'B', qty: 15 }});

use('mongodbVSCodePlaygroundDB');
db.getCollection('inventory').find({instock: { qty: 5 ,warehouse: 'A'}});
// 匹配的字段不在一个文档中
db.getCollection('inventory').find({"instock.warehouse": 'A', "instock.qty": 5 });

// 指定字段查询
use('mongodbVSCodePlaygroundDB');
db.getCollection('inventory').find({"instock.warehouse": 'C'});
use('mongodbVSCodePlaygroundDB');
db.getCollection('inventory').find({"instock.qty": {$gte: 15}});

// 指定数组中第几个元素查询
use('mongodbVSCodePlaygroundDB');
db.getCollection('inventory').find({"instock.0.qty": {$lte: 20}});
use('mongodbVSCodePlaygroundDB');
db.getCollection('inventory').find({"instock.0.qty": {$gte: 20}});

// 多个条件查询(elemMatch后是多个条件，非文档类型，没有顺序要求)
// elemMatch表示数组中的同个元素满足后面所有的条件
use('mongodbVSCodePlaygroundDB');
db.getCollection('inventory').find({"instock":{$elemMatch: {"qty":15, "warehouse":"B"}}});
// 使用点访问符查询则表示数组中的同一个文档不需要同时满足后面条件。只要数组中文档有满足后面条件即可
use('mongodbVSCodePlaygroundDB');
db.getCollection('inventory').find({'instock.qty': 5,'instock.warehouse': 'C'});


