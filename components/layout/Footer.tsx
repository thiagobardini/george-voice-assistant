"use client";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="w-full py-6 mt-auto border-t border-gray-200">
      <div className="container mx-auto px-4 flex justify-center items-center">
        <a
          href="https://www.sundai.club/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-80 transition-opacity"
        >
          <Image
            src="/sundai_logo_dark.svg"
            alt="Developed by Sundai"
            className="h-8"
            width={120}
            height={30}
          />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
