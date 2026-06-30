import React from "react";
import Card from "./Card";
import Badge from "./Badge";
import { formatCurrency, formatDate } from "../utils/formatters";
import { Calendar, Clock, User } from "lucide-react";
import { SERVICES } from "../utils/constants";

const BookingCard = ({ booking, onClick }) => {
  const service = SERVICES.find((s) => s.id === booking.serviceId) || {};
  const provider = {
    name: booking.providerName || "Professional",
  };

  const statusColors = {
    Upcoming: "info",
    Confirmed: "success",
    Done: "gray",
    Cancelled: "danger",
  };

  return (
    <Card hover onClick={onClick} className="w-full relative" padding="p-5">

      {/* TOP */}
      <div className="flex justify-between items-start mb-4">

        <div className="flex gap-4 items-center">

          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-500 flex items-center justify-center shrink-0">
            <User size={20} />
          </div>

          <div>
            <h4 className="font-bold text-gray-900 dark:text-white text-base leading-tight">
              {service.name || "Service"}
            </h4>

            <p className="text-sm text-gray-500 mt-1">
              {provider.name || booking.providerName || "Provider"}
            </p>
          </div>

        </div>

        <Badge
          variant={statusColors[booking.status] || "gray"}
          size="sm"
          className="px-3 py-1.5 font-medium"
        >
          {booking.status}
        </Badge>

      </div>

      {/* BOOKING DETAILS */}
      <div className="grid grid-cols-2 gap-y-3 gap-x-4 mt-4 pt-4 border-t border-gray-100 text-sm">

        <div className="flex items-center gap-2 text-gray-500">
          <Calendar size={16} className="text-gray-400" />
          <span>{formatDate(booking.date)}</span>
        </div>

        <div className="flex items-center gap-2 text-gray-500">
          <Clock size={16} className="text-gray-400" />
          <span>{booking.time}</span>
        </div>

        <div className="font-bold text-lg text-gray-900 dark:text-white">
          {formatCurrency(booking.amount || booking.totalAmount)}
        </div>

      </div>

      {/* PLATFORM FEE */}
      <div className="mt-4 flex justify-between items-center border-t border-gray-100 pt-4">

        <span className="text-sm text-gray-500">
          Platform Fee
        </span>

        <span className="font-semibold text-gray-800 dark:text-gray-200">
          ₹29
        </span>

      </div>

      {/* PAYMENT OPTIONS */}
      <div className="mt-5 space-y-3">

        <h3 className="font-semibold text-sm text-gray-700 dark:text-gray-200">
          Payment Options
        </h3>

        <button className="w-full border border-gray-200 dark:border-gray-700 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition text-left">
          💵 Cash on Service
        </button>

        <button className="w-full border border-gray-200 dark:border-gray-700 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition text-left">
          📱 UPI Payment
        </button>

        <button className="w-full border border-gray-200 dark:border-gray-700 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition text-left">
          💳 Credit / Debit Card
        </button>

        <button className="w-full border border-gray-200 dark:border-gray-700 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition text-left">
          🔳 QR Payment
        </button>

      </div>

    </Card>
  );
};

export default BookingCard;
