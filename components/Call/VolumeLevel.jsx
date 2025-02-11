import React from "react";

const numBars = 10;

const VolumeLevel = ({ volume }) => {
  return (
    <div className="">
      <div className="flex">
        {Array.from({ length: numBars }, (_, i) => (
          <div
            key={i}
            className={`w-5 h-5 m-[1px] rounded-[2px] ${i / numBars < volume ? "bg-[#3ef07c]" : "bg-white"}`}
          />
        ))}
      </div>
    </div>
  );
};

export default VolumeLevel;
