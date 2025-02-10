"use client";

import { useEffect, useState, useMemo, useRef } from "react";
import { useConversation } from "@/hooks/useConversation";
import Image from "next/image";

import ActiveCallDetail from "@/components/features/call/activeCallDetail";
import Button from "@/components/ui/button";
import Vapi from "@vapi-ai/web";
import Transcript from "@/components/features/transcript/Transcript";

import { getBobAssistant } from "@/utils/assistant";
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
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
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
      recognition.onerror = (event: any) => {
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
        message.messages.forEach((msg: any) => {
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
  }, [vapiClient, clearConversation, setCurrentText, addUserMessage, addAssistantMessage]);

  // Add debug logging for transcript updates
  useEffect(() => {
    console.log("Transcript updated:", transcript);
  }, [transcript]);

  // call start handler
  const startCallInline = () => {
    setConnecting(true);
    getBobAssistant().then((assistant) => {
      vapiClient.start(assistant);
    });
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
      <div
        suppressHydrationWarning
        className={`app-wrapper ${
          assistantIsSpeaking || volumeLevel > 0 ? "active" : ""
        }`}
      >
        <div className="animated-bg">
          <div className="blob blob-1"></div>
          <div className="blob blob-2"></div>
          <div className="blob blob-3"></div>
        </div>
        <div className="main-content">
          <div className={`card-container ${connected ? "connected" : ""}`}>
            <Image
              src="/george.png"
              alt="George"
              width={100}
              height={100}
              className={`avatar ${assistantIsSpeaking ? "speaking" : ""}`}
            />
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
