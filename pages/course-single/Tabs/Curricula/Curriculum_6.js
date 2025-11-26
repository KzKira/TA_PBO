import React from 'react'
import Link from 'next/link'

const Curriculum6 = () => {

    const ClickHandler = () => {
        window.scrollTo(10, 0);
    }

    return (
        <div className="wpo-course-content">
            <div className="wpo-course-text-top">
                <h2>Professional Writing & Publishing Curriculum</h2>
                <div className="course-b-text mt-1">
                    <p>This curriculum prepares writers for professional publishing — from drafting to marketing. It includes practical exercises in editing and audience building.</p>
                </div>
                <div className="course-curriculam">
                    <ul>
                        <li><span><i className="fi flaticon-play-button"></i>Manuscript Development<Link onClick={ClickHandler} href="/lesson">Preview</Link></span><small>35 Minutes</small></li>
                        <li><span><i className="fi flaticon-play-button"></i>Publishing Options<Link onClick={ClickHandler} href="/lesson">Preview</Link></span><small>20 Minutes</small></li>
                        <li><span><i className="fi flaticon-e-learning"></i>Marketing Your Work</span></li>
                        <li><span><i className="fi flaticon-knowledge"></i>Publication Checklist</span><small>Checklist</small></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Curriculum6;
