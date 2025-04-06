import React, { useState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useDispatch, useSelector } from "react-redux";
import { bookTicket } from "@/stores/actions/booking.action";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const PassengerBillingSummary = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

  const {
    passangerDetails,
    loading: { booking: bookingLoading },
    errors: { booking: bookingError },
    train,
  } = useSelector((store) => store.booking);

  const passengers = passangerDetails.length;
  console.log(passengers);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const farePerPerson = 1200;
  const couponDiscount = 0;
  const total = passengers * farePerPerson - couponDiscount;

  const paymentMethods = [
    {
      id: "phonePe",
      name: "PhonePe",
      icon: (
        <img
          className="max-w-10"
          src="https://play-lh.googleusercontent.com/6iyA2zVz5PyyMjK5SIxdUhrb7oh9cYVXJ93q6DZkmx07Er1o90PXYeo6mzL4VC2Gj9s=w480-h960-rw"
        />
      ),
    },
    {
      id: "Paytm",
      name: "Paytm",
      icon: (
        <img
          className="max-w-10"
          src="https://raw.githubusercontent.com/hdpngworld/HPW/main/uploads/650d41381232a-l.png"
        />
      ),
    },
    {
      id: "G-pay",
      name: "Google Pay",
      icon: (
        <img
          className="max-w-10"
          src="https://images.seeklogo.com/logo-png/32/1/google-pay-logo-png_seeklogo-324563.png"
        />
      ),
    },
    {
      id: "PayPal",
      name: "PayPal",
      icon: (
        <img
          className="max-w-10"
          src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Paypal_2014_logo.png?20150315064712"
        />
      ),
    },
    {
      id: "amznPAy",
      name: "Amazon PAy",
      icon: (
        <img
          className="max-w-10"
          src="https://www.citypng.com/public/uploads/preview/logo-amazon-pay-7017516947918903meswh2jwd.png"
        />
      ),
    },
  ];

  function handleProcess() {
    // Dispatching all customer data for ticket creation
    const customerData = {
      requestedSeats: passengers,
      passanger_details: passangerDetails,
      trainId: train._id,
    };
    // dispatch func
    dispatch(bookTicket(customerData));

    // this will open new window with blank document
    const windowProcessing = window.open("", "_blank");
    // this line will populate the window document  for predending as payment document
    if (windowProcessing) {
      windowProcessing.document.write(`
        <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Processing please wait...</title>
    <style>
        * {
            margin: 0;
            padding: 0;
        }

        body {
            display: flex;
            justify-content: center;
            align-items: start;
            gap: 2em;
            height: 100vh;
            padding: 12em 0;
            font-family: sans-serif;
        }

        .container {
            border: 2px solid #781d42;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 3em;
            flex-direction: column;
            padding: 2em;
            border-radius: 1em;
        }
    </style>
</head>

<body>
    <div class="container">
        <h1>Proccessing your booking please wait...</h1>
        <div class="loader">
            <h3 id="loading">loading...</h3>
        </div>
        <h2 id="message" class="message">-.-</h2>
    </div>
</body>
<script>
    const ststusMessage = document.getElementById("message")

    function start() {
        setTimeout(() => {
            ststusMessage.innerText = ""
            ststusMessage.innerText = "processing payment..."
        }, 1000);

        setTimeout(() => {
            ststusMessage.innerText = "payment confirmed..."
        }, 2000);
        setTimeout(() => {
            ststusMessage.style.color = "green"
            ststusMessage.innerText = "booking comfirmed Please wait..."
            document.getElementById("loading").style.color = "green"
            document.getElementById("loading").innerText = "Redirecting to the page."

        }, 3000);
    }

    start()
    setTimeout(() => {
        window.close()
    }, 5000);
</script>

</html>
        `);
      windowProcessing.document.close();
    }

    // Aftet the psudo process these toast will based on API state handling
    // Error
    if (bookingError) {
      toast.error(bookingError);
    } else {
      //success
      toast.success("Ticket Booked Successfully.");
    }

    setTimeout(() => {
      navigate("/");
    }, 6000);
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-xl text-center">Booking Summary</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Fare calculation section */}
        <div className="p-4 bg-slate-50 rounded-lg">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-slate-700">
                Passengers {passengers} × ₹{farePerPerson}
              </span>
              <span className="font-medium">₹{passengers * farePerPerson}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-slate-700">Coupon</span>
              <span className="font-medium">₹{couponDiscount}</span>
            </div>

            <Separator className="my-2" />

            <div className="flex justify-between items-center pt-2">
              <span className="font-bold text-lg">GRAND TOTAL</span>
              <span className="text-xl font-bold text-blue-600">₹{total}</span>
            </div>
          </div>
        </div>

        {/* Payment methods section */}
        <div className="space-y-3">
          <h3 className="text-lg font-medium text-center">
            Supported Payments
          </h3>
          <div className="flex flex-wrap justify-center gap-4 py-2">
            {paymentMethods.map((method) => (
              <div
                key={method.id}
                className={`flex flex-col w-[5em] h-[5em] text-center items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                  selectedPaymentMethod === method.id
                    ? "bg-pink-100 border-primary"
                    : "border-slate-200 hover:bg-slate-50"
                }`}
                onClick={() => setSelectedPaymentMethod(method.id)}
              >
                <div className="text-2xl mb-1">{method.icon}</div>
                <span className="text-xs font-medium">{method.name}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>

      <CardFooter>
        <Button
          onClick={handleProcess}
          className="w-full"
          size="lg"
          disabled={!selectedPaymentMethod || passengers < 1}
        >
          {bookingLoading ? (
            <Loader2 className="animate-spin" />
          ) : (
            <>
              {" "}
              <span>Proceed to Pay</span>
              <ArrowRight className="h-4 w-4 ml-2" />
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PassengerBillingSummary;
