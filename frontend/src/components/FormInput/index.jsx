import { useState } from 'react';
import { GrFormView, GrFormViewHide } from 'react-icons/gr';

const FormInput = ({
  field,
  errors,
  title,
  isPassword,
  type = 'text',
  icon,
  style,
}) => {
  const [typeInput, setTypeInput] = useState(type);
  // const handleOnChangeInput = (e) => {
  //   field.onChange(e.target.value);
  // };
  return (
    <>
      <div
        className={`
        mt-4 min-w-[340px] border-b relative group 
        ${!errors && 'focus-within:border-primary-500'}
          ${
            errors
              ? 'border-red-500'
              : field.value !== ''
              ? 'border-primary-500'
              : style
              ? style
              : 'border-gray-500'
          }
          `}
      >
        <div className="flex items-center">
          <div
            className={`
            ${!errors && 'focus-within:text-primary-500'}
            ${
              errors
                ? 'text-red-500'
                : field.value !== ''
                ? 'text-primary-500'
                : style
                ? style
                : 'text-gray-500'
            }
          `}
          >
            {icon}
          </div>
          <input
            {...field}
            type={typeInput}
            className="bg-transparent w-full px-4 py-2"
            step="0.01"
            autoComplete="off"
            onKeyDown={(e) =>
              type === 'number' &&
              ['e', 'E', '+', '-'].includes(e.key) &&
              e.preventDefault()
            }
          />
        </div>
        <span
          className={`absolute px-4 ${
            style ? style : 'text-gray-500'
          } translate-y-[-50%] pointer-events-none transition-all duration-200  group-focus-within:text-12 group-focus-within:top-0  group-focus-within:left-4 ${
            field.value === ''
              ? 'text-14 top-[50%] left-4'
              : 'text-12 top-0 left-4'
          }`}
        >
          {title}
        </span>
        {isPassword && (
          <div
            className="absolute right-4 top-[50%] translate-y-[-50%] cursor-pointer"
            onClick={() =>
              setTypeInput((typeInput) =>
                typeInput == 'password' ? 'text' : 'password',
              )
            }
          >
            {typeInput === 'text' ? (
              <GrFormView size={20} />
            ) : (
              <GrFormViewHide size={20} />
            )}
          </div>
        )}
      </div>
      <div className={`${!errors && 'hidden'} animate-fadeInToTop`}>
        <span className="text-14 text-red-600">{errors?.message}</span>
      </div>
    </>
  );
};

export default FormInput;
