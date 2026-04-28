# AI Resume Analyzer

A modern AI-powered web app that analyzes resumes against job descriptions and provides structured, actionable feedback. Users receive a match score, missing keywords, and targeted improvements to better align their resume with specific roles.

---

## Features

- Upload PDF resume for analysis
- Analyze resumes against job descriptions using AI (Gemini 2.5 Flash)
- Match score (0–100%) based on alignment with job requirements
- Matched and missing keyword detection to improve ATS compatibility
- Actionable improvement suggestions tailored to the role
- User authentication (email/password + Google OAuth) via Supabase
- Clean, modern dark-mode UI inspired by Supabase's design system
- Secure API integration using Vercel serverless functions (API key never exposed)
- Responsive layout for desktop and mobile

---

## Live Demo

[https://resume-builder-wine-seven.vercel.app/](https://ai-resume-analyzer-liard-rho.vercel.app/)

---

## Built With

- React
- Vite
- JavaScript
- CSS
- Google Gemini API
- Supabase (authentication)
- Vercel (serverless functions + hosting)

---

## Architecture

- Frontend built with React using a modular, component-based structure
- Supabase Auth handles user authentication with email/password and Google OAuth
- Serverless API routes on Vercel act as a secure proxy for all AI requests
- Prompt engineering logic lives server-side in `/api/analyze.js` — never exposed to the client
- PDF text extraction handled server-side via `/api/pdfParse.js` using `pdf2json` and `formidable`
- AI responses parsed into structured JSON for predictable, reliable rendering

---

## What I Learned

- Building and deploying a full-stack app using Vercel serverless functions
- Securing API keys by moving all sensitive logic to the backend
- Implementing authentication flows with Supabase (email confirmation, OAuth, session persistence)
- Handling file uploads with `FormData` and parsing PDFs server-side in a serverless environment
- Designing structured prompts to enforce consistent AI output (JSON)
- Managing async workflows with explicit loading, error, and success states
- Structuring a React app with reusable, modular components
- Designing a clean, modern UI with a consistent CSS variable-based design system

---

## Future Improvements

- Save and persist analysis history per user
- Structured output enforcement using Gemini's native JSON schema feature
- Resume version comparison (track score improvements over time)
- AI-powered rewrite suggestions for resume bullet points
- Export results as PDF

---

## Why I Built This

I wanted to go beyond basic resume tools and create something that not only analyzes resumes, but provides **clear, actionable guidance** to improve them. This project also served as a way to explore full-stack patterns using serverless architecture, AI integration, and modern authentication — while building something genuinely useful for my own job search.
