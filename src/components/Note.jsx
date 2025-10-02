import { useState } from "react";
import { Link } from "react-router";
const Note = ({ note, handleDelete, handleEdit }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const shouldCut = note.description.length > 150;
  const displayText = isExpanded
    ? note.description
    : note.description.slice(0, 150);
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
      <p>{new Date(note.id).toLocaleDateString()}</p>
      <h3 className="font-bold text-2xl">{note.title}</h3>
      <p className="text-md font-serialc text-gray-100 whitespace-pre-wrap">
        {displayText}
        {shouldCut && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="cursor-pointer ms-3  text-green-300"
          >
            {isExpanded ? "Show Less" : "...Read More"}
          </button>
        )}
      </p>

      {/* <p className="text-sm  text-gray-100">
        <strong>Priority: </strong>
        {note.priority}
      </p>
      <p className="font-mono text-sm text-gray-100">
        <strong>Category: </strong>
        {note.category}
      </p> */}
      <div>
        <button
          onClick={() => handleDelete(note.id)}
          className="w-35 mt-4 cursor-pointer text-black font-semibold ms-3  bg-gray-100 py-2 px-4 rounded-sm"
        >
          Delete
        </button>
        <button
          onClick={() => handleEdit(note.id)}
          className="w-35 cursor-pointer text-gray-100 outline py-2 px-4 ms-2 rounded-sm"
        >
          Edit
        </button>
      </div>
    </div>
  );
};
export default Note;
