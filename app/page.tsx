import { Action, ClearLogs } from './action'
import { Separator } from '@/components/ui/separator'
import Realtime from './realtime'
import Logs from './logs'

const actions = [
  {
    url: "/api/hello",
    type: "Build",
    source: "Route Handler",
    caption: (
      <>
        Generated at build time via <code>getStaticParams</code>.
        <br />
        Has <code>revalidate</code> set to <code>false</code>.
      </>
    )
  },
  {
    url: "/api/hello/interval",
    type: "Build",
    source: "Route Handler",
    caption: (
      <>
        Generated at build time via <code>getStaticParams</code>.
        <br />
        Has <code>revalidate</code> set to <code>60</code>.
      </>
    )
  },
  {
    url: "/api/foo",
    type: "ISR",
    source: "Route Handler",
    caption: (
      <>
        Generated through fallback.
        <br />
        Has <code>revalidate</code> set to <code>false</code>.
      </>
    )
  },
  {
    url: "/api/foo/interval",
    type: "ISR",
    source: "Route Handler",
    caption: (
      <>
        Generated through fallback.
        <br />
        Has <code>revalidate</code> set to <code>60</code>.
      </>
    )
  },
  {
    url: "/hello",
    type: "Build",
    source: "Page",
    caption: (
      <>
        Generated at build time via <code>getStaticParams</code>.
        <br />
        Has <code>revalidate</code> set to <code>false</code>.
      </>
    )
  },
  {
    url: "/foo",
    type: "ISR",
    source: "Page",
    caption: (
      <>
        Generated through fallback.
        <br />
        Has <code>revalidate</code> set to <code>false</code>.
      </>
    )
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
              <div className="mt-2 mb-4">
                <h3 className="uppercase font-normal rounded-xl text-xs font-mono">
                  {action.type}{' '}
                  <span className="text-foreground/60">&mdash; {action.source}</span>
                </h3>
                <p className="mt-4 text-xs text-foreground/60">{action.caption}</p>
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
