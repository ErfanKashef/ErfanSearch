"use client";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { IconPlus, IconX } from "@tabler/icons-react";
import { Reorder } from "framer-motion";
import { useEffect, useState } from "react";

type BookmarkItem = {
  id: string;
  url: string;
};

const Bookmark = () => {
  const [url, setUrl] = useState("");
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>([]);

  // load
  useEffect(() => {
    const saved = localStorage.getItem("bookmarks");
    if (saved) setBookmarks(JSON.parse(saved));
  }, []);

  // save
  useEffect(() => {
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  const addBookmark = () => {
    if (!url.trim()) return;

    let parsed: URL;
    try {
      parsed = new URL(url.startsWith("http") ? url : `https://${url}`);
    } catch {
      return;
    }

    setBookmarks((prev) => [
      ...prev,
      { id: crypto.randomUUID(), url: parsed.href },
    ]);

    setUrl("");
  };

  const removeBookmark = (id: string) => {
    setBookmarks((prev) => prev.filter((b) => b.id !== id));
  };

  const favicon = (siteUrl: string) => {
    const host = new URL(siteUrl).hostname;
    return `https://www.google.com/s2/favicons?sz=64&domain=${host}`;
  };

  const siteName = (siteUrl: string) => {
    const host = new URL(siteUrl).hostname.replace("www.", "");
    const name = host.split(".")[0];
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  return (
    <div className="bg-gray-700/80 shadow-2xl rounded-lg   p-4 flex flex-col gap-4 font-roboto">
      {/* Input Group */}
      <InputGroup>
        <InputGroupInput
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="example.com"
          onKeyDown={(e) => e.key === "Enter" && addBookmark()}
        />
        <InputGroupAddon>
          <IconPlus
            onClick={addBookmark}
            className="text-white cursor-pointer"
          />
        </InputGroupAddon>
      </InputGroup>

      {/* Drag & Drop */}
      <Reorder.Group
        axis="x"
        values={bookmarks}
        onReorder={setBookmarks}
        className="flex flex-wrap gap-2"
      >
        {bookmarks.map((item) => (
          <Reorder.Item
            key={item.id}
            value={item}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="relative group"
          >
            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  href={item.url}
                  target="_blank"
                  className="flex items-center justify-center w-14 h-14 rounded-xl bg-white/20 hover:bg-white/30 transition"
                >
                  <img src={favicon(item.url)} alt="" className="w-7 h-7" />
                </a>
              </TooltipTrigger>
              <TooltipContent>{siteName(item.url)}</TooltipContent>
            </Tooltip>

            <button
              onClick={() => removeBookmark(item.id)}
              className="absolute -top-2 -right-2 hidden group-hover:flex w-5 h-5 rounded-full bg-black text-white items-center justify-center"
            >
              <IconX size={12} />
            </button>
          </Reorder.Item>
        ))}
      </Reorder.Group>
    </div>
  );
};

export default Bookmark;
