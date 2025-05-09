import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function Dashboard() {
  const [user, setUser] = useState(null)
  const [beltLevel, setBeltLevel] = useState('')

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        window.location.href = '/login'
        return
      }
      setUser(user)

      const { data, error } = await supabase
        .from('users')
        .select('belt_level')
        .eq('id', user.id)
        .single()

      if (data) setBeltLevel(data.belt_level)
    }

    fetchUser()
  }, [])

  return (
    <div>
      <h1>Welcome to your Dashboard</h1>
      {beltLevel && <p>Your belt level: {beltLevel}</p>}
    </div>
  )
}
