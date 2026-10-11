const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({   //create schma for a format 
  title: String,
  discription: String,     // kay kay tumhala pathvaychja ahe databse mdhe
});

const noteModel = mongoose.model("notes", noteSchema);//create model for opretion 

module.exports = noteModel;
