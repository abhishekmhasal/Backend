const express = require("express");
const noteModel = require("./models/note.model");
const cors = require("cors");// cross origin request accept ke liye
const path = require("path"); // for wild card ka data run krne ke liye
const app = express();
app.use(express.static("./public"))  //all js and css file Aacess krene ke liye 
app.use(cors()); // call cors 
app.use(express.json());

app.post("/api/notes", async (req, res) => {
  const { title, discription } = req.body;
  const note = await noteModel.create({
    title,
    discription,
  });

  res.status(201).json({
    meassage: "notes created successfully",
    note,
  });
});

app.get("/api/notes", async (req, res) => {
  const notes = await noteModel.find();

  res.status(200).json({
    meassage: " notes fetched successfully",
    notes,
  });
});
app.delete("/api/notes/:id", async (req, res) => {
  const id = req.params.id;
  await noteModel.findByIdAndDelete(id);

  res.status(200).json({
    meassage: " note deleted successfully",
  });
});

app.patch("/api/notes/:id", async (req, res) => {
  const id = req.params.id;
  const { discription } = req.body;
  const notess = await noteModel.findByIdAndUpdate(id, { discription });

  res.status(200).json({
    meassage: " notes updats sucessfully",
    notess,
  });
});

console.log(__dirname); // file ka path mil jata hai manually lihken ki need nhi 
//*--->wild card  handle unknown api 

app.use("*name", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "/public/index.html"));
});

module.exports = app;
