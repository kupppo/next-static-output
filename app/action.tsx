'use client'

import { Button } from '@/components/ui/button'

export default function Action({ children, value }: { children: React.ReactNode; value: string }) {
  const handleAction = async (action: string) => {
    const res = await fetch(`/api/${action}`, {
      cache: 'no-cache',
    })
  }
  return (
    <Button onClick={() => handleAction(value)}>{children}</Button>
  )
}