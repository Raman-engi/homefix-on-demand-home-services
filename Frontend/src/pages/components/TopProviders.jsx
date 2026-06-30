import React, { useEffect, useState } from "react";
import ProviderCard from "../../components/ProviderCard";
import providerService from "../../api/providerService";

const TopProviders = () => {
  const [providers, setProviders] = useState([]);

  useEffect(() => {
    const loadProviders = async () => {
      try {
        const res = await providerService.getAllProviders();

        const data = res.data.providers.map((p) => ({
          ...p,
          id: p._id,
          name: p.user?.name || "Professional",
          reviews: p.totalReviews,
          isVerified:
            p.verification?.homefixCertified || false,
        }));

        const topProviders = data
          .sort((a, b) => b.rating - a.rating)
          .slice(0, 4);

        setProviders(topProviders);
      } catch (err) {
        console.log(err);
      }
    };

    loadProviders();
  }, []);

  return (
    <section className="py-20 bg-white dark:bg-gray-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Top Rated Professionals
          </h2>

          <p className="text-gray-500 dark:text-gray-300 max-w-2xl mx-auto">
            Meet our most trusted and highly-rated service experts ready to help you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          {providers.map((provider) => (
            <ProviderCard
              key={provider.id}
              provider={provider}
            />
          ))}

        </div>

      </div>
    </section>
  );
};

export default TopProviders;