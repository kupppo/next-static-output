import notifyClient from '@/lib/notify'

export const dynamic = 'force-static'
export const revalidate = false
export const dynamicParams = true

export async function generateStaticParams() {
  return [
    { slug: 'hello' },
    { slug: 'world' },
  ]
}

export default async function SamplePage({ params }: { params: { slug: string } }) {
  console.log(`running page:${params.slug}`)
  await notifyClient(`/${params.slug}`)
  return (
    <div>
      <h1>Page for {params.slug}</h1>
    </div>
  )
}
