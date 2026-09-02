import { Link } from 'react-router-dom'

function Footer() {

  return (
    <footer className="footer">

      <div className="footer-container">

        {/* Brand */}
        <div className="footer-brand">

          <Link to="/" className="footer-logo">
            BREWED FOR U
          </Link>

          <p>
            Freshly brewed coffee, delicious food,
            and warm moments made just for you.
          </p>

          <div className="footer-socials">

            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              ◎
            </a>

            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
            >
              ☎
            </a>

            <a
              href="tel:+919876543210"
              aria-label="Call us"
            >
              📞
            </a>

            <a
              href="mailto:hello@brewedforu.com"
              aria-label="Email us"
            >
              ✉
            </a>

          </div>

        </div>


        {/* Quick Links */}
        <div className="footer-column">

          <h3>QUICK LINKS</h3>

          <a href="/#about">About</a>

          <a href="/#menu">Menu</a>

          <a href="/#cart">Cart</a>

          <Link to="/contact">
            Contact
          </Link>

          <Link to="/login">
            Login
          </Link>

        </div>


        {/* Contact */}
        <div className="footer-column">

          <h3>CONTACT US</h3>

          <a href="tel:+919876543210">
            📞 +91 98765 43210
          </a>

          <a href="mailto:hello@brewedforu.com">
            ✉ hello@brewedforu.com
          </a>

          <p>
            📍 Pune, Maharashtra,
            <br />
            India
          </p>

        </div>


        {/* Opening Hours */}
        <div className="footer-column">

          <h3>OPENING HOURS</h3>

          <p>
            Monday - Sunday
          </p>

          <p>
            8:00 AM - 10:00 PM
          </p>

          <p className="footer-message">
            Come in, grab a cup
            <br />
            and stay awhile. ☕
          </p>

        </div>

      </div>


      {/* Bottom */}
      <div className="footer-bottom">

        <p>
          © 2026 BREWED FOR U. All rights reserved.
        </p>

        <p>
          Made with ☕ & ❤️
        </p>

      </div>

    </footer>
  )
}

export default Footer