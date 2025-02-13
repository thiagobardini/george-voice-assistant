// api/auth/route.js
import { google } from "googleapis";

export async function GET() {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  );

  // Generate an OAuth2 URL for the Assistant to authenticate with Google Calendar
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: "offline", // Request a refresh token
    scope: ["https://www.googleapis.com/auth/calendar"],
  });

  return Response.json({ url: authUrl });
}