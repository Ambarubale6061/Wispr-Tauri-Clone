import { useEffect, useRef } from "react";

type Props = {
  text: string;
};

export default function TranscriptBox({ text }: Props) {
  const hasText = Boolean(text?.trim());
  const scrollRef = useRef<HTMLDivElement>(null);

  // टेक्स्ट कॉपी करण्यासाठी फंक्शन
  const handleCopy = () => {
    if (text) {
      navigator.clipboard.writeText(text);
      alert("Transcript copied to clipboard!");
    }
  };

  // Auto-scroll to bottom when text changes
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
          <div className={`status-indicator ${hasText ? 'is-live' : ''}`}></div>
          <h3 className="transcript-title">Real-time Analysis</h3>
        </div>
        
        {hasText && (
          <button className="copy-btn" onClick={handleCopy} title="Copy Transcript">
            Copy Text
          </button>
        )}
      </header>

      {/* Content Area */}
      <div className="transcript-scroll-area" ref={scrollRef}>
        {hasText ? (
          <p className="transcript-text-active">
            {text}
            <span className="cursor-blink">|</span>
          </p>
        ) : (
          <div className="transcript-empty">
            <div className="empty-visual">
              <div className="pulse-dot"></div>
            </div>
            <p className="transcript-placeholder">
              Waiting for audio input...
            </p>
          </div>
        )}
      </div>
      
      {/* Footer Info */}
      <footer className="transcript-footer">
        <span className="char-count">{text.length} Characters</span>
        <span className="engine-tag">BY AMBAR</span>
      </footer>
    </section>
  );
}
