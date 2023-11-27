import { BsSearch } from 'react-icons/bs';
import { RiCloseLine } from 'react-icons/ri';

const Input = ({ placeholder, value, onChange }) => {
  const handleClearInput = () => {
    onChange('');
  };

  return (
    <div
      className={`
        backdrop-blur-2xl flex items-center w-full border border-white rounded-full focus-within:border-primary-500 peer-placeholder-shown:border-primary-500
        ${origin !== '' && 'border-primary-blue-500 '}
    `}
    >
      <span className="pl-6 pr-2 text-gray-400 pointer-events-none">
        <BsSearch />
      </span>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        spellCheck={false}
        className="bg-transparent w-full pl-2 py-1.5 rounded-full text-primary-500"
      />
      <button
        className="absolute right-4 bg-gray-50 text-gray-500 p-0.5 border rounded-full"
        onClick={handleClearInput}
      >
        <RiCloseLine size={12} />
      </button>
    </div>
  );
};

export default Input;
