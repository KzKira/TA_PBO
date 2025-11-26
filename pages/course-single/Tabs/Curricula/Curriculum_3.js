import React from 'react'
import Link from 'next/link'

const Curriculum3 = () => {

    const ClickHandler = () => {
        window.scrollTo(10, 0);
    }

    return (
        <div className="wpo-course-content">
            <div className="wpo-course-text-top">
                <h2>Authoring & Writing Professional Curriculum</h2>
                <div className="course-b-text mt-1">
                    <p>This curriculum walks you from idea to polished manuscript. Lessons cover plotting, crafting scenes, pacing, point of view, and the revision process required to produce publishable work.</p>
                </div>
                <div className="course-curriculam">
                    <ul>
                        <li><span><i className="fi flaticon-play-button"></i>Idea Development & Finding Your Audience<Link onClick={ClickHandler} href="/lesson">Preview</Link></span><small>20 Minutes</small></li>
                        <li><span><i className="fi flaticon-play-button"></i>Structure: Plot, Scene, and Pacing<Link onClick={ClickHandler} href="/lesson">Preview</Link></span><small>30 Minutes</small></li>
                        <li><span><i className="fi flaticon-play-button"></i>Voice & Character Building</span><small>25 Minutes</small></li>
                        <li><span><i className="fi flaticon-play-button"></i>Revision Techniques & Line Editing</span><small>40 Minutes</small></li>
                        <li><span><i className="fi flaticon-knowledge"></i>Preparing a Submission Package / Self-Publishing Basics</span><small>Workshop</small></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Curriculum3;
