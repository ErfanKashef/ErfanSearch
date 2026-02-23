"use client";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { IconBrandGoogleFilled, IconSearch } from "@tabler/icons-react";

const SearchGoogle = () => {
  const onSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const query = (form.elements.namedItem("q") as HTMLInputElement).value;

    if (!query.trim()) return;

    window.location.href = `https://www.google.com/search?q=${encodeURIComponent(
      query,
    )}`;
  };

  return (
    <div className="bg-gray-700/80 shadow-2xl rounded-lg  p-3 font-roboto w-full">
      <form onSubmit={onSearch}>
        <InputGroup className="w-full">
          <InputGroupInput name="q" placeholder="Search..." />
          <InputGroupAddon>
            <IconBrandGoogleFilled className="text-white" />
          </InputGroupAddon>
        </InputGroup>
      </form>
    </div>
  );
};

export default SearchGoogle;
