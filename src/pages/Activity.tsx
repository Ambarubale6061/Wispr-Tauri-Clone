import { useApp } from "../context/AppContext";

export default function Activity() {
  const { activity } = useApp();

  // Sample data for the bar chart
  const chartData = [
    { day: "Mon", value: 40 },
    { day: "Tue", value: 70 },
    { day: "Wed", value: 50 },
    { day: "Thu", value: 90 },
    { day: "Fri", value: 65 },
    { day: "Sat", value: 30 },
    { day: "Sun", value: 85 },
  ];

  return (
    <section className="page">
      <header className="page-header">
        <h1 className="page-title">Recent Activity</h1>
        <p className="page-subtitle">Track your transcription trends and logs</p>
      </header>

      {/* --- नवीन ग्राफ सेक्शन --- */}
      <div className="activity-chart-card">
        <div className="chart-header">
          <h3>Activity Trends</h3>
          <span className="chart-tag">Last 7 Days</span>
        </div>
        <div className="bar-chart-container">
          {chartData.map((data, i) => (
            <div key={i} className="bar-wrapper">
              <div 
                className="bar-fill" 
                style={{ height: `${data.value}%`, transitionDelay: `${i * 0.1}s` }}
              >
                <span className="bar-tooltip">{data.value}%</span>
              </div>
              <span className="bar-label">{data.day}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="activity-list">
        <h3 className="list-title">Detailed Logs</h3>
        {activity.length === 0 ? (
          <div className="empty-state-card">
            <div className="empty-icon">⏳</div>
            <p>No recent activity yet</p>
            <span>Start a transcription to see activity here</span>
          </div>
        ) : (
          activity.map((item, index) => (
            <div 
              key={index} 
              className="activity-item-animated"
              style={{ animationDelay: `${index * 0.1}s` }} 
            >
              <div className="status-container">
                <span className="activity-dot-live" />
                <div className="dot-pulse" />
              </div>
              <div className="activity-content">
                <span className="activity-text">{item}</span>
                <span className="activity-time">Just now</span>
              </div>
              <div className="activity-arrow">→</div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}