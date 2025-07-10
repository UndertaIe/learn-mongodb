// Select the database to use.
use('mongodbVSCodePlaygroundDB');

db.users.deleteMany({})
db.users.insertOne({likes:[1,2,3]})
db.users.aggregate([
  {
    $set: {
      reversed_likes: {$reverseArray:"$likes"}
    }
  }
]);

db.version();





