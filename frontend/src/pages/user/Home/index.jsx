import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import PopularRouteCard from './components/PopularRouteCard';
import SearchTrip from './components/SearchTrip';
import { useEffect, useState } from 'react';
import { routeApi } from '@/services/routeApi';
import TPHCMImg from '@/assets/tphcm.png';
import DaLatImg from '@/assets/dalat.png';
import CanThoImg from '@/assets/cantho.png';
import { textResource } from '@/resources/dataDefault';

const routePopulars = [
  {
    name: 'Tp Hồ Chí Minh',
    code: 'TPHCM',
    img: TPHCMImg,
  },
  {
    name: 'Đà Lạt',
    code: 'DALAT',
    img: DaLatImg,
  },
  {
    name: 'Cần Thơ',
    code: 'CANTHO',
    img: CanThoImg,
  },
];

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dataRoutesPopular, setDataRoutesPopular] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      for (const origin of routePopulars) {
        const res = await routeApi.getALLRouteByOrigin(origin.code);
        setDataRoutesPopular((prev) => [...prev, res]);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="">
      <div className="max-w-[800px] mx-auto py-6 text-center animate-fadeInToTop">
        <h1 className="py-6 text-36 bg-gradient-to-r from-white via-primary-400 to-primary-600 bg-clip-text text-transparent font-openSans font-bold">
          {textResource.SLOGAN}
        </h1>
        <p className="max-w-[300px] mx-auto -mt-4 text-18 italic text-gray-200 font-medium">
          {textResource.SUB_SLOGAN}
        </p>
      </div>
      <SearchTrip />
      <section className="bg-gray-50 min-h-[300px] px-16 pt-6 pb-20 rounded-md">
        <div className="mb-6 mx-10 font-openSans">
          <h2 className="uppercase text-24 text-primary-600 font-bold">
            Tuyến phổ biến
          </h2>
          <span className="text-gray-500">
            Được hành khách tin tưởng và lựa chọn
          </span>
        </div>
        <div className="grid grid-cols-3 gap-8 px-10">
          <PopularRouteCard
            navigate={navigate}
            dispatch={dispatch}
            fromName={routePopulars[0].name}
            img={routePopulars[0].img}
            dataRoutesPopular={dataRoutesPopular[0]}
          />
          <PopularRouteCard
            navigate={navigate}
            dispatch={dispatch}
            fromName={routePopulars[1].name}
            img={routePopulars[1].img}
            dataRoutesPopular={dataRoutesPopular[1]}
          />
          <PopularRouteCard
            navigate={navigate}
            dispatch={dispatch}
            fromName={routePopulars[2].name}
            img={routePopulars[2].img}
            dataRoutesPopular={dataRoutesPopular[2]}
          />
        </div>
      </section>
    </div>
  );
};
export default Home;
