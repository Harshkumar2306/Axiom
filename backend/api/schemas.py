from pydantic import BaseModel, Field

class GenerateRequest(BaseModel):
    prompt: str = Field(..., description="The prompt to generate text from.")
    max_new_tokens: int = Field(default=100, description="Maximum number of tokens to generate.")

class GenerateResponse(BaseModel):
    response: str
    
class HealthResponse(BaseModel):
    status: str
    message: str
