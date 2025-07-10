// Select the database to use.

db.aggregate_plus.deleteMany({})
db.aggregate_plus.insertMany([
    {
        _id: 0, name: "Pepperoni", size: "small", price: 19,
        quantity: 10, date: ISODate("2021-03-13T08:14:30Z")
    },
    {
        _id: 1, name: "Pepperoni", size: "medium", price: 20,
        quantity: 20, date: ISODate("2021-03-13T09:13:24Z")
    },
    {
        _id: 2, name: "Pepperoni", size: "large", price: 21,
        quantity: 30, date: ISODate("2021-03-17T09:22:12Z")
    },
    {
        _id: 3, name: "Cheese", size: "small", price: 12,
        quantity: 15, date: ISODate("2021-03-13T11:21:39.736Z")
    },
    {
        _id: 4, name: "Cheese", size: "medium", price: 13,
        quantity: 50, date: ISODate("2022-01-12T21:23:13.331Z")
    },
    {
        _id: 5, name: "Cheese", size: "medium", price: 13,
        quantity: 30, date: ISODate("2022-01-12T21:23:13.331Z")
    },
    {
        _id: 6, name: "Cheese", size: "large", price: 14,
        quantity: 10, date: ISODate("2022-01-12T05:08:13Z")
    },
    {
        _id: 7, name: "Vegan", size: "small", price: 17,
        quantity: 10, date: ISODate("2021-01-13T05:08:13Z")
    },
    {
        _id: 8, name: "Vegan", size: "medium", price: 18,
        quantity: 10, date: ISODate("2021-01-13T05:10:13Z")
    }
]);

db.aggregate_plus.find({});
db.aggregate_plus.aggregate([
    {
        $match: {
            size: "medium"
        }
    },
    {
        $group: {
            _id: "$name",
            totalQuantity: { $sum: "$quantity" },
            count: { $count: {} },
            avg: { $avg: "$quantity" }
        }
    }
]);

db.aggregate_plus.aggregate([
    // Stage 1: Filter pizza order documents by date range
    {
        $match:
        {
            "date": { $gte: new ISODate("2020-01-30"), $lt: new ISODate("2022-01-30") }
        }
    },
    // Stage 2: Group remaining documents by date and calculate results
    {
        $group:
        {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
            totalOrderValue: { $sum: { $multiply: ["$price", "$quantity"] } },
            averageOrderQuantity: { $avg: "$quantity" }
        }
    },
    // Stage 3: Sort documents by totalOrderValue in descending order
    {
        $sort: { totalOrderValue: -1 }
    }
])


db.users.deleteMany({})
db.users.insertMany([
    {
        _id: "jane",
        joined: ISODate("2011-03-02"),
        likes: ["golf", "racquetball"]
    },
    {
        _id: "joe",
        joined: ISODate("2012-07-02"),
        likes: ["tennis", "golf", "swimming"]
    }
]);
db.users.find({});

db.users.aggregate(
    [
        {$set: { name:{$toUpper: "$_id"}, _id:0, likes:"$likes", joined_month: {$month: "$joined"} } },
        {$sort: {name:1}}
    ]
)

db.users.aggregate(
    [
        { $project : { month_joined : { $month : "$joined" } } } ,
        { $group : { _id : {month_joined:"$month_joined",fieldA:"A"} , number : { $sum : 1 } } },
        { $sort : { "_id.month_joined" : 1 } }
    ]
)

db.testuser.insert({"name":"noob"})
db.users.aggregate(
    [
        {$project:{likes:"$likes", _id:0}},
        {$unwind : "$likes" },
        {$group:{_id:"$likes", count:{$count:{}}} },
        {$sort:{count:1}},
        // {$limit: 3}
    ]
  )


// 分组 后累加字段值
// id val
// 1  2
// 1  3
// 2  4
// groupby nil;sum(val)=9
//   var _result []struct {
//     Count int64 `bson:"count"`
// }
// _pipeline := bson.A{
//     bson.M{
//         "$match": bson.M{
//             "department_id": bson.M{
//                 "$in": departmentIds,
//             },
//         },
//     },
//     bson.M{
//         "$group": bson.M{
//             "_id":   nil,
//             "count": bson.M{"$sum": "$examiner_count"},
//         },
//     },
// }
// if err := e.exam.Aggregate(ctx, _result, _pipeline); err != nil {
//     return 0, err
// }

// if len(_result) != 0 {
//     return _result[0].Count, nil
// }





