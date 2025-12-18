type Props = {
  isRecording: boolean;
  isPaused: boolean;
  hasRecording: boolean;
  onStart: () => void;
  onPause: () => void;
  onResume: () => void;
  onStop: () => void;
  onDownload: () => void;
};

export default function PushToTalkButton({
  isRecording,
  isPaused,
  hasRecording,
  onStart,
  onPause,
  onResume,
  onStop,
  onDownload,
}: Props) {
  return (
    <div className="recorder-controls">

      {!isRecording && !hasRecording && (
        <button className="btn primary glow-btn" onClick={onStart}>
          <span className="icon">🎤</span> Start Recording
        </button>
      )}

      {isRecording && !isPaused && (
        <div className="btn-group">
          <button className="btn warning" onClick={onPause}>
            Pause
          </button>
          <button className="btn danger" onClick={onStop}>
            Stop
          </button>
        </div>
      )}


      {isRecording && isPaused && (
        <div className="btn-group">
          <button className="btn primary" onClick={onResume}>
            Resume
          </button>
          <button className="btn danger" onClick={onStop}>
            Stop
          </button>
        </div>
      )}


      {hasRecording && !isRecording && (
        <div className="btn-group fade-in">
          <button className="btn success" onClick={onDownload}>
            Download Audio
          </button>
          <button className="btn secondary" onClick={onStart}>
            Start New
          </button>
        </div>
      )}
    </div>
  );
}