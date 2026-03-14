require('dotenv').config();
const crypto = require('crypto');
const axios = require('axios'); // axios only

// Generate a unique referral link
function generateReferralLink(promoterName, platform) {
  const code = crypto.randomBytes(4).toString('hex');
  const baseUrl = process.env.VITE_SUPABASE_URL || "https://stocklinksa.co.za";
  return `${baseUrl}/?ref=${promoterName}_${platform}_${code}`;
}

// Shorten link using TinyURL API
async function shortenWithTinyURL(longUrl) {
  const apiKey = process.env.TINYURL_API_KEY;
  if (!apiKey) {
    throw new Error("TinyURL API key is missing. Check your .env file.");
  }

  const response = await axios.post(
    "https://api.tinyurl.com/create",
    {
      url: longUrl,
      domain: "tinyurl.com"
    },
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      }
    }
  );

  if (response.data?.data?.tiny_url) {
    return response.data.data.tiny_url;
  } else {
    throw new Error(JSON.stringify(response.data));
  }
}

// Create referral + shorten
async function createReferral(promoterName, platform) {
  const longUrl = generateReferralLink(promoterName, platform);
  try {
    const shortUrl = await shortenWithTinyURL(longUrl);
    console.log(`${promoterName} (${platform}): ${shortUrl}`);
  } catch (err) {
    console.error("TinyURL error:", err.message);
  }
}

// Example usage
createReferral("Anthony", "facebook");
createReferral("Lerato", "instagram");
