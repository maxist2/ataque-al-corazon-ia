import pandas as pd
from sklearn.preprocessing import StandardScaler
import os
import joblib
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


def predict_heart_attack_risk(new_df):
    # Validar que new_df es un DataFrame de pandas
    if not isinstance(new_df, pd.DataFrame):
        raise TypeError("El input debe ser un DataFrame de pandas")
    # Preprocesar los datos nuevos
    processed_data = preprocess_new_data(new_df)
    # Realizar la predicción con el modelo cargado
    probabilities = loaded_model.predict_proba(processed_data)
    # Devolver las probabilidades de cada clase
    return probabilities[0]


# ============================
# Cargar modelo y scaler
# ============================

model_path = os.path.join(os.path.dirname(__file__), "modelo_logistico_heart.pkl")
scaler_path = os.path.join(os.path.dirname(__file__), "scaler.pkl")

loaded_model = joblib.load(model_path)
loaded_scaler = joblib.load(scaler_path)

# Columnas a eliminar (deben ser las mismas que en el entrenamiento)
cols_a_eliminar = ["Patient ID", "Country", "Continent", "Hemisphere", "Income"]

# Columnas categóricas (deben ser las mismas que en el entrenamiento)
GLOBAL_CATEGORICAL_COLS = [
    "Sex",
    "Diabetes",
    "Family History",
    "Smoking",
    "Obesity",
    "Alcohol Consumption",
    "Diet",
    "Previous Heart Problems",
    "Medication Use",
    "Medical History",
    "Dietary Habits",
    "Ethnicity",
    "Education Level",
    "Socioeconomic Status",
    "Insurance Provider",
]

# Medias de las columnas numéricas para imputación (deben ser las mismas que en el entrenamiento)
# Esto debería cargarse de un archivo o ser parte del modelo/scaler guardado
GLOBAL_MEANS = pd.Series(
    {
        "Age": 53.707977,
        "Cholesterol": 259.877211,
        "Heart Rate": 75.021682,
        "Diabetes": 0.652288,
        "Family History": 0.492982,
        "Smoking": 0.896839,
        "Obesity": 0.501426,
        "Alcohol Consumption": 0.598083,
        "Exercise Hours Per Week": 10.014284,
        "Previous Heart Problems": 0.495835,
        "Medication Use": 0.498345,
        "Stress Level": 5.469702,
        "Sedentary Hours Per Day": 5.993690,
        "BMI": 28.891446,
        "Triglycerides": 417.677051,
        "Physical Activity Days Per Week": 3.489672,
        "Sleep Hours Per Day": 7.023508,
        "BP_Systolic": 135.075659,
        "BP_Diastolic": 85.156111,
        "Sex_Male": 0.697364,
        "Diet_Healthy": 0.337784,
        "Diet_Unhealthy": 0.329910,
    }
)

# Nombres de las columnas después del preprocesamiento en el entrenamiento
# Esto es crucial para asegurar el orden correcto de las columnas en los nuevos datos
GLOBAL_TRAINING_COLUMNS = pd.Index(
    [
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
        "BMI",
        "Triglycerides",
        "Physical Activity Days Per Week",
        "Sleep Hours Per Day",
        "BP_Systolic",
        "BP_Diastolic",
        "Sex_Male",
        "Diet_Healthy",
        "Diet_Unhealthy",
    ],
    dtype="object",
)

FACTOR_TRANSLATIONS = {
    "Age": "Edad",
    "Cholesterol": "Colesterol",
    "Heart Rate": "Ritmo Cardíaco",
    "Diabetes": "Diabetes",
    "Family History": "Historial Familiar",
    "Smoking": "Fumar",
    "Obesity": "Obesidad",
    "Alcohol Consumption": "Consumo de Alcohol",
    "Exercise Hours Per Week": "Horas de Ejercicio por Semana",
    "Previous Heart Problems": "Problemas Cardíacos Previos",
    "Medication Use": "Uso de Medicamentos",
    "Stress Level": "Nivel de Estrés",
    "Sedentary Hours Per Day": "Horas Sedentarias por Día",
    "BMI": "IMC",
    "Triglycerides": "Triglicéridos",
    "Physical Activity Days Per Week": "Días de Actividad Física por Semana",
    "Sleep Hours Per Day": "Horas de Sueño por Día",
    "BP_Systolic": "Presión Arterial Sistólica",
    "BP_Diastolic": "Presión Arterial Diastólica",
    "Sex_Male": "Sexo Masculino",
    "Diet_Healthy": "Dieta Saludable",
    "Diet_Unhealthy": "Dieta No Saludable",
}


def split_bp(value):
    try:
        sis, dia = value.split("/")
        return float(sis), float(dia)
    except:
        return None, None


def preprocess_new_data(new_df):
    # Aplicar split_bp
    new_df["BP_Systolic"], new_df["BP_Diastolic"] = zip(
        *new_df["Blood Pressure"].map(split_bp)
    )
    new_df["BP_Systolic"] = new_df["BP_Systolic"].astype(float)
    new_df["BP_Diastolic"] = new_df["BP_Diastolic"].astype(float)
    new_df = new_df.drop(columns=["Blood Pressure"])
    # Eliminar la columna 'Heart Attack Risk' si existe, ya que es la variable objetivo
    if "Heart Attack Risk" in new_df.columns:
        new_df = new_df.drop(columns=["Heart Attack Risk"])
    # Codificación One-Hot para todas las columnas de tipo 'object' restantes
    remaining_object_cols = new_df.select_dtypes(include=["object"]).columns.tolist()
    if remaining_object_cols:
        new_df = pd.get_dummies(new_df, columns=remaining_object_cols, drop_first=True)

    # Asegurarse de que todas las columnas del entrenamiento estén presentes, rellenando con 0 si no
    # y eliminando las columnas nuevas que no estaban en el entrenamiento
    for col in GLOBAL_TRAINING_COLUMNS:
        if col not in new_df.columns:
            new_df[col] = 0
    new_df = new_df[GLOBAL_TRAINING_COLUMNS]  # Asegurar el orden de las columnas

    # Imputar valores faltantes
    new_df = new_df.infer_objects(copy=False).fillna(GLOBAL_MEANS)

    # Escalar datos
    new_df_scaled = loaded_scaler.transform(new_df)
    return new_df_scaled


# ============================
# Ejemplo de uso de la función de predicción
# ============================


@app.route("/predict", methods=["POST"])
def predict_endpoint():
    try:
        # Obtener datos del request JSON (compatible con Axios)
        patient_data = request.get_json()
        if not patient_data:
            return jsonify({"error": "No se proporcionaron datos JSON"}), 400

        # Convertir datos a DataFrame de pandas
        new_df = pd.DataFrame([patient_data])

        # Eliminar columnas prohibidas (ignorar si no existen)
        new_df = new_df.drop(columns=cols_a_eliminar, errors="ignore")

        # Realizar predicción de probabilidades
        probabilities = predict_heart_attack_risk(new_df)
        prob_bajo_riesgo = probabilities[0] * 100
        prob_alto_riesgo = probabilities[1] * 100

        # Determinar texto de predicción
        prediccion_texto = (
            "Alto riesgo de ataque al corazón."
            if prob_alto_riesgo > prob_bajo_riesgo
            else "Bajo riesgo de ataque al corazón."
        )

        # Obtener los 3 factores más influyentes (coeficientes del modelo)
        coeficientes = pd.Series(loaded_model.coef_[0], index=GLOBAL_TRAINING_COLUMNS)

        # Traducir los nombres de los factores
        top_aumenta_riesgo_traducido = {FACTOR_TRANSLATIONS.get(k, k): v for k, v in coeficientes.nlargest(2).to_dict().items()}
        top_disminuye_riesgo_traducido = {FACTOR_TRANSLATIONS.get(k, k): v for k, v in coeficientes.nsmallest(2).to_dict().items()}

        # Preparar respuesta JSON para el frontend
        response = {
            "probabilidad_bajo_riesgo": round(prob_bajo_riesgo, 2),
            "probabilidad_alto_riesgo": round(prob_alto_riesgo, 2),
            "prediccion_texto": prediccion_texto,
            "top_factores_aumentan_riesgo": top_aumenta_riesgo_traducido,
            "top_factores_disminuyen_riesgo": top_disminuye_riesgo_traducido,
        }

        return jsonify(response), 200

    except TypeError as e:
        return jsonify({"error": f"Error de tipo: {str(e)}"}), 400
    except KeyError as e:
        return jsonify({"error": f"Columna faltante: {str(e)}"}), 400
    except Exception as e:
        return jsonify({"error": f"Error inesperado: {str(e)}"}), 500


@app.route("/feature_importances", methods=["GET"])
def get_feature_importances():
    try:
        coeficientes = pd.Series(loaded_model.coef_[0], index=GLOBAL_TRAINING_COLUMNS)
        feature_importances = coeficientes.to_dict()
        return jsonify(feature_importances), 200
    except Exception as e:
        return (
            jsonify(
                {
                    "error": f"Error al obtener la importancia de las características: {str(e)}"
                }
            ),
            500,
        )


if __name__ == "__main__":
    print("Iniciando servidor Flask en http://localhost:5000")
    app.run(debug=True, port=5000)
