const mongoose = require('mongoose');
const Animal = require("./models/animal.js");

main()
.then(res =>{
    console.log("connections sucessful");
})
.catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/animalBook');
 }

 let allanimal=[{
    name : "Tiger",
    created_at : new Date(),
},{
   name : "Lion",
   created_at : new Date(),
},{
    name : "Elephant",
    created_at : new Date(),
}];

Animal.insertMany(allanimal)
.then(res =>{
    console.log(res);
})
.catch(err =>{
    console.log(err);
});