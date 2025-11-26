import React from "react";
import Link from 'next/link'
import hero from '/public/images/slider/5.png'
import crown from '/public/images/slider/crown.svg'
import shape1 from '/public/images/shape/vector-1.svg'
import shape2 from '/public/images/shape/vector-2.svg'
import shape3 from '/public/images/shape/vector-3.svg'
import shape4 from '/public/images/shape/vector-4.svg'
import shape5 from '/public/images/shape/vector-5.svg'
import shape6 from '/public/images/shape/vector-6.svg'
import shape7 from '/public/images/shape/vector-7.svg'
import shape8 from '/public/images/shape/vector-8.svg'
import shape9 from '/public/images/shape/vector-9.svg'
import Image from "next/image";

const ClickHandler = () => {
    window.scrollTo(10, 0);
}

const Hero5 = () => {
    return (
        <section className="static-hero-s5">
            <div className="hero-container">
                <div className="hero-inner">
                    <div className="container-fluid">
                        <div className="hero-content">
                            <div data-swiper-parallax="200" className="slide-title">
                                <Image src={crown} alt=""/>
                            </div>
                            <div data-swiper-parallax="300" className="slide-title">
                                <h2>Better Future For Your <span>Kids</span></h2>
                            </div>
                            <div data-swiper-parallax="400" className="slide-text">
                                <p>We are providing your kids the best tutor to enhance their knowledge and skill.</p>
                            </div>
                            <div className="clearfix"></div>
                            <div data-swiper-parallax="500" className="slide-btns">
                                <Link onClick={ClickHandler} href="/about" className="theme-btn-s4">Get Started Today</Link>
                            </div>
                            <div className="student-pic">
                                <Image src={hero} alt="" />
                                <div className="vector-1"><Image src={shape1} alt="" /></div>
                                <div className="vector-2"><Image src={shape2} alt="" /></div>
                                <div className="vector-3"><Image src={shape3} alt="" /></div>
                                <div className="vector-4"><Image src={shape4} alt="" /></div>
                                <div className="vector-5"><Image src={shape5} alt="" /></div>
                                <div className="vector-6"><Image src={shape6} alt="" /></div>
                                <div className="vector-7"><Image src={shape7} alt="" /></div>
                                <div className="vector-8"><Image src={shape8} alt="" /></div>
                                <div className="vector-9"><Image src={shape9} alt="" /></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero5;
