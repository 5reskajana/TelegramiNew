import React from "react";
import { useNavigate } from "react-router-dom";
import "../../index.css";
import "./Dashboard.css";
import { 
  CURRENT_USER, 
  MOCK_TELEGRAMS, 
  PRIORITY_CONFIG, 
  STATUS_CONFIG, 
  formatDate 
} from "../../data/Mockdata";

export default function Dashboard() {
  const navigate = useNavigate();

  const inbox  = MOCK_TELEGRAMS.filter((t) => t.folder === "inbox");
  const unread = inbox.filter((t) => t.status === "UNREAD");
  const sent   = MOCK_TELEGRAMS.filter((t) => t.folder === "sent");
  const drafts = MOCK_TELEGRAMS.filter((t) => t.folder === "drafts");
  const recent = [...inbox].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);

  const activity = [
    { icon: "📨", text: <><strong>Јане Колев</strong> ви испрати телеграма со ознака <strong>ИТНО</strong></>, time: "09:14" },
    { icon: "✅", text: <>Вашата телеграма до <strong>Томо Томоски</strong> е доставена</>, time: "Вчера" },
    { icon: "✏️", text: <>Зачуван нацрт: <strong>„Предлог за реструктуирање на персоналот"</strong></>, time: "08:00" },
    { icon: "📬", text: <><strong>Елена Васева</strong> испрати телеграма во врска со договорите за добавувачи</>, time: "5 Март" },
  ];

  return (
    <div className="dashboard-page">
      <div className="page-header">
        <h1>Добредојде, {CURRENT_USER.name.split(" ")[0]}.</h1>
      </div>

      {/* ── STATS ── */}
      <div className="stats-grid">
        <div className="stat-card accent-red" onClick={() => navigate("/inbox")}>
          <div className="stat-label">Активни</div>
          <div className={`stat-value ${unread.length > 0 ? "urgent" : ""}`}>{unread.length}</div>
          <div className="stat-sub">во твоето сандаче</div>
        </div>
        <div className="stat-card accent-navy" onClick={() => navigate("/inbox")}>
          <div className="stat-label">Сандаче</div>
          <div className="stat-value">{inbox.length}</div>
          <div className="stat-sub">вкупно добиени</div>
        </div>
        <div className="stat-card" onClick={() => navigate("/sent")}>
          <div className="stat-label">Испратени</div>
          <div className="stat-value">{sent.length}</div>
          <div className="stat-sub">вкупно испратени</div>
        </div>
        <div className="stat-card accent-green" onClick={() => navigate("/drafts")}>
          <div className="stat-label">Нацрти (Drafts)</div>
          <div className="stat-value">{drafts.length}</div>
          <div className="stat-sub">чекаат довршување</div>
        </div>
      </div>

      {/* ── MAIN GRID ── */}
      <div className="dash-grid">
        <div className="card">
          <div className="card-header">
            <span className="card-title">Сандаче</span>
            <button 
              className="btn btn-ghost" 
              style={{ fontSize: 11, padding: "5px 12px" }}
              onClick={() => navigate("/inbox")}
            >
              Види ги сите
            </button>
          </div>
          {recent.map((t) => {
            const p = PRIORITY_CONFIG[t.priority];
            const s = STATUS_CONFIG[t.status];
            return (
              <div key={t.id} className={`tele-row ${t.status === "UNREAD" ? "unread" : ""}`}>
                <div className="tele-dot" style={{ background: s.dot }} />
                <div className="tele-info">
                  <div className="tele-meta">
                    <span className="tele-from">{t.from.name}</span>
                    <span className="tele-dept">{t.from.dept}</span>
                  </div>
                  <div className="tele-subject">{t.subject}</div>
                  <div className="tele-preview">{t.body}</div>
                </div>
                <div className="tele-right">
                  <span className="tele-date">{formatDate(t.date)}</span>
                  <span className="priority-badge" style={{ color: p.color, background: p.bg }}>
                    {p.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="right-col">
          <div className="card">
            <div className="card-header">
              <span className="card-title">Последни активности</span>
            </div>
            {activity.map((a, i) => (
              <div key={i} className="activity-item">
                <div className="activity-icon">{a.icon}</div>
                <div className="activity-text">{a.text}</div>
                <div className="activity-time">{a.time}</div>
              </div>
            ))}
          </div>

          <div className="card">
            <div className="quick-actions">
              {[
                { label: "Испрати нова телеграма", path: "/compose", primary: true },
                { label: "Види сандаче",           path: "/inbox"                  },
                { label: "Отвори нацрти",          path: "/drafts"                 },
                { label: "Архивирани телеграми",   path: "/archived"               },
              ].map((a) => (
                <button
                  key={a.path}
                  className={`btn ${a.primary ? "btn-primary" : "btn-ghost"}`}
                  style={{ justifyContent: "center" }}
                  onClick={() => navigate(a.path)}
                >
                  {a.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}