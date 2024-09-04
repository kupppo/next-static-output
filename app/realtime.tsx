'use client'

import { PARTYKIT_HOST } from '@/app/env'
import usePartySocket from 'partysocket/react'
import { toast } from 'sonner'
import type { Log } from '@/app/types'

export default function Realtime() {
  usePartySocket({
    host: PARTYKIT_HOST,
    room: 'home',
    onMessage(event) {
      const message = `${event.data} was regenerated`
      toast.success(`${message} was regenerated`)
      const now = new Date().toTimeString()
      const timestamp = now.split(' ')[0]
      const detail: Log = {
        url: message,
        timestamp,
      }
      const evt = new CustomEvent('log:request', { detail })
      document.dispatchEvent(evt)
    },
  });
  return null
}
