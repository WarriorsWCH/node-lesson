//require表示引包
var http = require("http");
var fs = require("fs");

var server = http.createServer(function(req,res){
	if(req.url == "/fang"){
		fs.readFile("./red.html",function(err,data){
			res.writeHead(200,{"Content-type":"text/html;charset=UTF-8"});
			res.end(data);
		});
	}else if(req.url == "/yuan"){
		fs.readFile("./green.html",function(err,data){
			res.writeHead(200,{"Content-type":"text/html;charset=UTF-8"});
			res.end(data);
		});
	}else if(req.url == "/0.jpg"){
		fs.readFile("./0.jpg",function(err,data){
			res.writeHead(200,{"Content-type":"image/jpg"});
			res.end(data);
		});
	}else if(req.url == "/style.css"){
		fs.readFile("./style.css",function(err,data){
			res.writeHead(200,{"Content-type":"text/css"});
			res.end(data);
		});
	}else{
		res.writeHead(404,{"Content-type":"text/html;charset=UTF-8"});
		res.end("not found");
	}
});

//运行服务器，监听3000端口（端口号可以任改）
server.listen(3000,"127.0.0.1");
// 运行后访问 http://127.0.0.1:3000/yuan http://127.0.0.1:3000/fang