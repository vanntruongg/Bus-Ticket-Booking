import { useState, useEffect } from 'react';

const useDebounce = (value, delay) => {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    console.log(value);
    const timeOutId = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => clearTimeout(timeOutId);
  }, [value]);

  return debounceValue;
};

export default useDebounce;
