'use server'

import { revalidatePath } from "next/cache"

export async function forceRevalidate (input: string, force: boolean = false) {
  const url = new URL(input)
  revalidatePath(url.pathname)
  if (force) {
    // Revalidating only occurs when the path is next visited, so force a visit
    // https://nextjs.org/docs/app/api-reference/functions/revalidatePath
    await fetch(url.toString(), {
      cache: 'no-cache',
    })
  }
}
