import type { PredictionResponse } from "../interfaces/interface";

interface PredictionResultsProps {
  predictionResult: PredictionResponse | null;
}

const PredictionResults: React.FC<PredictionResultsProps> = ({
  predictionResult,
}) => {
  if (!predictionResult) {
    return null;
  }

  return (
    <div className="mt-4 p-3 border rounded">
      <h2>Resultados de la Predicción</h2>
      <p>
        <strong>Predicción:</strong> {predictionResult.prediction}
      </p>
      <p>
        <strong>Probabilidad:</strong>
        {(predictionResult.probabilidad * 100).toFixed(2)}%
      </p>
      {predictionResult.top_factores_aumentan_riesgo.length > 0 && (
        <div>
          <h4>Factores que Aumentan el Riesgo:</h4>
          <ul>
            {(
              Object.keys(
                predictionResult.top_factores_aumentan_riesgo
              ) as string[]
            ).map((factor: string, index: number) => (
              <li key={index}>{factor}</li>
            ))}
          </ul>
        </div>
      )}
      {predictionResult.top_factores_disminuyen_riesgo.length > 0 && (
        <div>
          <h4>Factores que Disminuyen el Riesgo:</h4>
          <ul>
            {(
              Object.keys(
                predictionResult.top_factores_disminuyen_riesgo
              ) as string[]
            ).map((factor: string, index: number) => (
              <li key={index}>{factor}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PredictionResults;
