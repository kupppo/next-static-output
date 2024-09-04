'use client'

import { useEffect, useState } from 'react'
import type { Log } from '@/app/types'
import { ScrollArea } from '@/components/ui/scroll-area'

const getStatusColor = (status: number | undefined) => {
  if (!status) return '#7d7d7d'
  const statusString = status.toString()
  if (statusString.startsWith('2')) return '#30b37c'
  if (statusString.startsWith('3')) return '#47a8ff'
  if (statusString.startsWith('4')) return '#ffae00'
  if (statusString.startsWith('5')) return '#ffae00'
  return '#f13342'
}

const cacheName = (cache: string | undefined) => {
  if (!cache) return <Invisible>---</Invisible>
  return cache
}

const Invisible = ({ children }: { children: React.ReactNode }) => <span className="text-neutral-400 invisible">{children}</span>

export default function LogsList() {
  const [logs, setLogs] = useState<Log[]>([])

  useEffect(() => {
    const logListener = (evt: CustomEvent) => {
      const data = evt.detail as Log
      setLogs((logs) => ([data, ...logs]))
    }
    const clearListener = () => {
      setLogs([])
    }
    document.addEventListener('log:request', logListener as EventListener)
    document.addEventListener('log:clear', clearListener as EventListener)

    return () => {
      document.removeEventListener('log:request', logListener as EventListener)
      document.removeEventListener('log:clear', clearListener as EventListener)
    }
  }, [logs, setLogs])
  return (
    <section className="w-full">
      <ScrollArea className="mb-8 p-4 w-3/4 max-w-[800px] border rounded-md h-90vh">
        <ol>
          {logs.length === 0 ? (
            <div className="font-mono text-xs text-foreground/60 relative">
              Awaiting logs{' '}
              <span className="motion-safe:animate-pulse" style={{ animationDelay: '0s' }}>.</span>
              <span className="motion-safe:animate-pulse" style={{ animationDelay: '0.2s' }}>.</span>
              <span className="motion-safe:animate-pulse" style={{ animationDelay: '0.4s' }}>.</span>
            </div>
          ) : logs.map((log, i) => (
            <li className="flex font-mono text-xs even:bg-neutral-100 dark:even:bg-neutral-900 px-2 py-3" key={i}>
              <div className="px-2">{log.timestamp}</div>
              <div className="px-2">{log.method || <Invisible>---</Invisible>}</div>
              <div className="px-2" style={{ color: getStatusColor(log.status) }}>{log.status || <Invisible>---</Invisible>}</div>
              <div className="px-2 min-w-[80px] text-foreground/60">{cacheName(log.cache)}</div>
              <div className="px-2">{log.url}</div>
            </li>
          ))}
        </ol>
      </ScrollArea>
    </section>
  )
}
