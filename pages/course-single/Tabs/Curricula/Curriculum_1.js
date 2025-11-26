import React from 'react'
import Link from 'next/link'

const Curriculum1 = () => {

    const ClickHandler = () => {
        window.scrollTo(10, 0);
    }

    return (
        <div className="wpo-course-content">
            <div className="wpo-course-text-top">
                <h2>Beginners WordPress Course Curriculum</h2>
                <div className="course-b-text mt-1">
                    <p>This hands-on curriculum is organized into short modules focused on building a complete website with WordPress and Elementor. Each module includes a short project so you practice while learning.</p>
                </div>
                <div className="course-curriculam">
                    <ul>
                        <li><span><i className="fi flaticon-play-button"></i>Course Orientation & Tools<Link onClick={ClickHandler} href="/lesson">Preview</Link></span><small>10 Minutes</small></li>
                        <li><span><i className="fi flaticon-play-button"></i>Installing WordPress & Hosting Basics<Link onClick={ClickHandler} href="/lesson">Preview</Link></span><small>30 Minutes</small></li>
                        <li><span><i className="fi flaticon-play-button"></i>Themes vs Page Builders & Choosing Elementor</span><small>25 Minutes</small></li>
                        <li><span><i className="fi flaticon-play-button"></i>Building Pages with Elementor: Header, Footer, and Sections</span><small>40 Minutes</small></li>
                        <li><span><i className="fi flaticon-play-button"></i>Creating Blog Posts & Menus</span><small>20 Minutes</small></li>
                        <li><span><i className="fi flaticon-play-button"></i>Essential Plugins: SEO, Forms, Caching</span><small>35 Minutes</small></li>
                        <li><span><i className="fi flaticon-knowledge"></i>Final Project: Publish a Portfolio Site</span><small>2 Projects</small></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Curriculum1;
