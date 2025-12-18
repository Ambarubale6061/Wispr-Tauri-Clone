import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Mic,
  BarChart3,
  BadgeCheck,
  Activity,
  Lightbulb,
  ArrowRight,
} from "lucide-react";

const dashboardCards = [
  {
    title: "New Transcription",
    description: "Record audio and convert speech to text",
    icon: Mic,
    link: "/transcription",
    gradient: "from-cyan-400 to-blue-500",
  },
  {
    title: "Usage Statistics",
    description: "Track transcription usage and limits",
    icon: BarChart3,
    link: "/usage",
    gradient: "from-violet-400 to-purple-500",
  },
  {
    title: "Transcription Quality",
    description: "Analyze accuracy and confidence scores",
    icon: BadgeCheck,
    link: "/quality",
    gradient: "from-emerald-400 to-teal-500",
  },
  {
    title: "Recent Activity",
    description: "View your latest transcription history",
    icon: Activity,
    link: "/activity",
    gradient: "from-amber-400 to-orange-500",
  },
  {
    title: "Quick Tips",
    description: "Improve speech recognition accuracy",
    icon: Lightbulb,
    link: "/tips",
    gradient: "from-indigo-400 to-blue-600",
  },
];

/* Animations */
const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

export default function Dashboard() {
  return (
    <section className="page">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <h1 className="page-title">
          Welcome back,
          <span className="gradient-text"> User</span>
        </h1>
      </motion.header>

      {/* Cards */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="dashboard-grid"
      >
        {dashboardCards.map(({ title, description, icon: Icon, link, gradient }) => (
          <motion.div key={title} variants={item}>
            <Link to={link} className="dashboard-card group">
              {/* glow */}
              <span className={`card-glow ${gradient}`} />

              <div className="card-content">
                <div className={`card-icon ${gradient}`}>
                  <Icon size={22} />
                </div>

                <h2 className="card-title">
                  {title}
                  <ArrowRight className="card-arrow" size={16} />
                </h2>

                <p className="card-description">{description}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
