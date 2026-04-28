import { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import InputCard from "./components/InputCard";
import AnalyzeButton from "./components/AnalyzeButton";
import ResultCard from "./components/ResultCard";
import Auth from "./components/Auth";
import supabase from "./supabase";
import { ResumeIcon, BriefcaseIcon } from "./components/Icons";
import Footer from "./components/Footer";
import PdfUpload from "./components/PdfUpload";

function App() {
  const [resumeInput, setResumeInput] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [analysisResult, setAnalysisResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);

  useEffect(() => {
    const session = supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setUser(session.user);
      }
    });

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_IN") {
          setUser(session.user);
        } else if (event === "SIGNED_OUT") {
          setUser(null);
        }
      },
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  function handleInput(e) {
    if (e.target.name === "Resume-input") {
      setResumeInput(e.target.value);
    } else if (e.target.name === "Job-description") {
      setJobDescription(e.target.value);
    }
    setAnalysisResult(null);
  }

  async function clickedAnalyze() {
    if (resumeInput.trim() === "" || jobDescription.trim() === "") {
      alert("Please fill in both the resume and job description fields.");
      return;
    }
    setLoading(true);
    setError("");
    setAnalysisResult(null);
    try {
      const result = await analyzeResume(resumeInput, jobDescription);
      setAnalysisResult(result);
    } catch (err) {
      console.log(err);
      setError("An error occurred while analyzing the resume.");
    } finally {
      setLoading(false);
    }
  }

  async function analyzeResume(resume, jobDesc) {
    const response = await fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ resume, jobDesc }),
    });
    const data = await response.json();
    if (!response.ok)
      throw new Error(data?.error?.message || "API request failed");
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) throw new Error("No valid response from AI");
    const cleaned = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();
    return JSON.parse(cleaned);
  }

  async function analyzePdf() {
    if (!pdfFile) {
      alert("Please select a PDF file first.");
      return;
    }
    setLoading(true);
    setError("");
    setAnalysisResult(null);
    try {
      const formData = new FormData();
      formData.append("file", pdfFile);
      const response = await fetch("/api/pdfParse", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.error || "PDF parsing failed");
      const parsedText = data.text;
      const result = await analyzeResume(parsedText, jobDescription);
      setAnalysisResult(result);
    } catch (err) {
      console.log(err);
      setError("An error occurred while parsing the PDF.");
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    const { error } = await supabase.auth.signOut();
  }

  function handleFileChange(file) {
    setPdfFile(file);
  }

  return (
    <>
      {user ? (
        <div className="app">
          <Header user={user} handleLogout={handleLogout} />

          <div className="input-grid">
            <PdfUpload onFileSelect={handleFileChange} pdfFile={pdfFile} />

            <InputCard
              label="Job Description"
              name="Job-description"
              id="Job-description"
              value={jobDescription}
              onChange={handleInput}
              placeholder="Paste the job description — requirements, responsibilities, qualifications..."
              icon={<BriefcaseIcon />}
            />
          </div>

          <AnalyzeButton
            onClick={analyzePdf}
            loading={loading}
            disabled={!pdfFile || !jobDescription}
          />

          <ResultCard result={analysisResult} error={error} />
          <Footer />
        </div>
      ) : (
        <Auth user={user} setUser={setUser} />
      )}
    </>
  );
}

export default App;
