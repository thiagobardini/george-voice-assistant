export interface SpeechRecognitionEvent extends Event {
  readonly resultIndex: number;
  readonly results: SpeechRecognitionResultList;
}

export interface SpeechRecognitionErrorEvent extends Event {
  readonly error: string;
}

export interface ConversationUpdateEvent {
    type: string;
    messages: { role: string; message: string }[];
  }