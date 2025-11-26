import React from 'react'
import Link from 'next/link'


const Curriculum = () => {

    const ClickHandler = () => {
        window.scrollTo(10, 0);
    }

    
    return (
        <div className="wpo-course-content">
            <div className="wpo-course-text-top">
                <h2>Starting Beginners Level Course</h2>
                <div className="course-b-text mt-1">
                    <p>This beginner-level program provides a foundational understanding of editing principles and essential techniques used in digital content creation. The lessons are designed for learners with little or no prior experience and focus on building confidence through step-by-step practical exercises.</p>
                </div>
                <div className="course-curriculam">
                    <ul>
                        <li><span><i className="fi flaticon-play-button"></i>Introduction of Editing<Link onClick={ClickHandler} href="/lesson">Preview</Link></span><small>20 Minutes</small></li>
                        <li><span><i className="fi flaticon-play-button"></i>Overview of Editing<Link onClick={ClickHandler} href="/lesson">Preview</Link></span><small>16 Minutes</small></li>
                        <li><span><i className="fi flaticon-e-learning"></i>Basic Editing Technology</span></li>
                        <li><span><i className="fi flaticon-knowledge"></i>Quiz</span><small>5 Questions</small></li>
                    </ul>
                </div>
            </div>
            <div className="wpo-course-text-top">
                <h2>Intermediate Level Course</h2>
                <div className="course-b-text mt-1">
                    <p>The intermediate course expands upon the core concepts introduced in the beginner modules and enables learners to enhance their precision, creativity, and workflow efficiency. Participants will explore more advanced tools and methods to produce professional-quality media content..</p>
                </div>
                <div className="course-curriculam">
                    <ul>
                        <li><span><i className="fi flaticon-play-button"></i>Introduction of Editing<Link onClick={ClickHandler} href="/lesson">Preview</Link></span><small>20 Minutes</small></li>
                        <li><span><i className="fi flaticon-e-learning"></i>Basic Editing Technology</span></li>
                        <li><span><i className="fi flaticon-knowledge"></i>Quiz</span><small>5 Questions</small></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Curriculum;