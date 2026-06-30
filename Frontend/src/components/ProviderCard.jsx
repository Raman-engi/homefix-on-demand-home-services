import React from "react";
import { ShieldCheck, MapPin, Briefcase } from "lucide-react";
import Card from "./Card";
import StarRating from "./StarRating";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

const ProviderCard = ({ provider }) => {
  const navigate = useNavigate();

  return (
    <Card
      hover
      className="flex flex-col h-full p-5 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 transition-all"
    >
      <div className="flex items-start gap-4 mb-5">
        <div className="w-[52px] h-[52px] rounded-full bg-blue-100 dark:bg-blue-900/30 overflow-hidden flex items-center justify-center text-xl font-bold text-blue-600 flex-shrink-0">
          {provider.name.charAt(0)}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-1">
            <h3 className="font-semibold text-gray-900 dark:text-white truncate">
              {provider.name}
            </h3>

            {provider.isVerified && (
              <ShieldCheck className="text-green-500 w-[18px] h-[18px] flex-shrink-0" />
            )}
          </div>

          <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-300 mb-1">
            <Briefcase size={14} className="text-gray-400" />
            <span className="truncate">{provider.trade}</span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-300">
            <MapPin size={14} className="text-gray-400" />
            <span className="truncate">{provider.city}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mb-5 mt-auto">
        <div className="flex items-center gap-1.5">
          <span className="font-bold text-[15px] text-gray-900 dark:text-white">
            {provider.rating}
          </span>

          <StarRating rating={provider.rating} size={14} />

          <span className="text-xs text-gray-400">
            ({provider.reviews})
          </span>
        </div>

        <div className="text-[11px] font-medium text-gray-500 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 px-2.5 py-1 rounded-md border border-gray-100 dark:border-gray-600">
          {provider.experience}y exp
        </div>
      </div>

      <Button
        variant="outline"
        className="w-full rounded-xl py-2.5 text-[13px] font-medium border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-gray-700"
        onClick={() => {
          console.log("Provider =", provider);
          console.log("Provider ID =", provider.id);
          navigate(`/provider/${provider.id}`);
        }}
      >
        View Profile & Book
      </Button>
    </Card>
  );
};

export default ProviderCard;