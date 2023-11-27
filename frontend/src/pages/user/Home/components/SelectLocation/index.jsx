import locationApi from '@/services/locationApi';
import { useEffect, useMemo, useRef, useState } from 'react';
import { MdOutlineClear } from 'react-icons/md';
import { Waveform } from '@uiball/loaders';
import unidecode from 'unidecode';
import { Spin } from 'antd';

const DropDownSelectLocation2 = ({
  title,
  value,
  originSelected,
  onChangeSelect,
  isOpen,
  setIsOpen,
  handleOpen,
}) => {
  // const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [provinces, setProvinces] = useState([]);
  const originRef = useRef(null);
  const parentRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const handleClickOutSide = (e) => {
      if (
        originRef.current &&
        !originRef.current.contains(e.target) &&
        !parentRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };
    window.addEventListener('mousedown', handleClickOutSide);

    return () => {
      window.removeEventListener('mousedown', handleClickOutSide);
    };
  }, []);

  useEffect(() => {
    setLoading(true);
    if (isOpen) {
      locationApi
        .getAllProvince()
        .then((res) => {
          console.log(res);
          setProvinces(res.data);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(true);
          console.log(error);
        });
    }
  }, [isOpen]);

  // useEffect(() => {
  //   if (originSelected !== '') {
  //     setIsOpen(true);
  //   }
  // }, [originSelected]);

  const sortProvincesByName = useMemo(() => {
    const sorted = [...provinces];
    sorted.sort((provinceA, provinceB) => {
      const nameProvinceA = provinceA.locationName.toUpperCase();
      const nameProvinceB = provinceB.locationName.toUpperCase();
      return nameProvinceA > nameProvinceB ? 1 : -1;
    });
    return sorted;
  }, [provinces]);

  const handleChangeSelect = (name, code) => {
    console.log('Select');
    console.log('name: ', name);
    console.log('code: ', code);
    onChangeSelect(name, code);
    setIsOpen(false);
  };
  // const handleOpen = () => {
  //   setIsOpen(!isOpen);
  // };
  const handleClearInput = () => {
    setSearchValue('');
    inputRef.current.focus();
  };

  return (
    <div className="relative">
      <h3 className={`px-4 py-1 ${!value ? 'invisible' : ''}`}>{title}</h3>
      <div
        ref={parentRef}
        className="w-full p-4 border-b-2 border-primary-500 relative cursor-pointer"
        onClick={handleOpen}
      >
        <span className="text-20 text-gray-900">
          {value !== '' ? value : `Chọn ${title}`}
        </span>
      </div>
      {isOpen && (
        <div ref={originRef} className="z-[99999]">
          <div className="absolute left-0 top-8 w-full min-w-[280px] p-1 bg-white rounded-md shadow-mdCustom max-h-[330px] z-[99999]">
            <div className=" p-2">
              <div className="border relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={searchValue}
                  placeholder="Tìm kiếm"
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="w-full p-2"
                />
                <div
                  className="absolute right-2 top-[50%] translate-y-[-50%] p-0.5 bg-gray-200 text-gray-700 rounded-full cursor-pointer"
                  onClick={handleClearInput}
                >
                  <MdOutlineClear size={12} className="" />
                </div>
              </div>
            </div>
            {originSelected === '' ? (
              <div className="py-2 text-center text-14 text-gray-500">
                <span className="">Vui lòng chọn điểm đi</span>
              </div>
            ) : (
              <div>
                <h3 className="font-medium text-18 p-2">Tỉnh, Thành phố</h3>
                <div className="max-h-[220px] overflow-y-scroll scrollbar scrollbar-w-1.5 scroll-smooth scrollbar-thumb-rounded-lg scrollbar-thumb-primary-500 scrollbar-track-transparent z-[99999]">
                  {loading ? (
                    <div className="min-h-[220px] flex justify-center items-center text-primary-500">
                      <Spin size="small" />
                    </div>
                  ) : (
                    sortProvincesByName
                      .filter((option) =>
                        unidecode(option.locationName.toLowerCase()).includes(
                          unidecode(searchValue.toLowerCase()),
                        ),
                      )
                      .map((option) => {
                        return (
                          <div
                            key={option.locationId}
                            onClick={() =>
                              handleChangeSelect(
                                option.locationName,
                                option.locationCode,
                              )
                            }
                            className="border-b p-2 cursor-pointer"
                          >
                            {option.locationName}
                          </div>
                        );
                      })
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropDownSelectLocation2;
