const navLinks = ["Home", "EventBooking", "Blog", "Contact", "Profile"];

const stats = [
  { icon: "🏆", num: "10 MILLION", label: "NAIRA PRIZE POOL" },
  { icon: "👥", num: "TEAM", label: "COMPETITION" },
];

const ticketRows = [
  { icon: "📅", sub: "DATE", main: "Saturday, May 30th, 2026" },
  { icon: "🕐", sub: "TIME", main: "9:00am – 5:00pm" },
  {
    icon: "📍",
    sub: "LOCATION",
    main: "The Landmark Center, VI, Lagos, Nigeria",
  },
];

const otherEvents = [
  {
    title: "Fatherland The Musical",
    desc: "Experience the magic & tale of the people of Morocco",
    color: "linear-gradient(135deg,#c0392b,#7b0000)",
    label: "FATHERLAND\nTHE\nMUSICAL",
    img: "/profile image1.jpg",
  },
  {
    title: "Code spark 2026",
    desc: "Got what it takes? Join all upcoming challenges and push yourself to the top of the industry.",
    color: "linear-gradient(135deg,#1e3a8a,#7c3aed)",
    label: "CODE\nSPARK\n2026",
    img: "/profile image2.jpg",
  },
];

const footerLinks = ["Homepage", "Events", "Blog", "How Bookify", "Contact"];
const socials = ["Facebook", "Instagram", "Tiktok"];

export default function EventDetailsPage() {
  return (
    <>
      <style>{styles}</style>

      {/* Nav */}
      <nav className="nav">
        <div className="logo">
          <div className="logo-icon">B</div>Bookify
        </div>
        <div className="nav-links">
          {navLinks.map((l) => (
            <a key={l} href="#">
              {l}
            </a>
          ))}
        </div>
        <button className="btn-green">SIGN UP</button>
      </nav>

      {/* Hero */}
      <section className="hero">
        <div className="hero-overlay" />
        <div className="blob1" />
        <div className="blob2" />
        <p className="hero-label">SQUAD HACKATHON 3.0 DETAILS</p>

        <div className="hero-body">
          <div className="hero-left">
            <h1>
              SQUAD
              <br />
              HACKATHON
              <br />
              3.0 | LAGOS
            </h1>

            <p className="about-title">About this event</p>
            <p className="about-text">
              Gear up for Squad Hackathon 3.0, the ultimate convergence of
              innovation, robotics, and intense competition. Over 48 hours,
              student teams from across the nation will lock horns to design,
              code, and deploy game-changing tech solutions. Secure your tickets
              now to compete for a share of the N10 Million Naira prize pool and
              prove your squad is the best in the industry.
            </p>

            <div className="stats">
              {stats.map((s) => (
                <div key={s.label} className="stat">
                  <span>{s.icon}</span>
                  <div>
                    <div className="stat-num">{s.num}</div>
                    <div className="stat-label">{s.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Ticket card */}
          <div className="ticket-card">
            <div className="ticket-body">
              <button className="ticket-cta-top">GET TICKETS →</button>
              {ticketRows.map((r) => (
                <div key={r.sub}>
                  <div className="divider" />
                  <div className="ticket-row">
                    <span>{r.icon}</span>
                    <div>
                      <div className="ticket-sub">{r.sub}</div>
                      <div className="ticket-main">{r.main}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Other Events */}
      <section className="events-section">
        <h2>Other Events You May Like</h2>
        <div className="events-grid">
          {otherEvents.map((e) => (
            <div key={e.title} className="event-card">
              <div
                className="event-thumb"
                style={e.img ? {} : { background: e.color }}
              >
                {e.img ? <img src={e.img} alt={e.title} /> : e.label}
              </div>
              <div className="event-info">
                <div className="event-title">{e.title}</div>
                <p className="event-desc">{e.desc}</p>
                <button className="btn-purple">LEARN MORE</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-logo">
              <div className="footer-logo-icon">B</div>Bookify
            </div>
            <p className="footer-tagline">
              Bookify.com
              <br />
              ticketing platform for making memorable experiences
            </p>
          </div>

          <div className="footer-col">
            <h4>Company</h4>
            {footerLinks.map((l) => (
              <a key={l} href="#">
                {l}
              </a>
            ))}
          </div>

          <div className="footer-col">
            <h4>Follow us</h4>
            {socials.map((s) => (
              <a key={s} href="#">
                {s}
              </a>
            ))}
          </div>
        </div>

        <div className="footer-bottom">
          <span>Copyright 2026. All rights reserved</span>
          <div>
            <a href="#">Terms & Conditions</a>
            <a href="#">Privacy policy</a>
            <a href="#">Refund Policy</a>
          </div>
        </div>
      </footer>
    </>
  );
}

const styles = `
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:sans-serif;background:#121212;color:#fff}
  .nav{display:flex;align-items:center;justify-content:space-between;padding:12px 40px;background:#121212;border-bottom:1px solid #2a2a2a;position:sticky;top:0;z-index:100}
  .logo{display:flex;align-items:center;gap:8px;font-weight:700;font-size:20px;color:#fff}
  .logo-icon{width:32px;height:32px;background:#7c3aed;border-radius:6px;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:16px}
  .nav-links{display:flex;gap:28px}
  .nav-links a{text-decoration:none;color:#ccc;font-size:14px;font-weight:500}
  .btn-green{background:#22c55e;color:#fff;border:none;border-radius:6px;padding:8px 20px;font-size:13px;font-weight:700;cursor:pointer}
  .btn-purple{background:#7c3aed;color:#fff;border:none;border-radius:6px;padding:10px 24px;font-size:13px;font-weight:700;cursor:pointer;letter-spacing:.5px;align-self:flex-end;margin-top:16px}
  .hero{background:url('/hackathon-bg.png') center/cover no-repeat;color:#fff;padding:48px 40px;position:relative;overflow:hidden;min-height:520px}
  .hero-overlay{position:absolute;inset:0;background:rgba(0,0,0,0.55);pointer-events:none}
  .blob1{position:absolute;top:0;left:30%;width:350px;height:350px;background:radial-gradient(circle,rgba(120,40,200,.25),transparent 70%);pointer-events:none}
  .blob2{position:absolute;bottom:0;right:5%;width:280px;height:280px;background:radial-gradient(circle,rgba(80,0,160,.3),transparent 70%);pointer-events:none}
  .hero-label{font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#aaa;margin-bottom:16px;position:relative;z-index:2}
  .hero-body{display:flex;gap:40px;position:relative;z-index:2;justify-content:space-between}
  .hero-left{flex:1;max-width:600px}
  h1{font-size:clamp(36px,5vw,60px);font-weight:900;line-height:1.1;margin-bottom:24px;text-transform:uppercase}
  .about-title{font-size:16px;font-weight:700;margin-bottom:10px;color:#e5e5e5}
  .about-text{font-size:13px;line-height:1.7;color:#ccc;max-width:520px;margin-bottom:32px}
  .stats{display:flex;gap:24px;flex-wrap:wrap}
  .stat{display:flex;align-items:center;gap:12px;background:rgba(255,255,255,.07);border-radius:10px;padding:14px 20px;min-width:180px}
  .stat-num{font-size:16px;font-weight:800;color:#fff}
  .stat-label{font-size:11px;color:#bbb;text-transform:uppercase;letter-spacing:1px}
  .ticket-card{width:320px;flex-shrink:0;border-radius:12px;overflow:hidden;box-shadow:0 8px 32px rgba(0,0,0,.5);align-self:flex-start}
  .ticket-header{display:none}
  .ticket-body{background:#fff;padding:28px;display:flex;flex-direction:column;gap:18px}
  .ticket-cta-top{background:#7c3aed;color:#fff;border:none;border-radius:8px;padding:14px;font-size:15px;font-weight:700;cursor:pointer;width:100%;letter-spacing:.5px}
  .ticket-row{display:flex;align-items:flex-start;gap:10px}
  .ticket-row span{font-size:20px;margin-top:2px}
  .ticket-sub{font-size:11px;color:#999;margin-bottom:2px}
  .ticket-main{font-size:14px;color:#111;font-weight:600}
  .ticket-hint{font-size:12px;color:#666}
  .divider{border-top:1px solid #eee}
  .share-label{font-size:11px;color:#999;margin-bottom:10px;text-transform:uppercase;letter-spacing:1px}
  .share-btns{display:flex;gap:10px}
  .share-btn{width:34px;height:34px;border-radius:50%;background:rgba(255,255,255,.1);border:none;color:#fff;font-size:13px;cursor:pointer;font-weight:700}
  .ticket-cta{background:#7c3aed;color:#fff;border:none;border-radius:8px;padding:12px;font-size:14px;font-weight:700;cursor:pointer;width:100%;letter-spacing:.5px;margin-top:4px}
  .events-section{background:#121212;padding:48px 40px}
  .events-section h2{font-size:22px;font-weight:800;color:#fff;margin-bottom:28px}
  .events-grid{display:flex;flex-direction:column;gap:24px}
  .event-card{display:flex;background:#1e1e1e;border-radius:10px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,.4);width:100%}
  .event-thumb{width:200px;flex-shrink:0;display:flex;align-items:center;justify-content:center;color:#fff;font-size:14px;font-weight:700;text-align:center;padding:12px;line-height:1.5;white-space:pre-line;overflow:hidden;min-height:160px}
  .event-thumb img{width:100%;height:100%;object-fit:cover;display:block}
  .event-info{padding:20px 24px;flex:1;display:flex;flex-direction:column;justify-content:space-between}
  .event-title{font-size:17px;font-weight:700;color:#fff;margin-bottom:8px}
  .event-desc{font-size:14px;color:#aaa;line-height:1.7;margin-bottom:0}
  footer{background:#0d0d0d;color:#ccc;padding:40px 40px 0}
  .footer-top{display:flex;gap:48px;flex-wrap:wrap;padding-bottom:32px;border-bottom:1px solid rgba(255,255,255,.08)}
  .footer-brand{flex:1 1 200px;max-width:260px}
  .footer-logo{display:flex;align-items:center;gap:8px;margin-bottom:12px;font-weight:700;font-size:16px;color:#fff}
  .footer-logo-icon{width:28px;height:28px;background:#7c3aed;border-radius:5px;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:13px}
  .footer-tagline{font-size:12px;color:#888;line-height:1.7}
  .footer-col{flex:1 1 140px}
  .footer-col h4{font-weight:700;font-size:13px;color:#fff;margin-bottom:14px}
  .footer-col a{display:block;text-decoration:none;color:#888;font-size:12px;margin-bottom:8px}
  .footer-bottom{display:flex;justify-content:space-between;align-items:center;padding:16px 0;flex-wrap:wrap;gap:8px;font-size:11px;color:#555}
  .footer-bottom a{text-decoration:none;color:#555;margin-left:20px}
`;
