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
  return req.body?.user_id || null
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' })

  const userId = await getUserIdFromReq(req)
  if (!userId) return res.status(401).json({ error: 'Unauthorized: missing user' })

  const { id, course_id } = req.body
  if (!id && !course_id) return res.status(400).json({ error: 'id or course_id required' })

  try {
    let query = supabaseAdmin.from('cart_items')
    if (id) query = query.eq('id', id)
    if (course_id) query = query.eq('course_id', course_id)
    query = query.eq('user_id', userId)

    const { data, error } = await query.delete().select()
    if (error) throw error
    return res.status(200).json({ ok: true, deleted: data })
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('cart remove error', err)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}
