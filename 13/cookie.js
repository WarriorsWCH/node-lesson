var express  = require('express');
var cookieParser = require('cookie-parser');
 
var app = express();
//使用cookie必须要使用cookie-parser中间件
app.use(cookieParser());

app.get("/",function(req,res){
	res.send("猜你喜欢" + req.cookies.city);
});

//查询一个地方的攻略，URL语法： http://127.0.0.1/gonglue?city=北京
//此时北京就能记录在cookie中
app.get("/gonglue",function(req,res){
	//得到get请求，用户查询的目的地
	var city = req.query.city;
	//记录用户喜好
	//先读取用户的喜好，然后把新的数据push进入数组，然后设置新的cookie
	var cityarry = req.cookies.city || [];
	cityarry.push(city);
	//maxAge在Express中以毫秒为单位
    res.cookie("city",cityarry,{maxAge: 900000, httpOnly: true});
    /*Response Headers
    Connection:keep-alive
    Date:Sat, 10 Feb 2018 08:04:21 GMT
    ETag:W/"12-dc3+DEHd/bnB57/7nlJNYs9Z++I"
    Set-Cookie:city=j%3A%5B%22%E5%8C%97%E4%BA%AC%22%2C%22%E9%95%BF%E6%98%A5%22%2C%22%E5%8C%97%E4%BA%AC%22%2C%22%E5%8C%97%E4%BA%AC%22%2C%22%E9%95%BF%E6%98%A5%22%2C%22%E9%95%BF%E6%98%A5%22%2C%22%E5%8C%97%E4%BA%AC%22%5D; Max-Age=900; Path=/; Expires=Sat, 10 Feb 2018 08:19:21 GMT; HttpOnly
    X-Powered-By:Express
    */
    res.send(city + "旅游攻略");
    /*Request Headers
    Connection:keep-alive
    Cookie:UM_distinctid=15f0f3002a499c-0e0eef6e312cc7-31657c00-13c680-15f0f3002a5468; CNZZDATA1264525928=902683573-1507786470-%7C1507793272; _ga=GA1.1.800386185.1506343054; city=j%3A%5B%22%E5%8C%97%E4%BA%AC%22%2C%22%E9%95%BF%E6%98%A5%22%2C%22%E5%8C%97%E4%BA%AC%22%2C%22%E5%8C%97%E4%BA%AC%22%2C%22%E9%95%BF%E6%98%A5%22%2C%22%E9%95%BF%E6%98%A5%22%5D
    Host:127.0.0.1:3000
    If-None-Match:W/"12-dc3+DEHd/bnB57/7nlJNYs9Z++I"
    Upgrade-Insecure-Requests:1
    User-Agent:Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36
    */
});

app.listen(3000);