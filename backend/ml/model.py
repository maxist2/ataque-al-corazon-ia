import os
from typing import Tuple, Dict, Any
import pandas as pd
import numpy as np
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from joblib import dump, load

DATASET_PATH = os.path.join(os.path.dirname(__file__), "..", "database", "ataque al corazon.csv")
MODELS_DIR = os.path.join(os.path.dirname(__file__), "..", "models")
TREE_MODEL_PATH = os.path.join(MODELS_DIR, "decision_tree.joblib")
FOREST_MODEL_PATH = os.path.join(MODELS_DIR, "random_forest.joblib")

def _ensure_models_dir() -> None:
    os.makedirs(MODELS_DIR, exist_ok=True)

def _split_bp(bp: str) -> Tuple[float, float]:
    try:
        s, d = bp.split("/")
        return float(s), float(d)
    except Exception:
        return np.nan, np.nan

def _prepare_dataframe(df: pd.DataFrame) -> pd.DataFrame:
    systolic, diastolic = zip(*df["Blood Pressure"].astype(str).map(_split_bp))
    df = df.copy()
    df["Systolic"] = np.array(systolic)
    df["Diastolic"] = np.array(diastolic)
    return df

def _load_raw() -> pd.DataFrame:
    return pd.read_csv(DATASET_PATH)

def _feature_columns() -> Tuple[list, list, str]:
    categorical = [
        "Sex",
        "Diet",
        "Country",
        "Continent",
        "Hemisphere",
    ]
    numeric = [
        "Age",
        "Cholesterol",
        "Heart Rate",
        "Diabetes",
        "Family History",
        "Smoking",
        "Obesity",
        "Alcohol Consumption",
        "Exercise Hours Per Week",
        "Previous Heart Problems",
        "Medication Use",
        "Stress Level",
        "Sedentary Hours Per Day",
        "Income",
        "BMI",
        "Triglycerides",
        "Physical Activity Days Per Week",
        "Sleep Hours Per Day",
        "Systolic",
        "Diastolic",
    ]
    target = "Heart Attack Risk"
    return categorical, numeric, target

def _build_preprocessor(categorical: list, numeric: list) -> ColumnTransformer:
    ohe = OneHotEncoder(handle_unknown="ignore")
    return ColumnTransformer(
        transformers=[
            ("cat", ohe, categorical),
            ("num", "passthrough", numeric),
        ]
    )

def train_models() -> Dict[str, Pipeline]:
    _ensure_models_dir()
    df = _prepare_dataframe(_load_raw())
    categorical, numeric, target = _feature_columns()
    X = df[categorical + numeric]
    y = df[target].astype(int)
    pre = _build_preprocessor(categorical, numeric)
    tree = Pipeline(steps=[("pre", pre), ("clf", DecisionTreeClassifier(random_state=42))])
    forest = Pipeline(steps=[("pre", pre), ("clf", RandomForestClassifier(n_estimators=200, random_state=42))])
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)
    tree.fit(X_train, y_train)
    forest.fit(X_train, y_train)
    dump(tree, TREE_MODEL_PATH)
    dump(forest, FOREST_MODEL_PATH)
    return {"tree": tree, "forest": forest}

def load_models() -> Dict[str, Pipeline]:
    models: Dict[str, Pipeline] = {}
    if os.path.exists(TREE_MODEL_PATH):
        models["tree"] = load(TREE_MODEL_PATH)
    if os.path.exists(FOREST_MODEL_PATH):
        models["forest"] = load(FOREST_MODEL_PATH)
    return models

def _patient_to_df(payload: Dict[str, Any]) -> pd.DataFrame:
    bp = str(payload.get("Blood_Pressure", ""))
    s, d = _split_bp(bp)
    row = {
        "Age": payload.get("Age"),
        "Sex": payload.get("Sex"),
        "Cholesterol": payload.get("Cholesterol"),
        "Blood Pressure": bp,
        "Heart Rate": payload.get("Heart_Rate"),
        "Diabetes": int(payload.get("Diabetes")) if isinstance(payload.get("Diabetes"), bool) else payload.get("Diabetes"),
        "Family History": int(payload.get("Family_History")) if isinstance(payload.get("Family_History"), bool) else payload.get("Family_History"),
        "Smoking": int(payload.get("Smoking")) if isinstance(payload.get("Smoking"), bool) else payload.get("Smoking"),
        "Obesity": int(payload.get("Obesity")) if isinstance(payload.get("Obesity"), bool) else payload.get("Obesity"),
        "Alcohol Consumption": int(payload.get("Alcohol_Consumption")) if isinstance(payload.get("Alcohol_Consumption"), bool) else payload.get("Alcohol_Consumption"),
        "Exercise Hours Per Week": payload.get("Exercise_Hours_Per_Week"),
        "Diet": payload.get("Diet"),
        "Previous Heart Problems": int(payload.get("Previous_Heart_Problems")) if isinstance(payload.get("Previous_Heart_Problems"), bool) else payload.get("Previous_Heart_Problems"),
        "Medication Use": int(payload.get("Medication_Use")) if isinstance(payload.get("Medication_Use"), bool) else payload.get("Medication_Use"),
        "Stress Level": payload.get("Stress_Level"),
        "Sedentary Hours Per Day": payload.get("Sedentary_Hours_Per_Day"),
        "Income": payload.get("Income"),
        "BMI": payload.get("BMI"),
        "Triglycerides": payload.get("Triglycerides"),
        "Physical Activity Days Per Week": payload.get("Physical_Activity_Days_Per_Week"),
        "Sleep Hours Per Day": payload.get("Sleep_Hours_Per_Day"),
        "Country": payload.get("Country"),
        "Continent": payload.get("Continent"),
        "Hemisphere": payload.get("Hemisphere"),
        "Systolic": s,
        "Diastolic": d,
    }
    df = pd.DataFrame([row])
    return df

def predict(payload: Dict[str, Any], models: Dict[str, Pipeline], model: str = "forest") -> int:
    df = _patient_to_df(payload)
    categorical, numeric, _ = _feature_columns()
    X = df[categorical + numeric]
    m = models.get(model)
    if m is None:
        raise ValueError("Modelo no disponible")
    pred = m.predict(X)
    return int(pred[0])
