import { useEffect, useState } from "react";
import TextInput from "./inputs/TextInput";
import SelectInput from "./inputs/SelectInput";
import Textarea from "./inputs/Textarea";

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

  useEffect(() => {
    if (isEditMode) {
      setFormData.description(editingNote.description);
      setFormData.title(editingNote.title);
    } else {
      setFormData.description("");
      setFormData.title("");
    }
  }, [editingNote]);

  const [isFormVisible, setIsFormVisible] = useState(false);

  // check if you're in edit mode:
  const isEditMode = editingNote !== null;

  const handleSubmit = (e) => {
    e.preventDefault();

    // validation
    if (!formData.title || !formData.description) return;

    if (isEditMode) {
      const updatedNote = {
        ...editingNote,
        title: formData.title.trim(),
        description: formData.description.trim(),
      };
      handleUpdate(updatedNote);
    } else {
      // create new note
      const newNote = {
        id: Date.now(),
        ...formData,
      };
      // add notes to state
      setNotes([newNote, ...notes]);
      //reset
      setFormData({
        title: "",
        description: "",
        priority: "Medium",
        category: "Ideas",
      });

      setIsFormVisible(!isFormVisible);
    }
  };

  const handleCancel = () => {
    setEditingNote(null);
    setFormData.title = "";
    setFormData.description = "";
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      {isEditMode && (
        <div className="mb-3 p-2 bg-yellow-900/30 border border-yellow-600 rounded">
          <p className="text-yellow-400 text-sm">
            ✏️ Editing: <strong>{editingNote.title}</strong>
          </p>
        </div>
      )}
      <TextInput
        label="Title"
        name="title"
        value={formData.title}
        onChange={(e) => setFormData(e.target.value)}
        required
      />
      <Textarea
        label="Description"
        name="description"
        value={formData.description}
        onChange={(e) => setFormData(e.description)}
        required
      />
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

    // <div className="text-gray-100 font-mono">
    //   <button
    //     onClick={() => setIsFormVisible(!isFormVisible)}
    //     className="w-full font-mono py-2 px-4 bg-gray-200 border hover:bg-gray-300 text-black font-semibold rounded-sm cursor-pointer"
    //   >
    //     {isFormVisible ? "Hide Form" : "Add New Note"}
    //   </button>
    //   {isFormVisible && (
    //     <form onSubmit={handleSubmit}>
    //       <TextInput
    //         label="Title"
    //         name="title"
    //         value={formData.title}
    //         onChange={handleChange}
    //         required
    //       />
    //       <Textarea
    //         label="Description"
    //         name="description"
    //         value={formData.description}
    //         onChange={handleChange}
    //         required
    //       />
    //       {/* <SelectInput
    //         label="Priority"
    //         name="priority"
    //         value={formData.priority}
    //         options={[
    //           { value: "High", label: "High" },
    //           { value: "Medium", label: "Medium" },
    //           { value: "Low", label: "Low" },
    //         ]}
    //         onChange={handleChange}
    //       />{" "}
    //       <SelectInput
    //         label="Category"
    //         name="category"
    //         value={formData.category}
    //         options={[
    //           { value: "Work", label: "Work" },
    //           { value: "Personal", label: "Personal" },
    //           { value: "Ideas", label: "Ideas" },
    //         ]}
    //         onChange={handleChange}
    //       /> */}
    //       <button className="mt-4 w-full py-2 px-2 text-black font-semibold rounded-sm bg-gray-100 cursor-pointer">
    //         Add Note
    //       </button>
    //     </form>
    //   )}
    // </div>
  );
};
export default Form;
