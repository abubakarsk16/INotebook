import "./App.css";
import { createContext, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import NavBar from "./components/NavBar";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Profile from "./components/Profile";
export const NoteContext = createContext();
const host = 'http://localhost:4000';

const App = () => {
  const [notes, setNotes] = useState([]);
  //function to check whether the token is in local or session storage
  const getToken = ()=>{
    const inLocal = localStorage.getItem('token');
    const inSession = sessionStorage.getItem('token');
    if(inSession!==null) {
      return inSession;
    }
    else {
      return inLocal;
    }
  }
  //Fetch all notes of a user
const fetchNotes = async () => {
  //API call
  const response = await fetch(`${host}/notes/getnotes`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "auth-token": getToken()
    }
  });
  const json = await response.json();
  setNotes(json);
}

  //Add a note
const addNote = async (title, description) => {
  //API call
  await fetch(`${host}/notes/addnote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "auth-token": getToken()
    },
    body: JSON.stringify({title, description})
  });
}
//delete a note
const deleteNote = async (id) =>{
  //API call
  await fetch(`${host}/notes/deletenote/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "auth-token": getToken()
    }
  });
}

//update a note
const updateNote = async (id, title, description) =>{
  // //API call
await fetch(`${host}/notes/updatenote/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "auth-token": getToken()
    },
    body: JSON.stringify({"title": title, "description": description})
  });

  for(let i = 0; i < notes.length; i++) {
    if(notes[i]._id === id) {
      notes[i].title = title;
      notes[i].description = description;
      break;
    }
  }
}

  return (
    <>
    <NoteContext.Provider value={{notes, addNote, deleteNote, updateNote, fetchNotes}}>
        <Router>
          <header>
            <NavBar title="iNotebook" />
          </header>
          <Routes>
            <Route exact path="/" Component={Home}></Route>
            <Route exact path="/about" Component={About}></Route>
            <Route exact path="/login" Component={()=><Login hostname={host} />}></Route>
            <Route exact path="/signup" Component={()=><SignUp hostname={host} />}></Route>
            <Route exact path="/profile" Component={()=><Profile hostname={host} />}></Route>
          </Routes>
        </Router>
      </NoteContext.Provider>
    </>
  );
}
export default App;
