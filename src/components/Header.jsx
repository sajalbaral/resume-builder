export default function Header({ user, handleLogout }) {
  return (
    <header className="header">
      <div className="header-nav">
        <span className="header-user">
          Welcome, {user?.email?.split("@")[0]}
        </span>
        <button className="auth-btn header-logout" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <div className="badge">AI-powered</div>
      <h1>
        Resume <em>Analyzer</em>
      </h1>
      <p className="subtitle">
        Paste your resume and job description to get an instant match score and
        actionable improvements.
      </p>
    </header>
  );
}
