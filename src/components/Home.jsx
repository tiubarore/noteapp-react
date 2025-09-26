import { useState, useEffect } from "react";
import Form from "./components/Form";
import NoteList from "./components/NoteList";
const Home = () => {
  const [notes, setNotes] = useState(() => {
    const notes = JSON.parse(localStorage.getItem("notes"));
    return notes || [];
  });

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const handleDelete = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 font-serialc shadow-xl rounded-lg">
      <h2 className=" text-gray-300 text-2xl mb-4 text-center">Notes</h2>
      <Form notes={notes} setNotes={setNotes} />
      <NoteList notes={notes} handleDelete={handleDelete} />
    </div>
  );
};
export default Home;
