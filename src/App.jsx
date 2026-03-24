import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./app/pages/Login";
import Dashboard from "./app/pages/Dashboard";
import Compose from "./app/pages/Compose";

function App() {
  const [user, setUser] = useState(null);

  if (!user) {
    return <Login onLogin={setUser} />;
  }

  return (
    <Router>
      <Routes>
        {/* Redirect empty path to dashboard */}
        <Route path="/" element={<Navigate to="/dashboard" />} />
        
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/compose" element={<Compose />} />
        
        {/* Catch-all for 404s */}
        <Route path="*" element={
          <div style={{ padding: 32 }}>
            <p>Страницата не е пронајдена.</p>
            <button onClick={() => window.location.href="/"}>← Назад</button>
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;