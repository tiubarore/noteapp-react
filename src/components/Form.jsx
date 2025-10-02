import { useEffect, useState } from "react";
import TextInput from "./inputs/TextInput";
import SelectInput from "./inputs/SelectInput";
import Textarea from "./inputs/Textarea";
import { toast } from "sonner";

const Form = ({
  notes,
  setNotes,
  editingNote,
  setEditingNote,
  handleUpdate,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "Medium",
    category: "Ideas",
  });

  // Check if we're in edit mode
  const isEditMode = editingNote !== null;

  // State to control form visibility (collapsible)
  const [isFormVisible, setIsFormVisible] = useState(false);

  // FIXED: Pre-fill form when editing, clear when not editing
  useEffect(() => {
    if (isEditMode) {
      // When entering edit mode, populate form with note's data
      setFormData({
        ...formData, // Keep priority and category
        title: editingNote.title,
        description: editingNote.description,
      });
      // Automatically show form when entering edit mode
      setIsFormVisible(true);
    } else {
      // When exiting edit mode, reset form
      setFormData({
        title: "",
        description: "",
        priority: "Medium",
        category: "Ideas",
      });
    }
  }, [editingNote]); // Only run when editingNote changes

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation: Check if required fields are filled
    if (!formData.title.trim() || !formData.description.trim()) {
      alert("Please fill in both title and description!");
      return;
    }

    if (isEditMode) {
      // === EDIT MODE ===
      // Create updated note keeping the same id
      const updatedNote = {
        ...editingNote, // Keep id and other properties
        title: formData.title.trim(),
        description: formData.description.trim(),
        priority: formData.priority,
        category: formData.category,
      };

      // Call update function from App
      handleUpdate(updatedNote);

      // Reset form after updating
      setFormData({
        title: "",
        description: "",
        priority: "Medium",
        category: "Ideas",
      });

      // Hide form after updating
      setIsFormVisible(false);
    } else {
      // === ADD MODE ===
      // Create new note with new id
      const newNote = {
        id: Date.now(),
        ...formData, // Spread all form data
      };

      // Add to beginning of notes array
      setNotes([newNote, ...notes]);
      toast("new note added");

      // Reset form
      setFormData({
        title: "",
        description: "",
        priority: "Medium",
        category: "Ideas",
      });

      // Hide form after adding
      setIsFormVisible(false);
    }
  };

  // FIXED: Cancel button handler
  const handleCancel = () => {
    setEditingNote(null); // Exit edit mode
    setFormData({
      // Reset form
      title: "",
      description: "",
      priority: "Medium",
      category: "Ideas",
    });
    // Hide form when canceling
    setIsFormVisible(false);
  };

  // FIXED: Generic change handler for all inputs
  const handleChange = (e) => {
    setFormData({
      ...formData, // Keep all other fields
      [e.target.name]: e.target.value, // Update only the changed field
    });
  };

  return (
    <div className="mb-6">
      {/* Toggle Button - Shows/Hides Form */}
      <button
        onClick={() => setIsFormVisible(!isFormVisible)}
        className="w-full py-2 px-4 bg-gray-100  text-gray-800 font-semibold rounded-sm cursor-pointer "
      >
        {isFormVisible
          ? "hide Form"
          : isEditMode
          ? "continue editing"
          : "add New Note"}
      </button>

      {/* Collapsible Form */}
      {isFormVisible && (
        <form onSubmit={handleSubmit} className="mt-4 text-gray-100">
          {/* Edit mode indicator */}
          {isEditMode && (
            <div className="mb-3 p-2 bg-yellow-900/30 border border-yellow-600 rounded">
              <p className="text-yellow-400 text-sm">
                ✏️ editing: <strong>{editingNote.title}</strong>
              </p>
            </div>
          )}

          {/* FIXED: Use handleChange instead of inline functions */}
          <TextInput
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <Textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />

          <div className="flex gap-2 mt-4">
            {/* Submit Button - text changes based on mode */}
            <button
              type="submit"
              className="flex-1 bg-gray-100 text-gray-800 py-2 px-4 rounded-sm font-semibold transition-colors"
            >
              {isEditMode ? "update Note" : "add Note"}
            </button>

            {/* Cancel Button - only show in edit mode */}
            {isEditMode && (
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 border border-gray-800 text-gray-800 rounded-sm "
              >
                cancel
              </button>
            )}
          </div>
        </form>
      )}
    </div>
  );
};

export default Form;
