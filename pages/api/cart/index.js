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
  return req.query?.user_id || null
}

export default async function handler(req, res) {
  // Support GET (list), POST (add) and DELETE (remove)
  if (req.method === 'GET') {
    const userId = await getUserIdFromReq(req)
    if (!userId) return res.status(401).json({ error: 'Unauthorized: missing user' })

    try {
      // 1) fetch cart items for user
      const { data: cartRows, error: cartErr } = await supabaseAdmin
        .from('cart_items')
        .select('id,course_id')
        .eq('user_id', userId)

      if (cartErr) throw cartErr

      const courseIds = (cartRows || []).map(r => r.course_id).filter(Boolean)

      // 2) fetch course details in one query
      let courses = []
      if (courseIds.length > 0) {
        const { data: courseData, error: courseErr } = await supabaseAdmin
          .from('courses')
          .select('id,title,price,image_url,slug')
          .in('id', courseIds)
        if (courseErr) throw courseErr
        courses = courseData || []
      }

      // 3) map to clean array matching requested shape
      const cart = (cartRows || []).map(r => {
        const course = (courses || []).find(c => c.id === r.course_id) || {}
        return {
          id: r.id,
          course_id: r.course_id,
          qty: Number(r.qty || 1),
          title: course.title || '',
          price: Number(course.price || 0),
          image_url: course.image_url || '',
          slug: course.slug || ''
        }
      })

      return res.status(200).json(cart)
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('cart list error', err)
      const payload = { error: 'Internal Server Error' }
      if (process.env.NODE_ENV !== 'production') {
        payload.detail = err.message
        payload.stack = err.stack
      }
      return res.status(500).json(payload)
    }
  }

  if (req.method === 'DELETE') {
    // delete a cart item by course_id for the authenticated user
    const userId = await getUserIdFromReq(req)
    if (!userId) return res.status(401).json({ error: 'Unauthorized: missing user' })

    const { course_id, id } = req.body || {}
    if (!course_id && !id) return res.status(400).json({ error: 'course_id or id is required' })

    try {
      let query = supabaseAdmin.from('cart_items').delete()
      query = query.eq('user_id', userId)
      if (id) query = query.eq('id', id)
      if (course_id) query = query.eq('course_id', course_id)

      const { data, error } = await query.select()

      if (error) {
        // eslint-disable-next-line no-console
        console.error('cart delete error', error)
        return res.status(500).json({ error: error.message || 'Failed to delete' })
      }

      return res.status(200).json({ ok: true, deleted: data })
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('cart delete error', err)
      const payload = { error: 'Internal Server Error' }
      if (process.env.NODE_ENV !== 'production') {
        payload.detail = err.message
        payload.stack = err.stack
      }
      return res.status(500).json(payload)
    }
  }

  if (req.method === 'POST') {
    const userId = await getUserIdFromReq(req)
    if (!userId) return res.status(401).json({ error: 'Unauthorized: missing user' })

    const { course_id } = req.body || {}
    if (!course_id) return res.status(400).json({ error: 'course_id is required' })

    try {
      // Prevent duplicates: check existing cart item for this user+course
      const { data: existing, error: selErr } = await supabaseAdmin
        .from('cart_items')
        .select('id,course_id')
        .eq('user_id', userId)
        .eq('course_id', course_id)
        .limit(1)

      if (selErr) throw selErr
      if (existing && existing.length > 0) {
        // Item already present — return existing item (client can decide how to handle)
        return res.status(200).json({ ok: true, item: existing[0], message: 'Item already in cart' })
      }

      const { data, error } = await supabaseAdmin
        .from('cart_items')
        .insert({ user_id: userId, course_id })
        .select()

      if (error) throw error

      return res.status(201).json({ ok: true, item: data?.[0] ?? null })
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('cart add error', err)
      const payload = { error: 'Internal Server Error' }
      if (process.env.NODE_ENV !== 'production') {
        payload.detail = err.message
        payload.stack = err.stack
      }
      return res.status(500).json(payload)
    }
  }

  return res.status(405).json({ error: 'Method Not Allowed' })
}
