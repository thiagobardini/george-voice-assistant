// api/webhook/route.js
import { saveAppointment } from "@/lib/data-handler";
import { addEventToCalendar } from "@/lib/google-calendar";

export async function POST(request) {
  try {
    const requestData = await request.json();

    // Extract data using new schema
    const { 
      address,
      propertyType,
      squareFootage,
      appointmentDate,
      fullName,
      email,
      phoneNumber 
    } = requestData;

    // Validate required fields
    if (!address || !propertyType || !squareFootage || 
        !appointmentDate || !fullName || !email || !phoneNumber) {
      return new Response(
        JSON.stringify({ 
          error: "Missing required fields",
          details: "All fields are required: address, propertyType, squareFootage, appointmentDate, fullName, email, phoneNumber"
        }), 
        { status: 400 }
      );
    }

    // Save appointment with new schema
    saveAppointment({ 
      address,
      propertyType,
      squareFootage,
      appointmentDate,
      fullName,
      email,
      phoneNumber 
    });

    // Create calendar event with new schema
    try {
      const calendarResponse = await addEventToCalendar({
        address,
        propertyType,
        squareFootage,
        appointmentDate,
        fullName,
        email,
        phoneNumber
      });

      return new Response(
        JSON.stringify({ 
          message: "Event created successfully!", 
          link: calendarResponse 
        }),
        { status: 200 }
      );
    } catch (calendarError) {
      console.error("Error adding event to Google Calendar:", calendarError);
      return new Response(
        JSON.stringify({ error: "Failed to create calendar event" }), 
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error processing webhook:", error);
    return new Response(
      JSON.stringify({ error: "Internal Server Error" }), 
      { status: 500 }
    );
  }
}