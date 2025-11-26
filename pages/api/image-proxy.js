import fetch from 'node-fetch'

// very small image proxy for Google Drive files by id
// usage: /api/image-proxy?driveId=<ID>
// Note: only allows proxied Google Drive IDs to reduce SSRF risk

export default async function handler(req, res) {
  const { driveId } = req.query
  if (!driveId || typeof driveId !== 'string') {
    return res.status(400).send('missing driveId')
  }

  // basic validation: id should be alphanumeric, - or _
  if (!/^[a-zA-Z0-9_-]+$/.test(driveId)) return res.status(400).send('invalid id')

  const driveUrl = `https://drive.google.com/uc?export=download&id=${driveId}`
  try {
    const r = await fetch(driveUrl, { method: 'GET', redirect: 'follow' })
    if (!r.ok) {
      return res.status(r.status).send(`failed to fetch ${r.statusText}`)
    }

    const contentType = r.headers.get('content-type') || 'application/octet-stream'
    const buffer = await r.arrayBuffer()
    res.setHeader('Content-Type', contentType)
    res.setHeader('Cache-Control', 'public, max-age=3600')
    return res.status(200).send(Buffer.from(buffer))
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('image-proxy error', e)
    return res.status(500).send('proxy error')
  }
}
