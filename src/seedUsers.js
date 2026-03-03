// seedUsers.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://adiwffecdtcjodxlmvjz.supabase.co"
const serviceRoleKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." // your service role key
const supabase = createClient(supabaseUrl, serviceRoleKey)

async function updateUsers() {
  try {
    // Promoter UID (already working)
    const promoterUID = "7625316f-6094-455a-b87a-4db522214d12"

    // Replace with your actual Admin UID from Supabase dashboard
    const adminUID = "YOUR_ADMIN_USER_UID"

    // Update promoter user with role + mock payout stats
    const { data: promoter, error: promoterError } = await supabase.auth.admin.updateUserById(
      promoterUID,
      { user_metadata: { role: "promoter", payouts: [1200, 850, 640], vouchers: ["VCH123", "VCH456"] } }
    )
    console.log("Promoter updated:", promoter, promoterError)

    // Update admin user with role + mock user list
    const { data: admin, error: adminError } = await supabase.auth.admin.updateUserById(
      adminUID,
      { user_metadata: { role: "admin", managed_users: ["promoter@example.com", "testuser@example.com"] } }
    )
    console.log("Admin updated:", admin, adminError)
  } catch (err) {
    console.error("Unexpected error:", err)
  }
}

updateUsers()

