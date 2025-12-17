type Props = {
  title: string;
  children: React.ReactNode;
};

export default function StatCard({ title, children }: Props) {
  return (
    <div className="card">
      <h4>{title}</h4>
      {children}
    </div>
  );
}
