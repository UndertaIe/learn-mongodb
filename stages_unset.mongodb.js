// Select the database to use.
use('mongodbVSCodePlaygroundDB');

db.sales.find();


// 等同于project fieldA=0
db.sales.aggregate([
  {
    $unset:"date"
  }
]);

db.sales.aggregate([
  {
    $unset:["date", "quantity"]
  }
])