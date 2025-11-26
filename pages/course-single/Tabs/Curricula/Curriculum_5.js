import React from 'react'
import Link from 'next/link'

const Curriculum5 = () => {

    const ClickHandler = () => {
        window.scrollTo(10, 0);
    }

    return (
        <div className="wpo-course-content">
            <div className="wpo-course-text-top">
                <h2>Video Editing & Production Curriculum</h2>
                <div className="course-b-text mt-1">
                    <p>This course covers editing workflows, storytelling through video, and essential post-production techniques. Suitable for aspiring editors and content creators.</p>
                </div>
                <div className="course-curriculam">
                    <ul>
                        <li><span><i className="fi flaticon-play-button"></i>Editing Fundamentals<Link onClick={ClickHandler} href="/lesson">Preview</Link></span><small>20 Minutes</small></li>
                        <li><span><i className="fi flaticon-play-button"></i>Transitions & Effects<Link onClick={ClickHandler} href="/lesson">Preview</Link></span><small>25 Minutes</small></li>
                        <li><span><i className="fi flaticon-e-learning"></i>Audio Mixing</span></li>
                        <li><span><i className="fi flaticon-knowledge"></i>Final Cut Review</span><small>Project Review</small></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Curriculum5;
