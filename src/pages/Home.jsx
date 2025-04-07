import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Loader2, TrainFront } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BookingService = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [searchLoading, setSearchloading] = useState(false);
  const [date, setDate] = useState(new Date());
  const navigate = useNavigate();
  const cities = ["Bangalore", "Delhi"];

  return (
    <div className="flex flex-col md:flex-row items-center  justify-center md:justify-around  min-h-screen bg-foreground">
      <Card className={"hidden md:flex flex-col min-w-40"}>
        <CardHeader className="  text-center">
          <div className="flex justify-center mb-4">
            <TrainFront className="h-8 w-8 text-blue-500" />
          </div>
          <CardTitle className="text-2xl font-bold">Book Your Trip</CardTitle>
          <CardDescription>
            Select your departure, destination, and travel date
          </CardDescription>
        </CardHeader>
      </Card>
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader className="md:hidden text-center">
          <div className="flex justify-center mb-4">
            <TrainFront className="h-8 w-8 text-blue-500" />
          </div>
          <CardTitle className="text-2xl font-bold">Book Your Trip</CardTitle>
          <CardDescription>
            Select your departure, destination, and travel date
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="flex  flex-col md:flex-row justify-center items-center gap-8">
            <div className="flex md:flex-col flex-row justify-center  gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">From</label>
                <Select value={from} onValueChange={setFrom}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select origin" />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map((city) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">To</label>
                <Select value={to} onValueChange={setTo}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select destination" />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map((city) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">
                Travel Date
              </label>
              <div className="flex justify-center border rounded-md p-4">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md"
                  disabled={(date) => date < new Date()}
                />
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter>
          <Button
            onClick={() => {
              setSearchloading(!searchLoading);
              setTimeout(() => {
                navigate("/trains");
                setSearchloading(!searchLoading);
              }, 3000);
            }}
            className="w-full"
            size="lg"
          >
            {searchLoading ? <Loader2 className="animate-spin" /> : "Search Trains"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default BookingService;
