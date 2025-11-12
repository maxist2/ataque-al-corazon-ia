import { useState } from "react";
import "./App.css";
import {
  Container,
  Stack,
  Button,
  Alert,
  Form,
  Row,
  Col,
  Spinner,
} from "react-bootstrap";
import api from "./services/api";

function App() {
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    prediction: number;
    risk_level: string;
    yes_no: string;
  } | null>(null);
  const [model, setModel] = useState<"forest" | "tree">("forest");
  const [trainLoading, setTrainLoading] = useState(false);
  const numericFields = new Set([
    "Age",
    "Cholesterol",
    "Heart_Rate",
    "Exercise_Hours_Per_Week",
    "Stress_Level",
    "Sedentary_Hours_Per_Day",
    "Income",
    "BMI",
    "Triglycerides",
    "Physical_Activity_Days_Per_Week",
    "Sleep_Hours_Per_Day",
  ]);

  const booleanFields = new Set([
    "Diabetes",
    "Family_History",
    "Smoking",
    "Obesity",
    "Alcohol_Consumption",
    "Previous_Heart_Problems",
    "Medication_Use",
  ]);

  const [patient, setPatient] = useState({
    Patient_ID: "BMW7812",
    Age: 67,
    Sex: "Male",
    Cholesterol: 208,
    Blood_Pressure: "158/88",
    Heart_Rate: 72,
    Diabetes: false,
    Family_History: false,
    Smoking: true,
    Obesity: false,
    Alcohol_Consumption: false,
    Exercise_Hours_Per_Week: 4.168188835442079,
    Diet: "Average",
    Previous_Heart_Problems: false,
    Medication_Use: false,
    Stress_Level: 9,
    Sedentary_Hours_Per_Day: 6.6150014529140595,
    Income: 261404,
    BMI: 31.251232725295402,
    Triglycerides: 286,
    Physical_Activity_Days_Per_Week: 0,
    Sleep_Hours_Per_Day: 6,
    Country: "Argentina",
    Continent: "South America",
    Hemisphere: "Southern Hemisphere",
  });

  const probarConexion = async () => {
    setError(null);
    setStatus(null);
    try {
      const res = await api.get("/api/ping");
      setStatus(JSON.stringify(res.data));
    } catch (e: any) {
      setError(e?.message ?? "Error desconocido");
    }
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    const v = numericFields.has(name)
      ? value === ""
        ? ""
        : Number(value)
      : value;
    setPatient((prev) => ({ ...prev, [name]: v }));
  };

  const handleBooleanChange = (e: any) => {
    const { name, checked } = e.target;
    if (!booleanFields.has(name)) return;
    setPatient((prev) => ({ ...prev, [name]: checked }));
  };

  const enviarPrediccion = async () => {
    setError(null);
    setResult(null);
    setLoading(true);
    try {
      const res = await api.post(`/api/predict?model=${model}`, patient);
      setResult(res.data);
    } catch (e: any) {
      setError(e?.response?.data?.detail ?? e?.message ?? "Error al predecir");
    } finally {
      setLoading(false);
    }
  };

  const reentrenar = async () => {
    setError(null);
    setStatus(null);
    setTrainLoading(true);
    try {
      const res = await api.post("/api/train");
      setStatus(JSON.stringify(res.data));
    } catch (e: any) {
      setError(
        e?.response?.data?.detail ?? e?.message ?? "Error al reentrenar"
      );
    } finally {
      setTrainLoading(false);
    }
  };

  return (
    <Container className="py-4">
      <Stack gap={3}>
        <h1>Ataque al Corazón IA</h1>
        <p className="text-muted">
          Predicción de riesgo basada en IA — React + FastAPI.
        </p>
        <Button variant="secondary" onClick={probarConexion}>
          Probar conexión con backend
        </Button>
        <Button variant="warning" onClick={reentrenar} disabled={trainLoading}>
          {trainLoading ? (
            <Spinner animation="border" size="sm" />
          ) : (
            "Reentrenar modelos"
          )}
        </Button>
        {status && <Alert variant="success">Respuesta: {status}</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}
        <hr />
        <Form>
          <Row className="mb-3">
            <Col md={3}>
              <Form.Group>
                <Form.Label>Edad</Form.Label>
                <Form.Control
                  type="number"
                  name="Age"
                  value={patient.Age as number}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label>Sexo</Form.Label>
                <Form.Select
                  name="Sex"
                  value={patient.Sex as string}
                  onChange={handleChange}
                >
                  <option>Male</option>
                  <option>Female</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label>Colesterol</Form.Label>
                <Form.Control
                  type="number"
                  name="Cholesterol"
                  value={patient.Cholesterol as number}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label>Modelo</Form.Label>
                <Form.Select
                  value={model}
                  onChange={(e) =>
                    setModel(e.target.value as "forest" | "tree")
                  }
                >
                  <option value="forest">Random Forest</option>
                  <option value="tree">Decision Tree</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className="mb-3">
            <Form.Label>Presión Arterial (ej. 120/80)</Form.Label>
            <Form.Control
              type="text"
              name="Blood_Pressure"
              value={patient.Blood_Pressure as string}
              onChange={handleChange}
            />
          </Form.Group>
          <Row className="mb-3">
            <Col md={3}>
              <Form.Group>
                <Form.Label>ID Paciente</Form.Label>
                <Form.Control
                  type="text"
                  name="Patient_ID"
                  value={patient.Patient_ID as string}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label>Frecuencia Cardíaca</Form.Label>
                <Form.Control
                  type="number"
                  name="Heart_Rate"
                  value={patient.Heart_Rate as number}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label>Diabetes</Form.Label>
                <Form.Check
                  type="switch"
                  name="Diabetes"
                  checked={patient.Diabetes as boolean}
                  onChange={handleBooleanChange}
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label>Antecedentes Familiares</Form.Label>
                <Form.Check
                  type="switch"
                  name="Family_History"
                  checked={patient.Family_History as boolean}
                  onChange={handleBooleanChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={3}>
              <Form.Group>
                <Form.Label>Tabaquismo</Form.Label>
                <Form.Check
                  type="switch"
                  name="Smoking"
                  checked={patient.Smoking as boolean}
                  onChange={handleBooleanChange}
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label>Obesidad</Form.Label>
                <Form.Check
                  type="switch"
                  name="Obesity"
                  checked={patient.Obesity as boolean}
                  onChange={handleBooleanChange}
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label>Consumo de Alcohol</Form.Label>
                <Form.Check
                  type="switch"
                  name="Alcohol_Consumption"
                  checked={patient.Alcohol_Consumption as boolean}
                  onChange={handleBooleanChange}
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label>Horas de Ejercicio/semana</Form.Label>
                <Form.Control
                  step={0.01}
                  type="number"
                  name="Exercise_Hours_Per_Week"
                  value={patient.Exercise_Hours_Per_Week as number}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={3}>
              <Form.Group>
                <Form.Label>Dieta</Form.Label>
                <Form.Select
                  name="Diet"
                  value={patient.Diet as string}
                  onChange={handleChange}
                >
                  <option>Healthy</option>
                  <option>Average</option>
                  <option>Unhealthy</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label>Problemas Cardíacos Previos</Form.Label>
                <Form.Check
                  type="switch"
                  name="Previous_Heart_Problems"
                  checked={patient.Previous_Heart_Problems as boolean}
                  onChange={handleBooleanChange}
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label>Uso de Medicación</Form.Label>
                <Form.Check
                  type="switch"
                  name="Medication_Use"
                  checked={patient.Medication_Use as boolean}
                  onChange={handleBooleanChange}
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label>Nivel de Estrés</Form.Label>
                <Form.Control
                  type="number"
                  name="Stress_Level"
                  value={patient.Stress_Level as number}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={3}>
              <Form.Group>
                <Form.Label>Horas Sedentarias/día</Form.Label>
                <Form.Control
                  step={0.01}
                  type="number"
                  name="Sedentary_Hours_Per_Day"
                  value={patient.Sedentary_Hours_Per_Day as number}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label>Ingreso</Form.Label>
                <Form.Control
                  type="number"
                  name="Income"
                  value={patient.Income as number}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label>BMI</Form.Label>
                <Form.Control
                  step={0.01}
                  type="number"
                  name="BMI"
                  value={patient.BMI as number}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label>Triglicéridos</Form.Label>
                <Form.Control
                  type="number"
                  name="Triglycerides"
                  value={patient.Triglycerides as number}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={3}>
              <Form.Group>
                <Form.Label>Días de Actividad Física/semana</Form.Label>
                <Form.Control
                  type="number"
                  name="Physical_Activity_Days_Per_Week"
                  value={patient.Physical_Activity_Days_Per_Week as number}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label>Horas de Sueño/día</Form.Label>
                <Form.Control
                  type="number"
                  name="Sleep_Hours_Per_Day"
                  value={patient.Sleep_Hours_Per_Day as number}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label>País</Form.Label>
                <Form.Control
                  type="text"
                  name="Country"
                  value={patient.Country as string}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label>Continente</Form.Label>
                <Form.Select
                  name="Continent"
                  value={patient.Continent as string}
                  onChange={handleChange}
                >
                  <option>Asia</option>
                  <option>Europe</option>
                  <option>North America</option>
                  <option>South America</option>
                  <option>Africa</option>
                  <option>Australia</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={3}>
              <Form.Group>
                <Form.Label>Hemisferio</Form.Label>
                <Form.Select
                  name="Hemisphere"
                  value={patient.Hemisphere as string}
                  onChange={handleChange}
                >
                  <option>Northern Hemisphere</option>
                  <option>Southern Hemisphere</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Button
            variant="primary"
            onClick={enviarPrediccion}
            disabled={loading}
          >
            {loading ? (
              <Spinner animation="border" size="sm" />
            ) : (
              "Predecir riesgo"
            )}
          </Button>
        </Form>

        {result && (
          <Alert
            variant={result.prediction === 1 ? "danger" : "success"}
            className="mt-3 fw-bold"
          >
            Riesgo {result.risk_level.toUpperCase()} — respuesta:{" "}
            {result.yes_no.toUpperCase()}
          </Alert>
        )}
      </Stack>
    </Container>
  );
}

export default App;
