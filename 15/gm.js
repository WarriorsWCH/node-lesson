var fs = require("fs");
var gm = require('gm');

gm("./pool.jpg")
  .resize(50, 50, "!")
  .write("./demo1.jpg", function(err) {
    if (err) {
      console.log(err);
    }
  });
// gm("./demo.jpg")
//   .crop(141, 96, 152, 181)
//   .write("./demo2.jpg", function(err) {
//     if (err) {
//         console.log(err);
//     }
//   });
