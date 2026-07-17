FROM python:3.10-slim

WORKDIR /app

# Install dependencies
COPY "backend/requirements.txt" .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the entire repository
COPY . .

# Expose the port Hugging Face expects
EXPOSE 7860

# Run the FastAPI app from inside the backend directory
WORKDIR "/app/backend"
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "7860"]
