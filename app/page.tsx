"use client";
import Bookmark from "./_components/bookmark";
import Calenderpage from "./_components/calender";
import Myname from "./_components/myname";
import Serchgoogle from "./_components/page";
import Selectbgcolor from "./_components/selectbgcolor";
import Todolist from "./_components/Todolist";
import Weather from "./_components/weather";

export default function Home() {
  return (
    <div className="container mx-auto px-4">
      <Myname />
      <div className="grid grid-cols-1 sm:grid-cols-4 md:grid-cols-7 auto-rows-fr gap-2 ">
        <Calenderpage />
        <Serchgoogle />
        <Weather />
        <Bookmark />
        <div className="bg-pink-500 sm:col-span-2 md:col-span-2 flex items-center justify-center p-4">
          5
        </div>
        <Selectbgcolor />
      </div>
      <div className="bg-gray-400/70 mt-4 rounded-lg">
        <Todolist />
      </div>
    </div>
  );
}
