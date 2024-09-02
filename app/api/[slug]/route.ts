import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-static'
export const revalidate = false
export const dynamicParams = true

export async function generateStaticParams() {
  return []
}

export function GET(_req: NextRequest, { params }: { params: { slug: string } }) {
  console.log(`running ${params.slug}`)
  return NextResponse.json({
    static: true,
    slug: params.slug
  })
}
