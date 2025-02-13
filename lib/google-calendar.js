// lib/google-calendar.js
import { google } from "googleapis";

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

// Carregue os tokens salvos das variáveis de ambiente
oauth2Client.setCredentials({
  access_token: process.env.GOOGLE_CALENDAR_ACCESS_TOKEN,
  refresh_token: process.env.GOOGLE_CALENDAR_REFRESH_TOKEN,
});

// Função para adicionar um evento ao Google Calendar
export async function addEventToCalendar(data) {
  try {
    const calendar = google.calendar({ version: "v3", auth: oauth2Client });

    const event = {
      summary: `Home Inspection for ${data.name}`,
      location: `${data.address}, ${data.location}`,
      description: `Customer: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phoneNumber}`,
      start: {
        dateTime: new Date(data.appointmentDate).toISOString(),
        timeZone: "America/New_York", // Altere para o fuso horário correto
      },
      end: {
        dateTime: new Date(new Date(data.appointmentDate).getTime() + 3 * 60 * 60 * 1000).toISOString(), // Duração de 3 horas
        timeZone: "America/New_York", // Altere para o fuso horário correto
      },
      attendees: [{ email: data.email }],
    };

    const response = await calendar.events.insert({
      calendarId: process.env.GOOGLE_CALENDAR_ID || "primary", // Use o ID da agenda ou "primary" como padrão
      resource: event,
    });

    return response.data.htmlLink; // Retorna o link do evento criado
  } catch (error) {
    console.error("Error adding event to Google Calendar:", error);
    throw error;
  }
}