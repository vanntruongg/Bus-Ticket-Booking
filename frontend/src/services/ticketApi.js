import { TICKET } from '@/constants/ApiEndpoint';
import axiosInstance from './axiosInstance';
import Ticket from '@/components/Ticket';

export const ticketApi = {
  getAll: async () => {
    const res = await axiosInstance.get(TICKET.GET_ALL);
    return res.data;
  },
  getAllByEmailUser: async (email) => {
    const res = await axiosInstance.get(
      TICKET.GET_ALL_BY_EMAIL + `?email=${email}`,
    );
    return res.data;
  },
  getTicketByPhoneAndTicketid: async (phone, ticketId) => {
    const res = await axiosInstance.get(TICKET.GET, {
      params: { phone, ticketId },
    });
    return res;
  },
  createNewTicketBooking: async (data) => {
    const res = await axiosInstance.post(
      TICKET.CREATE_NEW_TICKET_BOOKING,
      data,
    );
    return res.data;
  },
  cancelTicket: async (ticketId) => {
    return await axiosInstance.patch(TICKET.CANCEL_TICKET + `/${ticketId}`);
  },
  getTicketByType: async (type, email, pageNumber = 1, pageSize = 10) => {
    const res = await axiosInstance.get(
      TICKET.GET_ALL_BY_TYPE +
        `?type=${type}&email=${email}&pageNumber=${pageNumber}&pageSize=${pageSize}`,
    );
    return res.data;
  },
};
