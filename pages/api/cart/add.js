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

  const { course_id } = req.body || {}
  if (!course_id) return res.status(400).json({ error: 'course_id is required' })

  try {
    // Insert new cart item. Unique constraint on (user_id, course_id) will prevent duplicates.
    const { data, error } = await supabaseAdmin
      .from('cart_items')
      .insert({ user_id: userId, course_id })
      .select()

    if (error) {
      // detect unique violation (Postgres 23505 or message contains duplicate)
      const message = (error.message || '').toLowerCase()
      if (error.code === '23505' || message.includes('duplicate') || message.includes('unique')) {
        return res.status(409).json({ error: 'Item already in cart' })
      }
      throw error
    }

    return res.status(201).json({ ok: true, item: data?.[0] ?? null })
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('cart add error', err)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}
