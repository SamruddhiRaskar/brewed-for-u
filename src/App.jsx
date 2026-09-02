import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import Hero from './components/Hero'
import WhyChooseUs from './components/WhyChooseUsTemp.jsx'
import Menu from './components/Menu'
import Cart from './components/Cart'
import Feedback from './components/Feedback'
import Checkout from './components/Checkout'
import Login from './components/Login'
import Contact from './components/Contact'
import Footer from './components/Footer'


function Home() {

 const [cart, setCart] = useState(() => {
  const savedCart = localStorage.getItem('cart')

  return savedCart ? JSON.parse(savedCart) : []
})
useEffect(() => {
  localStorage.setItem('cart', JSON.stringify(cart))
}, [cart])


  const addToCart = (coffee) => {

    setCart((currentCart) => {

      const existingItem = currentCart.find(
        (item) => item.id === coffee.id
      )

      if (existingItem) {

        return currentCart.map((item) =>
          item.id === coffee.id
            ? {
                ...item,
                quantity: item.quantity + 1
              }
            : item
        )

      }

      return [
        ...currentCart,
        {
          ...coffee,
          quantity: 1
        }
      ]

    })
  }


  return (
    <>
      <Navbar />

      <Hero />

      <WhyChooseUs />

      <Menu
        addToCart={addToCart}
      />

      <Cart
        cart={cart}
        setCart={setCart}
      />

      <Feedback />

      <Checkout
        cart={cart}
        setCart={setCart}
      />
      <Footer />
     
    </>
  )
}


function App() {

  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

         <Route
    path="/contact"
    element={<Contact />}
  />

      </Routes>

    </BrowserRouter>
  )
}


export default App