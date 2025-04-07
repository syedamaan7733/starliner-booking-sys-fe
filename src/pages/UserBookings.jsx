import { useDispatch, useSelector } from "react-redux";
import BookingsList from "../components/BookingList";
import TicketInformation from "../components/TicketInformation";
import { useEffect, useState } from "react";
import { fetchUserBookings } from "@/stores/actions/booking.action";
import { X } from "lucide-react";

// In your parent component
function UserBooking() {
  const [openPage, setopenPage] = useState(false);
  const { userBookings, userDetails } = useSelector((store) => store.booking);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUserBookings());
  }, []);
  return (
    <div className="container mx-auto p-4 py-20">
      <h1 className="text-2xl font-bold mb-6">My Bookings</h1>
      <BookingsList state={{ openPage, setopenPage }} bookings={userBookings} />

      {openPage && (
        <div className="absolute w-full container h-screen top-10 mx-auto">
          <div className="  mt-8 bg-white">
            <div className="flex justify-between  items-center px-2">
              <h2 className="text-xl font-semibold mb-4">Ticket Details</h2>
              <X onClick={() => setopenPage(!openPage)} />
            </div>
            <TicketInformation  booking={userDetails} />
          </div>
        </div>
      )}
    </div>
  );
}

export default UserBooking;
