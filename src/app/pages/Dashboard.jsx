import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "../../index.css";
import "./Dashboard.css";
import TelegramModal from "../pages/TelegramModal";
import AllTelegramsModal from "../pages/AllTelegramsModal";
import {
  CURRENT_USER,
  MOCK_TELEGRAMS,
  STATUS_CONFIG,
  formatDate
} from "../../data/Mockdata";

export default function Dashboard() {
  const navigate = useNavigate();

  // ── FILTER STATE ──
  const [search,       setSearch]       = useState("");
  const [brojNaAkt,    setBrojNaAkt]    = useState("");
  const [sifra,        setSifra]        = useState("");
  const [periodOd,     setPeriodOd]     = useState("");
  const [periodDo,     setPeriodDo]     = useState("");
  const [quickFilter,  setQuickFilter]  = useState("all"); // "all" | "active"
  const [filtersOpen,  setFiltersOpen]  = useState(false);
  const [selectedId,   setSelectedId]   = useState(null);
  const [showAllModal, setShowAllModal] = useState(false);

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

        const matchBroj =
          !brojNaAkt ||
          (t.actNumber && t.actNumber.toLowerCase().includes(brojNaAkt.toLowerCase()));

        const matchSifra =
          !sifra ||
          (t.code && t.code.toLowerCase().includes(sifra.toLowerCase()));

        const tDate = new Date(t.date);
        const matchPeriodOd = !periodOd || tDate >= new Date(periodOd);
        const matchPeriodDo = !periodDo || tDate <= new Date(periodDo + "T23:59:59");

        const matchQuick =
          quickFilter === "all" ||
          (quickFilter === "active" && t.status === "UNREAD");

        return matchSearch && matchBroj && matchSifra && matchPeriodOd && matchPeriodDo && matchQuick;
      });
  }, [inbox, search, brojNaAkt, sifra, periodOd, periodDo, quickFilter]);

  const hasAdvancedFilters = brojNaAkt || sifra || periodOd || periodDo;
  const activeFilterCount  =
    (brojNaAkt ? 1 : 0) + (sifra ? 1 : 0) +
    (periodOd || periodDo ? 1 : 0) + (quickFilter !== "all" ? 1 : 0);

  function clearAllFilters() {
    setSearch(""); setBrojNaAkt(""); setSifra("");
    setPeriodOd(""); setPeriodDo(""); setQuickFilter("all");
  }

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
        
        </div>

        <div className="stat-card stat-inactive" onClick={() => navigate("/archived")}>
          <div className="stat-icon-wrap">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 8v13H3V8"/><path d="M1 3h22v5H1z"/><line x1="10" y1="12" x2="14" y2="12"/>
            </svg>
          </div>
          <div className="stat-value">{archived.length}</div>
          <div className="stat-label">Неактивни телеграми</div>
         
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
      
      </div>

      {/* ── INBOX CARD ── */}
      <div className="card">
        <div className="card-header">
          <span className="card-title">Сандаче</span>
          <button className="btn btn-ghost" style={{ fontSize: 11, padding: "5px 12px" }}
            onClick={() => setShowAllModal(true)}>
            Види ги сите
</button>
        </div>

        {/* ── SEARCH BAR ── */}
        <div className="search-filter-bar">
          <div className="search-wrap">
            <svg className="search-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              className="search-input"
              type="text"
              placeholder="Пребарај по испраќач, наслов, единица..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && <button className="search-clear" onClick={() => setSearch("")}>✕</button>}
          </div>

          {/* ── QUICK FILTER PILLS ── */}
          <div className="quick-pills">
            <button
              className={`pill ${quickFilter === "all" ? "pill-active" : ""}`}
              onClick={() => setQuickFilter("all")}
            >
              Сите
            </button>
            <button
              className={`pill ${quickFilter === "active" ? "pill-active" : ""}`}
              onClick={() => setQuickFilter("active")}
            >
              Активни
            </button>
          </div>

          {/* ── TOGGLE ADVANCED FILTERS ── */}
          <button
            className={`btn-filter-toggle ${filtersOpen ? "open" : ""} ${hasAdvancedFilters ? "has-filters" : ""}`}
            onClick={() => setFiltersOpen((v) => !v)}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
            </svg>
            Филтри
            {activeFilterCount > 0 && <span className="filter-count">{activeFilterCount}</span>}
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
              style={{ marginLeft: 2, transition: "transform 0.2s", transform: filtersOpen ? "rotate(180deg)" : "rotate(0deg)" }}>
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </button>
        </div>

        {/* ── ADVANCED FILTERS PANEL ── */}
        {filtersOpen && (
          <div className="advanced-filters">
            <div className="adv-filters-grid">

              <div className="adv-field">
                <label>Број на акт</label>
                <input
                  type="text"
                  placeholder="пр. 2024/0042"
                  value={brojNaAkt}
                  onChange={(e) => setBrojNaAkt(e.target.value)}
                />
              </div>

              <div className="adv-field">
                <label>Шифра</label>
                <input
                  type="text"
                  placeholder="пр. FIN-001"
                  value={sifra}
                  onChange={(e) => setSifra(e.target.value)}
                />
              </div>

              <div className="adv-field">
                <label>Период — од</label>
                <input
                  type="date"
                  value={periodOd}
                  onChange={(e) => setPeriodOd(e.target.value)}
                />
              </div>

              <div className="adv-field">
                <label>Период — до</label>
                <input
                  type="date"
                  value={periodDo}
                  onChange={(e) => setPeriodDo(e.target.value)}
                />
              </div>

            </div>

            {activeFilterCount > 0 && (
              <button className="btn-clear-filters" onClick={clearAllFilters}>
                Исчисти ги сите филтри
                <span className="filter-count">{activeFilterCount}</span>
              </button>
            )}
          </div>
        )}

        {/* ── RESULTS INFO ── */}
        {(search || activeFilterCount > 0) && (
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
              <div
                key={t.id}
                className={`tele-row ${active ? "unread" : ""}`}
                onClick={() => setSelectedId(t.telegramaId ?? t.id)}
              >
                <div className="tele-avatar" style={{ background: av.bg, color: av.color }}>
                  {getInitials(t.from.name)}
                </div>
                <div className="tele-info">
                  <div className="tele-meta">
                    <span className="tele-from">{t.from.name}</span>
                    <span className="tele-dept">{t.from.dept}</span>
                    {t.code      && <span className="tele-code">{t.code}</span>}
                    {t.actNumber && <span className="tele-act">Акт: {t.actNumber}</span>}
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

      {/* ── TELEGRAM MODAL ── */}
      {selectedId && (
        <TelegramModal
          telegramaId={selectedId}
          onClose={() => setSelectedId(null)}
        />
      )}

      {/* ── ALL TELEGRAMS MODAL ── */}        
      {showAllModal && (
        <AllTelegramsModal onClose={() => setShowAllModal(false)} />
      )}

    </div>
  );
}