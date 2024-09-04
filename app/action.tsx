'use client'

import { Button } from '@/components/ui/button'
import type { Log } from '@/app/types'

export default function Action({ children, value }: { children: React.ReactNode; value: string }) {
  const handleAction = async (action: string) => {
    const now = new Date().toTimeString()
    const timestamp = now.split(' ')[0]
    const url = `/api/${action}`
    const res = await fetch(url, {
      cache: 'no-cache',
    })
    const detail: Log = {
      status: res.status,
      method: 'GET',
      url,
      timestamp,
    }
    const evt = new CustomEvent('log:request', { detail })
    document.dispatchEvent(evt)
  }
  return (
    <Button onClick={() => handleAction(value)}>{children}</Button>
  )
}