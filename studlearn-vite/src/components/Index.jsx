import React from 'react';
import slider from './images/slider-img.png'
import './css/responsive.css';
import './css/style.css';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';


const Index = (props) => {
    return (
        <>
            <Navbar style={{ backgroundColor: "#222a33" }} active1={"active"} />
            <div className="hero_area">
                <section className=" slider_section ">
                    <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-md-6 ">
                                            <div className="detail_box">
                                                <h1>
                                                    The best E-learning platform
                                                </h1>
                                                <p>
                                                    Unlock Your Potential Anytime, Anywhere with our E-Learning Platform
                                                </p>
                                                <div className="btn-box">
                                                    <Link to="/contact" className="btn-1">
                                                        Contact Us
                                                    </Link>
                                                    <Link to="/question" className="btn-2">
                                                        Query
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="img-box">
                                                <img src={slider} alt="Not Found" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="carousel_btn-container">
                            <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                                <span className="sr-only">Previous</span>
                            </a>
                            <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                                <span className="sr-only">Next</span>
                            </a>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default Index
