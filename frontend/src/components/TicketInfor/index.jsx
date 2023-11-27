import Ticket from '../Ticket';
import FrameTicketInfor from '../FrameTicketInfor';

const TicketInfor = ({ ticket }) => {
  console.log(ticket);
  return (
    <FrameTicketInfor ticket={ticket}>
      <Ticket ticket={ticket[0]} />
    </FrameTicketInfor>
  );
};

export default TicketInfor;
