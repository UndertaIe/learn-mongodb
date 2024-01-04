// Select the database to use.
use('mongodbVSCodePlaygroundDB');
db.getCollection('inventory').insert({
  "content": "...",
  "comments": [
      {
          "author": "joe",
          "score": 3,
          "comment": "nice post"
      },
      {
          "author": "mary",
          "score": 6,
          "comment": "terrible post"
      },
      {
          "author": "luy",
          "score": 9,
          "comment": "file post"
      }
  ]
});

use('mongodbVSCodePlaygroundDB');
db.getCollection("inventory").find({"content":"..."});

// 正确的文档顺序匹配文档
use('mongodbVSCodePlaygroundDB');
db.getCollection("inventory").find({"comments":{"author":"joe","score":3, "comment":"nice post"}});

// 文档顺序不正确匹配不到数组中元素
use('mongodbVSCodePlaygroundDB');
db.getCollection("inventory").find({"comments":{"author":"joe","comment":"nice post","score":3}});

// dot访问数组中元素，多个条件则不会对数组中一个元素进行匹配。
use('mongodbVSCodePlaygroundDB'); // 结果可看到score=3是第一个文档，author=mary是第二个文档
db.getCollection("inventory").find({"comments.score":3, "comments.author":"mary"});

// 使用elemMatch实现多个条件匹配数组中的文档类型数据
// elemMatch保证了匹配的数组元素中的字段满足了所有的过滤条件
use('mongodbVSCodePlaygroundDB');
db.getCollection('inventory').find({
  "comments": {"$elemMatch":{ "author": "joe", "comment": "nice post", "score": 3 }}
});
use('mongodbVSCodePlaygroundDB');
db.getCollection('inventory').find({
  "comments": {"$elemMatch":{ "author": "mary", "comment": "nice post", "score": 3 }}
});