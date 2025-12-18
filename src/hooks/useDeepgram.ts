import { useRef, useState, useCallback } from "react";

/* 🔥 PRO DEEPGRAM CONFIG */
const DEEPGRAM_URL =
  "wss://api.deepgram.com/v1/listen" +
  "?model=nova-2" +
  "&language=en-IN" +
  "&smart_format=true" +
  "&punctuate=true" +
  "&interim_results=true" +
  "&endpointing=50" +
  "&utterance_end_ms=1000" +
  "&vad_events=true";

export default function useDeepgram() {
  const socketRef = useRef<WebSocket | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [finalTranscript, setFinalTranscript] = useState("");
  const [interimTranscript, setInterimTranscript] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  /* 🧹 CLEAR TRANSCRIPT */
  const clearTranscript = useCallback(() => {
    setFinalTranscript("");
    setInterimTranscript("");
  }, []);

  /* 🎤 START */
  const start = useCallback(async () => {
    // 🔄 Always start fresh
    clearTranscript();

    const stream = await navigator.mediaDevices.getUserMedia({
      audio: {
        channelCount: 1,
        sampleRate: 48000,
        autoGainControl: true,
        echoCancellation: false,
        noiseSuppression: false,
      },
    });

    streamRef.current = stream;

    const socket = new WebSocket(DEEPGRAM_URL, [
      "token",
      import.meta.env.VITE_DEEPGRAM_API_KEY,
    ]);

    socket.onopen = () => {
      const recorder = new MediaRecorder(stream, {
        mimeType: "audio/webm",
        audioBitsPerSecond: 128000,
      });

      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (event) => {
        if (event.data.size && socket.readyState === WebSocket.OPEN) {
          socket.send(event.data);
        }
      };

      recorder.start(100); // ⚡ FAST LIVE
      setIsRecording(true);
      setIsPaused(false);
    };

    socket.onmessage = (message) => {
      try {
        const data = JSON.parse(message.data);
        const text = data.channel?.alternatives?.[0]?.transcript;
        if (!text) return;

        if (data.is_final) {
          setFinalTranscript((prev) => prev + text + " ");
          setInterimTranscript("");
        } else {
          setInterimTranscript(text + " ");
        }
      } catch (err) {
        console.error("Deepgram parse error:", err);
      }
    };

    socket.onerror = () => stop();
    socketRef.current = socket;
  }, [clearTranscript]);

  /* ⏹ STOP */
  const stop = useCallback(() => {
    mediaRecorderRef.current?.stop();
    streamRef.current?.getTracks().forEach((t) => t.stop());
    socketRef.current?.close();

    setIsRecording(false);
    setIsPaused(false);
    setInterimTranscript("");
  }, []);

  /* ⏸ PAUSE */
  const pause = useCallback(() => {
    mediaRecorderRef.current?.pause();
    setIsPaused(true);
  }, []);

  /* ▶️ RESUME */
  const resume = useCallback(() => {
    mediaRecorderRef.current?.resume();
    setIsPaused(false);
  }, []);

  return {
    transcript: finalTranscript + interimTranscript,
    isRecording,
    isPaused,
    start,
    stop,
    pause,
    resume,
    clearTranscript, // 👈 exposed
  };
}
