export interface HeartAttackPayload {
  "Patient ID": string;
  Age: number;
  Sex: string;
  Cholesterol: number;
  "Blood Pressure": string;
  "Heart Rate": number;

  Diabetes: number;
  "Family History": number;
  Smoking: number;
  Obesity: number;
  "Alcohol Consumption": number;

  "Exercise Hours Per Week": number;
  Diet: string;
  "Previous Heart Problems": number;
  "Medication Use": number;

  "Stress Level": number;
  "Sedentary Hours Per Day": number;
  Income: number;
  BMI: number;
  Triglycerides: number;

  "Physical Activity Days Per Week": number;
  "Sleep Hours Per Day": number;
  Country: string;
  Continent: string;
  Hemisphere: string;
}

export interface PredictionResponse {
  risk: number; // 0 o 1
}

export interface ScoreResponse {
  accuracy: number;
}

export interface HealthResponse {
  status: string; // "ok"
}
