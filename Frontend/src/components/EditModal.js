import React, {useCallback, useContext, useState} from "react";
import { NoteContext } from '../App';
// import PropTypes from 'prop-types';

const EditModal = (props) => {
  const {notes} = useContext(NoteContext);
  const [note, setNote] = useState();
  console.log(note);

  const onWrite = (x) =>{
    setNote({...note, [x.target.name]: x.target.value});
  }
  const saveNote = (y) =>{
    y.preventDefault();
  }

  return (
    <div>
      <button
        type="button"
        className="btn btn-success d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ref={props.editBtn}
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
                className="btn-close bg-danger"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body" style={{backgroundColor: "#f5f5f5"}}>
              <div className="w-50 m-auto">
                <form>
                  <div className="mb-3">
                    <label htmlFor="updated-title" className="form-label">
                      Title
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="updated-title"
                      aria-describedby="emailHelp"
                      name="updated-title"
                      onChange={onWrite}
                      value={note.title}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="updated-description" className="form-label">
                      Description
                    </label>
                    <textarea
                      className="form-control"
                      id="updated-description"
                      rows="6"
                      name="updated-description"
                      onChange={onWrite}
                      value={note.description}
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
              <button type="button" className="btn btn-success" onClick={saveNote}>
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// EditModal.propTypes = {

// }

export default EditModal;
