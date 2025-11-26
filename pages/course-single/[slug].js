import React, { Fragment } from 'react';
import Navbar from '../../components/Navbar/Navbar'
import PageTitle from '../../components/pagetitle/PageTitle'
import Scrollbar from '../../components/scrollbar/scrollbar'
import Footer from '../../components/footer/Footer';
import CoureseTab from './Tabs/CoureseTab';
import Sidebar from './sidebar';
import Image from 'next/image';
import supabaseAdmin from '../../lib/supabaseServerClient'

const GLOBAL_IMAGE = 'https://drive.google.com/uc?id=1uNgVcJcVdH0XGEymUekukJ_pRo0YxrWd'

const CourseSinglePage = ({ courseData }) => {
    // courseData comes from getServerSideProps
    return (
        <Fragment>
            <Navbar />
            <PageTitle pageTitle={courseData?.title || 'Course'} pagesub={'Course'} />
            <div className="wpo-course-details-area section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col col-lg-8">
                            <div className="wpo-course-details-wrap">
                                <div className="wpo-course-details-img">
                                    {courseData?.image_url ? (
                                        <Image src={courseData.image_url || GLOBAL_IMAGE} alt={courseData.title || ''} width={600} height={400} />
                                    ) : (
                                        <Image src={GLOBAL_IMAGE} alt={courseData?.title || ''} width={600} height={400} />
                                    )}
                                </div>
                                <CoureseTab courseData={courseData} />
                            </div>
                        </div>
                        <Sidebar courseData={courseData} />
                    </div>
                </div>
            </div>
            <Footer />
            <Scrollbar />
        </Fragment>
    )
};

export async function getServerSideProps(context) {
    const { slug } = context.params || {}
    if (!slug) return { notFound: true }

    try {
        const { data: course, error: courseErr } = await supabaseAdmin
            .from('courses')
            .select('*')
            .eq('slug', slug)
            .limit(1)
            .maybeSingle()

        if (courseErr) {
            console.error('Supabase course query error', courseErr)
            return { notFound: true }
        }

        if (!course) return { notFound: true }

        // normalize data to send to client — the consolidated `courses` table contains
        // overview/curriculum/instructor/reviews as JSONB fields.
        const courseData = {
            id: course.id,
            title: course.title,
            slug: course.slug,
            description: course.description || course.overview || '',
            price: Number(course.price || 0),
            discount_price: course.discount_price != null ? Number(course.discount_price) : null,
            image_url: course.image_url || GLOBAL_IMAGE,
            duration: course.duration || '',
            videos_duration: course.videos_duration || course.videos_duration || '',
            lessons_count: (typeof course.lessons_count === 'number' ? course.lessons_count : 0),
            language: course.language || '',
            skill_level: course.skill_level || '',
            overview: course.overview || course.description || '',
            curriculum: Array.isArray(course.curriculum) ? course.curriculum : (course.curriculum ? [course.curriculum] : []),
            instructor: (course.instructor && typeof course.instructor === 'object') ? {
                name: course.instructor.name || course.instructor.full_name || course.instructor.authorName || '',
                authorName: course.instructor.authorName || course.instructor.name || course.instructor.full_name || '',
                avatar: course.instructor.avatar || course.instructor.avatar_url || course.instructor.image || '',
                avatar_url: course.instructor.avatar || course.instructor.avatar_url || course.instructor.image || '',
                bio: course.instructor.bio || course.instructor.description || '',
                // include title/position from DB so UI can display it
                title: course.instructor.title || course.instructor.authortitle || '',
                position: course.instructor.position || course.instructor.title || ''
            } : {},
            reviews: Array.isArray(course.reviews) ? course.reviews.map(r => ({
                user_name: r.user_name || r.user || r.name || 'Anonymous',
                rating: r.rating || r.score || 0,
                comment: r.comment || r.text || '',
                created_at: r.created_at || r.date || null
            })) : []
        }

        return {
            props: { courseData }
        }
    } catch (err) {
        console.error('getServerSideProps error', err)
        return { notFound: true }
    }
}

export default CourseSinglePage;