import React, {useContext, useState} from 'react';
import { NoteContext } from '../App';


const CreateNote = () => {
  const myNote = useContext(NoteContext);
  const [note, setNote] = useState({title: "", description: ""});

  const onWrite = (x) =>{
    setNote({...note, [x.target.name]: x.target.value});
  }
  const saveNote = (y) =>{
    y.preventDefault();
      myNote.addNote(note.title, note.description);
      setNote({title: "", description: ""});
  }

  return (
    <div className="w-50 p-3 m-auto">
      <h2 className="my-3">Add your Notes here!</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            aria-describedby="emailHelp"
            name='title'
            onChange={onWrite}
            value={note.title}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea className="form-control" id="description" rows="6" name='description' onChange={onWrite} value={note.description} required></textarea>
          <div id="emailHelp" className="form-text">
            We'll never share your notes with anyone else.
          </div>
        </div>
        <button type="submit"
        className="btn btn-success"
        onClick={saveNote}
        disabled={note.title.length===0}>
          Save
        </button>
      </form>
    </div>
  );
};

export default CreateNote;
