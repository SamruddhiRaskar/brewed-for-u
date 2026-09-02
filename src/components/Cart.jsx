function Cart({ cart, setCart }) {

  const increaseQuantity = (id) => {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1
            }
          : item
      )
    )
  }


  const decreaseQuantity = (id) => {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    )
  }


  const removeFromCart = (id) => {
    setCart((currentCart) =>
      currentCart.filter(
        (item) => item.id !== id
      )
    )
  }


  const cartCount = cart.reduce(
    (total, item) =>
      total + item.quantity,
    0
  )


  const cartTotal = cart.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  )


  const goToCheckout = () => {

    document
      .getElementById('checkout')
      ?.scrollIntoView({
        behavior: 'smooth'
      })

  }


  return (
    <section
      id="cart"
      className="cart-section"
    >

      <div className="cart-heading">

        <h2>
          Your Cart 🛒
        </h2>

        <span>
          {cartCount}{' '}
          {cartCount === 1 ? 'item' : 'items'}
        </span>

      </div>


      {cart.length === 0 ? (

        <p className="empty-cart">
          Your cart is empty. Add something delicious! ☕
        </p>

      ) : (

        <>

          <div className="cart-items">

            {cart.map((item) => (

              <div
                className="cart-item"
                key={item.id}
              >

                <div className="cart-item-info">

                  <img
                    src={item.image}
                    alt={item.name}
                  />

                  <div>

                    <h3>
                      {item.name}
                    </h3>

                    <p>
                      ₹{item.price} each
                    </p>

                  </div>

                </div>


                <div className="quantity-control">

                  <button
                    onClick={() =>
                      decreaseQuantity(item.id)
                    }
                  >
                    −
                  </button>

                  <span>
                    {item.quantity}
                  </span>

                  <button
                    onClick={() =>
                      increaseQuantity(item.id)
                    }
                  >
                    +
                  </button>

                </div>


                <strong className="item-total">
                  ₹{item.price * item.quantity}
                </strong>


                <button
                  className="remove-button"
                  onClick={() =>
                    removeFromCart(item.id)
                  }
                >
                  REMOVE
                </button>

              </div>

            ))}

          </div>


          <div className="cart-total">

            <span>
              Total
            </span>

            <strong>
              ₹{cartTotal}
            </strong>

          </div>


          <button
            className="checkout-button"
            onClick={goToCheckout}
          >
            PROCEED TO CHECKOUT
          </button>

        </>

      )}

    </section>
  )
}

export default Cart