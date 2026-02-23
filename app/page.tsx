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
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex flex-col w-full md:w-1/4 gap-4">
          <Calenderpage />
          <Selectbgcolor />
          <Weather />
        </div>
        <div className="flex gap-4 w-full md:w-1/2">
          <div className="flex flex-col gap-4 w-full">
            <Serchgoogle />
            <Bookmark />
          </div>
        </div>
        <div className="bg-gray-700/80 rounded-lg w-full md:w-1/4">
          <Todolist />
        </div>
      </div>
    </div>
  );
}
