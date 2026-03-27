import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../../index.css";
import "./Compose.css";
 
const generateRef = () => {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  const n = String(Math.floor(Math.random() * 900) + 100);
  return `TEL-${y}-${m}${d}-${n}`;
};
 
const OE_OPTIONS = [
  { value: "OE-01", label: "OE-01 — Centrala" },
  { value: "OE-02", label: "OE-02 — Finansii" },
  { value: "OE-03", label: "OE-03 — Logistika" },
  { value: "OE-04", label: "OE-04 — Pravni raboti" },
  { value: "OE-05", label: "OE-05 — Izvrsni" },
];
 
const PRIORITY_OPTIONS = [
  { value: "NORMAL", label: "Нормален" },
  { value: "URGENT", label: "Итен" },
  { value: "FLASH",  label: "Премногу важно" },
];
 
const CLASSIFICATION_OPTIONS = [
  { value: "INTERNAL",              label: "Интерно" },
  { value: "CONFIDENTIAL",          label: "Доверливо" },
  { value: "STRICTLY_CONFIDENTIAL", label: "Строго доверливо" },
];
 
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
 
export default function Compose() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
 
  const [shifraOe, setShifraOe]                       = useState("");
  const [datumObjava, setDatumObjava]                 = useState("");
  const [datumVaznost, setDatumVaznost]               = useState("");
  const [prioritetShifra, setPrioritetShifra]         = useState("NORMAL");
  const [klasifikacijaShifra, setKlasifikacijaShifra] = useState("INTERNAL");
  const [isprakjac, setIsprakjac]                     = useState("");
  const [brojNaAkt, setBrojNaAkt]                     = useState("");
 
  const [emailInput, setEmailInput] = useState("");
  const [emails, setEmails]         = useState([]);
  const [emailError, setEmailError] = useState("");
 
  const [attachments, setAttachments] = useState([]);
 
  const [submitted, setSubmitted] = useState(false);
  const [error, setError]         = useState("");
  const [refNo]                   = useState(generateRef);
 
  const addEmail = () => {
    const val = emailInput.trim();
    if (!val) return;
    if (!isValidEmail(val)) { setEmailError("Невалидна e-mail адреса."); return; }
    if (emails.includes(val)) { setEmailError("Оваа адреса е веќе додадена."); return; }
    setEmails((prev) => [...prev, val]);
    setEmailInput("");
    setEmailError("");
  };
 
  const handleEmailKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addEmail();
    }
    if (e.key === "Backspace" && emailInput === "" && emails.length > 0) {
      setEmails((prev) => prev.slice(0, -1));
    }
  };
 
  const removeEmail = (idx) => setEmails((prev) => prev.filter((_, i) => i !== idx));
 
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setAttachments((prev) => [...prev, ...files]);
    e.target.value = null;
  };
 
  const removeAttachment = (index) =>
    setAttachments((prev) => prev.filter((_, i) => i !== index));
 
  const handleSend = () => {
    if (!shifraOe || !datumObjava || !datumVaznost || !isprakjac || !brojNaAkt) {
      setError("Ве молиме пополнете ги сите задолжителни полиња.");
      return;
    }
    if (emails.length === 0 && !emailInput.trim()) {
      setError('Додадете барем една e-mail адреса во полето "Испрати до".');
      return;
    }
    if (emailInput.trim()) {
      if (!isValidEmail(emailInput.trim())) {
        setEmailError("Невалидна e-mail адреса.");
        return;
      }
      setEmails((prev) => [...prev, emailInput.trim()]);
      setEmailInput("");
    }
    setError("");
    setSubmitted(true);
  };
 
  const handleClear = () => {
    setShifraOe(""); setDatumObjava(""); setDatumVaznost("");
    setPrioritetShifra("NORMAL"); setKlasifikacijaShifra("INTERNAL");
    setIsprakjac(""); setBrojNaAkt("");
    setEmails([]); setEmailInput(""); setEmailError("");
    setAttachments([]);
    setError(""); setSubmitted(false);
  };
 
  if (submitted) {
    return (
      <div className="compose-page">
        <div className="compose-success">
          <span className="compose-success-icon">✅</span>
          <div>
            <strong>Телеграма е успешно испратена.</strong>
            <div style={{ fontSize: 12, marginTop: 4 }}>Референтен број: {refNo}</div>
            <div style={{ fontSize: 11, opacity: 0.7 }}>
              Примачи: {emails.join(", ")}
            </div>
            <div style={{ fontSize: 11, opacity: 0.7 }}>
              Приложени датотеки: {attachments.length}
            </div>
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
 
          <div className="form-row">
            <div className="compose-field">
              <label>Шифра на ОЕ <span className="req">*</span></label>
              <select value={shifraOe} onChange={(e) => setShifraOe(e.target.value)}>
                <option value="">— Изберете OE —</option>
                {OE_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
 
            <div className="compose-field">
              <label>Испраќач <span className="req">*</span></label>
              <input
                type="text"
                value={isprakjac}
                onChange={(e) => setIsprakjac(e.target.value)}
                placeholder="Име и презиме / назив..."
              />
            </div>
          </div>
 
          <div className="compose-field">
            <label>Акт број <span className="req">*</span></label>
            <input
              type="text"
              value={brojNaAkt}
              onChange={(e) => setBrojNaAkt(e.target.value)}
              placeholder="пр. AKT-2024-001"
            />
          </div>
 
          <div className="form-row">
            <div className="compose-field">
              <label>Датум на објава <span className="req">*</span></label>
              <input
                type="date"
                value={datumObjava}
                onChange={(e) => setDatumObjava(e.target.value)}
              />
            </div>
 
            <div className="compose-field">
              <label>Датум на важност <span className="req">*</span></label>
              <input
                type="date"
                value={datumVaznost}
                onChange={(e) => setDatumVaznost(e.target.value)}
              />
            </div>
          </div>
 
          <div className="form-row">
            <div className="compose-field">
              <label>Приоритет</label>
              <select value={prioritetShifra} onChange={(e) => setPrioritetShifra(e.target.value)}>
                {PRIORITY_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
 
            <div className="compose-field">
              <label>Класификација</label>
              <select value={klasifikacijaShifra} onChange={(e) => setKlasifikacijaShifra(e.target.value)}>
                {CLASSIFICATION_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
          </div>
 
          <div className="attachment-section">
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
              className="btn btn-ghost btn-attach"
              onClick={() => fileInputRef.current.click()}
            >
              📎 Прикачи документ (PDF, Word, JPG)
            </button>
 
            {attachments.length > 0 && (
              <div className="file-list">
                {attachments.map((file, index) => (
                  <div key={index} className="file-chip">
                    <span className="file-name">{file.name}</span>
                    <span className="file-size">({(file.size / 1024).toFixed(1)} KB)</span>
                    <button
                      onClick={() => removeAttachment(index)}
                      className="btn-remove-file"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
 
          <div className="compose-field">
            <label>Испрати до (e-mail адреси) <span className="req">*</span></label>
            <div className={`email-chip-box${emailError ? " email-chip-box--error" : ""}`}>
              {emails.map((email, idx) => (
                <span key={idx} className="email-chip">
                  {email}
                  <button onClick={() => removeEmail(idx)} className="email-chip-remove">✕</button>
                </span>
              ))}
              <input
                className="email-chip-input"
                type="text"
                value={emailInput}
                onChange={(e) => { setEmailInput(e.target.value); setEmailError(""); }}
                onKeyDown={handleEmailKeyDown}
                onBlur={() => { if (emailInput.trim()) addEmail(); }}
                placeholder={emails.length === 0 ? "Внесете e-mail и притиснете Enter..." : ""}
              />
            </div>
            {emailError && <span className="field-error">{emailError}</span>}
            <span className="field-hint">Притиснете Enter или запирка за да додадете повеќе адреси.</span>
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