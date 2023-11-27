import { clearFromAndTo } from '@/redux/roundTripTicketSlice';
import tripApi from './tripApi';

export const searchTrip = async (
  dispatch,
  navigate,
  from,
  to,
  fromTime,
  toTime,
  isReturn,
) => {
  console.log('fromTime api: ', fromTime);
  console.log('toTime api: ', toTime);
  dispatch(clearFromAndTo());
  try {
    return await tripApi
      .searchTrip(
        from.locationCode,
        to.locationCode,
        fromTime,
        toTime,
        isReturn,
      )
      .then((res) => {
        const queryParams = new URLSearchParams();
        queryParams.set('from', from.locationCode);
        queryParams.set('to', to.locationCode);
        queryParams.set('fromTime', fromTime);
        queryParams.set('toTime', toTime);
        queryParams.set('isReturn', isReturn);

        navigate(`/tim-chuyen-xe?${queryParams.toString()}`, {
          state: {
            trips: res,
            from: from.locationName,
            to: to.locationName,
            searchString: queryParams.toString(),
          },
        });
      });
  } catch (error) {
    console.log(error);
  }
};
