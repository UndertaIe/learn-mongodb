
db.scores.deleteMany({})
db.scores.insertMany([
  { _id: 1, student: "Maya", homework: [ 10, 5, 10 ], quiz: [ 10, 8 ], extraCredit: 0 },
  { _id: 2, student: "Ryan", homework: [ 5, 6, 5 ], quiz: [ 8, 8 ], extraCredit: 8 }
])

db.scores.aggregate([
  {
    $set: {
      homeworkTotal: {$sum: "$homework"},
      quizTotal: {$sum: "$quiz"},
    }
  },
  {
    $set: {
      total:{
        $add: ["$homeworkTotal", "$quizTotal", "$extraCredit"]
      }
    }
  }
])

// 添加字段
db.scores.aggregate([
  {
    $set: {
      grade: 14
    }
  }
])

//修改字段值
db.scores.aggregate([
  {
    $set: {
      student: "Maya02"
    }
  }
])