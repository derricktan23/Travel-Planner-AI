# from langgraph.graph import StateGraph, END
# from backend.agents import itinerary, weather, activities, packing, food, links

# def generate(req):
#     graph = StateGraph()
#     graph.add_node("itinerary", itinerary.run)
#     graph.add_node("weather", weather.run)
#     graph.add_node("activities", activities.run)
#     graph.add_node("packing", packing.run)
#     graph.add_node("food", food.run)
#     graph.add_node("links", links.run)

#     graph.set_entry_point("itinerary")
#     graph.add_edge("itinerary", "weather")
#     graph.add_edge("weather", "activities")
#     graph.add_edge("activities", "packing")
#     graph.add_edge("packing", "food")
#     graph.add_edge("food", "links")
#     graph.set_finish_point("links")

#     return graph.invoke({"input": req})

from typing import TypedDict
from langgraph.graph import StateGraph, END
from backend.agents import itinerary, weather, activities, packing, food, links

# Define the state schema for LangGraph
class PlannerState(TypedDict, total=False):
    input: object
    itinerary: str
    weather: str
    activities: str
    packing_list: list[str]
    food: str
    links: list[str]

def generate(req):
    graph = StateGraph(PlannerState)

    graph.add_node("itinerary", itinerary.run)
    graph.add_node("weather", weather.run)
    graph.add_node("activities", activities.run)
    graph.add_node("packing", packing.run)
    graph.add_node("food", food.run)
    graph.add_node("links", links.run)

    graph.set_entry_point("itinerary")
    graph.add_edge("itinerary", "weather")
    graph.add_edge("weather", "activities")
    graph.add_edge("activities", "packing")
    graph.add_edge("packing", "food")
    graph.add_edge("food", "links")
    graph.set_finish_point("links")

    # ✅ Compile the graph before invoking
    app = graph.compile()
    return app.invoke({"input": req})
    graph = StateGraph(PlannerState)

    graph.add_node("itinerary", itinerary.run)
    graph.add_node("weather", weather.run)
    graph.add_node("activities", activities.run)
    graph.add_node("packing", packing.run)
    graph.add_node("food", food.run)
    graph.add_node("links", links.run)

    graph.set_entry_point("itinerary")
    graph.add_edge("itinerary", "weather")
    graph.add_edge("weather", "activities")
    graph.add_edge("activities", "packing")
    graph.add_edge("packing", "food")
    graph.add_edge("food", "links")
    graph.set_finish_point("links")

    return graph.invoke({"input": req})