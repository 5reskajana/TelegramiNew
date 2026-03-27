import React, { useState, useEffect } from "react";
import { getAllActive } from "../../../src/api/api"; // adjust path
import "./AllTelegramsModal.css";

export default function AllTelegramsModal({ onClose }) {
  const [telegrams, setTelegrams] = useState([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState(null);
  const [filter, setFilter]       = useState("all"); // "all" | "active" | "inactive"

  useEffect(() => {
    getAllActive()
      .then((data) => { setTelegrams(data); setLoading(false); })
      .catch((err) => { setError("Грешка при вчитување."); setLoading(false); });
  }, []);

  const filtered = telegrams.filter((t) => {
    if (filter === "active")   return t.status === "UNREAD";
    if (filter === "inactive") return t.status !== "UNREAD";
    return true;
  });

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>

        {/* Header */}
        <div className="modal-header">
          <h2>Сите телеграми</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        {/* Filter pills */}
        <div className="modal-pills">
          {["all", "active", "inactive"].map((f) => (
            <button
              key={f}
              className={`pill ${filter === f ? "pill-active" : ""}`}
              onClick={() => setFilter(f)}
            >
              {{ all: "Сите", active: "Активни", inactive: "Неактивни" }[f]}
            </button>
          ))}
          <span className="modal-count">{filtered.length} телеграми</span>
        </div>

        {/* Body */}
        <div className="modal-body">
          {loading && <div className="modal-state">Се вчитува...</div>}
          {error   && <div className="modal-state error">{error}</div>}
          {!loading && !error && filtered.length === 0 && (
            <div className="modal-state">Нема телеграми.</div>
          )}
          {!loading && !error && filtered.map((t, i) => {
            const active = t.status === "UNREAD";
            return (
              <div key={t.id ?? i} className={`tele-row ${active ? "unread" : ""}`}>
                <div className="tele-info">
                  <div className="tele-meta">
                    <span className="tele-from">{t.from?.name ?? t.sender}</span>
                    <span className="tele-dept">{t.from?.dept ?? t.department}</span>
                  </div>
                  <div className="tele-subject">{t.subject}</div>
                </div>
                <div className="tele-right">
                  <span className="status-badge" data-active={active}>
                    {active ? "Активна" : "Неактивна"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}