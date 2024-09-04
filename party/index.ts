import type * as Party from 'partykit/server'

export default class Server implements Party.Server {
  constructor(readonly room: Party.Room) {}

  onMessage(message: string, sender: Party.Connection) {
    // let's log the message
    console.log(`connection ${sender.id} sent message: ${message}`)
    // as well as broadcast it to all the other connections in the room...
    this.room.broadcast(
      `${sender.id}: ${message}`,
      // ...except for the connection it came from
      [sender.id]
    )
  }
  async onRequest(req: Party.Request): Promise<Response> {
    if (req.method === 'POST') {
      // let's log the request body
      const body = await req.json()
      const data = body as { url: string }
      const url = data.url
      this.room.broadcast(url)
      // and respond with a 200 status code
      return new Response('OK', { status: 200 })
    }
    // if it's not a POST request, we'll respond with a 405 status code
    return new Response('Method Not Allowed', { status: 405 })
  }
}

Server satisfies Party.Worker
