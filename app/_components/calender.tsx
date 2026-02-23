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
    <div className="bg-gray-700/80 shadow-2xl rounded-lg  flex flex-col items-center justify-center p-4 text-center text-white ">
      <div className="font-vazirmatn">📅 شمسی: {shamsiDate}</div>
      <div className="font-vazirmatn">📆 میلادی: {miladiDate}</div>
    </div>
  );
};

export default Calenderpage;
