import os
from dotenv import load_dotenv

def load_env():
    load_dotenv()

SERPER_API_KEY = os.getenv("SERPER_API_KEY")
OPENWEATHER_API_KEY = os.getenv("OPENWEATHER_API_KEY")