import React from "react";
import { useSelector } from "react-redux";
import { Badge } from "./ui/badge";

function CoachVisual() {
  const { seats, userDetails } = useSelector((store) => store.booking);
  // console.log(seats);
  return (
    <div className=" bg-gray-100 shadow-lg p-6 rounded-2xl items-center text-center max-w-200">
      {/* Seats grid */}
      <div className="grid grid-cols-7 gap-2">
        {seats?.map((seat, i) => (
          // Seat
          <div
            key={seat.seatNumber}
            // className={`bg-background border-1 rounded-sm text-sm font-bold  ${
            //   seat.status === "booked"
            //     ? "bg-pink-100 border-primary text-primary "
            //     : "bg-gray-400 border-gray-600 text-gray-100"
            // } p-[1px] cursor-pointer hover:bg-gray-50 hover:text-stone-900 `}

            className={`bg-background border-1 rounded-sm text-sm font-bold  ${
              seat.status !== "booked"
                ? "bg-gray-400 border-gray-600 text-gray-100"
                : userDetails?.seats?.includes(seat.seatNumber)
                ? "bg-purple-500 text-white"
                : "bg-pink-100 border-primary text-primary "
            } p-[1px] cursor-pointer hover:bg-gray-50 hover:text-stone-900 `}
          >
            {seat.seatNumber}
          </div>
        ))}
      </div>
      <div className="flex pt-3 justify-around items-center">
        {/* Badges */}
        <Badge variant={"outline"} className="bg-pink-100 border-primary">
          Booked
        </Badge>
        <Badge
          variant={"outline"}
          className="bg-gray-400 border-gray-400 text-stone-50"
        >
          Available
        </Badge>
      </div>
    </div>
  );
}

export default CoachVisual;
