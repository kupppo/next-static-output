'use client'

import { Button } from '@/components/ui/button'
import { X as RevalidateIcon } from 'lucide-react'
import type { Log } from '@/app/types'
import { forceRevalidate } from './actions/revalidate'

const getCacheHeader = (res: Response) => {
  switch (true) {
    case res.headers.has('x-vercel-cache'):
      const vercelCache = res.headers.get('x-vercel-cache')
      if (vercelCache) {
        return vercelCache
      }
    case res.headers.has('x-nextjs-cache'):
      const nextCache = res.headers.get('x-nextjs-cache')
      if (nextCache) {
        return nextCache
      }
      break
  }
}

export function Action({ children, url }: { children: React.ReactNode; url: string }) {
  const handleAction = async (url: string) => {
    const now = new Date().toTimeString()
    const timestamp = now.split(' ')[0]
    const res = await fetch(url, {
      cache: 'no-cache',
    })
    const cache = getCacheHeader(res)
    const detail: Log = {
      status: res.status,
      method: 'GET',
      url,
      cache,
      timestamp,
    }
    const evt = new CustomEvent('log:request', { detail })
    document.dispatchEvent(evt)
  }

  const handleRevalidate = async (url: string) => {
    const absoluteUrl = new URL(url, window.location.origin).toString()
    const now = new Date().toTimeString()
    const timestamp = now.split(' ')[0]
    await forceRevalidate(absoluteUrl)
    const detail: Log = {
      url: `${url} was revalidated`,
      timestamp,
    }
    const evt = new CustomEvent('log:request', { detail })
    document.dispatchEvent(evt)
  }
  return (
    <div className="flex gap-2 justify-between">
      <Button onClick={() => handleAction(url)}>{children}</Button>
      <Button variant="ghost" size="sm" onClick={() => handleRevalidate(url)}>
        <span className="text-xs font-mono underline decoration-dotted underline-offset-2">Revalidate</span>
      </Button>
    </div>
  )
}

export function ClearLogs() {
  return (
    <Button variant="outline" onClick={() => {
      const evt = new CustomEvent('log:clear')
      document.dispatchEvent(evt)
    }}>Clear Logs</Button>
  )
}
