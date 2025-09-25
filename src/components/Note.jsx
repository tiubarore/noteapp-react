const Note = ({ note, handleDelete }) => {
  return (
    <div
      className="p-4 border border-gray-100 bg-cenere text-gray-100 font-serialc rounded-sm shadow-md border-sm my-3"
      // style={{
      //   borderLeftColor:
      //     note.priority === "High"
      //       ? "red"
      //       : note.priority === "Medium"
      //       ? "orange"
      //       : "green",
      // }}
    >
      <h3 className="font-semibold text-lg">{note.title}</h3>
      <p className="text-md font-serialc text-gray-100">{note.description}</p>
      <p className="text-sm  text-gray-100">
        <strong>Priority: </strong>
        {note.priority}
      </p>
      <p className="font-mono text-sm text-gray-100">
        <strong>Category: </strong>
        {note.category}
      </p>
      <button
        onClick={() => handleDelete(note.id)}
        className="w-full mt-4 cursor-pointer text-black font-semibold  bg-gray-100 py-2 px-4 rounded-sm"
      >
        Delete
      </button>
    </div>
  );
};
export default Note;
