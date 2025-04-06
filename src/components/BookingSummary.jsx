import React from "react";
import { useSelector } from "react-redux";

export default function BookingSummary() {
  const { newTicket } = useSelector((store) => store.booking);
  console.log(newTicket);
  return <div>BookingSummary</div>;
}
