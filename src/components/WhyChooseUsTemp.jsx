function WhyChooseUs() {
  return (
    <section id="about" className="why-section">

      <div className="why-content">

        <p className="why-label">
          WHY CHOOSE US
        </p>

        <h2>
          More Than Just
          <br />
          Coffee
        </h2>

        <p className="why-description">
          At Brewed For U, we believe every cup tells a story.
          From the finest beans to the coziest ambience, we are
          here to make your moments better.
        </p>

        <div className="why-points">

          <div className="why-point">
            <div className="why-icon">Coffee</div>

            <div>
              <h3>Premium Quality Beans</h3>
              <p>
                We source only the finest beans from
                the best coffee farms.
              </p>
            </div>
          </div>

          <div className="why-point">
            <div className="why-icon">Quality</div>

            <div>
              <h3>Expertly Brewed</h3>
              <p>
                Our baristas craft each cup with
                passion and perfection.
              </p>
            </div>
          </div>

          <div className="why-point">
            <div className="why-icon">Cozy</div>

            <div>
              <h3>Cozy Ambiance</h3>
              <p>
                A warm and inviting space to relax,
                work or catch up.
              </p>
            </div>
          </div>

          <div className="why-point">
            <div className="why-icon">Love</div>

            <div>
              <h3>Made With Love</h3>
              <p>
                Because great coffee comes from
                the heart.
              </p>
            </div>
          </div>

        </div>

      </div>

      <div className="why-image">
        <img
          src="/why-coffee.jpg"
          alt="Freshly brewed coffee"
        />
      </div>

    </section>
  )
}

export default WhyChooseUs