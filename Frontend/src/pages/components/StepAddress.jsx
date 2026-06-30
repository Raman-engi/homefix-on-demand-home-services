import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { MapPin, Plus } from "lucide-react";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { addressSchema } from "../../utils/validators";
import { setBooking } from "../../store/slice/bookingSlice";
import { setLocal as setSession } from "../../utils/storage";

const StepAddress = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Mock saved addresses (in real app, from user profile)
  const savedAddresses = [
    {
      id: "a1",
      label: "Home",
      flat: "101, Elite Apartment",
      area: "Koramangala 4th Block",
      city: "Gorakhpur",
      pincode: "560034",
    },
    {
      id: "a2",
      label: "Office",
      flat: "WebDev Tower",
      area: "HSR Layout",
      city: "Gorakhpur",
      pincode: "560102",
    },
  ];

  const currentBooking =
    useSelector((state) => state.booking.currentBooking) || {};
  const [selectedAddrId, setSelectedAddrId] = useState(
    currentBooking.address?.id || savedAddresses[0].id,
  );
  const [showNewForm, setShowNewForm] = useState(false);

  const formik = useFormik({
    initialValues: {
      flat: "",
      area: "",
      landmark: "",
      city: "Gorakhpur",
      state: "Karnataka",
      pincode: "",
      addressType: "home",
    },
    validationSchema: addressSchema,
    onSubmit: (values) => {
      const label =
        values.addressType.charAt(0).toUpperCase() +
        values.addressType.slice(1);
      const newAddr = { id: `a_${Date.now()}`, label, ...values };
      proceedToPayment(newAddr);
    },
  });

  const proceedToPayment = (addressObj) => {
    const bookingData = { ...currentBooking, address: addressObj };
    dispatch(setBooking(bookingData));
    setSession("homefix_booking_progress", {
      currentBooking: bookingData,
      step: 3,
    });
    navigate(`../payment`);
  };

  const handleNext = () => {
    if (showNewForm) {
      formik.handleSubmit();
    } else {
      const addr = savedAddresses.find((a) => a.id === selectedAddrId);
      if (addr) proceedToPayment(addr);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <h3 className="text-xl font-bold flex items-center gap-2">
        <MapPin className="text-primary" /> Service Location
      </h3>

      {!showNewForm ? (
        <div className="space-y-4">
          {savedAddresses.map((addr) => (
            <div
              key={addr.id}
              onClick={() => setSelectedAddrId(addr.id)}
              className={`p-4 rounded-xl border-2 cursor-pointer transition-colors ${
                selectedAddrId === addr.id
                  ? "border-primary bg-blue-50 dark:bg-blue-900/20"
                  : "border-gray-200 dark:border-gray-700 hover:border-blue-300"
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${selectedAddrId === addr.id ? "border-primary" : "border-gray-300"}`}
                  >
                    {selectedAddrId === addr.id && (
                      <span className="w-2 h-2 rounded-full bg-primary block"></span>
                    )}
                  </span>
                  <span className="font-bold">{addr.label}</span>
                </div>
              </div>
              <p className="text-sm pl-6 text-gray-700 dark:text-gray-300">
                {addr.flat}, {addr.area}, {addr.city} - {addr.pincode}
              </p>
            </div>
          ))}

          <button
            onClick={() => setShowNewForm(true)}
            className="w-full p-4 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center gap-2 text-primary hover:bg-blue-50 dark:hover:bg-gray-800 transition-colors font-medium"
          >
            <Plus size={20} /> Add New Address
          </button>
        </div>
      ) : (
        <div className="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-3 gap-3 mb-4">
              {["home", "office", "other"].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => formik.setFieldValue("addressType", type)}
                  className={`py-2 px-3 rounded-lg text-sm font-medium border-2 transition-all capitalize ${
                    formik.values.addressType === type
                      ? "border-primary bg-primary text-white"
                      : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            <Input
              id="flat"
              name="flat"
              label="Flat/House No. & Building"
              placeholder="e.g. 101, A Block"
              value={formik.values.flat}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.flat && formik.errors.flat}
            />
            <Input
              id="area"
              name="area"
              label="Area/Street"
              placeholder="e.g. MG Road"
              value={formik.values.area}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.area && formik.errors.area}
            />
            <Input
              id="landmark"
              name="landmark"
              label="Landmark (Optional)"
              placeholder="e.g. Near City Mall"
              value={formik.values.landmark}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.landmark && formik.errors.landmark}
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                id="city"
                name="city"
                label="City"
                placeholder="e.g. Gorakhpur"
                value={formik.values.city}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.city && formik.errors.city}
              />
              <Input
                id="pincode"
                name="pincode"
                label="Pincode"
                placeholder="e.g. 273001"
                value={formik.values.pincode}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.pincode && formik.errors.pincode}
              />
            </div>
            <Input
              id="state"
              name="state"
              label="State"
              placeholder="e.g. Uttar Pradesh"
              value={formik.values.state}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.state && formik.errors.state}
            />

            <div className="flex justify-end mt-4">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setShowNewForm(false)}
                className="mr-2"
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}

      <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
        <Button className="w-full" size="lg" onClick={handleNext}>
          Proceed to Payment
        </Button>
      </div>
    </div>
  );
};

export default StepAddress;
