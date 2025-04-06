import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Calendar, Clock, MapPin, Train, User } from 'lucide-react';

const TicketInformation = ({ booking }) => {
  if (!booking) return null;

  // Function to get class details based on price
  const getClassDetails = () => {
    const matchingClass = booking.train.classes.find(
      cls => Number(cls.price.replace('₹', '')) === booking.amount
    );
    
    return matchingClass || booking.train.classes[0];
  };

  const classDetails = getClassDetails();

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">{booking.train.trainName}</CardTitle>
            <p className="text-sm text-gray-500">{booking.train.trainNumber}</p>
          </div>
          <Badge 
            className={booking.ticketStatus.toLowerCase() === 'upcomming' ? 
              'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}
          >
            {booking.ticketStatus.charAt(0).toUpperCase() + booking.ticketStatus.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          {/* Journey details */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <Train className="h-4 w-4 mr-2 text-gray-500" />
              <span className="font-medium">Journey Details</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <div className="space-y-3">
                {/* Departure */}
                <div className="flex">
                  <div className="mr-3 relative">
                    <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center">
                      <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                    </div>
                    <div className="h-full border-l border-dashed border-gray-300 absolute top-5 left-2.5"></div>
                  </div>
                  <div>
                    <p className="font-medium">{booking.train.departureStation}</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="mr-1 h-3 w-3" />
                      {booking.train.departureTime}
                    </div>
                  </div>
                </div>
                
                {/* Duration */}
                <div className="flex">
                  <div className="mr-3 w-5 flex justify-center text-xs text-gray-500">
                    <span className="transform -translate-x-1/2">{booking.train.duration}</span>
                  </div>
                </div>
                
                {/* Arrival */}
                <div className="flex">
                  <div className="mr-3">
                    <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center">
                      <div className="h-2 w-2 rounded-full bg-green-600"></div>
                    </div>
                  </div>
                  <div>
                    <p className="font-medium">{booking.train.arrivalStation}</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="mr-1 h-3 w-3" />
                      {booking.train.arrivalTime}
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="border border-gray-200 rounded p-3">
                  <p className="text-sm font-medium mb-2">Ticket Details</p>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>Class:</div>
                    <div className="font-medium">{classDetails.type}</div>
                    
                    <div>Status:</div>
                    <div className="font-medium">{classDetails.code}</div>
                    
                    <div>Amount:</div>
                    <div className="font-medium">₹{booking.amount}</div>
                    
                    <div>Booked on:</div>
                    <div className="font-medium">{new Date(booking.createdAt).toLocaleDateString()}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Passenger details */}
          <div>
            <h3 className="text-sm font-medium mb-2">Passenger Details</h3>
            <div className="space-y-2">
              {booking.passangerDetail.map((passenger, index) => (
                <div key={index} className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-start">
                    <User className="h-4 w-4 mr-2 mt-0.5 text-gray-500" />
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <span className="font-medium">{passenger.name}</span>
                        <span className="text-sm">Seat: {booking.seats[index]}</span>
                      </div>
                      <div className="text-sm text-gray-500">
                        {passenger.age} years • {passenger.gender.charAt(0).toUpperCase() + passenger.gender.slice(1)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TicketInformation;