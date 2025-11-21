import { useState } from "react";
import "./App.css";
import { predictHeartAttack } from "./services/api";
import type { PatientData, PredictionResponse } from "./interfaces/interface";
import {
  Alert,
  Button,
  Card,
  Col,
  Form,
  InputGroup,
  Row,
} from "react-bootstrap";
import PredictionResults from "./components/PredictionResults";

function App() {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [age, setAge] = useState<number>(0);
  const [sex, setSex] = useState<boolean>(false); // true for Male, false for Female
  const [cholesterol, setCholesterol] = useState<number>(0);
  const [bloodPressure, setBloodPressure] = useState<string>("");
  const [heartRate, setHeartRate] = useState<number>(0);
  const [diabetes, setDiabetes] = useState<boolean>(false);
  const [familyHistory, setFamilyHistory] = useState<boolean>(false);
  const [smoking, setSmoking] = useState<boolean>(false);
  const [obesity, setObesity] = useState<boolean>(false);
  const [alcoholConsumption, setAlcoholConsumption] = useState<boolean>(false);
  const [exerciseHoursWeek, setExerciseHoursWeek] = useState<number>(0);
  const [diet, setDiet] = useState<string>("");
  const [previousHeartProblems, setPreviousHeartProblems] =
    useState<boolean>(false);
  const [medicationUse, setMedicationUse] = useState<boolean>(false);
  const [stressLevel, setStressLevel] = useState<number>(0);
  const [sedentaryHoursDay, setSedentaryHoursDay] = useState<number>(0);
  const [income, setIncome] = useState<number>(0);
  const [bmi, setBmi] = useState<number>(0);
  const [weight, setWeight] = useState<number>(0);
  const [height, setHeight] = useState<number>(1.5);
  const [triglycerides, setTriglycerides] = useState<number>(0);
  const [physicalActivityDaysWeek, setPhysicalActivityDaysWeek] =
    useState<number>(0);
  const [sleepHoursDay, setSleepHoursDay] = useState<number>(0);
  const [country, setCountry] = useState<string>("");
  const [continent, setContinent] = useState<string>("");
  const [hemisphere, setHemisphere] = useState<string>("");
  const [healthcareExpenses, setHealthcareExpenses] = useState<number>(0);
  const [medicalHistory, setMedicalHistory] = useState<string>("");
  const [dietaryHabits, setDietaryHabits] = useState<string>("");
  const [ethnicity, setEthnicity] = useState<string>("");
  const [educationLevel, setEducationLevel] = useState<string>("");
  const [socioeconomicStatus, setSocioeconomicStatus] = useState<string>("");
  const [insuranceProvider, setInsuranceProvider] = useState<string>("");

  const [predictionResult, setPredictionResult] =
    useState<PredictionResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [loading, setLoading] = useState<boolean>(false);

  const calcularImc = (p: number, a: number) => {
    if (p > 0 && a > 0) {
      const valor = p / (a * a);
      setBmi(Number(valor.toFixed(1)));
    } else {
      setBmi(0);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setPredictionResult(null);

    const patientData: PatientData = {
      Age: age,
      Sex: sex ? "Male" : "Female",
      Cholesterol: cholesterol,
      "First Name": firstName,
      "Last Name": lastName,
      "Blood Pressure": bloodPressure,
      "Heart Rate": heartRate,
      Diabetes: diabetes ? "Yes" : "No",
      "Family History": familyHistory ? "Yes" : "No",
      Smoking: smoking ? "Yes" : "No",
      Obesity: obesity ? "Yes" : "No",
      "Alcohol Consumption": alcoholConsumption ? "Yes" : "No",
      "Exercise Hours/Week": exerciseHoursWeek,
      Diet: diet,
      "Previous Heart Problems": previousHeartProblems ? "Yes" : "No",
      "Medication Use": medicationUse ? "Yes" : "No",
      "Stress Level": stressLevel,
      "Sedentary Hours/Day": sedentaryHoursDay,
      Income: income,
      BMI: bmi,
      Triglycerides: triglycerides,
      "Physical Activity Days/Week": physicalActivityDaysWeek,
      "Sleep Hours/Day": sleepHoursDay,
      Country: country,
      Continent: continent,
      Hemisphere: hemisphere,
      "Healthcare Expenses": healthcareExpenses,
      "Medical History": medicalHistory,
      "Dietary Habits": dietaryHabits,
      Ethnicity: ethnicity,
      "Education Level": educationLevel,
      "Socioeconomic Status": socioeconomicStatus,
      "Insurance Provider": insuranceProvider,
    };

    try {
      const result = await predictHeartAttack(patientData);
      setPredictionResult(result);
    } catch (err) {
      setError("Error al obtener la predicción. Inténtalo de nuevo.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="App">
        <div className="m-5 mt-3">
          <h1>Predicción de Ataque al Corazón</h1>
          <br />

          <Form>
            <h4 className="mt-3">Información del paciente</h4>
            <Row>
              <Form.Group as={Col} controlId="form-group-name">
                <InputGroup className="mb-3">
                  <InputGroup.Text>nombre</InputGroup.Text>
                  <Form.Control
                    aria-label="First name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <Form.Control
                    aria-label="Last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group as={Col} controlId="form-group-age">
                <InputGroup>
                  <InputGroup.Text as="label" htmlFor="edad">
                    Edad
                  </InputGroup.Text>
                  <Form.Control
                    type="number"
                    placeholder="Ingrese su edad"
                    id="edad"
                    value={age}
                    onChange={(e) => setAge(Number(e.target.value))}
                  />
                </InputGroup>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} controlId="form-group-country">
                <InputGroup className="mb-3">
                  <InputGroup.Text as="label" htmlFor="country">
                    País
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Ingrese su país"
                    id="country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group as={Col} controlId="form-group-continent">
                <InputGroup className="mb-3">
                  <InputGroup.Text as="label" htmlFor="continent">
                    Continente
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Ingrese su continente"
                    id="continent"
                    value={continent}
                    onChange={(e) => setContinent(e.target.value)}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group as={Col} controlId="form-group-hemisphere">
                <InputGroup className="mb-3">
                  <InputGroup.Text as="label" htmlFor="hemisphere">
                    Hemisferio
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Ingrese su hemisferio"
                    id="hemisphere"
                    value={hemisphere}
                    onChange={(e) => setHemisphere(e.target.value)}
                  />
                </InputGroup>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} controlId="form-group-ethnicity">
                <InputGroup className="mb-3">
                  <InputGroup.Text as="label" htmlFor="ethnicity">
                    Etnia
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Ingrese su etnia"
                    id="ethnicity"
                    value={ethnicity}
                    onChange={(e) => setEthnicity(e.target.value)}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group as={Col} controlId="form-group-education-level">
                <InputGroup className="mb-3">
                  <InputGroup.Text as="label" htmlFor="education-level">
                    Nivel Educativo
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Ingrese su nivel educativo"
                    id="education-level"
                    value={educationLevel}
                    onChange={(e) => setEducationLevel(e.target.value)}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group as={Col} controlId="form-group-socioeconomic-status">
                <InputGroup className="mb-3">
                  <InputGroup.Text as="label" htmlFor="socioeconomic-status">
                    Estatus Socioeconómico
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Ingrese su estatus socioeconómico"
                    id="socioeconomic-status"
                    value={socioeconomicStatus}
                    onChange={(e) => setSocioeconomicStatus(e.target.value)}
                  />
                </InputGroup>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} controlId="form-group-insurance-provider">
                <InputGroup className="mb-3">
                  <InputGroup.Text as="label" htmlFor="insurance-provider">
                    Proveedor de Seguros
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Ingrese su proveedor de seguros"
                    id="insurance-provider"
                    value={insuranceProvider}
                    onChange={(e) => setInsuranceProvider(e.target.value)}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group as={Col} controlId="form-group-income">
                <InputGroup className="mb-3">
                  <InputGroup.Text as="label" htmlFor="income">
                    Ingresos
                  </InputGroup.Text>
                  <Form.Control
                    type="number"
                    placeholder="Ingrese sus ingresos"
                    id="income"
                    value={income}
                    onChange={(e) => setIncome(Number(e.target.value))}
                  />
                </InputGroup>
              </Form.Group>
            </Row>

            <h4 className="mt-4">Ficha biológica</h4>
            <Row>
              <Col xs={6}>
                <Row>
                  <Form.Group as={Col} controlId="form-group-blood-pressure">
                    <InputGroup className="mb-3">
                      <InputGroup.Text as="label" htmlFor="blood-pressure">
                        Presión Sanguínea
                      </InputGroup.Text>
                      <Form.Control
                        type="number"
                        placeholder="Sistólica"
                        id="blood-pressure-systolic"
                        value={bloodPressure.split("/")[0] || ""}
                        onChange={(e) =>
                          setBloodPressure(
                            `${e.target.value}/${
                              bloodPressure.split("/")[1] || ""
                            }`
                          )
                        }
                      />
                      <Form.Control
                        type="number"
                        placeholder="Diastólica"
                        id="blood-pressure-diastolic"
                        value={bloodPressure.split("/")[1] || ""}
                        onChange={(e) =>
                          setBloodPressure(
                            `${bloodPressure.split("/")[0] || ""}/${
                              e.target.value
                            }`
                          )
                        }
                      />
                    </InputGroup>
                  </Form.Group>{" "}
                </Row>
                <Row>
                  <Form.Group as={Col} controlId="form-group-heart-rate">
                    <InputGroup className="mb-3">
                      <InputGroup.Text as="label" htmlFor="heart-rate">
                        Ritmo Cardíaco
                      </InputGroup.Text>
                      <Form.Control
                        type="number"
                        placeholder="Ingrese su ritmo cardíaco"
                        id="heart-rate"
                        value={heartRate}
                        onChange={(e) => setHeartRate(Number(e.target.value))}
                      />
                    </InputGroup>
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group as={Col} controlId="form-group-cholesterol">
                    <InputGroup className="mb-3">
                      <InputGroup.Text as="label" htmlFor="cholesterol">
                        Colesterol
                      </InputGroup.Text>
                      <Form.Control
                        type="number"
                        placeholder="Ingrese su colesterol"
                        id="cholesterol"
                        value={cholesterol}
                        onChange={(e) => setCholesterol(Number(e.target.value))}
                      />
                    </InputGroup>
                  </Form.Group>

                  <Form.Group as={Col} controlId="form-group-triglycerides">
                    <InputGroup className="mb-3">
                      <InputGroup.Text as="label" htmlFor="triglycerides">
                        Triglicéridos
                      </InputGroup.Text>
                      <Form.Control
                        type="number"
                        placeholder="Ingrese sus triglicéridos"
                        id="triglycerides"
                        value={triglycerides}
                        onChange={(e) =>
                          setTriglycerides(Number(e.target.value))
                        }
                      />
                    </InputGroup>
                  </Form.Group>
                </Row>
                <Form.Group as={Col} controlId="form-group-bmi">
                  <InputGroup className="mb-3">
                    <InputGroup.Text>IMC</InputGroup.Text>
                    <Form.Control
                      aria-label="peso"
                      type="number"
                      step="0.1"
                      value={weight}
                      placeholder="Ingrese su peso"
                      onChange={(e) => {
                        const v = Number(e.target.value);
                        setWeight(v);
                        calcularImc(v, height);
                      }}
                    />
                    <InputGroup.Text>kg</InputGroup.Text>
                    <Form.Control
                      aria-label="altura"
                      type="number"
                      step="0.01"
                      value={height}
                      placeholder="Ingrese su altura"
                      onChange={(e) => {
                        const v = Number(e.target.value);
                        setHeight(v);
                        calcularImc(weight, v);
                      }}
                    />
                    <InputGroup.Text>m</InputGroup.Text>
                    <InputGroup.Text>IMC</InputGroup.Text>
                    <Form.Control
                      aria-label="imc"
                      type="number"
                      step="0.1"
                      value={bmi}
                      readOnly
                    />
                  </InputGroup>
                </Form.Group>
              </Col>
              <Col>
                <Row>
                  <Form.Group as={Col} controlId="form-group-sex">
                    <InputGroup>
                      <InputGroup.Text as="label" htmlFor="sexo">
                        Sexo
                      </InputGroup.Text>
                      <InputGroup.Text>
                        <Form.Check
                          type="switch"
                          label={sex ? "Masculino" : "Femenino"}
                          className="user-select-none"
                          id="sexo"
                          checked={sex}
                          onChange={(e) => setSex(e.target.checked)}
                        />
                      </InputGroup.Text>
                    </InputGroup>
                  </Form.Group>
                  <Form.Group as={Col} controlId="form-group-diabetes">
                    <InputGroup className="mb-3">
                      <InputGroup.Text as="label" htmlFor="diabetes">
                        Diabetes
                      </InputGroup.Text>
                      <InputGroup.Text>
                        <Form.Check
                          type="switch"
                          label={diabetes ? "Sí" : "No"}
                          className="user-select-none"
                          id="diabetes"
                          checked={diabetes}
                          onChange={(e) => setDiabetes(e.target.checked)}
                        />
                      </InputGroup.Text>
                    </InputGroup>
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group as={Col} controlId="form-group-obesity">
                    <InputGroup className="mb-3">
                      <InputGroup.Text as="label" htmlFor="obesity">
                        Obesidad
                      </InputGroup.Text>
                      <InputGroup.Text>
                        <Form.Check
                          type="switch"
                          label={obesity ? "Sí" : "No"}
                          className="user-select-none"
                          id="obesity"
                          checked={obesity}
                          onChange={(e) => setObesity(e.target.checked)}
                        />
                      </InputGroup.Text>
                    </InputGroup>
                  </Form.Group>

                  <Form.Group as={Col} controlId="form-group-family-history">
                    <InputGroup className="mb-3">
                      <InputGroup.Text as="label" htmlFor="family-history">
                        Historial Familiar
                      </InputGroup.Text>
                      <InputGroup.Text>
                        <Form.Check
                          type="switch"
                          label={familyHistory ? "Sí" : "No"}
                          className="user-select-none"
                          id="family-history"
                          checked={familyHistory}
                          onChange={(e) => setFamilyHistory(e.target.checked)}
                        />
                      </InputGroup.Text>
                    </InputGroup>
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group
                    as={Col}
                    controlId="form-group-previous-heart-problems"
                  >
                    <InputGroup className="mb-3">
                      <InputGroup.Text
                        as="label"
                        htmlFor="previous-heart-problems"
                      >
                        Problemas Cardíacos Previos
                      </InputGroup.Text>
                      <InputGroup.Text>
                        <Form.Check
                          type="switch"
                          label={previousHeartProblems ? "Sí" : "No"}
                          className="user-select-none"
                          id="previous-heart-problems"
                          checked={previousHeartProblems}
                          onChange={(e) =>
                            setPreviousHeartProblems(e.target.checked)
                          }
                        />
                      </InputGroup.Text>
                    </InputGroup>
                  </Form.Group>
                  <Form.Group as={Col} controlId="form-group-medication-use">
                    <InputGroup className="mb-3">
                      <InputGroup.Text as="label" htmlFor="medication-use">
                        Uso de Medicamentos
                      </InputGroup.Text>
                      <InputGroup.Text>
                        <Form.Check
                          type="switch"
                          label={medicationUse ? "Sí" : "No"}
                          className="user-select-none"
                          id="medication-use"
                          checked={medicationUse}
                          onChange={(e) => setMedicationUse(e.target.checked)}
                        />
                      </InputGroup.Text>
                    </InputGroup>
                  </Form.Group>
                </Row>
              </Col>
            </Row>
            <h4 className="mt-4">Hábitos y estilo de vida</h4>
            <Row>
              <Col style={{ minWidth: "fit-content" }} xs={3}>
                <Row>
                  <Form.Group as={Col} controlId="form-group-smoking">
                    <InputGroup className="mb-3">
                      <InputGroup.Text as="label" htmlFor="smoking">
                        Fumador
                      </InputGroup.Text>
                      <InputGroup.Text>
                        <Form.Check
                          type="switch"
                          label={smoking ? "Sí" : "No"}
                          className="user-select-none"
                          id="smoking"
                          checked={smoking}
                          onChange={(e) => setSmoking(e.target.checked)}
                        />
                      </InputGroup.Text>
                    </InputGroup>
                  </Form.Group>
                  <Form.Group
                    as={Col}
                    controlId="form-group-alcohol-consumption"
                  >
                    <InputGroup className="mb-3">
                      <InputGroup.Text as="label" htmlFor="alcohol-consumption">
                        Consumo de Alcohol
                      </InputGroup.Text>
                      <InputGroup.Text>
                        <Form.Check
                          type="switch"
                          label={alcoholConsumption ? "Sí" : "No"}
                          className="user-select-none"
                          id="alcohol-consumption"
                          checked={alcoholConsumption}
                          onChange={(e) =>
                            setAlcoholConsumption(e.target.checked)
                          }
                        />
                      </InputGroup.Text>
                    </InputGroup>
                  </Form.Group>
                </Row>
              </Col>
              <Form.Group as={Col} controlId="form-group-diet">
                <InputGroup className="mb-3">
                  <InputGroup.Text as="label" htmlFor="diet">
                    Dieta
                  </InputGroup.Text>
                  <Form.Select
                    id="diet"
                    value={diet}
                    onChange={(e) => setDiet(e.target.value)}
                  >
                    <option value="">Seleccione...</option>
                    <option value="Healthy">Saludable</option>
                    <option value="Average">Normal</option>
                    <option value="Unhealthy">No Saludable</option>
                  </Form.Select>
                </InputGroup>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} controlId="form-group-exercise-hours-week">
                <InputGroup className="mb-3">
                  <InputGroup.Text as="label" htmlFor="exercise-hours-week">
                    Horas de Ejercicio/Semana
                  </InputGroup.Text>
                  <Form.Control
                    type="number"
                    step="0.1"
                    placeholder="Ingrese horas de ejercicio"
                    id="exercise-hours-week"
                    value={exerciseHoursWeek}
                    onChange={(e) =>
                      setExerciseHoursWeek(Number(e.target.value))
                    }
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group
                as={Col}
                controlId="form-group-physical-activity-days-week"
              >
                <InputGroup className="mb-3">
                  <InputGroup.Text
                    as="label"
                    htmlFor="physical-activity-days-week"
                  >
                    Días de Actividad Física/Semana
                  </InputGroup.Text>
                  <Form.Control
                    type="number"
                    placeholder="Ingrese días de actividad física"
                    id="physical-activity-days-week"
                    value={physicalActivityDaysWeek}
                    onChange={(e) =>
                      setPhysicalActivityDaysWeek(Number(e.target.value))
                    }
                  />
                </InputGroup>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} controlId="form-group-sedentary-hours-day">
                <InputGroup className="mb-3">
                  <InputGroup.Text as="label" htmlFor="sedentary-hours-day">
                    Horas Sedentarias/Día
                  </InputGroup.Text>
                  <Form.Control
                    type="number"
                    step="0.1"
                    placeholder="Ingrese horas sedentarias"
                    id="sedentary-hours-day"
                    value={sedentaryHoursDay}
                    onChange={(e) =>
                      setSedentaryHoursDay(Number(e.target.value))
                    }
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group as={Col} controlId="form-group-sleep-hours-day">
                <InputGroup className="mb-3">
                  <InputGroup.Text as="label" htmlFor="sleep-hours-day">
                    Horas de Sueño/Día
                  </InputGroup.Text>
                  <Form.Control
                    type="number"
                    step="0.1"
                    placeholder="Ingrese horas de sueño"
                    id="sleep-hours-day"
                    value={sleepHoursDay}
                    onChange={(e) => setSleepHoursDay(Number(e.target.value))}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group as={Col} controlId="form-group-stress-level">
                <InputGroup className="mb-3">
                  <InputGroup.Text as="label" htmlFor="stress-level">
                    Nivel de Estrés
                  </InputGroup.Text>
                  <Form.Control
                    type="number"
                    placeholder="Ingrese nivel de estrés (1-10)"
                    id="stress-level"
                    value={stressLevel}
                    onChange={(e) => setStressLevel(Number(e.target.value))}
                  />
                </InputGroup>
              </Form.Group>
            </Row>

            <h4 className="mt-4">Contexto médico y económico</h4>
            <Row>
              <Form.Group as={Col} controlId="form-group-medical-history">
                <InputGroup className="mb-3">
                  <InputGroup.Text as="label" htmlFor="medical-history">
                    Historial Médico
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Ingrese su historial médico"
                    id="medical-history"
                    value={medicalHistory}
                    onChange={(e) => setMedicalHistory(e.target.value)}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group as={Col} controlId="form-group-dietary-habits">
                <InputGroup className="mb-3">
                  <InputGroup.Text as="label" htmlFor="dietary-habits">
                    Hábitos Dietéticos
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Ingrese sus hábitos dietéticos"
                    id="dietary-habits"
                    value={dietaryHabits}
                    onChange={(e) => setDietaryHabits(e.target.value)}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group as={Col} controlId="form-group-healthcare-expenses">
                <InputGroup className="mb-3">
                  <InputGroup.Text as="label" htmlFor="healthcare-expenses">
                    Gastos de Salud
                  </InputGroup.Text>
                  <Form.Control
                    type="number"
                    placeholder="Ingrese sus gastos de salud"
                    id="healthcare-expenses"
                    value={healthcareExpenses}
                    onChange={(e) =>
                      setHealthcareExpenses(Number(e.target.value))
                    }
                  />
                </InputGroup>
              </Form.Group>
            </Row>

            <Button
              variant="primary"
              onClick={handleSubmit}
              disabled={loading}
              className="mt-3"
            >
              {loading ? "Cargando..." : "Predecir Ataque Cardíaco"}
            </Button>

            {error && (
              <Alert variant="danger" className="mt-3">
                {error}
              </Alert>
            )}
          </Form>
          {loading && <Alert variant="info">Cargando predicción...</Alert>}
          {error && <Alert variant="danger">{error}</Alert>}

          {predictionResult && (
            <Row className="mt-4">
              <Col xs={6}>
                <Card>
                  <Card.Header>Resultados de la Predicción:</Card.Header>
                  <Card.Body>
                    <p>
                      <strong>Predicción:</strong>{" "}
                      {predictionResult.prediccion_texto}
                    </p>
                    <p>
                      <strong>Probabilidad de Bajo Riesgo:</strong>{" "}
                      {predictionResult.probabilidad_bajo_riesgo}%
                    </p>
                    <p>
                      <strong>Probabilidad de Alto Riesgo:</strong>{" "}
                      {predictionResult.probabilidad_alto_riesgo}%
                    </p>
                  </Card.Body>
                </Card>
              </Col>
              <Col xs={3}>
                <Card className="h-100">
                  <Card.Header>Factores que Aumentan el Riesgo:</Card.Header>
                  <Card.Body className="justify-content-center align-items-center d-flex fs-5">
                    <ul>
                      {Object.entries(
                        predictionResult.top_factores_aumentan_riesgo
                      ).map(([factor, peso]) => (
                        <li key={factor}>
                          {factor}: {(peso * 100).toFixed(2)}
                        </li>
                      ))}
                    </ul>{" "}
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card className="h-100">
                  <Card.Header>Factores que Disminuyen el Riesgo:</Card.Header>
                  <Card.Body className="justify-content-center align-items-center d-flex fs-5">
                    <ul>
                      {Object.entries(
                        predictionResult.top_factores_disminuyen_riesgo
                      ).map(([factor, peso]) => (
                        <li key={factor}>
                          {factor}: {(peso * 100).toFixed(2)}
                        </li>
                      ))}
                    </ul>{" "}
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
