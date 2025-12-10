"use client";

import { useState } from 'react';

const NotificationBanner = ({ message }: { message: string }) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="bg-yellow-500 text-black p-4 text-center relative">
      <p>{message}</p>
      <button onClick={() => setIsVisible(false)} className="absolute top-2 right-2 text-black">
        &times;
      </button>
    </div>
  );
};

export default NotificationBanner;
