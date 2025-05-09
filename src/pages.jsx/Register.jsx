import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [beltLevel, setBeltLevel] = useState('White')
  const [errorMsg, setErrorMsg] = useState('')

  const handleRegister = async () => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (signUpError) {
      setError(signUpError.message)
      return
    }

    // Insert user data into 'users' table
    const userId = data.user.id
    const { error: insertError } = await supabase.from('users').insert([
      {
        id: userId,
        email,
        belt_level: beltLevel,
      },
    ])
    if (insertError) {
      setErrorMsg(insertError.message)
    } else {
      window.location.href = '/dashboard'
    }
  }

  return (
    <div>
      <h2>Register</h2>
      {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <select onChange={(e) => setBeltLevel(e.target.value)} value={beltLevel}>
        <option value="White">White</option>
        <option value="Blue">Blue</option>
        <option value="Purple">Purple</option>
        <option value="Brown">Brown</option>
        <option value="Black">Black</option>
      </select>
      <button onClick={handleRegister}>Register</button>
    </div>
  )
}
