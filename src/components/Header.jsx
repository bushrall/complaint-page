import React, { useState, useEffect } from 'react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(null);

  const students = [
    {
      id: "242437335502",
      password: "2006/06/08Maria",
      fullName: "Maria Ines RAHEB",
      firstName: "Maria Ines",
      lastName: "RAHEB",
      email: "maria-ines.raheb@ensia.edu.dz",
      phone: "+213 555 29 53 17",
      address: "ENSIA Residence",
      room: "Building A, Room 25",
      profilePicture: "/assets/img/profile pics/user1.jpg",
    },
    // Add other students as needed
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const savedStudent = localStorage.getItem("currentStudent");
    if (savedStudent) {
      setCurrentStudent(JSON.parse(savedStudent));
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMenuToggle = () => {
    setIsMenuActive(!isMenuActive);
  };

  const handleCloseMenu = () => {
    setIsMenuActive(false);
  };

  const handleLogin = (student) => {
    setCurrentStudent(student);
    localStorage.setItem("currentStudent", JSON.stringify(student));
    setIsMenuActive(false);
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      setCurrentStudent(null);
      localStorage.removeItem("currentStudent");
      window.location.href = "/";
    }
  };

  const handleSignUpClick = () => {
    console.log("Sign up clicked");
  };

  return (
    <header className={`smartresid-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="smartresid-nav-bar">
        <div className="smartresid-nav-brand">
          <img
            src={isScrolled ? "./images/SmartResid logo beige.png" : "./images/SmartResid logo blue.png"}
            alt="SmartResid logo"
            className="smartresid-logo"
          />
          <h3 className="smartresid-nav-title">SmartResid</h3>
        </div>
        
        <div 
          className={`smartresid-menu-icon ${isMenuActive ? 'active' : ''}`}
          onClick={handleMenuToggle}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        <div className={`smartresid-nav-elements ${isMenuActive ? 'active' : ''}`}>
          <ul className="smartresid-nav-links">
            <li className="smartresid-nav-link">
              <a href="#home" onClick={handleCloseMenu}>Home</a>
            </li>
            <li className="smartresid-nav-link">
              <a href="#services" onClick={handleCloseMenu}>Services</a>
            </li>
            <li className="smartresid-nav-link">
              <a href="#about" onClick={handleCloseMenu}>About</a>
            </li>
            <li className="smartresid-nav-link">
              <a href="#contact" onClick={handleCloseMenu}>Contact</a>
            </li>
          </ul>
          
          {!currentStudent ? (
            <button className="smartresid-signup-btn" onClick={handleSignUpClick}>
              Sign Up
            </button>
          ) : (
            <div className="smartresid-student-profile">
              <div className="smartresid-profile-display">
                <img 
                  src={currentStudent.profilePicture} 
                  alt="Profile" 
                  className="smartresid-nav-profile-pic"
                />
                <span className="smartresid-profile-name">{currentStudent.fullName}</span>
              </div>
              <div className="smartresid-profile-dropdown">
                <button className="smartresid-logout-btn" onClick={handleLogout}>
                  Log Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;