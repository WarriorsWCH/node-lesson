
var express = require("express");
var app = express();
var db = require("../model/db.js");

//插入数据，使用我们自己封装db模块，就是DAO。
app.get("/insert",function(req,res){
    //三个参数，往哪个集合中增加，增加什么，增加之后做什么
    var data = {"name":'A'+ Math.ceil(Math.random(10)*10),
                'age':Math.ceil(Math.random(10)*10)};
    db.insertOne("student",data,function(err,result){
        if(err){
            console.log("插入失败");
            return;
        }
        res.send("插入成功");
    });
});


//查找
app.get("/find",function(req,res){
    //这个页面现在接受一个page参数。
    var page = parseInt(req.query.page);  //express中读取get参数很简单
    //查找4个参数，在哪个集合查，查什么，分页设置，查完之后做什么
    db.find("student",{},{"size":5,"page":page},function(err,result){
        if(err){
            console.log(err);
        }
        res.send(result);
    });
});

//删除
app.get("/delete",function(req,res){
    var age = parseInt(req.query.age);
    db.deleteMany("student",{"age":age},function(err,result){
       if(err){
           console.log(err);
       }
        res.send(result);
    });
});


//修改
app.get("/update",function(req,res){
    db.updateMany(
        "student",      //集合名字
        {
            "age": 8    //改什么
        },
        {
            $set: { 'age': 10000 }     //怎么改
        },
        function(err,result){   //改完之后做什么
            if(err){
                console.log(err);
            }
            res.send(result);
        }
    );
});

app.listen(3000);