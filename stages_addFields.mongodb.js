
db.stages_add_fields.deleteMany({})
db.stages_add_fields.insertMany([
    {
        _id: 1,
        student: "Maya",
        homework: [ 10, 5, 10 ],
        quiz: [ 10, 8 ],
        extraCredit: 0
    },
    {
        _id: 2,
        student: "Ryan",
        homework: [ 5, 6, 5 ],
        quiz: [ 8, 8 ],
        extraCredit: 8
    }
]);
db.stages_add_fields.find({})

db.stages_add_fields.aggregate( [
    {
      $addFields: {
        totalHomework: { $sum: "$homework" },
        totalQuiz: { $sum: "$quiz" }
      }
    },
    {
      $addFields: { totalScore:
        { $add: [ "$totalHomework", "$totalQuiz", "$extraCredit" ] } }
    }
])

db.stages_add_fields.aggregate([
    {
        $addFields: {
          countHomework: {$len:"$homework"}
        }
    }
]);

db.vehicles.deleteMany({})
db.vehicles.insertMany(
    [
       { _id: 1, type: "car", specs: { doors: 4, wheels: 4 } },
       { _id: 2, type: "motorcycle", specs: { doors: 0, wheels: 2 } },
       { _id: 3, type: "jet ski" }
    ]
 )
 db.vehicles.find({})
 
 // 嵌套文档中增加字段
 db.vehicles.aggregate([
    {
        $addFields: {
          "specs.third": "val"
        }
    }
 ])
 db.vehicles.deleteMany({})
// 替换字段/增加默认字段
 db.vehicles.aggregate([
    {
        $addFields: {
          "_id": "$type","type":"Transport",
        }
    }
 ]);

 db.scores.deleteMany({})
 db.scores.insertMany([
    { _id: 1, student: "Maya", homework: [ 10, 5, 10 ], quiz: [ 10, 8 ], extraCredit: 0 },
    { _id: 2, student: "Ryan", homework: [ 5, 6, 5 ], quiz: [ 8, 8 ], extraCredit: 8 }
 ])
 db.scores.find({})

db.scores.aggregate([
    {
        $match: {
          _id:1
        }
    },
    {
        $addFields: {
            homework: {
                $concatArrays:["$homework",[777]]
            }
        }
    }
])







