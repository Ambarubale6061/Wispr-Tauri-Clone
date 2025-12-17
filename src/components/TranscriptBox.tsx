export default function TranscriptBox({ text }: { text: string }) {
  return (
    <div className="card">
      <h3>Transcript</h3>
      <p>{text || "Start speaking..."}</p>
    </div>
  );
}
