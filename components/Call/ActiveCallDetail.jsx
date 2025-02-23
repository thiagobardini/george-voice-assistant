import AssistantSpeechIndicator from "@/components/Call/AssistantSpeechIndicator";
import Button from "@/components/ui/Button";
import VolumeLevel from "@/components/Call/VolumeLevel";

const ActiveCallDetail = ({ assistantIsSpeaking, volumeLevel, onEndCallClick }) => {
  return (
    <div>
      <div className="flex flex-row items-center justify-center bg-gradient-to-br from-[#e0eafc] to-[#cfdef3] border border-[#ddd] rounded-lg shadow-md max-w-[400px] w-full p-4">
        <AssistantSpeechIndicator isSpeaking={assistantIsSpeaking} />
        <VolumeLevel volume={volumeLevel} />
      </div>
      <div className="mt-5 text-center">
        <Button label="End Call" onClick={onEndCallClick} />
      </div>
    </div>
  );
};

export default ActiveCallDetail;
