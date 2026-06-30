import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CreditCard, CheckCircle, Smartphone, QrCode, ChevronLeft, Lock } from "lucide-react";
import Button from "../../components/Button";
import Input from "../../components/Input";
// import { bookingService } from "../../../api/bookingService";
import { showToast } from "../../store/slice/uiSlice";
import { clearBooking } from "../../store/slice/bookingSlice";
import { removeSession } from "../../utils/storage";
import { formatCurrency } from "../../utils/formatters";
import bookingService from "../../api/bookingService";

const StepPayment = ({ provider }) => {
  if (!provider) {
  return (
    <div className="text-center py-10">
      <h2 className="text-xl font-bold text-red-500">
        Provider not found
      </h2>

      <button
        onClick={() => window.history.back()}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
      >
        Go Back
      </button>
    </div>
  );
}
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentBooking = useSelector((state) => state.booking.currentBooking) || {};
  const { token } = useSelector((state) => state.auth);
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [paymentStep, setPaymentStep] = useState("selection"); // 'selection' or 'details'
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [bookingRef, setBookingRef] = useState("");
  const [confirmedBookingDetails, setConfirmedBookingDetails] = useState(null);

  // UPI State
  const [upiId, setUpiId] = useState("");

  // Card State
  const [cardDetails, setCardDetails] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
  });

  // Example Pricing Math
  const serviceCharge = currentBooking?.amount || 0;
  const platformFee = 49;
  const discount = 0; // if promo used
  const total = serviceCharge + platformFee - discount;

  const handleConfirm = async () => {
    if (paymentMethod === "cod") {
      await finalizeBooking();
    } else {
      setPaymentStep("details");
    }
  };

  const finalizeBooking = async () => {
    setLoading(true);

    try {
      const response = await bookingService.createBooking({
        provider: provider._id || provider.id,

        serviceName:
          provider.trade ||
          provider.service ||
          "General Service",

        bookingDate: currentBooking.date,

        timeSlot: currentBooking.time,

        issueDescription:
          currentBooking.description,

        address: currentBooking.address,

        payment: {
          method: paymentMethod.toUpperCase(),
          amount: total,
        },
      });

      const booking = response.data?.booking;
      
      setBookingRef(booking.bookingId);

      setConfirmedBookingDetails({
        ...currentBooking,
        bookingId: booking.bookingId,
      });

      setIsSuccess(true);

      dispatch(
        showToast({
          type: "success",
          message: "Booking confirmed successfully!",
        })
      );

      dispatch(clearBooking());

      removeSession("homefix_booking_progress");

      window.gtag?.("event", "booking_completed", {
        value: total,
      });

    } catch (error) {

      dispatch(
        showToast({
          type: "error",
          message:
            error?.response?.data?.message ||
            "Booking failed",
        })
      );

    } finally {
      setLoading(false);
    }
  };

  if (isSuccess && confirmedBookingDetails) {
    return (
      <div className="text-center py-8 animate-fadeIn">
        <div className="w-24 h-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={48} />
        </div>
        <h2 className="text-3xl font-bold mb-2">Booking Confirmed!</h2>
        <p className="text-gray-500 mb-6">
          Your booking reference ID is{" "}
          <span className="font-bold text-gray-900 dark:text-white">
            #{bookingRef}
          </span>
        </p>

        <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-4 mb-8 text-left max-w-sm mx-auto">
          <div className="flex items-center gap-4 mb-4 pb-4 border-b dark:border-gray-700">
            <div className="w-12 h-12 rounded-full bg-blue-100 text-primary flex items-center justify-center font-bold text-xl">
              {provider?.name?.charAt(0) || "P"}
            </div>
            <div>
              <p className="font-bold">
                {provider?.name || "Professional"}
              </p>
              <p className="text-sm text-gray-500">
                {confirmedBookingDetails.date} at {confirmedBookingDetails.time}
              </p>
              <p className="text-sm text-gray-500">
                {confirmedBookingDetails.problemTitle}
              </p>

              <p className="text-sm text-green-600 font-semibold">
                Estimated Arrival : 30-45 mins
              </p>

              <p className="text-sm text-blue-600 font-semibold">
                Payment : {paymentMethod.toUpperCase()}
              </p>

              <p className="text-sm text-gray-500">
                {confirmedBookingDetails.address?.name}
              </p>

              <p className="text-sm text-gray-500">
                {confirmedBookingDetails.address?.phone}
              </p>
            </div>
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Our professional will arrive at the scheduled time. You can track
            this booking in your dashboard.
          </div>
        </div>

        <div className="space-y-5">

          <div className="flex gap-4 justify-center">

            <Button
              variant="outline"
              onClick={() => navigate("/")}
            >
              Back Home
            </Button>

            <Button
              onClick={() => navigate("/dashboard")}
            >
              Dashboard
            </Button>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">

            <Button
              variant="outline"
              onClick={() => navigate(`/provider/${provider.id}`)}
            >
              View Profile
            </Button>

            <Button
              className="bg-green-600 hover:bg-green-700"
              onClick={() => navigate("/")}
            >
              Book Again
            </Button>

            <Button
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => window.print()}
            >
              Invoice
            </Button>

          </div>

          <div className="grid grid-cols-3 gap-3">

            <a
              href={`tel:${provider.phone}`}
              className="bg-green-600 text-white rounded-xl py-3 text-center font-semibold hover:bg-green-700 transition"
            >
              📞 Call
            </a>

            <a
              href={`https://wa.me/91${provider.phone}`}
              target="_blank"
              rel="noreferrer"
              className="bg-green-500 text-white rounded-xl py-3 text-center font-semibold hover:bg-green-600 transition"
            >
              💬 WhatsApp
            </a>

            <a
              href={`mailto:${provider.email}`}
              className="bg-blue-600 text-white rounded-xl py-3 text-center font-semibold hover:bg-blue-700 transition"
            >
              📧 Email
            </a>

          </div>

        </div>
      </div>
    );
  }

  if (paymentStep === "details") {
    return (
      <div className="space-y-6 animate-fadeIn">
        <button
          onClick={() => setPaymentStep("selection")}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-primary transition-colors"
        >
          <ChevronLeft size={16} /> Change Payment Method
        </button>

        {paymentMethod === "card" && (
          <div className="space-y-4">
            <h3 className="font-bold text-lg">Enter Card Details</h3>
            <div className="space-y-4 bg-gray-50 dark:bg-gray-900/50 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
              <Input
                label="Card Number"
                placeholder="0000 0000 0000 0000"
                value={cardDetails.number}
                onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
              />
              <Input
                label="Card Holder Name"
                placeholder="John Doe"
                value={cardDetails.name}
                onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
              />
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Expiry Date"
                  placeholder="MM/YY"
                  value={cardDetails.expiry}
                  onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                />
                <Input
                  label="CVV"
                  type="password"
                  placeholder="***"
                  value={cardDetails.cvv}
                  onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                />
              </div>
            </div>
          </div>
        )}

        {paymentMethod === "upi" && (
          <div className="space-y-6">
            <h3 className="font-bold text-lg">Pay via UPI</h3>
            <div className="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-xl border border-gray-200 dark:border-gray-700 flex flex-col items-center gap-6">
              <div className="w-48 h-48 bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-center">
                <QrCode size={140} className="text-gray-900" />
              </div>
              <p className="text-sm text-gray-500 text-center">
                Scan the QR code with any UPI app to pay
              </p>
              <div className="w-full h-px bg-gray-200 dark:bg-gray-700"></div>
              <div className="w-full space-y-2">
                <Input
                  label="Or Enter UPI ID"
                  placeholder="username@upi"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                />
              </div>
            </div>
          </div>
        )}

        <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
          <Button
            className="w-full h-14 text-lg"
            onClick={finalizeBooking}
            loading={loading}
          >
            Pay {formatCurrency(total)} & Confirm
          </Button>
          <p className="text-center text-xs text-gray-500 mt-4 flex items-center justify-center gap-1">
            <Lock size={12} /> Secure encrypted payment
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Order Summary */}
      <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="font-bold text-lg mb-4">Order Summary</h3>
        <div className="mb-4 p-3 bg-white dark:bg-gray-800 rounded-lg">
          <p className="font-semibold">
            {currentBooking?.problemTitle || "Custom Service"}
          </p>

          <p className="text-sm text-gray-500">
            {currentBooking?.description}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            {currentBooking?.address?.name}
          </p>

          <p className="text-sm text-gray-500">
            {currentBooking?.address?.phone}
          </p>
        </div>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">
              Service Request
            </span>
            <span className="font-medium">{formatCurrency(serviceCharge)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">
              Platform Fee
            </span>
            <span className="font-medium">{formatCurrency(platformFee)}</span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between text-green-600">
              <span>Item Discount</span>
              <span>-{formatCurrency(discount)}</span>
            </div>
          )}
          <div className="pt-3 mt-3 border-t border-gray-200 dark:border-gray-700 flex justify-between font-bold text-lg">
            <span>Amount to Pay</span>
            <span>{formatCurrency(total)}</span>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div>
        <h3 className="font-bold text-lg mb-4">Select Payment Method</h3>
        <div className="space-y-3">
          <label
            className={`flex items-center p-4 border rounded-xl cursor-pointer transition-colors ${paymentMethod === "upi" ? "border-primary ring-1 ring-primary bg-blue-50 dark:bg-blue-900/20" : "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"}`}
          >
            <input
              type="radio"
              name="payment"
              value="upi"
              checked={paymentMethod === "upi"}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="text-primary focus:ring-primary w-4 h-4 mr-4"
            />
            <Smartphone
              className={
                paymentMethod === "upi" ? "text-primary" : "text-gray-500"
              }
              size={24}
            />
            <span className="font-medium ml-3 flex-1">
              UPI (Google Pay, PhonePe)
            </span>
          </label>

          <label
            className={`flex items-center p-4 border rounded-xl cursor-pointer transition-colors ${paymentMethod === "card" ? "border-primary ring-1 ring-primary bg-blue-50 dark:bg-blue-900/20" : "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"}`}
          >
            <input
              type="radio"
              name="payment"
              value="card"
              checked={paymentMethod === "card"}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="text-primary focus:ring-primary w-4 h-4 mr-4"
            />
            <CreditCard
              className={
                paymentMethod === "card" ? "text-primary" : "text-gray-500"
              }
              size={24}
            />
            <span className="font-medium ml-3 flex-1">Credit / Debit Card</span>
          </label>

          <label
            className={`flex items-center p-4 border rounded-xl cursor-pointer transition-colors ${paymentMethod === "cod" ? "border-primary ring-1 ring-primary bg-blue-50 dark:bg-blue-900/20" : "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"}`}
          >
            <input
              type="radio"
              name="payment"
              value="cod"
              checked={paymentMethod === "cod"}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="text-primary focus:ring-primary w-4 h-4 mr-4"
            />
            <span className="font-bold text-gray-400 font-serif mr-[2px] ml-1">
              ₹
            </span>
            <span className="font-medium ml-4 flex-1">Pay after service</span>
          </label>
        </div>
      </div>

      <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
        <Button
          className="w-full h-14 text-lg"
          onClick={handleConfirm}
          loading={loading}
        >
          {paymentMethod === "cod" ? "Confirm & Proceed" : `Confirm & Pay ${formatCurrency(total)}`}
        </Button>
        <p className="text-center text-xs text-gray-500 mt-4 flex items-center justify-center gap-1">
          <CreditCard size={12} /> Secure encrypted payment
        </p>
      </div>
    </div>
  );
};

export default StepPayment;
