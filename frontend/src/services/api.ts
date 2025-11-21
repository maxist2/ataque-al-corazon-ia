import axios from "axios";
import type { PatientData, PredictionResponse } from "../interfaces/interface";

const api = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
});

export const predictHeartAttack = async (
  patientData: PatientData
): Promise<PredictionResponse> => {
  const response = await api.post<PredictionResponse>("/predict", patientData);
  return response.data;
};

export default api;
