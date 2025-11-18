import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import MainContent from './components/MainContent'
import Footer from './components/Footer'
import AllCommentsPage from './components/AllCommentsPage' // Add this import

function App() {
  return (
    <Router>
      <Header />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/all-comments" element={<AllCommentsPage />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  )
}

export default App