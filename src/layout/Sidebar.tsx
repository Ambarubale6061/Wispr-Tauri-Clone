import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  LayoutDashboard,
  Mic,
  BarChart3,
  BadgeCheck,
  Activity,
  Lightbulb,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  const links = [
    { to: "/", label: "Dashboard", icon: LayoutDashboard },
    { to: "/transcription", label: "Transcription", icon: Mic },
    { to: "/usage", label: "Usage", icon: BarChart3 },
    { to: "/quality", label: "Quality", icon: BadgeCheck },
    { to: "/activity", label: "Activity", icon: Activity },
    { to: "/tips", label: "Quick Tips", icon: Lightbulb },
  ];

  return (
    <motion.aside
      className="sidebar"
      animate={{ width: collapsed ? 84 : 260 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 28,
      }}
    >
      {/* ---------- Brand ---------- */}
      <div className="sidebar-brand">
        <motion.div
          className="logo-wrap"
          whileHover={{ rotate: 6, scale: 1.1 }}
        >
          🎙
        </motion.div>

        {!collapsed && (
          <motion.h2
            className="brand-name"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Wispr
          </motion.h2>
        )}

        <button
          className="collapse-btn"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <ChevronRight /> : <ChevronLeft />}
        </button>
      </div>

      {/* ---------- Navigation ---------- */}
      <nav className="sidebar-nav">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={label}
            to={to}
            end
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "active" : ""}`
            }
          >
            <motion.div
              className="icon-wrap"
              whileHover={{ scale: 1.15 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Icon size={20} />
            </motion.div>

            {!collapsed && (
              <motion.span
                className="link-text"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {label}
              </motion.span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* ---------- Footer ---------- */}
      <div className="sidebar-footer">
        {!collapsed && (
          <motion.div
            className="dev-card"
            whileHover={{ scale: 1.04 }}
          >
            <div className="dev-info">
              <span className="dev-label">Developed By</span>
              <span className="dev-name">Ambar Ubale</span>
            </div>
            <motion.div
              className="dev-status-dot"
              animate={{ scale: [1, 1.4, 1] }}
              transition={{ repeat: Infinity, duration: 1.6 }}
            />
          </motion.div>
        )}
      </div>
    </motion.aside>
  );
}
