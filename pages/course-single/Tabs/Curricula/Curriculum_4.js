import React from 'react'
import Link from 'next/link'

const Curriculum4 = () => {

    const ClickHandler = () => {
        window.scrollTo(10, 0);
    }

    return (
        <div className="wpo-course-content">
            <div className="wpo-course-text-top">
                <h2>Advanced WordPress & Elementor Curriculum</h2>
                <div className="course-b-text mt-1">
                    <p>An advanced path for developers and designers who want to extend WordPress with custom code and advanced Elementor techniques. Focused on performance and extensibility.</p>
                </div>
                <div className="course-curriculam">
                    <ul>
                        <li><span><i className="fi flaticon-play-button"></i>Custom Themes & Child Themes<Link onClick={ClickHandler} href="/lesson">Preview</Link></span><small>30 Minutes</small></li>
                        <li><span><i className="fi flaticon-play-button"></i>Performance & Caching<Link onClick={ClickHandler} href="/lesson">Preview</Link></span><small>28 Minutes</small></li>
                        <li><span><i className="fi flaticon-e-learning"></i>Advanced Widgets</span></li>
                        <li><span><i className="fi flaticon-knowledge"></i>Capstone Project</span><small>1 Project</small></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Curriculum4;
