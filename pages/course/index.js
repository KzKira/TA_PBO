import React, { Fragment, useState, useEffect, useContext } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import PageTitle from '../../components/pagetitle/PageTitle'
import CourseSectionS3 from '../../components/CourseSectionS3/CourseSectionS3';
import Newslatter2 from '../../components/Newslatter2/Newslatter2';
import Scrollbar from '../../components/scrollbar/scrollbar'
import Footer from '../../components/footer/Footer';
// categories will be derived from API data so they match the DB

const CoursePage = () => {
    const [searchQuery, setSearchQuery] = useState('')
    const [categoryFilter, setCategoryFilter] = useState('')
    const [courses, setCourses] = useState(null)
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const LIMIT = 6

    
    
    // refetch when page, search or category changes (reset page on search/category change)
    useEffect(() => {
        setCurrentPage(1)
    }, [searchQuery, categoryFilter])

    useEffect(() => {
        let mounted = true
        const loadPage = async () => {
            setLoading(true)
            try {
                const res = await fetch(`/api/courses?page=${currentPage}&limit=${LIMIT}`)
                if (!mounted) return
                const json = await res.json()
                if (json?.data) {
                    const normalized = json.data.map(c => ({
                        id: c.id,
                        slug: c.slug,
                        title: c.title,
                        cImg: c.image_url || (c.metadata && c.metadata.image) || '',
                        fee: c.price || 0,
                        price: c.price || 0,
                        discount: c.discount_price || c.discount || 0,
                        author: (c.instructor && (c.instructor.avatar || c.instructor.avatar_url)) || (c.metadata && c.metadata.instructor_avatar) || '',
                        authortitle: (c.instructor && (c.instructor.name || c.instructor.fullname)) || (c.metadata && c.metadata.instructor_name) || '',
                        instructor: c.instructor || (c.metadata ? { name: c.metadata.instructor_name, avatar: c.metadata.instructor_avatar } : {}),
                        stars: (typeof c.stars === 'number' ? c.stars : (c.stars ? Number(c.stars) : null)),
                        ratting: (typeof c.stars === 'number' || (c.stars && !isNaN(Number(c.stars)))) ? Number(c.stars) : ((c.reviews && c.reviews.length) ? Math.round((c.reviews.reduce((s, r) => s + (r.rating || 0), 0) / c.reviews.length) * 10) / 10 : (c.metadata && c.metadata.rating) || 0),
                        student: (c.metadata && c.metadata.students) || 0,
                        lesson: c.lessons_count || (c.metadata && c.metadata.lessons) || 0,
                        description: c.overview || c.description || '',
                        metadata: c.metadata || {},
                        category: c.category || ''
                    }))
                    setCourses(normalized)
                    const meta = json.meta || {}
                    setTotalPages(meta.last_page || 1)
                }
            } catch (e) {
                // eslint-disable-next-line no-console
                console.error('Failed to load page', e)
            } finally {
                if (mounted) setLoading(false)
            }
        }
        loadPage()
        return () => { mounted = false }
    }, [currentPage])

    // load categories once (fetch all courses but only to derive categories)
    useEffect(() => {
        let mounted = true
        const loadCategories = async () => {
            try {
                const res = await fetch('/api/courses?all=1')
                const json = await res.json()
                if (!mounted) return
                if (json?.data) {
                    const uniq = Array.from(new Set(json.data.map(x => (x.category || '').trim()).filter(Boolean))).sort()
                    setCategories(uniq)
                }
            } catch (err) {
                // ignore
            }
        }
        loadCategories()
        return () => { mounted = false }
    }, [])
    
    // pagination helper: produce page items with ellipsis, max 3 visible window
    const getPageItems = (current, last) => {
        if (!last || last <= 1) return [1]
        if (last <= 5) return Array.from({length: last}, (_, i) => i + 1)

        // compute a 3-length window containing current when possible
        let start = Math.max(1, Math.min(current - 1, last - 2))
        let end = Math.min(last, start + 2)
        const segment = []
        for (let i = start; i <= end; i++) segment.push(i)

        const items = []
        if (segment[0] > 1) {
            items.push(1)
            if (segment[0] > 2) items.push('...')
        }
        items.push(...segment)
        if (segment[segment.length - 1] < last) {
            if (segment[segment.length - 1] < last - 1) items.push('...')
            items.push(last)
        }
        return items
    }

    const pageItems = getPageItems(currentPage, totalPages)
    return (
        <Fragment>
            <Navbar />
            <PageTitle pageTitle={'Course'} pagesub={'Course'} />
            <div className="container">
                <div className="course-searchbar" style={{marginTop: 96, marginBottom: 12}}>
                    <div className="search-item search-input">
                        <input
                            type="text"
                            className="form-control course-search-input"
                            placeholder="Search courses..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className="search-item category-select">
                        <select className="form-control course-category-select" value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
                            <option value="">All categories</option>
                            {categories && categories.length > 0 ? categories.map((c, idx) => (
                                <option key={idx} value={c}>{c}</option>
                            )) : null}
                        </select>
                    </div>

                    <div className="search-item clear-button">
                        <button className="btn course-clear-btn" onClick={() => { setSearchQuery(''); setCategoryFilter('') }}>Clear</button>
                    </div>
                </div>
            </div>
            <CourseSectionS3 searchQuery={searchQuery} categoryFilter={categoryFilter} courses={courses} loading={loading} />

            <div className="container" style={{marginTop: 24, marginBottom: 48}}>
                <div className="pagination-wrapper" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <button className="btn" onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage <= 1} style={{marginRight: 8}}>&lt;</button>
                    {pageItems.map((it, idx) => {
                        if (it === '...') return <span key={idx} style={{margin: '0 6px'}}>...</span>
                        const num = it
                        return (
                            <button key={idx} className={`btn ${num === currentPage ? 'active' : ''}`} onClick={() => setCurrentPage(num)} style={{marginRight: 6, fontWeight: num === currentPage ? '700' : '400'}}>{num}</button>
                        )
                    })}
                    <button className="btn" onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage >= totalPages} style={{marginLeft: 8}}>&gt;</button>
                </div>
            </div>

            <Newslatter2/>
            <Footer />
            <Scrollbar />
        </Fragment>
    )
};
export default CoursePage;
