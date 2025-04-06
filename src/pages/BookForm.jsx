import BookingForm from "@/components/BookingForm";

import CoachVisual from "@/components/CoachVisual.jsx";
import ProceedToPay from "@/components/PassengerBillingSummary";
import { Card, CardContent } from "@/components/ui/card";
import { trainData } from "@/services/token.service";
import { fetchAllSeats } from "@/stores/actions/booking.action";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { PersonStandingIcon, TicketPercent, TrainFront, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function BookForm() {
  const [showSeat, setShowSeat] = useState(false);
  const {train} =  useSelector(store => store.booking)

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllSeats());
  }, []);
  return (
    <div className="relative container mx-auto  flex-col md:flex-row items-center pt-20 ">
      {/* Train Detail */}
      <div className=" w-full px-2">
        <Card className="border  relative overflow-hidden">
          <Tooltip>
            <TooltipTrigger onClick={() => setShowSeat(!showSeat)} className="">
              <div className="absolute right-10  border-2 p-1 border-primary rounded-4xl shadow-lg hover:bg-primary hover:text-gray-50">
                <TrainFront />
              </div>
            </TooltipTrigger>
            <TooltipContent className="relative border-primary border-1 w-40 text-center rounded-[3px] top-0 bg-pink-50 left-35 top-20 md:top-18 md:left-130 text-sm">
              See Seat Position
            </TooltipContent>
          </Tooltip>
          <CardContent className="p-0">
            {/* Train Header */}
            <div className="p-4 bg-white flex items-center justify-between">
              <div>
                <div className="flex items-center">
                  <span className="font-medium mr-2">{train.trainNumber}</span>
                  <span className="font-medium">{train.trainName}</span>
                </div>
                {train.tag && (
                  <span className="text-xs text-blue-800 bg-blue-50 px-2 py-1 rounded-full">
                    {train.tag}
                  </span>
                )}
              </div>
            </div>

            {/* Journey Details */}
            <div className="p-4 bg-white flex justify-between">
              <div>
                <p className="text-lg font-bold">{train.departureTime}</p>
                <p className="text-xs text-gray-500">
                  {train.departureStation}
                </p>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-xs text-gray-400 flex items-center">
                  <span className="mr-1">←</span>
                  {train.duration}
                  <span className="ml-1">→</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold">{train.arrivalTime}</p>
                <p className="text-xs text-gray-500">{train.arrivalStation}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Booking Form */}
      <div className="grid md:grid-cols-[2fr_1fr] gap-2  mt-6 w-full ">
        <div>
          {" "}
          <BookingForm />
        </div>
        <div>
          <ProceedToPay />
        </div>
      </div>

      {/* Available Seats Pop */}
      {showSeat && (
        <div
          onClick={() => setShowSeat(!showSeat)}
          className="absolute top-0 flex justify-center items-center bg-white/10 p-20 backdrop-blur-sm h-screen w-full "
        >
          <div className=" relative">
            <X
              onClick={() => setShowSeat(!showSeat)}
              size={"20"}
              className="absolute right-1 top-2 border-1 bg-stone-700 text-stone-50 rounded-4xl"
            />
            <CoachVisual />
          </div>
        </div>
      )}
    </div>
  );
}

export default BookForm;
