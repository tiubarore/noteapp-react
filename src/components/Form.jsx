import { useState, useEffect } from "react";

const Form = ({
  notes,
  setNotes,
  editingNote,
  setEditingNote,
  handleUpdate,
}) => {
  // Form input states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // CRITICAL: This useEffect "watches" editingNote
  // Whenever editingNote changes, this code runs
  useEffect(() => {
    // If editingNote has a value (not null), we're in EDIT MODE
    if (editingNote) {
      // Pre-fill the form with the note's current data
      setTitle(editingNote.title);
      setDescription(editingNote.description);
    } else {
      // If editingNote is null, we're in ADD MODE
      // Clear the form fields
      setTitle("");
      setDescription("");
    }
  }, [editingNote]); // Run this whenever editingNote changes

  // Check if we're in edit mode or add mode
  const isEditMode = editingNote !== null;

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page refresh

    // Validation: Don't allow empty title or description
    if (!title.trim() || !description.trim()) {
      alert("Please fill in all fields!");
      return;
    }

    // BRANCH: Are we editing or adding?
    if (isEditMode) {
      // === EDIT MODE ===
      // Create updated note object by keeping the old id
      // but replacing title and description with new values
      const updatedNote = {
        ...editingNote, // Spread: keep id and any other properties
        title: title.trim(), // Update with new title
        description: description.trim(), // Update with new description
      };

      // Call the update function passed from App
      handleUpdate(updatedNote);
    } else {
      // === ADD MODE ===
      // Create a completely new note with a new id
      const newNote = {
        id: Date.now(), // Simple unique ID using timestamp
        title: title.trim(),
        description: description.trim(),
      };

      // Add to the notes array
      setNotes([...notes, newNote]);

      // Clear the form after adding
      setTitle("");
      setDescription("");
    }
  };

  // Handle cancel button (exit edit mode without saving)
  const handleCancel = () => {
    setEditingNote(null); // Exit edit mode
    setTitle(""); // Clear form
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      {/* Visual indicator: Show user they're in edit mode */}
      {isEditMode && (
        <div className="mb-3 p-2 bg-yellow-900/30 border border-yellow-600 rounded">
          <p className="text-yellow-400 text-sm">
            ✏️ Editing: <strong>{editingNote.title}</strong>
          </p>
        </div>
      )}

      {/* Title Input */}
      <input
        type="text"
        placeholder="Note Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 mb-3 border border-gray-600 bg-gray-800 text-gray-100 rounded"
      />

      {/* Description Textarea */}
      <textarea
        placeholder="Note Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 mb-3 border border-gray-600 bg-gray-800 text-gray-100 rounded h-24"
      />

      {/* Buttons */}
      <div className="flex gap-2">
        {/* Submit Button - text changes based on mode */}
        <button
          type="submit"
          className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded font-semibold"
        >
          {isEditMode ? "Update Note" : "Add Note"}
        </button>

        {/* Cancel Button - only show in edit mode */}
        {isEditMode && (
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 border border-gray-600 text-gray-300 hover:bg-gray-800 rounded"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default Form;
