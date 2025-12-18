type Props = {
  title: string;
  children: React.ReactNode;
  icon?: string; // ऐच्छिक आयकॉनसाठी
};

export default function StatCard({ title, children, icon }: Props) {
  return (
    <section className="stat-card-premium">
      {/* Glow Effect Layer */}
      <div className="card-glow-effect"></div>

      <header className="stat-card-header">
        <div className="header-content">
          {icon && <span className="stat-icon">{icon}</span>}
          <h4 className="stat-card-title">{title}</h4>
        </div>
        <div className="status-dot-mini"></div>
      </header>

      <div className="stat-card-content">
        {children}
      </div>
      
      {/* Decorative bottom line */}
      <div className="card-border-bottom"></div>
    </section>
  );
}