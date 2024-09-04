import { PARTYKIT_URL } from '@/app/env'

const checkPartyKit = (error: Error, url: string) => {
  try {
    // @ts-ignore
    if (error?.cause?.code === 'ECONNREFUSED') {
      console.error(`Could not connect to PartyKit at: ${PARTYKIT_URL}`)
      return
    }
    console.error(`NotifyClient failed for: ${url}`)
  } catch (_) {}
}

export default async function NotifyClient(url: string) {
  try {
    const roomUrl = `${PARTYKIT_URL}/party/home`
    await fetch(roomUrl, {
      method: 'POST',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        url,
      })
    })
  } catch (err: unknown) {
    const error = err as Error
    checkPartyKit(error, url)
  }
}
