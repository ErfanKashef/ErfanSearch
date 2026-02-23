"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import clsx from "clsx";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button"; // ⭐ اضافه شد
import { Check } from "lucide-react";

const SelectBgImage = () => {
  const [bgImage, setBgImage] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const images = [
    {
      name: "mountain",
      value: "/bg/shahab-zolfaghari-T7N5U9kpNIk-unsplash.jpg",
    },
    {
      name: "sea",
      value: "/bg/seyed-amir-mohammad-tabatabaee-_-Ox5fpCZlE-unsplash.jpg",
    },
    {
      name: "city",
      value: "/bg/iman-soleimani-zadeh-TxBeyjstOSg-unsplash.jpg",
    },
  ];

  // ⭐ اعمال والپیپر
  const applyWallpaper = (img: string) => {
    document.body.style.backgroundImage = `url(${img})`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundAttachment = "fixed";
  };

  // ⭐ restore بعد از refresh
  useEffect(() => {
    const saved = localStorage.getItem("wallpaper");

    if (saved) {
      setBgImage(saved);
      applyWallpaper(saved);
    }
  }, []);

  const handleSelect = (img: string) => {
    setBgImage(img);

    applyWallpaper(img);

    localStorage.setItem("wallpaper", img);

    setOpen(false);
  };

  return (
    <div className="bg-gray-700/80 shadow-2xl rounded-lg  p-2 flex items-center justify-between gap-3 font-roboto">
      <p className="text-base font-light text-white">Wallpaper 🖼️</p>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          {/* ⭐ Button shadcn */}
          <Button variant="secondary" className="font-semibold">
            Select
          </Button>
        </DialogTrigger>

        <DialogContent className="max-w-2xl backdrop-blur-xl bg-white/80">
          <DialogHeader>
            <DialogTitle>Select Wallpaper</DialogTitle>
          </DialogHeader>

          {/* grid thumbnails */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
            {images.map((img) => {
              const selected = bgImage === img.value;

              return (
                <button
                  key={img.name}
                  onClick={() => handleSelect(img.value)}
                  className={clsx(
                    "relative group rounded-xl overflow-hidden transition-all",
                    "hover:scale-105 active:scale-95",
                    selected && "ring-4 ring-blue-500",
                  )}
                >
                  {/* ⭐ container با نسبت تصویر */}
                  <div className="relative w-full aspect-[16/10]">
                    <Image
                      src={img.value}
                      alt={img.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition" />

                  {/* check mark */}
                  {selected && (
                    <div className="absolute top-2 right-2 bg-blue-500 text-white rounded-full p-1 shadow-lg">
                      <Check size={16} />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SelectBgImage;
