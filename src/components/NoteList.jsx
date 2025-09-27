import Note from "./Note";

const NoteList = ({ notes, handleDelete, handleEdit }) => {
  if (notes.length === 0)
    return <p className="text-center mt-4 text-red-600">No Notes Yet...</p>;

  return (
    <div className="space-y.4">
      {notes.map((note) => (
        <Note
          key={note.id}
          note={note}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      ))}
    </div>
  );
};
export default NoteList;
