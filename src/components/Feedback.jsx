function Feedback() {

  return (
    <section id="feedback" className="feedback-section">

      <div className="feedback-container">

        <div className="feedback-heading">

          <p className="feedback-label">
            CUSTOMER FEEDBACK
          </p>

          <h2>
            What Our Customers Say
          </h2>

          <span>
            We love hearing from the people who make Brewed For U special.
          </span>

        </div>


        <div className="feedback-grid">

          <div className="feedback-card">

            <div className="stars">
              ★★★★★
            </div>

            <p>
              "The coffee was amazing and the ambience was
              so peaceful. Definitely coming back again!"
            </p>

            <h3>
              Priya
            </h3>

            <span>
              Regular Customer
            </span>

          </div>


          <div className="feedback-card">

            <div className="stars">
              ★★★★★
            </div>

            <p>
              "Loved the cappuccino! The coffee was fresh,
              creamy and perfectly prepared."
            </p>

            <h3>
              Rahul
            </h3>

            <span>
              Coffee Lover
            </span>

          </div>


          <div className="feedback-card">

            <div className="stars">
              ★★★★☆
            </div>

            <p>
              "Beautiful place with delicious food.
              The staff was friendly and welcoming."
            </p>

            <h3>
              Ananya
            </h3>

            <span>
              Happy Customer
            </span>

          </div>

        </div>


        <div className="feedback-form">

          <h3>
            Share Your Experience
          </h3>

          <div className="feedback-inputs">

            <input
              type="text"
              placeholder="Your Name"
            />

            <select defaultValue="">
              <option value="" disabled>
                Give Rating
              </option>

              <option value="5">
                ★★★★★ Excellent
              </option>

              <option value="4">
                ★★★★☆ Very Good
              </option>

              <option value="3">
                ★★★☆☆ Good
              </option>

              <option value="2">
                ★★☆☆☆ Average
              </option>

              <option value="1">
                ★☆☆☆☆ Poor
              </option>

            </select>

          </div>


          <textarea
            placeholder="Write your feedback..."
            rows="5"
          ></textarea>


          <button className="feedback-button">
            SUBMIT FEEDBACK
          </button>

        </div>

      </div>

    </section>
  )
}

export default Feedback