import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Calendar, Clock } from 'lucide-react';

const BookingsList = ({ bookings = [] }) => {
  // Format ticket status for display
  const formatStatus = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  // Get status badge color
  const getStatusColor = (status) => {
    switch(status.toLowerCase()) {
      case 'upcoming':
      case 'upcomming': // Handle spelling variation in data
        return 'bg-blue-100 hover:bg-blue-200 text-blue-800';
      case 'completed':
        return 'bg-green-100 hover:bg-green-200 text-green-800';
      case 'cancelled':
        return 'bg-red-100 hover:bg-red-200 text-red-800';
      case 'waiting':
        return 'bg-yellow-100 hover:bg-yellow-200 text-yellow-800';
      default:
        return 'bg-gray-100 hover:bg-gray-200 text-gray-800';
    }
  };

  if (!bookings.length) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-500">No bookings found</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {bookings.map((booking) => (
        <Card key={booking._id} className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-500">
                    {new Date(booking.createdAt).toLocaleDateString()}
                  </span>
                </div>
                
                <div className="flex items-center font-medium mb-1">
                  {booking.train.departureStation}
                  <ArrowRight className="mx-2 h-4 w-4 text-gray-400" />
                  {booking.train.arrivalStation}
                </div>
                
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="mr-1 h-4 w-4" />
                  <span>{booking.train.departureTime} - {booking.train.arrivalTime}</span>
                  <span className="mx-2">•</span>
                  <span>{booking.train.duration}</span>
                </div>
              </div>
              
              <div className="ml-4">
                <Badge className={getStatusColor(booking.ticketStatus)}>
                  {formatStatus(booking.ticketStatus)}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default BookingsList;