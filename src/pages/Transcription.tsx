import PushToTalkButton from "../components/PushToTalkButton";
import TranscriptBox from "../components/TranscriptBox";
import useDeepgram from "../hooks/useDeepgram";
import { getMicrophoneStream } from "../services/audioRecorder";
import { useApp } from "../context/AppContext";

export default function Transcription() {
  const { transcript, start, stop, isRecording } = useDeepgram();
  const { addActivity } = useApp();

  const handleStart = async () => {
    const stream = await getMicrophoneStream();
    start(stream);
  };

  if (!isRecording && transcript) {
    addActivity("New transcription created");
  }

  return (
    <div className="page">
      <h1>New Transcription</h1>

      <PushToTalkButton
        isRecording={isRecording}
        onStart={handleStart}
        onStop={stop}
      />

      <TranscriptBox text={transcript} />
    </div>
  );
}
