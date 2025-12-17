import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <h2>Wispr</h2>

      <Link to="/">Dashboard</Link>
      <Link to="/transcription">Transcription</Link>
      <Link to="/usage">Usage Statistics</Link>
      <Link to="/quality">Quality</Link>
      <Link to="/activity">Recent Activity</Link>
      <Link to="/tips">Quick Tips</Link>
    </aside>
  );
}
