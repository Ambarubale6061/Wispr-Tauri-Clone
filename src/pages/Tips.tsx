export default function Tips() {
  const tips = [
    {
      title: "Clear Speech",
      text: "Speak clearly and at a steady pace for better recognition.",
      icon: "🗣️"
    },
    {
      title: "Quality Gear",
      "text": "Use a good quality microphone or headset to avoid distortions.",
      icon: "🎙️"
    },
    {
      title: "Silence Noise",
      text: "Minimize background noise before recording to improve clarity.",
      icon: "🔇"
    }
  ];

  return (
    <section className="page">
      <header className="page-header">
        <h1 className="page-title">Quick Tips</h1>
        <p className="page-subtitle">Follow these tips to improve transcription accuracy</p>
      </header>

      <div className="tips-grid">
        {tips.map((tip, index) => (
          <div key={index} className="tip-card-fancy">
            <div className="tip-top">
              <span className="tip-icon-box">{tip.icon}</span>
              <span className="tip-number">0{index + 1}</span>
            </div>
            <div className="tip-body">
              <h3 className="tip-title">{tip.title}</h3>
              <p className="tip-text">{tip.text}</p>
            </div>
            <div className="tip-footer-line" />
          </div>
        ))}
      </div>
    </section>
  );
}