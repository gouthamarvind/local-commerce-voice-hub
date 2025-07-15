
import { useState, useEffect, useCallback } from 'react';
import { useApp } from '../contexts/AppContext';

export const useVoiceRecognition = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isSupported, setIsSupported] = useState(false);
  const { setIsVoiceRecording, showToast } = useApp();

  const recognition = useCallback(() => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';
      return recognition;
    } else if ('SpeechRecognition' in window) {
      const recognition = new (window as any).SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';
      return recognition;
    }
    return null;
  }, []);

  useEffect(() => {
    setIsSupported(recognition() !== null);
  }, [recognition]);

  const startListening = useCallback(() => {
    if (!isSupported) {
      showToast('Voice recognition not supported', 'error');
      return;
    }

    const recognitionInstance = recognition();
    if (!recognitionInstance) return;

    setIsListening(true);
    setIsVoiceRecording(true);
    setTranscript('');

    recognitionInstance.onstart = () => {
      console.log('Voice recognition started');
    };

    recognitionInstance.onresult = (event: any) => {
      let finalTranscript = '';
      let interimTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }

      setTranscript(finalTranscript + interimTranscript);
    };

    recognitionInstance.onerror = (event: any) => {
      console.error('Voice recognition error:', event.error);
      showToast('Voice recognition error', 'error');
      setIsListening(false);
      setIsVoiceRecording(false);
    };

    recognitionInstance.onend = () => {
      setIsListening(false);
      setIsVoiceRecording(false);
    };

    try {
      recognitionInstance.start();
    } catch (error) {
      console.error('Failed to start voice recognition:', error);
      showToast('Failed to start voice recognition', 'error');
      setIsListening(false);
      setIsVoiceRecording(false);
    }
  }, [isSupported, recognition, setIsVoiceRecording, showToast]);

  const stopListening = useCallback(() => {
    const recognitionInstance = recognition();
    if (recognitionInstance) {
      recognitionInstance.stop();
    }
    setIsListening(false);
    setIsVoiceRecording(false);
  }, [recognition, setIsVoiceRecording]);

  return {
    isListening,
    transcript,
    isSupported,
    startListening,
    stopListening
  };
};
