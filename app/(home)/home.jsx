"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import ActiveCallDetail from "@/components/call/ActiveCallDetail";
import Button from "@/components/ui/Button";
import Vapi from "@vapi-ai/web";

import { getGeorgeAssistant } from "@/services/getGeorgeAssistant";
import { EvervaultCard, Icon } from "@/components/ui/EvervaultCard";

const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_KEY || "");

const Home = () => {
  const [connecting, setConnecting] = useState(false);
  const [connected, setConnected] = useState(false);
  const [assistantIsSpeaking, setAssistantIsSpeaking] = useState(false);
  const [volumeLevel, setVolumeLevel] = useState(0);

  // hook into Vapi events
  useEffect(() => {
    const handleCallStart = () => {
      console.log("Call started");
      setConnecting(false);
      setConnected(true);
    };

    const handleCallEnd = () => {
      console.log("Call ended");
      setConnecting(false);
      setConnected(false);
    };

    const handleSpeechStart = () => {
      console.log("Speech started");
      setAssistantIsSpeaking(true);
    };

    const handleSpeechEnd = () => {
      console.log("Speech ended");
      setAssistantIsSpeaking(false);
    };

    const handleVolumeLevel = (level) => {
      setVolumeLevel(level);
    };

    const handleError = (error) => {
      console.error("Vapi error:", error);
      setConnecting(false);
    };

    vapi.on("call-start", handleCallStart);
    vapi.on("call-end", handleCallEnd);
    vapi.on("speech-start", handleSpeechStart);
    vapi.on("speech-end", handleSpeechEnd);
    vapi.on("volume-level", handleVolumeLevel);
    vapi.on("error", handleError);

    return () => {
      vapi.off("call-start", handleCallStart);
      vapi.off("call-end", handleCallEnd);
      vapi.off("speech-start", handleSpeechStart);
      vapi.off("speech-end", handleSpeechEnd);
      vapi.off("volume-level", handleVolumeLevel);
      vapi.off("error", handleError);
    };
  }, []);

  const startCallInline = async () => {
    setAssistantIsSpeaking(true);
    setConnecting(true);

    try {
      const response = await getGeorgeAssistant();
      console.log("Response configuration:", response);
      // Inicia a chamada utilizando a configuração completa
      await vapi.start(response);
    } catch (error) {
      console.error("Error starting call:", error);
    }
  };

  const endCall = () => {
    console.log("Ending call...");
    // Encerrar a chamada de forma que o fluxo finalize e onComplete seja disparado
    vapi.stop();
  };

  return (
    <>
      <div
        suppressHydrationWarning
        className={`${assistantIsSpeaking || volumeLevel > 0 ? "active" : ""}`}
      >
        <div className="flex items-start md:items-center justify-center h-[calc(100vh-170px)]">
          <div className="flex flex-col md:flex-row items-center justify-center">
            <div className="flex items-center justify-center md:mr-6 mb-4 md:mb-0 px-8 pt-4">
              <Image
                src="call-george-banner.svg"
                alt="George"
                width={500}
                height={100}
              />
            </div>

            <div className="flex flex-col items-center max-w-sm p-8 relative h-vh-80 w-screen">
              <Icon className="absolute h-6 w-6 -top-3 -left-3 dark:text-white text-black" />
              <Icon className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white text-black" />
              <Icon className="absolute h-6 w-6 -top-3 -right-3 dark:text-white text-black" />
              <Icon className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white text-black" />

              <EvervaultCard
                text=""
                className="absolute flex items-center justify-center w-full h-full z-0"
              />
              <div className="flex flex-col items-center justify-center w-full">
                <Image
                  src="/george.png"
                  alt="George"
                  width={100}
                  height={100}
                  className={`avatar ${assistantIsSpeaking ? "speaking" : ""}`}
                />
              </div>
              <div className="flex flex-col items-center justify-center w-full z-20 relative">
                {!connected ? (
                  <Button
                    label="Start Call"
                    onClick={startCallInline}
                    isLoading={connecting}
                    disabled={connecting}
                  />
                ) : (
                  <ActiveCallDetail
                    assistantIsSpeaking={assistantIsSpeaking}
                    volumeLevel={volumeLevel}
                    onEndCallClick={endCall}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;