var express = require("express");
var bodyParser = require('body-parser')

var app = express();

// 静态文件伺服
app.use(express.static("./public"));

// 路由
app.get("/",function(req,res){
    res.send("你好");
});

//无视大小写、? 和 #
app.get("/ABc",function(req,res){
    res.send("你好");
});

app.get("/home",function(req,res){
    res.send("this is my home");
});
// http://127.0.0.1:3000/student/1234567890
// app.get(/^\/student\/([\d]{10})$/,function(req,res){
//     console.log(req.params);// 类数组对象 { '0': '1234567890' }
//     res.send("学生信息，学号" + req.params[0]);
// });
app.get("/student/:id",function(req,res){
    var id = req.params["id"];
    var reg= /^[\d]{6}$/;
    if(reg.test(id)){
        res.send("学生信息，学号" + req.params[0]);
    }else{
        res.send("请检查格式");
    }
});

// http://127.0.0.1:3000/teacher/666
app.get("/teacher/:id",function(req,res){
    res.send("老师信息，工号" + req.params.id);
});

app.get("/:user/:oid",function(req,res){
    var username = req.params["user"];
    var oid = req.params["oid"];

    res.write(username);
    res.end(oid);
});
/*
app.get("/:username/:id",function(req,res,next){
    var username = req.params.username;
    //检索数据库，如果username不存在，那么next()
    if(检索数据库){
        console.log("1");
        res.send("用户信息");
    }else{
        // 路由get、post这些东西，就是中间件，中间件讲究顺序，匹配上第一个之后，就不会往后匹配了。next函数才能够继续往后匹配
        next();
    }
});

app.get("/admin/login",function(req,res){
    console.log("2");
    res.send("管理员登录");
});
*/
// 使用模板引擎
app.set("view engine","ejs");

app.get("/news",function(req,res){
    // 默认从views文件夹找对应的文件
    res.render("news",{
        "news" : ["2018年央视春晚主持阵容公布:康辉朱迅等联袂主持",
                "2018年，你最应该跟踪的全球十大开源AI项目",
                "美股跌出新纪录万亿美元蒸发 白宫紧急回应"]
    });
});

// 适合进行 RESTful路由设计。简单说，就是一个路径，但是http method不同，对这个页面的使用也不同。
app.get("/register",function(req,res){
    res.render("form");
});

// POST请求在express中不能直接获得，必须使用body-parser模块。
// 使用后，将可以用req.body得到参数。但是如果表单中含有文件上传，那么还是需要使用formidable模块。
app.use(bodyParser.urlencoded({ extended: false }))

app.post("/register",function(req,res){
   res.send(req.body);
});

//会自动识别err参数，如果有，那么就这个函数能捕获err
app.use(function(req,res){
    res.status(404).send("没有这个页面！");
});

app.listen(3000);