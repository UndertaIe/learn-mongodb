
db.inventory.insertMany([
  {
    item: 'journal',
    qty: 25,
    size: { h: 14, w: 21, uom: 'cm' },
    status: 'A'
  },
  {
    item: 'journalB',
    qty: 25,
    size: { h: 14, w: 21, uom: 'cm' ,z:12},
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

db.inventory.deleteMany({});

db.inventory.find({});

// 完全匹配文档(有顺序)
db.inventory.find({
  size: { h: 14,w: 21, uom: 'cm' }
});
db.inventory.find({
  size: { h: 14, uom: 'cm',w: 21 }
});
db.inventory.find();

// 匹配文档元素中的字段值
db.inventory.find({
  "size.uom": {$ne:"cm"}
});
db.inventory.find({
  "size.uom": "cm"
});

db.survey.insertMany( [
   { "_id": 1, "results": [ { "product": "abc", "score": 10 },
                            { "product": "xyz", "score": 5 } ] },
   { "_id": 2, "results": [ { "product": "abc", "score": 8 },
                            { "product": "xyz", "score": 7 } ] },
   { "_id": 3, "results": [ { "product": "abc", "score": 7 },
                            { "product": "xyz", "score": 8 } ] },
   { "_id": 4, "results": [ { "product": "abc", "score": 7 },
                            { "product": "def", "score": 8 } ] },
   { "_id": 5, "results": { "product": "xyz", "score": 7 } }
] )
db.survey.find();


// elemMatch出现在find操作中，表示数组中某个元素满足所有过滤条件可返回该条记录
// elemMatch出现在aggregate聚合操作中，并在返回stage中，表示过滤出一些数组返回
db.survey.find(
   { results: { $elemMatch: { product: "xyz", score: { $gte: 8 } } } }
)
db.survey.find(
   { results: { $elemMatch: { score: { $gte: 8 },product: "xyz" } } }
)