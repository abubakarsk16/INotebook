import NoteContext from './NoteContext.js';

const noteState = (props) => {
    return(
        <NoteContext.Provider value="ABC">
            {props.children}
        </NoteContext.Provider>
    );
}