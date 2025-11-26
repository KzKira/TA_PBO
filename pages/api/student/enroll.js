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
  if (!userId) return res.status(401).json({ error: 'Unauthorized: missing or invalid token' })

  try {
    // 1. Get all course_ids from cart_items for this user
    const { data: cartRows, error: cartErr } = await supabaseAdmin
      .from('cart_items')
      .select('course_id')
      .eq('user_id', userId)

    if (cartErr) throw cartErr

    if (!cartRows || cartRows.length === 0) {
      return res.status(400).json({ error: 'Keranjang kosong' })
    }

    const toEnroll = cartRows.map(r => ({ user_id: userId, course_id: r.course_id }))

    // 2. Insert enrollments. Use upsert to avoid duplicate unique constraint errors.
    const { data: enrollData, error: enrollErr } = await supabaseAdmin
      .from('enrollments')
      .upsert(toEnroll, { onConflict: ['user_id', 'course_id'] })
      .select()

    if (enrollErr) throw enrollErr

    // 3. Clear cart for the user
    const { error: delErr } = await supabaseAdmin
      .from('cart_items')
      .delete()
      .eq('user_id', userId)

    if (delErr) throw delErr

    return res.status(200).json({ ok: true, enrolled: enrollData })
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('enroll error', err)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}
