import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "https://opensheet.elk.sh/1lN-lb0MR4newKU7FTHc4cBuOJJlrzP0Zy0b3HXyN53Q/Sheet1";

function Leads() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get(API).then(res => setData(res.data));
  }, []);

  const filtered = data.filter(d =>
    d.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="page-container">

      <div className="page-header">
        <h2>📋 Leads Management</h2>
        <input
          className="search"
          placeholder="Search leads..."
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="card-box">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Message</th>
              <th>Reply</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((lead, i) => (
              <tr key={i}>
                <td>{lead.name}</td>
                <td>{lead.phone}</td>

                <td>
                  <span className={
                    lead.status === "ready_to_contact"
                      ? "badge blue-badge"
                      : "badge red-badge"
                  }>
                    {lead.status}
                  </span>
                </td>

                <td>
                  {lead.message_sent === "yes"
                    ? <span className="success">✔ Sent</span>
                    : <span className="danger">✖ No</span>}
                </td>

                <td>
                  {lead.reply === "yes"
                    ? <span className="success">💬 Yes</span>
                    : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default Leads;