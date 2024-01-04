// Select the database to use.
use('mongodbVSCodePlaygroundDB');

db.scores.deleteMany({})

db.scores.insertMany([
  { "_id" : 1, "subject" : "History", "score" : 88 },
  { "_id" : 2, "subject" : "History", "score" : 92 },
  { "_id" : 3, "subject" : "History", "score" : 97 },
  { "_id" : 4, "subject" : "History", "score" : 71 },
  { "_id" : 5, "subject" : "History", "score" : 79 },
  { "_id" : 6, "subject" : "History", "score" : 83 },
])
db.scores.find({})

// 计数三种方法
// 1. documentCount: { $sum: 1 }
db.scores.aggregate( [
  { $group: { _id: null, documentCount: { $sum: 1 } } },
  { $project: { _id: 0 } }
] )

// 2. documentCount: { $count: {} }
db.scores.aggregate( [
  { $group: { _id: null, documentCount: { $count: {} } } },
  { $project: { _id: 0 } }
] )

// 3. $count:"count"
db.scores.aggregate( [
  {
    $count:"count"
  }
])




