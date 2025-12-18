import { useEffect, useRef } from "react";

type Props = {
  text: string;
  onClear: () => void; 
};

export default function TranscriptBox({ text, onClear }: Props) {
  const hasText = Boolean(text?.trim());
  const scrollRef = useRef<HTMLDivElement>(null);

  // Copy transcript
  const handleCopy = () => {
    if (text) {
      navigator.clipboard.writeText(text);
      alert("Transcript copied to clipboard!");
    }
  };

  // Clear transcript
  const handleClear = () => {
    if (hasText) {
      onClear(); // parent state clear
    }
  };

  // Auto-scroll on text update
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [text]);

  return (
    <section className="transcript-box-premium">
      {/* Header */}
      <header className="transcript-box-header">
        <div className="header-left">
          <div className={`status-indicator ${hasText ? "is-live" : ""}`} />
          <h3 className="transcript-title">Real-time Analysis</h3>
        </div>

        {hasText && (
          <div className="header-actions">
            <button
              className="copy-btn"
              onClick={handleCopy}
              title="Copy Transcript"
            >
              Copy
            </button>

            <button
              className="clear-btn"
              onClick={handleClear}
              title="Clear Transcript"
            >
              Clear
            </button>
          </div>
        )}
      </header>

      {/* Content */}
      <div className="transcript-scroll-area" ref={scrollRef}>
        {hasText ? (
          <p className="transcript-text-active">
            {text}
            <span className="cursor-blink">|</span>
          </p>
        ) : (
          <div className="transcript-empty">
            <div className="empty-visual">
              <div className="pulse-dot" />
            </div>
            <p className="transcript-placeholder">
              Waiting for audio input...
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="transcript-footer">
        <span className="char-count">{text.length} Characters</span>
        <span className="engine-tag">BY AMBAR</span>
      </footer>
    </section>
  );
}
