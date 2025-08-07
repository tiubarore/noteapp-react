const Textarea = ({ label, name, required = false, value, onChange }) => {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="font-semibold block">
        {label}
      </label>
      <textarea
        className="border rounded-md py-2 px-4 w-full"
        name={name}
        placeholder="Description"
        value={value}
        onChange={onChange}
      ></textarea>
    </div>
  );
};
export default Textarea;
