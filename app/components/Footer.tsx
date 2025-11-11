'use client';

import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <p className="footer-text" style={{ fontFamily: "'CaviarDreams', Arial, Helvetica, sans-serif" }}>
            © {new Date().getFullYear()} Elemta. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

