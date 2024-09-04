import { NextRequest, NextResponse } from 'next/server'
import { PARTYKIT_URL } from '@/app/env'

export const dynamic = 'force-static'
export const revalidate = false
export const dynamicParams = true

export async function generateStaticParams() {
  return [
    { slug: 'hello' },
    { slug: 'world' }
  ]
}

export async function GET(_req: NextRequest, { params }: { params: { slug: string } }) {
  console.log(`running ${params.slug}`)
  const roomUrl = `${PARTYKIT_URL}/party/home`
  await fetch(roomUrl, {
    method: 'POST',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      url: `/api/${params.slug}`
    })
  })
  return NextResponse.json({
    static: true,
    slug: params.slug
  })
}
