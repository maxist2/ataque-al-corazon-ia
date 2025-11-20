import pandas as pd
from sklearn.preprocessing import StandardScaler
import os
import joblib


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

loaded_model = joblib.load("modelo_logistico_heart.pkl")
loaded_scaler = joblib.load("scaler.pkl")

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

if __name__ == "__main__":
    # Crear un DataFrame con nuevos datos para la predicción
    # Asegúrate de que las columnas coincidan con las del entrenamiento original
    # (excepto 'Heart Attack Risk' y 'Blood Pressure' que se procesan)
    new_data = {
        "Patient ID": [1001],
        "Age": 80,
        "Sex": "female",
        "Cholesterol": 220,
        "Blood Pressure": "140/90",
        "Heart Rate": 75,
        "Diabetes": "No",
        "Family History": "Yes",
        "Smoking": "Yes",
        "Obesity": "No",
        "Alcohol Consumption": "Moderate",
        "Exercise Hours/Week": 3.5,
        "Diet": "Average",
        "Previous Heart Problems": "No",
        "Medication Use": "Yes",
        "Stress Level": 7,
        "Sedentary Hours/Day": 6,
        "Income": 50000,
        "BMI": 28.5,
        "Triglycerides": 180,
        "Physical Activity Days/Week": 4,
        "Sleep Hours/Day": 7,
        "Country": "USA",
        "Continent": "North America",
        "Hemisphere": "Northern",
        "Healthcare Expenses": 3000,
        "Medical History": "None",
        "Dietary Habits": "Healthy",
        "Ethnicity": "Caucasian",
        "Education Level": "University",
        "Socioeconomic Status": "Middle",
        "Insurance Provider": "Blue Cross",
        "Heart Attack Risk": 0,  # Este valor no se usa para la predicción, pero se incluye para mantener la estructura
    }
    new_df = pd.DataFrame([new_data])

    # Eliminar columnas prohibidas del nuevo DataFrame
    new_df = new_df.drop(columns=cols_a_eliminar)

    # Realizar la predicción
    try:
        probabilities = predict_heart_attack_risk(new_df)
        prob_bajo_riesgo = probabilities[0] * 100
        prob_alto_riesgo = probabilities[1] * 100

        print(
            f"\nProbabilidad de Bajo Riesgo de Ataque al Corazón: {prob_bajo_riesgo:.2f}%"
        )
        print(
            f"Probabilidad de Alto Riesgo de Ataque al Corazón: {prob_alto_riesgo:.2f}%"
        )

        if prob_alto_riesgo > prob_bajo_riesgo:
            print("Predicción: Alto riesgo de ataque al corazón.")
        else:
            print("Predicción: Bajo riesgo de ataque al corazón.")

        # Análisis de la importancia de las características
        print("\n--- Factores más influyentes en la predicción ---")
        coeficientes = pd.Series(loaded_model.coef_[0], index=GLOBAL_TRAINING_COLUMNS)

        # Características que aumentan el riesgo de ataque al corazón (coeficientes positivos)
        top_riesgo = coeficientes.nlargest(2)
        print("\nTop  factores que aumentan el riesgo de ataque al corazón:")
        for feature, coef in top_riesgo.items():
            print(f"- {feature}: {coef:.4f}")

        # Características que disminuyen el riesgo de ataque al corazón (coeficientes negativos)
        top_bajo_riesgo = coeficientes.nsmallest(2)
        print("\nTop  factores que disminuyen el riesgo de ataque al corazón:")
        for feature, coef in top_bajo_riesgo.items():
            print(f"- {feature}: {coef:.4f}")

    except TypeError as e:
        print(f"Error: {e}")
    except Exception as e:
        print(f"Ocurrió un error inesperado: {e}")
