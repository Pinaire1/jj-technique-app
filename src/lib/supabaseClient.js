import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://dzvwqycbzpjlfgvnbrmt.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR6dndxeWNienBqbGZndm5icm10Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY4MTUzNTksImV4cCI6MjA2MjM5MTM1OX0.36XIC6qmbLuAt13Vpiq1j-P5feWsgQbzqsuiTGoSbdQ'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
