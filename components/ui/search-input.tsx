"use client";

import { SearchIcon, XCircleIcon } from "lucide-react";

import { Input } from "@/components/ui/input";

interface SearchInputProps {
  searchInput: string;
  setSearchInput: (str: string) => void;
  handleChange: (e: any) => void;
  placeholder: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  searchInput,
  setSearchInput,
  handleChange,
  placeholder,
}) => {
  return (
    <div className="flex items-center justify-between border px-3 py-1 w-full rounded">
      <SearchIcon className="h-4 w-4 text-gray-400" />
      <Input
        className="focus-visible:ring-0 border-0 focus-visble:border-0"
        type="text"
        placeholder={placeholder}
        value={searchInput}
        onChange={handleChange}
      />
      {searchInput.length > 0 && (
        <XCircleIcon
          onClick={() => {
            setSearchInput("");
          }}
          className="h1 w-4 text-gray-700 hover:cursor-pointer"
        ></XCircleIcon>
      )}
    </div>
  );
};
export default SearchInput;
