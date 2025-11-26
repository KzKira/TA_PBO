import React from "react";
import Link from 'next/link'
import Courses from "../../api/Courses";
import Image from "next/image";
import { safeImageSrc, getStarsFromCourse, formatStarsValue, sanitizeSrc } from '../../utils'

const GLOBAL_IMAGE = 'https://drive.google.com/uc?id=1uNgVcJcVdH0XGEymUekukJ_pRo0YxrWd'


const ClickHandler = () => {
    window.scrollTo(10, 0);
}

const CourseSectionS3 = (props) => {
    const { searchQuery = '', categoryFilter = '', courses = null, loading = false, showPrice = true } = props;

    // while the page is fetching courses, avoid showing the local static fallback
    if (courses === null && loading) {
        return (
            <div className={`wpo-popular-area section-padding ${props.pClass}`}>
                <div className="container">
                    <div className="wpo-popular-wrap">
                        <div className="row">
                            <div className="col-12">
                                <div className="category-loading-state">
                                    <h3>Loading courses...</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    // choose source: API-provided courses prop or local static Courses
    const source = Array.isArray(courses) ? courses : Courses

    // client-side filter by title and category (case-insensitive)
    const query = searchQuery.trim().toLowerCase();
    const filtered = source.filter(course => {
        const titleMatch = course.title && course.title.toLowerCase().includes(query);
        const categoryMatch = categoryFilter ? (course.category === categoryFilter) : true;
        // if query is empty, match all; otherwise require titleMatch
        const matchesQuery = query ? titleMatch : true;
        return matchesQuery && categoryMatch;
    });

    return (
        <div className={`wpo-popular-area section-padding ${props.pClass}`}>
            <div className="container">
                <div className="wpo-popular-wrap">
                    <div className="row">
                        {
                            /* render empty state or course cards */
                        }
                        {(() => {
                            if (!filtered || filtered.length === 0) {
                                return (
                                    <div className="col-12">
                                        <div className="category-empty-state">
                                            <h2>No courses available.</h2>
                                        </div>
                                    </div>
                                )
                            }

                            return filtered.map((course, aitem) => {
                                const stars = getStarsFromCourse(course)
                                const rawInstructor = (course.instructor && (course.instructor.avatar || course.instructor.image)) || course.author || course.authorImg
                                const instructorImg = safeImageSrc(rawInstructor, GLOBAL_IMAGE)
                                const instructorName = (course.instructor && (course.instructor.name || course.instructor.fullname)) || course.authortitle || 'Instructor'
                                const lessonsCount = (typeof course.lessons_count === 'number' ? course.lessons_count : (typeof course.lesson === 'number' ? course.lesson : (Array.isArray(course.curriculum) ? course.curriculum.reduce((sum, s) => sum + ((s.items && s.items.length) || 0), 0) : 0)))
                                return (
                                    <div className="col col-lg-4 col-md-6 col-12" key={aitem}>
                                        <div className="wpo-popular-single">
                                            <div className="wpo-popular-item">
                                                    <div className="wpo-popular-img">
                                                                                {
                                                                                    (() => {
                                                                                        const src = sanitizeSrc(course.image_url || course.cImg) || GLOBAL_IMAGE
                                                                                        return <Image src={src} alt="" width={600} height={400} />
                                                                                    })()
                                                                                }
                                                        {showPrice ? (
                                                            <div className="thumb">
                                                                <span>${(Number(course.price || course.fee || 0)).toFixed(2)}</span>
                                                            </div>
                                                        ) : null}
                                                    </div>
                                                <div className="wpo-popular-content">
                                                    <div className="wpo-popular-text-top">
                                                        <ul>
                                                            <li>
                                                                    <Image src={sanitizeSrc(instructorImg) || GLOBAL_IMAGE} alt={instructorName} width={40} height={40} />
                                                            </li>
                                                            <li>
                                                                <Link onClick={ClickHandler} href={'/course-single/[slug]'} as={`/course-single/${course.slug}`}>{instructorName}</Link>
                                                            </li>
                                                        </ul>
                                                        <ul>
                                                            <li><i className="fi flaticon-star"></i></li>
                                                            <li>({formatStarsValue(stars)})</li>
                                                        </ul>
                                                    </div>
                                                    <h2><Link onClick={ClickHandler} href={'/course-single/[slug]'} as={`/course-single/${course.slug}`}>{course.title}</Link>
                                                    </h2>

                                                    <div className="wpo-popular-text-bottom">
                                                        <ul>
                                                            <li><i className="fi flaticon-agenda"></i> {lessonsCount} Lesson{lessonsCount !== 1 ? 's' : ''}</li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        })()}
                    </div>
                    {/* pagination removed (previously linked to blog pages) */}
                </div>
            </div>
        </div>
    );
}

export default CourseSectionS3;