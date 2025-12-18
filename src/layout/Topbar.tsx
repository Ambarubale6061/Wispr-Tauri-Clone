import { Bell } from "lucide-react";

export default function Topbar() {
  return (
    <header className="topbar">
      {/* Page Title */}
      <h1 className="topbar-title">Dashboard</h1>

      {/* Actions */}
      <div className="topbar-actions">
        <button className="notification-btn" aria-label="Notifications">
          <Bell size={18} />
        </button>

        <div className="user-profile">
          <span className="user-name">Ambar Ubale</span>
          <span className="user-avatar">A</span>
        </div>
      </div>
    </header>
  );
}
