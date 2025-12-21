import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center px-6">
      <div className="max-w-3xl w-full space-y-8">
        <div className="flex items-center justify-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-slate-900 ring-1 ring-slate-800 shadow-lg shadow-slate-900/50">
            <img src="/k3h4.svg" className="h-14 w-14" alt="K3H4 logo" />
          </div>
        </div>

        <div className="text-center space-y-2">
          <h1 className="text-4xl font-semibold tracking-tight">K3H4</h1>
          <p className="text-slate-300">Bundled with Bun, styled with Tailwind.</p>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl px-8 py-6 shadow-xl shadow-slate-900/40 space-y-4">
          <button
            onClick={() => setCount((value) => value + 1)}
            className="w-full rounded-xl bg-gradient-to-r from-amber-300 via-amber-200 to-amber-300 text-slate-950 font-semibold py-3 text-lg shadow-md shadow-amber-500/30 hover:shadow-lg hover:-translate-y-px transition"
          >
            count is {count}
          </button>
          <p className="text-sm text-slate-400">
            Edit <code className="text-amber-200">src/App.tsx</code> and save to rebuild.
          </p>
        </div>

        <p className="text-center text-sm text-slate-400">
          Docs: bun.sh/docs · tailwindcss.com/docs
        </p>
      </div>
    </main>
  )
}

export default App
