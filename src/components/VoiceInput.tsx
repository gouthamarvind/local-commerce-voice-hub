
import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Square } from 'lucide-react';
import { useVoiceRecognition } from '../hooks/useVoiceRecognition';
import { useApp } from '../contexts/AppContext';

interface VoiceInputProps {
  onTranscript: (text: string) => void;
  placeholder?: string;
  className?: string;
}

export const VoiceInput: React.FC<VoiceInputProps> = ({ 
  onTranscript, 
  placeholder = "Click to start voice input",
  className = "" 
}) => {
  const { isListening, transcript, isSupported, startListening, stopListening } = useVoiceRecognition();
  const { isVoiceRecording } = useApp();
  const [lastTranscript, setLastTranscript] = useState('');

  useEffect(() => {
    if (transcript && transcript !== lastTranscript) {
      onTranscript(transcript);
      setLastTranscript(transcript);
    }
  }, [transcript, onTranscript, lastTranscript]);

  const handleToggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  if (!isSupported) {
    return (
      <div className={`text-gray-500 text-sm ${className}`}>
        Voice input not supported in this browser
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <button
        onClick={handleToggleListening}
        className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 ${
          isListening 
            ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse' 
            : 'bg-accent hover:bg-accent/80 text-accent-foreground'
        } focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2`}
        aria-label={isListening ? 'Stop voice input' : 'Start voice input'}
        disabled={!isSupported}
      >
        {isListening ? (
          <Square className="w-4 h-4" />
        ) : (
          <Mic className="w-5 h-5" />
        )}
      </button>
      
      {isListening && (
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          <span>Listening...</span>
        </div>
      )}
      
      {transcript && (
        <div className="text-sm text-gray-700 italic">
          "{transcript}"
        </div>
      )}
    </div>
  );
};
