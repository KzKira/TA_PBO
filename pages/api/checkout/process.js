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
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' })

  const userId = await getUserIdFromReq(req)
  if (!userId) return res.status(401).json({ error: 'Unauthorized' })

  try {
    // 1) get cart items for user
    const { data: cartRows, error: cartErr } = await supabaseAdmin
      .from('cart_items')
      .select('course_id')
      .eq('user_id', userId)

    if (cartErr) throw cartErr
    if (!cartRows || cartRows.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' })
    }

    const courseIds = cartRows.map(r => r.course_id).filter(Boolean)

    // 2) enroll user into each course (upsert to avoid duplicates)
    const enrollRows = courseIds.map(id => ({ user_id: userId, course_id: id, status: 'active' }))
    const { data: enrollData, error: enrollErr } = await supabaseAdmin
      .from('enrollments')
      .upsert(enrollRows, { onConflict: ['user_id', 'course_id'] })
      .select()

    if (enrollErr) throw enrollErr

    // 3) clear cart for user
    const { data: deleted, error: delErr } = await supabaseAdmin
      .from('cart_items')
      .delete()
      .eq('user_id', userId)
      .select()

    if (delErr) throw delErr

    return res.status(200).json({ success: true, enrolled: enrollData?.length || 0, deleted: deleted?.length || 0 })
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('checkout process error', err)
    const payload = { error: 'Internal Server Error' }
    if (process.env.NODE_ENV !== 'production') {
      payload.detail = err.message
      payload.stack = err.stack
    }
    return res.status(500).json(payload)
  }
}
