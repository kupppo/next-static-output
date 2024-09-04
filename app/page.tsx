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
    <main className="p-8">
      <section>
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
      <Realtime />
    </main>
  );
}
