import { Link } from 'react-router-dom'


function Contact() {

  const handleSubmit = (e) => {

    e.preventDefault()

    alert('Thank you! We will get back to you soon. ☕')

  }


  return (
    <div className="contact-page">

      <div className="contact-page-container">


        {/* LOGO */}

        <Link
          to="/"
          className="contact-logo"
        >
          BREWED FOR U
        </Link>


        {/* HEADING */}

        <div className="contact-page-heading">

          <p>
            GET IN TOUCH
          </p>

          <h1>
            We'd Love To
            <br />
            Hear From You
          </h1>

          <span>
            Have a question, suggestion or just want to say hello?
          </span>

        </div>


        {/* CONTACT CONTENT */}

        <div className="contact-page-content">


          {/* INFORMATION */}

          <div className="contact-info-box">

            <h2>
              Visit Our Café
            </h2>


            <div className="contact-detail">

              <div className="contact-detail-icon">
                📍
              </div>

              <div>
                <strong>Address</strong>

                <p>
                  Brewed For U Café
                  <br />
                  Pune, Maharashtra, India
                </p>
              </div>

            </div>


            <div className="contact-detail">

              <div className="contact-detail-icon">
                📞
              </div>

              <div>
                <strong>Phone</strong>

                <p>
                  +91 98765 43210
                </p>
              </div>

            </div>


            <div className="contact-detail">

              <div className="contact-detail-icon">
                ✉️
              </div>

              <div>
                <strong>Email</strong>

                <p>
                  hello@brewedforu.com
                </p>
              </div>

            </div>


            <div className="contact-detail">

              <div className="contact-detail-icon">
                🕐
              </div>

              <div>
                <strong>Opening Hours</strong>

                <p>
                  Monday - Sunday
                  <br />
                  8:00 AM - 10:00 PM
                </p>
              </div>

            </div>

          </div>


          {/* FORM */}

          <div className="contact-form-box">

            <h2>
              Send Us A Message
            </h2>


            <form onSubmit={handleSubmit}>

              <div className="contact-field">

                <label>
                  Your Name
                </label>

                <input
                  type="text"
                  placeholder="Enter your name"
                  required
                />

              </div>


              <div className="contact-field">

                <label>
                  Email Address
                </label>

                <input
                  type="email"
                  placeholder="Enter your email"
                  required
                />

              </div>


              <div className="contact-field">

                <label>
                  Message
                </label>

                <textarea
                  rows="6"
                  placeholder="Write your message..."
                  required
                ></textarea>

              </div>


              <button
                type="submit"
                className="contact-button"
              >
                SEND MESSAGE
              </button>

            </form>

          </div>

        </div>


        {/* BACK HOME */}

        <Link
          to="/"
          className="contact-back-home"
        >
          ← Back to Home
        </Link>

      </div>

    </div>
  )
}


export default Contact