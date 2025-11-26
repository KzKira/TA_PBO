import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import PageTitle from '../../components/pagetitle/PageTitle'
import Newslatter2 from '../../components/Newslatter2/Newslatter2'
import Scrollbar from '../../components/scrollbar/scrollbar'
import Footer from '../../components/footer/Footer'
import supabase from '../../lib/supabaseClient'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { sanitizeSrc } from '../../utils'

const PER_PAGE = 6
const GLOBAL_IMAGE = 'https://drive.google.com/uc?export=view&id=1uNgVcJcVdH0XGEymUekukJ_pRo0YxrWd'


const ClickHandler = () => { window.scrollTo(10, 0) }
export default function MyCoursesPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [courses, setCourses] = useState([])
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('')
  const [categories, setCategories] = useState([])
  const [page, setPage] = useState(1)
  const [debugResults, setDebugResults] = useState(null)

  useEffect(() => {
    let mounted = true
    const load = async () => {
      const { data: sessionData } = await supabase.auth.getSession()
      const session = sessionData?.session || null
      if (!session || !session.user) {
        router.push('/login')
        return
      }

      const token = session.access_token
      setLoading(true)
      try {
        const res = await fetch('/api/student/courses', { headers: { Authorization: `Bearer ${token}` } })
        const json = await res.json()
            if (!mounted) return
            if (res.ok && json?.status === 'success') {
              const data = Array.isArray(json.data) ? json.data : []
              // keep enrolled courses in `courses`; categories for the dropdown will be fetched separately
              setCourses(data)
            } else setCourses([])
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('Failed to fetch courses', err)
        setCourses([])
      } finally {
        if (mounted) setLoading(false)
      }
    }
    load()
    return () => { mounted = false }
  }, [router])

  // load global categories (derive from all courses) so the dropdown matches the main Course page
  useEffect(() => {
    let mounted = true
    const loadCategories = async () => {
      try {
        const res = await fetch('/api/courses?all=1')
        const json = await res.json()
        if (!mounted) return
        if (json?.data) {
          const uniq = Array.from(new Set(json.data.map(x => (x.category || '').toString().trim()).filter(Boolean))).sort()
          setCategories(uniq)
        }
      } catch (err) {
        // ignore
      }
    }
    loadCategories()
    return () => { mounted = false }
  }, [])

  // filter
  const q = (query || '').trim().toLowerCase()
  const filtered = courses.filter(c => {
    const titleMatch = (c.title || '').toLowerCase().includes(q)
    const categoryVal = c.category || (c.metadata && c.metadata.category) || ''
    const categoryMatch = category ? (categoryVal === category) : true
    return titleMatch && categoryMatch
  })

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE))
  const start = (page - 1) * PER_PAGE
  const pageItems = filtered.slice(start, start + PER_PAGE)

  // Debug: test all resolved image URLs and report load status
  const debugImages = async () => {
    try {
      const rows = courses || []
      const results = []
      const timeoutMs = 8000

      const checkImage = (src) => new Promise(resolve => {
        if (!src) return resolve({ src, ok: false, reason: 'empty' })
        const img = new window.Image()
        let done = false
        const timer = setTimeout(() => {
          if (done) return
          done = true
          img.src = ''
          resolve({ src, ok: false, reason: 'timeout' })
        }, timeoutMs)
        img.onload = () => {
          if (done) return
          done = true
          clearTimeout(timer)
          resolve({ src, ok: true })
        }
        img.onerror = () => {
          if (done) return
          done = true
          clearTimeout(timer)
          resolve({ src, ok: false, reason: 'error' })
        }
        img.src = src
      })

      for (const item of rows) {
        const courseData = Array.isArray(item.courses) ? (item.courses[0] || null) : (item.courses || null)
        const possibleImg = courseData?.image_url || courseData?.cImg || courseData?.image || courseData?.img || (courseData && courseData.metadata && courseData.metadata.image) || ''
        const src = sanitizeSrc(possibleImg) || GLOBAL_IMAGE
        // test load
        // eslint-disable-next-line no-await-in-loop
        const r = await checkImage(src)
        results.push({ enrollment_id: item.enrollment_id || item.id || null, course_id: item.course_id || (courseData && courseData.id) || null, src, ok: r.ok, reason: r.reason || null, courseData })
      }

      // log to console and show overlay
      // eslint-disable-next-line no-console
      console.log('Image debug results', results)
      setDebugResults(results)
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('debugImages failed', e)
      setDebugResults([{ error: String(e) }])
    }
  }

  useEffect(() => { setPage(1) }, [query])

  return (
    <>
      <Navbar />
      <PageTitle pageTitle={'My Courses'} pagesub={'My Courses'} />

      <div className="container">
        <div className="course-searchbar" style={{ marginTop: 28, marginBottom: 12 }}>
          <div className="search-item search-input" style={{ flex: 1 }}>
            <input
              type="text"
              className="form-control course-search-input"
              placeholder="Search courses..."
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
          </div>

          <div className="search-item category-select" style={{ width: 260 }}>
            <select className="form-control course-category-select" value={category} onChange={e => setCategory(e.target.value)}>
              <option value="">All categories</option>
              {categories && categories.length > 0 ? categories.map((cat, i) => <option key={i} value={cat}>{cat}</option>) : null}
            </select>
          </div>

          <div className="search-item clear-button">
              <button className="btn course-clear-btn" onClick={() => { setQuery(''); setCategory(''); setPage(1) }}>Clear</button>
            </div>

            <div style={{ marginLeft: 12 }}>
              <button className="btn" onClick={() => debugImages()} style={{ background: '#f6c000', color: '#111', borderRadius: 12, padding: '8px 14px' }}>Debug Images</button>
          </div>
        </div>

        {loading ? (
          <div style={{ padding: 40, textAlign: 'center' }}>Loading...</div>
        ) : (
          <>
            {filtered.length === 0 ? (
              <div style={{ padding: 48, textAlign: 'center' }}>
                <h3>No courses found.</h3>
                <p style={{ marginTop: 12 }}>
                  <Link href="/course" className="theme-btn">Browse Courses</Link>
                </p>
              </div>
            ) : (
              <>
                <div className="wpo-popular-area section-padding">
                  <div className="container">
                    <div className="wpo-popular-wrap">
                      <div className="row">
                        {pageItems.length === 0 ? (
                          <div className="col-12"><div className="category-empty-state"><h2>No courses available.</h2></div></div>
                        ) : pageItems.map((item, aitem) => {
                          // item is an enrollment row; course details may be nested under `item.courses`
                          const courseData = Array.isArray(item.courses) ? (item.courses[0] || null) : (item.courses || null)

                          const title = courseData?.title || item.title || 'Untitled Course'
                          const slug = courseData?.slug || item.slug || ''
                          const lessonsCount = (typeof courseData?.lessons_count === 'number') ? courseData.lessons_count : (courseData?.lesson || 0)
                          const stars = (typeof courseData?.stars === 'number') ? courseData.stars : (courseData?.metadata && courseData.metadata.rating) || 0

                          const rawInstructor = (courseData && (courseData.instructor && (courseData.instructor.avatar || courseData.instructor.image))) || (courseData && courseData.author) || ''
                          const instructorImg = sanitizeSrc(rawInstructor) || GLOBAL_IMAGE
                          const instructorName = (courseData && ((courseData.instructor && (courseData.instructor.name || courseData.instructor.fullname)) || courseData.authortitle || (courseData.metadata && courseData.metadata.instructor_name))) || 'Instructor'

                          const possibleImg = courseData?.image_url || courseData?.cImg || courseData?.image || courseData?.img || (courseData && courseData.metadata && courseData.metadata.image) || ''
                          const imgSrc = sanitizeSrc(possibleImg) || GLOBAL_IMAGE
                          
                          // for debugging: attach data attribute with resolved src
                          return (
                            <div className="col col-lg-4 col-md-6 col-12" key={aitem}>
                              <div className="wpo-popular-single">
                                <div className="wpo-popular-item">
                                  <div className="wpo-popular-img">
                                    <img className="img-fluid" src={imgSrc} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                                  </div>

                                  <div className="wpo-popular-content">
                                    <div className="wpo-popular-text-top">
                                      <ul>
                                        <li>
                                          <img src={instructorImg} alt={instructorName} width={40} height={40} style={{ width: 40, height: 40, borderRadius: 20, objectFit: 'cover' }} />
                                        </li>
                                        <li>
                                          <Link onClick={ClickHandler} href="/lesson">{instructorName}</Link>
                                        </li>
                                      </ul>
                                      <ul>
                                        <li><i className="fi flaticon-star"></i></li>
                                        <li>({stars})</li>
                                      </ul>
                                    </div>

                                    <h2><Link onClick={ClickHandler} href="/lesson">{title}</Link></h2>

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
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                {/* pagination */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 18 }}>
                  <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page <= 1} className="btn">&lt;</button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
                    <button key={n} onClick={() => setPage(n)} className={`btn ${n === page ? 'active' : ''}`} style={{ fontWeight: n === page ? 700 : 400 }}>{n}</button>
                  ))}
                  <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page >= totalPages} className="btn">&gt;</button>
                </div>
              </>
            )}
          </>
        )}
      </div>

      <Newslatter2 />
      <Footer />
      <Scrollbar />
      {debugResults ? (
        <div style={{ position: 'fixed', right: 18, top: 80, zIndex: 9999, background: '#fff', border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 6px 18px rgba(31,45,61,0.08)', maxHeight: '70vh', width: 640, overflow: 'auto', padding: 12, borderRadius: 8 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <strong>Image debug results</strong>
            <div>
              <button className="btn" onClick={() => { setDebugResults(null) }} style={{ marginRight: 8 }}>Close</button>
              <button className="btn" onClick={() => { console.log(debugResults) }}>Console</button>
            </div>
          </div>
          <div style={{ fontSize: 13 }}>
            {Array.isArray(debugResults) ? debugResults.map((r, i) => (
              <div key={i} style={{ padding: '6px 0', borderBottom: '1px solid #eee' }}>
                <div><strong>enrollment:</strong> {r.enrollment_id || '-'} <strong>course:</strong> {r.course_id || '-'} <strong>ok:</strong> {String(r.ok)}</div>
                <div style={{ wordBreak: 'break-all' }}>{r.src}</div>
                {r.reason ? <div style={{ color: '#b00' }}>Reason: {r.reason}</div> : null}
              </div>
            )) : <pre>{JSON.stringify(debugResults, null, 2)}</pre>}
          </div>
        </div>
      ) : null}
    </>
  )
}
