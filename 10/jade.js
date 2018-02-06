
var jade = require("jade");
var fs = require("fs");
var http = require("http");


var server = http.createServer(function(req,res){
    fs.readFile("./index.jade",function(err,data){
        //绑定模板
        var template = data.toString();
        var dictionary = {
            a:'X',
            news : [
                {"title":"马航MH370事件再现谜团:搜索船离奇失联80小时","count":10},
                {"title":"马尔代夫总统宣布全国实行15天紧急状态","count":20},
                {"title":"威少为了三双遭绝杀？关键时刻又一次让乔治选择变得简单","count":30}
            ]
        };
        var html = jade.render(template,dictionary);

        //显示
        res.writeHead(200,{"Content-Type":"text/html;charset=UTF8"});
        res.end(html);
    });
});

server.listen(3000,"127.0.0.1");