import { useState } from 'react'

function Checkout({ cart, setCart }) {

  const [paymentMethod, setPaymentMethod] = useState('')

  const [upiId, setUpiId] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvv, setCvv] = useState('')

  const [orderPlaced, setOrderPlaced] = useState(false)
  const [orderNumber, setOrderNumber] = useState('')


  const cartTotal = cart.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  )


  const cartCount = cart.reduce(
    (total, item) =>
      total + item.quantity,
    0
  )


  const placeOrder = () => {

    if (!paymentMethod) {
      alert('Please select a payment method.')
      return
    }


    if (paymentMethod === 'UPI' && !upiId) {
      alert('Please enter your UPI ID.')
      return
    }


    if (
      (paymentMethod === 'Credit Card' ||
        paymentMethod === 'Debit Card') &&
      (!cardNumber || !expiry || !cvv)
    ) {
      alert('Please enter all card details.')
      return
    }


    const newOrderNumber =
      'BFU-' + Math.floor(100000 + Math.random() * 900000)


    setOrderNumber(newOrderNumber)

    setOrderPlaced(true)
  }


  const printReceipt = () => {
    window.print()
  }


  if (orderPlaced) {

    return (
      <section
        id="receipt"
        className="checkout-section"
      >

        <div className="receipt">

          <p className="checkout-label">
            BREWED FOR U
          </p>

          <h2>
            Order Confirmed! ☕
          </h2>

          <p className="receipt-success">
            Thank you for your order.
          </p>


          <div className="receipt-details">

            <div>
              <span>Order Number</span>
              <strong>{orderNumber}</strong>
            </div>

            <div>
              <span>Payment Method</span>
              <strong>{paymentMethod}</strong>
            </div>

            <div>
              <span>Total Items</span>
              <strong>{cartCount}</strong>
            </div>

          </div>


          <div className="receipt-items">

            {cart.map((item) => (

              <div
                className="receipt-item"
                key={item.id}
              >

                <span>
                  {item.name} × {item.quantity}
                </span>

                <strong>
                  ₹{item.price * item.quantity}
                </strong>

              </div>

            ))}

          </div>


          <div className="receipt-total">

            <span>
              Total
            </span>

            <strong>
              ₹{cartTotal}
            </strong>

          </div>


          <div className="receipt-buttons">

            <button
              onClick={printReceipt}
              className="print-button"
            >
              PRINT RECEIPT
            </button>

            <button
              onClick={() => {
                setCart([])
                setOrderPlaced(false)
                setPaymentMethod('')
                setUpiId('')
                setCardNumber('')
                setExpiry('')
                setCvv('')
              }}
              className="new-order-button"
            >
              NEW ORDER
            </button>

          </div>

        </div>

      </section>
    )
  }


  return (
    <section
      id="checkout"
      className="checkout-section"
    >

      <div className="checkout-container">


        {/* HEADING */}

        <div className="checkout-heading">

          <p className="checkout-label">
            CHECKOUT
          </p>

          <h2>
            Complete Your Order
          </h2>

          <span>
            Choose your preferred payment method.
          </span>

        </div>


        <div className="checkout-content">


          {/* ORDER SUMMARY */}

          <div className="order-summary">

            <h3>
              Your Order
            </h3>


            {cart.map((item) => (

              <div
                className="summary-item"
                key={item.id}
              >

                <div>

                  <strong>
                    {item.name}
                  </strong>

                  <span>
                    Quantity: {item.quantity}
                  </span>

                </div>

                <strong>
                  ₹{item.price * item.quantity}
                </strong>

              </div>

            ))}


            <div className="summary-total">

              <span>
                Total
              </span>

              <strong>
                ₹{cartTotal}
              </strong>

            </div>

          </div>


          {/* PAYMENT */}

          <div className="payment-box">

            <h3>
              Select Payment Method
            </h3>


            <div className="payment-options">


              {/* UPI */}

              <label
                className={
                  paymentMethod === 'UPI'
                    ? 'payment-option selected'
                    : 'payment-option'
                }
              >

                <input
                  type="radio"
                  name="payment"
                  value="UPI"
                  checked={paymentMethod === 'UPI'}
                  onChange={(e) =>
                    setPaymentMethod(e.target.value)
                  }
                />

                <div>
                  <strong>UPI</strong>

                  <span>
                    Google Pay, PhonePe, Paytm, etc.
                  </span>
                </div>

              </label>


              {/* UPI FORM */}

              {paymentMethod === 'UPI' && (

                <div className="payment-form">

                  <label>
                    UPI ID
                  </label>

                  <input
                    type="text"
                    placeholder="example@upi"
                    value={upiId}
                    onChange={(e) =>
                      setUpiId(e.target.value)
                    }
                  />

                </div>

              )}


              {/* CREDIT CARD */}

              <label
                className={
                  paymentMethod === 'Credit Card'
                    ? 'payment-option selected'
                    : 'payment-option'
                }
              >

                <input
                  type="radio"
                  name="payment"
                  value="Credit Card"
                  checked={paymentMethod === 'Credit Card'}
                  onChange={(e) =>
                    setPaymentMethod(e.target.value)
                  }
                />

                <div>
                  <strong>Credit Card</strong>

                  <span>
                    Visa, Mastercard, RuPay
                  </span>
                </div>

              </label>


              {/* DEBIT CARD */}

              <label
                className={
                  paymentMethod === 'Debit Card'
                    ? 'payment-option selected'
                    : 'payment-option'
                }
              >

                <input
                  type="radio"
                  name="payment"
                  value="Debit Card"
                  checked={paymentMethod === 'Debit Card'}
                  onChange={(e) =>
                    setPaymentMethod(e.target.value)
                  }
                />

                <div>
                  <strong>Debit Card</strong>

                  <span>
                    Visa, Mastercard, RuPay
                  </span>
                </div>

              </label>


              {/* CARD FORM */}

              {(paymentMethod === 'Credit Card' ||
                paymentMethod === 'Debit Card') && (

                <div className="payment-form">

                  <label>
                    Card Number
                  </label>

                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    maxLength="19"
                    value={cardNumber}
                    onChange={(e) =>
                      setCardNumber(e.target.value)
                    }
                  />


                  <div className="card-row">

                    <div>

                      <label>
                        Expiry Date
                      </label>

                      <input
                        type="text"
                        placeholder="MM/YY"
                        maxLength="5"
                        value={expiry}
                        onChange={(e) =>
                          setExpiry(e.target.value)
                        }
                      />

                    </div>


                    <div>

                      <label>
                        CVV
                      </label>

                      <input
                        type="password"
                        placeholder="123"
                        maxLength="3"
                        value={cvv}
                        onChange={(e) =>
                          setCvv(e.target.value)
                        }
                      />

                    </div>

                  </div>

                </div>

              )}


              {/* CASH */}

              <label
                className={
                  paymentMethod === 'Cash'
                    ? 'payment-option selected'
                    : 'payment-option'
                }
              >

                <input
                  type="radio"
                  name="payment"
                  value="Cash"
                  checked={paymentMethod === 'Cash'}
                  onChange={(e) =>
                    setPaymentMethod(e.target.value)
                  }
                />

                <div>

                  <strong>
                    Cash
                  </strong>

                  <span>
                    Pay at the café
                  </span>

                </div>

              </label>


              {/* CASH MESSAGE */}

              {paymentMethod === 'Cash' && (

                <div className="cash-message">

                  💵 You can pay at the café when
                  you collect your order.

                </div>

              )}

            </div>


            <button
              className="place-order-button"
              onClick={placeOrder}
            >
              PLACE ORDER • ₹{cartTotal}
            </button>

          </div>

        </div>

      </div>

    </section>
  )
}

export default Checkout