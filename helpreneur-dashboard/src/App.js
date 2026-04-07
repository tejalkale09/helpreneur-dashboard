import React, { useState } from "react";
import Dashboard from "./Dashboard";
import Leads from "./Leads";
import Campaign from "./Campaign";
import "./App.css";

function App() {
  const [page, setPage] = useState("dashboard");

  const renderPage = () => {
    if (page === "leads") return <Leads />;
    if (page === "campaign") return <Campaign />;
    return <Dashboard />;
  };

  return (
    <div className="app">

      {/* SIDEBAR */}
      <div className="sidebar">
        <h2>🚀 Helpreneur</h2>

        <ul>
          <li onClick={() => setPage("dashboard")}>📊 Dashboard</li>
          <li onClick={() => setPage("leads")}>📋 Leads</li>
          <li onClick={() => setPage("campaign")}>📢 Campaign</li>
        </ul>
      </div>

      {/* MAIN */}
      <div className="main">
        {renderPage()}
      </div>

    </div>
  );
}

export default App;