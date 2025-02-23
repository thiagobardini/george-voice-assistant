import fs from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "appointments.json");

// Função para salvar um novo agendamento no arquivo JSON
export function saveAppointment(data) {
  let appointments = [];
  if (fs.existsSync(DATA_FILE)) {
    const fileContent = fs.readFileSync(DATA_FILE, "utf-8");
    appointments = JSON.parse(fileContent);
  }

  appointments.push(data);
  fs.writeFileSync(DATA_FILE, JSON.stringify(appointments, null, 2), "utf-8");
}

// Função para ler todos os agendamentos salvos
export function getAppointments() {
  if (fs.existsSync(DATA_FILE)) {
    const fileContent = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(fileContent);
  }
  return [];
}