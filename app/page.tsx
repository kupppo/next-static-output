import { Action, ClearLogs } from './action'
import { Separator } from '@/components/ui/separator'
import Realtime from './realtime'
import Logs from './logs'

const actions = [
  {
    url: "/api/hello",
    type: "Build",
  },
  {
    url: "/api/world",
    type: "Build",
  },
  {
    url: "/api/hello/interval",
    type: "Build",
  },
  {
    url: "/api/world/interval",
    type: "Build",
  },
  {
    url: "/api/foo",
    type: "ISR",
  },
]

export default async function Home() {
  return (
    <main className="p-8 flex gap-8">
      <section className="min-w-[300px]">
        <ul>
          {actions.map((action, index) => (
            <li key={index} className="block my-2 py-1">
              <Action url={action.url}>
                GET {action.url}
              </Action>
              <div className="mt-2 mb-4 uppercase font-normal rounded-xl text-xs font-mono">
                {action.type}
              </div>
              {index < actions.length - 1 && <Separator />}
            </li>
          ))}
        </ul>
        <div className="mt-8">
          <ClearLogs />
        </div>
      </section>
      <Logs />
      <Realtime />
    </main>
  );
}
