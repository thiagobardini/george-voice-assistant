"use client";

import { useState, useCallback } from 'react';

interface Message {
  text: string;
  speaker: 'user' | 'assistant';
  timestamp: number;
}

export const useConversation = () => {
  const [transcript, setTranscript] = useState<Message[]>([]);
  const [currentText, setCurrentText] = useState<string>('');
  const [conversation, setConversation] = useState<Message[]>([]);

  const addUserMessage = useCallback((text: string) => {
    if (text.trim()) {
      const message: Message = {
        text,
        speaker: 'user',
        timestamp: Date.now(),
      };
      setCurrentText(text);
      setConversation((prev) => [...prev, message]);
      setTranscript((prev) => {
        const newTranscript = [...prev, message];
        return newTranscript.slice(-15); // Only keep the last 15 messages
      });
    }
  }, []);

  const addAssistantMessage = useCallback((text: string) => {
    if (text.trim()) {
      const message: Message = {
        text,
        speaker: 'assistant',
        timestamp: Date.now(),
      };
      setCurrentText(text);
      setConversation((prev) => [...prev, message]);
      setTranscript((prev) => {
        const newTranscript = [...prev, message];
        return newTranscript.slice(-15); // Only keep the last 15 messages
      });
    }
  }, []);

  const clearConversation = useCallback(() => {
    setTranscript([]);
    setConversation([]);
    setCurrentText('');
  }, []);

  return {
    transcript,
    currentText,
    conversation,
    addUserMessage,
    addAssistantMessage,
    clearConversation,
    setCurrentText,
  };
};