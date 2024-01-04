// Select the database to use.
use('mongodbVSCodePlaygroundDB');

db.getCollection("users").find({});

db.getCollection("users").update({"_id": ObjectId('64ca21fff6e76623f7fbbe85')},{"$set":{"name":"ning","story":"good story again!"}});

db.getCollection("users").updateOne({"_id": ObjectId('64ca21fff6e76623f7fbbe85')},{"$set":{"name":"ning","story":"good story more again!"}});

db.getCollection("users").updateMany({name:"joe"}, {$set:{story:" joe bad story!"}});

// 返回更新前的文档
db.getCollection("users").findOneAndUpdate({"name":"bobo"},{$set:{type:555}});

db.getCollection("users").insertOne({type:4, name:"nothing"});
db.getCollection("users").findOneAndDelete({type:4});

db.getCollection("users").bulkWrite()