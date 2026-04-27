const CIRCUMFERENCE = 2 * Math.PI * 28;

export default function ScoreRing({ score }) {
  const offset = CIRCUMFERENCE - (score / 100) * CIRCUMFERENCE;

  return (
    <div className="score-ring">
      <svg viewBox="0 0 72 72">
        <circle className="score-ring-track" cx="36" cy="36" r="28" />
        <circle
          className="score-ring-fill"
          cx="36"
          cy="36"
          r="28"
          style={{ strokeDashoffset: offset }}
        />
      </svg>
      <div className="score-text">
        <span className="score-num">{score}</span>
        <span className="score-denom">/100</span>
      </div>
    </div>
  );
}
