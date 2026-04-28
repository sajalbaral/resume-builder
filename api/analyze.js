function buildPrompt(resume, jobDesc) {
  return `
      You are an expert recruiter and resume reviewer.
      Analyze the provided resume against the given job description.
      Your feedback must be concise, specific, actionable, tailored to the industry implied by the job description, focused on improving alignment with the job description, and free of generic or vague advice.
      Return ONLY valid JSON in the following structure:
      {
        "matchScore": number,
        "matchedKeywords": [string],
        "missingKeywords": [string],
        "improvements": [string]
      }
      Rules:
      - matchScore must be a number between 0 and 100 (no % sign)
      - matchedKeywords must contain up to 10 keywords present in both the resume and job description
      - missingKeywords must contain up to 8 of the most important missing terms based on the job description
      - improvements must contain up to 5 actionable bullet points
      - Do NOT include any text outside the JSON
      - Do NOT include explanations, markdown formatting, or hallucinated experience
      Resume:
      ${resume}
      Job Description:
      ${jobDesc}
    `;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: buildPrompt(req.body.resume, req.body.jobDesc) }],
            },
          ],
        }),
      },
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(500).json({ error: data });
    }

    return res.status(200).json(data);
  } catch (err) {
    console.log("Error in API route:", err);
    return res.status(500).json({ error: "Server error" });
  }
}
