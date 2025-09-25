import * as React from "react";

function SearchBar({ onSearch = () => { } }) {   // Nhận prop onSearch
  const handleChange = (e) => {
    onSearch(e.target.value);   // Gọi hàm khi nhập ký tự
  };

  return (
    <form
      className="flex items-start w-full text-[#14375F] max-md:max-w-full"
      role="search" 
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="flex gap-3 items-center px-3 max-md:px-2 bg-[#D6E4F6] rounded-[6.25rem] w-full md:min-h-[3.75rem] max-md:min-h-[2.75rem]">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/ce9d43b270ae41158192dec03af70a1a/d65b3dbcd183bd0bf43e39ea99d6c9cc3223e800f0d05d6efe18b8c004e9ec5b?apiKey=ce9d43b270ae41158192dec03af70a1a&"
          className="object-contain shrink-0 self-stretch my-auto aspect-square w-[24px] max-md:w-[18px]"
          alt="search-icon"
        />
        <input
          type="search"
          id="searchInput"
          className="flex-1 gap-2.5 self-stretch my-auto bg-transparent border-none outline-none placeholder-[#14375F]"
          placeholder="Tìm kiếm"
          onChange={handleChange}
        />
      </div>
    </form>
  );
}

export default SearchBar;