import { CgClose } from 'react-icons/cg';

const Input = ({ field, errors, name, setFocus, title, type = 'text' }) => {
  const handleClearInput = (name) => {
    field.onChange('');
    setFocus(name);
  };
  return (
    <div>
      <div className="relative group">
        <input
          {...field}
          type={type}
          autoComplete="off"
          onKeyDown={(e) => {
            if (type === 'number') {
              ['e', 'E', '+', '-'].includes(e.key) && e.preventDefault();
            }
          }}
          className={`
            bg-white w-full px-4 py-1.5 border rounded-md
            ${
              field.value !== '' && !errors
                ? 'border-primary-500'
                : errors
                ? 'border-red-500'
                : 'focus-within:border-primary-500'
            }
          `}
        />
        <span
          className={`absolute bg-white text-gray-400 px-2 left-2 translate-y-[-50%] pointer-events-none transition-all duration-200  group-focus-within:text-14 group-focus-within:top-0 group-focus-within:left-2 
        ${field.value === '' ? 'top-[50%] text-16' : 'top-0 text-14'}
        `}
        >
          {title}
        </span>
        <div
          className="bg-gray-100 text-gray-500 p-[1px] absolute right-2 top-[50%] translate-y-[-50%] border rounded-full cursor-pointer"
          onClick={() => handleClearInput(name)}
        >
          <CgClose size={10} className="" />
        </div>
      </div>
      <div className={`absolute ${!errors && 'hidden'} animate-fadeInToTop`}>
        <span className="text-14 text-red-600">{errors?.message}</span>
      </div>
    </div>
  );
};

export default Input;
