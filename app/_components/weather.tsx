"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const API_KEY = "e4394a89406e028fd3e2e7ed5fe6102e";

const Weather = () => {
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation پشتیبانی نمی‌شود");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric&lang=fa`,
          );
          if (!res.ok) throw new Error("خطا در دریافت اطلاعات هوا");
          const data = await res.json();
          setWeather(data);
        } catch {
          setError("دریافت اطلاعات هوا ناموفق بود");
        } finally {
          setLoading(false);
        }
      },
      () => {
        setError("دسترسی به موقعیت کاربر رد شد");
        setLoading(false);
      },
    );
  }, []);

  if (loading)
    return (
      <div className="bg-white/10 shadow-2xl rounded-lg sm:col-span-2 md:col-span-2 md:col-start-6 md:row-span-2 flex items-center justify-center p-4 text-center animate-pulse font-roboto">
        Loading...
      </div>
    );

  if (error)
    return (
      <div className="bg-white/10 w-64shadow-2xl rounded-lg sm:col-span-2 md:col-span-2 md:col-start-6 md:row-span-2 flex items-center justify-center p-4 text-center text-red-500 animate-pulse font-roboto">
        {error}
      </div>
    );

  const weatherMain = weather?.weather?.[0]?.main.toLowerCase() || "";

  return (
    <div className="bg-white/10 shadow-2xl rounded-lg sm:col-span-2 md:col-span-2 md:col-start-6 md:row-span-2 flex gap-4 items-center justify-center p-4 text-center relative overflow-hidden">
      <h2 className="text-xl font-bold font-vazirmatn">
        {weather?.name || "نام نامعلوم"}
      </h2>
      <p className="text-4xl font-bold font-vazirmatn">
        {weather?.main?.temp ? Math.round(weather.main.temp) + "°C" : "--"}
      </p>
      <p className="capitalize font-vazirmatn">
        {weather?.weather?.[0]?.description || "اطلاعات موجود نیست"}
      </p>

      {/* آیکون اصلی */}
      {weather?.weather?.[0]?.icon && (
        <motion.img
          src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt={weather.weather[0].description || ""}
          className="w-20 h-20 z-10"
          animate={
            weatherMain.includes("rain")
              ? { y: [0, 10, 0] }
              : weatherMain.includes("clear")
                ? { rotate: [0, 360] }
                : {}
          }
          transition={{
            y: { repeat: Infinity, duration: 0.6 },
            rotate: { repeat: Infinity, duration: 3, ease: "linear" },
          }}
        />
      )}

      {/* باران */}
      {weatherMain.includes("rain") && (
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-blue-800 w-1 h-4 rounded"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * -20}%`,
                opacity: 0.6 + Math.random() * 0.4,
              }}
              animate={{ y: ["-20%", "120%"] }}
              transition={{
                repeat: Infinity,
                duration: 1 + Math.random() * 1.5,
                delay: Math.random(),
              }}
            />
          ))}
        </div>
      )}

      {/* ابر */}
      {weatherMain.includes("cloud") && (
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-gray-300 w-21 h-9 rounded-full opacity-60"
              style={{ top: `${i * 10 + 5}%`, left: `${Math.random() * 100}%` }}
              animate={{ x: ["-10%", "110%"] }}
              transition={{
                repeat: Infinity,
                duration: 20 + i * 2,
                ease: "linear",
              }}
            />
          ))}
        </div>
      )}

      {/* برف */}
      {weatherMain.includes("snow") && (
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-white w-2 h-2 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 20}%`,
                opacity: 0.7 + Math.random() * 0.3,
              }}
              animate={{ y: ["-10%", "120%"] }}
              transition={{
                repeat: Infinity,
                duration: 2 + Math.random() * 2,
                delay: Math.random(),
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Weather;
