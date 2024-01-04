// Select the database to use.
use('mongodbVSCodePlaygroundDB');

db.getSiblingDB("zoo").salaries.deleteMany({})
db.getSiblingDB("zoo").salaries.insertMany([
  { "_id" : 1, "employee" : "Ant", "dept" : "A", "salary" : 100000, "fiscal_year" : 2017 },
  { "_id" : 2, "employee" : "Bee", "dept" : "A", "salary" : 120000, "fiscal_year" : 2017 },
  { "_id" : 3, "employee" : "Cat", "dept" : "Z", "salary" : 115000, "fiscal_year" : 2017 },
  { "_id" : 4, "employee" : "Ant", "dept" : "A", "salary" : 115000, "fiscal_year" : 2018 },
  { "_id" : 5, "employee" : "Bee", "dept" : "Z", "salary" : 145000, "fiscal_year" : 2018 },
  { "_id" : 6, "employee" : "Cat", "dept" : "Z", "salary" : 135000, "fiscal_year" : 2018 },
  { "_id" : 7, "employee" : "Gecko", "dept" : "A", "salary" : 100000, "fiscal_year" : 2018},
  { "_id" : 8, "employee" : "Ant", "dept" : "A", "salary" : 125000, "fiscal_year" : 2019 },
  { "_id" : 9, "employee" : "Bee", "dept" : "Z", "salary" : 160000, "fiscal_year" : 2019 },
  { "_id" : 10, "employee" : "Cat", "dept" : "Z", "salary" : 150000, "fiscal_year" : 2019 },
  { "_id" : 11, "employee" : "Wren", "dept" : "Z", "salary" : 100000, "fiscal_year" : 2019 },
  { "_id" : 12, "employee" : "Zebra", "dept" : "A", "salary" : 150000, "fiscal_year" : 2019 },
  { "_id" : 13, "employee" : "headcount1", "dept" : "Z", "salary" : 120000, "fiscal_year" : 2020 },
  { "_id" : 14, "employee" : "headcount2", "dept" : "Z", "salary" : 120000, "fiscal_year" : 2020 },
]);

db.getSiblingDB("zoo").salaries.aggregate( [
  { $group: { _id: { fiscal_year: "$fiscal_year", dept: "$dept" }, salaries: { $sum: "$salary" } } },
  { $merge : { into: { db: "reporting", coll: "budgets" }, on: "_id",  whenMatched: "replace", whenNotMatched: "insert" } }
] )

db.getSiblingDB("zoo").salaries.aggregate( [
  { $match: { fiscal_year: 2019 }},
  { $group: { _id: { fiscal_year: "$fiscal_year", dept: "$dept" }, employees: { $push: "$employee" } } },
  { $project: { _id: 0, dept: "$_id.dept", fiscal_year: "$_id.fiscal_year", employees: 1 } },
  { $merge : { into : { db: "reporting", coll: "orgArchive" }, on: [ "dept", "fiscal_year" ], whenMatched: "fail" } }
] )

db.purchaseorders.insertMany( [
  { _id: 1, quarter: "2019Q1", region: "A", qty: 200, reportDate: new Date("2019-04-01") },
  { _id: 2, quarter: "2019Q1", region: "B", qty: 300, reportDate: new Date("2019-04-01") },
  { _id: 3, quarter: "2019Q1", region: "C", qty: 700, reportDate: new Date("2019-04-01") },
  { _id: 4, quarter: "2019Q2", region: "B", qty: 300, reportDate: new Date("2019-07-01") },
  { _id: 5, quarter: "2019Q2", region: "C", qty: 1000, reportDate: new Date("2019-07-01") },
  { _id: 6, quarter: "2019Q2", region: "A", qty: 400, reportDate: new Date("2019-07-01") },
] )

db.purchaseorders.aggregate( [
  { $group: { _id: "$quarter", purchased: { $sum: "$qty" } } },  // group purchase orders by quarter
  { $merge : { into: "quarterlyreport", on: "_id",  whenMatched: "merge", whenNotMatched: "insert" } }
])

