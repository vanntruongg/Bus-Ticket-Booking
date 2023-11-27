import { ticketApi } from '@/services/ticketApi';
import FrameTicketInfor from '@/components/FrameTicketInfor';
import { ThreeBodyLoading } from '@/components/Loading';
import Ticket from '@/components/Ticket';
import { PathRoutesUser } from '@/constants/PathRoutes';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const TicketBookingInformation = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const urlParams = new URLSearchParams(window.location.search);
  const ticket = JSON.parse(localStorage.getItem('dataTicketBooking'));
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const responseStatus = urlParams.get('vnp_ResponseCode');
      const paymentStatus = urlParams.get('vnp_TransactionStatus');
      console.log('responseStatus: ', responseStatus);
      console.log('paymentStatus: ', paymentStatus);
      if (responseStatus === '00' && paymentStatus === '00') {
        setLoading(true);
        // onSubmit();
        console.log('Handle Submit create ticket');
        console.log(ticket);
        const res = await ticketApi.createNewTicketBooking(ticket);
        // call APi create ticket
        console.log('res call API: ', res);

        if (res) {
          res.ticketId.map(async (ticketId) => {
            try {
              const ticket = await ticketApi.getTicketByPhoneAndTicketid(
                res.phone,
                ticketId,
              );
              setTickets((prevTickets) => [...prevTickets, ticket.data]);
            } catch (err) {
              console.log(err);
            }
          });
        }
        setLoading(false);
      } else {
        navigate(PathRoutesUser.BOOKING);
      }
    };
    fetchData();
  }, []);
  console.log(tickets);
  return loading ? (
    <ThreeBodyLoading />
  ) : (
    <div className="backdrop-blur-xl">
      {tickets.length > 0 && (
        <FrameTicketInfor ticket={tickets}>
          {tickets.map((ticket) => (
            <Ticket key={uuidv4()} ticket={ticket} />
          ))}
        </FrameTicketInfor>
      )}
    </div>
  );
};

export default TicketBookingInformation;
