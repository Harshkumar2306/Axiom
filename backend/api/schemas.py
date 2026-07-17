from pydantic import BaseModel

class GenerateRequest(BaseModel):
    prompt: str
    max_new_tokens: int = 200

class GenerateResponse(BaseModel):
    response: str
    
class HealthResponse(BaseModel):
    status: str
    message: str
