import React, { useEffect, useState } from "react";
import axios, { formToJSON } from "axios";
const App = () => {
  const [notes, setnotes] = useState([]);

  function fetchNotes() {
    axios.get("http://localhost:3000/api/notes").then((res) => {
      console.log(res.data);
      setnotes(res.data.notes);
    });
  }
  useEffect(() => {
    fetchNotes();
  }, []);

  function submitHabdaler(e){
e.preventDefault();

const{ title ,discription} = e.target.elements;
 console.log(title.value,discription.value);
 
 axios.post("http://localhost:3000/api/notes",{
      title : title.value,
      discription:discription.value,
    })
    .then((res) => {
      console.log(res.data);
    });
  }
  

  return (
    <>
      <form className="form" onSubmit={submitHabdaler}>
        <input
          className="input"
          type="text"
          placeholder="Enter Title"
          name=" title"
        />
        <input
          className=" input"
          type="text"
          placeholder="Enter a Discription"
          name="discription"
        />
        <button className="btn">Create Notes</button>
      </form>

      <div className="Notes">
        {notes.map((note, idx) => {
          return (
            <div key={idx} className="note">
              <h1>{note.title}</h1>
              <p>{note.discription}</p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default App;
