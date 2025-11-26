import React from 'react'
import Link from 'next/link'

const Curriculum2 = () => {

    const ClickHandler = () => {
        window.scrollTo(10, 0);
    }

    return (
        <div className="wpo-course-content">
            <div className="wpo-course-text-top">
                <h2>Graphics Designer Complete Curriculum</h2>
                <div className="course-b-text mt-1">
                    <p>This curriculum pairs theory with practical tool-based sessions. You will learn how to think like a designer and use the workflows professionals rely on to deliver brand-ready work.</p>
                </div>
                <div className="course-curriculam">
                    <ul>
                        <li><span><i className="fi flaticon-play-button"></i>Principles of Design & Composition<Link onClick={ClickHandler} href="/lesson">Preview</Link></span><small>25 Minutes</small></li>
                        <li><span><i className="fi flaticon-play-button"></i>Color Theory & Typography<Link onClick={ClickHandler} href="/lesson">Preview</Link></span><small>35 Minutes</small></li>
                        <li><span><i className="fi flaticon-play-button"></i>Raster vs Vector: Photoshop & Illustrator Basics</span><small>45 Minutes</small></li>
                        <li><span><i className="fi flaticon-play-button"></i>Branding: Logos, Guidelines, and Mockups</span><small>40 Minutes</small></li>
                        <li><span><i className="fi flaticon-play-button"></i>Design Workflow & Exporting for Web/Print</span><small>30 Minutes</small></li>
                        <li><span><i className="fi flaticon-knowledge"></i>Capstone Project: Client Brief Execution</span><small>2 Projects</small></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Curriculum2;
