'use client'
import { useState } from "react"

export default function BookPage() {
  const [email, setEmail] = useState("")
  const [startAt, setStartAt] = useState("")
  const [endAt, setEndAt] = useState("")
  const [result, setResult] = useState<any>(null)

  async function submit(e: any) {
    e.preventDefault()
    const res = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, startAt, endAt })
    })
    setResult(await res.json())
  }

  return (
    <main style={{ padding: 20 }}>
      <h2>Nieuwe Boeking</h2>
      <form onSubmit={submit}>
        <input placeholder="E-mail" value={email} onChange={e=>setEmail(e.target.value)} /><br/>
        <input type="datetime-local" value={startAt} onChange={e=>setStartAt(e.target.value)} /><br/>
        <input type="datetime-local" value={endAt} onChange={e=>setEndAt(e.target.value)} /><br/>
        <button>Boeken</button>
      </form>
      {result && <pre>{JSON.stringify(result,null,2)}</pre>}
    </main>
  )
}
