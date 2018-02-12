var mongoose = require('mongoose');

//schema
var CourseSchema = new mongoose.Schema({
    "kid"  : Number,
    "name" : String,
    "students" : [Number]       //这个数组存放的是学生的sid
});
//索引
CourseSchema.index({ "kid": 1});

CourseSchema.statics.addStus = function(kidarray,sid,callback){
    for(var i = 0 ; i < kidarray.length ; i++){
        Course.update({"kid":kidarray[i]},{$push :{"students":sid}},function(){
            console.log("课程添加报名学生成功");
        })
    }
    callback();
}

//model
var Course = mongoose.model("Course",CourseSchema);

module.exports = Course;