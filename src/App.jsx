import { useState } from "react";

function App() {
  const [resumeInput, setResumeInput] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [analysisResult, setAnalysisResult] = useState("");

  function handleChange(e) {
    if (e.target.name === "Resume-input") {
      setResumeInput(e.target.value);
    } else if (e.target.name === "Job-description") {
      setJobDescription(e.target.value);
    }
    setAnalysisResult("");
  }

  function handleAnalyze() {
    if (resumeInput.trim() === "" || jobDescription.trim() === "") {
      alert("Please fill in both the resume and job description fields.");
      return;
    }
    setAnalysisResult("Missing keyword: React, Nodes");
  }

  return (
    <>
      <h1>Resume Builder</h1>
      <label htmlFor="Resume-input">Resume Upload: </label>
      <textarea
        name="Resume-input"
        id="Resume-input"
        cols="50"
        rows="2"
        value={resumeInput}
        onChange={handleChange}
      ></textarea>
      <label htmlFor="Job-description">Job Description: </label>
      <textarea
        name="Job-description"
        id="Job-description"
        cols="50"
        rows="2"
        value={jobDescription}
        onChange={handleChange}
      ></textarea>
      <button onClick={handleAnalyze}>Analyze</button>

      <div>
        {resumeInput && (
          <section>
            <h2>Resume Preview:</h2>
            {resumeInput}
          </section>
        )}
        {jobDescription && (
          <section>
            <h2>Job Description Preview:</h2>
            {jobDescription}
          </section>
        )}
      </div>

      {analysisResult && (
        <section>
          <h2>Result: </h2>
          <p>{analysisResult}</p>
        </section>
      )}
    </>
  );
}

export default App;
