export default function ImprovementsList({ improvements }) {
  if (!improvements || improvements.length === 0) return null;

  return (
    <div>
      <div className="section-title">Suggested Improvements</div>
      <ul className="improvements">
        {improvements.map((imp, i) => (
          <li key={i}>{imp}</li>
        ))}
      </ul>
    </div>
  );
}
