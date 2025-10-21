def run(state):
    destination = state["input"].destination
    return {"links": [f"https://example.com/{destination}/guide"]}