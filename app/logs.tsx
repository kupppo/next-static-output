'use client'

import { useEffect, useState } from 'react'
import type { Log } from '@/app/types'

const getStatusColor = (status: number | undefined) => {
  if (!status) return '#f13342'
  const statusString = status.toString()
  if (statusString.startsWith('2')) return '#30b37c'
  if (statusString.startsWith('3')) return '##ffae00'
  return '#f13342'
}

const Invisible = ({ children }: { children: React.ReactNode }) => <span className="text-neutral-400 invisible">{children}</span>

export default function LogsList() {
  const [logs, setLogs] = useState<Log[]>([])

  useEffect(() => {
    const listener = (evt: CustomEvent) => {
      const data = evt.detail as Log
      setLogs((logs) => ([data, ...logs]))
    }
    document.addEventListener('log:request', listener as EventListener)

    return () => {
      document.removeEventListener('log:request', listener as EventListener)
    }
  }, [logs, setLogs])
  return (
    <ol>
      {logs.map((log, i) => (
        <li className="flex font-mono text-xs even:bg-neutral-100 px-2 py-3" key={i}>
          <div className="px-2">{log.timestamp}</div>
          <div className="px-2">{log.method || <Invisible>---</Invisible>}</div>
          <div className="px-2" style={{ color: getStatusColor(log.status) }}>{log.status || <Invisible>---</Invisible>}</div>
          <div className="px-2">{log.url}</div>
        </li>
      ))}
    </ol>
  )
}
