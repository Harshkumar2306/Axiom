# Axiom

This is the fully independent web interface for the custom LLM.

## Repository Structure
- **`backend/`**: FastAPI server designed for Hugging Face Spaces. It contains a bundled `llm_core/` with the PyTorch neural network architecture necessary to run the model.
- **`frontend/`**: Vite + React chat interface designed for Vercel.

## Deployment Instructions

### 1. Backend (Hugging Face)
1. Go to Hugging Face Spaces and create a new **Docker** space.
2. Link this GitHub repository (`Harshkumar2306/Axiom`).
3. Upload your `best.pt` model checkpoint to the **root** of the Hugging Face Space.
4. Hugging Face will automatically read the `Dockerfile` and start the FastAPI server!

### 2. Frontend (Vercel)
1. Go to Vercel and import this repository.
2. Set the Root Directory to `frontend`.
3. Add the `VITE_API_URL` environment variable (e.g. `https://your-space-url.hf.space/generate`).
4. Deploy!
