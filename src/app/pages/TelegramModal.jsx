import { useEffect, useState } from "react";
import { getTelegramById } from "../../api/api";
import "./TelegramModal.css";

export default function TelegramModal({ telegramaId, onClose }) {
  const [data, setData]       = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState("");

  useEffect(() => {
    if (!telegramaId) return;
    setLoading(true);
    setError("");
    getTelegramById(telegramaId)
      .then((d) => { setData(d); setLoading(false); })
      .catch(() => { setError("Грешка при вчитување на телеграмата."); setLoading(false); });
  }, [telegramaId]);

  function handleBackdrop(e) {
    if (e.target === e.currentTarget) onClose();
  }

  return (
    <div className="tm-backdrop" onClick={handleBackdrop}>
      <div className="tm-modal">

        <div className="tm-header">
          <div className="tm-header-left">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2">
              <path d="M4 4h16v16H4z"/><path d="M4 9h16"/>
            </svg>
            <span className="tm-title">Детали за телеграма</span>
          </div>
          <button className="tm-close" onClick={onClose}>✕</button>
        </div>

        <div className="tm-body">

          {loading && (
            <div className="tm-state">
              <div className="tm-spinner" />
              Се вчитуваат деталите...
            </div>
          )}

          {error && <div className="tm-error">{error}</div>}

          {data && !loading && (
            <>
              {/* ID pill */}
              <div className="tm-id-row">
                <span className="tm-id-label">Телеграма</span>
                <span className="tm-id-value">#{data.telegramaId}</span>
              </div>

              {/* Main grid */}
              <div className="tm-grid">
                <Field label="Шифра на ОЕ"     value={data.shifraOe} />
                <Field label="Број на акт"      value={data.brojNaAkt} />
                <Field label="Испраќач"         value={data.isprakjac} />
                <Field label="Испрати до"       value={data.ispratiDo} />
                <Field label="Датум на објава"  value={formatDate(data.datumObjava)} />
                <Field label="Датум на важност" value={formatDate(data.datumVaznost)} />
                <Field label="Приоритет"        value={data.prioritetShifra} badge />
                <Field label="Класификација"    value={data.klasifikacijaShifra} />
                <Field label="Време креирано"   value={formatDateTime(data.vremeKreirano)} full />
              </div>

              {/* Documents */}
              {data.dokumenti && data.dokumenti.length > 0 && (
                <div className="tm-section">
                  <div className="tm-section-title">
                    Прикачени документи
                    <span className="tm-doc-count">{data.dokumenti.length}</span>
                  </div>
                  <div className="tm-docs">
                    {data.dokumenti.map((doc, i) => (
                      <div key={doc.id ?? i} className="tm-doc-row">
                        <div className="tm-doc-icon">
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth="2">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12
                              a2 2 0 0 0 2-2V8z"/>
                            <polyline points="14 2 14 8 20 8"/>
                          </svg>
                        </div>
                        <span className="tm-doc-name">
                          {doc.imeNaDokument ?? doc.fileName ?? `Документ ${i + 1}`}
                        </span>
                        {doc.url && (
                          <a href={doc.url} target="_blank" rel="noreferrer"
                            className="tm-doc-link">
                            Преземи ↓
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {data.dokumenti && data.dokumenti.length === 0 && (
                <div className="tm-section">
                  <div className="tm-section-title">Прикачени документи</div>
                  <div className="tm-no-docs">Нема прикачени документи.</div>
                </div>
              )}
            </>
          )}
        </div>

      </div>
    </div>
  );
}

/* ── helpers ── */
function Field({ label, value, badge, full }) {
  if (!value) return null;
  return (
    <div className={`tm-field${full ? " tm-field-full" : ""}`}>
      <div className="tm-field-label">{label}</div>
      {badge
        ? <span className="tm-badge">{value}</span>
        : <div className="tm-field-value">{value}</div>
      }
    </div>
  );
}

function formatDate(d) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("mk-MK", {
    day: "2-digit", month: "2-digit", year: "numeric"
  });
}

function formatDateTime(dt) {
  if (!dt) return "—";
  return new Date(dt).toLocaleString("mk-MK", {
    day: "2-digit", month: "2-digit", year: "numeric",
    hour: "2-digit", minute: "2-digit"
  });
}