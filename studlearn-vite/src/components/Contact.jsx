import { useState } from 'react'
import Navbar from './Navbar'
import './css/contact.css'
import Footer from './Footer'

function Contact() {
    const viteImport = import.meta.env;

    const [userQuery, setUserQuery] = useState({ name: "", email: "", message: "" })

    const handleSubmit = async (event) =>{
        event.preventDefault();
        const contact_api = viteImport.VITE_APP_ADDQUERY_API;
        const response = await fetch(contact_api, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name: userQuery.name, email: userQuery.email, message:userQuery.message})
        })

        const result = await response.json();

        if(result.success){
            alert("Your query has been successfully submitted.");
        }
    }

    const onChange = (e) =>{
        setUserQuery({...userQuery, [e.target.name]: e.target.value})
    }

    return (
        <>
            <Navbar style={{ backgroundColor: "#041858" }} active6={"active"} />
            <main className="contact-page" id="contact">
                <section className="contact-hero">
                    <div className="contact-page-container">
                        <p className="contact-eyebrow">WE ARE HERE TO HELP</p>
                        <h1>Get in touch</h1>
                        <p className="contact-intro">
                            Have a question or need support? Send us a message and
                            our team will get back to you.
                        </p>
                    </div>
                </section>
                <section className="contact-form-section">
                    <div className="contact-page-container">
                        <form className="contact-page-form" onSubmit={handleSubmit}>
                            <div className="contact-field-grid">
                                <label>
                                    Your name
                                    <input
                                        required
                                        type="text"
                                        name="name"
                                        autoComplete="name"
                                        placeholder="Enter your name"
                                        value={userQuery.name}
                                        onChange={onChange}
                                    />
                                </label>
                                <label>
                                    Email address
                                    <input
                                        required
                                        type="email"
                                        name="email"
                                        autoComplete="email"
                                        placeholder="you@example.com"
                                        value={userQuery.email}
                                        onChange={onChange}
                                    />
                                </label>
                            </div>
                            <label>
                                Message
                                <textarea
                                    required
                                    name="message"
                                    rows="6"
                                    placeholder="How can we help?"
                                    value={userQuery.message}
                                    onChange={onChange}
                                />
                            </label>
                            <button type="submit">Send message</button>
                        </form>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    )

};

export default Contact
