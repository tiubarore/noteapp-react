const Note = ({ note, handleDelete }) => {
  return (
    <div
      className="p-4 bg-white rounded-lg shadow-md border-l-4 my-3"
      style={{
        borderLeftColor:
          note.priority === "High"
            ? "red"
            : note.priority === "Medium"
            ? "orange"
            : "green",
      }}
    >
      <h3 className="font-semibold text-lg">{note.title}</h3>
      <p className="text-md text-gray-600">{note.description}</p>
      <p className="text-sm text-gray-600">
        <strong>Priority: </strong>
        {note.priority}
      </p>
      <p className="text-sm text-gray-600">
        <strong>Category: </strong>
        {note.category}
      </p>
      <button
        onClick={() => handleDelete(note.id)}
        className="w-full mt-4 cursor-pointer bg-red-500 hover:bg-red-700 py-2 px-4 rounded-md"
      >
        Delete
      </button>
    </div>
  );
};
export default Note;
