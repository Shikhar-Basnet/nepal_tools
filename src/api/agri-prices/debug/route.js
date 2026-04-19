// DELETE this file after confirming selectors work in production
export async function GET() {
  const res = await fetch('https://kalimatimarket.gov.np/price', {
    headers: { 'User-Agent': 'Mozilla/5.0' },
  })
  const html = await res.text()

  // Return first 5000 chars of HTML so you can see the table structure
  return new Response(html.slice(0, 5000), {
    headers: { 'Content-Type': 'text/html' },
  })
}