//strictmode is development tool which helps to find possible something wrong problem in react 
import { StrictMode } from 'react'
//createroot is container which contain or react puts the application 
import { createRoot } from 'react-dom/client'

//it loads css file
import './App.css'

//it load app.jsx file
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App /> //we are displaying app
  </StrictMode>,
)
//render says display react component inside the root
// find #root then put app inside it then react render the app then user dee the web