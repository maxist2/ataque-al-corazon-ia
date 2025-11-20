import { Col, Form, InputGroup, Button } from "react-bootstrap";

interface PredictionFormProps {
  age: number;
  setAge: (age: number) => void;
  sex: boolean;
  setSex: (sex: boolean) => void;
  cholesterol: number;
  setCholesterol: (cholesterol: number) => void;
  bloodPressure: string;
  setBloodPressure: (bloodPressure: string) => void;
  heartRate: number;
  setHeartRate: (heartRate: number) => void;
  diabetes: string;
  setDiabetes: (diabetes: string) => void;
  familyHistory: string;
  setFamilyHistory: (familyHistory: string) => void;
  smoking: string;
  setSmoking: (smoking: string) => void;
  obesity: string;
  setObesity: (obesity: string) => void;
  alcoholConsumption: string;
  setAlcoholConsumption: (alcoholConsumption: string) => void;
  exerciseHoursWeek: number;
  setExerciseHoursWeek: (exerciseHoursWeek: number) => void;
  diet: string;
  setDiet: (diet: string) => void;
  previousHeartProblems: string;
  setPreviousHeartProblems: (previousHeartProblems: string) => void;
  medicationUse: string;
  setMedicationUse: (medicationUse: string) => void;
  stressLevel: number;
  setStressLevel: (stressLevel: number) => void;
  sedentaryHoursDay: number;
  setSedentaryHoursDay: (sedentaryHoursDay: number) => void;
  income: number;
  setIncome: (income: number) => void;
  bmi: number;
  setBmi: (bmi: number) => void;
  triglycerides: number;
  setTriglycerides: (triglycerides: number) => void;
  physicalActivityDaysWeek: number;
  setPhysicalActivityDaysWeek: (physicalActivityDaysWeek: number) => void;
  sleepHoursDay: number;
  setSleepHoursDay: (sleepHoursDay: number) => void;
  country: string;
  setCountry: (country: string) => void;
  continent: string;
  setContinent: (continent: string) => void;
  hemisphere: string;
  setHemisphere: (hemisphere: string) => void;
  healthcareExpenses: number;
  setHealthcareExpenses: (healthcareExpenses: number) => void;
  medicalHistory: string;
  setMedicalHistory: (medicalHistory: string) => void;
  dietaryHabits: string;
  setDietaryHabits: (dietaryHabits: string) => void;
  ethnicity: string;
  setEthnicity: (ethnicity: string) => void;
  educationLevel: string;
  setEducationLevel: (educationLevel: string) => void;
  socioeconomicStatus: string;
  setSocioeconomicStatus: (socioeconomicStatus: string) => void;
  insuranceProvider: string;
  setInsuranceProvider: (insuranceProvider: string) => void;
  handleSubmit: () => void;
}

const PredictionForm: React.FC<PredictionFormProps> = ({
  age,
  setAge,
  sex,
  setSex,
  cholesterol,
  setCholesterol,
  bloodPressure,
  setBloodPressure,
  heartRate,
  setHeartRate,
  diabetes,
  setDiabetes,
  familyHistory,
  setFamilyHistory,
  smoking,
  setSmoking,
  obesity,
  setObesity,
  alcoholConsumption,
  setAlcoholConsumption,
  exerciseHoursWeek,
  setExerciseHoursWeek,
  diet,
  setDiet,
  previousHeartProblems,
  setPreviousHeartProblems,
  medicationUse,
  setMedicationUse,
  stressLevel,
  setStressLevel,
  sedentaryHoursDay,
  setSedentaryHoursDay,
  income,
  setIncome,
  bmi,
  setBmi,
  triglycerides,
  setTriglycerides,
  physicalActivityDaysWeek,
  setPhysicalActivityDaysWeek,
  sleepHoursDay,
  setSleepHoursDay,
  country,
  setCountry,
  continent,
  setContinent,
  hemisphere,
  setHemisphere,
  healthcareExpenses,
  setHealthcareExpenses,
  medicalHistory,
  setMedicalHistory,
  dietaryHabits,
  setDietaryHabits,
  ethnicity,
  setEthnicity,
  educationLevel,
  setEducationLevel,
  socioeconomicStatus,
  setSocioeconomicStatus,
  insuranceProvider,
  setInsuranceProvider,
  handleSubmit,
}) => {
  return (
    <Form>
      <Form.Group as={Col} controlId="form-group-id">
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
      </Form.Group>

      <Form.Group as={Col} controlId="form-group-blood-pressure">
        <InputGroup className="mb-3">
          <InputGroup.Text as="label" htmlFor="blood-pressure">
            Presión Sanguínea (Ej: 120/80)
          </InputGroup.Text>
          <Form.Control
            type="text"
            placeholder="Ingrese su presión sanguínea"
            id="blood-pressure"
            value={bloodPressure}
            onChange={(e) => setBloodPressure(e.target.value)}
          />
        </InputGroup>
      </Form.Group>

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
      <Form.Group as={Col} controlId="form-group-diabetes">
        <InputGroup className="mb-3">
          <InputGroup.Text as="label" htmlFor="diabetes">
            Diabetes
          </InputGroup.Text>
          <Form.Select
            id="diabetes"
            value={diabetes}
            onChange={(e) => setDiabetes(e.target.value)}
          >
            <option value="">Seleccione...</option>
            <option value="Yes">Sí</option>
            <option value="No">No</option>
          </Form.Select>
        </InputGroup>
      </Form.Group>

      <Form.Group as={Col} controlId="form-group-family-history">
        <InputGroup className="mb-3">
          <InputGroup.Text as="label" htmlFor="family-history">
            Historial Familiar
          </InputGroup.Text>
          <Form.Select
            id="family-history"
            value={familyHistory}
            onChange={(e) => setFamilyHistory(e.target.value)}
          >
            <option value="">Seleccione...</option>
            <option value="Yes">Sí</option>
            <option value="No">No</option>
          </Form.Select>
        </InputGroup>
      </Form.Group>

      <Form.Group as={Col} controlId="form-group-smoking">
        <InputGroup className="mb-3">
          <InputGroup.Text as="label" htmlFor="smoking">
            Fumador
          </InputGroup.Text>
          <Form.Select
            id="smoking"
            value={smoking}
            onChange={(e) => setSmoking(e.target.value)}
          >
            <option value="">Seleccione...</option>
            <option value="Yes">Sí</option>
            <option value="No">No</option>
          </Form.Select>
        </InputGroup>
      </Form.Group>

      <Form.Group as={Col} controlId="form-group-obesity">
        <InputGroup className="mb-3">
          <InputGroup.Text as="label" htmlFor="obesity">
            Obesidad
          </InputGroup.Text>
          <Form.Select
            id="obesity"
            value={obesity}
            onChange={(e) => setObesity(e.target.value)}
          >
            <option value="">Seleccione...</option>
            <option value="Yes">Sí</option>
            <option value="No">No</option>
          </Form.Select>
        </InputGroup>
      </Form.Group>

      <Form.Group as={Col} controlId="form-group-alcohol-consumption">
        <InputGroup className="mb-3">
          <InputGroup.Text as="label" htmlFor="alcohol-consumption">
            Consumo de Alcohol
          </InputGroup.Text>
          <Form.Select
            id="alcohol-consumption"
            value={alcoholConsumption}
            onChange={(e) => setAlcoholConsumption(e.target.value)}
          >
            <option value="">Seleccione...</option>
            <option value="Yes">Sí</option>
            <option value="No">No</option>
          </Form.Select>
        </InputGroup>
      </Form.Group>
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
            onChange={(e) => setExerciseHoursWeek(Number(e.target.value))}
          />
        </InputGroup>
      </Form.Group>

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

      <Form.Group as={Col} controlId="form-group-previous-heart-problems">
        <InputGroup className="mb-3">
          <InputGroup.Text as="label" htmlFor="previous-heart-problems">
            Problemas Cardíacos Previos
          </InputGroup.Text>
          <Form.Select
            id="previous-heart-problems"
            value={previousHeartProblems}
            onChange={(e) => setPreviousHeartProblems(e.target.value)}
          >
            <option value="">Seleccione...</option>
            <option value="Yes">Sí</option>
            <option value="No">No</option>
          </Form.Select>
        </InputGroup>
      </Form.Group>

      <Form.Group as={Col} controlId="form-group-medication-use">
        <InputGroup className="mb-3">
          <InputGroup.Text as="label" htmlFor="medication-use">
            Uso de Medicamentos
          </InputGroup.Text>
          <Form.Select
            id="medication-use"
            value={medicationUse}
            onChange={(e) => setMedicationUse(e.target.value)}
          >
            <option value="">Seleccione...</option>
            <option value="Yes">Sí</option>
            <option value="No">No</option>
          </Form.Select>
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
            onChange={(e) => setSedentaryHoursDay(Number(e.target.value))}
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

      <Form.Group as={Col} controlId="form-group-bmi">
        <InputGroup className="mb-3">
          <InputGroup.Text as="label" htmlFor="bmi">
            IMC
          </InputGroup.Text>
          <Form.Control
            type="number"
            step="0.1"
            placeholder="Ingrese su IMC"
            id="bmi"
            value={bmi}
            onChange={(e) => setBmi(Number(e.target.value))}
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
            onChange={(e) => setTriglycerides(Number(e.target.value))}
          />
        </InputGroup>
      </Form.Group>

      <Form.Group as={Col} controlId="form-group-physical-activity-days-week">
        <InputGroup className="mb-3">
          <InputGroup.Text as="label" htmlFor="physical-activity-days-week">
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
            onChange={(e) => setHealthcareExpenses(Number(e.target.value))}
          />
        </InputGroup>
      </Form.Group>

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

      <Button variant="primary" onClick={handleSubmit} className="mt-3">
        Predecir
      </Button>
    </Form>
  );
};

export default PredictionForm;
