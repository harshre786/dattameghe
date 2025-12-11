"use client";

import { useState } from "react";

const NotificationBanner = ({ message }: { message: string }) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div
      className="
      w-full 
      bg-gradient-to-r from-amber-400 to-yellow-500 
      text-black 
      font-medium 
      p-4 
      text-center 
      relative 
      rounded-md 
      shadow-[0_2px_6px_rgba(0,0,0,0.3)]
      border border-amber-300
    "
    >
      <p>{message}</p>

      <button
        onClick={() => setIsVisible(false)}
        className="
          absolute top-2 right-3 
          text-black text-xl font-bold 
          hover:text-gray-700 
          transition
        "
        aria-label="Close notification"
      >
        &times;
      </button>
    </div>
  );
};

export default NotificationBanner;
