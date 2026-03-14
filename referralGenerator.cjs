require('dotenv').config();
const crypto = require('crypto');
const axios = require('axios');
const { createClient } = require('@supabase/supabase-js');

// Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// Generate a unique referral link
function generateReferralLink(promoterName, platform) {
  const code = crypto.randomBytes(4).toString('hex');
  const baseUrl = process.env.VITE_SUPABASE_URL || "https://stocklinksa.co.za";
  return `${baseUrl}/?ref=${promoterName}_${platform}_${code}`;
}

// Shorten link using TinyURL API
async function shortenWithTinyURL(longUrl) {
  const apiKey = process.env.TINYURL_API_KEY;
  if (!apiKey) throw new Error("TinyURL API key missing");

  const response = await axios.post(
    "https://api.tinyurl.com/create",
    { url: longUrl, domain: "tinyurl.com" },
    { headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" } }
  );

  return response.data?.data?.tiny_url || null;
}

// Save referral to Supabase
async function saveReferral(promoterName, platform, longUrl, shortUrl) {
  const { error } = await supabase
    .from('referrals')
    .insert([{ promoter: promoterName, platform, long_url: longUrl, short_url: shortUrl }]);

  if (error) console.error("Supabase error:", error.message);
  else console.log("Referral saved to Supabase ✅");
}

// Create referral + shorten + save
async function createReferral(promoterName, platform) {
  const longUrl = generateReferralLink(promoterName, platform);
  try {
    const shortUrl = await shortenWithTinyURL(longUrl);
    console.log(`${promoterName} (${platform}): ${shortUrl}`);
    await saveReferral(promoterName, platform, longUrl, shortUrl);
  } catch (err) {
    console.error("Error:", err.message);
  }
}

// Example usage
createReferral("Anthony", "facebook");
createReferral("Lerato", "instagram");
