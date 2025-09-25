import React from 'react';

export default function Header() {
  return (
    <header className="flex items-center justify-start px-10 w-full text-6xl uppercase whitespace-nowrap bg-[#EBF1F9] text-[#14375F] max-md:px-5 max-md:max-w-full max-md:text-4xl">
      <div className="flex items-center p-3">
        <img
          loading="lazy"
          src="./logo1.svg"
          alt="Logo"
          className="w-[8.375rem] max-md:w-[75px] h-auto object-contain"
        />
      </div>
    </header>
  );
}
