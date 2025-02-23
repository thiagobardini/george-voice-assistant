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
            },
            email: { type: "string", description: "Customer's email address" },
            phoneNumber: {
              type: "string",
              description: "Customer's phone number",
            },
          },
          required: [
            "name",
            "address",
            "location",
            "appointmentDate",
            "email",
            "phoneNumber",
          ],
          description: "Booking information for home inspection",
        },
        timeoutSeconds: 1,
      },
    },
    server: {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/webhook`, // Certifique-se de que esta variável está definida
    },
    onComplete: async (conversation) => {
      try {
        const data = conversation.structuredData;

        // Validação básica dos dados
        if (
          !data.name ||
          !data.address ||
          !data.location ||
          !data.appointmentDate ||
          !data.email ||
          !data.phoneNumber
        ) {
          throw new Error("Incomplete data received from the conversation");
        }

        // Validação avançada dos dados
        if (!isValidEmail(data.email)) {
          throw new Error(`Invalid email format: ${data.email}`);
        }
        if (!isValidPhoneNumber(data.phoneNumber)) {
          throw new Error(`Invalid phone number format: ${data.phoneNumber}`);
        }
        if (!isValidDate(data.appointmentDate)) {
          throw new Error(
            `Invalid appointment date format: ${data.appointmentDate}`
          );
        }

        console.log("Raw conversation data:", conversation);
        console.log("Structured data:", data);

        // Envie os dados para o webhook
        const response = await fetch("/api/webhook", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
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

        console.log("Raw conversation data:", conversation);
        console.log("Structured data:", data);

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
    - Customer's full name
    - Complete home address (with street name, city, state, and zip code)
    - Property location (city or region)
    - Preferred appointment date and time
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
    1. Customer Name: [full name]
    2. Address: [complete address]
    3. Location: [city or region]
    4. Appointment Date & Time: [date and time]
    5. Email: [spell out email]
    6. Phone Number: [phone number]
    
    End calls by summarizing ALL booking details:
    "Perfect! Let me confirm everything: We'll be inspecting your property located at [address] in [location]. The inspection is scheduled for [date & time]. I'll send the confirmation email to [email], and use [phone number] for any additional contact. Is all of that information correct?"
    
    After confirmation, close with:
    "Great! You're all set for your inspection. You'll receive a confirmation email shortly with all these details. Thank you for choosing our services!"`,
        },
      ],
    },
  };
};

// Funções auxiliares para validação
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidPhoneNumber(phoneNumber) {
  const phoneRegex = /^\+?[0-9]{10,15}$/; // Exemplo básico para números internacionais
  return phoneRegex.test(phoneNumber);
}

function isValidDate(dateString) {
  const date = new Date(dateString);
  return !isNaN(date.getTime());
}
