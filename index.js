const express = require("express");
const app = express();
const mongoose = require('mongoose');
const path = require("path");
const Animal = require("./models/animal.js");
const methodOverride = require("method-override")
const myError=require("./expressError.js");

app.set("views",path.join(__dirname,"views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname,"public"))); 
app.use(express.urlencoded({extended : true}));
app.use(methodOverride("_method"));

main()
.then(res =>{
    console.log("connections sucessful");
})
.catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/animalBook');
  }

app.listen(8080, ()=>{
    console.log("server is listening at port 8080");
});
app.use((err,req,res,next) =>{
console.log(err.name);
next(err);
})

// asynwrap fuction
function asyncWrap(fn){
    return function(req,res,next){
        fn(req,res,next).catch(err => next(err));
    }
}
//Index route
app.get("/animals", async (req,res)=>{
    let animals = await Animal.find();
    console.log(animals);
    res.render("index.ejs",{animals});
})
// new route
app.get("/animals/new", (req,res)=>{
    res.render("newanimal.ejs");
})
//create route
app.post("/animals",asyncWrap(async (req,res,next)=>{
    
        let {name} = req.body;
        let newanimal= new Animal({
            name : name,
            created_at : new Date()
        });
         await newanimal.save();
        console.log(newanimal);
        res.redirect("/animals")
    
}))
// edit route
app.get("/animals/:id/edit",asyncWrap( async (req,res,next)=>{
    
        let {id }= req.params;
    let animal= await Animal.findById(`${id}`);
    res.render("updateanimal.ejs",{animal});
    
    
}))

//update route
app.put("/animals/:id", asyncWrap(async (req,res,next)=>{
    
    let {id} = req.params;
    let {name} = req.body;
    let animal = await Animal.findById(id);
   let updatedanimal= await Animal.findByIdAndUpdate(id, {name: name},{runValidators : true, new : true});
   console.log(updatedanimal);
    res.redirect("/animals");
    
}))

app.use((err,req,res,next) =>{
    console.log(err.name);
    next(err);
    })

// delete route;

app.delete("/animals/:id/delete",async (req,res)=>{
    let {id}=req.params;
    let delete_chat= await Animal.findByIdAndDelete(id);
    res.redirect("/animals");
})
app.get("/",(req,res)=>{
    console.log("connection successful created");
    res.send("success");
})
