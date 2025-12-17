import { useRef, useState } from "react";

const DEEPGRAM_URL =
  "wss://api.deepgram.com/v1/listen?punctuate=true&interim_results=true";

export default function useDeepgram() {
  const socketRef = useRef<WebSocket | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  const [transcript, setTranscript] = useState("");
  const [isRecording, setIsRecording] = useState(false);

  const start = async (stream: MediaStream) => {
    const socket = new WebSocket(DEEPGRAM_URL, [
      "token",
      import.meta.env.VITE_DEEPGRAM_API_KEY,
    ]);

    socket.onopen = () => {
      mediaRecorderRef.current = new MediaRecorder(stream, {
        mimeType: "audio/webm",
      });

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0 && socket.readyState === 1) {
          socket.send(event.data);
        }
      };

      mediaRecorderRef.current.start(250);
      setIsRecording(true);
    };

    socket.onmessage = (message) => {
      const data = JSON.parse(message.data);

      const text =
        data.channel?.alternatives?.[0]?.transcript;

      const isFinal = data.is_final;

      // ✅ IMPORTANT FIX: only final transcript
      if (text && isFinal) {
        setTranscript((prev) => prev + text + " ");
      }
    };

    socket.onerror = () => stop();

    socketRef.current = socket;
  };

  const stop = () => {
    mediaRecorderRef.current?.stop();
    socketRef.current?.close();
    setIsRecording(false);
  };

  return { transcript, isRecording, start, stop };
}
