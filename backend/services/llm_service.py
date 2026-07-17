import os
import sys
import torch

# CRITICAL OPTIMIZATION for Render Free Tier (0.1 CPU):
# PyTorch will try to spawn 16+ threads based on host cores, causing massive 
# thread contention and freezing the server. Limit it to 1 thread for a 10x speedup.
torch.set_num_threads(1)

# Ensure the local llm_core directory is in the Python path
sys.path.append(os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "llm_core"))

from config.gpt_config import GPTConfig
from core.model import GPT
from data.tokenizer import Tokenizer

class LLMService:
    def __init__(self):
        self.model = None
        self.tokenizer = None
        self.device = "cuda" if torch.cuda.is_available() else "cpu"
        self.load_model()

    def load_model(self):
        print("Loading tokenizer...")
        self.tokenizer = Tokenizer("gpt2")
        
        print("Loading model...")
        config = GPTConfig(
            vocab_size=50257,
            d_model=256,
            n_heads=8,
            n_layers=6,
            context_length=256
        )
        self.model = GPT(config)
        
        # Look for best.pt in the root of the project (parent of backend)
        ckpt_path = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))), "best.pt")
        
        # Also check current directory just in case
        if not os.path.exists(ckpt_path):
            ckpt_path = os.path.join(os.path.dirname(__file__), '..', '..', 'model_weights', 'best.pt')
        
        # If best.pt does not exist, but we have parts, reconstruct it
        if not os.path.exists(ckpt_path) and os.path.exists(ckpt_path + ".partaa"):
            print("Reconstructing best.pt from split chunks...")
            import glob
            part_files = sorted(glob.glob(ckpt_path + ".part*"))
            with open(ckpt_path, 'wb') as outfile:
                for part in part_files:
                    with open(part, 'rb') as infile:
                        outfile.write(infile.read())
            print(f"Successfully reconstructed best.pt ({os.path.getsize(ckpt_path)} bytes)")

        if os.path.exists(ckpt_path):
            checkpoint = torch.load(ckpt_path, map_location=self.device)
            self.model.load_state_dict(checkpoint['model_state'])
            print(f"Model loaded successfully from {ckpt_path}!")
        else:
            print(f"Warning: {ckpt_path} not found. Using untrained random weights for testing.")
            
        self.model.to(self.device)
        self.model.eval()

    def generate(self, prompt: str, max_new_tokens: int = 200) -> str:
        if not self.model or not self.tokenizer:
            raise RuntimeError("Model not loaded properly")
            
        encoded = self.tokenizer.encode(prompt)
        x = torch.tensor(encoded, dtype=torch.long, device=self.device).unsqueeze(0)
        
        with torch.no_grad():
            y = self.model.generate(x, max_new_tokens=max_new_tokens)
            
        return self.tokenizer.decode(y[0].tolist())

# Singleton instance
llm_service = LLMService()
