import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://adiwffecdtcjodxlmvjz.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." // your anon key

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
