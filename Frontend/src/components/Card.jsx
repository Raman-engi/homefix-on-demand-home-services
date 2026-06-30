import React from "react";

const Card = ({
  children,
  className = "",
  padding = "p-4",
  hover = false,
  onClick,
}) => {
  const baseClasses =
    "bg-white rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 overflow-hidden text-gray-900 transition-all duration-200";
  const hoverClasses = hover
    ? "hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] hover:-translate-y-1 cursor-pointer"
    : "";

  return (
    <div
      className={`${baseClasses} ${padding} ${hoverClasses} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card;
