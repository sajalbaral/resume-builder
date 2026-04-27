export default function KeywordChips({ title, keywords, matched = false }) {
  if (!keywords || keywords.length === 0) return null;

  return (
    <div>
      <div className="section-title">{title}</div>
      <div className="chips">
        {keywords.map((kw, i) => (
          <span key={i} className={`chip${matched ? " matched" : ""}`}>
            {kw}
          </span>
        ))}
      </div>
    </div>
  );
}
