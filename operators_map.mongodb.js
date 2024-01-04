// Select the database to use.
use('mongodbVSCodePlaygroundDB');


db.grades.insertMany( [
   { quizzes: [ 5, 6, 7 ] },
   { quizzes: [ ] },
   { quizzes: [ 3, 8, 9 ] }
 ] )

//  Applies an expression to each item in an array and returns an array with the applied results.
db.grades.aggregate( [
   {
      $project: {
         adjustedGrades: {
           $map: {
             input: "$quizzes",
             as: "g", // 数组element自定义名称
             in: { $multiply: [ "$$g", 2 ] }
           }
         }
      }
   }
 ] )

 db.deliveries.insertMany( [
   {
     "city" : "Bakersfield",
     "distances" : [ 34.57, 81.96, 44.24 ]
   },
   {
     "city" : "Barstow",
     "distances" : [ 73.28, 9.67, 124.36 ]
   },
   {
     "city" : "San Bernadino",
     "distances" : [ 16.04, 3.25, 6.82 ]
   }
 ] )

 db.deliveries.aggregate( [
   {
      $project: {
         city: "$city",
         integerValues: {
            $map: {
               input: "$distances",
               as: "decimalValue",
               in: { $trunc: "$$decimalValue" }
            }
         }
      }
   }
 ] )


