"use client";

import { useEffect, useState, useMemo, useRef } from "react";
import { useConversation } from "@/hooks/useConversation";
import Image from "next/image";

import ActiveCallDetail from "@/components/call/ActiveCallDetail";
import Button from "@/components/ui/Button";
import Vapi from "@vapi-ai/web";
import Transcript from "@/components/transcript/Transcript";

import { getBobAssistant } from "@/services/Assistant";
import { getGeorgeAssistant } from "@/services/getGeorgeAssistant";

import { EvervaultCard, Icon } from "@/components/ui/evervault-card";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import "@/styles/globals.css";

const Home = () => {
  const [connecting, setConnecting] = useState(false);
  const [connected, setConnected] = useState(false);
  const [assistantIsSpeaking, setAssistantIsSpeaking] = useState(false);
  const [volumeLevel, setVolumeLevel] = useState(0);
  const transcriptRef = useRef(null);
  const [tempUserText, setTempUserText] = useState("");
  const speechTimeoutRef = useRef(null);
  const [isTranscriptVisible, setIsTranscriptVisible] = useState(true);
  const [mounted, setMounted] = useState(false);

  const {
    transcript,
    currentText,
    conversation,
    addUserMessage,
    addAssistantMessage,
    clearConversation,
    setCurrentText,
  } = useConversation();

  const vapiClient = useMemo(
    () =>
      typeof window !== "undefined"
        ? new Vapi(process.env.NEXT_PUBLIC_VAPI_KEY || "")
        : null,
    []
  );

  const startSpeechRecognition = () => {
    if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.onresult = (event) => {
        const last = event.results.length - 1;
        const text = event.results[last][0].transcript;
        const isFinal = event.results[last].isFinal;
        setTempUserText(text);
        if (speechTimeoutRef.current) {
          clearTimeout(speechTimeoutRef.current);
        }
        if (isFinal) {
          addUserMessage(text);
          setTempUserText("");
        } else {
          speechTimeoutRef.current = setTimeout(() => {
            if (text.trim()) {
              addUserMessage(text);
              setTempUserText("");
            }
          }, 1000);
        }
      };
      recognition.onend = () => {
        if (tempUserText.trim()) {
          addUserMessage(tempUserText);
          setTempUserText("");
        }
      };
      recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        if (tempUserText.trim()) {
          addUserMessage(tempUserText);
          setTempUserText("");
        }
      };
      recognition.start();
      return recognition;
    }
    console.warn("Speech recognition not supported in this browser");
    return null;
  };

  // Auto-scroll transcript to bottom
  useEffect(() => {
    if (transcriptRef.current) {
      transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight;
    }
  }, [transcript, currentText]);

  // Updated event listeners based on SDK documentation:
  useEffect(() => {
    let recognition = null;
    vapiClient.on("call-start", () => {
      setConnecting(false);
      setConnected(true);
      clearConversation();
      setCurrentText("");
      recognition = startSpeechRecognition();
    });

    vapiClient.on("call-end", () => {
      setConnecting(false);
      setConnected(false);
      setCurrentText("");
      if (recognition) {
        recognition.stop();
      }
    });

    vapiClient.on("speech-start", () => {
      setAssistantIsSpeaking(true);
    });

    vapiClient.on("speech-end", () => {
      setAssistantIsSpeaking(false);
      setCurrentText("");
    });

    vapiClient.on("volume-level", (volume) => {
      setVolumeLevel(volume);
    });

    vapiClient.on("message", (message) => {
      if (message.type === "conversation-update") {
        message.messages.forEach((msg) => {
          if (msg.role === "user") {
            addUserMessage(msg.message);
          } else if (msg.role === "assistant") {
            addAssistantMessage(msg.message);
          }
        });
      }
    });

    vapiClient.on("error", (error) => {
      console.error(error);
    });

    return () => {
      if (recognition) {
        recognition.stop();
      }
      vapiClient.removeAllListeners();
    };
  }, [
    vapiClient,
    clearConversation,
    setCurrentText,
    addUserMessage,
    addAssistantMessage,
  ]);

  // Add debug logging for transcript updates
  useEffect(() => {
    console.log("Transcript updated:", transcript);
  }, [transcript]);

  // call start handler
  const startCallInline = async () => {
    setConnecting(true);
    try {
      const assistant = await getGeorgeAssistant();
      console.log("Assistant configuration:", assistant); // Log for debugging
      await vapiClient.start(assistant);
    } catch (error) {
      console.error("Error starting call:", error); // Log for debugging
    } finally {
      setConnecting(false);
    }
  };

  // Updated call control for ending the call:
  const endCall = async () => {
    if (vapiClient) {
      await vapiClient.stop();
      setConnected(false);
      setConnecting(false);
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Remove interfering attribute injected by browser extension
    document.body.removeAttribute("cz-shortcut-listen");
  }, []);

  if (!mounted) return null; // delay rendering until after mount

  const toggleTranscript = () => setIsTranscriptVisible(!isTranscriptVisible);

  return (
    <>
      <div className="relative">
        <GlowingEffect
          blur={0}
          borderWidth={3}
          spread={80}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />
        <div className="relative z-10">
          <div
            // suppressHydrationWarning
            className={` ${
              assistantIsSpeaking || volumeLevel > 0 ? "active" : ""
            }`}
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
                    alwaysActive={connected}
                    className="absolute flex items-center justify-center w-full h-full z-0"
                  />
                  <div className="flex flex-col items-center justify-center w-full">
                    <Image
                      src="/george.png"
                      alt="George"
                      width={100}
                      height={100}
                      className={`avatar ${
                        assistantIsSpeaking ? "speaking" : ""
                      }`}
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
        </div>

        {connected && (
          <Transcript
            transcript={transcript}
            conversation={conversation}
            isTranscriptVisible={isTranscriptVisible}
            tempUserText={tempUserText}
            currentText={currentText}
            assistantIsSpeaking={assistantIsSpeaking}
            transcriptRef={transcriptRef}
            toggleTranscript={toggleTranscript}
          />
        )}
      </div>
    </>
  );
};

export default Home;
