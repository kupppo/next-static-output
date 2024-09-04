import { NextRequest, NextResponse } from 'next/server'
import notifyClient from '@/lib/notify'

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
  await notifyClient(`/api/${params.slug}`)
  return NextResponse.json({
    static: true,
    slug: params.slug
  })
}
