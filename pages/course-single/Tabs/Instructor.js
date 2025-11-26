import React from 'react'
import Image from 'next/image'
import atSingle from '/public/images/at-single.jpg'

const Instructor = ({ CoursesDetails }) => {
    return (
        <div className="team-info-wrap">
            <div className="row align-items-center">
                <div className="col-lg-5">
                    <div className="team-info-img">
                            <Image src={CoursesDetails?.author || CoursesDetails?.avatar || atSingle} alt={CoursesDetails?.authorName || CoursesDetails?.name || 'Instructor'} />
                    </div>
                </div>
                <div className="col-lg-7">
                    <div className="team-info-text">
                            <h2>{CoursesDetails?.authorName || CoursesDetails?.name || 'Instructor Name'}</h2>
                        <ul>
                                <li>Position: <span>{CoursesDetails?.authortitle || CoursesDetails?.position || CoursesDetails?.title || 'Instructor'}</span></li>
                            <li>Experience:<span>12 Years</span></li>
                            <li>Address:<span>6391 Elgin St. Celina, Delaware 10299</span></li>
                                <li>Phone:<span>+00 568 746 987</span></li>
                                <li>Email:<span>{((CoursesDetails?.authorName || CoursesDetails?.name || '').toLowerCase().replace(/[^a-z0-9]/g, '')) + '@gmail.com'}</span></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Instructor;