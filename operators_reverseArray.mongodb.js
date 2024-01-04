// Select the database to use.
use('mongodbVSCodePlaygroundDB');

db.users.aggregate([
  {
    $set: {
      reversed_likes: {$reverseArray:"$likes"}
    }
  }
]);

db.version();





