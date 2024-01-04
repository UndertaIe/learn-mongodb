// Select the database to use.
use('test');

db.emp.insertMany([
   { "_id" : 1, "name" : "Dev" },
   { "_id" : 2, "name" : "Eliot", "reportsTo" : "Dev" },
   { "_id" : 3, "name" : "Ron", "reportsTo" : "Eliot" },
   { "_id" : 4, "name" : "Andrew", "reportsTo" : "Eliot" },
   { "_id" : 5, "name" : "Asya", "reportsTo" : "Ron" },
   { "_id" : 6, "name" : "Dan", "reportsTo" : "Andrew" },
])

db.emp.aggregate( [
   {
      $graphLookup: {
         from: "emp",
         startWith: "$reportsTo",
         connectFromField: "reportsTo",
         connectToField: "name",
         as: "reportingHierarchy"
      }
   }
] )



