"use client";
import { useEffect, useState } from "react";

const Myname = () => {
  const [greeting, setGreeting] = useState<string>("");
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();

      // تنظیم پیام تبریک
      let greet = "";
      if (hours >= 5 && hours < 12) {
        greet = "GM ☀️ 🌞"; // Good Morning
      } else if (hours >= 12 && hours < 18) {
        greet = "GA 🌆☕️"; // Good Afternoon
      } else if (hours >= 18 && hours < 22) {
        greet = "GE ✨🌙"; // Good Evening
      } else {
        greet = "GN 🌒⭐"; // Good Night
      }
      setGreeting(greet);

      // تنظیم ساعت دیجیتال با فرمت HH:MM:SS
      const formatNumber = (num: number) => num.toString().padStart(2, "0");
      setTime(
        `${formatNumber(hours)}:${formatNumber(minutes)}:${formatNumber(seconds)}`,
      );
    };

    updateTime(); // بلافاصله اجرا
    const interval = setInterval(updateTime, 1000); // آپدیت هر ثانیه

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-20 mb-5 flex items-center justify-between">
      {/* user */}
      <div>
        <h1 className="text-4xl font-bold font-roboto">Erfan Kashef</h1>
        <p className="font-roboto">Developer</p>
      </div>

      {/* time & greeting */}
      <div className="flex flex-col items-end text-right">
        <p className="text-2xl font-mono">{time}</p>
        <p className="text-2xl font-semibold">{greeting}</p>
      </div>
    </div>
  );
};

export default Myname;
