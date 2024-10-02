import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import Home from './pages/Home.jsx'
import Dashboard from './components/Dashboard.jsx'
import Callback from './components/Callback.jsx';
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <StrictMode>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='App' element={<App/>} />
      <Route path="/callback" element={<Callback />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  </StrictMode>,
  </BrowserRouter>
)
