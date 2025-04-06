import { useDispatch, useSelector } from "react-redux";
import BookingsList from "../components/BookingList";
import TicketInformation from "../components/TicketInformation";
import { useEffect, useState } from "react";
import { fetchUserBookings } from "@/stores/actions/booking.action";

// In your parent component
function UserBooking() {
  const [openPage, setopenPage] = useState(true);
  const { userBookings } = useSelector((store) => store.booking);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUserBookings());
  }, []);
  return (
    <div className="container mx-auto p-4 py-20">
      <h1 className="text-2xl font-bold mb-6">My Bookings</h1>
      <BookingsList bookings={userBookings} />

      {/* Show detailed tic,ket for selected booking */}
      {/* {userBookings.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Ticket Details</h2>
          <TicketInformation booking={userBookings[0]} />
        </div>
      )} */}
    </div>
  );
}

export default UserBooking;
