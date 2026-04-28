import { UploadIcon } from "./Icons";

export default function PdfUpload({ onFileSelect, pdfFile }) {
  function handleFileChange(e) {
    const file = e.target.files[0];
    onFileSelect(file);
  }

  return (
    <div className="pdf-upload">
      <div className="pdf-upload-icon">
        <UploadIcon />
      </div>
      <div className="pdf-upload-text">
        <p>Upload PDF Resume</p>
        <span>Drag & drop or click to browse to get started</span>
      </div>
      <input accept=".pdf" type="file" onChange={handleFileChange} />
      {pdfFile && <div className="pdf-upload-selected">{pdfFile.name}</div>}
    </div>
  );
}
