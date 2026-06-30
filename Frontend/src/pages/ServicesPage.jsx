import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, SlidersHorizontal } from "lucide-react";
import PageWrapper from "../components/PageWrapper";
import ProviderCard from "../components/ProviderCard";
import Button from "../components/Button";
import Skeleton from "../components/Skeleton";
import EmptyState from "../components/EmptyState";
import useDebounce from "../hooks/useDebounce";
import { SERVICES } from "../utils/constants";
import providerService from "../api/providerService";

const ServicesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const initialTrade = searchParams.get("trade") || "";

  const [query, setQuery] = useState(initialQuery);
  const debouncedQuery = useDebounce(query, 500);

  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    category: initialTrade,
    minRating: 0,
    availability: "",
  });

  useEffect(() => {
    const q = searchParams.get("q") || "";
    const trade = searchParams.get("trade") || "";

    if (q !== query) {
      setQuery(q);
    }

    if (trade !== filters.category) {
      setFilters((prev) => ({
        ...prev,
        category: trade,
      }));
    }
  }, [searchParams]);

  useEffect(() => {
    const fetchProviders = async () => {
      setLoading(true);

      try {
        const response = await providerService.getAllProviders();

        console.log("API Response:", response);

        const formattedProviders = response.data.providers.map((p) => ({
          ...p,
          id: p._id,
          name: p.user?.name || "Professional",
          isVerified: p.verification?.homefixCertified || false,
          reviews: p.totalReviews || 0,
        }));

setProviders(formattedProviders);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProviders();
  }, []);

  useEffect(() => {
    if (debouncedQuery) {
      setSearchParams({ q: debouncedQuery });
    } else {
      setSearchParams({});
    }
  }, [debouncedQuery, setSearchParams]);

  let filteredProviders = providers;

  if (debouncedQuery) {
    const lowerQ = debouncedQuery.toLowerCase();

    filteredProviders = filteredProviders.filter(
      (p) =>
        p.trade.toLowerCase().includes(lowerQ) ||
        p.name.toLowerCase().includes(lowerQ) ||
        p.city.toLowerCase().includes(lowerQ)
    );
  }

  if (filters.category) {
    filteredProviders = filteredProviders.filter(
      (p) =>
        p.trade.toLowerCase().trim() ===
        filters.category.toLowerCase().trim()
    );
  }

  if (filters.minRating > 0) {
    filteredProviders = filteredProviders.filter(
      (p) => p.rating >= filters.minRating
    );
  }

  return (
    <PageWrapper title="Find Professionals">
      {/* Hero */}
      <div className="bg-primary pb-24 pt-10 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">
            Find Expert Professionals
          </h1>

          <div className="max-w-2xl mx-auto relative mb-6">
            <input
              type="text"
              placeholder="Search by service, professional name, or city..."
              className="w-full pl-12 pr-4 py-4 rounded-xl shadow-lg border-0 bg-white dark:bg-gray-800 text-gray-900 dark:text-white outline-none"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />

            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={24}
            />
          </div>

          <div className="text-center">
            <p className="text-blue-100 font-medium">
              {loading
                ? "Searching..."
                : `${filteredProviders.length} Professionals found`}
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white dark:bg-gray-900 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 -mt-10 relative z-10">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar */}
            <div className="w-full md:w-64 flex-shrink-0">
              <div className="bg-white dark:bg-gray-800 rounded-[24px] shadow-lg border border-gray-100 dark:border-gray-700 p-6 sticky top-24">
                <div className="flex items-center gap-2 mb-6 border-b border-gray-200 dark:border-gray-700 pb-4">
                  <SlidersHorizontal
                    size={20}
                    className="text-gray-500 dark:text-gray-300"
                  />

                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                    Filters
                  </h3>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Category
                    </label>

                    <select
                      className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2"
                      value={filters.category}
                      onChange={(e) =>
                        setFilters({
                          ...filters,
                          category: e.target.value,
                        })
                      }
                    >
                      <option value="">All Categories</option>

                      {Array.from(
                        new Set(SERVICES.map((s) => s.name))
                      ).map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Minimum Rating
                    </label>

                    <div className="space-y-2">
                      {[4.5, 4.0, 3.5].map((rating) => (
                        <label key={rating} className="flex items-center">
                          <input
                            type="radio"
                            name="rating"
                            checked={filters.minRating === rating}
                            onChange={() =>
                              setFilters({
                                ...filters,
                                minRating: rating,
                              })
                            }
                          />

                          <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">
                            {rating}+ Stars
                          </span>
                        </label>
                      ))}

                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="rating"
                          checked={filters.minRating === 0}
                          onChange={() =>
                            setFilters({
                              ...filters,
                              minRating: 0,
                            })
                          }
                        />

                        <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">
                          Any Rating
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Providers */}
            <div className="flex-1">
              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <Skeleton
                      key={i}
                      className="h-64"
                      variant="card"
                    />
                  ))}
                </div>
              ) : filteredProviders.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProviders.map((provider) => (
                    <ProviderCard
                      key={provider.id}
                      provider={provider}
                    />
                  ))}
                </div>
              ) : (
                <EmptyState
                  icon={Search}
                  title="No professionals found"
                  description="Try adjusting your search criteria or filters."
                  action={
                    <Button
                      variant="outline"
                      onClick={() => {
                        setQuery("");
                        setFilters({
                          category: "",
                          minRating: 0,
                          availability: "",
                        });
                      }}
                    >
                      Clear Filters
                    </Button>
                  }
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default ServicesPage;