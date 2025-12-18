import { useApp } from "../context/AppContext";
import StatCard from "../components/StatCard"; 

export default function Usage() {
  const { usage } = useApp();
  
  // Settings
  const limit = 5000; 
  const percentage = Math.min((usage / limit) * 100, 100);
  const radius = 75;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <section className="page">
      <header className="page-header">
        <h1 className="page-title">Usage Statistics</h1>
        <p className="page-subtitle">Monitor your transcription consumption in real-time</p>
      </header>

      <div className="usage-grid">
        {/* मुख्य ग्राफ कार्ड - StatCard च्या आत */}
        <StatCard title="Overall Capacity" icon="📊">
          <div className="circle-graph-container">
            <svg width="200" height="200" viewBox="0 0 200 200">
              <defs>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
                <linearGradient id="usageGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#22d3ee" />
                  <stop offset="100%" stopColor="#22c55e" />
                </linearGradient>
              </defs>
              
              <circle
                className="circle-bg-dim"
                cx="100" cy="100" r={radius}
              />
              
              <circle
                className="circle-progress-live"
                cx="100" cy="100" r={radius}
                stroke="url(#usageGradient)"
                style={{
                  strokeDasharray: circumference,
                  strokeDashoffset: offset,
                  filter: 'url(#glow)'
                }}
              />
            </svg>
            
            <div className="percentage-overlay">
              <span className="p-large">{Math.round(percentage)}%</span>
              <span className="p-label">used</span>
            </div>
          </div>
        </StatCard>

        {/* इतर माहितीसाठी StatCards */}
        <StatCard title="Characters Consumed" icon="📝">
          <div className="stats-info-content">
            <h2 className="big-value">{usage.toLocaleString()}</h2>
            <p className="limit-text">of {limit.toLocaleString()} available</p>
            <div className="usage-progress-track">
               <div className="usage-progress-fill" style={{ width: `${percentage}%` }}></div>
            </div>
          </div>
        </StatCard>

        <StatCard title="System Health" icon="⚡">
          <div className="status-flex">
            <div className="live-dot-pulse"></div>
            <span className="status-text-live">System Active</span>
          </div>
          <p className="status-desc">Deepgram API is responding normally</p>
        </StatCard>
      </div>
    </section>
  );
}