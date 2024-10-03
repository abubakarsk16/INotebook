import React, { useContext } from "react";
import { NoteContext } from "../App";

const NotesItem = (props) => {
  const {deleteNote} = useContext(NoteContext);
  
  const deleteOnClk = () =>{
    let x = window.confirm("Are you sure you want to delete the note?");
    if(x) {
      deleteNote(props.note._id);
    }
}

  return (
      <div className="card col-md-3 my-3 mx-3 p-0"
      style={{boxShadow: "0 2px 4px 0 rgba(128, 128, 128, 0.1), 0 2px 10px 0 rgba(128, 128, 128, 0.1)"}}>
        <h5 className="card-header">
          {props.note.title}
        </h5>
        <div className="card-body">
          <p className="card-text">
          {props.note.description}
          </p>
          <button className="btn btn-danger btn-sm me-2" onClick={deleteOnClk}>
          <i className="fa-regular fa-trash-can"></i>
          </button>
          <button className="btn btn-success btn-sm" onClick={()=>{props.update(props.note);}}>
          <i className="fa-sharp fa-regular fa-pen-to-square"></i>
          </button>
        </div>
      </div>
  );
};

export default NotesItem;
