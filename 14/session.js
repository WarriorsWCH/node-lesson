var express = require("express");
var app = express();
var session = require("express-session");

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));

app.get("/",function(req,res){
	if(req.session.isLogin){
		res.send("欢迎" + req.session.username);
	}else{
		res.send("没有成功登陆");
	}
});

app.get("/login",function(req,res){
	req.session.isLogin = true;	//设置这个session
	req.session.username = "管理员";
	res.send("你已经成功登陆");
});

app.listen(3000);