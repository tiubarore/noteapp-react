const TextInput = ({ label, name, value, onChange, required = false }) => {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="font-semibold block">
        {label}
      </label>
      <input
        className="border rounded-md py-2 px-4 w-full"
        type="text"
        name={name}
        placeholder="Title"
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
};
export default TextInput;
