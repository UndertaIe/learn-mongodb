// Select the database to use.
use('mongodbVSCodePlaygroundDB');

db.days.deleteMany({})
db.days.insertMany( [
   {
      "_id" : 1,
      "item" : "abc",
      "price" : 10,
      "quantity" : 2,
      "date" : ISODate("2023-08-10T11:14:00.736")
    }    
]);
db.days.find({})

db.days.aggregate([
   {
      $project:  {
         year: { $year: "$date" },
         month: { $month: "$date" },
         day: { $dayOfMonth: "$date" },
         hour: { $hour: "$date" },
         minutes: { $minute: "$date" },
         seconds: { $second: "$date" },
         milliseconds: { $millisecond: "$date" },
         dayOfYear: { $dayOfYear: "$date" },
         dayOfWeekforShanghai: { $dayOfWeek: {date:"$date", timezone: "Asia/Shanghai" }},
         dayOfWeekforUTC: { $dayOfWeek: {date:"$date" }},
         week: { $week: "$date" }
       }
    }
]);








