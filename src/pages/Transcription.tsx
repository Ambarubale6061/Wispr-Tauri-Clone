import { useRef, useState } from "react";
import PushToTalkButton from "../components/PushToTalkButton";
import TranscriptBox from "../components/TranscriptBox";
import useDeepgram from "../hooks/useDeepgram";
import { getMicrophoneStream } from "../services/audioRecorder";
import { useApp } from "../context/AppContext";

export default function Transcription() {
  const { transcript, start, stop: stopDeepgram, isRecording } = useDeepgram();
  const { addActivity } = useApp();

  // Typescript Refs
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);

  const hasRecording = Boolean(audioBlob);

  /* START */
  const handleStart = async () => {
    try {
      const stream = await getMicrophoneStream();

      // Deepgram start
      start(stream);

      // Audio recording setup
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (e: BlobEvent) => {
        if (e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        setAudioBlob(blob);
        addActivity("New transcription created");
        
        // Stop all tracks to release microphone
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsPaused(false);
      setAudioBlob(null);
    } catch (err) {
      console.error("Microphone access denied:", err);
    }
  };

  /* PAUSE */
  const handlePause = () => {
    if (mediaRecorderRef.current?.state === "recording") {
      mediaRecorderRef.current.pause();
      setIsPaused(true);
    }
  };

  /* RESUME */
  const handleResume = () => {
    if (mediaRecorderRef.current?.state === "paused") {
      mediaRecorderRef.current.resume();
      setIsPaused(false);
    }
  };

  /* STOP */
  const handleStop = () => {
    mediaRecorderRef.current?.stop();
    stopDeepgram();
    setIsPaused(false);
  };

  /* DOWNLOAD */
  const handleDownload = () => {
    if (!audioBlob) return;

    const url = URL.createObjectURL(audioBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `recording-${Date.now()}.webm`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section className="page">
      <header className="page-header">
        <h1 className="page-title">New Transcription</h1>
        <p className="page-subtitle">
          Control recording manually and download audio after stopping
        </p>
      </header>

      <div className="transcription-layout">
        {/* Animated Visualizer */}
        <div className={`visualizer-card ${isRecording && !isPaused ? 'is-active' : ''}`}>
          <div className="visualizer-waves">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="v-bar"></div>
            ))}
          </div>
          <div className="recording-status">
            {isRecording ? (
              <span className="status-tag pulse-red">
                {isPaused ? "PAUSED" : "LIVE RECORDING"}
              </span>
            ) : (
              <span className="status-tag">READY</span>
            )}
          </div>
        </div>

        {/* Controls */}
        <div className="controls-wrapper shadow-glow">
          <PushToTalkButton
            isRecording={isRecording}
            isPaused={isPaused}
            hasRecording={hasRecording}
            onStart={handleStart}
            onPause={handlePause}
            onResume={handleResume}
            onStop={handleStop}
            onDownload={handleDownload}
          />
        </div>

        {/* Live Output */}
        <div className="transcript-container">
          <div className="transcript-header">
            <h3>Live Transcript</h3>
            {isRecording && !isPaused && <div className="live-indicator">Processing...</div>}
          </div>
          <TranscriptBox text={transcript} />
        </div>
      </div>
    </section>
  );
}