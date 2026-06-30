import React from "react";
import PageWrapper from "../components/PageWrapper";
import MetricCards from "./components/MetricCards";
import BookingsList from "./components/BookingList";
import QuickBook from "./components/QuickBooks";
import useAuth from "../hooks/useAuth";

const DashboardPage = () => {
  const { user, role } = useAuth();

  // PROFESSIONAL DASHBOARD
  if (role === "professional") {
    return (
      <PageWrapper title="Professional Dashboard" className="bg-[#fafafa]">
        <div className="bg-orange-500 pt-10 pb-20 px-4">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-white">
              Welcome, {user?.name?.split(" ")[0] || "Professional"} 👨‍🔧
            </h1>

            <p className="text-orange-100 mt-2">
              Manage your service requests and earnings.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10 pb-12">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <div className="bg-white rounded-2xl shadow p-6">
              <h3 className="text-gray-500 text-sm">
                Total Jobs
              </h3>

              <p className="text-3xl font-bold mt-2">
                24
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow p-6">
              <h3 className="text-gray-500 text-sm">
                Completed Jobs
              </h3>

              <p className="text-3xl font-bold mt-2 text-green-600">
                18
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow p-6">
              <h3 className="text-gray-500 text-sm">
                Earnings
              </h3>

              <p className="text-3xl font-bold mt-2 text-orange-600">
                ₹12,500
              </p>
            </div>

          </div>

          <div className="mt-8 bg-white rounded-2xl shadow p-6">
            <h2 className="text-xl font-bold mb-4">
              Recent Service Requests
            </h2>

            <div className="space-y-4">

              <div className="border rounded-xl p-4">
                <p className="font-semibold">
                  Fan Repair
                </p>

                <p className="text-sm text-gray-500">
                  Gorakhpur • Today • ₹299
                </p>
              </div>

              <div className="border rounded-xl p-4">
                <p className="font-semibold">
                  Pipe Leakage
                </p>

                <p className="text-sm text-gray-500">
                  Gorakhpur • Tomorrow • ₹399
                </p>
              </div>

            </div>
          </div>

        </div>
      </PageWrapper>
    );
  }

  // USER DASHBOARD
  return (
    <PageWrapper title="Dashboard" className="bg-[#fafafa]">
      <div className="bg-primary pt-10 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-white">
            Hello, {user?.name?.split(" ")[0] || "User"}! 👋
          </h1>

          <p className="text-blue-100 mt-2">
            Welcome to your HomeFix dashboard.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10 space-y-8 pb-12">
        <MetricCards />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <BookingsList />
          </div>

          <div className="lg:col-span-1">
            <QuickBook />
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default DashboardPage;