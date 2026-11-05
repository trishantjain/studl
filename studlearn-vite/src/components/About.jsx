import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
// import "./css/ab";

function About() {
  return (
    <>
      <div>
        <Navbar style={{ backgroundColor: "#041858" }} active2={"active"} />
        <section className="about_section ">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <div className="img-box">
                  <img src={"./images/about-img2.png"} alt="" />
                </div>
              </div>
              <div className="col-md-6">
                <div className="detail-box">
                  <div className="heading_container">
                    <h2>About Us</h2>
                  </div>
                  <p>
                    An e-learning platform that incorporates teacher support and
                    chatbot technology could be a powerful tool for students
                    seeking help with their studies. Here is a possible
                    description for such a platform: Our e-learning platform is
                    designed to help students of all ages and levels succeed in
                    their academic pursuits. One of the unique features of our
                    platform is that it offers personalized support through both
                    human teachers and a chatbot powered by GPT technology.
                  </p>
                  <a href="/">Read More</a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}

export default About;
