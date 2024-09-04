'use client'

import { PARTYKIT_HOST } from '@/app/env'
import usePartySocket from 'partysocket/react'
import { toast } from 'sonner'

export default function Realtime() {
  usePartySocket({
    host: PARTYKIT_HOST,
    room: 'home',
    onMessage(event) {
      const message = event.data
      toast.success(`${message} was regenerated`)
    },
  });
  return null
}
