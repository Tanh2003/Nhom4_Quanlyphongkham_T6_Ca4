import express from "express";


let configviewEngine =(app)=>{
    //arrow function
    app.use(express.static("./src/public")); // để cấu hình link public để phía client truy cập file ảnh nào
    app.set("view engine","ejs");
    app.set("views","./src/views");
    
}
module.exports=configviewEngine;