import { Button, Input, Space } from 'antd';

const InputLabel = ({ placeholder, type, label, className, field, errors }) => {
  return (
    <div className="my-2">
      <div className={`flex items-center ${className}`}>
        <label htmlFor="" className="w-40">
          {label}
        </label>
        <Input
          placeholder={placeholder}
          type={type}
          {...field}
          onKeyDown={(e) => {
            if (type === 'number') {
              ['e', 'E', '+', '-'].includes(e.key) && e.preventDefault();
            }
          }}
        />
      </div>
      {errors && <span className="text-12 text-red-500">{errors.message}</span>}
    </div>
  );
};

export default InputLabel;
