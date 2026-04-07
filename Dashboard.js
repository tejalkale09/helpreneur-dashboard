import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  LineChart, Line,
  PieChart, Pie, Cell, Legend
} from "recharts";

const API = "https://opensheet.elk.sh/1lN-lb0MR4newKU7FTHc4cBuOJJlrzP0Zy0b3HXyN53Q/Sheet1";

function Dashboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(API).then(res => setData(res.data));
  }, []);

  const norm = s => (s || "").toLowerCase();

  const total = data.length;
  const sent = data.filter(d => norm(d.message_sent) === "yes").length;
  const replied = data.filter(d => norm(d.reply) === "yes").length;

  const conversion = sent === 0 ? 0 : ((replied / sent) * 100).toFixed(1);

  // 📊 Funnel
  const funnelData = [
    { name: "Leads", value: total },
    { name: "Sent", value: sent },
    { name: "Replied", value: replied }
  ];

  // 📈 Daily trend (fake grouping fallback)
  const daily = data.map((d, i) => ({
    day: `D${i + 1}`,
    sent: norm(d.message_sent) === "yes" ? 1 : 0
  }));

  // 🟢 Response
  const pieData = [
    { name: "Replied", value: replied },
    { name: "No Response", value: total - replied }
  ];

  const COLORS = ["#16a34a", "#e11d48"];

  return (
    <div>

      <h2 className="title">Business Analytics</h2>

      {/* KPI */}
      <div className="cards">
        <div className="card blue">
          <h4>Total Leads</h4>
          <h1>{total}</h1>
        </div>

        <div className="card purple">
          <h4>Messages Sent</h4>
          <h1>{sent}</h1>
        </div>

        <div className="card green">
          <h4>Replies</h4>
          <h1>{replied}</h1>
        </div>

        <div className="card dark">
          <h4>Conversion</h4>
          <h1>{conversion}%</h1>
        </div>
      </div>

      {/* GRAPHS */}
      <div className="grid">

        {/* FUNNEL */}
        <div className="box">
          <h3>📊 Conversion Funnel</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={funnelData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#2563eb" radius={[6,6,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* DAILY */}
        <div className="box">
          <h3>📈 Daily Activity</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={daily}>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="sent" stroke="#7c3aed" strokeWidth={3}/>
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* PIE */}
        <div className="box full">
          <h3>🎯 Reply Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={pieData} dataKey="value" outerRadius={120} label>
                {pieData.map((e, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>

      {/* INSIGHT */}
      <div className="insight">
        <h3>💡 Insight</h3>
        <p>
          You have <b>{total}</b> leads.  
          Only <b>{sent}</b> contacted.  
          Replies: <b>{replied}</b>.  
          Conversion rate: <b>{conversion}%</b>.
        </p>
      </div>

      <div className="footer">
        Developed by Helpreneur 🚀
      </div>

    </div>
  );
}

export default Dashboard;