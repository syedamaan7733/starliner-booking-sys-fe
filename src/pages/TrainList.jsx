import React, { useEffect } from "react";
import {
  ArrowLeft,
  Edit,
  Shield,
  ChevronDown,
  RefreshCw,
  Loader2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useDispatch, useSelector } from "react-redux";
import { addTrainData, fetchAllTrain } from "@/stores/actions/booking.action";
import { useNavigate } from "react-router-dom";
import { trainData } from "@/services/token.service";

const TrainList = () => {
  const availableSeats = useSelector((store) => store.booking.availableSeats);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    trains,
    loading: { trains: loading },
    errors: { trains: error },
  } = useSelector((store) => store.booking);

  useEffect(() => {
    dispatch(fetchAllTrain());
  }, []);

  function handleTap(data) {
   dispatch(addTrainData(data))
    navigate("/book/form");
  }

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center ">
        <Loader2 size={20} className="animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className=" container mx-auto pt-30 bg-transparent bg-gray-50">
      {/* Header */}
      <div className="bg-white p-4 flex items-center justify-between border-b">
        <div className="flex items-center">
          <div>
            <h1 className="text-lg font-medium">NDLS to BNC</h1>
            <p className="text-sm text-gray-500">Sunday, 6 Apr | 3 trains</p>
          </div>
        </div>
        <Edit size={20} className="text-gray-500" />
      </div>
      {/* Train List */}
      <div className="space-y-4 p-2">
        {trains?.map((train, index) => (
          <Card key={index} className="border overflow-hidden">
            <CardContent className="p-0">
              {/* Train Header */}
              <div className="p-4 bg-white flex items-center justify-between">
                <div>
                  <div className="flex items-center">
                    <span className="font-medium mr-2">
                      {train.trainNumber}
                    </span>
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
                  <p className="text-xs text-gray-500">
                    {train.arrivalStation}
                  </p>
                </div>
              </div>
              {/* Class Options */}
              <div className="grid grid-cols-3 justify-evenly px-4 gap-2">
                {train.classes.map((ele, idx) => (
                  <div
                    onClick={() => handleTap(train)}
                    key={idx}
                    className={`bg-background ${
                      availableSeats > 0
                        ? "hover:bg-green-50 hover:border-green-300"
                        : "hover:bg-red-50 hover:border-red-300"
                    } transition-all border-2 border-purple-300 rounded-lg p-4`}
                  >
                    <div className="flex justify-between mb-1">
                      <span className="font-medium">{ele.type}</span>
                      <span className="font-medium">{ele.price}</span>
                    </div>
                    <div className="text-center mb-2">
                      <span className="text-primary font-medium">
                        {availableSeats} AVL
                      </span>
                    </div>
                    {ele.seatGuarantee && (
                      <div className="flex items-center justify-center text-xs text-gray-600 mb-1">
                        <Badge
                          variant="outline"
                          className="bg-white border-gray-200 text-gray-600 flex items-center gap-1"
                        >
                          <div className="bg-blue-500 w-2 h-2 rounded-full"></div>
                          Seat Guarantee
                        </Badge>
                      </div>
                    )}
                    <div className="text-center text-xs text-gray-500">
                      {ele.updated}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Spacing for footer */}
      <div className="h-16"></div>
    </div>
  );
};

export default TrainList;
