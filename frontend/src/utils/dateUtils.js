import dayjs from 'dayjs';

const daysOfWeek = [
  'Chủ Nhật',
  'Thứ 2',
  'Thứ 3',
  'Thứ 4',
  'Thứ 5',
  'Thứ 6',
  'Thứ 7',
];

export const getCurrentDateFormatted = () => {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const year = today.getFullYear();

  return `${day}-${month}-${year}`;
};

export const formatDate = (date) => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

export const formatDateYYYTMMDD = (tripDate) => {
  const parts = tripDate.split('/');
  const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
  return formattedDate;
};

export const getCurrentMonthAndYear = () => {
  const today = new Date();
  const month = String(today.getMonth() + 1);
  const year = today.getFullYear();
  return { month, year };
};

export const formatDateBooking = (inputDate) => {
  const [day, month, year] = inputDate.split('-');
  const date = new Date(`${year}-${month}-${day}`);
  const dayOfWeek = daysOfWeek[date.getDay()];
  const formatDate = `${dayOfWeek}, ${date.getDate()}/${date.getMonth() + 1}`;

  return formatDate;
};

export const formatTripDate = (tripDate) => {
  const parts = tripDate.split('-');
  const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
  return formattedDate;
};

// ex: Thứ Hai, Thứ Ba,...
export const convertDateToLong = (day) => {
  dayjs.locale('vi');
  // Chuyển đổi ngày từ chuỗi "01-10-2023" thành đối tượng dayjs
  const date = dayjs(day, 'DD-MM-YYYY');
  // Lấy tên ngày trong tuần
  const dayOfWeek = date.format('dddd').toUpperCase();

  return dayOfWeek;
};

// ex: 25/09/2023
export const convertDateToFormat = (date) => {
  const dayOfWeek = date?.toLocaleDateString('vi-VI');
  return dayOfWeek;
};

export const convertTimeToMinutes = (time) => {
  const [hour, minute] = time.split(':');
  return parseInt(hour) * 60 + parseInt(minute);
};

export const disabledDate = (current, disAbleFrom) => {
  // Can not select days before today
  // when isReturn true can't set toDay before fromDay
  disAbleFrom = disAbleFrom ? dayjs(disAbleFrom, 'DD-MM-YYYY') : undefined; // convert string 'DD-MM-YYYY' to dayjs object
  const dayDisable =
    disAbleFrom !== undefined
      ? disAbleFrom.startOf('day')
      : dayjs().startOf('day');
  return current && current < dayDisable;
};
