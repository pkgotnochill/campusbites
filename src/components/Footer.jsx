import Icon from './Icon.jsx'

export default function Footer({ onNavigate }) {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-columns">
          <div className="footer-intro">
            <a className="brand" href="#menu" onClick={(event) => onNavigate(event, 'menu')}>
              <span className="brand-mark">
                <Icon name="plate" />
              </span>
              <span>
                campus<span className="brand-accent">bites.</span>
              </span>
            </a>
            <p>
              A little break. A great bite.
              <br />
              Good food, great company, right here in Chennai.
            </p>
          </div>
          <div>
            <h2>Hours</h2>
            <p>Mon – Fri: 11 AM – 11 PM</p>
            <p>Sat – Sun: 10 AM – 12 AM</p>
          </div>
          <div>
            <h2>Contact</h2>
            <p>Questions or special requests?</p>
            <p>Say hello to our team at the counter.</p>
            <a
              className="footer-menu-link"
              href="#menu"
              onClick={(event) => onNavigate(event, 'menu')}
            >
              Explore the menu ↗
            </a>
          </div>
          <div>
            <h2>Location</h2>
            <address>
              24 College Road, Nungambakkam
              <br />
              Chennai, Tamil Nadu 600006
            </address>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 Campus Bites. Made with care in Chennai.</p>
          <a href="#menu" onClick={(event) => onNavigate(event, 'menu')}>
            Back to the menu ↑
          </a>
        </div>
      </div>
    </footer>
  )
}
