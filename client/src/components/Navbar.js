import React from "react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./navbar.css";
import { navbar } from './styles';
import healthcare from "../assets/healthcare.png";

import Auth from '../utils/auth';

const NavBar = () => {
    const [open, setOpen] = useState(false);
    const [screenWidth, setScreenWidth] = useState(0);
    const location = useLocation();

    const trackScreenWidth = () => {
        const width = window.innerWidth;
        setScreenWidth(width);
        if (width > 600) {
            setOpen(true);
        }
    };

    const handleClose = () => {
        if (screenWidth < 600) {
            setOpen(false);
        }
    };

    useEffect(() => {
        trackScreenWidth();
        window.addEventListener("resize", trackScreenWidth);
        return () => window.removeEventListener("resize", trackScreenWidth);
    }, []);

    return (
        <nav style={navbar[".navbar"]}>
            <div style={navbar[".nav-wrapper"]}>
                <div style={navbar[".company"]}>
                    <div style={navbar[".logo"]}>
                        <img src={healthcare} alt="healthcare" />
                    </div>
                    <Link 
                        to="/"
                        onClick={handleClose}
                        style={{ color: location.pathname === "/" && "#afbdc9" }}>
                            <h1 style={navbar[".h1"]}>
                                Medical Portal
                            </h1>
                    </Link>
                </div>
                <div className="list-wrapper">
                    <i
                        className="fas fa-bars"
                        style={{ opacity: !open ? 1 : 0 }}
                        onClick={() => { setOpen(open); }}
                    >
                    </i>
                    <i
                        className="fas fa-times"
                        style={{ opacity: open ? 1 : 0 }}
                        onClick={() => { setOpen(!open); }}
                    >
                    </i>

                    <ul style={{ left: open ? "0" : "-100vw" }}>
                    {Auth.loggedIn() ? (
                        (Auth.getEntity() === "patient") ? (
                            <li>
                                <Link
                                    to="/patients-dashboard"
                                    onClick={handleClose}
                                    style={{ color: location.pathname === "/patients-dashboard" && "#afbdc9" }}
                                >
                                    Dashboard
                                </Link>
                            </li>
                        ) : (
                            <li>
                                <Link
                                    to="/doctors-dashboard"
                                    onClick={handleClose}
                                    style={{ color: location.pathname === "/doctors-dashboard" && "#afbdc9" }}
                                >
                                    Dashboard
                                </Link>
                            </li>
                        )
                    ) : (
                        <li>
                            <Link
                                to="/"
                                onClick={handleClose}
                                style={{ color: location.pathname === "/" && "#afbdc9" }}
                            >
                                Home
                            </Link>
                        </li>
                    )}    
                        <li>
                            <Link
                                to="/about"
                                onClick={handleClose}
                                style={{ color: location.pathname === "/about" && "#afbdc9" }}
                            >
                                About
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/contact"
                                onClick={handleClose}
                                style={{ color: location.pathname === "/contact" && "#afbdc9" }}
                            >
                                Contact
                            </Link>
                        </li>

                        {/* if user is logged in show logout button*/}
                        {Auth.loggedIn() ? (
                            <li>
                                <Link
                                    to="/"
                                    onClick={Auth.logout}
                                >
                                    Logout
                                </Link>
                            </li>
                        ) : (
                            <li>
                                <Link
                                    to="/doctors-login"
                                    onClick={handleClose}
                                    style={{ color: location.pathname === "/doctors-login" && "#afbdc9" }}
                                >
                                    Doctors
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;