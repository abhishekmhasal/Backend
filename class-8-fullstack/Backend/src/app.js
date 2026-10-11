const express = require("express");

const app = express();
const noteModel = require("./models/note.model");

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

app.delete("/api/notes/:id", async(req, res) => {
  const id = req.params.id;
  await noteModel.findByIdAndDelete(id);

  res.status(200).json({
    meassage: " note deleted successfully",
  });
});

app.patch("/api/notes/:id", async(req,res)=>{
  const id = req.params.id
  const{ discription} = req.body
  const notess = await noteModel.findByIdAndUpdate(id ,{ discription})

  res.status(200).json({
    meassage:" notes updats sucessfully",
    notess
  })
})
module.exports = app;
