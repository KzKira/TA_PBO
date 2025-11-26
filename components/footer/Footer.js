import React from 'react'
import Link from 'next/link'
import Logo from '/public/images/logo-s2.svg'
import Image from 'next/image';

const ClickHandler = () => {
    window.scrollTo(10, 0);
}

const Footer = (props) => {
    return (
        <footer className="wpo-site-footer">
            <div className="wpo-upper-footer">
                <div className="container">
                    <div className="row">
                        <div className="col col-lg-3 col-md-6 col-12 col-md-6 col-sm-12 col-12">
                            <div className="widget about-widget">
                                <div className="logo widget-title">
                                    <Link onClick={ClickHandler} className="navbar-brand" href="/home"><Image src={Logo}
                                            alt=""/></Link>
                                </div>
                                <p>Mattis inelit neque quis donec eleifnd amet. Amet sed et cursus eu euismod. Egestas in morbi tristique ornare vulputate vitae enim.</p>
                                <div className="social">
                                <ul>
                                    <li>
                                        <Link onClick={ClickHandler} href="/">
                                            <i className="ti-facebook"></i>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link onClick={ClickHandler} href="/">
                                            <i className="ti-twitter-alt"></i>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link onClick={ClickHandler} href="/">
                                            <i className="ti-instagram"></i>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link onClick={ClickHandler} href="/">
                                            <i className="ti-google"></i>
                                        </Link>
                                    </li>
                                </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col col-lg-3 col-md-6 col-12 col-md-6 col-sm-12 col-12">
                            <div className="widget link-widget">
                                <div className="widget-title">
                                    <h3>Quick Links</h3>
                                </div>
                                <ul>
                                    <li><Link onClick={ClickHandler} href="/home">Home</Link></li>
                                    <li><Link onClick={ClickHandler} href="/about">About Us</Link></li>
                                    <li><Link onClick={ClickHandler} href="/course">Featured Courses</Link></li>
                                    <li><Link onClick={ClickHandler} href="/teacher">Teachers</Link></li>
                                    {/* Blog link removed */}
                                </ul>
                            </div>
                        </div>
                        <div className="col col-lg-3 col-md-6 col-12 col-md-6 col-sm-12 col-12">
                            <div className="widget link-widget s2">
                                <div className="widget-title">
                                    <h3>Useful Links</h3>
                                </div>
                                <ul>
                                    <li><Link onClick={ClickHandler} href="/contact">Contact Us</Link></li>
                                    <li><Link onClick={ClickHandler} href="/course">Courses</Link></li>
                                    <li><Link onClick={ClickHandler} href="/lesson">Lesson</Link></li>
                                    <li><Link onClick={ClickHandler} href="/register">Sign Up</Link></li>
                                    <li><Link onClick={ClickHandler} href="/testimonial">Testimonials</Link></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col col-lg-3 col-md-6 col-12 col-md-6 col-sm-12 col-12">
                            <div className="widget wpo-contact-widget">
                                <div className="widget-title">
                                    <h3>Contact Us</h3>
                                </div>
                                <div className="contact-ft">
                                    <ul>
                                        <li><i className="fi flaticon-email"></i>Eduko@gmail.com</li>
                                        <li><i className="fi flaticon-phone-call"></i>(208) 555-0112 <br/>
                                            (704) 555-0127</li>
                                        <li><i className="fi flaticon-placeholder"></i>4517 Washington Ave. <br/> Manchter, Kentucky 495</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="wpo-lower-footer">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col col-lg-6 col-md-12 col-12">
                            <ul>
                                <li>&copy; 2024 <Link onClick={ClickHandler} href="/">Eduko</Link>. All rights reserved.</li>
                            </ul>
                        </div>
                        <div className="col col-lg-6 col-md-12 col-12">
                            <div className="link">
                                <ul>
                                    <li><Link onClick={ClickHandler} href="/privacy">Privace & Policy</Link></li>
                                    <li><Link onClick={ClickHandler} href="/terms">Terms</Link></li>
                                    <li><Link onClick={ClickHandler} href="/about">About us</Link></li>
                                    <li><Link onClick={ClickHandler} href="/faq">FAQ</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;