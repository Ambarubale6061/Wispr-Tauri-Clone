import { useApp } from "../context/AppContext";

export default function Activity() {
  const { activity } = useApp();

  return (
    <div className="page">
      <h1>Recent Activity</h1>

      {activity.map((a: string, i: number) => (
        <p key={i}>✅ {a}</p>
      ))}
    </div>
  );
}
