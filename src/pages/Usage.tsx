import { useApp } from "../context/AppContext";

export default function Usage() {
  const { usage } = useApp();

  return (
    <div className="page">
      <h1>Usage Statistics</h1>
      <p>Total Characters Used: {usage}</p>
      <p>Last 7 Days Usage Trend: 📈</p>
    </div>
  );
}
