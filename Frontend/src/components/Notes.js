import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NoteContext } from "../App";
import NotesItem from "./NotesItem";

const Notes = (props) => {

  const context = useContext(NoteContext);
  const [updatedNote, setUpdatedNote] = useState({});
  const refOpen = useRef(null);
  const refClose = useRef(null);
  const navigate = useNavigate();

  useEffect(()=>{
    if(sessionStorage.getItem('token')!==null ||
    localStorage.getItem('token')!==null) {
      context.fetchNotes();
    }
    else {
      navigate("/login");
    }
  }, []);
  
  const upNote = (currentNote) =>{
    refOpen.current.click();
    setUpdatedNote({id: currentNote._id, updated_title: currentNote.title, updated_description: currentNote.description});
  }

  const onWrite = (x) =>{
    setUpdatedNote({...updatedNote, [x.target.name]: x.target.value});
  }
  const saveUpdatedNote = () =>{
    context.updateNote(updatedNote.id, updatedNote.updated_title, updatedNote.updated_description);
    refClose.current.click()
  }

  return (
    <div className=" row p-0 justify-content-center">
      <h2 className="my-3">Your Notes</h2>
      <h6 className="text-center">{(context.notes).length===0 && "No note to display"}</h6>
      <button
        type="button"
        className="btn btn-success d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ref={refOpen}
      >
        Edit
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-fullscreen">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit your Note
              </h1>
              <button
                type="button"
                className="btn-close bg-danger me-3"
                data-bs-dismiss="modal"
                aria-label="Close"
                ref={refClose}
              ></button>
            </div>
            <div className="modal-body" style={{backgroundColor: "#f5f5f5"}}>
              <div className="w-50 m-auto">
                <form>
                  <div className="mb-3">
                    <label htmlFor="updated_title" className="form-label">
                      Title
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="updated_title"
                      aria-describedby="emailHelp"
                      name="updated_title"
                      onChange={onWrite}
                      value={updatedNote.updated_title}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="updated_description" className="form-label">
                      Description
                    </label>
                    <textarea
                      className="form-control"
                      id="updated_description"
                      rows="6"
                      name="updated_description"
                      onChange={onWrite}
                      value={updatedNote.updated_description}
                    ></textarea>
                  </div>
                </form>
              </div>
            </div>
            <div className="modal-footer">
              {/* <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button> */}
              <button
              type="button"
              className="btn btn-success"
              onClick={saveUpdatedNote}>
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>

      {context.notes.map((x)=>{
        return <NotesItem key={x._id} note={x} update={upNote} />
      })}
    </div>
  );
};

export default Notes;
