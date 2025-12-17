type Props = {
  isRecording: boolean;
  onStart: () => void;
  onStop: () => void;
};

export default function PushToTalkButton({
  isRecording,
  onStart,
  onStop
}: Props) {
  return (
    <button
      className="btn"
      onClick={isRecording ? onStop : onStart}
    >
      {isRecording ? "Stop Recording" : "Start Recording"}
    </button>
  );
}
