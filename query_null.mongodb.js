// Select the database to use.
use('mongodbVSCodePlaygroundDB');

db.null.deleteMany({})
db.null.insertMany([
    {   
        id:"1",
        "gender":null
    },
    {   
        id:"2",
        "gender":null
    },
    {   
        id:"3"
    },
    {   
        id:"2",
        "gender":"1"
    },
]);

db.null.find({});

// 查询条件字段为空的文档/记录. ps: 条件字段不存在的文档{id:"3"}包含在结果集中。
db.null.find({"gender":null});

// 如果查询结果想要字段存在且为null时
db.null.find({"gender":{$eq: null, $exists:true}}); //等同 {$type: 10}
db.null.find({"gender": {$type: 10 }});

// 查询条件字段不为空且存在的文档/记录 tips: {id:"3"}没有出现在结果集
db.null.find({"gender":{$ne: null}}); // 等同 {$exists:true, $ne: null}


