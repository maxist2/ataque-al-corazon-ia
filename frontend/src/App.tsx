import { useState } from 'react'
import './App.css'
import { Container, Stack, Button, Alert, Form } from 'react-bootstrap'
import api from './services/api'

function App() {
  const [status, setStatus] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const probarConexion = async () => {
    setError(null)
    setStatus(null)
    try {
      const res = await api.get('/api/ping')
      setStatus(JSON.stringify(res.data))
    } catch (e: any) {
      setError(e?.message ?? 'Error desconocido')
    }
  }

  return (
    <Container className="py-4">
      <Stack gap={3}>
        <h1>Ataque al Corazón IA</h1>
        <p className="text-muted">Frontend en React + TS con React Bootstrap.</p>
        <Button variant="primary" onClick={probarConexion}>
          Probar conexión con backend
        </Button>
        {status && <Alert variant="success">Respuesta: {status}</Alert>}
        {error && <Alert variant="danger">Error: {error}</Alert>}
        <hr />
        <Form>
          <Form.Group>
            <Form.Label>Ejemplo de campo</Form.Label>
            <Form.Control placeholder="Pendiente de requerimientos" />
          </Form.Group>
        </Form>
      </Stack>
    </Container>
  )
}

export default App
