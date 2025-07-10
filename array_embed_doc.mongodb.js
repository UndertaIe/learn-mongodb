 // Select the database to use.
db.inventory.deleteMany({});
db.inventory.insertMany([
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
      { warehouse: 'B', qty: 15 ,extrafield:"noob"}
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
    item: 'plannerB',
    instock: [
      { qty: 5 , warehouse: 'B'},
      { warehouse: 'A', qty: 40 }
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
    item: 'postcardB',
    instock: [
      { warehouse: 'B', qty: 25,"time":1 },
      { warehouse: 'C', qty: 15,time:2 }
    ]
  }
]);

db.inventory.find({});

// 完全匹配数组本身的文档(字段、顺序一致)
db.inventory.find({instock: [{ warehouse: 'B', qty: 15 },{ warehouse: 'C', qty: 35 }]});

// 完全匹配数组元素的文档(字段(字段名，数目)、顺序一致)
db.inventory.find({instock: { warehouse: 'B', qty: 15 }});
db.inventory.find({instock: {warehouse: 'A', qty: 5}});
db.inventory.find({instock: { qty: 5 ,warehouse: 'A'}});

// 匹配的字段可不在一个数组元素中
db.inventory.find({"instock.warehouse": 'A', "instock.qty": 5 });

// 指定字段查询
db.inventory.find({"instock.warehouse": 'C'});
db.inventory.find({"instock.qty": {$gte: 15}});

// 指定数组中第几个元素查询
db.inventory.find({"instock.0.qty": {$lte: 20}});
db.inventory.find({"instock.1.qty": {$gte: 20}});

// 多个条件查询(elemMatch后是多个条件，非文档类型，没有顺序要求)
// elemMatch表示数组同一个元素满足后面所有的条件（元素包含满足条件的字段）
db.inventory.find({"instock":{$elemMatch: {"qty":15, "warehouse":"B"}}});
// 使用点访问符查询则表示数组中嵌套文档元素不需要同时满足后面条件。只要所有数组元素中文档有满足所有条件。
db.inventory.find({'instock.qty': 5,'instock.warehouse': 'C'});


