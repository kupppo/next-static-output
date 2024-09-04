import { DEPLOYMENT_ID, PARTYKIT_URL } from '@/app/env'

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
    const roomUrl = new URL(`/party/${DEPLOYMENT_ID}`, PARTYKIT_URL)
    await fetch(roomUrl.toString(), {
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
    console.error(error)
    checkPartyKit(error, url)
  }
}
