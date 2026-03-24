import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "../../index.css";
import "./Dashboard.css";
import {
  CURRENT_USER,
  MOCK_TELEGRAMS,
  STATUS_CONFIG,
  formatDate
} from "../../data/Mockdata";
 
export default function Dashboard() {
  const navigate = useNavigate();
 
  const [search,         setSearch]         = useState("");
  const [filterStatus,   setFilterStatus]   = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");
 
  const inbox    = MOCK_TELEGRAMS.filter((t) => t.folder === "inbox");
  const unread   = inbox.filter((t) => t.status === "UNREAD");
  const archived = MOCK_TELEGRAMS.filter((t) => t.folder === "archived");
 
  const filtered = useMemo(() => {
    return [...inbox]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .filter((t) => {
        const q = search.toLowerCase();
        const matchSearch =
          !q ||
          t.subject.toLowerCase().includes(q) ||
          t.from.name.toLowerCase().includes(q) ||
          t.from.dept.toLowerCase().includes(q) ||
          (t.code && t.code.toLowerCase().includes(q));
 
        const matchStatus =
          filterStatus === "all" ||
          (filterStatus === "active"   && t.status === "UNREAD") ||
          (filterStatus === "inactive" && t.status !== "UNREAD");
 
        const matchPriority =
          filterPriority === "all" || t.priority === filterPriority;
 
        return matchSearch && matchStatus && matchPriority;
      });
  }, [inbox, search, filterStatus, filterPriority]);
 
  function getInitials(name = "") {
    return name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
  }
 
  const avatarColors = [
    { bg: "#dbeafe", color: "#1d4ed8" },
    { bg: "#dcfce7", color: "#15803d" },
    { bg: "#fce7f3", color: "#be185d" },
    { bg: "#ede9fe", color: "#6d28d9" },
    { bg: "#ffedd5", color: "#c2410c" },
    { bg: "#cffafe", color: "#0e7490" },
  ];
  function getAvatarColor(i) { return avatarColors[i % avatarColors.length]; }
 
  const activeFilters =
    (filterStatus !== "all" ? 1 : 0) +
    (filterPriority !== "all" ? 1 : 0);
 
  function clearFilters() {
    setFilterStatus("all");
    setFilterPriority("all");
    setSearch("");
  }
 
  return (
    <div className="dashboard-page">
 
      {/* ── HEADER ── */}
      <div className="page-header">
        <div>
          <h1>Добредојде, {CURRENT_USER.name.split(" ")[0]}.</h1>
          <p>Управувај со твоите телеграми</p>
        </div>
      </div>
 
      {/* ── STATS ── */}
      <div className="stats-grid">
        <div className="stat-card stat-active" onClick={() => navigate("/inbox")}>
          <div className="stat-icon-wrap">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4h16v16H4z"/><path d="M4 9h16"/>
            </svg>
          </div>
          <div className="stat-value">{unread.length}</div>
          <div className="stat-label">Активни телеграми</div>
          <div className="stat-sub">непрочитани во сандаче</div>
        </div>
 
        <div className="stat-card stat-inactive" onClick={() => navigate("/archived")}>
          <div className="stat-icon-wrap">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 8v13H3V8"/><path d="M1 3h22v5H1z"/><line x1="10" y1="12" x2="14" y2="12"/>
            </svg>
          </div>
          <div className="stat-value">{archived.length}</div>
          <div className="stat-label">Неактивни телеграми</div>
          <div className="stat-sub">архивирани</div>
        </div>
      </div>
 
      {/* ── QUICK ACTIONS ── */}
      <div className="quick-actions-bar">
        <button className="btn btn-primary" onClick={() => navigate("/compose")}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          Испрати нова телеграма
        </button>
        <button className="btn btn-ghost" onClick={() => navigate("/inbox")}>Види сандаче</button>
        <button className="btn btn-ghost" onClick={() => navigate("/drafts")}>Отвори нацрти</button>
        <button className="btn btn-ghost" onClick={() => navigate("/archived")}>Архивирани телеграми</button>
      </div>
 
      {/* ── INBOX CARD ── */}
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
 
        {/* ── SEARCH + FILTERS ── */}
        <div className="search-filter-bar">
          <div className="search-wrap">
            <svg className="search-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              className="search-input"
              type="text"
              placeholder="Пребарај по единица, испраќач, шифра..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button className="search-clear" onClick={() => setSearch("")}>✕</button>
            )}
          </div>
 
          <div className="filters-wrap">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: "var(--muted)", flexShrink: 0 }}>
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
            </svg>
 
            <select
              className="filter-select"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">Сите статуси</option>
              <option value="active">Активни</option>
              <option value="inactive">Неактивни</option>
            </select>
 
            <select
              className="filter-select"
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
            >
              <option value="all">Сите приоритети</option>
              <option value="URGENT">Итно</option>
              <option value="NORMAL">Редовно</option>
              <option value="LOW">Ниско</option>
            </select>
 
            {(activeFilters > 0 || search) && (
              <button className="btn-clear-filters" onClick={clearFilters}>
                Исчисти
                {activeFilters > 0 && (
                  <span className="filter-count">{activeFilters}</span>
                )}
              </button>
            )}
          </div>
        </div>
 
        {/* ── RESULTS INFO ── */}
        {(search || filterStatus !== "all" || filterPriority !== "all") && (
          <div className="results-info">
            Прикажани <strong>{filtered.length}</strong> од <strong>{inbox.length}</strong> телеграми
          </div>
        )}
 
        {/* ── TELEGRAM ROWS ── */}
        {filtered.length === 0 ? (
          <div className="empty-state">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <p>Нема пронајдени телеграми</p>
          </div>
        ) : (
          filtered.map((t, i) => {
            const active = t.status === "UNREAD";
            const av     = getAvatarColor(i);
            return (
              <div key={t.id} className={`tele-row ${active ? "unread" : ""}`}>
                <div className="tele-avatar" style={{ background: av.bg, color: av.color }}>
                  {getInitials(t.from.name)}
                </div>
                <div className="tele-info">
                  <div className="tele-meta">
                    <span className="tele-from">{t.from.name}</span>
                    <span className="tele-dept">{t.from.dept}</span>
                    {t.code && <span className="tele-code">{t.code}</span>}
                  </div>
                  <div className="tele-subject">{t.subject}</div>
                  <div className="tele-preview">{t.body}</div>
                </div>
                <div className="tele-right">
                  <span className="tele-date">{formatDate(t.date)}</span>
                  <span className="status-badge" data-active={active}>
                    {active ? "Активна" : "Неактивна"}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
 