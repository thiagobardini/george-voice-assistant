import fs from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "appointments.json");

// Ensure data directory exists
const DATA_DIR = path.join(process.cwd(), "data");
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR);
}

// Save appointment to JSON file
export function saveAppointment(data) {
  // Basic validation for required fields
  const requiredFields = [
    'address',
    'propertyType',
    'squareFootage',
    'appointmentDate',
    'fullName',
    'email',
    'phoneNumber'
  ];

  for (const field of requiredFields) {
    if (!data[field]) {
      throw new Error(`Missing required field: ${field}`);
    }
  }

  let appointments = [];
  if (fs.existsSync(DATA_FILE)) {
    const fileContent = fs.readFileSync(DATA_FILE, "utf-8");
    appointments = JSON.parse(fileContent);
  }

  appointments.push(data);
  fs.writeFileSync(DATA_FILE, JSON.stringify(appointments, null, 2), "utf-8");
}

// Read all appointments from JSON file
export function getAppointments() {
  if (fs.existsSync(DATA_FILE)) {
    const fileContent = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(fileContent);
  }
  return [];
}