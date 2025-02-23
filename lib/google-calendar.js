import { google } from "googleapis";

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

oauth2Client.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN });

// Função para adicionar um evento ao Google Calendar
export async function addEventToCalendar(data) {
  try {
    const appointmentDate = new Date(data.appointmentDate);

    // Validar se a data é válida
    if (isNaN(appointmentDate.getTime())) {
      throw new Error("Invalid appointment date format");
    }

    const calendar = google.calendar({ version: "v3", auth: oauth2Client });
    const event = {
      summary: `Home Inspection for ${data.name}`,
      location: `${data.address}, ${data.location}`,
      description: `Customer: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phoneNumber}`,
      start: {
        dateTime: appointmentDate.toISOString(),
        timeZone: "America/New_York",
      },
      end: {
        dateTime: new Date(appointmentDate.getTime() + 3 * 60 * 60 * 1000).toISOString(), // 3 horas depois
        timeZone: "America/New_York",
      },
      attendees: [{ email: data.email }],
    };

    const response = await calendar.events.insert({
      calendarId: process.env.GOOGLE_CALENDAR_ID || "primary",
      resource: event,
    });

    return response.data.htmlLink;
  } catch (error) {
    console.error("Error adding event to Google Calendar:", error);
    throw error;
  }
}