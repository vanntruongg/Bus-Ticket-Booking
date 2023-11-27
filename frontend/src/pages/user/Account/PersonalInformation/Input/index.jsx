import { AiOutlineEdit } from 'react-icons/ai';

const Input = ({ label, value, editMode, onChange }) => {
  const handleChangeInput = (value) => {
    onChange(value);
  };
  return (
    <div className="grid grid-cols-12 items-center gap-4">
      <div className="col-span-3 flex justify-between">
        <p className="text-gray-500">{label}</p>
        <span className="">:</span>
      </div>
      {!editMode ? (
        <span className="col-span-8 font-medium my-1.5 px-2">
          {value || '...'}
        </span>
      ) : (
        <div className="col-span-9 flex items-center justify-between w-full border border-transparent rounded-lg hover:border hover:border-primary-purple-500 focus-within:border-primary-purple-500">
          <input
            type="text"
            value={value}
            onChange={(e) => handleChangeInput(e.target.value)}
            className="px-2 py-1.5 w-full bg-transparent font-medium"
          />
          <AiOutlineEdit className="mr-2" />
        </div>
      )}
    </div>
  );
};

export default Input;
