import slider from './images/slider-img.png'
import './css/responsive.css';
import './css/style.css';
import './css/home.css';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';


const Index = () => {
    return (
        <>
            <Navbar style={{ backgroundColor: "#222a33" }} active1={"active"} />
            <main className="hero_area">
                <section className="slider_section home-hero" aria-labelledby="home-title">
                    <div className="home-hero-container">
                        <div className="home-hero-content">
                            <p className="home-eyebrow">LEARN WITHOUT LIMITS</p>
                            <div className="detail_box">
                                <h1 id="home-title">
                                    The best <span>E-learning</span> platform
                                </h1>
                                <p className="home-hero-description">
                                    Unlock your potential anytime, anywhere with
                                    personalized learning support and instant answers.
                                </p>
                                <div className="btn-box">
                                    <Link to="/question" className="btn-1">
                                        Ask a Question
                                    </Link>
                                    <Link to="/about" className="btn-2">
                                        Explore Studlearn
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="home-hero-visual">
                            <div className="home-hero-glow" aria-hidden="true" />
                            <img src={slider} alt="Student learning with Studlearn" />
                            <div className="home-hero-card" aria-hidden="true">
                                <strong>Smart learning</strong>
                                <span>Support when you need it</span>
                            </div>
                        </div>
                    </div> 
                </section>
            </main>
        </>
    )
}

export default Index
