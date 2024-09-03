import Action from './action'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

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
    value: "hello",
    label: "GET /api/foo",
    type: "ISR",
  },
]

export default function Home() {
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
    </main>
  );
}
