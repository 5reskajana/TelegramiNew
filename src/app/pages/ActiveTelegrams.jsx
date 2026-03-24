import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../index.css";
import "./ActiveTelegrams.css";
import { getAllActive } from "../../api/api";

export default function ActiveTelegrams() {
  const navigate = useNavigate();

  const [departments, setDepartments] = useState([]);
  const [loading,     setLoading]     = useState(true);
  const [error,       setError]       = useState("");
  const [search,      setSearch]      = useState("");

  useEffect(() => {
    getAllActive()
      .then((data) => {
        setDepartments(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Грешка при вчитување на податоците. Проверете ја врската.");
        setLoading(false);
      });
  }, []);

  const filtered = departments.filter((d) => {
    const q = search.toLowerCase();
    return (
      d.naziv.toLowerCase().includes(q) ||
      d.skratenNaziv.toLowerCase().includes(q) ||
      d.shifra.toLowerCase().includes(q)
    );
  });

  return (
    <div className="active-page">

      <div className="active-header">
        <div>
          <h1>Активни единици</h1>
          <p>Преглед на сите активни организациски единици.</p>
        </div>
        <button className="btn btn-ghost" onClick={() => navigate(-1)}>
          ← Назад
        </button>
      </div>

      <div className="active-toolbar">
        <input
          className="active-search"
          type="text"
          placeholder="Пребарај по назив, шифра..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {!loading && !error && (
          <span className="active-count">
            {filtered.length} од {departments.length} единици
          </span>
        )}
      </div>

      <div className="active-card">
        {loading && (
          <div className="active-loading">
            <div className="active-loading-spinner" />
            Се вчитуваат податоците...
          </div>
        )}

        {error && (
          <div className="active-error">{error}</div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <div className="active-empty">Нема резултати за „{search}".</div>
        )}

        {!loading && !error && filtered.length > 0 && (
          <table className="active-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Шифра</th>
                <th>Кратенка</th>
                <th>Назив</th>
                <th>Статус</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((d) => (
                <tr key={d.id}>
                  <td className="td-id">{d.id}</td>
                  <td className="td-shifra">{d.shifra}</td>
                  <td className="td-short">{d.skratenNaziv}</td>
                  <td className="td-naziv">{d.naziv}</td>
                  <td>
                    <span className="status-badge active">
                      <span className="status-badge-dot" />
                      {d.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

    </div>
  );
}