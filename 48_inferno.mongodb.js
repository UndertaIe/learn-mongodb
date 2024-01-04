
use('inferno_dev');
db.getCollection("exam_v2").find({});

use('inferno_dev');
db.getCollection("hall").find({});

use('inferno_dev');
db.getCollection("exam_v2").aggregate([
    {
        $match: {
        "department_id":{$in:["64d1f68e318cd385bd16e2fa","64d1ae63282ca1d8d0b37e8a"]}
        }
    },
    {
        $set: {
            "halls":{
                $map:{
                    input:"$halls",
                    as:"hall",
                    in:"$$hall._id"
                }
            }
        }
    },
    {
        $lookup: {
            from: "hall",
            localField: "halls",
            foreignField: "_id",
            as: "halls"
        }
    },
    {
        $project: {
            halls:"$halls"
        }
    },
    {
        $unwind: {
            "path":"$halls"
        }
    },
    {
        $project: {
           "present": {
                $size:{ $filter: {
                            input: "$halls.examinees",
                            as: "item",
                            cond: { $eq: [ "$$item.is_absent", true ] }
                            }
                        }
                },
           "absent": {
                $size:{ $filter: {
                        input: "$halls.examinees",
                        as: "item",
                        cond: { $ne: [ "$$item.is_absent", true ] }
                    }
                }
           }
        }
    },
    // {
    //     $group: {
    //         "_id":   null,
    //         "present_count": {"$sum": {"$sum":"$present"}},
    //         "absent_count": {"$sum":  {"$sum":"$absent"}},
    //     },
    // }
])

   