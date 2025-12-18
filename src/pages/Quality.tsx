export default function Quality() {
  const accuracy = 98;

  return (
    <section className="page">
      <header className="page-header">
        <h1 className="page-title">Transcription Quality</h1>
        <p className="page-subtitle">Overall accuracy based on confidence scoring</p>
      </header>

      <div className="quality-grid">
        {/* Main Quality Card */}
        <div className="quality-card glow-on-hover">
          <div className="quality-visual">
            <div className="accuracy-ring">
              <span className="quality-value">{accuracy}%</span>
              <div className="pulse-ring"></div>
            </div>
          </div>

          <div className="quality-info">
            <h3 className="quality-label">Confidence Score</h3>
            <p className="quality-description">
              High-fidelity recognition detected. Your transcriptions are currently 
              maintaining <strong>Excellent</strong> status.
            </p>
          </div>
        </div>

        {/* Breakdown Card */}
        <div className="quality-card mini-stats">
          <div className="stat-item">
            <span>Noise Reduction</span>
            <div className="stat-bar"><div className="fill" style={{width: '92%'}}></div></div>
          </div>
          <div className="stat-item">
            <span>Speaker Clarity</span>
            <div className="stat-bar"><div className="fill" style={{width: '95%'}}></div></div>
          </div>
        </div>
      </div>
    </section>
  );
}