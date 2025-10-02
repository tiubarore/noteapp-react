import "./index.css";
import { useState, useEffect } from "react";
import Form from "./components/Form";
import NoteList from "./components/NoteList";

function App() {
  const [notes, setNotes] = useState(() => {
    const notes = JSON.parse(localStorage.getItem("notes"));
    return notes || [];
  });

  const [editingNote, setEditingNote] = useState(null);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const handleDelete = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const handleEdit = (id) => {
    const noteToEdit = notes.find((note) => note.id === id);
    setEditingNote(noteToEdit);
  };

  const handleUpdate = (updatedNote) => {
    const updatedNotes = notes.map((note) =>
      note.id === updatedNote.id ? updatedNote : note
    );
    setNotes(updatedNotes);
    setEditingNote(null);
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 font-serialc shadow-xl rounded-lg">
      <h2 className=" text-gray-300 text-3xl mb-4 text-center">Notes</h2>
      <Form
        notes={notes}
        setNotes={setNotes}
        editingNote={editingNote}
        setEditingNote={setEditingNote}
        handleUpdate={handleUpdate}
      />
      <NoteList
        notes={notes}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
      />
    </div>
  );
}

export default App;
