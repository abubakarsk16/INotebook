import React from "react";
import Notes from "./Notes";
import CreateNote from "./CreateNote";
const Home = () => {
  return(
    <div className="container p-0">
    <CreateNote />
    <hr />
    <Notes />
    </div>
  );
};

export default Home;
