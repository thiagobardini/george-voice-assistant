export const getGeorgeAssistant = async () => {
  return {
    name: "George",
    firstMessage:
      "Hi, thanks for calling! My name is George. Are you looking to schedule a home inspection today?",
    transcriber: {
      provider: "deepgram",
      model: "nova-2",
      language: "en-US",
    },
    voice: {
      provider: "playht",
      voiceId: process.env.NEXT_PUBLIC_VAPI_VOICE_ID,
    },
    analysisPlan: {
      structuredDataPlan: {
        enabled: true,
        schema: {
          type: "object",
          properties: {
            name: { type: "string", description: "Customer's full name" },
            address: {
              type: "string",
              description:
                "Complete home address (with street name, city, state, and zip code)",
            },
            location: {
              type: "string",
              description: "Property location (city or region)",
            },
            appointmentDate: {
              type: "string",
              description: "Preferred appointment date and time",
              format: "date-time",
            },
            email: { type: "string", description: "Customer's email address" },
            phoneNumber: {
              type: "string",
              description: "Customer's phone number",
            },
            propertyType: {
              type: "string",
              description: "Type of property (residential or commercial)",
              enum: ["residential", "commercial"],
            },
            squareFootage: {
              type: "integer",
              description: "Approximate square footage of the property",
            },
          },
          required: [
            "name",
            "address",
            "location",
            "appointmentDate",
            "email",
            "phoneNumber",
            "propertyType",
            "squareFootage",
          ],
          description: "Booking information for home inspection",
        },
        timeoutSeconds: 1,
      },
    },
    server: {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/webhook`,
    },
    onComplete: async (conversation) => {
      try {
        const data = conversation.structuredData;

        if (!isValidAppointmentData(data)) {
          throw new Error(
            "Incomplete or invalid data received from the conversation"
          );
        }

        console.log("Structured data:", data);
        console.log("Sending data to /api/appointments:", data);

        const response = await fetch("/api/appointments", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          const errorDetails = await response.json();
          throw new Error(
            `Webhook request failed: ${
              errorDetails.error || response.statusText
            }`
          );
        }

        const result = await response.json();
        console.log("Webhook response:", result);

        return result;
      } catch (error) {
        console.error("Failed to process conversation:", error.message);
        return null;
      }
    },
    model: {
      provider: "openai",
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are George, a friendly and professional call operator for a home repair company specializing in home inspections.

    Your primary goal is to help callers schedule home inspections while maintaining a natural, conversational tone. You must collect ALL of the following information:
    - Complete home address (with street name and zip code)
    - Property type (residential or commercial)
    - Approximate square footage of the property
    - Preferred appointment date and time
    - Customer's full name
    - Customer's email address (ask for spelling)
    - Customer's phone number

    Key responsibilities:
    1. Verify spellings for addresses, email addresses, and phone numbers.
    2. Repeat information back to confirm accuracy.
    3. Answer common questions about inspections.
    4. Keep conversations focused on scheduling.

    Common Questions & Responses:
    - Inspection process: "A certified inspector will assess the home's structure, electrical systems, and plumbing. You'll receive a detailed report afterward."
    - Duration: "Most inspections take 2-3 hours."
    - Cost: "Pricing varies based on home size and location. I can connect you with someone for a quote."

    If callers go off-topic, gently guide them back to scheduling with phrases like:
    "I understand, but let's make sure we get your inspection scheduled first."

    Before ending the call, verify you have collected ALL required information:
    1. Property Address: [repeat full address]
    2. Property Type: [residential/commercial]
    3. Square Footage: [number]
    4. Appointment Date & Time: [date and time]
    5. Customer Name: [full name]
    6. Email Address: [spell out email]
    7. Phone Number: [phone number]

    End calls by summarizing ALL booking details:
    "Perfect! Let me confirm everything: We'll be inspecting your property located at [address] in [location]. The inspection is scheduled for [date & time]. I'll send the confirmation email to [email], and use [phone number] for any additional contact. Is all of that information correct?"

    After confirmation, close with:
    "Great! You're all set for your inspection. You'll receive a confirmation email shortly with all these details. Thank you for choosing our services!"`,
        },
      ],
    },
  };
};

function isValidAppointmentData(data) {
  return (
    data.name &&
    data.address &&
    data.location &&
    data.appointmentDate &&
    data.email &&
    data.phoneNumber &&
    data.propertyType &&
    data.squareFootage &&
    isValidEmail(data.email) &&
    isValidPhoneNumber(data.phoneNumber) &&
    isValidDate(data.appointmentDate) &&
    isValidPropertyType(data.propertyType) &&
    isValidSquareFootage(data.squareFootage)
  );
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidPhoneNumber(phoneNumber) {
  const phoneRegex = /^\+?[0-9]{10,15}$/;
  return phoneRegex.test(phoneNumber);
}

function isValidDate(dateString) {
  const date = new Date(dateString);
  return !isNaN(date.getTime());
}

function isValidPropertyType(propertyType) {
  return ["residential", "commercial"].includes(propertyType.toLowerCase());
}

function isValidSquareFootage(squareFootage) {
  return Number.isInteger(squareFootage) && squareFootage > 0;
}
