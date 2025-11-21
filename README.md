# Proyecto Ataque al Corazón IA

<<<<<<< HEAD
Este proyecto implementa un sistema para predecir el riesgo de ataque al corazón utilizando inteligencia artificial. Consta de un backend desarrollado en Python para el procesamiento de datos y modelos de IA, y un frontend interactivo para la visualización y entrada de datos.
=======
Este proyecto consta de un backend desarrollado en Python y un frontend desarrollado con tecnologías web modernas.
>>>>>>> 1a99c786980a933019ca730c290a6d104549e8e2

## Dependencias Comunes

- **Backend:** Python 3.x
- **Frontend:** Node.js (se recomienda la versión LTS)

## Instalación y Ejecución del Backend

### Instalación

1.  Navega al directorio `backend`:

    ```bash
    cd backend
    ```

2.  Crea un entorno virtual (opcional pero recomendado):

    ```bash
    python -m venv venv
    ```

3.  Activa el entorno virtual:

    -   **Windows:**

        ```bash
        .\venv\Scripts\activate
        ```

    -   **macOS/Linux:**

        ```bash
        source venv/bin/activate
        ```

4.  Instala las dependencias:

    ```bash
    pip install -r requirements.txt
    ```

### Ejecución

1.  Asegúrate de que el entorno virtual esté activado.
2.  Ejecuta la aplicación (esto puede variar dependiendo de cómo esté configurado tu backend, por ejemplo, con Flask):

    ```bash
    # Ejemplo para Flask
    export FLASK_APP=app.py  # O el nombre de tu archivo principal
    flask run
    ```

## Instalación y Ejecución del Frontend

### Instalación

1.  Navega al directorio `frontend`:

    ```bash
    cd frontend
    ```

2.  Instala las dependencias:

    ```bash
    npm install
    ```

### Ejecución

1.  Navega al directorio `frontend`.
2.  Inicia la aplicación de desarrollo:

    ```bash
    npm run dev
    ```

    Esto usualmente abrirá la aplicación en tu navegador predeterminado en `http://localhost:3000` (o un puerto similar).