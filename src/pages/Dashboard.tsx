import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="page grid">
      <Link to="/transcription" className="card">New Transcription</Link>
      <Link to="/usage" className="card">Usage Statistics</Link>
      <Link to="/quality" className="card">Transcription Quality</Link>
      <Link to="/activity" className="card">Recent Activity</Link>
      <Link to="/tips" className="card">Quick Tips</Link>
    </div>
  );
}
