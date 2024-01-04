// Select the database to use.
use('mongodbVSCodePlaygroundDB');

db.survey.deleteMany({})
db.survey.insertMany([
    { "_id" : 1, "responses" : [ true ] },
    { "_id" : 2, "responses" : [ true, false ] },
    { "_id" : 3, "responses" : [ ] },
    { "_id" : 4, "responses" : [ 1, true, "seven" ] },
    { "_id" : 5, "responses" : [ 0 ] },
    { "_id" : 6, "responses" : [ [ ] ] },
    { "_id" : 7, "responses" : [ [ 0 ] ] },
    { "_id" : 8, "responses" : [ [ false ] ] },
    { "_id" : 9, "responses" : [ null ] },
    { "_id" : 10, "responses" : [ undefined ] }
 ])
 // null,0,false 则allElementsTrue输出为false，其他均为true
 db.survey.aggregate(
    [
      { $project: { responses: 1, isAllTrue: { $allElementsTrue: [ "$responses" ] }, _id: 0 } }
    ]
 )