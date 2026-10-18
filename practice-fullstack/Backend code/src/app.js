const express = require("express");
const noteModel = require("./model/note.model");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/notes", async (req, res) => {
  const { title, discription, age } = req.body;
  const note = await noteModel.create({
    title,
    discription,
    age,
  });

  res.status(201).json({
    meassage: " Notes Created successfully",
    note,
  });
});

app.get("/api/notes", async (req, res) => {
  const notes = await noteModel.find();
  res.status(200).json({
    meassage: " Feteched All Notes",
    notes,
  });
});

app.delete("/api/notes/:id", async (req, res) => {
  const id = req.params.id;
  await noteModel.findByIdAndDelete(id);

  res.status(200).json({
    meassage: " Notes Deleted Sucessfully",
  });
});

app.patch("/api/notes/:id", async (req, res) => {
  const id = req.params.id;
  const { title, discription } = req.body;
  await noteModel.findByIdAndUpdate(id, { discription });

  res.status(200).json({
    meassage: "Notes Update Sucessfully",
  });
});

module.exports = app;
