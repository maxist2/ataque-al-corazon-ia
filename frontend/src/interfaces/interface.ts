import type { ReactNode } from "react";

export interface PatientData {
  "Patient ID"?: number;
  Age: number;
  Sex: string;
  Cholesterol: number;
  "First Name": string;
  "Last Name": string;
  "Blood Pressure": string;
  "Heart Rate": number;
  Diabetes: string;
  "Family History": string;
  Smoking: string;
  Obesity: string;
  "Alcohol Consumption": string;
  "Exercise Hours/Week": number;
  Diet: string;
  "Previous Heart Problems": string;
  "Medication Use": string;
  "Stress Level": number;
  "Sedentary Hours/Day": number;
  Income: number;
  BMI: number;
  Triglycerides: number;
  "Physical Activity Days/Week": number;
  "Sleep Hours/Day": number;
  Country: string;
  Continent: string;
  Hemisphere: string;
  "Healthcare Expenses": number;
  "Medical History": string;
  "Dietary Habits": string;
  Ethnicity: string;
  "Education Level": string;
  "Socioeconomic Status": string;
  "Insurance Provider": string;
  "Heart Attack Risk"?: number; // Opcional, ya que no se usa para la predicción
}

export interface PredictionResponse {
  probabilidad: number;
  prediction: ReactNode;
  probabilidad_bajo_riesgo: number;
  probabilidad_alto_riesgo: number;
  prediccion_texto: string;
  top_factores_aumentan_riesgo: Record<string, number>;
  top_factores_disminuyen_riesgo: Record<string, number>;
}
