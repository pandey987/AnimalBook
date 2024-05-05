const mongoose = require('mongoose');

const animalSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },created_at : {
        type : Date,
        required : true
    }
});

const Animal = mongoose.model("Animal",animalSchema );
module.exports = Animal;