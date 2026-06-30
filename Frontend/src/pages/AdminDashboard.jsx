import React, { useState } from "react";
import { Users, Briefcase, IndianRupee, Activity } from "lucide-react";
import PageWrapper from "../components/PageWrapper";
import Card from "../components/Card";
import Table from "../components/Table";
import Badge from "../components/Badge";

const AdminDashboard = () => {
  const recentBookings = [
    {
      id: "#1029",
      user: "Amit Patel",
      service: "AC Repair",
      amount: 499,
      status: "Confirmed",
    },
    {
      id: "#1028",
      user: "Sneha Rao",
      service: "Plumbing",
      amount: 249,
      status: "Completed",
    },
    {
      id: "#1027",
      user: "Rahul Sharma",
      service: "Electrician",
      amount: 899,
      status: "Completed",
    },
    {
      id: "#1026",
      user: "Priya Singh",
      service: "Deep Clean",
      amount: 999,
      status: "Cancelled",
    },
  ];

  const columns = [
    {
      header: "Order ID",
      accessor: "id",
      className: "font-mono text-gray-500",
    },
    { header: "User", accessor: "user" },
    { header: "Service", accessor: "service" },
    { header: "Amount", accessor: "amount", render: (val) => `₹${val}` },
    {
      header: "Status",
      accessor: "status",
      render: (val) => (
        <Badge
          variant={
            val === "Confirmed"
              ? "info"
              : val === "Completed"
                ? "success"
                : "danger"
          }
        >
          {val}
        </Badge>
      ),
    },
  ];

  const [pendingProfessionals, setPendingProfessionals] = useState(
  JSON.parse(localStorage.getItem("pending_professionals")) || []
);

const approveProfessional = (index) => {
  const approved =
    JSON.parse(localStorage.getItem("approved_professionals")) || [];

  approved.push(pendingProfessionals[index]);

  localStorage.setItem(
    "approved_professionals",
    JSON.stringify(approved)
  );

  const updatedPending = pendingProfessionals.filter(
    (_, i) => i !== index
  );

  localStorage.setItem(
    "pending_professionals",
    JSON.stringify(updatedPending)
  );

  setPendingProfessionals(updatedPending);

  alert("Professional Approved Successfully");
};

const rejectProfessional = (index) => {
  const updatedPending = pendingProfessionals.filter(
    (_, i) => i !== index
  );

  localStorage.setItem(
    "pending_professionals",
    JSON.stringify(updatedPending)
  );

  setPendingProfessionals(updatedPending);

  alert("Professional Rejected");
};

  return (
    <PageWrapper title="Admin Dashboard">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        </div>

        {/* Platform Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          <Card className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
              <Activity size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">
                Total Bookings
              </p>
              <p className="text-2xl font-bold">1,248</p>
            </div>
          </Card>
          <Card className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center">
              <Briefcase size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">
                Active Providers
              </p>
              <p className="text-2xl font-bold">86</p>
            </div>
          </Card>
          <Card className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-green-100 text-green-600 flex items-center justify-center">
              <IndianRupee size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">
                Monthly Revenue
              </p>
              <p className="text-2xl font-bold">₹1.2M</p>
            </div>
          </Card>
          <Card className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center">
              <Users size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">New Users</p>
              <p className="text-2xl font-bold">342</p>
            </div>
          </Card>
          <Card className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center">
              <IndianRupee size={24} />
            </div>

            <div>
              <p className="text-sm text-gray-500 font-medium">
                Platform Fee Earned
              </p>

              <p className="text-2xl font-bold">
                ₹24,500
              </p>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold mb-4">Recent Bookings</h2>
            <Table columns={columns} data={recentBookings} />
            <Card className="mt-6">
              <h2 className="text-xl font-bold mb-4">
                Popular Services
              </h2>

              <div className="space-y-3">

                <div className="flex justify-between">
                  <span>Electrician</span>
                  <span>320 Orders</span>
                </div>

                <div className="flex justify-between">
                  <span>Plumber</span>
                  <span>280 Orders</span>
                </div>

                <div className="flex justify-between">
                  <span>AC Service</span>
                  <span>215 Orders</span>
                </div>

                <div className="flex justify-between">
                  <span>Deep Cleaning</span>
                  <span>190 Orders</span>
                </div>

              </div>
            </Card>
          </div>
          <div className="lg:col-span-1">

            <h2 className="text-xl font-bold mb-4">
              Quick Actions
            </h2>

            <Card padding="p-0">
              <div className="divide-y">

                <button className="w-full flex justify-between p-4 hover:bg-gray-50">
                  <span className="font-medium text-gray-700">
                    Manage Providers
                  </span>

                  <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">
                    3 Pending
                  </span>
                </button>

                <button className="w-full flex justify-between p-4 hover:bg-gray-50">
                  <span className="font-medium text-gray-700">
                    Manage Bookings
                  </span>
                </button>

                <button className="w-full flex justify-between p-4 hover:bg-gray-50">
                  <span className="font-medium text-gray-700">
                    Platform Settings
                  </span>
                </button>

              </div>
            </Card>

            <Card className="mt-6">
              <h3 className="text-lg font-bold mb-4">
                Pending Professionals
              </h3>

              <div className="space-y-4">

                {pendingProfessionals.length === 0 ? (
                  <p className="text-gray-500">
                    No Pending Professionals
                  </p>
                ) : (
                  pendingProfessionals.map((worker, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center"
                    >
                      <div>
                        <p className="font-medium">
                          {worker.name}
                        </p>

                        <p className="text-sm text-gray-500">
                          {worker.service} • {worker.city}
                        </p>
                      </div>

                      <div className="flex gap-2">

                        <button
                          onClick={() => approveProfessional(index)}
                          className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                        >
                          Approve
                        </button>

                        <button
                          onClick={() => rejectProfessional(index)}
                          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                        >
                          Reject
                        </button>

                      </div>
                    </div>
                  ))
                )}

              </div>
            </Card>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default AdminDashboard;