// Select the database to use.
use('mongodbVSCodePlaygroundDB');

db.aggregate( [
  {
     $documents: [
        { playerId: "PlayerA", gameId: "G1", score: 1 },
        { playerId: "PlayerB", gameId: "G1", score: 2 },
        { playerId: "PlayerC", gameId: "G1", score: 3 },
        { playerId: "PlayerD", gameId: "G1" },
        { playerId: "PlayerE", gameId: "G1", score: null }
     ]
  },
  {
     $group:
     {
        _id: "$gameId",
        maximumThreeScores:
           {
              $maxN:
                 {
                    input: "$score",
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
]);

db.gamescores.aggregate( [
  {
     $group:
        {
           _id: "$gameId",
           maxThreeScores:
              {
                 $maxN:
                 {
                    input: ["$score","$playerId"],
                    n:3
                 }
              }
        }
  }
] )

db.scores.deleteMany({})
db.scores.insertMany([
  { "playerId" : 1, "score" : [ 1, 2, 3 ] },
  { "playerId" : 2, "score" : [ 12, 90, 7, 89, 8 ] },
  { "playerId" : 3, "score" : [ null ] },
  { "playerId" : 4, "score" : [ ] },
  { "playerId" : 5, "score" : [ 1293, "2", 3489, 9 ]},
])

db.scores.aggregate([
  { $set: { maxScores: { $maxN: { n: 3, input: "$score" } } } },
])

