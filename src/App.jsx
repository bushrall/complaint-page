import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Header from './components/Header'
import MainContent from './components/MainContent'
import Footer from './components/Footer'

function App() {
  return (
    <Router>
      <Header />
      <div className="main-content">
        <MainContent />
      </div>
      <Footer />
    </Router>
  )
}

export default App