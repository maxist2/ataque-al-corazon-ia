import { Alert, Spinner } from "react-bootstrap";

interface LoadingAndErrorDisplayProps {
  loading: boolean;
  error: string | null;
}

const LoadingAndErrorDisplay: React.FC<LoadingAndErrorDisplayProps> = ({
  loading,
  error,
}) => {
  return (
    <>
      {loading && (
        <div className="text-center mt-3">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Cargando...</span>
          </Spinner>
        </div>
      )}

      {error && (
        <Alert variant="danger" className="mt-3">
          {error}
        </Alert>
      )}
    </>
  );
};

export default LoadingAndErrorDisplay;