"use client";
import { Input } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebounce } from "../../../hooks";

const SearchField = () => {
  const [value, setValue] = useState("");
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const debouncedSearch: any = useDebounce(value, 500); // Call useDebounce with current value

  // Update URL using debouncedSearch when it changes
  useEffect(() => {
    if (debouncedSearch) {
      const params = new URLSearchParams(searchParams);
      params.set("searchQuery", debouncedSearch);
      replace(`${pathname}?${params.toString()}`);
    } else {
      const params = new URLSearchParams(searchParams);
      params.delete("searchQuery");
      setValue("");
      replace(`${pathname}?${params.toString()}`); // Update URL even for empty debouncedSearch
    }
  }, [debouncedSearch]); // Dependency on debouncedSearch

  function handleSearch(newValue: string) {
    setValue(newValue); // Update state immediately
  }

  return (
    <form className="flex w-full flex-wrap md:flex-nowrap gap-4 pb-5">
      <Input
        type="search"
        label="Search"
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get("query")?.toString()}
      />
    </form>
  );
};

export default SearchField;
