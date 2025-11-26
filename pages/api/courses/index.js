import supabaseAdmin from '../../../lib/supabaseServerClient'

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method Not Allowed' })

  const { page = 1, limit = 6, all = '0' } = req.query
  const pageNum = parseInt(page, 10) || 1
  const lim = Math.max(1, Math.min(parseInt(limit, 10) || 6, 100))
  const from = (pageNum - 1) * lim
  const to = from + lim - 1
  const fetchAll = String(all) === '1'

  try {
    // build base select with exact count
    const selectCols = 'id, title, slug, image_url, price, discount_price, category, stars, duration, lessons_count, language, skill_level, overview, curriculum, instructor, reviews, created_at'
    let query = supabaseAdmin.from('courses').select(selectCols, { count: 'exact' }).order('created_at', { ascending: false })
    if (!fetchAll) query = query.range(from, to)

    const { data, error, count } = await query

    if (error) throw error

    const courses = (data || []).map(c => ({
      id: c.id,
      slug: c.slug,
      title: c.title,
      image_url: c.image_url,
      price: Number(c.price || 0),
      discount_price: c.discount_price != null ? Number(c.discount_price) : null,
      duration: c.duration,
      lessons_count: c.lessons_count,
      language: c.language,
      skill_level: c.skill_level,
      overview: c.overview,
      curriculum: c.curriculum || [],
      instructor: c.instructor || {},
      reviews: c.reviews || [],
      stars: (typeof c.stars === 'number' ? c.stars : (c.stars ? Number(c.stars) : null)),
      created_at: c.created_at,
      category: c.category || ''
    }))

    const total = typeof count === 'number' ? count : (fetchAll ? courses.length : null)
    const last_page = total ? Math.max(1, Math.ceil(total / lim)) : 1

    return res.status(200).json({ data: courses, meta: { total: total || 0, page: pageNum, last_page } })
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('courses list error', err)
    return res.status(500).json({ error: err.message || 'Internal Server Error' })
  }
}
