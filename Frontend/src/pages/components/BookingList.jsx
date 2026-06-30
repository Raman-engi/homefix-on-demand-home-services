import React, { useEffect, useState } from "react";
import BookingCard from "../../components/BookingCard.jsx";
import Skeleton from "../../components/Skeleton";
import EmptyState from "../../components/EmptyState";
import { Calendar } from "lucide-react";
// import { bookingService } from "../../../api/bookingService";
import { useDispatch } from "react-redux";
import { showToast } from "../../store/slice/uiSlice";
import { getLocal } from "../../utils/storage";
import { BOOKINGS } from "../../utils/constants";

const BookingsList = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      try {
        // Mocking bookings fetch since bookingService is missing
        await new Promise(resolve => setTimeout(resolve, 800));
        
        let data = getLocal("homefix_bookings");
        if (!data || data.length === 0) {
           data = BOOKINGS; // Fallback to mock data from constants
        }
        
        setBookings(data.sort((a, b) => new Date(b.date) - new Date(a.date)));
      } catch (err) {
        console.error(err);
        dispatch(
          showToast({
            type: "error",
            message: "Failed to load bookings. Please refresh.",
          }),
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [dispatch]);

  const upcoming = bookings.filter(
    (b) => b.status === "Upcoming" || b.status === "Confirmed",
  );
  const past = bookings.filter(
    (b) => b.status !== "Upcoming" && b.status !== "Confirmed",
  );

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold mb-4">Upcoming Bookings</h2>
          <Skeleton className="h-32 mb-4" variant="card" />
        </div>
        <div>
          <h2 className="text-xl font-bold mb-4">Past Bookings</h2>
          <Skeleton className="h-32" variant="card" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold mb-4">Upcoming Bookings</h2>
        {upcoming.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {upcoming.map((booking) => (
              <BookingCard key={booking.id} booking={booking} />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={Calendar}
            title="No upcoming bookings"
            description="You don't have any services scheduled right now."
          />
        )}
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">Past Bookings</h2>
        {past.length > 0 ? (
          <div className="flex flex-col gap-4">
            {past.slice(0, 3).map((booking) => (
              <BookingCard key={booking.id} booking={booking} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No history"
            description="Your past completed services will appear here."
          />
        )}
      </div>
    </div>
  );
};

export default BookingsList;
