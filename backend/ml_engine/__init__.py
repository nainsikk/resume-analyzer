from pathlib import Path
import sys

# Make the project root accessible to Python.
PROJECT_ROOT = Path(__file__).resolve().parents[2]

if str(PROJECT_ROOT) not in sys.path:
    sys.path.insert(0, str(PROJECT_ROOT))

# Connect the real AI/ML implementation.
from AI.resume_analyzer import analyze_resume

__all__ = ["analyze_resume"]
