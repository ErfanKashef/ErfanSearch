"use client";
import { useState, useEffect } from "react";
import moment from "moment-jalaali";

moment.loadPersian({ dialect: "persian-modern" });

const Calenderpage = () => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const shamsiDate = moment(now).format("dddd jD jMMMM");
  const miladiDate = moment(now).format("dddd, DD MMMM YYYY");

  return (
    <div className="bg-white/10 shadow-2xl rounded-lg sm:col-span-2 md:col-span-2 md:row-span-2 flex flex-col items-center justify-center p-4 text-center">
      <div className="font-vazirmatn">📅 شمسی: {shamsiDate}</div>
      <div className="font-vazirmatn">📆 میلادی: {miladiDate}</div>
    </div>
  );
};

export default Calenderpage;
