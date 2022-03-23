const express=require("express");
const files=require("./routers/files");

// const bodyParser = require('body-parser');
const port=process.env.PORT||8080;
const app=express()
//static options
app.set('view engine',"ejs");
app.set("views","views");
const server=app.listen(port);
app.use(express.static(__dirname+"/static"));
// app.use(bodyParser.urlencoded({extended:true}))
// app.use(bodyParser.json());
// end of setting up

app.get("",(req,res)=>{
    res.render("index");
});
app.post("/add",(req,res)=>{
    console.log(req.body);
});
app.use(files);
//404
app.use((req,res)=>{
    res.status=404;
    res.end();
})
