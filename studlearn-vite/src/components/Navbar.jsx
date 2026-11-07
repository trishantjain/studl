import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { LinkedIn } from '@mui/icons-material'
import { red } from '@mui/material/colors'
import './css/navbar.css';


function Navbar(props) {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const Logout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    }

    return (
        <header className="header_section">
            <nav className="custom_nav-container sticky-top" style={props.style}>
                <RouterLink className="navbar-brand" to="/">
                    <span>
                        studlearn
                    </span>
                </RouterLink>
                <button
                    className="navbar-toggler"
                    type="button"
                    aria-controls="navbarSupportedContent"
                    aria-expanded={isMenuOpen}
                    aria-label="Toggle navigation"
                    onClick={() => setIsMenuOpen((open) => !open)}
                >
                    <span className="s-1"> </span>
                    <span className="s-2"> </span>
                    <span className="s-3"> </span>
                </button>

                <div className={`navbar-collapse${isMenuOpen ? ' is-open' : ''}`} id="navbarSupportedContent">
                    <div className="d-flex mx-auto flex-column flex-lg-row align-items-center">
                        <ul className="navbar-nav">
                            <li className={`nav-item ${props.active1}`} onClick={() => setIsMenuOpen(false)}>
                                <RouterLink className="nav-link" to="/">Home</RouterLink>
                            </li>
                            <li className={`nav-item ${props.active2}`} onClick={() => setIsMenuOpen(false)}>
                                <RouterLink className="nav-link" to="/about">About</RouterLink>
                            </li>
                            <li className={`nav-item ${props.active3}`} onClick={() => setIsMenuOpen(false)}>
                                <RouterLink className="nav-link" to="/question">Ask Question</RouterLink>
                            </li>
                            <li className={`nav-item ${props.active4}`} onClick={() => setIsMenuOpen(false)}>
                                <RouterLink className="nav-link" to="/login">Login</RouterLink>
                            </li>
                            <li className={`nav-item ${props.active5}`} onClick={() => setIsMenuOpen(false)}>
                                <RouterLink className="nav-link" to="/signup">Signup</RouterLink>
                            </li>
                            <li className={`nav-item ${props.active6}`} onClick={() => setIsMenuOpen(false)}>
                                <RouterLink className="nav-link" to="/contact">Contact Us</RouterLink>
                            </li>
                        </ul>
                    </div>
                    <div className="quote_btn-container my-2">
                        {/* <a href="/">
                            <img src="images/call.png" alt="" />
                            <span>
                                Call : + 91 7982757222
                            </span>
                        </a> */}
                        <a href="https://www.linkedin.com/in/trishant-jain" target='_blank' rel="noreferrer">
                            <LinkedIn className='mr-2' sx={{ color: red[50] }} />
                        </a>
                        <button className='logout-button' onClick={Logout}>Logout</button>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Navbar
