/**
 * Created by Peng on 2016-11-27.
 */
var express = require("express");
var app= express();

var db=require("./model/db.js");

app.get("/",function(req,res){
    db.insertOne("teacher",{"name":"bbb"},function (err,result) {
        if(err){
            console.log("cannot insert this document");
            return;
        }
        res.send("data added successful");
    });
});


app.get("/allDate",function(req,res){
    db.find("student",{"age":{$gt:10}},function(err,result){
        console.log(result);
    });
});

app.get("/fengye",function (req,res) {
    var page=parseInt(req.query.page);
    var resultSet=[];
   db.find("student",{},function (err,result) {
       for(var i=10*page;i<10*(page+1);i++){
            resultSet.push(result[i]);
       }
       res.json(resultSet);
   })
});

app.get("/newfengye",function (req,res) {
   var page=parseInt(req.query.page);

   db.newFind("student",{},{"pageamount":5,"page":page},function (err,result) {
       if(err){
           return console.log(err);
       }
       res.send(result);
   });
   //res.end();
});


app.get("/deleteMany",function (req,res) {
    var student_id=req.query.id;
    db.removeMany("student",{"student_id":student_id},function(err,result){
        if(err){
            console.log(err);
        }
        res.send(result);
    })
});

app.get("/update",function (req,res) {
    db.updateMany("student",{"student_id":"001"},
        { $set:{student_id:"002"}
    },function(err,result) {
        if(err){
            console.log(err);
        }
        res.send(result);
    });
});


app.listen(3000);