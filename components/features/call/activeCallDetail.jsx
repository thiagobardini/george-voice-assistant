import AssistantSpeechIndicator from "@/components/features/call/assistantSpeechIndicator";
import Button from "@/components/ui/button";
import VolumeLevel from "@/components/features/call/volumeLevel";

const ActiveCallDetail = ({ assistantIsSpeaking, volumeLevel, onEndCallClick }) => {
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          padding: "15px",
          border: "1px solid #ddd",
          borderRadius: "8px",
          boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
          width: "400px",
          height: "100px",
        }}
      >
        <AssistantSpeechIndicator isSpeaking={assistantIsSpeaking} />
        <VolumeLevel volume={volumeLevel} />
      </div>
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <Button label="End Call" onClick={onEndCallClick} />
      </div>
    </div>
  );
};

export default ActiveCallDetail;
