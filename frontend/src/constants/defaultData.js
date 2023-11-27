export const SYSTEM_NAME = 'VT Ticket Booking';
export const rolesMap = {
  1: 'Quản trị viên',
  2: 'Nhân viên',
  3: 'Người dùng',
};

export const rolesMapValue = {
  ROLE_ADMIN: 'Quản trị viên',
  ROLE_EMPLOYEE: 'Nhân viên',
  ROLE_USER: 'Người dùng',
};
export const rolesDataValue = [
  { value: 'ROLE_ADMIN', label: 'Quản trị viên' },
  { value: 'ROLE_EMPLOYEE', label: 'Nhân viên' },
  { value: 'ROLE_USER', label: 'Người dùng' },
];
export const rolesData = [
  { value: 1, label: 'Quản trị viên' },
  { value: 2, label: 'Nhân viên' },
  { value: 3, label: 'Người dùng' },
];

export const optionsStatistical = [
  {
    value: 'year',
    label: 'Năm',
  },
  {
    value: 'quarter',
    label: 'Quý',
  },
  {
    value: 'month',
    label: 'Tháng',
  },
];

export const monthInYear = Array.from({ length: 12 }, (_, i) => ({
  value: i + 1,
  label: `TH${String(i + 1).padStart(2, '0')}`,
}));

export const weeksInMonth = [
  {
    value: 1,
    label: 'Tuần 1',
  },
  {
    value: 2,
    label: 'Tuần 2',
  },
  {
    value: 3,
    label: 'Tuần 3',
  },
  {
    value: 4,
    label: 'Tuần 4',
  },
];

export const defaultInformation = [
  {
    key: '1',
    label: 'Địa chỉ',
    children: 'An Khánh, Ninh Kiều, Cần Thơ',
    link: 'https://www.google.com/maps/place/Ph%C6%B0%E1%BB%9Dng+An+Kh%C3%A1nh,+Ninh+Ki%E1%BB%81u,+C%E1%BA%A7n+Th%C6%A1,+Vi%E1%BB%87t+Nam/@10.0347986,105.7329227,14z/data=!3m1!4b1!4m6!3m5!1s0x31a0886a10135a5d:0xfc5de43630e9e2e5!8m2!3d10.0394569!4d105.7527221!16s%2Fg%2F1hb_g2tpd?hl=vi-VN&entry=ttu',
    target: '_blank',
  },
  /*{
    key: '2',
    label: 'Website',
    children: 'http://localhost:3030',
    link: 'http://localhost:3030',
  },*/
  {
    key: '3',
    label: 'Số điện thoại',
    children: '0357998012',
    link: 'tel:+0357998012',
  },
  {
    key: '4',
    label: 'Email',
    children: 'obtbms@gmail.com',
    link: 'mailto:obtbms@gmail.com',
  },
  {
    key: '5',
    label: 'Hotline',
    children: '8080 3030',
    link: 'tel:+80803030',
  },
];

export const PolicycAncelTicket = {
  title: 'Bạn có chắn chắn muốn hủy vé.',
  content: 'Sau khi hủy vé sẽ không thể hoàn tác.',
};
