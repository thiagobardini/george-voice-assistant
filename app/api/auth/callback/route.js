// api/auth/callback/route.js
import { google } from "googleapis";

export async function GET(request) {
  try {
    // Extrair o código de autorização da URL
    const url = new URL(request.url);
    const code = url.searchParams.get("code");

    if (!code) {
      return Response.json({ error: "Authorization code not found" }, { status: 400 });
    }

    // Configurar o cliente OAuth2
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );

    // Trocar o código de autorização por tokens
    const { tokens } = await oauth2Client.getToken(code);

    // Retornar os tokens como resposta
    return Response.json(tokens);
  } catch (error) {
    console.error("Error exchanging authorization code for tokens:", error);
    return Response.json({ error: "Failed to exchange authorization code" }, { status: 500 });
  }
}