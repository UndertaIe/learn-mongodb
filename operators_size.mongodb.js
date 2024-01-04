// Select the database to use.
use('mongodbVSCodePlaygroundDB');

db.items.deleteMany({});
db.items.insertMany( [
  { "_id" : 1, "items":[1,2,3]},
] );
// $size: 数组长度
db.items.aggregate([
  {
    $set:{
      items_size:{$size:"$items"}
    }
  }
]);





