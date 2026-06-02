import { useState } from "react";

const API_BASE = "http://localhost:8081";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --ink: #0f0e0d;
    --paper: #f5f2ec;
    --paper2: #ede9e0;
    --accent: #c84b2f;
    --accent2: #e8954a;
    --muted: #7a7060;
    --border: #c8c0b0;
    --success: #2e6b45;
    --card: #faf8f4;
    --radius: 4px;
    --serif: 'DM Serif Display', Georgia, serif;
    --sans: 'DM Sans', sans-serif;
  }

  body { background: var(--paper); font-family: var(--sans); color: var(--ink); min-height: 100vh; }

  .app {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background:
      radial-gradient(ellipse 80% 60% at 10% 0%, rgba(200,75,47,0.06) 0%, transparent 60%),
      radial-gradient(ellipse 60% 50% at 90% 100%, rgba(232,149,74,0.07) 0%, transparent 60%),
      var(--paper);
  }

  /* ---- header ---- */
  .header {
    border-bottom: 1px solid var(--border);
    padding: 0 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 64px;
    background: rgba(245,242,236,0.85);
    backdrop-filter: blur(8px);
    position: sticky;
    top: 0;
    z-index: 10;
  }
  .logo {
    font-family: var(--serif);
    font-size: 22px;
    color: var(--ink);
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .logo-dot { width: 8px; height: 8px; background: var(--accent); border-radius: 50%; }
  .nav { display: flex; gap: 4px; }
  .nav-btn {
    font-family: var(--sans);
    font-size: 13px;
    font-weight: 500;
    padding: 6px 16px;
    border-radius: 20px;
    border: none;
    cursor: pointer;
    background: transparent;
    color: var(--muted);
    transition: all 0.18s;
    letter-spacing: 0.01em;
  }
  .nav-btn:hover { background: var(--paper2); color: var(--ink); }
  .nav-btn.active { background: var(--ink); color: var(--paper); }

  /* ---- hero ---- */
  .hero {
    padding: 72px 40px 56px;
    max-width: 740px;
    margin: 0 auto;
    text-align: center;
    width: 100%;
  }
  .hero-tag {
    display: inline-block;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 16px;
  }
  .hero h1 {
    font-family: var(--serif);
    font-size: clamp(36px, 6vw, 56px);
    line-height: 1.1;
    color: var(--ink);
    margin-bottom: 16px;
  }
  .hero h1 em { font-style: italic; color: var(--accent); }
  .hero p {
    font-size: 16px;
    color: var(--muted);
    line-height: 1.65;
    max-width: 480px;
    margin: 0 auto;
  }

  /* ---- main card ---- */
  .main-card {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 12px;
    max-width: 560px;
    width: calc(100% - 80px);
    margin: 0 auto 80px;
    overflow: hidden;
    box-shadow: 0 1px 3px rgba(0,0,0,0.06), 0 8px 32px rgba(0,0,0,0.04);
  }
  .card-header {
    background: var(--ink);
    padding: 20px 28px;
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .card-header-icon {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    border: 1px solid rgba(255,255,255,0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: rgba(255,255,255,0.7);
  }
  .card-header h2 {
    font-family: var(--serif);
    font-size: 18px;
    color: #fff;
    font-weight: 400;
  }
  .card-header p { font-size: 12px; color: rgba(255,255,255,0.5); margin-top: 1px; }

  /* ---- form ---- */
  .form-body { padding: 28px; }
  .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px; }
  .form-group { display: flex; flex-direction: column; gap: 6px; margin-bottom: 16px; }
  .form-group label {
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--muted);
  }
  .form-group input {
    font-family: var(--sans);
    font-size: 14px;
    padding: 10px 14px;
    border: 1px solid var(--border);
    border-radius: var(--radius);
    background: var(--paper);
    color: var(--ink);
    transition: border-color 0.15s, box-shadow 0.15s;
    outline: none;
    width: 100%;
  }
  .form-group input:focus {
    border-color: var(--ink);
    box-shadow: 0 0 0 3px rgba(15,14,13,0.06);
  }
  .form-group input::placeholder { color: var(--border); }

  .divider { height: 1px; background: var(--border); margin: 20px 0; opacity: 0.5; }

  /* ---- buttons ---- */
  .btn-primary {
    width: 100%;
    padding: 13px 20px;
    font-family: var(--sans);
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 0.02em;
    background: var(--accent);
    color: #fff;
    border: none;
    border-radius: var(--radius);
    cursor: pointer;
    transition: background 0.15s, transform 0.1s;
    position: relative;
    overflow: hidden;
  }
  .btn-primary:hover { background: #b03a20; }
  .btn-primary:active { transform: scale(0.99); }
  .btn-primary:disabled { opacity: 0.5; cursor: not-allowed; }
  .btn-secondary {
    padding: 10px 20px;
    font-family: var(--sans);
    font-size: 13px;
    font-weight: 500;
    background: transparent;
    color: var(--ink);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    cursor: pointer;
    transition: all 0.15s;
    margin-top: 12px;
    display: block;
    width: 100%;
    text-align: center;
  }
  .btn-secondary:hover { background: var(--paper2); border-color: var(--ink); }

  /* ---- success / ticket card ---- */
  .success-badge {
    display: flex;
    align-items: center;
    gap: 10px;
    background: #eaf4ee;
    border: 1px solid #b8ddc5;
    border-radius: var(--radius);
    padding: 12px 16px;
    margin-bottom: 20px;
  }
  .success-badge span { font-size: 13px; color: var(--success); font-weight: 500; }

  .ticket-card {
    border: 1px dashed var(--border);
    border-radius: 8px;
    overflow: hidden;
    background: var(--paper);
  }
  .ticket-strip {
    background: var(--accent);
    padding: 12px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .ticket-strip span { font-size: 11px; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(255,255,255,0.7); }
  .ticket-number { font-family: var(--serif); font-size: 24px; color: #fff; letter-spacing: 0.04em; }
  .ticket-body { padding: 20px; }
  .ticket-row {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 12px;
    padding-bottom: 12px;
    border-bottom: 1px solid var(--border);
  }
  .ticket-row:last-child { margin-bottom: 0; padding-bottom: 0; border-bottom: none; }
  .ticket-label { font-size: 10px; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted); }
  .ticket-value { font-size: 14px; font-weight: 500; color: var(--ink); }
  .ticket-route {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 16px 20px;
    background: var(--paper2);
    border-top: 1px solid var(--border);
  }
  .route-city { font-family: var(--serif); font-size: 20px; }
  .route-arrow { flex: 1; text-align: center; color: var(--muted); font-size: 18px; }
  .status-pill {
    display: inline-block;
    padding: 3px 10px;
    background: #eaf4ee;
    border: 1px solid #b8ddc5;
    border-radius: 20px;
    font-size: 11px;
    font-weight: 500;
    color: var(--success);
    letter-spacing: 0.04em;
  }
  .price-tag {
    font-family: var(--serif);
    font-size: 22px;
    color: var(--accent);
  }

  /* ---- lookup form ---- */
  .lookup-row { display: flex; gap: 10px; }
  .lookup-row input { flex: 1; }
  .lookup-row .btn-primary { width: auto; padding: 10px 20px; }

  /* ---- error ---- */
  .error-msg {
    background: #fdf0ee;
    border: 1px solid #f2c5bb;
    border-radius: var(--radius);
    padding: 12px 16px;
    font-size: 13px;
    color: var(--accent);
    margin-bottom: 16px;
  }

  /* ---- loading ---- */
  .spinner {
    width: 16px; height: 16px;
    border: 2px solid rgba(255,255,255,0.3);
    border-top-color: #fff;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
    display: inline-block;
    margin-right: 8px;
    vertical-align: middle;
  }
  @keyframes spin { to { transform: rotate(360deg); } }

  .empty-state {
    text-align: center;
    padding: 40px 20px;
    color: var(--muted);
  }
  .empty-state .empty-icon { font-size: 32px; margin-bottom: 12px; opacity: 0.4; }
  .empty-state p { font-size: 14px; }
`;

// --- BookingForm ---
function BookingForm({ onBooked }) {
  const [form, setForm] = useState({ id: "", name: "", departure: "", arrival: "", dateOfJourney: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async () => {
    setError("");
    if (!form.id || !form.name || !form.departure || !form.arrival || !form.dateOfJourney) {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/passenger-form`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, id: parseInt(form.id) }),
      });
      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      const ticketNumber = await res.json();
      onBooked(ticketNumber);
    } catch (e) {
      setError(e.message || "Unable to register. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-card">
      <div className="card-header">
        <div className="card-header-icon">✈</div>
        <div>
          <h2>Book a ticket</h2>
          <p>Enter your journey details below</p>
        </div>
      </div>
      <div className="form-body">
        {error && <div className="error-msg">{error}</div>}
        <div className="form-row">
          <div className="form-group">
            <label>Passenger ID</label>
            <input type="number" placeholder="e.g. 101" value={form.id} onChange={set("id")} />
          </div>
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" placeholder="e.g. Arjun Sharma" value={form.name} onChange={set("name")} />
          </div>
        </div>
        <div className="divider" />
        <div className="form-row">
          <div className="form-group">
            <label>Departure</label>
            <input type="text" placeholder="e.g. Mumbai" value={form.departure} onChange={set("departure")} />
          </div>
          <div className="form-group">
            <label>Arrival</label>
            <input type="text" placeholder="e.g. Delhi" value={form.arrival} onChange={set("arrival")} />
          </div>
        </div>
        <div className="form-group">
          <label>Date of Journey</label>
          <input type="date" value={form.dateOfJourney} onChange={set("dateOfJourney")} />
        </div>
        <div className="divider" />
        <button className="btn-primary" onClick={submit} disabled={loading}>
          {loading && <span className="spinner" />}
          {loading ? "Booking..." : "Book ticket →"}
        </button>
      </div>
    </div>
  );
}

// --- Confirmation ---
function Confirmation({ ticketNumber, onViewTicket, onBookAnother }) {
  return (
    <div className="main-card">
      <div className="card-header">
        <div className="card-header-icon">✓</div>
        <div>
          <h2>Booking confirmed</h2>
          <p>Your passenger has been registered</p>
        </div>
      </div>
      <div className="form-body">
        <div className="success-badge">
          <span>✓ Registration successful</span>
        </div>
        <div className="ticket-card">
          <div className="ticket-strip">
            <span>Ticket number</span>
            <span className="ticket-number">#{String(ticketNumber).padStart(6, "0")}</span>
          </div>
          <div className="ticket-body">
            <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.6 }}>
              Save this number to retrieve your full ticket details. You can look it up anytime from the <strong>View Ticket</strong> tab.
            </p>
          </div>
        </div>
        <button className="btn-primary" style={{ marginTop: 20 }} onClick={() => onViewTicket(ticketNumber)}>
          View full ticket →
        </button>
        <button className="btn-secondary" onClick={onBookAnother}>
          Book another ticket
        </button>
      </div>
    </div>
  );
}

// --- TicketView ---
function TicketView({ initialTicketNumber }) {
  const [input, setInput] = useState(initialTicketNumber ? String(initialTicketNumber) : "");
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const lookup = async () => {
    if (!input) return;
    setError("");
    setTicket(null);
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/get-ticket?ticketNumber=${input}`);
      if (res.status === 404) throw new Error("No ticket found with that number.");
      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      const data = await res.json();
      setTicket(data);
    } catch (e) {
      setError(e.message || "Unable to fetch ticket.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-card">
      <div className="card-header">
        <div className="card-header-icon">🎫</div>
        <div>
          <h2>View ticket</h2>
          <p>Enter your ticket number to retrieve details</p>
        </div>
      </div>
      <div className="form-body">
        {error && <div className="error-msg">{error}</div>}
        <div className="form-group">
          <label>Ticket number</label>
          <div className="lookup-row">
            <input
              type="number"
              placeholder="e.g. 101"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && lookup()}
            />
            <button className="btn-primary" onClick={lookup} disabled={loading || !input}>
              {loading ? <span className="spinner" /> : "Search"}
            </button>
          </div>
        </div>

        {!ticket && !loading && !error && (
          <div className="empty-state">
            <div className="empty-icon">🎫</div>
            <p>Enter a ticket number above to view journey details</p>
          </div>
        )}

        {ticket && (
          <div className="ticket-card" style={{ marginTop: 20 }}>
            <div className="ticket-strip">
              <span>Ticket number</span>
              <span className="ticket-number">#{String(ticket.ticketNumber).padStart(6, "0")}</span>
            </div>
            <div className="ticket-route">
              <span className="route-city">{ticket.departure}</span>
              <span className="route-arrow">→</span>
              <span className="route-city">{ticket.arrival}</span>
            </div>
            <div className="ticket-body">
              <div className="ticket-row">
                <span className="ticket-label">Passenger</span>
                <span className="ticket-value">{ticket.name}</span>
              </div>
              <div className="ticket-row">
                <span className="ticket-label">Date of journey</span>
                <span className="ticket-value">{ticket.dateOfJourney}</span>
              </div>
              <div className="ticket-row">
                <span className="ticket-label">Status</span>
                <span className="status-pill">{ticket.status}</span>
              </div>
              <div className="ticket-row">
                <span className="ticket-label">Fare</span>
                <span className="price-tag">₹{ticket.ticketPrice?.toLocaleString("en-IN")}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// --- App ---
export default function App() {
  const [tab, setTab] = useState("book");
  const [bookedTicket, setBookedTicket] = useState(null);
  const [viewTicketNumber, setViewTicketNumber] = useState(null);

  const handleBooked = (ticketNumber) => {
    setBookedTicket(ticketNumber);
    setTab("confirm");
  };

  const handleViewTicket = (num) => {
    setViewTicketNumber(num);
    setTab("view");
  };

  return (
    <>
      <style>{styles}</style>
      <div className="app">
        <header className="header">
          <div className="logo">
            <div className="logo-dot" />
            RailBook
          </div>
          <nav className="nav">
            <button className={`nav-btn ${tab === "book" || tab === "confirm" ? "active" : ""}`} onClick={() => setTab("book")}>
              Book
            </button>
            <button className={`nav-btn ${tab === "view" ? "active" : ""}`} onClick={() => setTab("view")}>
              My Ticket
            </button>
          </nav>
        </header>

        <div className="hero">
          <span className="hero-tag">Spring Boot × React</span>
          <h1>
            {tab === "view" ? "Find your ticket" : tab === "confirm" ? "You're all set" : <>Book your <em>journey</em></>}
          </h1>
          <p>
            {tab === "view"
              ? "Enter your ticket number to retrieve your full journey details."
              : tab === "confirm"
              ? "Your booking has been confirmed. Save your ticket number."
              : "Register a passenger and get an instant ticket confirmation for your upcoming journey."}
          </p>
        </div>

        {tab === "book" && <BookingForm onBooked={handleBooked} />}
        {tab === "confirm" && (
          <Confirmation
            ticketNumber={bookedTicket}
            onViewTicket={handleViewTicket}
            onBookAnother={() => setTab("book")}
          />
        )}
        {tab === "view" && <TicketView initialTicketNumber={viewTicketNumber} />}
      </div>
    </>
  );
}