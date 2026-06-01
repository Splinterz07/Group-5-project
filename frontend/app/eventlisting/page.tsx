const navLinks = ["Home", "Event/Booking", "Blog", "Contact", "Profile"];
const sortBy = ["Location", "Price", "Ratings"];

const posters = [
  { img: "/she-creates.jpg", alt: "She Creates" },
  { img: "/spiderman.jpg", alt: "Spider-Man: No Way Home" },
  { img: "/meetup.jpg", alt: "Meetup" },
  { img: "/football.jpg", alt: "Football match" },
];

const events = [
  {
    title: "Code Spark 2026",
    desc: "Got what it takes? Get an opportunity to pitch yourself to the tops runners of the industry",
    img: "/code-spark.jpg",
    meta: ["25TH APIRL 2026", "SST FOYER"],
  },
  {
    title: "FATHERLAND\nThe Musical",
    desc: "Experience the magic in tale of the people of Mahabu",
    img: "/fatherland.jpg",
    meta: ["5TH MAY 2026", "ABUJA CLASSROOM, TYD"],
  },
  {
    title: "SQUAD HACKATHON 3.0",
    desc: "Stand a cahnce to win N10,000,000 at Hackaton 3.0 by Squad",
    img: "/hackathon.jpg",
    meta: ["30TH MAY 2026", "THE LANDMARK CENTER, VI"],
  },
];

const footerCols = [
  { heading: "Company", items: ["Homepage", "Events", "Blog", "Contact"] },
  { heading: "Support", items: ["Help Center", "Terms", "Privacy", "Refunds"] },
  { heading: "Follow us", items: ["Facebook", "Instagram", "Tiktok"] },
];

export default function EventListingPage() {
  return (
    <>
      <style>{styles}</style>

      {/* Nav */}
      <nav className="nav">
        <div className="logo">Bookify</div>
        <div className="nav-links">
          {navLinks.map((l) => (
            <a key={l} href="#">{l}</a>
          ))}
        </div>
        <div className="nav-actions">
          <button className="btn-signup">SIGN UP</button>
          <button className="btn-login">LOG IN</button>
        </div>
      </nav>

      {/* Sort + posters */}
      <section className="top">
        <div className="sort">
          <span className="sort-label">Sort by:</span>
          {sortBy.map((s) => (
            <a key={s} href="#" className="sort-link">{s}</a>
          ))}
        </div>

        <div className="posters">
          {posters.map((p) => (
            <div key={p.alt} className="poster">
              <img src={p.img} alt={p.alt} />
            </div>
          ))}
        </div>
      </section>

      {/* Events for you */}
      <section className="events">
        <h2 className="events-heading">Events for you</h2>

        <div className="event-list">
          {events.map((e) => (
            <div key={e.title} className="event-card">
              <div className="event-text">
                <h3 className="event-title">{e.title}</h3>
                <p className="event-desc">{e.desc}</p>
              </div>

              <div className="event-thumb">
                <img src={e.img} alt={e.title.replace("\n", " ")} />
              </div>

              <ul className="event-meta">
                {e.meta.map((m) => (
                  <li key={m}>{m}</li>
                ))}
              </ul>

              <button className="btn-buy">Buy Tickets</button>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="newsletter">
        <h2>
          Get Latest Updates Subscribe To
          <br />
          Our Newsletter
        </h2>
        <div className="newsletter-input">
          <input type="email" placeholder="Enter email address" />
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-logo">Bookify</div>
            <p className="footer-tagline">
              A ticketing platform for making memorable experiences.
            </p>
          </div>

          <div className="footer-cols">
            {footerCols.map((col) => (
              <div key={col.heading} className="footer-col">
                <h4>{col.heading}</h4>
                {col.items.map((i) => (
                  <a key={i} href="#">{i}</a>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="footer-bottom">
          <span>Copyright 2026. All rights reserved.</span>
          <div className="footer-legal">
            <a href="#">Terms &amp; Conditions</a>
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
  body{font-family:sans-serif;background:#2e2742;color:#fff}

  .nav{display:flex;align-items:center;justify-content:space-between;padding:20px 48px;background:#3a2f55}
  .logo{font-family:'Brush Script MT',cursive;font-weight:700;font-size:30px;color:#fff}
  .nav-links{display:flex;gap:42px}
  .nav-links a{text-decoration:none;color:#f0eef5;font-size:15px}
  .nav-actions{display:flex;gap:12px}
  .btn-signup{background:#231c33;color:#fff;border:none;border-radius:999px;padding:9px 18px;font-size:12px;font-weight:700;cursor:pointer}
  .btn-login{background:#7c3aed;color:#fff;border:none;border-radius:999px;padding:9px 20px;font-size:12px;font-weight:700;cursor:pointer}

  .top{padding:34px 48px}
  .sort{display:flex;align-items:center;gap:22px;margin-bottom:26px}
  .sort-label{font-weight:700;font-size:15px}
  .sort-link{color:#fff;text-decoration:none;font-size:15px}
  .posters{display:grid;grid-template-columns:repeat(4,1fr);gap:22px}
  .poster{aspect-ratio:9/16;border-radius:6px;overflow:hidden;background:#221b34}
  .poster img{width:100%;height:100%;object-fit:cover;display:block}

  .events{padding:30px 48px 60px}
  .events-heading{font-size:32px;font-weight:800;margin-bottom:34px}
  .event-list{display:flex;flex-direction:column;gap:30px}
  .event-card{display:grid;grid-template-columns:1.1fr 1.3fr 1fr auto;align-items:center;gap:36px;background:#272233;border-radius:14px;padding:26px 32px}
  .event-text{max-width:230px}
  .event-title{font-size:16px;font-weight:700;white-space:pre-line;margin-bottom:14px;line-height:1.35}
  .event-desc{font-size:14px;color:#cdc6da;line-height:1.6}
  .event-thumb{border-radius:8px;overflow:hidden;background:#1c172c;aspect-ratio:16/10}
  .event-thumb img{width:100%;height:100%;object-fit:cover;display:block}
  .event-meta{list-style:disc;padding-left:22px;display:flex;flex-direction:column;gap:20px}
  .event-meta li{font-size:14px;font-weight:700;color:#fff}
  .btn-buy{background:#7c3aed;color:#fff;border:none;border-radius:999px;padding:14px 32px;font-size:14px;font-weight:700;cursor:pointer;white-space:nowrap}

  .newsletter{background:linear-gradient(110deg,#6d2fd6 0%,#5a2bb0 35%,#3a2e52 80%);padding:64px 48px;text-align:center}
  .newsletter h2{font-size:38px;font-weight:800;margin-bottom:34px;line-height:1.25}
  .newsletter-input{max-width:680px;margin:0 auto}
  .newsletter-input input{width:100%;background:transparent;border:1px solid #b9a8e0;border-radius:999px;padding:20px 28px;font-size:16px;color:#fff;text-align:center}
  .newsletter-input input::placeholder{color:#d7cdeb}

  footer{background:#231d33;padding:56px 48px 28px}
  .footer-top{display:flex;justify-content:space-between;gap:48px;flex-wrap:wrap;padding-bottom:36px;border-bottom:1px solid rgba(255,255,255,.1)}
  .footer-brand{max-width:280px}
  .footer-logo{font-family:'Brush Script MT',cursive;font-weight:700;font-size:32px;color:#fff;margin-bottom:14px}
  .footer-tagline{font-size:14px;color:#a79fbc;line-height:1.7}
  .footer-cols{display:flex;gap:64px;flex-wrap:wrap}
  .footer-col h4{font-size:14px;font-weight:700;color:#fff;margin-bottom:16px}
  .footer-col a{display:block;text-decoration:none;color:#a79fbc;font-size:14px;margin-bottom:10px}
  .footer-col a:hover{color:#fff}
  .footer-bottom{display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;padding-top:24px;font-size:13px;color:#8a82a0}
  .footer-legal{display:flex;gap:24px}
  .footer-legal a{color:#8a82a0;text-decoration:none}
  .footer-legal a:hover{color:#fff}

  @media(max-width:900px){
    .nav{flex-wrap:wrap;gap:16px;justify-content:center}
    .nav-links{gap:20px}
    .posters{grid-template-columns:repeat(2,1fr)}
    .event-card{grid-template-columns:1fr;text-align:center;justify-items:center}
    .event-meta{align-items:center}
    .newsletter h2{font-size:26px}
    .footer-top{flex-direction:column;gap:32px}
    .footer-cols{gap:40px}
    .footer-bottom{flex-direction:column;text-align:center}
  }
`;
