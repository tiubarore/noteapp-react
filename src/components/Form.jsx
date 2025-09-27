import { useState } from "react";
import TextInput from "./inputs/TextInput";
import SelectInput from "./inputs/SelectInput";
import Textarea from "./inputs/Textarea";

const Form = ({ notes, setNotes }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "Medium",
    category: "Ideas",
  });

  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // validation
    if (!formData.title || !formData.description) return;

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
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="text-gray-100 font-mono">
      <button
        onClick={() => setIsFormVisible(!isFormVisible)}
        className="w-full font-mono py-2 px-4 bg-gray-200 border hover:bg-gray-300 text-black font-semibold rounded-sm cursor-pointer"
      >
        {isFormVisible ? "Hide Form" : "Add New Note"}
      </button>
      {isFormVisible && (
        <form onSubmit={handleSubmit}>
          <TextInput
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
          <Textarea
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
          {/* <SelectInput
            label="Priority"
            name="priority"
            value={formData.priority}
            options={[
              { value: "High", label: "High" },
              { value: "Medium", label: "Medium" },
              { value: "Low", label: "Low" },
            ]}
            onChange={handleChange}
          />{" "}
          <SelectInput
            label="Category"
            name="category"
            value={formData.category}
            options={[
              { value: "Work", label: "Work" },
              { value: "Personal", label: "Personal" },
              { value: "Ideas", label: "Ideas" },
            ]}
            onChange={handleChange}
          /> */}
          <button className="mt-4 w-full py-2 px-2 text-black font-semibold rounded-sm bg-gray-100 cursor-pointer">
            Add Note
          </button>
        </form>
      )}
    </div>
  );
};
export default Form;
