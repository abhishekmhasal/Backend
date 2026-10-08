const express = require("express");

const noteModel = require("./models/note.model");

const app = express();

app.use(express.json()); //middleware 
// post - /notes
// req.body  -{ title and discription}

app.post("/notes", async (req, res) => {
  const { title, discription } = req.body; //destrure data

 const note = await noteModel.create({
    // wait ke liye lagaya  async await
    title,
    discription,
  });

  res.status(201).json({
    meassage: " notes creeated successfully",
    note,
  });
});

app.get("/notes", async (req, res) => {

  const notes = await noteModel.find()

  res.status(200).json({
    meassage: " motes fetched successfully",
    notes,
  });
});

module.exports = app;
