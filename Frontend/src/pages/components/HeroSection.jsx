import React, { useState } from "react";
import { Search, Shield, Zap, ThumbsUp, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/services?q=${encodeURIComponent(search.trim())}`);
    }
  };

  return (
    <section className="relative bg-[#fafafa] dark:bg-gray-950 pt-24 pb-24 overflow-hidden transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-white mb-6 leading-tight">
            Home services, <br />
            <span className="text-primary">on demand.</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-10">
            India's most trusted professionals for all your home needs. Fixed
            transparent pricing. Guaranteed quality.
          </p>

          <form
            onSubmit={handleSearch}
            className="relative max-w-2xl mx-auto mb-16 shadow-[0_8px_30px_rgb(0,0,0,0.08)] rounded-full bg-white dark:bg-gray-800 p-2 flex items-center border border-gray-100 dark:border-gray-700"
          >
            <div className="absolute left-6 text-gray-400">
              <Search size={24} />
            </div>
            <input
              type="text"
              placeholder="What do you need help with?"
              className="w-full pl-14 pr-4 py-4 text-lg bg-transparent text-gray-900 dark:text-white focus:outline-none rounded-full"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              type="submit"
              className="bg-primary hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold transition-colors h-full"
            >
              Search
            </button>
          </form>

          <div className="flex flex-wrap justify-center gap-4 md:gap-6 max-w-4xl mx-auto">
            <div className="flex items-center gap-2 px-5 py-2.5 bg-white/80 backdrop-blur rounded-full shadow-sm border border-gray-100 hover:shadow-md transition-all">
              <Shield className="text-primary" size={20} />
              <span className="font-medium text-gray-700 text-sm">Verified Pros</span>
            </div>
            <div className="flex items-center gap-2 px-5 py-2.5 bg-white/80 backdrop-blur rounded-full shadow-sm border border-gray-100 hover:shadow-md transition-all">
              <Zap className="text-primary" size={20} />
              <span className="font-medium text-gray-700 text-sm">Fixed Pricing</span>
            </div>
            <div className="flex items-center gap-2 px-5 py-2.5 bg-white/80 backdrop-blur rounded-full shadow-sm border border-gray-100 hover:shadow-md transition-all">
              <ThumbsUp className="text-primary" size={20} />
              <span className="font-medium text-gray-700 text-sm">Quality Guarantee</span>
            </div>
            <div className="flex items-center gap-2 px-5 py-2.5 bg-white/80 backdrop-blur rounded-full shadow-sm border border-gray-100 hover:shadow-md transition-all">
              <Clock className="text-primary" size={20} />
              <span className="font-medium text-gray-700 text-sm">On-Demand</span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-blue-400/10 blur-3xl" />
    </section>
  );
};

export default HeroSection;
