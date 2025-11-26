import React, { Fragment } from 'react';
import Navbar from '../../components/Navbar/Navbar'
import PageTitle from '../../components/pagetitle/PageTitle'
import Scrollbar from '../../components/scrollbar/scrollbar'
import { useRouter } from 'next/router'
import CoursesCategory from '../../api/CoursesCategory'
import Courses from '../../api/Courses'
import Footer from '../../components/footer/Footer';
import Image from 'next/image';
import { safeImageSrc, getStarsFromCourse, formatStarsValue } from '../../utils'
import supabaseAdmin from '../../lib/supabaseServerClient'

const CourseSinglePage = (props) => {

    const router = useRouter()

    const CoursesCategoryDetails = CoursesCategory.find(item => item.slug === router.query.slug)

    // prefer DB-provided courses when available; otherwise use local static Courses
    const dbCourses = props.dbCourses || []
    const sourceCourses = (Array.isArray(dbCourses) && dbCourses.length > 0) ? dbCourses : Courses
    const filteredCourses = sourceCourses.filter(item => {
        if (CoursesCategoryDetails?.slug) {
            if (item.category) return item.category === CoursesCategoryDetails.slug
            // if DB rows lack category, include them
            return true
        }
        return true
    })

    return (
        <Fragment>
            <Navbar />
            <PageTitle pageTitle={CoursesCategoryDetails?.title} pagesub={'Course'} />

            {/* Course list area: no title/banner here. Show a centered prominent message when empty. */}
            <div className={`wpo-popular-area section-padding`}>
                <div className="container">
                    {filteredCourses && filteredCourses.length === 0 ? (
                        <div className="category-empty-state">
                            <h2>No courses found in this category.</h2>
                        </div>
                    ) : (
                        <div className="wpo-popular-wrap">
                            <div className="row">
                                {filteredCourses && filteredCourses.map((course, aitem) => {
                                    const instructorName = (course.instructor && (course.instructor.name || course.instructor.fullname)) || course.authortitle || 'Instructor'
                                    const lessonsCount = (typeof course.lessons_count === 'number' ? course.lessons_count : (typeof course.lesson === 'number' ? course.lesson : (Array.isArray(course.curriculum) ? course.curriculum.reduce((sum, s) => sum + ((s.items && s.items.length) || 0), 0) : 0)))
                                    return (
                                    <div className="col col-lg-4 col-md-6 col-12" key={aitem}>
                                        <div className="wpo-popular-single">
                                            <div className="wpo-popular-content" style={{padding: '20px'}}>
                                                <h2 style={{cursor: 'default', color: '#000', marginBottom: 8}}>{course.title}</h2>
                                                <p style={{margin: 0}}><strong>Instructor:</strong> {instructorName}</p>
                                                <p style={{marginTop: 6}}><strong>Lessons:</strong> {lessonsCount}</p>
                                            </div>
                                        </div>
                                    </div>
                                )})}
                            </div>
                        </div>
                    )}
                </div>
            </div>

                {/* The detailed course single area (image, tabs, sidebar) has been removed
                    per design: category pages now show banner + course list only. */}
            <Footer />
            <Scrollbar />
        </Fragment>
    )
};
export async function getServerSideProps(context) {
    try {
        const { data: courses, error } = await supabaseAdmin
            .from('courses')
            .select('*')
            .order('created_at', { ascending: false })

        if (error) {
            console.error('Error fetching courses for category page', error)
            return { props: {} }
        }

        // normalize minimal fields for list rendering
        const dbCourses = (courses || []).map(c => ({
            ...c,
            instructor: (c.instructor && typeof c.instructor === 'object') ? c.instructor : {},
            lessons_count: typeof c.lessons_count === 'number' ? c.lessons_count : (c.lesson || 0)
        }))

        return { props: { dbCourses } }
    } catch (err) {
        console.error('getServerSideProps category error', err)
        return { props: {} }
    }
}

export default CourseSinglePage;