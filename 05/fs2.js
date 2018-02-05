var http = require("http");
var fs = require("fs");

var server = http.createServer(function(req,res){
	//不处理小图标
	if(req.url == "/favicon.ico"){
		return;
	}
	//存储所有的文件夹
	var allDir = [];
	//stat检测状态
	fs.readdir("./resource",function(err,files){
		//files是个文件名的数组，并不是文件的数组，表示./album这个文件夹中的所有东西
        //包括文件、文件夹
		/*for(var i = 0 ; i < files.length ;i++){
            var thefilename = files[i];
            console.log(thefilename);
			//又要进行一次检测
			fs.stat("./resource/" + thefilename , function(err,stats){
                console.log(thefilename);
				//如果他是一个文件夹，那么输出它：
				if(stats.isDirectory()){
					allDir.push(thefilename);
				}
                console.log(allDir);
                // 最终数组['a','b'] 这并不是想要的结果 问题在于循环中使用了异步方式，所以thefilename都为b
                
			});
        }*/

        //迭代器就是强行把异步的函数，变成同步的函数（递归）
		//1做完了，再做2；2做完了，再做3
		(function iterator(i){
			//遍历结束
			if(i == files.length){
				console.log(allDir);
				return;
			}
			fs.stat("./resource/" + files[i],function(err,stats){
				//检测成功之后做的事情
				if(stats.isDirectory()){
					//如果是文件夹，那么放入数组。不是，什么也不做。
					allDir.push(files[i]);
				}
				iterator(i+1);
			});
		})(0);
    });
    res.end();
});

server.listen(3000,"127.0.0.1");