// Select the database to use.
use('test');

db.getCollection("users").find({});

db.getCollection("users").insert({"type":2,"name":"ning","story":"good story!"});
db.getCollection("users").insertOne({"type":3,"name":"joe","story":"bad story!"});
db.getCollection("users").insertMany([{"type":3,"name":"joe","story":"bad story!"},{"type":5,"name":"bobo","story":"normal story!"}])

db.bulker.insertMany([
    {"_id":2,"key":"value1"},
    {"_id":3,"key":"value2"},
    {"_id":4,"key":"value3"},
])
db.bulker.find({})
db.bulker.bulkWrite( [
    { updateOne :
       {
          "filter" : {"_id":2},
          "update" : {"$set":{"key":"value22"}},
       }
    },
    { updateOne :
        {
           "filter" : {"_id":3},
           "update" : {"$set":{"key":"value33"}},
        }
     },
     { updateOne :
        {
           "filter" : {"_id":4},
           "update" : {"$set":{"key":"value44"}},
        }
     },  
 ] )

 db.bulker.updateMany(
    {"_id":55},{"$set":{"key":"value1"}},
)