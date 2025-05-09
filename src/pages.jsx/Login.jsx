import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) setErrorMsg(error.message)
    else window.location.href = '/dashboard'
  }

  return (
    <div>
      <h2>Login</h2>
      {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Log In</button>
    </div>
  )
}
