import supabaseAdmin from '../../../lib/supabaseServerClient'

async function getUserIdFromReq(req) {
  const auth = req.headers.authorization || ''
  if (auth.startsWith('Bearer ')) {
    const token = auth.split(' ')[1]
    try {
      const { data, error } = await supabaseAdmin.auth.getUser(token)
      if (error) return null
      return data.user?.id ?? null
    } catch (e) {
      return null
    }
  }
  return null
}

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ status: 'error', message: 'Method Not Allowed' })

  const userId = await getUserIdFromReq(req)
  if (!userId) return res.status(401).json({ status: 'error', message: 'Unauthorized' })

  try {
    // fetch enrollments and include joined course data (if foreign key relation exists)
    const { data: enrollRows, error: enrollErr } = await supabaseAdmin
      .from('enrollments')
      .select('id, course_id, enrolled_at, courses(*)')
      .eq('user_id', userId)
      .order('enrolled_at', { ascending: false })

    if (enrollErr) throw enrollErr

    const enrollments = enrollRows || []

    // find enrollments that didn't return joined course data and fetch them as fallback
    const missingCourseIds = enrollments
      .filter(e => !e.courses || (Array.isArray(e.courses) && e.courses.length === 0))
      .map(e => e.course_id)
      .filter(Boolean)

    let fallbackCoursesMap = {}
    if (missingCourseIds.length > 0) {
      const { data: fallbackCourses, error: fallbackErr } = await supabaseAdmin
        .from('courses')
        .select('id, title, slug, image_url, price, discount_price, lessons_count, instructor, stars')
        .in('id', missingCourseIds)

      if (fallbackErr) throw fallbackErr
      fallbackCoursesMap = (fallbackCourses || []).reduce((acc, c) => {
        acc[c.id] = c
        return acc
      }, {})
    }

    // build response rows where each enrollment includes a `courses` object (matching Supabase join shape)
    const out = enrollments.map(e => {
      // Supabase returns joined rows as arrays when relation is one-to-many; normalize to single object
      let courseData = null
      if (e.courses) {
        courseData = Array.isArray(e.courses) ? (e.courses[0] || null) : e.courses
      }
      // fallback to lookup by course_id
      if (!courseData && e.course_id && fallbackCoursesMap[e.course_id]) {
        courseData = fallbackCoursesMap[e.course_id]
      }

      return {
        enrollment_id: e.id,
        course_id: e.course_id,
        enrolled_at: e.enrolled_at,
        courses: courseData // may be null if course missing
      }
    })

    return res.status(200).json({ status: 'success', data: out })
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('student courses error', err)
    return res.status(500).json({ status: 'error', message: 'Internal Server Error' })
  }
}
