import React from "react";

const AssistantSpeechIndicator = ({ isSpeaking }) => {
  return (
    <div className="flex items-center mx-2">
      <div
        className={`w-5 h-5  rounded ${
          isSpeaking ? "bg-[#3ef07c]" : "bg-[#f03e3e]"
        }`}
      />
    </div>
  );
};

export default AssistantSpeechIndicator;
