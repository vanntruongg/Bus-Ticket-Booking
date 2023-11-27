import { formatDate, formatDateBooking } from './dateUtils';

const dayOfWeek = 7;
// hàm lấy ngày đầu và ngày cuối của 1 tuần từ 1 ngày
const getWeekStartEnd = (date, lastDate) => {
  const start = new Date(date);
  start.setDate(date.getDate());
  const end = new Date(date);
  const addDayForNextWeek =
    lastDate.getDate() - date.getDate() >= dayOfWeek
      ? dayOfWeek - 1
      : lastDate.getDate() - date.getDate();
  end.setDate(date.getDate() + addDayForNextWeek);
  return { start, end };
};

export const getWeeksInMonth = (month, year) => {
  const weeks = [];
  weeks.push({});
  const firstDate = new Date(year, month - 1, 1);
  const lastDate = new Date(year, month, 0);
  let currentDate = firstDate;
  while (currentDate <= lastDate) {
    const { start, end } = getWeekStartEnd(currentDate, lastDate);
    weeks.push({ start, end });
    currentDate = new Date(currentDate);
    currentDate.setDate(currentDate.getDate() + 7);
  }
  return weeks;
};

export const getDaysInMonth = (month, year) => {
  const days = [];
  const firstDate = new Date(year, month - 1, 1);
  const lastDate = new Date(year, month, 0);
  let currentDate = new Date(firstDate);
  while (currentDate <= lastDate) {
    const date = new Date(currentDate);
    const day = formatDate(date);
    days.push(day);
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return days;
};

export const getDaysInWeek = (week) => {
  const days = [];
  let currentDate = new Date(week?.start);
  while (currentDate <= week?.end) {
    days.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return days;
};

export const countWeeks = (weeksInMonth) => {
  const options = [];
  weeksInMonth.map((week, index) => {
    if (week.start && week.end) {
      options.push({ value: index, label: `Tuần ${index}` });
    }
  });
  return options;
};
