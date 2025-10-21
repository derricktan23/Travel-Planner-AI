def run(state):
    destination = state["input"].destination
    days = state["input"].days
    return {"itinerary": f"Suggested {days}-day itinerary for {destination}"}