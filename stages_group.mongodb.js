// Select the database to use.
use('mongodbVSCodePlaygroundDB');

db.scores.deleteMany({})

db.scores.insertMany([
  { "_id" : 1, "item" : "abc", "price" : NumberDecimal("10"), "quantity" : NumberInt("2"), "date" : ISODate("2014-03-01T08:00:00Z") },
  { "_id" : 2, "item" : "jkl", "price" : NumberDecimal("20"), "quantity" : NumberInt("1"), "date" : ISODate("2014-03-01T09:00:00Z") },
  { "_id" : 3, "item" : "xyz", "price" : NumberDecimal("5"), "quantity" : NumberInt( "10"), "date" : ISODate("2014-03-15T09:00:00Z") },
  { "_id" : 4, "item" : "xyz", "price" : NumberDecimal("5"), "quantity" :  NumberInt("20") , "date" : ISODate("2014-04-04T11:21:39.736Z") },
  { "_id" : 5, "item" : "abc", "price" : NumberDecimal("10"), "quantity" : NumberInt("10") , "date" : ISODate("2014-04-04T21:23:13.331Z") },
  { "_id" : 6, "item" : "def", "price" : NumberDecimal("7.5"), "quantity": NumberInt("5" ) , "date" : ISODate("2015-06-04T05:08:13Z") },
  { "_id" : 7, "item" : "def", "price" : NumberDecimal("7.5"), "quantity": NumberInt("10") , "date" : ISODate("2015-09-10T08:43:00Z") },
  { "_id" : 8, "item" : "abc", "price" : NumberDecimal("10"), "quantity" : NumberInt("5" ) , "date" : ISODate("2016-02-06T20:20:13Z") },
])
db.scores.find({})

// 集合的总文档/记录数
db.scores.aggregate( [
  {
    $count:"document_count"
  }
] )

// 集合的总文档/记录数
db.scores.aggregate( [
  {
    $group:{
      _id:null,
      document_count:{
        $count:{}
      }
    }
  },
  {
    $project: {_id:0
    }
  }
])

// 字段去重
db.scores.aggregate([
  {
    $group:{
      _id:"$item"
    }
  }
])

// 等同select _id, sum(s.quantity*s.price) as totalSaleAmount from sales as s group by sales.item having totalSaleAmount>=100;
db.sales.aggregate(
  [
    {
      $group :
        {
          _id : "$item",
          totalSaleAmount: { $sum: { $multiply: [ "$price", "$quantity" ] } }
        }
     },
     {
       $match: { "totalSaleAmount": { $gte: 100 } }
     }
   ]
 )

 db.sales.aggregate([
  {
    $match : { "date": { $gte: new ISODate("2014-01-01"), $lt: new ISODate("2015-01-01") } }
  },
  {
    $group : {
       _id : { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
       totalSaleAmount: { $sum: { $multiply: [ "$price", "$quantity" ] } },
       averageQuantity: { $avg: "$quantity" },
      //  count: { $sum: 1 },
       count:{$count:{}}
    }
  },
  {
    $sort : { totalSaleAmount: -1 }
  }
 ])


 // group by null(分组为整个集合)
 db.sales.aggregate([
  {
    $group : {
       _id : null,
       totalSaleAmount: { $sum: { $multiply: [ "$price", "$quantity" ] } },
       averageQuantity: { $avg: "$quantity" },
      //  count: { $sum: 1 },
       count:{$count:{}}
    }
  }
])

db.books.deleteMany()
db.books.insertMany([
  { "_id" : 8751, "title" : "The Banquet", "author" : "Dante", "copies" : 2 },
  { "_id" : 8752, "title" : "Divine Comedy", "author" : "Dante", "copies" : 1 },
  { "_id" : 8645, "title" : "Eclogues", "author" : "Dante", "copies" : 2 },
  { "_id" : 7000, "title" : "The Odyssey", "author" : "Homer", "copies" : 10 },
  { "_id" : 7020, "title" : "Iliad", "author" : "Homer", "copies" : 10 }
])
db.books.find()

// map-reduce: 将分组后的数据集写入一行记录中。
db.books.aggregate([
  {
    $group:{
      _id: "$author",
      books:{
        $push:"$title"
      }
    }
  }
])

db.books.aggregate([
  {
    $group : { _id : "$author", books: { $push: "$$ROOT" } }
  },
  {
    $addFields:
      { // 计算数组总值
        totalCopies : { $sum: "$books.copies" }
      }
  }
])

db.books.aggregate([
  { $limit : 3 }
]);








