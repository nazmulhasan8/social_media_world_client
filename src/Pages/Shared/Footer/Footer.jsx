import React from 'react';
import { Link } from 'react-router-dom';
import footer from '../../../assets/images/footer.png';

const Footer = () => {
    return (
        <div className='bg-base-300 text-center'>
        <footer
        style={{
            background: `url(${footer})`,
            backgroundSize: 'cover'
        }}
    className="p-10">
        <div className='footer '>
            <div>
                <span className="footer-title">Services</span>
                <Link to="/" className="link link-hover">Web Development</Link>
                <Link to="/" className="link link-hover">Responsive Design</Link>
                <Link to="/" className="link link-hover">Training And Help</Link>
                <Link to="/" className="link link-hover">Advertisement</Link>
            </div>
            <div>
                <span className="footer-title">Website</span>
                <a href="#landing-page" className="footer-nav-link">Home</a>
      <a href="#about" className="footer-nav-link">About</a>
      <a href="#services" className="footer-nav-link">Services</a>
      <a href="#projects" className="footer-nav-link">Projects</a>
      <a href="#contact" className="footer-nav-link">Contact</a>
            </div>
           
            <div>
                <span className="footer-title">Legal</span>
                <Link to="/" className="link link-hover">Terms of use</Link>
                <Link to="/" className="link link-hover">Privacy policy</Link>
                <Link to="/" className="link link-hover">Cookie policy</Link>
            </div>

            <div>
                <span className="footer-title">Contact Information</span>
                <Link to="/" className="link link-hover">Email: nazmulhasancse7@gmail.com</Link>
                <Link to="/" className="link link-hover">Phone: +880-19695-17822</Link>
                <Link to="/" className="link link-hover">Address: Savar,Dhaka,Bangladesh</Link>
            </div>

        </div>
        <div className='text-center mt-32'>
            <p>Copyright © 2024 - All right reserved by Nazmul Hasan</p>
        </div>
    </footer>
    </div>
    );
};

export default Footer;