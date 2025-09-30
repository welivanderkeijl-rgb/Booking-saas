'use client'
import { useState } from "react"

export default function CheckPage() {
  const [pin, setPin] = useState("")
  const [mode, setMode] = useState("in")
  const [result, setResult] = useState<any>(null)

  async function submit(e:any) {
    e.preventDefault()
    const url = mode === "in" ? "/api/check/in" : "/api/check/out"
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pin })
    })
    setResult(await res.json())
  }

  return (
    <main style={{ padding: 20 }}>
      <h2>In-/Uitchecken</h2>
      <label>
        <input type="radio" checked={mode==="in"} onChange={()=>setMode("in")}/> Incheck
      </label>
      <label>
        <input type="radio" checked={mode==="out"} onChange={()=>setMode("out")}/> Uitcheck
      </label>
      <form onSubmit={submit}>
        <input placeholder="PIN code" value={pin} onChange={e=>setPin(e.target.value)} />
        <button>Bevestigen</button>
      </form>
      {result && <pre>{JSON.stringify(result,null,2)}</pre>}
    </main>
  )
}
