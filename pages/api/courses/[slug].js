import supabaseAdmin from '../../../lib/supabaseServerClient'

export default async function handler(req, res) {
  const { slug } = req.query
  if (!slug) return res.status(400).json({ error: 'Missing slug' })

  try {
    const { data: course, error } = await supabaseAdmin
      .from('courses')
      .select('id,title,slug,image_url,price,discount_price,duration,lessons_count,language,skill_level,overview,curriculum,instructor,reviews,created_at,description')
      .eq('slug', slug)
      .maybeSingle()

    if (error) return res.status(500).json({ error: error.message })
    if (!course) return res.status(404).json({ error: 'Course not found' })

    const normalized = {
      id: course.id,
      slug: course.slug,
      title: course.title,
      image_url: course.image_url,
      price: Number(course.price || 0),
      discount_price: course.discount_price != null ? Number(course.discount_price) : null,
      duration: course.duration,
      lessons_count: course.lessons_count,
      language: course.language,
      skill_level: course.skill_level,
      overview: course.overview,
      curriculum: course.curriculum || [],
      instructor: course.instructor || {},
      reviews: course.reviews || [],
      created_at: course.created_at,
      description: course.description || ''
    }

    return res.status(200).json({ course: normalized })
  } catch (err) {
    return res.status(500).json({ error: err.message || 'Server error' })
  }
}

