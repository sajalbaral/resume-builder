import formidable from "formidable";
import fs from "fs";
import pdfParse from "pdf-parse";

export default async function pdfParser(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const form = formidable();
    const [fields, files] = await form.parse(req);
    const file = files.file[0];
    const buffer = fs.readFileSync(file.filepath);
    const data = await pdfParse(buffer);
    const parsedText = data.text;

    return res.status(200).json({ text: parsedText });
  } catch (err) {
    console.log("Error in PDF parsing API route:", err);
    return res.status(500).json({ error: "Server error" });
  }
}
