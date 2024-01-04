// Select the database to use.
use('mongodbVSCodePlaygroundDB');

db.gamescores.deleteMany({});
db.gamescores.insertMany([
  { playerId: "PlayerA", gameId: "G1", score: 31 },
  { playerId: "PlayerB", gameId: "G1", score: 33 },
  { playerId: "PlayerC", gameId: "G1", score: 99 },
  { playerId: "PlayerD", gameId: "G1", score: 1 },
  { playerId: "PlayerA", gameId: "G2", score: 10 },
  { playerId: "PlayerB", gameId: "G2", score: 14 },
  { playerId: "PlayerC", gameId: "G2", score: 66 },
  { playerId: "PlayerD", gameId: "G2", score: 80 }
]);

// 分组后取排序后第一个记录
db.gamescores.aggregate( [
  {
     $group:
        {
           _id: "$gameId",
           playerId:
              {
                 $top:
                 {
                    output: [ "$playerId", "$score" ],
                    sortBy: { "score": -1 }
                 }
              }
        }
  }
] )

// 分组后取排序后N个记录
db.gamescores.aggregate( [
  {
     $group:
        {
           _id: "$gameId",
           playerId:
              {
                 $topN:
                 {
                    output: [ "$playerId", "$score" ],
                    sortBy: { "score": -1 },
                    n:3,
                 }
              }
        }
  }
] )

db.test02.deleteMany({})
db.test02.insertMany([
   {
      members:[1,2,3,4],
   },
   {
      members:[1],
   },
   {
      members:[1,2],
   },  
    {
      members:[1,2,3],
   },
   {
      members:[],
   },
   {
      members:null,
   },
   {
      _dsa:1
   },
])
db.test02.find()


db.test02.aggregate([
   {
      $match: 
      {
         members: 
         {
            $not:
            {
               $eq: null
            }
         }
      }
   },
   {
      $set: 
      {
         "members_size": 
         {
            $size:"$members"
         }
      }
   }
])

//  过滤数组长度小于3的文档
db.test02.aggregate([
   {  $match: {
      "members.2":{$exists:1}
      }
   }
])

use('test');
db.test03.deleteMany({})
db.test03.insertMany([
{"name":{"k1":"v1","k2":"v2"}},
{"name":{"k1":"v2","k2":"v1"}}
])
db.test03.find({})

db.test03.aggregate([
   {$match: {
      "name.k1":"v1"
      }
   }
])

db.test03.aggregate([
   {$match: {
      "name.k1":{"$eq":"$name.k2"}
      }
   }
])

use('test');
db.test04.deleteMany({})
db.test04.insertMany([
{"name":[{"k1":1,"k2":1},{"k1":1,"k2":2}]},
{"name":[{"k1":1,"k2":1},{"k1":1,"k2":1}]},
])
db.test04.find({
   "name":{
      $elemMatch: {
         "$eq":["$k1","v1"],
      }
   }
})

db.players.insertMany([
   { _id: 1, name: "Miss Cheevous",  scores: [ 10, 5, 10 ] },
   { _id: 2, name: "Miss Ann Thrope", scores: [ 10, 10, 10 ] },
   { _id: 3, name: "Mrs. Eppie Delta ", scores: [ 9, 8, 8 ] }
])

db.players.find( {$expr: { $function: {
   body: function(name) { return hex_md5(name) == "15b0a220baa16331e8d80e15367677ad"; },
   args: [ "$name" ],
   lang: "js"
} } } );


db.test03.aggregate([
   {"$match": {
      $expr: { $function: {
         body: function(papers) {
            for(i=0;i<papers.length;i++){
               if( papers[i].total != papers[i].finished){
                  return true;
               }
            }
            return false
         },
         args: [ "$name" ],
         lang: "js"
      } } 
    },
   }
])


// db.mark_jobs.aggregate([
//    {"$match": {
//       $expr: { "$function": {
//          body: function(papers) {
//             for(i=0;i<papers.length;i++){
//                if( papers[i].total != papers[i].finished){
//                   return true;
//                }
//             }
//             return false
//          },
//          args: [ "$papers" ],
//          lang: "js"
//       } } 
//     },
//    }
// ]);

db.getCollectionInfos()

db.identfiedDoc.insertOne({
   name : 1,
   name: 2,
})
db.identfiedDoc.find({})