import React, { useEffect, useState } from "react";
import axios from "axios";
const App = () => {
  const [notes, setNotes] = useState([]);
//get all notes 
  const fetchData = () => {
    axios.get("http://localhost:3000/api/notes").then((res) => {
      console.log(res.data);
      setNotes(res.data.notes);
    });
  };

  useEffect(() => {
    fetchData();// call fetch fn inside useeffect
  }, []);
//post api create a  notes
  function sumbmitHandler(e) {
    e.preventDefault();
    const { title , discription } = e.target.elements;
    console.log(title.value, discription.value);

    axios.post("http://localhost:3000/api/notes",{title :title.value , discription:discription.value})
  .then((res)=>{
    console.log(res.data);
    fetchData()
  })  }
//delete a notes
function deleteHandle(noteId){
axios.delete("http://localhost:3000/api/notes/"+noteId)
.then((res)=>{
  console.log(res.data);
  fetchData()
})
}

  return (
    //from created for input and button proprty
    <>
      <form className="form" onSubmit={sumbmitHandler}>
        <input
          className="input"
          name="title"
          type="text"
          placeholder="enter a title"
        />
        <input
          className="input"
          type="text"
          name="discription"
          placeholder="enetr a discription"
        />
        <button className="btn"> Create Notes</button>
      </form>

      <div className="notes">
        {notes.map((note, idx) => {  // using map function to get all notes 
          return (
            <div key={idx} className="note">
              <h1>{note.title}</h1>
              <p>{note.discription}</p>
              <br/>
               <button  className ="delete" // delete handelr for deleting a notes 
               onClick={(()=>{deleteHandle(note._id)})}>Delete</button>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default App;
