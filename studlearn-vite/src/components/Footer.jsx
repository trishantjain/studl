import { Link } from 'react-router-dom';
import './css/footer.css';
// import Navbar from './Navbar';

function Footer() {

    return (
        <>
            <footer className='footer-color'>
                <section className="info_section layout_padding2">
                    <div className="footer-container">
                        <div className="footer-grid">
                            <div className="footer-column">
                                <div className="info_logo">
                                    <h3>
                                        STUDLEARN
                                    </h3>
                                    <p>
                                        Get Accurate and Instant Results with ChatGPT - Your Reliable AI Language Model."
                                    </p>
                                </div>
                            </div>
                            <div className="footer-column">
                                <div className="info_links">
                                    <h4>
                                        BASIC LINKS
                                    </h4>
                                    <ul className="  ">
                                        <li className=" ">
                                            <Link className="" to="/">Home<span className="sr-only">(current)</span></Link>
                                        </li>
                                        <li className="">
                                            <Link className="" to="/about">About</Link>
                                        </li>
                                        <li className="">
                                            <Link className="" to="/question">Services</Link>
                                        </li>
                                        <li className="">
                                            <Link className="" to="/contact">Contact Us</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="footer-column">
                                <div className="info_contact">
                                    <h4>
                                        CONTACT DETAILS
                                    </h4>
                                    <a href="/">
                                        <div className="img-box">
                                            <img src={('./images/telephone-white.png')} width="12px" alt="Not Found" />
                                        </div>
                                        <p>
                                            +91 7982757222
                                        </p>
                                    </a>
                                    <a href="/">
                                        <div className="img-box">
                                            <img src={('./images/envelope-white.png')} width="18px" alt="Not found" />
                                        </div>
                                        <p>
                                            trishantjain4444@gmail.com
                                        </p>
                                    </a>
                                </div>
                            </div>
                            <div className="footer-column">
                                <div className="info_form ">
                                    <h4>
                                        NEWSLETTER
                                    </h4>
                                    <form action="">
                                        <input type="email" placeholder="Enter your email" />
                                        <button>
                                            Subscribe
                                        </button>
                                    </form>
                                    <div className="social_box">
                                        <a href="/">
                                            <img src={('./images/info-fb.png')} alt="Not found" />
                                        </a>
                                        <a href="/">
                                            <img src={('./images/info-twitter.png')} alt="Not found" />
                                        </a>
                                        <a href="https://www.linkedin.com/in/trishant-jain" target='_blank' rel="noreferrer">
                                            <img src={('./images/info-linkedin.png')} alt="Not found" />
                                        </a>
                                        <a href="/">
                                            <img src={('./images/info-youtube.png')} alt="Not found" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="container-fluid footer_section">
                    <div className="footer-container">
                        <p>
                            &copy; {new Date().getFullYear()} All Rights Reserved By studlearn
                        </p>
                    </div>
                </section>
            </footer>
        </>
    )
}

export default Footer
