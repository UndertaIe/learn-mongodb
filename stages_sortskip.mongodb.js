
db.sales.find();
db.sales.aggregate([
  {
    $sort:{
      // price:1,
      price:-1,
      item:-1,
    }
  },
  {
    $project: {
      item:1,
      price:1,
    }
  }
])
db.sales.aggregate([
  {
    $count:"count"
  }
])
db.sales.aggregate([
  {
    $skip:6
  }
])