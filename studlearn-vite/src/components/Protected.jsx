import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Protected(props) {
    let { Component } = props
    let history = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(()=>{
        if (localStorage.getItem('token')) {
            setIsAuthenticated(true);
        } else {
            history('/login', { replace: true });
        }
    }, [history]);

    return isAuthenticated ? (
        <>
            <Component />
        </>
    ) : null;
}

export default Protected
