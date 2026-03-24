import { useState } from "react";
import "../../index.css";
import "./Login.css"

const MOCK_USERS = [
  {
    username: "user1",
    password: "mvrmvr",
    name: "User1",
    role: "User",
    dept: "Operations",
    avatar: "MH",
  },
]

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);

  const handleSubmit = () => {
    setError("");
    if (!username || !password) {
      setError("Please enter your username and password.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const user = MOCK_USERS.find(
        (u) => u.username === username && u.password === password
      );
      if (user) {
        onLogin(user);
      } else {
        setError("Invalid username or password. Please try again.");
        setLoading(false);
      }
    }, 600);
  };

  const handleKey = (e) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <div className="login-bg">
      <div className="login-wrapper">

        <div className="login-left">
          <div>
            <div className="brand">
              <div className="brand-line" />
              <div className="brand-name">Telegram Hub</div>
              <div className="brand-tagline">Internal Telegram System</div>
            </div>
          </div>
        </div>

        <div className="login-right">
          <div className="login-title"><strong>Најавете се</strong></div>
          <div className="login-sub">Внесете ги вашите податоци за пристап до системот.</div>

          {error && <div className="error-msg">{error}</div>}

          <div className="field">
            <label>Корисничко име</label>
            <input
              type="text"
              value={username}
              className={error ? "input-error" : ""}
              onChange={(e) => { setUsername(e.target.value); setError(""); }}
              onKeyDown={handleKey}
              autoFocus
            />
          </div>

          <div className="field">
            <label>Лозинка</label>
            <input
              type="password"
              value={password}
              className={error ? "input-error" : ""}
              onChange={(e) => { setPassword(e.target.value); setError(""); }}
              onKeyDown={handleKey}
            />
          </div>

          <button className="submit-btn" onClick={handleSubmit} disabled={loading}>
            {loading ? "Signing in…" : "Sign In"}
          </button>

          <div className="demo-hint">
            Username: <strong>user1</strong> &nbsp;·&nbsp; Password: <strong>mvrmvr</strong>
          </div>
        </div>

      </div>
    </div>
  );
}