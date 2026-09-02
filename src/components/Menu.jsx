function Menu({ addToCart }) {

  const coffees = [
    {
      id: 1,
      name: "Cappuccino",
      description: "Rich espresso with smooth steamed milk.",
      price: 180,
      image: "/menu/cappuccino.jpg"
    },
    {
      id: 2,
      name: "Café Latte",
      description: "Smooth espresso blended with creamy milk.",
      price: 190,
      image: "/menu/latte.jpg"
    },
    {
      id: 3,
      name: "Espresso",
      description: "Strong and bold coffee with rich flavour.",
      price: 140,
      image: "/menu/espresso.jpg"
    },
    {
      id: 4,
      name: "Mocha",
      description: "Chocolate, espresso and milk in one cup.",
      price: 200,
      image: "/menu/mocha.jpg"
    },
    {
      id: 5,
      name: "Americano",
      description: "Espresso combined with hot water.",
      price: 150,
      image: "/menu/americano.jpg"
    },
    {
      id: 6,
      name: "Caramel Macchiato",
      description: "Espresso, steamed milk and caramel.",
      price: 220,
      image: "/menu/macchiato.jpg"
    }
  ]

  return (
    <section id="menu" className="menu-section">

      <div className="menu-heading">

        <p>OUR MENU</p>

        <h2>
          Made With Love,
          <br />
          Served With Warmth
        </h2>

        <span>
          Discover our selection of freshly prepared food and drinks.
        </span>

      </div>


      <div className="menu-category">

        <h3 className="category-title">
          COFFEE
        </h3>


        <div className="menu-grid">

          {coffees.map((coffee) => (

            <div
              className="menu-card"
              key={coffee.id}
            >

              <div className="menu-image">

                <img
                  src={coffee.image}
                  alt={coffee.name}
                />

              </div>


              <div className="menu-card-content">

                <h3>
                  {coffee.name}
                </h3>

                <p>
                  {coffee.description}
                </p>


                <div className="menu-bottom">

                  <strong>
                    ₹{coffee.price}
                  </strong>


                  <div className="menu-buttons">

                    <button
                      className="add-cart-button"
                      onClick={() => addToCart(coffee)}
                    >
                      ADD TO CART
                    </button>

                    <button
                      className="order-button"
                      onClick={() => addToCart(coffee)}
                    >
                      ORDER NOW
                    </button>

                  </div>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  )
}

export default Menu