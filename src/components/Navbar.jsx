import { Link } from 'react-router-dom'


function Navbar() {

  return (
    <nav className="navbar">

      <div className="logo">
        BREWED FOR U
      </div>

      <div className="nav-links">

        <a href="/#about">
          About
        </a>

        <a href="/#menu">
          Menu
        </a>

        <a href="/#cart">
          Cart
        </a>

        <Link to="/contact">
        Contact
        </Link>

        <Link to="/login">
          Login
        </Link>

      </div>

    </nav>
  )
}


export default Navbar