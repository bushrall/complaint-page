import React from 'react'

function Footer() {
  return (
    <footer>
        <div class="footer-content">
            <div class="footer-column">
                <h3>SmartResid</h3>
                <p>Transforming student residence management with innovative digital solutions.</p>
                <div class="social-icons">
                    <a href="#"><i class="fab fa-facebook-f"></i></a>
                    <a href="#"><i class="fab fa-twitter"></i></a>
                    <a href="#"><i class="fab fa-instagram"></i></a>
                    <a href="#"><i class="fab fa-linkedin-in"></i></a>
                </div>
            </div>
            <div class="footer-column">
                <h3>Quick Links</h3>
                <a href="#home">Home</a>
                <a href="#services">Services</a>
                <a href="#about">About Us</a>
                <a href="#contact">Contact</a>
            </div>
            <div class="footer-column">
                <h3>Services</h3>
                <a href="#">Room Management</a>
                <a href="#">Restauration</a>
                    <a href="#">Maintenance</a>
                <a href="#">Events</a>
            </div>
            <div class="footer-column">
                <h3>Contact Us</h3>
                <p><i class="fas fa-map-marker-alt"></i> Mahelma 4, Sidi Abdellah, Algiers</p>
                <p><i class="fas fa-phone"></i> +213 111 222 333</p>
                <p><i class="fas fa-envelope"></i> smartresid@gmail.com</p>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; 2023 SmartResid. All rights reserved.</p>
        </div>
    </footer>
  )
}

export default Footer