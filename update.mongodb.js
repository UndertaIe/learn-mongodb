
db.users.find({});

db.users.update({"_id": ObjectId('686eac57f205ca30658789f6')},{"$set":{"name":"ning","story":"good story again!"}});

db.users.updateOne({"_id": ObjectId('686eac57f205ca30658789f6')},{"$set":{"name":"ning","story":"good story more again!"}});

db.users.updateMany({name:"joe"}, {$set:{story:" joe bad story!"}});

// 返回更新前的文档
db.users.findOneAndUpdate({"name":"bobo"},{$set:{type:555}});

db.users.insertOne({type:4, name:"nothing"});
db.users.findOneAndDelete({type:4});

db.users.bulkWrite()