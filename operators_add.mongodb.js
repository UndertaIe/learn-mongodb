// Select the database to use.
use('mongodbVSCodePlaygroundDB');

db.temperatureChange.deleteMany({})
db.temperatureChange.insertMany( [
    { _id: 1, startTemp: 50, endTemp: 80 },
    { _id: 2, startTemp: 40, endTemp: 40 },
    { _id: 3, startTemp: 90, endTemp: 70 },
    { _id: 4, startTemp: 60, endTemp: 70 }
 ] );

 /*
    select *, abs(start-end) as delta
    from temperatureChange
 */
 db.temperatureChange.aggregate([
    {
        $set:{
            rubbish:{
                $add:["$startTemp", "$endTemp"]
            }
        }
    }
 ])