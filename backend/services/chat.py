from langchain_core.messages import HumanMessage
from langchain_community.chat_models import ChatOllama

llm = ChatOllama(model="llama3")

def respond(message: str):
    response = llm.invoke([HumanMessage(content=message)])
    return {"response": response.content}