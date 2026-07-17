from fastapi import APIRouter, HTTPException
from api.schemas import GenerateRequest, GenerateResponse, HealthResponse
from services.llm_service import llm_service

router = APIRouter()

@router.post("/generate", response_model=GenerateResponse)
def generate(req: GenerateRequest):
    try:
        response_text = llm_service.generate(req.prompt, req.max_new_tokens)
        return GenerateResponse(response=response_text)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/", response_model=HealthResponse)
def health_check():
    return HealthResponse(
        status="ok", 
        message="Axiom API is running smoothly!"
    )
