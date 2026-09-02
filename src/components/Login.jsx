import { useState } from 'react'
import { Link } from 'react-router-dom'

function Login() {

  const [isSignup, setIsSignup] = useState(false)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')


  const handleSubmit = (e) => {

    e.preventDefault()


    // SIGN UP
    if (isSignup) {

      if (!name || !email || !password || !confirmPassword) {
        alert('Please fill all the fields.')
        return
      }

      if (password !== confirmPassword) {
        alert('Passwords do not match.')
        return
      }

      alert('Account created successfully! ☕')

      // After signup, show login form
      setIsSignup(false)

      setName('')
      setEmail('')
      setPassword('')
      setConfirmPassword('')

      return
    }


    // LOGIN
    if (!email || !password) {
      alert('Please enter email and password.')
      return
    }

    alert('Login successful! ☕')
  }


  return (
    <div className="login-page">

      <div className="login-box">


        {/* LOGO */}

        <Link
          to="/"
          className="login-logo"
        >
          BREWED FOR U
        </Link>


        {/* HEADING */}

        <p className="login-label">
          {isSignup ? 'CREATE ACCOUNT' : 'WELCOME BACK'}
        </p>


        <h1>
          {isSignup
            ? 'Create Your Account'
            : 'Login to Your Account'
          }
        </h1>


        <p className="login-subtitle">

          {isSignup
            ? 'Create an account to enjoy the Brewed For U experience.'
            : 'Welcome back! Please enter your details.'
          }

        </p>


        {/* FORM */}

        <form onSubmit={handleSubmit}>


          {/* NAME - ONLY SIGN UP */}

          {isSignup && (

            <div className="login-field">

              <label>
                Full Name
              </label>

              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
              />

            </div>

          )}


          {/* EMAIL */}

          <div className="login-field">

            <label>
              Email Address
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />

          </div>


          {/* PASSWORD */}

          <div className="login-field">

            <label>
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />

          </div>


          {/* CONFIRM PASSWORD - ONLY SIGN UP */}

          {isSignup && (

            <div className="login-field">

              <label>
                Confirm Password
              </label>

              <input
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(e.target.value)
                }
              />

            </div>

          )}


          {/* LOGIN OPTIONS */}

          {!isSignup && (

            <div className="login-options">

              <label>

                <input type="checkbox" />

                Remember me

              </label>


              <a href="#forgot">
                Forgot Password?
              </a>

            </div>

          )}


          {/* BUTTON */}

          <button
            type="submit"
            className="login-button"
          >

            {isSignup
              ? 'CREATE ACCOUNT'
              : 'LOGIN'
            }

          </button>

        </form>


        {/* SWITCH LOGIN / SIGNUP */}

        <p className="signup-text">

          {isSignup
            ? 'Already have an account?'
            : "Don't have an account?"
          }


          <button
            type="button"
            className="switch-auth"
            onClick={() =>
              setIsSignup(!isSignup)
            }
          >

            {isSignup
              ? 'Login'
              : 'Sign Up'
            }

          </button>

        </p>


        {/* BACK HOME */}

        <Link
          to="/"
          className="back-home"
        >
          ← Back to Home
        </Link>


      </div>

    </div>
  )
}


export default Login