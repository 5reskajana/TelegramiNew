import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../../index.css";
import "./Compose.css";
import { CURRENT_USER } from "../../data/Mockdata";

const RECIPIENTS = [
  { id: "u2", name: "Јане Колев",         dept: "Финансии"  },
  { id: "u4", name: "Томо Томоски",       dept: "Логистика" },
  { id: "u5", name: "Одбор на директори", dept: "Извршни"   },
  { id: "u6", name: "Елена Васева",       dept: "Правни"    },
];

const generateRef = () => {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  const n = String(Math.floor(Math.random() * 900) + 100);
  return `TEL-${y}-${m}${d}-${n}`;
};

export default function Compose() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null); // Reference for the hidden file input

  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [attachments, setAttachments] = useState([]); // State for files
  const [priority, setPriority] = useState("NORMAL");
  const [classification, setClassification] = useState("INTERNAL");
  const [submitted, setSubmitted] = useState(false);
  const [savedDraft, setSavedDraft] = useState(false);
  const [error, setError] = useState("");
  const [refNo] = useState(generateRef);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setAttachments((prev) => [...prev, ...files]);
    // Reset input value so the same file can be uploaded twice if deleted
    e.target.value = null; 
  };

  const removeAttachment = (index) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSend = () => {
    if (!to || !subject || !body) {
      setError("Ве молиме пополнете ги задолжителните полиња.");
      return;
    }
    setError("");
    setSubmitted(true);
  };

  const handleClear = () => {
    setTo(""); setSubject(""); setBody(""); setAttachments([]);
    setPriority("NORMAL"); setClassification("INTERNAL");
    setError(""); setSubmitted(false);
  };

  if (submitted) {
    return (
      <div className="compose-page">
        <div className="compose-success">
          <span className="compose-success-icon">✅</span>
          <div>
            <strong>Телеграмата е успешно испратена.</strong>
            <div style={{ fontSize: 12, marginTop: 4 }}>Референтен број: {refNo}</div>
            <div style={{ fontSize: 11, opacity: 0.7 }}>Приложени датотеки: {attachments.length}</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button className="btn btn-primary" onClick={handleClear}>Испрати нова</button>
          <button className="btn btn-ghost" onClick={() => navigate("/dashboard")}>Назад</button>
        </div>
      </div>
    );
  }

  return (
    <div className="compose-page">
      <div className="compose-header">
        <div>
          <h1>Испрати телеграма</h1>
          <p>Пополнете ги деталите.</p>
        </div>
        <button className="btn btn-ghost" onClick={() => navigate(-1)}>← Назад</button>
      </div>

      {error && <div className="error-msg">{error}</div>}

      <div className="compose-card">
        <div className="compose-body">
          {/* Header Info */}
          <div className="compose-field">
            <label>До</label>
            <select value={to} onChange={(e) => setTo(e.target.value)}>
              <option value="">— Изберете примач —</option>
              {RECIPIENTS.map((r) => (
                <option key={r.id} value={r.id}>{r.name} ({r.dept})</option>
              ))}
            </select>
          </div>

          <div className="compose-field">
            <label>Наслов</label>
            <input 
              type="text" 
              value={subject} 
              onChange={(e) => setSubject(e.target.value)} 
              placeholder="Внесете наслов..." 
            />
          </div>

          {/* Textarea */}
          <div className="compose-field">
            <label>Порака</label>
            <textarea
              placeholder="Внесете ја содржината на телеграмата..."
              value={body}
              onChange={(e) => setBody(e.target.value)}
              style={{ minHeight: "150px" }}
            />
          </div>

          {/* ── ATTACHMENTS SECTION ── */}
          <div className="attachment-section" style={{ marginTop: "-10px", marginBottom: "20px" }}>
            <input 
              type="file" 
              multiple 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              style={{ display: "none" }}
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            />
            
            <button 
              type="button" 
              className="btn btn-ghost" 
              style={{ fontSize: "13px", display: "flex", alignItems: "center", gap: "8px" }}
              onClick={() => fileInputRef.current.click()}
            >
              📎 Прикачи документ (PDF, Word, JPG)
            </button>

            {attachments.length > 0 && (
              <div className="file-list" style={{ marginTop: "10px" }}>
                {attachments.map((file, index) => (
                  <div key={index} className="file-chip" style={chipStyle}>
                    <span style={{ fontSize: "12px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {file.name} ({(file.size / 1024).toFixed(1)} KB)
                    </span>
                    <button 
                      onClick={() => removeAttachment(index)} 
                      style={removeBtnStyle}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="compose-footer">
          <button className="btn btn-ghost" onClick={handleClear}>Исчисти</button>
          <button className="btn btn-primary" onClick={handleSend}>Испрати телеграма →</button>
        </div>
      </div>
    </div>
  );
}

const chipStyle = {
  display: "inline-flex",
  alignItems: "center",
  background: "#f0f0f0",
  padding: "4px 10px",
  borderRadius: "4px",
  marginRight: "8px",
  marginBottom: "8px",
  border: "1px solid #ddd",
  maxWidth: "250px"
};

const removeBtnStyle = {
  background: "none",
  border: "none",
  color: "#ff4d4f",
  marginLeft: "8px",
  cursor: "pointer",
  fontWeight: "bold"
};