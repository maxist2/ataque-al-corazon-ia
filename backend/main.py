from datetime import datetime
from fastapi import FastAPI, Query, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
from backend.ml import model as ml_model

app = FastAPI(title="Ataque al Corazón IA - Backend")

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/ping")
def ping():
    return {"message": "ok", "time": datetime.utcnow().isoformat() + "Z"}


class PatientInput(BaseModel):
    Patient_ID: Optional[str] = None
    Age: int
    Sex: str
    Cholesterol: float
    Blood_Pressure: str
    Heart_Rate: float
    Diabetes: bool
    Family_History: bool
    Smoking: bool
    Obesity: bool
    Alcohol_Consumption: bool
    Exercise_Hours_Per_Week: float
    Diet: str
    Previous_Heart_Problems: bool
    Medication_Use: bool
    Stress_Level: int
    Sedentary_Hours_Per_Day: float
    Income: float
    BMI: float
    Triglycerides: float
    Physical_Activity_Days_Per_Week: int
    Sleep_Hours_Per_Day: int
    Country: str
    Continent: str
    Hemisphere: str


models_cache: dict = {}


@app.on_event("startup")
def _startup():
    global models_cache
    models_cache = ml_model.load_models()
    if not models_cache:
        models_cache = ml_model.train_models()
        models_cache = ml_model.load_models()


@app.post("/api/train")
def train():
    try:
        ml_model.train_models()
        global models_cache
        models_cache = ml_model.load_models()
        return {"status": "ok"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/predict")
def predict(
    payload: PatientInput, model: str = Query("forest", pattern="^(forest|tree)$")
):
    try:
        pred = ml_model.predict(payload.dict(), models_cache, model=model)
        return {
            "prediction": pred,
            "risk_level": "alto" if pred == 1 else "bajo",
            "yes_no": "sí" if pred == 1 else "no",
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
