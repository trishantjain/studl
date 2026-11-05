import React, { useState } from "react";
import Navbar from "./Navbar";
import { GoogleGenerativeAI } from "@google/generative-ai";
// import { NewsApi } from 'newsapi'
import "./css/question.css";
import { TypeAnimation } from "react-type-animation";

function Question() {
  const [ques, setQues] = useState({ userQues: "" });
  const [aiResult, setAiResult] = useState("");

  const viteImport = import.meta.env;

  const handleClick = async (e) => {
    // history("/")
    e.preventDefault();
    const response = await fetch(viteImport.VITE_APP_ADDQUES_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ userQues: ques.userQues }),
    });

    // Fetching GENAI API Key
    const apiKey = viteImport.VITE_PP_GENAI_API_KEY;
    console.log(apiKey);
    const genAI = new GoogleGenerativeAI(apiKey);

    // Specifying the model
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-pro",
    });

    // Updating note in frontend
    const user_question = await response.json();
    setQues({ userQues: "" });

    const generationConfig = {
      temperature: 1,
      topP: 0.95,
      topK: 64,
      maxOutputTokens: 8192,
      responseMimeType: "text/plain",
    };

    const chatSession = model.startChat({
      generationConfig,
      history: [],
    });

    // Updating result in Frontend
    const result = await chatSession.sendMessage(user_question.userQues);
    const genAnswer = result.response.text();
    console.log("Gen answer: " + genAnswer);

    // document.getElementsByClassName('answer').innerHTML = genAnswer;
    setAiResult(genAnswer);
    console.log("State Result: " + aiResult);
  };

  const onChange = (e) => {
    setQues({ ...ques, [e.target.name]: e.target.value });
  };

  return (
    <>
      {/* Navbar Section */}
      <Navbar style={{ backgroundColor: "#041858" }} active3={"active"} />

      {/* Main Section */}
      <section className="service_section layout_padding">
        <div className="container-fluid">
          <div className="heading_container my-4">
            <h2 className="my-4">Ask a Question</h2>
            <form id="form1" onSubmit={handleClick}>
              <div className="form-row input_dir">
                <div className="form-group input_st">
                  <input
                    type="text"
                    className="form-control"
                    id="query"
                    name="userQues"
                    placeholder="Search... "
                    value={ques.userQues}
                    onChange={onChange}
                  />
                </div>
                <button type="submit" className="mx-auto btn btn-success my-2">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Result Section */}
        <TypeAnimation
          key={aiResult} // It will re-render 'TypeAnimation' Component whenever 'aiResult' changes
          sequence={[
            aiResult || "Waiting for response",
            () => {
              console.log("Sequence completed");
            },
          ]}
          className="answer container ans_div my-4"
          wrapper="span"
          cursor={true}
          style={{ fontSize: "1em", display: "block" }}
        />

        <img id="imgGen my-3" alt="Img generating..." />
      </section>

      {/* Contact Section */}
      <div className="sub_page">
        <div className="footer_bg">
          <section className="contact_section layout_padding" id="contactLink">
            <div className="container">
              <div className="heading_container">
                <h2>Get In touch</h2>
              </div>
            </div>
            <div className="container">
              <div className="row">
                <div className="col-lg-6 col-md-8 mx-auto">
                  <form>
                    <div className="form-row">
                      <div className="form-group col-md-6">
                        <input
                          type="text"
                          className="form-control"
                          id="inputName4"
                          placeholder="Name "
                        />
                      </div>
                      <div className="form-group col-md-6">
                        <input
                          type="email"
                          className="form-control"
                          id="inputEmail4"
                          placeholder="Email id"
                        />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group col">
                        <input
                          type="text"
                          className="form-control"
                          id="inputSubject4"
                          placeholder="Subject"
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        id="inputMessage"
                        placeholder="Message"
                      />
                    </div>
                    <div className="d-flex justify-content-center">
                      <button type="submit" className="">
                        Send
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>

          {/* Footer Section */}
          <section className="info_section layout_padding2">
            <div className="container">
              <div className="row">
                <div className="col-md-3">
                  <div className="info_logo">
                    <h3>STUDLEARN</h3>
                    <p>
                      Get Accurate and Instant Results with ChatGPT - Your
                      Reliable AI Language Model."
                    </p>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="info_links">
                    <h4>BASIC LINKS</h4>
                    <ul className="  ">
                      <li className=" ">
                        <a className="" href="index.html">
                          Home<span className="sr-only">(current)</span>
                        </a>
                      </li>
                      <li className="">
                        <a className="" href="about.html">
                          About
                        </a>
                      </li>
                      <li className="active">
                        <a className="" href="service.html">
                          Services
                        </a>
                      </li>
                      <li className="">
                        <a className="" href="#contactLink">
                          Contact Us
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="info_contact">
                    <h4>CONTACT DETAILS</h4>
                    <a href="/">
                      <div className="img-box">
                        <img
                          src={("./images/telephone-white.png")}
                          width="12px"
                          alt="Not Found"
                        />
                      </div>
                      <p>+91 7982757222</p>
                    </a>
                    <a href="/">
                      <div className="img-box">
                        <img
                          src={("./images/envelope-white.png")}
                          width="18px"
                          alt="Not found"
                        />
                      </div>
                      <p>trishantjain4444@gmail.com</p>
                    </a>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="info_form ">
                    <h4>NEWSLETTER</h4>
                    <form action="">
                      <input type="email" placeholder="Enter your email" />
                      <button>Subscribe</button>
                    </form>
                    <div className="social_box">
                      <a href="/">
                        <img
                          src={("./images/info-fb.png")}
                          alt="Not found"
                        />
                      </a>
                      <a href="/">
                        <img
                          src={("./images/info-twitter.png")}
                          alt="Not found"
                        />
                      </a>
                      <a href="/">
                        <img
                          src={("./images/info-linkedin.png")}
                          alt="Not found"
                        />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="container-fluid footer_section">
            <div className="container">
              <p>
                &copy; <span id="displayYear"></span> All Rights Reserved By
                studlearn
              </p>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default Question;
