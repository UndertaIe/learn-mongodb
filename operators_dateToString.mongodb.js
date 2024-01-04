// Select the database to use.
use('mongodbVSCodePlaygroundDB');

db.dates.deleteMany({})
db.dates.insertMany( [
   {
      "_id" : 1,
      "item" : "abc",
      "price" : 10,
      "quantity" : 2,
      "date" : ISODate("2014-01-01T08:15:39.736Z")
    }
]);

db.dates.aggregate([
   {
      $project: {
         yearMonthDayUTC: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
         timewithOffsetNY: { $dateToString: { format: "%H:%M:%S:%L%z", date: "$date", timezone: "America/New_York"} },
         timewithOffset430: { $dateToString: { format: "%H:%M:%S:%L%z", date: "$date", timezone: "+04:30" } },
         minutesOffsetNY: { $dateToString: { format: "%Z", date: "$date", timezone: "America/New_York" } },
         minutesOffset430: { $dateToString: { format: "%Z", date: "$date", timezone: "+04:30" } }
      }
    }
]);








