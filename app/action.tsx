'use client'

import { Button } from '@/components/ui/button'
import type { Log } from '@/app/types'

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

export function Action({ children, value }: { children: React.ReactNode; value: string }) {
  const handleAction = async (action: string) => {
    const now = new Date().toTimeString()
    const timestamp = now.split(' ')[0]
    const url = `/api/${action}`
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
  return (
    <Button onClick={() => handleAction(value)}>{children}</Button>
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
