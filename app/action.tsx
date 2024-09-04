'use client'

import { Button } from '@/components/ui/button'

export default function Action({ children, value }: { children: React.ReactNode; value: string }) {
  const handleAction = async (action: string) => {
    const now = new Date().toTimeString()
    const timestamp = now.split(' ')[0]
    const url = `/api/${action}`
    const res = await fetch(url, {
      cache: 'no-cache',
    })
    const evt = new CustomEvent('log:request', {
      detail: {
        status: res.status,
        method: 'GET',
        url,
        timestamp,
      }
    })
    document.dispatchEvent(evt)
  }
  return (
    <Button onClick={() => handleAction(value)}>{children}</Button>
  )
}