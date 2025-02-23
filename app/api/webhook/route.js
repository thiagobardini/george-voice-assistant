// api/webhook/route.js
import { saveAppointment } from "@/lib/data-handler";
import { addEventToCalendar } from "@/lib/google-calendar";

export async function POST(request) {
  try {
    const requestData = await request.json();

    // Extrair os dados relevantes do webhook
    const { name, address, location, appointmentDate, email, phoneNumber } = requestData;

    // Validar os dados recebidos
    if (!name || !address || !location || !appointmentDate || !email || !phoneNumber) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
    }

    // Salvar os dados no arquivo JSON
    saveAppointment({ name, address, location, appointmentDate, email, phoneNumber });

    // Tentar criar o evento no Google Calendar
    try {
      const calendarResponse = await addEventToCalendar({
        name,
        address,
        location,
        appointmentDate,
        email,
        phoneNumber,
      });

      return new Response(
        JSON.stringify({ message: "Event created successfully!", link: calendarResponse }),
        { status: 200 }
      );
    } catch (calendarError) {
      console.error("Error adding event to Google Calendar:", calendarError);
      return new Response(JSON.stringify({ error: "Failed to create event" }), { status: 500 });
    }
  } catch (error) {
    console.error("Error processing webhook:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}