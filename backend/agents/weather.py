def run(state):
    destination = state["input"].destination
    return {"weather": f"Weather forecast for {destination}"}