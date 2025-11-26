import React from 'react'
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { addToCart } from '../../store/actions/action'
import supabase from '../../lib/supabaseClient'

const Sidebar = (props) => {

    const dispatch = useDispatch()
    const router = useRouter()

    const ClickHandler = () => {
        window.scrollTo(10, 0);
    }

    const handleAddToCart = async (e) => {
        e.preventDefault()

        // Ensure we have a course id
        const courseId = props.courseData?.id
        if (!courseId) {
            // eslint-disable-next-line no-alert
            alert('Course id is missing')
            return
        }

        try {
            // Get current session (includes access_token)
            const { data: sessionData } = await supabase.auth.getSession()
            const session = sessionData?.session || null

            if (!session || !session.user) {
                // Not logged in — redirect to login page
                router.push('/login')
                return
            }

            const accessToken = session.access_token

            // Call backend API to add item to server-side cart
            const resp = await fetch('/api/cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify({ course_id: courseId })
            })

            const json = await resp.json().catch(() => ({}))
            if (!resp.ok) {
                // handle specific cases such as already-in-cart
                const message = json?.error || json?.message || 'Failed to add to cart'
                // eslint-disable-next-line no-alert
                alert(message)
                return
            }

            // Success — update client cart state for instant UX
            const product = {
                id: props.courseData?.id || Math.random().toString(36).slice(2, 9),
                title: props.courseData?.title || 'Course',
                price: props.courseData?.price || 0,
                discount: props.courseData?.discount || 0,
                image_url: props.courseData?.image_url || '',
                slug: props.courseData?.slug || ''
            }
            dispatch(addToCart(product, 1))

            // navigate to cart page after adding
            router.push('/cart')
        } catch (err) {
            // eslint-disable-next-line no-console
            console.error('Add to cart error', err)
            // eslint-disable-next-line no-alert
            alert('Failed to add to cart')
        }
    }

    return (
        <div className="col col-lg-4 col-12 course-sitebar">
            <div className="blog-sidebar">
                <div className="widget features-widget">
                    <div className="features-top">
                        {props.courseData ? (
                            (() => {
                                const price = Number(props.courseData.price || props.courseData.metadata?.price || 0)
                                return (
                                    <h4>${price.toFixed(2)}</h4>
                                )
                            })()
                        ) : (
                            <h4>${(0).toFixed(2)}</h4>
                        )}
                        <span> 5 days left!</span>
                    </div>
                    <div className="cart-btn">
                        <a onClick={(e) => { ClickHandler(); handleAddToCart(e); }} href="#" className="theme-btn-s3">Add to Cart</a>
                    </div>
                    <ul>
                        <li>Duration: <span>{props.courseData?.duration || props.courseData?.videos_duration || 'N/A'}</span></li>
                        <li>Lessons: <span>{(typeof props.courseData?.lessons_count === 'number' ? props.courseData.lessons_count : (props.courseData?.lesson ?? (Array.isArray(props.courseData?.curriculum) ? props.courseData.curriculum.reduce((sum, s) => sum + ((s.items && s.items.length) || 0), 0) : 'N/A')))}</span></li>
                        <li>Videos <span>{props.courseData?.videos_duration || 'N/A'}</span></li>
                        <li>Language: <span>{props.courseData?.language || 'N/A'}</span></li>
                        <li>Skill Level <span>{props.courseData?.skill_level || 'N/A'}</span></li>
                    </ul>
                </div>
                {/* Latest Course widget removed per request */}
            </div>
        </div>
    )
}

export default Sidebar;