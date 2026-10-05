const express = require("express");

const app = express(); //instance
app.use(express.json());

const notes = [ ]

app.post("/notes", (req, res) => {
  res.send("notes created");
  console.log(req.body);
  notes.push(req.body)
});

app.get("/notes",(req,res)=>{
  res.send(notes)
})

//use params for countble changes

app.delete("/notes/:index",(req,res)=>{
  delete notes[ req.params.index]
  res.send("notes deleted sucessfully")
})

//patch 
// req.bo

app.patch("/notes/:index",(req,res)=>{

})
module.exports = app;
