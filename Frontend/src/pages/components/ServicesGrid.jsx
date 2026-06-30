import React from "react";
import { useNavigate } from "react-router-dom";
import ServiceCard from "../../components/ServiceCard";
import { SERVICES } from "../../utils/constants";

const ServicesGrid = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-background dark:bg-gray-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Our Services
          </h2>
          <p className="text-gray-500 dark:text-gray-300 max-w-2xl mx-auto">
            From quick repairs to complete renovations, our professionals are
            equipped to handle any job.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {SERVICES.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onClick={() =>
                navigate(`/services?trade=${encodeURIComponent(service.name)}`)
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
