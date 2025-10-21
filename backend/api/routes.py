from fastapi import APIRouter
from backend.services import planner, chat
from backend.api.schemas import ItineraryRequest, ChatRequest

router = APIRouter()

@router.post("/itinerary")
def generate_itinerary(req: ItineraryRequest):
    return planner.generate(req)

@router.post("/chat")
def chat_with_agent(req: ChatRequest):
    return chat.respond(req.message)