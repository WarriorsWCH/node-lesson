var http = require("http");
var url = require("url");

var server = http.createServer(function(req, res) {
  //url.parse()可以将一个完整的URL地址，分为很多部分：
  //host、port、pathname、path、query
  // var url = url.parse(req.url);
  //url.parse()如果第二个参数是true，那么就可以将所有的查询变为对象
  //就可以直接打点得到这个参数
  var myUrl = url.parse(req.url, true);
  //直接打点得到这个参数
  console.log("网址" + req.url);
  console.log("pathname:" + myUrl.pathname);
  console.log("hash:" + myUrl.hash);
  //url.parse()如果第二个参数是true，那么就query可以将所有的查询变为对象 
  // http://127.0.0.1:3000/a/b?id=12
  console.log("query:" + myUrl.query.id);
  res.end();
});

server.listen(3000, "127.0.0.1");
