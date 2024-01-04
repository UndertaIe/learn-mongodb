// Select the database to use.
use('mongodbVSCodePlaygroundDB');

db.aggregate( [
   {
      $documents: [
         { playerId: "PlayerA", gameId: "G1", score: 1 },
         { playerId: "PlayerB", gameId: "G1", score: 2 },
         { playerId: "PlayerC", gameId: "G1", score: 3 },
         { playerId: "PlayerD", gameId: "G1"},
         { playerId: "PlayerE", gameId: "G1", score: null },

      ]
   },
   {
      $group:
      {
         _id: "$gameId",
         playerId:
            {
               $bottom:
                  {
                     output: [ "$playerId", "$score" ],
                     sortBy: { "score": -1 }
                  }
            }
      }
   }
] )


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


// 分组获取组中最小值
db.gamescores.aggregate( [
   {
      $group:
         {
            _id: "$gameId",
            playerId:
               {
                  $bottom:
                  {
                     output: [ "$playerId", "$score" ],
                     sortBy: { "score": -1 }
                  }
               }
         }
   }
] )

db.aggregate( [
   {
      $documents: [
         { playerId: "PlayerA", gameId: "G1", score: 1 },
         { playerId: "PlayerC", gameId: "G1", score: "" },
         { playerId: "PlayerB", gameId: "G1", score: "2" },
      ]
   },
   {
      $group:
         {
            _id: "$gameId",
            playerId: {
               $bottomN:
               {
                  output: ["$playerId","$score"],
                  sortBy: {"score": -1},
                  n: 2
               }
            }
         }
   }
] )

db.gamescores.deleteMany({})
db.gamescores.insertMany([
   { playerId: "PlayerA", gameId: "G1", score: 31 },
   { playerId: "PlayerB", gameId: "G1", score: 33 },
   { playerId: "PlayerC", gameId: "G1", score: 99 },
   { playerId: "PlayerD", gameId: "G1", score: 1 },
   { playerId: "PlayerA", gameId: "G2", score: 10 },
   { playerId: "PlayerB", gameId: "G2", score: 14 },
   { playerId: "PlayerC", gameId: "G2", score: 66 },
   { playerId: "PlayerD", gameId: "G2", score: 80 }
])

db.gamescores.aggregate( [
   {
      $group:
         {
            _id: "$gameId",
            playerId:
               {
                  $bottomN:
                  {
                     output: ["$playerId", "$score"],
                     sortBy: { "score": -1 },
                     n:2
                  }
               }
         }
   }
] )

