import React, { useState } from "react";
import "./App.css";

export default function Campaign() {
  const [showWhatsApp, setShowWhatsApp] = useState(false);
  const [showEmail, setShowEmail] = useState(false);

  const [waMessage, setWaMessage] = useState("");
  const [emailSubject, setEmailSubject] = useState("");
  const [emailMessage, setEmailMessage] = useState("");

  // SEND WHATSAPP
  const sendWhatsApp = () => {
    if (!waMessage) return alert("Enter message first!");
    alert("✅ WhatsApp Campaign Sent!");
    setShowWhatsApp(false);
    setWaMessage("");
  };

  // SEND EMAIL
  const sendEmail = () => {
    if (!emailSubject || !emailMessage)
      return alert("Fill all fields!");
    alert("✅ Email Campaign Sent!");
    setShowEmail(false);
    setEmailSubject("");
    setEmailMessage("");
  };

  return (
    <div className="page-container">
      <h2>📢 Campaign Center</h2>

      {/* ================= CARDS ================= */}
      <div className="campaign-grid">

        {/* WhatsApp */}
        <div className="campaign-card whatsapp">
          <h3>📱 WhatsApp Campaign</h3>
          <p>Send bulk WhatsApp messages to all leads instantly.</p>
          <button
            className="btn btn-green"
            onClick={() => setShowWhatsApp(true)}
          >
            Send Campaign
          </button>
        </div>

        {/* Email */}
        <div className="campaign-card email">
          <h3>📧 Email Campaign</h3>
          <p>Send professional email campaigns to your leads.</p>
          <button
            className="btn btn-blue"
            onClick={() => setShowEmail(true)}
          >
            Send Emails
          </button>
        </div>

      </div>

      {/* ================= WHATSAPP MODAL ================= */}
      {showWhatsApp && (
        <div className="modal">
          <div className="modal-box">
            <h3>📱 WhatsApp Campaign</h3>

            <textarea
              placeholder="Enter your message..."
              value={waMessage}
              onChange={(e) => setWaMessage(e.target.value)}
            />

            <div className="modal-actions">
              <button
                className="modal-btn btn-whatsapp"
                onClick={sendWhatsApp}
              >
                Send
              </button>

              <button
                className="modal-btn btn-close"
                onClick={() => setShowWhatsApp(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= EMAIL MODAL ================= */}
      {showEmail && (
        <div className="modal">
          <div className="modal-box">
            <h3>📧 Email Campaign</h3>

            <input
              type="text"
              placeholder="Subject"
              value={emailSubject}
              onChange={(e) => setEmailSubject(e.target.value)}
            />

            <textarea
              placeholder="Email content..."
              value={emailMessage}
              onChange={(e) => setEmailMessage(e.target.value)}
            />

            <div className="modal-actions">
              <button
                className="modal-btn btn-email"
                onClick={sendEmail}
              >
                Send
              </button>

              <button
                className="modal-btn btn-close"
                onClick={() => setShowEmail(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}