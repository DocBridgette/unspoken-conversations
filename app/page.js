"use client";

import { useEffect, useState } from "react";

const WA_NUMBER = "263778166882";
const FORM_ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT || "";
const STORAGE_KEY = "unspoken_conversations_registrations";

const emptyForm = {
  name: "",
  age: "",
  school: "",
  schoolName: "",
  phone: "",
  email: "",
  address: "",
  suburb: "",
  city: "Harare",
  guardianName: "",
  guardianPhone: "",
  wantsAlerts: true,
};

export default function Page() {
  const [form, setForm] = useState(emptyForm);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [entries, setEntries] = useState([]);
  const [showAdmin, setShowAdmin] = useState(false);
  const [pageUrl, setPageUrl] = useState("");

  useEffect(() => {
    setPageUrl(window.location.href);
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      setEntries(saved);
    } catch (e) {
      setEntries([]);
    }
  }, []);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);

    const entry = { ...form, time: new Date().toISOString() };

    // Save locally so the organizer's "view registrations" panel on this
    // device shows recent sign-ups.
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      saved.push(entry);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
      setEntries(saved);
    } catch (err) {
      console.error("Could not save locally", err);
    }

    // Forward to a form backend (e.g. Formspree) if one is configured,
    // so the organizer gets every submission by email regardless of device.
    if (FORM_ENDPOINT) {
      try {
        await fetch(FORM_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(entry),
        });
      } catch (err) {
        console.error("Could not forward submission", err);
      }
    }

    setSubmitting(false);
    setSubmitted(true);
  }

  const waInquiryHref = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
    "Hi! I'd like to know more about The Unspoken Conversations - Teens Edition on 8 August 2026."
  )}`;

  const waPayHref = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
    `Hi! I've registered for The Unspoken Conversations - Teens Edition.\nName: ${form.name}\nHere is my proof of payment.`
  )}`;

  const qrSrc = pageUrl
    ? `https://api.qrserver.com/v1/create-qr-code/?size=340x340&data=${encodeURIComponent(pageUrl)}`
    : "";

  return (
    <>
      <div className="doodlebg">
        <div
          className="corner-tri"
          style={{ top: -10, left: -10, borderStyle: "solid", borderWidth: "70px 70px 0 0", borderColor: "var(--purple) transparent transparent transparent" }}
        />
        <div
          className="corner-tri"
          style={{ top: 0, left: 52, borderStyle: "solid", borderWidth: "44px 0 0 44px", borderColor: "transparent transparent transparent var(--teal)" }}
        />
        <div
          className="corner-tri"
          style={{ top: -10, right: -10, borderStyle: "solid", borderWidth: "0 70px 70px 0", borderColor: "transparent var(--pink) transparent transparent" }}
        />
        <div
          className="corner-tri"
          style={{ top: 0, right: 52, borderStyle: "solid", borderWidth: "0 44px 44px 0", borderColor: "transparent var(--yellow) transparent transparent" }}
        />
        <div className="confetti" style={{ top: "18%", left: "6%" }}>
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path d="M12 2l2.4 7.2H22l-6 4.6 2.3 7.2L12 16.4 5.7 21l2.3-7.2-6-4.6h7.6z" fill="#FFC72C" />
          </svg>
        </div>
        <div className="confetti" style={{ top: "65%", left: "4%" }}>
          <svg width="16" height="16" viewBox="0 0 24 24">
            <rect x="2" y="2" width="20" height="20" rx="4" fill="#12AFC7" transform="rotate(18 12 12)" />
          </svg>
        </div>
        <div className="confetti" style={{ top: "12%", right: "7%" }}>
          <svg width="20" height="20" viewBox="0 0 24 24">
            <path
              d="M12 21s-7.5-4.6-10-9.2C.5 8 2.7 4 6.5 4c2 0 3.6 1.1 4.5 2.7C11.9 5.1 13.5 4 15.5 4 19.3 4 21.5 8 20 11.8 17.5 16.4 12 21 12 21z"
              fill="#EC1E79"
            />
          </svg>
        </div>
        <div className="confetti" style={{ top: "58%", right: "5%" }}>
          <svg width="16" height="16" viewBox="0 0 24 24">
            <rect x="2" y="2" width="20" height="20" rx="4" fill="#6C3FA6" transform="rotate(-12 12 12)" />
          </svg>
        </div>

        <div className="hero">
          <div className="eyebrow">BEYOND WALLS PRESENTS</div>
          <div className="host-pill">HOST: DR BRIDGETTE KAGONYE</div>
          <div className="wordmark">
            <span className="w1">UN</span>
            <span className="w2">SP</span>
            <span className="w3">O</span>
            <span className="w4">K</span>
            <span className="w5">EN</span>
          </div>
          <div className="wordmark2">CONVERSATIONS</div>
          <div className="teens-edition">✦ TEENS EDITION ✦</div>
          <p className="tagline">
            Navigating identity, puberty, belonging and mental health as a teen? Then this conversation is for you.
          </p>
          <div className="topics">TEENS TALK &nbsp;|&nbsp; MENTAL HEALTH &nbsp;|&nbsp; GROOMING</div>
        </div>

        <div className="details">
          <div className="detail-card">
            <div className="label">DATE</div>
            <div className="value">8 Aug 2026</div>
          </div>
          <div className="detail-card">
            <div className="label">TIME</div>
            <div className="value">9AM – 1PM</div>
          </div>
          <div className="detail-card">
            <div className="label">VENUE</div>
            <div className="value">Karigamombe Centre, 13th Floor (ICMF)</div>
          </div>
          <div className="detail-card">
            <div className="label">INVESTMENT</div>
            <div className="value">$20</div>
          </div>
        </div>
      </div>

      <main>
        {!submitted ? (
          <>
            <h1 className="section-title">Register now</h1>
            <p className="section-sub">Secure your teen&apos;s seat — spaces are limited</p>

            <div className="bubble-card">
              <form onSubmit={handleSubmit}>
                <div className="field">
                  <label>
                    Full name <span className="req">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Teen's full name"
                    required
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                  />
                </div>

                <div className="row2">
                  <div className="field">
                    <label>
                      Age <span className="req">*</span>
                    </label>
                    <input
                      type="number"
                      placeholder="14"
                      min="9"
                      max="19"
                      required
                      value={form.age}
                      onChange={(e) => update("age", e.target.value)}
                    />
                  </div>
                  <div className="field">
                    <label>
                      Current school level <span className="req">*</span>
                    </label>
                    <select required value={form.school} onChange={(e) => update("school", e.target.value)}>
                      <option value="" disabled>
                        Select level
                      </option>
                      <option>Primary school</option>
                      <option>Form 1</option>
                      <option>Form 2</option>
                      <option>Form 3</option>
                      <option>Form 4</option>
                      <option>Lower 6</option>
                      <option>Upper 6</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>

                <div className="row2">
                  <div className="field">
                    <label>
                      Current school <span className="req">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Name of school"
                      required
                      value={form.schoolName}
                      onChange={(e) => update("schoolName", e.target.value)}
                    />
                  </div>
                  <div className="field">
                    <label>
                      Phone number <span className="req">*</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="077 123 4567"
                      required
                      value={form.phone}
                      onChange={(e) => update("phone", e.target.value)}
                    />
                  </div>
                </div>

                <div className="field">
                  <label>Email address</label>
                  <input
                    type="email"
                    placeholder="name@email.com"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                  />
                </div>

                <div className="divider-label">Residential address</div>
                <div className="field">
                  <label>
                    Home address <span className="req">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="House/street, suburb"
                    required
                    value={form.address}
                    onChange={(e) => update("address", e.target.value)}
                  />
                </div>
                <div className="row2">
                  <div className="field">
                    <label>
                      Suburb / area <span className="req">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Borrowdale"
                      required
                      value={form.suburb}
                      onChange={(e) => update("suburb", e.target.value)}
                    />
                  </div>
                  <div className="field">
                    <label>
                      City <span className="req">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Harare"
                      required
                      value={form.city}
                      onChange={(e) => update("city", e.target.value)}
                    />
                  </div>
                </div>

                <div className="divider-label">Parent / guardian details</div>
                <div className="row2">
                  <div className="field">
                    <label>
                      Parent/guardian name <span className="req">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Full name"
                      required
                      value={form.guardianName}
                      onChange={(e) => update("guardianName", e.target.value)}
                    />
                  </div>
                  <div className="field">
                    <label>
                      Parent/guardian contact <span className="req">*</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="077 123 4567"
                      required
                      value={form.guardianPhone}
                      onChange={(e) => update("guardianPhone", e.target.value)}
                    />
                  </div>
                </div>

                <label className="consent-row">
                  <input
                    type="checkbox"
                    checked={form.wantsAlerts}
                    onChange={(e) => update("wantsAlerts", e.target.checked)}
                  />
                  <span>
                    Yes, keep me updated — send me email and WhatsApp alerts about this event and future Unspoken
                    Conversations events.
                  </span>
                </label>

                <button type="submit" className="submit-btn" disabled={submitting}>
                  {submitting ? "Saving..." : "Complete registration"}
                </button>
              </form>

              <div className="payment-box">
                <h3>How to pay your $20 investment</h3>
                <p>Pay via EcoCash or cash, then send your proof of payment on WhatsApp so we can confirm your seat.</p>
                <ul>
                  <li>EcoCash to 077 816 6882</li>
                  <li>Cash on the day at registration</li>
                </ul>
              </div>
            </div>
          </>
        ) : (
          <div className="success-box">
            <h2>You&apos;re registered! 🎉</h2>
            <p>
              Thanks for signing up for The Unspoken Conversations — Teens Edition. Now send your EcoCash proof of
              payment (or confirm cash payment) on WhatsApp to lock in your seat.
            </p>
            <a className="wa-btn" href={waPayHref} target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 004.74 1.21h.01c5.46 0 9.9-4.45 9.9-9.91C21.96 6.45 17.5 2 12.04 2zm5.8 14.16c-.24.68-1.4 1.3-1.94 1.38-.5.08-1.12.11-1.8-.11-.42-.13-.95-.31-1.64-.6-2.9-1.25-4.8-4.17-4.94-4.36-.14-.19-1.18-1.57-1.18-3 0-1.42.75-2.12 1.02-2.41.27-.29.58-.36.78-.36.19 0 .39 0 .56.01.18.01.42-.07.65.5.24.58.82 2 .89 2.15.07.15.12.32.02.51-.09.19-.14.31-.28.48-.14.16-.29.36-.42.48-.14.13-.28.28-.12.55.16.27.71 1.17 1.53 1.9 1.05.94 1.94 1.23 2.21 1.37.27.14.42.12.58-.07.16-.19.68-.79.86-1.06.18-.27.36-.22.6-.13.24.09 1.53.72 1.79.85.26.13.43.19.5.3.06.11.06.63-.18 1.31z" />
              </svg>
              Send proof of payment
            </a>
          </div>
        )}

        <div className="admin-toggle">
          <button type="button" onClick={() => setShowAdmin((s) => !s)}>
            View registrations (organizer)
          </button>
        </div>
        {showAdmin && (
          <div className="admin-panel">
            <div className="count">
              {entries.length} registration{entries.length === 1 ? "" : "s"} on this device
            </div>
            <div className="scroll">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Age</th>
                    <th>School level</th>
                    <th>School</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Address</th>
                    <th>Guardian</th>
                    <th>Guardian phone</th>
                    <th>Alerts</th>
                    <th>Time</th>
                  </tr>
                </thead>
                <tbody>
                  {entries
                    .slice()
                    .reverse()
                    .map((r, i) => (
                      <tr key={i}>
                        <td>{r.name}</td>
                        <td>{r.age}</td>
                        <td>{r.school}</td>
                        <td>{r.schoolName}</td>
                        <td>{r.phone}</td>
                        <td>{r.email}</td>
                        <td>{[r.address, r.suburb, r.city].filter(Boolean).join(", ")}</td>
                        <td>{r.guardianName}</td>
                        <td>{r.guardianPhone}</td>
                        <td>{r.wantsAlerts ? "Yes" : "No"}</td>
                        <td>{new Date(r.time).toLocaleString()}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <p className="admin-note">
              This list only shows registrations submitted on this device/browser. To collect every submission in
              one place (e.g. by email), connect a form backend — see the README for a 2-minute Formspree setup.
            </p>
          </div>
        )}
      </main>

      <footer>
        <div className="qr-wrap">{qrSrc && <img src={qrSrc} alt="QR code to registration page" />}</div>
        <p>
          Scan to open this registration page, or share the link directly on social media. The QR code always
          points to wherever this page is currently hosted.
        </p>
        <div className="contact-line">Contact us: 077 816 6882</div>
      </footer>

      <a className="float-wa" href={waInquiryHref} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
        <svg viewBox="0 0 24 24" width="30" height="30" fill="#fff">
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 004.74 1.21h.01c5.46 0 9.9-4.45 9.9-9.91C21.96 6.45 17.5 2 12.04 2zm5.8 14.16c-.24.68-1.4 1.3-1.94 1.38-.5.08-1.12.11-1.8-.11-.42-.13-.95-.31-1.64-.6-2.9-1.25-4.8-4.17-4.94-4.36-.14-.19-1.18-1.57-1.18-3 0-1.42.75-2.12 1.02-2.41.27-.29.58-.36.78-.36.19 0 .39 0 .56.01.18.01.42-.07.65.5.24.58.82 2 .89 2.15.07.15.12.32.02.51-.09.19-.14.31-.28.48-.14.16-.29.36-.42.48-.14.13-.28.28-.12.55.16.27.71 1.17 1.53 1.9 1.05.94 1.94 1.23 2.21 1.37.27.14.42.12.58-.07.16-.19.68-.79.86-1.06.18-.27.36-.22.6-.13.24.09 1.53.72 1.79.85.26.13.43.19.5.3.06.11.06.63-.18 1.31z" />
        </svg>
      </a>
    </>
  );
}
