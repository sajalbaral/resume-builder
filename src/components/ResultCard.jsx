import ScoreRing from "./ScoreRing";
import KeywordChips from "./KeywordChips";
import ImprovementsList from "./ImprovementsList";

function getGradeClass(score) {
  if (score >= 75) return "grade-high";
  if (score >= 50) return "grade-mid";
  return "grade-low";
}

function getGradeLabel(score) {
  if (score >= 75) return "Strong";
  if (score >= 50) return "Fair";
  return "Weak";
}

function getScoreTitle(score) {
  if (score >= 75) return "Strong Match";
  if (score >= 50) return "Partial Match";
  return "Low Match";
}

function getScoreDesc(score) {
  if (score >= 75) return "Your resume aligns well with this role.";
  if (score >= 50) return "Some gaps exist — improvements suggested below.";
  return "Significant gaps detected. Tailor your resume to this role.";
}

export default function ResultCard({ result, error }) {
  if (!result && !error) return null;

  return (
    <section className="result-card">
      {error && (
        <div className="score-bar">
          <div className="score-meta">
            <div className="score-title">Error</div>
            <div className="score-desc">{error}</div>
          </div>
        </div>
      )}

      {result && !error && (
        <>
          <div className="score-bar">
            <ScoreRing score={result.matchScore} />
            <div className="score-meta">
              <div className="score-title">
                {getScoreTitle(result.matchScore)}
              </div>
              <div className="score-desc">
                {getScoreDesc(result.matchScore)}
              </div>
            </div>
            <span className={`score-grade ${getGradeClass(result.matchScore)}`}>
              {getGradeLabel(result.matchScore)}
            </span>
          </div>

          <div className="sections">
            <KeywordChips
              title="Matched Keywords"
              keywords={result.matchedKeywords}
              matched
            />
            <KeywordChips
              title="Missing Keywords"
              keywords={result.missingKeywords}
            />
            <ImprovementsList improvements={result.improvements} />
          </div>
        </>
      )}
    </section>
  );
}
