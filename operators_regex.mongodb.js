// Select the database to use.
use('mongodbVSCodePlaygroundDB');

db.createCollection( "myColl", { collation: { locale: "fr", strength: 1 } } );

db.myColl.insertMany([
   { _id: 1, category: "café" },
   { _id: 2, category: "cafe" },
   { _id: 3, category: "cafE" }
]);

db.myColl.aggregate( [ { $match: { category: "cafe" } } ] );

db.myColl.aggregate( [ { $addFields: { resultObject: { $regexFind: { input: "$category", regex: /cafe/ }  } } } ] )

db.myColl.aggregate(
   [ { $addFields: { resultObject: { $regexFind: { input: "$category", regex: /cafe/ }  } } } ],
   { collation: { locale: "fr", strength: 1 } }           // Ignored in the $regexFind
)

db.contacts.insertMany([
   { "_id": 1, "fname": "Carol", "lname": "Smith", "phone": "718-555-0113" },
   { "_id": 2, "fname": "Daryl", "lname": "Doe", "phone": "212-555-8832" },
   { "_id": 3, "fname": "Polly", "lname": "Andrews", "phone": "208-555-1932" },
   { "_id": 4, "fname": "Colleen", "lname": "Duncan", "phone": "775-555-0187" },
   { "_id": 5, "fname": "Luna", "lname": "Clarke", "phone": "917-555-4414" }
 ])
