import Action from './action'
import { PARTYKIT_URL } from '@/app/env'
import { Separator } from '@/components/ui/separator'
import { notFound } from 'next/navigation'
import Realtime from './realtime'

const actions = [
  {
    value: "hello",
    label: "GET /api/hello",
    type: "Build",
  },
  {
    value: "world",
    label: "GET /api/world",
    type: "Build",
  },
  {
    value: "foo",
    label: "GET /api/foo",
    type: "ISR",
  },
]

export default async function Home() {
  return (
    <main className="p-8 flex gap-8">
      <section className="min-w-[300px]">
        <ul>
          {actions.map((action, index) => (
            <li key={action.value} className="block my-2 py-1">
              <Action value={action.value}>
                {action.label}
              </Action>
              <div className="mt-2 mb-4 uppercase font-normal rounded-xl text-xs font-mono">
                {action.type}
              </div>
              {index < actions.length - 1 && <Separator />}
            </li>
          ))}
        </ul>
      </section>
      <section className="mb-8 p-4 w-3/4 max-w-[800px] border rounded-md min-h-90vh">
        <ol>
          <li>log 1</li>
        </ol>
      </section>
      <Realtime />
    </main>
  );
}
