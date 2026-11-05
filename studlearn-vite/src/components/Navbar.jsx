import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { LinkedIn } from '@mui/icons-material'
import { red } from '@mui/material/colors'


function Navbar(props) {
    const navigate = useNavigate();

    const Logout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    }

    return (
        <header className="header_section">
            <nav className="navbar navbar-expand-lg custom_nav-container sticky-top" style={props.style}>
                <RouterLink className="navbar-brand" to="/">
                    <span>
                        studlearn
                    </span>
                </RouterLink>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="s-1"> </span>
                    <span className="s-2"> </span>
                    <span className="s-3"> </span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <div className="d-flex mx-auto flex-column flex-lg-row align-items-center">
                        <ul className="navbar-nav">
                            <li className={`nav-item ${props.active1}`}>
                                <RouterLink className="nav-link" to="/">Home</RouterLink>
                            </li>
                            <li className={`nav-item ${props.active2}`}>
                                <RouterLink className="nav-link" to="/about">About</RouterLink>
                            </li>
                            <li className={`nav-item ${props.active3}`}>
                                <RouterLink className="nav-link" to="/question">Ask Question</RouterLink>
                            </li>
                            <li className={`nav-item ${props.active4}`}>
                                <RouterLink className="nav-link" to="/login">Login</RouterLink>
                            </li>
                            <li className={`nav-item ${props.active5}`}>
                                <RouterLink className="nav-link" to="/signup">Signup</RouterLink>
                            </li>
                            <li className={`nav-item ${props.active6}`}>
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
                        <button className='btn btn-success mx-2' onClick={Logout}>Logout</button>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Navbar
