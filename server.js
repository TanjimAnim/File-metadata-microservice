"use strict";

var express = require("express");
var cors = require("cors");
var multer = require("multer");
var upload = multer({ storage: storage, limits: { fileSize: 1000000 } }).single("upfile");

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null ,"./public/uploads/");
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  }
});


var app = express();

app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", function(req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.get("/hello", function(req, res) {
  res.json({ greetings: "Hello, API" });
});

app.listen(process.env.PORT || 3000, function() {
  console.log("Node.js listening ...");
});

app.post("/api/fileanalyse", (req, res) => {
  upload(req , res, (err)=>{
    if(err){
      console.log(err)
      res.json("error")
    } else{
      if(req.file===undefined){
        res.json({"error":"No files selected"})
      } else{
        console.log(req.file)
        res.json({
          filename:req.file.originalname,
          size:req.file.size
        })
      }
    }
  })
});
