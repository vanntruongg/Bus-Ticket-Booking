import { useSearchParams } from 'react-router-dom';

const useSearchParameters = () => {
  const [searchParams] = useSearchParams();
  return {
    from: searchParams.get('from') || '',
    to: searchParams.get('to') || '',
    fromTime: searchParams.get('fromTime') || '',
    toTime: searchParams.get('toTime') || '',
    isReturn: searchParams.get('isReturn') || '',
  };
};

export default useSearchParameters;
