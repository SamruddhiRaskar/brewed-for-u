import { useEffect, useState } from "react";
function Menu({ addToCart }) {

const [coffees, setCoffees] = useState([]);

useEffect(() => {
  fetch("/api/products")
    .then((response) => response.json())
    .then((data) => {
      console.log("Products from backend:", data);
      const products = data.map((product) => ({
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        image: product.image_url
      }));

      setCoffees(products);
    })
    .catch((error) => {
      console.error("Failed to fetch products:", error);
    });
}, []);

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