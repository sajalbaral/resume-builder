import { SearchIcon } from "./Icons";

function LoadingDots() {
  return (
    <span className="dots">
      <span />
      <span />
      <span />
    </span>
  );
}

export default function AnalyzeButton({ onClick, loading }) {
  return (
    <button className="analyze-btn" onClick={onClick} disabled={loading}>
      {loading ? <LoadingDots /> : <SearchIcon />}
      {loading ? "Analyzing..." : "Analyze Match"}
    </button>
  );
}
