
db.sales02.deleteMany({})
db.sales02.insertMany( [
    { "_id" : 1, "item" : "abc", "price" : 10, "quantity" : 2, "date" : ISODate("2014-01-01T08:00:00Z") },
    { "_id" : 2, "item" : "jkl", "price" : 20, "quantity" : 1, "date" : ISODate("2014-02-03T09:00:00Z") },
    { "_id" : 3, "item" : "xyz", "price" : 5, "quantity" : 5, "date" : ISODate("2014-02-03T09:05:00Z") },
    { "_id" : 4, "item" : "abc", "price" : 10, "quantity" : 10, "date" : ISODate("2014-02-15T08:00:00Z") },
    { "_id" : 5, "item" : "xyz", "price" : 5, "quantity" : 10, "date" : ISODate("2014-02-15T09:12:00Z") },
    { "_id" : 6, "item" : "xyz", "price" : 6, "quantity" : 11, "date" : ISODate("2014-02-15T09:13:00Z") },
 ] );

 /*

 */
// 分组将元素去重后添加到数组
 db.sales02.aggregate([
    {
        $group:{
            _id: { day: { $dayOfYear: "$date"}, year: { $year: "$date" } },
            itemsSold: { $addToSet: "$item" }
        }
    }
 ])

 // 分组后列直接添加到数组
 db.sales02.aggregate([
    {
        $group:{
            _id: { day: { $dayOfYear: "$date"}, year: { $year: "$date" } },
            itemsSold: { $push: "$item" }
        }
    }
 ])