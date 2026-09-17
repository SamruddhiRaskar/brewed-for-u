import { useState } from 'react'
import { Link } from 'react-router-dom'

// import is always used to define another file or package

// react router component is used for navigation or routing
// which page to show

// routing decides which page to open from a particular URL

function Navbar() {

  // Check if a user is already logged in
  const [user, setUser] = useState(() => {

    const savedUser = localStorage.getItem('user')

    return savedUser ? JSON.parse(savedUser) : null

  })


  // Logout function
  const handleLogout = () => {

    // Remove user from localStorage
    localStorage.removeItem('user')

    // Update Navbar immediately
    setUser(null)

  }


  // here nav is semantic tag which describes clearly this is navbar

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


        {/* Show different option depending on login status */}

        {user ? (

          <>

            <span className="welcome-user">
              👤 {user.name}
            </span>

            <button
              type="button"
              className="logout-button"
              onClick={handleLogout}
            >
              Logout
            </button>

          </>

        ) : (

          <Link to="/login">
            Login
          </Link>

        )}

      </div>

    </nav>

  )
}

export default Navbar