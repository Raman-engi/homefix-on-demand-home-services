import React from "react";
import { useNavigate } from "react-router-dom";

const ProfessionalDashboard = () => {
  const navigate = useNavigate();

  const professional = JSON.parse(
    localStorage.getItem("professional_data")
  );

  const bookings =
    JSON.parse(localStorage.getItem("homefix_bookings")) || [];

  const totalJobs = bookings.length;

  const pendingJobs = bookings.filter(
    (job) =>
      job.status === "Pending" ||
      job.status === "Confirmed"
  ).length;

  const completedJobs = bookings.filter(
    (job) => job.status === "Completed"
  ).length;

  const totalEarnings = bookings
    .filter((job) => job.status === "Completed")
    .reduce(
      (sum, job) => sum + (job.totalAmount || 0),
      0
    );

  const handleLogout = () => {
    localStorage.removeItem("professional_logged_in");
    localStorage.removeItem("professional_data");

    navigate("/professional-login");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="flex justify-between items-center mb-8">

        <div>
          <h1 className="text-3xl font-bold">
            Welcome {professional?.name}
          </h1>

          <p className="text-gray-500 mt-1">
            {professional?.service} • {professional?.city}
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg"
        >
          Logout
        </button>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-10">

        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="text-gray-500">
            Total Jobs
          </h2>

          <p className="text-3xl font-bold">
            {totalJobs}
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="text-gray-500">
            Pending Jobs
          </h2>

          <p className="text-3xl font-bold text-orange-500">
            {pendingJobs}
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="text-gray-500">
            Completed Jobs
          </h2>

          <p className="text-3xl font-bold text-green-600">
            {completedJobs}
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="text-gray-500">
            Earnings
          </h2>

          <p className="text-3xl font-bold text-blue-600">
            ₹{totalEarnings}
          </p>
        </div>

      </div>

      <div className="bg-white rounded-xl shadow p-6">

        <h2 className="text-2xl font-bold mb-5">
          Booking Table
        </h2>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>
              <tr className="border-b bg-gray-50">
                <th className="text-left p-3">Customer</th>
                <th className="text-left p-3">Service</th>
                <th className="text-left p-3">Date</th>
                <th className="text-left p-3">Amount</th>
                <th className="text-left p-3">Status</th>
              </tr>
            </thead>

            <tbody>

              {bookings.map((job) => (
                <tr
                  key={job.id}
                  className="border-b"
                >
                  <td className="p-3">
                    {job.address?.name || "Customer"}
                  </td>

                  <td className="p-3">
                    {job.service}
                  </td>

                  <td className="p-3">
                    {job.date || "-"}
                  </td>

                  <td className="p-3">
                    ₹{job.totalAmount}
                  </td>

                  <td className="p-3">
                    {job.status}
                  </td>
                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default ProfessionalDashboard;