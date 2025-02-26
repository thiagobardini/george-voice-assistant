import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function POST(request) {
  try {
    const appointment = await request.json();
    console.log("Received new appointment data:", appointment);

    // Define the path to the appointments JSON file and log it.
    const jsonFilePath = path.join(process.cwd(), "data", "appointments.json");
    console.log("Resolved JSON file path:", jsonFilePath);

    // Read existing appointments
    const fileContents = await fs.readFile(jsonFilePath, "utf8");
    const appointments = JSON.parse(fileContents);

    // Append new appointment
    appointments.push(appointment);

    // Save updated data back to the file
    await fs.writeFile(jsonFilePath, JSON.stringify(appointments, null, 2));
    console.log("Appointment saved successfully.");

    return NextResponse.json({ success: true, appointment });
  } catch (error) {
    console.error("Error saving appointment:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
