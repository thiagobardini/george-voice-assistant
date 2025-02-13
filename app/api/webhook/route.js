// api/webhook/route.js
import { addEventToCalendar } from "@/lib/google-calendar";

export async function POST(request) {
  try {
    const data = await request.json();
    console.log("Received webhook data:", data);

    // Adicione o evento ao Google Calendar
    const eventLink = await addEventToCalendar(data);

    return new Response(
      JSON.stringify({ message: "Event created successfully!", link: eventLink }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error processing webhook:", error);
    return new Response(
      JSON.stringify({ error: "Failed to create event" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}