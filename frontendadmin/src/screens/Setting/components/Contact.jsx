export function ContactInput({ id, label, value, type = "text", handleChange }) {
  return (
    <div className="flex flex-col leading-none min-w-[15rem] max-w-[25rem] w-full">
      <label className="text-neutral-900 text-opacity-50" htmlFor={`input-${id}`}>
        {label}
      </label>
      <input
        id={id} // Gắn id
        type={type}
        value={value || ""} // Xử lý giá trị null
        onChange={handleChange}
        className="flex gap-[0.25rem] mt-[1rem] border justify-center items-center px-3 py-3 rounded-lg w-[25rem] min-h-[3rem] max-md:min-h-[2rem]"
      />
    </div>
  );
}
